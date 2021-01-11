<template>
  <div class="template">
    <!--S 导航栏-->
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
    <!--E 导航栏-->
    <!--S banner-->
    <Banner :images="tcProductDetailData.productImgArr" />
    <!--S banner-->
    <!--S 第一板块-->
    <Title :tc-product-detail-data="tcProductDetailData" />
    <!--E 第一板块-->
    <!--S 第二板块 基本信息-->
    <Basic :tc-product-detail-data="{ tcProductDetailData }">
      <div slot="basic">
        <div class="company_info">
          <BasicItem
            v-for="(baseDataList, idx) in fieldList"
            :key="idx"
            :base-data-list="baseDataList"
          />
        </div>
      </div>
    </Basic>
    <!--E 第二板块 基本信息-->
    <slot name="qualification"></slot>
    <!--资质信息-->
    <QftDetails
      v-if="tcProductDetailData.dictCode === 'CATE-JYZY-ZZ'"
      :qft-details-data="tcProductDetailData.qftDetails"
    />
    <!--S 第三板块 评估报告-->
    <Report :class-code-dict="tcProductDetailData.dictCode" />
    <!--E 第三板块 评估报告-->
    <!--S 第四板块 交易服务保障承诺-->
    <Commitment />
    <!--E 第四板块 交易服务保障承诺-->
    <!--S 第五板块 推荐规划师-->
    <Planners
      :im-jump-query="imJumpQuery"
      :recommend-planner="recommendPlanner"
    />
    <!--E 第五板块 推荐规划师-->
    <!--S 第六板块 商品动态-->
    <Dynamic />
    <!--E 第六板块 商品动态-->
    <!--S 第七板块 常见问题-->
    <Question :class-code-dict="tcProductDetailData.dictCode" />
    <!--E 第七板块 常见问题-->
    <!--S 第八板块 成功案例-->
    <Case
      :class-code-dict="tcProductDetailData.dictCode"
      :detail-type="detailType"
    />
    <!--E 第八板块 成功案例-->
    <!--S 第九板块 同类推荐-->
    <Recommend
      :detail-type="detailType"
      :similar-recommend-data="similarRecommend"
    />
    <!--E 第九板块 同类推荐-->
    <!--S 第十板块 猜你需要-->
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Need :detail-type="detailType" :product-data="recommendProduct" />
    </sp-list>
    <!--E 第十板块 猜你需要-->
    <commodityConsultation
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
import Banner from '~/components/detail/Banner'
import Title from '~/components/detail/Title'
import Basic from '~/components/detail/Basic'
import Report from '~/components/detail/Report'
import Commitment from '~/components/detail/Commitment'
import Planners from '~/components/detail/Planners'
import Dynamic from '~/components/detail/Dynamic'
import Question from '~/components/detail/Question'
import Case from '~/components/detail/Case'
import Recommend from '~/components/detail/Recommend'
import Need from '~/components/detail/Need'
import commodityConsultation from '@/components/common/commodityConsultation/commodityConsultation'
import getUserSign from '~/utils/fingerprint'
import tcBasicData from '~/mock/tcBasicData'
import { recommendApi, userinfoApi } from '~/api'
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
    Planners,
    Dynamic,
    Question,
    Case,
    Recommend,
    Need,
    commodityConsultation,
    MyIcon,
    BasicItem,
    QftDetails,
  },
  props: {
    detailType: {
      type: String,
      default: () => {
        return null
      },
    },
    tcProductDetailData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    tcPlannerBooth: {
      type: Object,
      default: () => {
        return {}
      },
    },
    recommendPlanner: {
      type: Array,
      default: () => [],
    },
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
      fieldList: [],
      showShare: false, // 是否弹起分享组件
      shareOptions: [{ name: '复制链接', icon: 'link' }],
      userInfoData: {
        decodePhone: null,
        fullName: null,
      },
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
  },
  mounted() {
    // 获取推荐产品
    this.getrecommendProduct()
    // 获取同类推荐
    this.getSimilarRecommend()
    this.fieldListFun() // 加载基本信息
    this.getUserIndo()
  },
  methods: {
    scrollHandle({ scrollTop }) {
      // 滚动事件
      this.opacity = scrollTop / 120
    },
    onClickLeft() {
      // 返回上一页
      this.$router.back()
    },
    //
    onLoad() {
      this.productPage += 1
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
      const formatId1 = this.tcProductDetailData.classCodeLevel.split(',')[0] // 产品二级分类
      const formatId2 = this.tcProductDetailData.classCodeLevel.split(',')[1] // 产品二级分类
      const formatId3 = this.tcProductDetailData.classCodeLevel.split(',')[2] // 产品三级分类
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
            productId: this.tcProductDetailData.id, // 产品ID（产品详情页必传）
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
            title: this.tcProductDetailData.name, // 产品名称（产品详情页传、咨询页等）
            platform: 'APP', // 平台（app,m,pc）
            page: this.productPage,
            limit: this.productLimit,
            searchType: 1, // 搜索推荐产品类型：1：交易，2服务
          },
        })
        .then((res) => {
          if (res.code === 200) {
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
      const formatId1 = this.tcProductDetailData.classCodeLevel.split(',')[0] // 产品二级分类
      const formatId2 = this.tcProductDetailData.classCodeLevel.split(',')[1] // 产品二级分类
      const formatId3 = this.tcProductDetailData.classCodeLevel.split(',')[2] // 产品三级分类
      const formatId = formatId3 || formatId2
      this.$axios
        .get(recommendApi.recommendProduct, {
          params: {
            userId: this.$cookies.get('userId'), // 用户id
            deviceId: this.deviceId, // 设备ID
            formatId, // 产品三级类别,没有三级类别用二级类别（首页等场景不需传，如其他场景能获取到必传）
            areaCode: this.city.code, // 区域编码
            classCode: formatId1,
            sceneId: 'app-jycpxq-01', // 场景ID
            productId: this.tcProductDetailData.id, // 产品ID（产品详情页必传）
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
            title: this.tcProductDetailData.name, // 产品名称（产品详情页传、咨询页等）
            platform: 'APP', // 平台（app,m,pc）
            page: 1,
            limit: 5,
            searchType: 1, // 搜索推荐产品类型：1：交易，2服务
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.similarRecommend = res.data.records
          }
        })
        .catch((err) => {
          this.loading = false
          console.log(err)
        })
    },
    fieldListFun() {
      const fieldList = {}
      this.tcProductDetailData.fieldList.forEach((list) => {
        fieldList[list.fieldCode] = list
      })
      const tcBasicDataArr = [...tcBasicData[this.tcProductDetailData.dictCode]]
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
      console.log(tcBasicDataArr)
      this.fieldList = tcBasicDataArr
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
