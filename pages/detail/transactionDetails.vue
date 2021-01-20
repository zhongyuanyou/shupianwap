<template>
  <div class="company">
    <DetailTemplate
      :tc-product-detail-data="tcProductDetailData"
      :tc-planner-booth="tcPlannerBooth"
      :recommend-planner="planners"
      :detail-type="$route.query.type"
      :im-jump-query="imJumpQuery"
    />
  </div>
</template>

<script>
import DetailTemplate from '~/components/detail/DetailTemplate'
import { productDetailsApi } from '~/api'
import getUserSign from '~/utils/fingerprint'
import { GOODSLIST } from '~/config/constant'
export default {
  name: 'Id',
  components: {
    DetailTemplate,
  },
  layout: 'keepAlive',
  watchQuery: ['productId'],
  async asyncData({ $axios, query, app, store }) {
    try {
      let tcPlannerBooth = {}
      let tcProductDetailData = {}
      const { code, message, data } = await $axios.get(
        productDetailsApi.tcProductDetail,
        {
          params: {
            productId: query.productId,
          },
        }
      )
      if (code === 200) {
        tcProductDetailData = data
        // 获取钻展规划师
        // 获取用户唯一标识
        const deviceId = await getUserSign()
        const plannerRes = await $axios.get(productDetailsApi.recPlanner, {
          params: {
            limit: 1,
            page: 1,
            area: store.state.city.currentCity.code, // 区域编码
            deviceId, // 设备ID
            level_2_ID: data.classCodeLevel
              ? data.classCodeLevel.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'FL20201116000003', // 产品类型
            sceneId: 'app-cpxqye-02', // 场景ID
            user_id: app.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: data.id, // 产品id
          },
        })
        if (plannerRes.code === 200) {
          tcPlannerBooth = plannerRes.data.records[0]
        }
        return { tcProductDetailData, tcPlannerBooth }
      } else {
        console.log(code, message)
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      tcProductDetailData: {
        classCodeLevelList: [],
        platformPrice: '0',
        classCodeLevel: '',
        qftDetails: {
          fieldValueCn: '',
          fieldValue: '',
          fieldValueList: [],
        },
      },
      fieldList: [],
      tcPlannerBooth: {},
      deviceId: null, // 设备唯一码
      planners: [], // 规划师列表
      plannerLimit: 3,
      plannerPage: 1,
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
    imJumpQuery() {
      const imdata = {
        productName: this.tcProductDetailData.name, // 产品名称
        productContent: this.tcProductDetailData.name, // 产品信息
        price: `${this.tcProductDetailData.platformPrice}元`, // 价格
        forwardAbstract: this.tcProductDetailData.name, // 摘要信息，可与显示内容保持一致
        routerId: 'IMRouter_APP_ProductDetail_Trade', // 路由ID
        imageUrl: this.tcProductDetailData.productImgArr
          ? this.tcProductDetailData.productImgArr
          : [GOODSLIST], // 产品图片
        unit: `${this.tcProductDetailData.platformPrice.split('.')[1]}元`, // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      return imdata
    },
  },
  mounted() {
    // 获取推荐规划师
    this.getRecommendPlanner()
  },
  methods: {
    //  获取推荐规划师
    async getRecommendPlanner() {
      // 获取用户唯一标识
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      this.$axios
        .get(productDetailsApi.recPlanner, {
          params: {
            limit: this.plannerLimit,
            page: this.plannerPage,
            area: this.city.code, // 区域编码
            deviceId: this.deviceId, // 设备ID
            level_2_ID: this.tcProductDetailData.classCodeLevel
              ? this.tcProductDetailData.classCodeLevel.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: this.tcProductDetailData.id, // 产品id
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.planners = res.data.records
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
