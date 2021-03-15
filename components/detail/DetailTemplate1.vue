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
        @on-click-left="onClickLeft"
      >
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#fff"></my-icon>
          </div>
        </template>
        <template #right>
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
    <Banner :images="proDetail.productImgArr" />
    <!--S banner-->
    <!--S 第一板块-->
    <Title />
    <!--E 第一板块-->
    <!--S 第二板块 领券 SKU-->
    <VouchersSelect ref="sku" />
    <!--E 第二板块 领券 SKU-->
    <!--S 第三板块 包含项目-->
    <ContainProject />
    <!--E 第三板块 包含项目-->
    <!--S 第三板块 包含服务-->
    <ContainService />
    <!--E 第三板块 包含服务-->
    <!--S 第三板块 包含内容-->
    <ContainContent />
    <!--E 第三板块 包含内容-->
    <!--S 第五板块 推荐规划师-->
    <TcPlanners :im-jump-query="imJumpQuery" :recommend-planner="planners" />
    <!--E 第五板块 推荐规划师-->
    <!--S 第十板块 服务详情-->
    <ServiceDetail />
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
import { mapActions } from 'vuex'
import Banner from '~/components/detail/Banner'
import Title from '~/components/detail/Title1'
import VouchersSelect from '~/components/detail/VouchersSelect'
import ContainProject from '~/components/detail/ContainProject'
import ContainService from '~/components/detail/ContainService'
import ContainContent from '~/components/detail/ContainContent'
import TcPlanners from '~/components/detail/TcPlanners1'
import ServiceDetail from '~/components/detail/ServiceDetail'
import RelatedRecommend from '~/components/detail/RelatedRecommend'
import bottomBar from '@/components/detail/bottomBar/index'
import getUserSign from '~/utils/fingerprint'
import tcBasicData from '~/mock/tcBasicData'
import { productDetailsApi, recommendApi, userinfoApi } from '~/api'
import MyIcon from '~/components/common/myIcon/MyIcon'
import { copyToClipboard } from '~/utils/common'
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
    ContainService,
    ContainContent,
    TcPlanners,
    ServiceDetail,
    RelatedRecommend,
    bottomBar,
    MyIcon,
  },
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
      productPage: 1,
      productLimit: 10,
      productCount: 0,
      recommendProduct: [],
      tcBasicData, // 基本信息的key
      showShare: false, // 是否弹起分享组件
      shareOptions: [{ name: '复制链接', icon: 'link' }],
      userInfoData: {
        decodePhone: null,
        fullName: null,
      },
      planners: [], // 规划师列表
      plannerLimit: 3,
      plannerPage: 1,
      tcPlannerBooth: {},
      deviceId: null, // 设备唯一码
    }
  },
  computed: {
    // 产品详情
    proDetail() {
      return this.$store.state.tcProductDetail.detailData
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  async mounted() {
    this.fieldListFun() // 加载基本信息
    this.getUserIndo()
    // 假如未获取到站点信息,再获取地理位置
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
    // 获取推荐产品
    this.getrecommendProduct()
    // 推荐规划师
    this.getRecommendPlanner()
    // 获取钻展
    this.getRecPlanner()
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    scrollHandle({ scrollTop }) {
      // 滚动事件
      if (scrollTop > 216) {
        this.opacity = 1
      } else {
        this.opacity = 0
      }
    },
    onClickLeft() {
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
      const formatId1 = this.proDetail.classCodeLevel.split(',')[0] // 产品二级分类
      const formatId2 = this.proDetail.classCodeLevel.split(',')[1] // 产品二级分类
      const formatId3 = this.proDetail.classCodeLevel.split(',')[2] // 产品三级分类
      const formatId = formatId3 || formatId2
      this.$axios
        .get(recommendApi.recommendProduct, {
          params: {
            userId: this.$cookies.get('userId'), // 用户id
            deviceId: this.deviceId, // 设备ID
            formatId, // 产品三级类别,没有三级类别用二级类别（首页等场景不需传，如其他场景能获取到必传）
            classCode: formatId1,
            areaCode: this.city.code, // 区域编码
            sceneId: 'app-jycpxq-02', // 场景ID
            productId: this.proDetail.id, // 产品ID（产品详情页必传）
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
            title: this.proDetail.name, // 产品名称（产品详情页传、咨询页等）
            platform: 'APP', // 平台（app,m,pc）
            page: this.productPage,
            limit: this.productLimit,
            searchType: 1, // 搜索推荐产品类型：1：交易，2服务
          },
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
            area: this.city.code, // 区域编码
            deviceId: this.deviceId, // 设备ID
            level_2_ID: this.proDetail.classCodeLevel
              ? this.proDetail.classCodeLevel.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: this.proDetail.id, // 产品id
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
    // 获取钻展规划师
    async getRecPlanner() {
      // 获取用户唯一标识
      const deviceId = await getUserSign()
      const plannerRes = await this.$axios.get(productDetailsApi.recPlanner, {
        params: {
          limit: 1,
          page: 1,
          area: this.city.code, // 区域编码
          deviceId, // 设备ID
          level_2_ID: this.proDetail.classCodeLevel
            ? this.proDetail.classCodeLevel.split(',')[1]
            : null, // 二级产品分类
          login_name: null, // 规划师ID(选填)
          productType: 'FL20201116000003', // 产品类型
          sceneId: 'app-cpxqye-02', // 场景ID
          user_id: this.$cookies.get('userId'), // 用户ID(选填)
          platform: 'app', // 平台（app,m,pc）
          productId: this.proDetail.id, // 产品id
        },
      })
      if (plannerRes.code === 200) {
        this.tcPlannerBooth = plannerRes.data.records[0]
      }
    },
    fieldListFun() {
      const fieldList = {}
      this.proDetail.fieldList.forEach((list) => {
        fieldList[list.fieldCode] = list
      })
      console.log(fieldList)
      const tcBasicDataArr = [...tcBasicData[this.proDetail.dictCode]]
      tcBasicDataArr.forEach((item, idx) => {
        // 有翻译的值,显示翻译的值
        if (fieldList[item.listKey] && fieldList[item.listKey].fieldValueCn) {
          tcBasicDataArr[idx].listVal = fieldList[item.listKey].fieldValueCn
        } else if (
          fieldList[item.listKey] &&
          fieldList[item.listKey].fieldValue
        ) {
          // 没有翻译的值,使用原始值
          tcBasicDataArr[idx].listVal = fieldList[item.listKey].fieldValue
        } else {
          // 数据不存在,使用'/'代替
          tcBasicDataArr[idx].listVal = '/'
        }
      })
      return tcBasicDataArr
    },
    // 加入购物车
    addCart() {
      console.log('加入购物车')
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
    // 获取手机号
    getUserIndo() {
      if (this.token) {
        this.$axios
          .get(userinfoApi.info, {
            params: {
              id: this.userInfo.userId,
            },
          })
          .then((res) => {
            if (res.code === 200) {
              this.userInfoData = res.data
            } else {
              this.$xToast.show({
                message: '网络错误,请刷稍后再试',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.scroTopStyle {
  /deep/.sp-sticky {
    border: 1px solid #f4f4f4;
    .sp-top-nav-bar {
      background-color: #fff !important;
      .spiconfont {
        color: #1a1a1a !important;
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
  /deep/ .sp-hairline--bottom::after {
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
/deep/ .sp-top-nav-bar__left,
/deep/ .sp-top-nav-bar__right {
  font-weight: initial;
}
</style>
