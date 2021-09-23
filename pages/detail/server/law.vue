<template>
  <section>
    <ShareModal />
    <div class="template">
      <!-- header-->
      <Header :rec-planner="tcPlannerBooth" />
      <!--start 会员价 -->
      <!-- <MemberPrice></MemberPrice> -->

      <!--S 第一板块-->
      <Title :comment="comments" @onComment="commentHandler" />
      <!--E 第一板块-->
      <PageMidAd :ad-location-code="'ad100399'" />
      <!--S 第二板块 领券 SKU-->
      <VouchersSelect ref="sku" />
      <!--E 第二板块 领券 SKU-->
      <!--S 第三板块 包含项目-->
      <!-- <ContainProject /> -->
      <!--E 第三板块 包含项目-->
      <!--S 第三板块 包含服务-->
      <!-- 攻略 -->
      <RecConten category-code="con100189" />
      <!-- 律师 -->
      <RecLawyer />
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
      <TcPlanners :recommend-planner="planners" />
      <!--E 第五板块 推荐规划师-->
      <!--S  精选案例-->
      <!-- <OrderCase></OrderCase> -->
      <CaseNew />
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
      <bottomBar :planner-info="tcPlannerBooth" />
    </div>
  </section>
</template>

<script>
import { Sticky, List, TopNavBar, ShareSheet } from '@chipspc/vant-dgg'
import ShareModal from '@/components/common/ShareModal.vue'
import Banner from '~/components/detail/Banner.vue'
import Title from '~/components/detail/server/Title.vue'
import CommentBox from '~/components/detail/comment/CommentBox.vue'
import OrderCase from '~/components/detail/OrderCase.vue'
import OrderDynamic from '~/components/detail/OrderDynamic.vue'
import VouchersSelect from '~/components/detail/server/NewVouchersSelect.vue'
// import ContainProject from '~/components/detail/ContainProject.vue'
import ContainContent from '~/components/detail/ContainContent.vue'
import TcPlanners from '~/components/detail/server/TcPlanners.vue'
import ServiceDetail from '~/components/detail/ServiceDetail.vue'
import RelatedRecommend from '~/components/detail/RelatedRecommend.vue'
import RecConten from '@/components/detail/server/law/recContent.vue'
import RecLawyer from '@/components/detail/server/law/recLawyer.vue'
import bottomBar from '@/components/detail/bottomBar/index.vue'
import MyIcon from '~/components/common/myIcon/MyIcon'
import CaseNew from '~/components/detail/CaseNew'
import PageMidAd from '~/components/detail/server/PageMidAd'
import getUserSign from '~/utils/fingerprint'
import { productDetailsApi, recommendApi, shopApi } from '~/api'
import { copyToClipboard } from '~/utils/common'
import imHandle from '~/mixins/imHandle'
import detailMixin from '~/mixins/servedetail'
import Header from '~/components/detail/server/Header'

export default {
  name: 'ItDetail',
  components: {
    ShareModal,
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [ShareSheet.name]: ShareSheet,
    Title,
    RecConten,
    VouchersSelect,
    // ContainProject,
    ContainContent,
    TcPlanners,
    ServiceDetail,
    RelatedRecommend,
    bottomBar,
    // MemberPrice,
    CommentBox,
    RecLawyer,
    // OrderCase,
    OrderDynamic,
    CaseNew,
    PageMidAd,
    Header,
  },
  mixins: [imHandle, detailMixin],
  layout: 'keepAlive',
  watchQuery: ['productId'],
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
