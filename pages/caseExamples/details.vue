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
    <!-- 专家点评 -->
    <ExpertComments></ExpertComments>

    <!--S 第五板块 推荐规划师-->
    <ServiceTeam :im-jump-query="imJumpQuery" :recommend-planner="planners" />
    <!--E 第五板块 推荐规划师-->

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

import ServiceTeam from '@/components/caseExamples/details/ServiceTeam.vue'
import ExpertComments from '@/components/caseExamples/details/ExpertComments.vue'

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
    ServiceTeam,
    bottomBar,

    CommentBox,
    OrderCase,

    ExpertComments,
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
      planners: [
        {
          mchUserId: '728691677696664530',
          mchDetailId: '728691574617454297',
          officeAddressId: '728691574617454408',
          userName: '王茂婕',
          userCenterId: '607997598875151730',
          userCenterNo: 'U2000431059',
          phone:
            '0E687EEE72F48183A2C6EFC593FC0A06*DGGJGZX*PH314Eo/oe71oSJobb0CE01mzKjRRSI1f61QbQ==',
          point: '5',
          registerTime: '2020-12-24 18:44:07',
          userCenterAuthStatus: 'AUTHENTICATION_SUCCESS',
          status: 1,
          statusName: '启用',
          userCenterStatus: 1,
          userCenterStatusName: '正常',
          recentCompany: 'PCN测试服务商户',
          type: 'MERCHANT_B',
          mchNo: 'PBU2036000',
          isAdmin: 0,
          serveNum: 0,
          serveAge: 7,
          goodReputation: 95,
          payNum: 0,
          profilePhotoId: '',
          dggPlannerRecomLog:
            'productmap=[728694563914692664, 728691677696671018, 728691677696664530, 732284950661460939, 1076098595517908927, 767581610621041918, 767854117951796474, 767773578479304701, 1076098732956867488]&seqno=C306F8AD6FBAD6FDB9192946F8490AEA&recallno=44&ruleno=33&deviceId=deviceId&rankno=22',
          portrait:
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
        },
        {
          mchUserId: '728691677696664530',
          mchDetailId: '728691574617454297',
          officeAddressId: '728691574617454408',
          userName: '王茂婕',
          userCenterId: '607997598875151730',
          userCenterNo: 'U2000431059',
          phone:
            '0E687EEE72F48183A2C6EFC593FC0A06*DGGJGZX*PH314Eo/oe71oSJobb0CE01mzKjRRSI1f61QbQ==',
          point: '5',
          registerTime: '2020-12-24 18:44:07',
          userCenterAuthStatus: 'AUTHENTICATION_SUCCESS',
          status: 1,
          statusName: '启用',
          userCenterStatus: 1,
          userCenterStatusName: '正常',
          recentCompany: 'PCN测试服务商户',
          type: 'MERCHANT_B',
          mchNo: 'PBU2036000',
          isAdmin: 0,
          serveNum: 0,
          serveAge: 7,
          goodReputation: 95,
          payNum: 0,
          profilePhotoId: '',
          dggPlannerRecomLog:
            'productmap=[728694563914692664, 728691677696671018, 728691677696664530, 732284950661460939, 1076098595517908927, 767581610621041918, 767854117951796474, 767773578479304701, 1076098732956867488]&seqno=C306F8AD6FBAD6FDB9192946F8490AEA&recallno=44&ruleno=33&deviceId=deviceId&rankno=22',
          portrait:
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
        },
        {
          mchUserId: '728691677696664530',
          mchDetailId: '728691574617454297',
          officeAddressId: '728691574617454408',
          userName: '王茂婕',
          userCenterId: '607997598875151730',
          userCenterNo: 'U2000431059',
          phone:
            '0E687EEE72F48183A2C6EFC593FC0A06*DGGJGZX*PH314Eo/oe71oSJobb0CE01mzKjRRSI1f61QbQ==',
          point: '5',
          registerTime: '2020-12-24 18:44:07',
          userCenterAuthStatus: 'AUTHENTICATION_SUCCESS',
          status: 1,
          statusName: '启用',
          userCenterStatus: 1,
          userCenterStatusName: '正常',
          recentCompany: 'PCN测试服务商户',
          type: 'MERCHANT_B',
          mchNo: 'PBU2036000',
          isAdmin: 0,
          serveNum: 0,
          serveAge: 7,
          goodReputation: 95,
          payNum: 0,
          profilePhotoId: '',
          dggPlannerRecomLog:
            'productmap=[728694563914692664, 728691677696671018, 728691677696664530, 732284950661460939, 1076098595517908927, 767581610621041918, 767854117951796474, 767773578479304701, 1076098732956867488]&seqno=C306F8AD6FBAD6FDB9192946F8490AEA&recallno=44&ruleno=33&deviceId=deviceId&rankno=22',
          portrait:
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
        },

        {
          mchUserId: '728691677696664530',
          mchDetailId: '728691574617454297',
          officeAddressId: '728691574617454408',
          userName: '王茂婕',
          userCenterId: '607997598875151730',
          userCenterNo: 'U2000431059',
          phone:
            '0E687EEE72F48183A2C6EFC593FC0A06*DGGJGZX*PH314Eo/oe71oSJobb0CE01mzKjRRSI1f61QbQ==',
          point: '5',
          registerTime: '2020-12-24 18:44:07',
          userCenterAuthStatus: 'AUTHENTICATION_SUCCESS',
          status: 1,
          statusName: '启用',
          userCenterStatus: 1,
          userCenterStatusName: '正常',
          recentCompany: 'PCN测试服务商户',
          type: 'MERCHANT_B',
          mchNo: 'PBU2036000',
          isAdmin: 0,
          serveNum: 0,
          serveAge: 7,
          goodReputation: 95,
          payNum: 0,
          profilePhotoId: '',
          dggPlannerRecomLog:
            'productmap=[728694563914692664, 728691677696671018, 728691677696664530, 732284950661460939, 1076098595517908927, 767581610621041918, 767854117951796474, 767773578479304701, 1076098732956867488]&seqno=C306F8AD6FBAD6FDB9192946F8490AEA&recallno=44&ruleno=33&deviceId=deviceId&rankno=22',
          portrait:
            'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
        },
      ], // 规划师列表
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

    // this.getRecommendPlanner()
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
