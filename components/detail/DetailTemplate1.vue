<template>
  <div class="template">
    <!--S 导航栏-->
    <sp-sticky
      z-index="5"
      :class="{
        scroTopStyle: Boolean(opacity),
      }"
      @scroll="scrollHandle"
    >
      <sp-top-nav-bar
        ellipsis
        :background="`rgba(255,255,255,0)`"
        :style="{
          padding: isInApp ? `${appInfo.statusBarHeight}px 0 0 0` : '0',
        }"
        @on-click-left="onClickLeft"
      >
        <template #left>
          <div v-if="!isShare">
            <my-icon name="nav_ic_back" size="0.4rem" color="#fff"></my-icon>
          </div>
        </template>
        <template #right>
          <div>
            <my-icon
              :class="sellingDetail.isSave ? 'icon-red' : ''"
              style="margin-right: 0.36rem"
              :name="sellingDetail.isSave ? 'shoucang_mian' : 'shoucang'"
              size="0.4rem"
              :color="sellingDetail.isSave ? '#ec5330' : '#fff'"
              @click.native="handleClickSave"
            />
          </div>
          <div>
            <my-icon
              style="margin-right: 0.36rem"
              name="nav_ic_shop"
              size="0.4rem"
              color="#fff"
              @click.native="addCart"
            />
          </div>
          <div>
            <my-icon
              name="nav_ic_share"
              size="0.4rem"
              color="#fff"
              @click.native="onClickRight"
            />
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <!--E 导航栏-->
    <!--S banner-->
    <Banner :images="imgFileIdPaths" />
    <!--S banner-->

    <!--start 会员价 -->
    <!-- <MemberPrice></MemberPrice> -->

    <!--S 第一板块-->
    <Title :comment="comments" @onComment="commentHandler" />
    <!--E 第一板块-->
    <!--S 第二板块 领券 SKU-->
    <VouchersSelect ref="sku" />
    <!--E 第二板块 领券 SKU-->
    <!--S 第三板块 包含项目-->
    <ContainProject />
    <!--E 第三板块 包含项目-->
    <!--S 第三板块 包含服务-->
    <ContainContent />
    <!--E 第三板块 包含服务-->
    <!--S 评论-->
    <CommentBox
      id="comment"
      :comment="comments.records[0]"
      :good-id="sellingDetail.id"
    />
    <!--E 评论-->
    <!--S 动态 -->
    <OrderDynamic></OrderDynamic>
    <!--S 第五板块 推荐规划师-->
    <TcPlanners :im-jump-query="imJumpQuery" :recommend-planner="planners" />
    <!--E 第五板块 推荐规划师-->
    <!--S  精选案例-->
    <!-- <OrderCase></OrderCase> -->
    <CaseNew :planner-detail="tcPlannerBooth" />
    <!--E  精选案例-->
    <!--S 第十板块 服务详情-->
    <ServiceDetail
      comp-type="sc"
      :detail-data="sellingDetail.salesGoodsOperatings.clientDetails[0]"
    />
    <!--S 第十板块 服务详情-->
    <!--S 第十板块 猜你需要-->
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
    >
      <RelatedRecommend ref="remNeed" :product-data="recommendProduct" />
    </sp-list>
    <!--E 第十板块 猜你需要-->
    <bottomBar :im-jump-query="imJumpQuery" :planner-info="tcPlannerBooth" />
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
import { TopNavBar, Sticky, List, ShareSheet } from '@chipspc/vant-dgg'
import { mapState, mapMutations, mapActions } from 'vuex'
import Banner from '~/components/detail/Banner.vue'
import Title from '~/components/detail/server/Title.vue'
import CommentBox from '~/components/detail/comment/CommentBox.vue'
import OrderCase from '~/components/detail/OrderCase.vue'
import OrderDynamic from '~/components/detail/OrderDynamic.vue'
import VouchersSelect from '~/components/detail/VouchersSelect.vue'
import ContainProject from '~/components/detail/ContainProject.vue'
import ContainContent from '~/components/detail/ContainContent.vue'
import TcPlanners from '~/components/detail/server/TcPlanners.vue'
import ServiceDetail from '~/components/detail/ServiceDetail.vue'
import RelatedRecommend from '~/components/detail/RelatedRecommend.vue'
import bottomBar from '@/components/detail/bottomBar/index.vue'
// import MemberPrice from '@/components/detail/memberPrice/MemberPrice.vue'

import CaseNew from '~/components/detail/CaseNew'

import getUserSign from '~/utils/fingerprint'
import { productDetailsApi, recommendApi, shopApi, evaluateApi } from '~/api'
import MyIcon from '~/components/common/myIcon/MyIcon'
import { copyToClipboard } from '~/utils/common'
import imHandle from '~/mixins/imHandle'
export default {
  name: 'DetailTemplate',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [ShareSheet.name]: ShareSheet,
    Banner,
    Title,
    VouchersSelect,
    ContainProject,
    ContainContent,
    TcPlanners,
    ServiceDetail,
    RelatedRecommend,
    bottomBar,
    // MemberPrice,
    MyIcon,
    CommentBox,
    // OrderCase,
    OrderDynamic,
    CaseNew,
  },
  mixins: [imHandle],
  props: {
    imJumpQuery: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },

  data() {
    return {
      opacity: 0,
      finished: false, // 停止加载更多
      loading: false,
      productPage: 1, // 推荐产品当前页
      productLimit: 10, // 推荐产品没有条数
      productCount: 0, // 推荐产品总数
      recommendProduct: [], // 推荐产品
      showShare: false, // 是否弹起分享组件
      shareOptions: [{ name: '复制链接', icon: 'link' }],
      userInfoData: {
        decodePhone: null,
        fullName: null,
      }, // 个人用户数据
      planners: [], // 规划师列表
      plannerLimit: 3, // 推荐规划师每页条数
      plannerPage: 1, // 推荐规划师当前页
      tcPlannerBooth: {},
      deviceId: null, // 设备唯一码
      imgFileIdPaths: [], // 产品图片
      isShare: false,
      comments: {
        totalCount: 0, // 初始化评论字段,防止程序报错
        records: [],
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
      userInfo: (state) => state.user.userInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    sellingDetail() {
      // 获取客户端展示信息
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  async mounted() {
    this.isShare = this.$route.query.isShare
    // 假如未获取到站点信息,再获取地理位置
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
    // 获取商品图片
    this.getSellingImg()
    // 获取推荐产品
    this.getrecommendProduct()
    // 推荐规划师
    this.getRecommendPlanner()
    // 获取钻展
    this.getRecPlanner()
    // 获取评价
    this.getCommentsApi()
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    // shouchang
    handleClickSave() {
      if (this.sellingDetail.isSave) {
        this.cancelSave()
      } else {
        this.addSave()
      }
    },
    // 取消收藏
    cancelSave() {
      // 直接调商户中心接口，未经过node中间层，中间层无法处理formData
      const classCodeLevel = this.sellingDetail.classCodeLevel
      let codeArr = []
      if (classCodeLevel) {
        codeArr = classCodeLevel.split(',')
      }
      const formData = new FormData()
      formData.append('goodsId', this.sellingDetail.id)
      this.$axios
        .post(shopApi.cancelSave, formData)
        .then((res) => {
          if (res.code === 200) {
            this.$xToast.success('取消成功')
            this.sellingDetail.isSave = false
          } else {
            this.$xToast.error(res.message || '操作失败')
          }
        })
        .catch((err) => {
          console.log('err', err)
          this.$xToast.error(err.message || '操作失败')
        })
    },
    // 添加收藏
    addSave() {
      if (!this.$store.state.user.token) {
        this.$router.push('/login')
        return
      }
      const classCodeLevel = this.sellingDetail.classCodeLevel
      let codeArr = []
      if (classCodeLevel) {
        codeArr = classCodeLevel.split(',')
      }
      const params = {
        goodsDtos: [
          {
            goodsId: this.sellingDetail.id,
            goodsCode: this.sellingDetail.classCode,
            catalog1: codeArr.length && codeArr.length > 0 ? codeArr[0] : '',
            catalog2: codeArr.length && codeArr.length > 1 ? codeArr[1] : '',
            catalog3: codeArr.length && codeArr.length > 2 ? codeArr[2] : '',
            goodsType: 'proGoodsServer',
            ext1: 1,
          },
        ],
      }
      this.$axios
        .post(shopApi.addGoods, params)
        .then((res) => {
          console.log('res', res)
          if (res && res.code === 200) {
            this.$xToast.show({
              message: '收藏成功',
              duration: 3000,
              icon: 'toast_ic_comp',
              forbidClick: true,
            })
            this.sellingDetail.isSave = true
          } else {
            this.$xToast.error(res || '收藏失败')
          }
        })
        .catch((err) => {
          console.log('err', err)
          this.$xToast.error('收藏失败')
        })
    },
    commentHandler() {
      const user = navigator.userAgent.toLowerCase()
      console.log(user)
      if (
        user.match(/huawei/i) === 'huawei' ||
        user.match(/honor/i) === 'honor'
      ) {
        document.querySelector('#comment').scrollIntoView(true)
        document.body.scrollTop = document.body.scrollTop - 250
      } else {
        document.querySelector('#comment').scrollIntoView(true)
        document.documentElement.scrollTop =
          document.documentElement.scrollTop - 250
      }
    },
    scrollHandle({ scrollTop }) {
      // 滚动事件
      if (scrollTop > 216) {
        this.opacity = 1
      } else {
        this.opacity = 0
      }
    },
    onClickLeft() {
      if (this.isShare) return
      // 返回上一页
      if (history.length < 2) {
        this.$router.push({
          path: '/search/searchResult?keywords=',
        })
      } else {
        this.$router.back()
      }
    },
    //
    async onLoad() {
      // 假如未获取到站点信息,再获取地理位置
      if (!this.city.code) {
        await this.POSITION_CITY({ type: 'init' })
      }
      // 加载更多推荐
      this.getrecommendProduct()
    },
    // 获取推荐交易产品
    async getrecommendProduct() {
      this.loading = true
      // 获取用户唯一标识
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      console.log('this.sellingDetail', this.sellingDetail)

      let formatId1 = '' // 产品二级分类
      let formatId2 = '' // 产品二级分类
      let formatId3 = '' // 产品三级分类
      if (this.sellingDetail?.classCodeLevel) {
        formatId1 = this.sellingDetail.classCodeLevel.split(',')[0] // 产品二级分类
        formatId2 = this.sellingDetail.classCodeLevel.split(',')[1] // 产品二级分类
        formatId3 = this.sellingDetail.classCodeLevel.split(',')[2] // 产品三级分类
      }
      this.$axios
        .post(recommendApi.saleList, {
          userId: this.$cookies.get('userId', { path: '/' }), // 用户id
          deviceId: this.deviceId, // 设备ID
          formatId: formatId2 || formatId3 || formatId1, // 产品二级类别,没有二级类别用三级类别（首页等场景不需传，如其他场景能获取到必传）
          classCode: formatId1,
          areaCode: this.$store.state.city.currentCity.code || '510100', // 区域编码
          sceneId: 'app-fwcpxq-01', // 场景ID
          productId: this.sellingDetail.id, // 产品ID（产品详情页必传）
          productType: 'PRO_CLASS_TYPE_SALES', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
          title: this.sellingDetail.name, // 产品名称（产品详情页传、咨询页等）
          platform: 'm', // 平台（app,m,pc）
          formatIdOne: formatId1,
          page: { pageNo: this.productPage, pageSize: this.productLimit },
        })
        .then((res) => {
          if (res.code === 200) {
            // 关闭骨架屏
            this.$refs.remNeed.needLoading = false
            this.productPage += 1
            if (res.data.records.length === 0) {
              this.finished = true
            }
            this.productCount = res.data.totalCount // 推荐产品总条数
            this.recommendProduct = [...this.recommendProduct].concat(
              res.data.records
            ) // 推荐产品列表
            // 推荐产品最多加载30条
            if (this.recommendProduct.length >= 30) {
              this.finished = true
            }
          }
          this.finished = true
        })
        .catch((err) => {
          this.finished = true
          console.log(err)
        })
    },
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
            area: this.$store.state.city.currentCity.code || '510100',
            deviceId: this.deviceId, // 设备ID
            level_2_ID: this.sellingDetail.classCodeLevel
              ? this.sellingDetail.classCodeLevel.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
            platform: 'm', // 平台（app,m,pc）
            productId: this.sellingDetail.id, // 产品id
            firstTypeCode: this.sellingDetail.classCodeLevel
              ? this.sellingDetail.classCodeLevel.split(',')[0]
              : null,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            console.log('推荐规划师', this.planners)
            this.planners = res.data.records
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取钻展规划师
    async getRecPlanner() {
      // 获取用户唯一标识
      const deviceId = await getUserSign()
      const plannerRes = await this.$axios.get(productDetailsApi.recPlanner, {
        params: {
          limit: 1,
          page: 1,
          area: this.$store.state.city.currentCity.code || '510100',
          deviceId, // 设备ID
          level_2_ID: this.sellingDetail.classCodeLevel
            ? this.sellingDetail.classCodeLevel.split(',')[1]
            : null, // 二级产品分类
          login_name: null, // 规划师ID(选填)
          productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
          sceneId: 'app-cpxqye-02', // 场景ID
          user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
          platform: 'm', // 平台（app,m,pc）
          productId: this.sellingDetail.id, // 产品id
          firstTypeCode: this.sellingDetail.classCodeLevel
            ? this.sellingDetail.classCodeLevel.split(',')[0]
            : null,
        },
      })
      if (plannerRes.code === 200) {
        this.tcPlannerBooth = plannerRes.data.records[0]
        console.log('tcPlannerBooth', this.tcPlannerBooth)
      }
    },
    // 购物车
    async addCart() {
      // 点击立即购买
      const isLogin = await this.judgeLoginMixin()
      if (isLogin) {
        this.$router.push({
          path: '/shopCart',
        })
      }
    },
    // 得到评价内容
    async getCommentsApi() {
      try {
        const params = {
          start: 1,
          limit: 10,
          ext1: this.sellingDetail.id, // 商品id
        }
        const { data, code, message } = await this.$axios.post(
          evaluateApi.getGoodsEvaluate,
          params
        )
        if (code !== 200) {
          throw new Error(message)
        }
        this.comments = data
      } catch (e) {
        console.log(e)
      }
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
    // 获取商品图片
    getSellingImg() {
      // 获取客户端展示信息
      const clientDetails =
        this.sellingDetail.salesGoodsOperatings.clientDetails
      // 获取商品图片集合
      this.imgFileIdPaths = clientDetails.length
        ? clientDetails[0].imgFileIdPaths
        : []
      // 返回图片地址集合
    },
    // 获取手机号
    // getUserIndo() {
    //   if (this.token) {
    //     this.$axios
    //       .get(userinfoApi.info, {
    //         params: {
    //           id: this.userInfo.userId,
    //         },
    //       })
    //       .then((res) => {
    //         if (res.code === 200) {
    //           this.userInfoData = res.data
    //         } else {
    //           this.$xToast.show({
    //             message: '网络错误,请刷稍后再试',
    //             duration: 1000,
    //             icon: 'toast_ic_error',
    //             forbidClick: true,
    //           })
    //         }
    //       })
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
.scroTopStyle {
  ::v-deep.sp-sticky {
    border: 1px solid #f4f4f4;
    .sp-top-nav-bar {
      background-color: #fff !important;
      .spiconfont {
        color: #1a1a1a !important;
      }
      // #icon-red {
      //   color: #4974f5 !important;
      // }
      .icon-red {
        color: #ec5330 !important;
      }
    }
  }
}

.template {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f8f8f8;
  /*padding-bottom: 144px;*/
  ::v-deep .sp-hairline--bottom::after {
    border-bottom: none;
  }
}
.company {
  &_info {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
  }
}
::v-deep .sp-top-nav-bar__left,
::v-deep .sp-top-nav-bar__right {
  font-weight: initial;
}
</style>
