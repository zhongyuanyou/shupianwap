<template>
  <section>
    <ShareModal />
    <!-- <DetailTemplate scene-id1="app-fwcpxq-01" scene-id2="app-jycpxq-02" /> -->
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
      <ServeDetailTitle />
      <!--E 第一板块-->
      <!-- 页面中部广告位 -->
      <PageMidAd :ad-location-code="'ad100399'" />
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
      <CommentBox id="comment" :list="commentdata" />
      <!--E 评论-->
      <!--S 动态 -->
      <OrderDynamic></OrderDynamic>
      <!--S 第五板块 推荐规划师-->
      <TcPlanners :im-jump-query="imJumpQuery" :recommend-planner="planners" />
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
      <bottomBar :im-jump-query="imJumpQuery" :planner-info="tcPlannerBooth" />
      <!--    分享组件-->
      <sp-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="shareOptions"
        @select="onSelect"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { Sticky, List, TopNavBar, ShareSheet, Image } from '@chipspc/vant-dgg'
import ShareModal from '@/components/common/ShareModal.vue'
import Banner from '~/components/detail/Banner.vue'
import ServeDetailTitle from '~/components/detail/ServeDetailTitle.vue'
import CommentBox from '~/components/detail/CommentBox.vue'
import OrderCase from '~/components/detail/OrderCase.vue'
import OrderDynamic from '~/components/detail/OrderDynamic.vue'
import VouchersSelect from '~/components/detail/server/NewVouchersSelect.vue'
// import ContainProject from '~/components/detail/ContainProject.vue'
import ContainContent from '~/components/detail/ContainContent.vue'
import TcPlanners from '~/components/detail/TcPlanners1.vue'
import ServiceDetail from '~/components/detail/ServiceDetail.vue'
import RelatedRecommend from '~/components/detail/RelatedRecommend.vue'
import bottomBar from '@/components/detail/bottomBar/index.vue'
import MyIcon from '~/components/common/myIcon/MyIcon'
import CaseNew from '~/components/detail/CaseNew'
import PageMidAd from '~/components/detail/server/PageMidAd'
import getUserSign from '~/utils/fingerprint'
import { productDetailsApi, recommendApi, shopApi } from '~/api'
import { copyToClipboard } from '~/utils/common'
import imHandle from '~/mixins/imHandle'
import detailMixin from '~/mixins/servedetail'
export default {
  name: 'ItDetail',
  components: {
    ShareModal,
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [Image.name]: Image,
    [ShareSheet.name]: ShareSheet,
    Banner,
    ServeDetailTitle,
    VouchersSelect,
    // ContainProject,
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
    PageMidAd,
  },
  mixins: [imHandle, detailMixin],
  layout: 'keepAlive',
  watchQuery: ['productId'],
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'ItDetail' })
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
