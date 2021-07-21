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
    <Banner :images="imgs" />
    <!--S banner-->

    <!--S 第一板块-->
    <Title :info="caseDetail" />

    <!--S 服务团队-->
    <!--       v-if="planner.mchUserId || teamMmembers.length > 0" -->
    <ServiceTeam
      :planner="planner"
      :team-mmembers="teamMmembers"
      :case-member="caseDetailInfo.members"
    />
    <!--E 服务团队-->

    <!-- 案件简介 -->
    <CaseIntroduction
      title="案例简介"
      :text="caseInfo.content"
      :images="caseInfo.imgs"
    />

    <!--S  办理经过-->
    <HandlingProcess :info="processing"></HandlingProcess>

    <!-- 办理结果 -->
    <CaseIntroduction
      title="办理结果"
      :text="caseResult.content"
      :images="caseResult.imgs"
    />

    <!-- 专家点评 -->
    <ExpertComments :info="expertEvaluation"></ExpertComments>

    <!--E 评论-->
    <CommentBox v-if="commentdata.length > 0" :list="commentdata" />
    <!-- tcPlannerBooth -->
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
import HandlingProcess from '@/components/caseExamples/details/HandlingProcess.vue'

import ServiceTeam from '@/components/caseExamples/details/ServiceTeam.vue'
import ExpertComments from '@/components/caseExamples/details/ExpertComments.vue'

import bottomBar from '@/components/detail/bottomBar/index.vue'

import getUserSign from '@/utils/fingerprint'
import { productDetailsApi, caseApi, planner, storeApi } from '@/api'

import imHandle from '@/mixins/imHandle'
export default {
  name: 'CaseExamplesdetails',
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
    HandlingProcess,

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
      caseDetail: {}, // 信息，包含详情
      caseDetailInfo: {}, // 详情

      opacity: 0,
      finished: false, // 停止加载更多
      loading: false,

      planerInfo: {}, // 请求的规划师信息

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
      ], // 规划师列表
      plannerLimit: 3, // 推荐规划师每页条数
      plannerPage: 1, // 推荐规划师当前页
      tcPlannerBooth: {},
      deviceId: null, // 设备唯一码
      imgFileIdPaths: [], // 产品图片

      isShare: false,

      keys: Object.keys({
        1: '案例列表图',
        hHauR8vs78n2brXYuBia1G: '案例头图',
        caseInfo: '案例简介',
        processing: '办理经过',
        // case1626678429069: '交易处理记录222222',
        caseResult: '案例结果',
        expertEvaluation: '专家评价',
        UserReviews: '用户评价',
      }),
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

    imgs() {
      return this.caseDetailInfo?.hHauR8vs78n2brXYuBia1G?.imgs || []
    },
    // 案例简介
    caseInfo() {
      if (this.caseDetailInfo.caseInfo) {
        return {
          content: this.caseDetailInfo.caseInfo.content,
          imgs: this.caseDetailInfo.caseInfo.imgs,
        }
      }
      return {}
    },
    // 专家评价
    expertEvaluation() {
      return this.caseDetailInfo?.expertEvaluation?.expertEvaluation || []
    },
    // 办理结果
    caseResult() {
      return this.caseDetailInfo?.caseResult || {}
    },
    // 办理过程
    processing() {
      if (this.caseDetailInfo?.processing?.experience) {
        const experience = this.caseDetailInfo?.processing?.experience
        const newExperience = []
        // const keys = ['BaseDate', 'BasePeople', 'BaseText', 'BaseUpload']
        experience.map((item) => {
          // 循环经过,item是一个数组

          const newExperienceItem = {
            name: item.name,
            time: this.getExperience(item.show, 'BaseDate').value,
            content: this.getExperience(item.show, 'BaseText').value,
            images: this.getExperience(item.show, 'BaseUpload').imgs || [],
          }

          newExperience.push(newExperienceItem)
        })
        console.log('newExperience', newExperience)
        return newExperience
      }
      return []
    },
    commentdata() {
      if (this.caseDetailInfo?.UserReviews?.cusEvaluation) {
        const cusEvaluation = this.caseDetailInfo?.UserReviews?.cusEvaluation
        const list = []

        cusEvaluation.map((item) => {
          // 循环经过,item是一个数组

          const newItem = {
            name: item.name,
            username: this.getExperience(item.value, 'BaseInput').value,
            time: this.getExperience(item.value, 'BaseDateTime').value,
            content: this.getExperience(item.value, 'BaseText').value,
            imgs: this.getExperience(item.value, 'BaseUpload').value,
          }

          list.push(newItem)
        })

        console.log('commentdata', list)
        return list
      }
      return []
    },

    planner() {
      const planner = this.handelPlannerData('STAFF_MEMBER_SIGN')
      return planner?.value || {}
    },
    teamMmembers() {
      const mmembers = this.handelPlannerData('STAFF_MEMBER_DIGESTION')
      return mmembers?.value || []
    },
  },

  created() {},
  mounted() {
    this.getDetails()

    // this.getRecommendPlanner()
  },
  methods: {
    handelPlannerData(key) {
      if (this.caseDetailInfo.members) {
        const info = this.caseDetailInfo.members.find((item) => {
          return item.type === key
        })
        return info
      }
      return {}
    },
    getExperience(arr, key) {
      const info = arr.find((item) => {
        return item.type === key
      })
      return info || {}
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
      this.$router.back()
    },

    getDataFromDetailInfo(detailInfo, key) {
      // ['1',"processing",'caseInfo',"hHauR8vs78n2brXYuBia1G","caseResult", "expertEvaluation","UserReviews"]
      let info = {}
      if (detailInfo?.infos) {
        info = detailInfo.infos.find((infosItem) => {
          return infosItem.key === key
        })
      }
      if (info) {
        return info
      }
      console.log(key, info)
      return {}
    },

    handelData(detailInfo, keys) {
      keys.map((key) => {
        const info = this.getDataFromDetailInfo(detailInfo, key)
        if (info.show && info.show.length > 0) {
          detailInfo[key] = info.show[0]
          console.log(key, info.show[0])
        }
      })
    },
    getDetails() {
      caseApi
        .case_detail({
          id: this.$route.query.id,
        })
        .then((res) => {
          if (res && res.detailInfo) {
            this.handelData(res.detailInfo, this.keys)
          }
          console.log(res)
          console.log('detailInfo', res.detailInfo)
          this.caseDetail = res || {}
          this.caseDetailInfo = res.detailInfo || {}

          // this.getPlanerInfo(this.planner.merchantUserId)
        })
        .catch((err) => {
          this.loading = false

          this.$xToast.error(err.message || '请求失败')
        })
    },
    async getPlanerInfo(id) {
      try {
        const newData = await this.$axios.get(storeApi.plannerDetail, {
          params: {
            mchUserId: id,
            dataFlg: '1',
            cardType: 'plannerCode',
          },
        })
        if (newData.code === 200) {
          this.planerInfo = newData.data || {}
        }
      } catch (error) {
        console.error('getDetail:', error)
        this.$xToast.show({
          message: error.message || '请求失败！',
          duration: 1000,
          forbidClick: false,
          icon: 'toast_ic_error',
        })
        return Promise.reject(error)
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
      // #icon-red {
      //   color: #4974f5 !important;
      // }
      .icon-red {
        color: #ec5330 !important;
      }
    }
  }
}
::v-deep .sp-hairline--bottom::after {
  border-bottom: none;
}
::v-deep .sp-top-nav-bar__left,
::v-deep .sp-top-nav-bar__right {
  font-weight: initial;
}
</style>
