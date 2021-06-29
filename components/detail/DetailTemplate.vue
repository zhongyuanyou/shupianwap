<template>
  <div class="template">
    <!--S 导航栏-->
    <sp-sticky
      v-if="!isApplets"
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
          <div v-if="!isShare">
            <my-icon name="nav_ic_back" size="0.4rem" color="#fff"></my-icon>
          </div>
        </template>
        <template #right>
          <div>
            <!-- <my-icon
              :class="proDetail.isSave ? 'icon-red' : ''"
              style="margin-right: 0.36rem"
              name="shoucang_mian"
              size="0.4rem"
              color="#fff"
              @click.native="handleClickSave"
            /> -->
            <my-icon
              :class="proDetail.isSave ? 'icon-red' : ''"
              style="margin-right: 0.36rem"
              :name="proDetail.isSave ? 'shoucang_mian' : 'shoucang'"
              size="0.4rem"
              :color="proDetail.isSave ? '#4e78f5' : '#fff'"
              @click.native="handleClickSave"
            />
          </div>
          <div>
            <my-icon
              class="head__icon-share"
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
    <!--S 第二板块 基本信息-->
    <Basic>
      <div slot="basic">
        <div class="company_info">
          <BasicItem
            v-for="(baseDataList, idx) in fieldListFun()"
            :key="idx"
            :base-data-list="baseDataList"
          />
        </div>
      </div>
    </Basic>
    <!--E 第二板块 基本信息-->
    <slot name="qualification"></slot>
    <!--资质信息-->
    <QftDetails v-if="proDetail.dictCode === 'CATE-JYZY-ZZ'" />
    <!--S 第三板块 评估报告-->
    <Report />
    <!--E 第三板块 评估报告-->
    <!--S 第四板块 交易服务保障承诺-->
    <Commitment />
    <!--E 第四板块 交易服务保障承诺-->
    <!--S 第五板块 推荐规划师-->
    <TcPlanners
      v-show="planners"
      :im-jump-query="imJumpQuery"
      :recommend-planner="planners"
    />
    <!--E 第五板块 推荐规划师-->
    <ServiceDetail
      comp-type="tc"
      :detail-data="proDetail.goodsOperating.clientDetails[0]"
    />
    <!--S 第六板块 商品动态-->
    <Dynamic />
    <!--E 第六板块 商品动态-->
    <!--S 第七板块 常见问题-->
    <Question />
    <!--E 第七板块 常见问题-->
    <!--S 第八板块 成功案例-->
    <Case />
    <!--E 第八板块 成功案例-->
    <!--S 第九板块 同类推荐-->
    <Recommend
      ref="recLoading"
      :similar-recommend-data="similarRecommend"
      :dict-code="proDetail.dictCode"
    />
    <!--E 第九板块 同类推荐-->
    <!--S 第十板块 猜你需要-->
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Need
        ref="remNeed"
        :product-data="recommendProduct"
        :dict-code="proDetail.dictCode"
      />
    </sp-list>
    <!--E 第十板块 猜你需要-->
    <tcCommodityConsultation
      :im-jump-query="imJumpQuery"
      :planner-info="tcPlannerBooth"
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
  TopNavBar,
  Sticky,
  Bottombar,
  BottombarButton,
  BottombarIcon,
  BottombarInfo,
  List,
  ShareSheet,
} from '@chipspc/vant-dgg'
import { mapActions, mapState } from 'vuex'
import Banner from '~/components/detail/Banner'
import Title from '~/components/detail/Title'
import Basic from '~/components/detail/Basic'
import Report from '~/components/detail/Report'
import Commitment from '~/components/detail/Commitment'
import TcPlanners from '~/components/detail/TcPlanners'
import ServiceDetail from '~/components/detail/ServiceDetail'
import Dynamic from '~/components/detail/Dynamic'
import Question from '~/components/detail/Question'
import Case from '~/components/detail/Case'
import Recommend from '~/components/detail/Recommend'
import Need from '~/components/detail/Need'
import tcCommodityConsultation from '@/components/common/commodityConsultation/tcCommodityConsultation'
import getUserSign from '~/utils/fingerprint'
import tcBasicData from '~/mock/tcBasicData'
import { productDetailsApi, recommendApi, userinfoApi, shopApi } from '~/api'
import MyIcon from '~/components/common/myIcon/MyIcon'
import BasicItem from '~/components/detail/BasicItem'
import QftDetails from '~/components/detail/QftDetails'
import { copyToClipboard } from '~/utils/common'
export default {
  name: 'DetailTemplate',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
    [BottombarInfo.name]: BottombarInfo,
    [List.name]: List,
    [ShareSheet.name]: ShareSheet,
    Banner,
    Title,
    Basic,
    Report,
    Commitment,
    TcPlanners,
    ServiceDetail,
    Dynamic,
    Question,
    Case,
    Recommend,
    Need,
    tcCommodityConsultation,
    MyIcon,
    BasicItem,
    QftDetails,
  },
  props: {
    imJumpQuery: {
      type: Object,
      default: () => {
        return {}
      },
    },
    sceneId1: {
      type: String,
      default: '',
    },
    sceneId2: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      opacity: 0,
      text1: '在线咨询',
      text2: '电话咨询',
      finished: false, // 停止加载更多
      loading: false,
      productPage: 1,
      productLimit: 10,
      productCount: 0,
      recommendProduct: [],
      similarRecommend: [], // 同类推荐产品
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
      deviceId: null, // 设备唯一码\
      isShare: false,
    }
  },
  computed: {
    // 产品详情
    proDetail() {
      return this.$store.state.tcProductDetail.detailData
    }, // 产品banner
    city() {
      return this.$store.state.city.currentCity
    },
    ...mapState({
      isApplets: (state) => state.app.isApplets,
    }),
  },
  async mounted() {
    this.isShare = this.$route.query.isShare
    this.fieldListFun() // 加载基本信息
    this.getUserIndo()
    // 假如未获取到站点信息,再获取地理位置
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
    // 获取推荐产品
    this.getrecommendProduct()
    // 获取同类推荐
    this.getSimilarRecommend()
    // 推荐规划师
    this.getRecommendPlanner()
    // 获取钻展
    this.getRecPlanner()
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    // shouchang
    handleClickSave() {
      if (this.proDetail.isSave) {
        this.cancelSave()
      } else {
        this.addSave()
      }
    },
    // 取消收藏
    cancelSave() {
      // 直接调商户中心接口，未经过node中间层，中间层无法处理formData
      const formData = new FormData()
      formData.append('goodsId', this.proDetail.id)
      this.$axios
        .post(shopApi.cancelSave, formData)
        .then((res) => {
          if (res.code === 200) {
            this.$xToast.success('取消成功')
            this.proDetail.isSave = false
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
      const classCodeLevel = this.proDetail.classCodeLevel
      let codeArr = []
      if (classCodeLevel) {
        codeArr = classCodeLevel.split(',')
      }
      const params = {
        goodsDtos: [
          {
            goodsId: this.proDetail.id,
            goodsCode: this.proDetail.classCode,
            catalog1: codeArr.length && codeArr.length > 0 ? codeArr[0] : '',
            catalog2: codeArr.length && codeArr.length > 1 ? codeArr[1] : '',
            catalog3: codeArr.length && codeArr.length > 2 ? codeArr[2] : '',
            goodsType: 'proGoodsJy',
            ext1: 2,
          },
        ],
      }
      this.$axios
        .post(shopApi.addGoods, params)
        .then((res) => {
          if (res && res.code === 200) {
            this.$xToast.show({
              message: '收藏成功',
              duration: 3000,
              icon: 'toast_ic_comp',
              forbidClick: true,
            })
            this.proDetail.isSave = true
          } else {
            this.$xToast.error(res.message || '收藏失败')
          }
        })
        .catch((err) => {
          console.log('err', err)
          this.$xToast.error('收藏失败')
        })
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
      console.log('this.proDetail.classCodeLevel', this.proDetail)
      const formatId1 = this.proDetail.classCodeLevel.split(',')[0] // 产品二级分类
      const formatId2 = this.proDetail.classCodeLevel.split(',')[1] // 产品二级分类
      const formatId3 = this.proDetail.classCodeLevel.split(',')[2] // 产品三级分类
      this.$axios
        .post(recommendApi.saleList, {
          userId: this.$cookies.get('userId', { path: '/' }), // 用户id
          deviceId: this.deviceId, // 设备ID
          formatId: formatId2 || formatId3, // 产品二级类别,没有二级类别用三级类别（首页等场景不需传，如其他场景能获取到必传）
          classCode: formatId1,
          areaCode: this.$store.state.city.currentCity.code || '510100', // 区域编码
          sceneId: 'app-jycpxq-02', // 场景ID
          productId: this.proDetail.id, // 产品ID（产品详情页必传）
          productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
          title: this.proDetail.name, // 产品名称（产品详情页传、咨询页等）
          platform: 'app', // 平台（app,m,pc）
          page: {
            pageNo: this.productPage,
            pageSize: this.productLimit,
          },
          dictCode: this.proDetail.dictCode,
          searchType: 1, // 搜索推荐产品类型：1：交易，2服务
          formatIdOne: formatId1 || formatId2,
          // formatIds: formatId1 + '@' + formatId2, // 产品标识，支付返回页必传。交易产品或服务产品产品的业态标识由 产品类型的id与二级类别的id构成，中间用 @ 连接，多个产品标识时用 # 连接
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
    // 获取同类推荐
    async getSimilarRecommend() {
      this.loading = true
      // 获取用户唯一标识
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      const formatId1 = this.proDetail.classCodeLevel.split(',')[0] // 产品二级分类
      const formatId2 = this.proDetail.classCodeLevel.split(',')[1] // 产品二级分类
      const formatId3 = this.proDetail.classCodeLevel.split(',')[2] // 产品三级分类
      this.$axios
        .post(recommendApi.saleList, {
          userId: this.$cookies.get('userId', { path: '/' }), // 用户id
          deviceId: this.deviceId, // 设备ID
          formatId: formatId3 || formatId2, // 产品三级类别,没有三级类别用二级类别（首页等场景不需传，如其他场景能获取到必传）
          areaCode: this.$store.state.city.currentCity.code || '510100', // 区域编码
          classCode: formatId1,
          sceneId: 'app-jycpxq-01', // this.sceneId2 || this.sceneId1 //场景ID
          productId: this.proDetail.id, // 产品ID（产品详情页必传）
          productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
          title: this.proDetail.name, // 产品名称（产品详情页传、咨询页等）
          platform: 'app', // 平台（app,m,pc）
          page: {
            pageNo: 1,
            pageSize: 5,
          },
          searchType: 1, // 搜索推荐产品类型：1：交易，2服务
          formatIdOne: formatId1 || formatId2,
          dictCode: this.proDetail.dictCode,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$refs.recLoading.recLoading = false
            this.similarRecommend = res.data.records
          }
        })
        .catch((err) => {
          this.loading = false
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
            level_2_ID:
              this.proDetail.classCodeLevel.split(',')[1] ||
              this.proDetail.classCodeLevel.split(',')[2] ||
              this.proDetail.classCodeLevel.split(',')[0],
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: this.proDetail.id, // 产品id
            formatIdOne:
              this.proDetail.classCodeLevel.split(',')[0] ||
              this.proDetail.classCodeLevel.split(',')[1],
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
          level_2_ID:
            this.proDetail.classCodeLevel.split(',')[1] ||
            this.proDetail.classCodeLevel.split(',')[2] ||
            this.proDetail.classCodeLevel.split(',')[0],
          login_name: null, // 规划师ID(选填)
          productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
          sceneId: 'app-cpxqye-02', // 场景ID
          user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
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
              this.$store.dispatch('user/setInfo', res.data)
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
  ::v-deep.sp-sticky {
    border: 1px solid #f4f4f4;
    .sp-top-nav-bar {
      background-color: #fff !important;
      .spiconfont {
        color: #1a1a1a !important;
      }
      #icon-red {
        color: #4974f5 !important;
      }
      .icon-red {
        color: #4974f5 !important;
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
