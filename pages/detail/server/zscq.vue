<template>
  <section>
    <ShareModal />
    <div class="template">
      <!-- header-->
      <Header :rec-planner="tcPlannerBooth" :planners="planners" />

      <!--start 会员价 -->
      <!-- <MemberPrice></MemberPrice> -->

      <!--S 第一板块-->
      <Title />
      <!--E 第一板块-->
      <!-- 页面中部广告位 -->
      <PageMidAd />
      <div class="zxc">
        <div class="inner" @click="toZC()"></div>
      </div>
      <!-- <div class="banner file_box">
        <span class="text1">
          <sp-image
            src="https://cdn.shupian.cn/sp-pt/wap/images/d4b05q58tvc0000.png"
          />
        </span>
        <span class="text1">新人可享受500元律师费返还优惠</span>
      </div> -->
      <!--S 第二板块 领券 SKU-->

      <VouchersSelect ref="sku" />
      <!--E 第二板块 领券 SKU-->
      <!--S 第三板块 包含项目-->
      <!-- <ContainProject /> -->
      <!--E 第三板块 包含项目-->
      <!--S 第三板块 包含服务-->
      <ContainContent />
      <!--E 第三板块 包含服务-->
      <!--S 评论-->
      <CommentBox
        v-if="Array.isArray(comments.records) && comments.records.length"
        id="comment"
        :comment="comments.records[0]"
        :good-id="sellingDetail.id"
      />
      <!--E 评论-->
      <!--S  精选案例-->
      <!-- <OrderCase></OrderCase> -->
      <CaseNew />
      <!--E  精选案例-->
      <!--S 动态 -->
      <!-- <OrderDynamic></OrderDynamic> -->
      <!--S 第五板块 推荐规划师-->
      <TcPlanners :recommend-planner="planners" />
      <!--E 第五板块 推荐规划师-->
      <!-- 热门咨询 -->
      <HotConsult :list="queList" :change-flag="queChangeFlag" />
      <!--S 第十板块 服务详情-->
      <!-- <ServiceDetail
        :detail-data="sellingDetail.salesGoodsOperatings.clientDetails[0]"
      /> -->
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
      <bottomBar :planner-info="tcPlannerBooth" />
      <!-- 提问 -->
      <SiderConsult :list="queList" />
    </div>
  </section>
</template>

<script>
import { Sticky, List, TopNavBar, ShareSheet, Image } from '@chipspc/vant-dgg'
import ShareModal from '@/components/common/ShareModal.vue'
import Title from '~/components/detail/server/Title.vue'
import CommentBox from '~/components/detail/comment/CommentBox.vue'
import OrderCase from '~/components/detail/OrderCase.vue'
import OrderDynamic from '~/components/detail/OrderDynamic.vue'
import VouchersSelect from '~/components/detail/server/NewVouchersSelect.vue'
// import ContainProject from '~/components/detail/ContainProject.vue'
import ContainContent from '~/components/detail/ContainContent.vue'
import TcPlanners from '~/components/detail/server/TcPlanners.vue'
import ServiceDetail from '~/components/detail/common/ServiceDetail.vue'
import RelatedRecommend from '~/components/detail/server/RelatedRecommend.vue'
import bottomBar from '@/components/detail/bottomBar/index.vue'
import CaseNew from '~/components/detail/CaseNew'
import PageMidAd from '~/components/detail/server/PageMidAd'
import imHandle from '~/mixins/imHandle'
import detailMixin from '~/mixins/servedetail'
import Header from '~/components/detail/server/Header'
import HotConsult from '~/components/detail/common/HotConsult'
import SiderConsult from '~/components/detail/common/SiderConsult'

export default {
  name: 'ItDetail',
  components: {
    ShareModal,
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [Image.name]: Image,
    [ShareSheet.name]: ShareSheet,
    Title,
    VouchersSelect,
    // ContainProject,
    ContainContent,
    TcPlanners,
    // ServiceDetail,
    RelatedRecommend,
    bottomBar,
    // MemberPrice,
    CommentBox,
    // OrderCase,
    // OrderDynamic,
    CaseNew,
    PageMidAd,
    Header,
    HotConsult,
    SiderConsult,
  },
  mixins: [imHandle, detailMixin],
  layout: 'keepAlive',
  watchQuery: ['productId'],
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'ItDetail' })
  },
  methods: {
    toZC() {
      const link = window.location.href.includes('https://m.shupian.cn')
        ? 'https://mtool.shupian.cn/policySubsidy/measure?hideToHome=1'
        : 'https://tmtool.shupian.cn/policySubsidy/measure?hideToHome=1'
      window.location.href = link
    },
  },
}
</script>
<style lang="less" scoped>
.zxc {
  margin-bottom: 20px;
  height: 250px;
  background: #ffffff;
  border-radius: 24px;
  padding: 32px 40px;
  .inner {
    width: 100%;
    height: 100%;
    background: url(https://cdn.shupian.cn/sp-pt/wap/images/6bng2cxycz00000.png)
      no-repeat center center;
    background-size: 100% 100%;
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
