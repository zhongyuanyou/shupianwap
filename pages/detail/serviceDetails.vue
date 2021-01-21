<template>
  <div class="serviceDetails">
    <!-- 导航栏-->
    <sp-sticky z-index="5" @scroll="scrollHandle">
      <sp-top-nav-bar
        ellipsis
        :background="`rgba(255,255,255,${opacity})`"
        @on-click-left="onClickLeft"
      >
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
          </div>
        </template>
        <template #right>
          <div>
            <my-icon
              class="head__icon-share"
              name="nav_ic_share"
              size="0.4rem"
              color="#1A1A1A"
              @click.native="onClickRight"
            />
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <!--   banner -->
    <Banner :images="scProductDetailData.productImgArr" />
    <!--   BasicInfo(基本信息)-->
    <BasicInfo
      :base-data="scProductDetailData.baseData"
      :operating-data="scProductDetailData.operating"
      :tags-data="scProductDetailData.tags"
    />
    <!--    服务项目-->
    <ServiceItems :normal-item-list-data="scProductDetailData.normalItemList" />
    <!--    服务详情-->
    <ServiceInfo :client-details-data="scProductDetailData.clientDetails" />
    <!--    推荐规划师-->
    <div class="planners-box">
      <Planners :im-jump-query="imJumpQuery" :recommend-planner="planners" />
      <!--   暂时取消此表单   -->
      <!--      <div class="planners-box-quiz">-->
      <!--        <h2>您的疑问，第一时间为您解答</h2>-->
      <!--        <div>-->
      <!--          <input placeholder="输入您想咨询的问题" type="text" />-->
      <!--          <sp-button type="primary">提问</sp-button>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <!--    猜你喜欢-->
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <RecommendScProduct :recommend-product-data="recommendProduct" />
    </sp-list>
    <commodityConsultation
      :im-jump-query="imJumpQuery"
      :planner-info="scPlannerDetailData"
    />
    <!--    分享组件-->
    <sp-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import {
  Sticky,
  TopNavBar,
  Button,
  List,
  PullRefresh,
  ShareSheet,
} from '@chipspc/vant-dgg'
import Banner from '~/components/detail/Banner'
import BasicInfo from '~/components/detail/service/BasicInfo'
import ServiceItems from '~/components/detail/service/ServiceItems'
import ServiceInfo from '~/components/detail/service/ServiceInfo'
import Planners from '~/components/detail/Planners'
import RecommendScProduct from '~/components/detail/service/RecommendScProduct'
import commodityConsultation from '~/components/common/commodityConsultation/commodityConsultation'
import getUserSign from '~/utils/fingerprint'
import { productDetailsApi, recommendApi } from '~/api'
import { copyToClipboard } from '~/utils/common'
import { GOODSLIST } from '~/config/constant'
export default {
  name: 'ServiceDetails',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [ShareSheet.name]: ShareSheet,
    Banner,
    BasicInfo,
    ServiceItems,
    ServiceInfo,
    Planners,
    RecommendScProduct,
    commodityConsultation,
  },
  layout: 'keepAlive',
  watchQuery: ['productId'],
  async asyncData({ $axios, query, app, store }) {
    try {
      let scProductDetailData = {}
      let scPlannerDetailData = {}
      // 获取产品详情
      const productDetailRes = await $axios.post(
        productDetailsApi.scProductDetail,
        {
          productId: query.productId,
          serviceItem: 'true',
          showClient: 'COMDIC_TERMINAL_WAP',
          needServiceItem: true,
          needOperating: 'true',
          needRefConfig: 'true',
          needSkuAttr: 'true',
          needAttr: 'true',
          needTag: 'true',
        }
      )
      if (productDetailRes.code === 200) {
        scProductDetailData = productDetailRes.data
        // 获取钻展规划师
        // 获取用户唯一标识
        const deviceId = await getUserSign()
        const plannerRes = await $axios.get(productDetailsApi.recPlanner, {
          params: {
            limit: 1,
            page: 1,
            area: store.state.city.currentCity.code, // 区域编码
            deviceId, // 设备ID
            level_2_ID: productDetailRes.data.baseData.parentClassCode
              ? productDetailRes.data.baseData.parentClassCode.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
            sceneId: 'app-cpxqye-02', // 场景ID
            user_id: app.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: productDetailRes.data.baseData.id, // 产品id
          },
        })
        if (plannerRes.code === 200) {
          scPlannerDetailData = plannerRes.data.records[0]
        }
        console.log({ scProductDetailData })
        return { scProductDetailData, scPlannerDetailData }
      } else {
        console.log(productDetailRes)
      }
    } catch (err) {
      console.log('错误信息：', err)
    }
  },
  data() {
    return {
      opacity: 0,
      // 服务详情数据
      scProductDetailData: {
        baseData: {}, // 基本信息
        productImgArr: [], // 产品图片
        attrs: [], // 产品属性
        tags: {}, // 产品标签
        operating: {}, // 运营信息
        clientDetails: {}, // 客户端展示数据
        refConfig: [],
        skuAttrs: [], // sku属性
        normalItemList: [], // 基本服务项
      },
      scPlannerDetailData: {}, // 钻展规划师
      planners: [],
      card: {
        imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
        cardName: '王深林',
        cardSign: '金牌规划师',
        round: true,
        avatarSize: 40,
      },
      consultText1: '在线咨询',
      consultText2: '电话咨询',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      plannerLimit: 3,
      plannerPage: 1,
      plannerCount: 0, // 推荐规划师总条数
      deviceId: null, // 用户唯一标识
      productLimit: 10, // 产品每页条数
      productPage: 1, // 产品分页
      productCount: 0, // 推荐产品总条数
      recommendProduct: [], // 推荐产品‘
      showShare: false, // 是否弹起分享组件
      shareOptions: [{ name: '复制链接', icon: 'link' }],
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
    imJumpQuery() {
      const imdata = {
        productName: this.scProductDetailData.baseData.name, // 产品名称
        productContent: this.scProductDetailData.baseData.productDescription, // 产品信息
        price: `${this.scProductDetailData.baseData.referencePrice}元`, // 价格
        forwardAbstract: this.scProductDetailData.baseData.productDescription, // 摘要信息，可与显示内容保持一致
        routerId: 'IMRouter_APP_ProductDetail_Service', // 路由ID
        imageUrl: this.scProductDetailData.productImgArr
          ? this.scProductDetailData.productImgArr
          : [GOODSLIST], // 产品图片
        unit: `${
          this.scProductDetailData.baseData.referencePrice
            ? this.scProductDetailData.baseData.referencePrice.split('.')[1]
            : '00'
        }元`, // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      return imdata
    },
  },
  mounted() {
    // 获取推荐规划师
    this.handleGetRecPlanner()
    // 获取推荐产品
    this.handleGetRecProduct()
  },
  methods: {
    scrollHandle({ scrollTop }) {
      // 滚动事件
      this.opacity = scrollTop / 120
    },
    onLoad() {
      // 加载更多
      this.productPage += 1
      this.handleGetRecProduct()
    },
    onClickLeft() {
      // 返回上一页
      this.$router.back()
    },
    // 获取推荐规划师
    async handleGetRecPlanner() {
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
            level_2_ID: this.scProductDetailData.baseData.parentClassCode
              ? this.scProductDetailData.baseData.parentClassCode.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: this.$route.query.productId, // 产品id
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
    //   获取推荐产品
    async handleGetRecProduct() {
      this.loading = true
      // 获取用户唯一标识
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      const formatId2 = this.scProductDetailData.baseData.parentClassCode.split(
        ','
      )[1] // 产品二级分类
      const formatId3 = this.scProductDetailData.baseData.parentClassCode.split(
        ','
      )[2] // 产品三级分类
      const formatId = formatId3 || formatId2
      this.$axios
        .get(recommendApi.recommendProduct, {
          params: {
            userId: this.$cookies.get('userId'), // 用户id
            deviceId: this.deviceId, // 设备ID
            formatId, // 产品三级类别,没有三级类别用二级类别（首页等场景不需传，如其他场景能获取到必传）
            areaCode: this.city.code, // 区域编码
            sceneId: 'app-fwcpxq-01', // 场景ID
            productId: this.$route.query.productId, // 产品ID（产品详情页必传）
            productType: 'PRO_CLASS_TYPE_SERVICE', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
            title: this.scProductDetailData.baseData.name, // 产品名称（产品详情页传、咨询页等）
            platform: 'APP', // 平台（app,m,pc）
            page: this.productPage,
            limit: this.productLimit,
            searchType: 2, // 搜索推荐产品类型：1：交易，2服务
          },
        })
        .then((res) => {
          if (res.code === 200) {
            console.log(res.data)
            if (res.data.records.length === 0) {
              this.finished = true
            }
            this.productCount = res.data.totalCount // 推荐产品总条数
            this.recommendProduct = [...this.recommendProduct].concat(
              res.data.records
            ) // 推荐产品列表
            if (this.recommendProduct.length >= 30) {
              console.log(1212)
              this.finished = true
            } else {
              this.loading = false
            }
          } else {
            this.finished = true
          }
        })
        .catch((err) => {
          this.finished = true
          console.log(err)
        })
    },
    //  分享
    onClickRight() {
      this.showShare = true
    },
    // 点击分享
    onSelect() {
      const result = copyToClipboard(location.href)
      if (result) {
        this.$xToast.success('链接复制成功')
        return
      }
      this.$xToast.error('链接复制失败,请重试')
      // this.showShare = false
    },
  },
}
</script>

<style lang="less" scoped>
.serviceDetails {
  background: #f8f8f8;
  /deep/ .sp-hairline--bottom::after {
    border-bottom: none;
  }
  .planners-box {
    margin-bottom: 24px;
    /deep/.planners {
      border-bottom: none;
      padding-bottom: 64px;
    }
    &-quiz {
      border-top: 1px solid #f4f4f4;
      background-color: #fff;
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 40px;
      h2 {
        font-size: 36px;
        font-weight: bold;
        color: #1a1a1a;
        height: 40px;
        line-height: 40px;
        margin-top: 38px;
        margin-bottom: 39px;
      }
      div {
        display: flex;
        input {
          flex: 1;
          font-size: 28px;
          font-weight: 400;
          border: 1px solid #4974f5;
          border-radius: 4px 0px 0px 4px;
          padding-left: 25px;
          color: #1a1a1a;
          &::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #cccccc;
          }
          &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #cccccc;
          }
          &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #cccccc;
          }
          &:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color: #cccccc;
          }
        }
        button {
          width: 144px;
          height: 80px;
          background: #4974f5;
          border-radius: 0px 4px 4px 0px;
        }
      }
    }
  }
  /deep/ .sp-top-nav-bar__left,
  /deep/ .sp-top-nav-bar__right {
    font-weight: initial;
  }
}
</style>
