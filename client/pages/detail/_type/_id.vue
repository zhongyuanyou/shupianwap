<template>
  <div class="company">
    <DetailTemplate
      :info="info"
      :tc-product-detail-data="tcProductDetailData"
      :tc-planner-booth="tcPlannerBooth"
      :detail-type="$route.params.type"
    />
  </div>
</template>

<script>
import DetailTemplate from '~/components/detail/DetailTemplate'
import { productDetailsApi, recommendApi } from '~/api'
import getUserSign from '~/utils/fingerprint'
export default {
  name: 'Id',
  components: {
    DetailTemplate,
  },
  async asyncData({ $axios, params, app, store }) {
    try {
      let tcPlannerBooth = {}
      let tcProductDetailData = {}
      const { code, data } = await $axios.get(
        productDetailsApi.tcProductDetail,
        {
          params: {
            productId: params.id,
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
            area: store.state.city.currentCity, // 区域编码
            deviceId, // 设备ID
            level_2_ID: data.classCodeLevel
              ? data.classCodeLevel.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'FL20201116000002', // 产品类型
            sceneId: 'app-cpxqye-02', // 场景ID
            user_id: app.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: data.id, // 产品id
          },
        })
        console.log(plannerRes)
        if (plannerRes.code === 200) {
          tcPlannerBooth = plannerRes.data.records[0]
        }
        return { tcProductDetailData, tcPlannerBooth }
      }
    } catch (err) {
      console.log(err)
    }
  },
  data() {
    return {
      tcProductDetailData: {},
      tcPlannerBooth: {},
      info: {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
        tags: ['公司干净', '无债权债务'],
        title: '深圳区块科技技术有限公司，优质老店2字商标名字',
        money: '25.00',
        planners: [
          {
            name: '黄成',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '黄成',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '黄成',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
        ],
        req: [
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
      },
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped></style>
