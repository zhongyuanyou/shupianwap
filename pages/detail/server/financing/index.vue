<template>
  <section>
    <!-- 委托模块 -->
    <ShareModal />
    <div class="template">
      <!-- header-->
      <Header :rec-planner="tcPlannerBooth" :planners="planners" />
      <!--S 第一板块-->
      <Title :type="type" />
      <!-- 产品信息 -->
      <!-- <Info /> -->
      <!--E 第一板块-->
      <PageMidAd />

      <div class="youhui">
        <my-icon
          name="gerenzhongxin_youhuiquanicon"
          size="0.36rem"
          color="#EC5330"
          class="my_icon"
        ></my-icon>
        线下优惠可咨询规划师
        <imBtn btn-text="询优惠" />
      </div>

      <!--S 第二板块 领券 SKU-->
      <!-- <VouchersSelect ref="sku" :planner-detail="tcPlannerBooth" /> -->
      <!--E 第二板块 领券 SKU-->
      <!--S 第三板块 包含服务-->
      <!-- <ContainContent /> -->
      <!--E 第三板块 包含服务-->
      <!--S 第十板块 服务详情-->
      <ServiceDetail
        :title="serviceDetail"
        :detail-data="sellingDetail.salesGoodsOperatings.clientDetails[0]"
      />
      <!--S 评论-->
      <CommentBox
        v-if="Array.isArray(comments.records) && comments.records.length"
        id="comment"
        :comment="comments.records[0]"
        :good-id="sellingDetail.id"
      />
      <!--E 评论-->
      <!--S 动态 -->
      <!-- <OrderDynamic></OrderDynamic> -->
      <!--S 第五板块 推荐规划师-->
      <TcPlanners :recommend-planner="planners" />
      <!--E 第五板块 推荐规划师-->
      <!-- 热门咨询 -->
      <HotConsult :list="queList" :change-flag="queChangeFlag" />
      <!--S  精选案例-->
      <CaseNew :planner-detail="tcPlannerBooth" />
      <!--E  精选案例-->
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
      <bottomBar :planner-info="tcPlannerBooth" />
      <!-- 提问 -->
      <SiderConsult :list="queList" />
    </div>
  </section>
</template>

<script>
import { List, TopNavBar } from '@chipspc/vant-dgg'
import ShareModal from '@/components/common/ShareModal.vue'
import Title from '~/components/detail/server/Title.vue'
import CommentBox from '~/components/detail/comment/CommentBox.vue'
import OrderDynamic from '~/components/detail/OrderDynamic.vue'
// import VouchersSelect from '~/components/detail/server/NewVouchersSelect.vue'
// import ContainContent from '~/components/detail/ContainContent.vue'
import TcPlanners from '~/components/detail/server/TcPlanners.vue'
import Info from '~/components/detail/server/Info.vue'
import ServiceDetail from '~/components/detail/common/ServiceDetail.vue'
import RelatedRecommend from '~/components/detail/server/RelatedRecommend.vue'
import bottomBar from '@/components/detail/bottomBar/index.vue'
import CaseNew from '~/components/detail/CaseNew'
import PageMidAd from '@/components/detail/server/PageMidAd'
import Header from '~/components/detail/server/Header'
import HotConsult from '~/components/detail/common/HotConsult'
import SiderConsult from '~/components/detail/common/SiderConsult'
import imHandle from '~/mixins/imHandle'
import detailMixin from '~/mixins/servedetail'
import imBtn from '@/components/detail/common/RecImBtn'
export default {
  name: 'FinancingDetail',
  components: {
    ShareModal,
    [TopNavBar.name]: TopNavBar,
    [List.name]: List,
    Title,
    // ContainContent,
    TcPlanners,
    ServiceDetail,
    RelatedRecommend,
    bottomBar,
    CommentBox,
    // OrderDynamic,
    CaseNew,
    PageMidAd,
    Header,
    HotConsult,
    SiderConsult,
    imBtn,
    // Info,
  },
  mixins: [imHandle, detailMixin],
  layout: 'keepAlive',
  watchQuery: ['productId'],
  data() {
    return {
      type: 'financing', // 详情类型
      serviceDetail: '产品特色',
    }
  },
  methods: {},
}
</script>
<style lang="less" scoped>
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
.youhui {
  width: 100%;
  height: 132px;
  background: #ffffff;
  border-radius: 24px;
  display: block;
  padding: 20px 60px;
  font-size: 28px;
  color: #1a1a1a;
  text-align: left;
  line-height: 92px;
  .my_icon {
    float: left;
    margin-right: 12px;
  }
  .im_btn {
    float: right;
    background: #ec5330;
    border-radius: 8px;
    width: 118px;
    height: 56px;
    text-align: center;
    color: white;
    font-size: 26px;
    padding: 0;
    line-height: 56px;
    margin-top: 16px;
  }
}
::v-deep .sp-top-nav-bar__left,
::v-deep .sp-top-nav-bar__right {
  font-weight: initial;
}
</style>
