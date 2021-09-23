<template>
  <section>
    <!-- 委托模块 -->
    <ShareModal />
    <div class="template">
      <!-- header-->
      <Header />
      <!--start 会员价 -->
      <!-- <MemberPrice></MemberPrice> -->

      <!--S 第一板块-->
      <Title :comment="commentdata[0].tit" @onComment="comment" />
      <!--E 第一板块-->
      <PageMidAd :ad-location-code="'ad100399'" />
      <!--S 第二板块 领券 SKU-->
      <VouchersSelect ref="sku" :planner-detail="tcPlannerBooth" />
      <!--E 第二板块 领券 SKU-->
      <!--S 第三板块 包含项目-->
      <!-- <ContainProject /> -->
      <!--E 第三板块 包含项目-->
      <!--S 第三板块 包含服务-->
      <ContainContent />
      <!--E 第三板块 包含服务-->
      <!--S 评论-->
      <CommentBox id="comment" :list="commentdata" />
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
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { List, TopNavBar } from '@chipspc/vant-dgg'
import ShareModal from '@/components/common/ShareModal.vue'
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
import bottomBar from '@/components/detail/bottomBar/index.vue'
import CaseNew from '~/components/detail/CaseNew'
import PageMidAd from '~/components/detail/server/PageMidAd'
import getUserSign from '~/utils/fingerprint'
import Header from '~/components/detail/server/Header'
import { productDetailsApi, recommendApi, shopApi, evaluateApi } from '~/api'
import { copyToClipboard } from '~/utils/common'
import imHandle from '~/mixins/imHandle'
import detailMixin from '~/mixins/servedetail'
export default {
  name: 'ItDetail',
  components: {
    ShareModal,
    [TopNavBar.name]: TopNavBar,
    [List.name]: List,
    Title,
    VouchersSelect,
    // ContainProject,
    ContainContent,
    TcPlanners,
    ServiceDetail,
    RelatedRecommend,
    bottomBar,
    // MemberPrice,
    CommentBox,
    // OrderCase,
    OrderDynamic,
    CaseNew,
    PageMidAd,
    Header,
  },
  mixins: [imHandle, detailMixin],
  layout: 'keepAlive',
  watchQuery: ['productId'],
  data() {
    return {
      comments: {
        totalCount: 0, // 初始化评论字段,防止程序报错
        records: [],
      },
    }
  },
  mounted() {
    // 获取评价
    this.getCommentsApi()
  },
  methods: {
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
