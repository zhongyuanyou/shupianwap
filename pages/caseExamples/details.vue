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
          <div v-if="!isShare">
            <my-icon name="nav_ic_back" size="0.4rem" color="#fff"></my-icon>
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <!--E 导航栏-->
    <!--S banner-->
    <Banner :images="imgFileIdPaths" />
    <!--S banner-->

    <!--S 第一板块-->
    <Title />

    <!-- 案件简介 -->
    <CaseIntroduction
      title="案例简介"
      text="尤其是有很多流浪都是有铁粉的，我理解铁粉不是应该一开始关注随着时间推长。"
      :images="[1, 1, 1, 1, 1, 1]"
    />

    <!--S  办理经过-->
    <OrderCase></OrderCase>
    <!-- 办理结果 -->
    <CaseIntroduction
      title="办理结果"
      text="山东省潍坊市中级人民法院于2009年10月14日以(2009) 潍刑一初字第35号刑事判决 潍刑一初字第35号刑事判决潍刑一初字第35号刑事判决"
      :images="[1, 2]"
    />

    <!--E 评论-->
    <CommentBox id="comment" :list="commentdata" />

    <!--S 动态 -->
    <OrderDynamic></OrderDynamic>
    <!--S 第五板块 推荐规划师-->
    <TcPlanners :im-jump-query="imJumpQuery" :recommend-planner="planners" />
    <!--E 第五板块 推荐规划师-->

    <!--E  精选案例-->
    <!--S 第十板块 服务详情-->
    <ServiceDetail
      comp-type="sc"
      :detail-data="sellingDetail.salesGoodsOperatings.clientDetails[0]"
    />

    <!--E 第十板块 猜你需要-->
    <bottomBar :im-jump-query="imJumpQuery" :planner-info="tcPlannerBooth" />
  </div>
</template>

<script>
import { TopNavBar, Sticky, List } from '@chipspc/vant-dgg'
import { mapActions } from 'vuex'
import Banner from '@/components/detail/Banner.vue'
import Title from '@/components/caseExamples/details/Title.vue'
import CaseIntroduction from '@/components/caseExamples/details/CaseIntroduction.vue'

import CommentBox from '@/components/caseExamples/details/CommentBox.vue'
import OrderCase from '@/components/caseExamples/details/OrderCase.vue'

import OrderDynamic from '@/components/detail/OrderDynamic.vue'

// import ContainProject from '@/components/detail/ContainProject.vue'
import ContainContent from '@/components/detail/ContainContent.vue'
import TcPlanners from '@/components/detail/TcPlanners1.vue'
import ServiceDetail from '@/components/detail/ServiceDetail.vue'

import bottomBar from '@/components/detail/bottomBar/index.vue'

import getUserSign from '@/utils/fingerprint'
import { productDetailsApi, recommendApi, shopApi } from '@/api'

import { copyToClipboard } from '@/utils/common'
import imHandle from '@/mixins/imHandle'
export default {
  name: 'DetailTemplate',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [List.name]: List,

    Banner,
    Title,
    CaseIntroduction,

    // ContainProject,
    // ContainContent,
    TcPlanners,
    ServiceDetail,
    bottomBar,

    CommentBox,
    OrderCase,
    OrderDynamic,
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
      commentlist: [
        {
          phone: '153******67',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: ' 2020.10.06',
          tit: '需要办好几个业务，其中有个营业执照比较急，找了一些其他的公司咨询，要么不能在规定时间办理，要么价格贵太多，对比了以后最终选择在薯片办理，当然也不失所望，办理速度快，在承诺时间内就拿到了执照了，其他几个业务也办下来了，性价比挺高的。',
          val: 100,
        },
        {
          phone: '175******69',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: ' 2020.11.16',
          tit: '办理的几项业务中，对比其他公司收费不算是高，也是明码标价，关键是服务很细致没有其他的担忧，而且过程中没有任何要求额外加价的情况，省时省精力还有质量保证，其实折算下来比那些号称低价的花费更少，总之性价比很高。',
          val: 100,
        },
        {
          phone: '134******98',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: ' 2020.11.07',
          tit: '最初了解到薯片是在电梯里面，看到工商注册的广告，正好那段时间想出来创业，对注册公司不太了解，就找到薯片咨询了一下，注册公司流程繁琐。觉得还是交给代理公司去做，合作很愉快，同时也把公司其他业务交给了薯片来做，非常满意。',
          val: 100,
        },

        {
          phone: '189******18',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.10.05',
          tit: '当我遇到问题顾问非常耐心的解答了我的问题，有什么意见也是及时处理了的，而且办事人员每个步骤都通知到位，资料都整理的很好，我是很满意的。',
          val: 100,
        },
      ],
      commentdata: [],
      isShare: false,
    }
  },
  computed: {
    sellingDetail() {
      // 获取客户端展示信息
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  created() {
    for (let i = 0; i < 3; i++) {
      const val =
        this.commentlist[Math.floor(Math.random() * this.commentlist.length)]
      this.commentdata.push(val)
    }
  },
  async mounted() {
    this.isShare = this.$route.query.isShare
    // 假如未获取到站点信息,再获取地理位置
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
    // 获取商品图片
    this.getSellingImg()
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

::v-deep .sp-top-nav-bar__left,
::v-deep .sp-top-nav-bar__right {
  font-weight: initial;
}
</style>
