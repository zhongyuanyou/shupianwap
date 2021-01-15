<template>
  <div class="audit-company-name">
    <!-- s 头部导航 -->
    <Header v-show="!isInApp" :title="title">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- e 头部导航 -->
    <div class="audit-company-name__centenr">
      <!-- s banner -->
      <Banner :imglist="imgList"></Banner>
      <!-- e banner -->
      <!-- s 表单 -->
      <AuditCompanyNameFrom :total="resultData.nums" />
      <!-- e 表单 -->
    </div>

    <!-- s 公司起名禁忌列表 -->
    <AuditCompanyNameTaboo :audittaboo="auditTaboo" />
    <!-- e 公司起名禁忌列表 -->
    <!-- s 规划师 -->
    <GuiHuaShiSwipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
      md-type="new"
    />
    <!-- e 规划师 -->
    <DggImCompany />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GuiHuaShiSwipe from '@/components/spread/auditCompanyName/GuiHuaShiSwipe'
import AuditCompanyNameFrom from '@/components/spread/auditCompanyName/AuditCompanyNameFrom'
import Header from '@/components/common/head/header'
import AuditCompanyNameTaboo from '@/components/spread/auditCompanyName/AuditCompanyNameTaboo'
import DggImCompany from '@/components/spread/DggImCompany'
import Banner from '@/components/spread/agency/banner'
import { spreadApi } from '@/api/spread'
export default {
  name: 'Index',
  components: {
    DggImCompany,
    Header,
    AuditCompanyNameFrom,
    AuditCompanyNameTaboo,
    GuiHuaShiSwipe,
    Banner,
  },
  props: {},

  // 服务端渲染请求数据
  async asyncData({ $axios }) {
    const type = 'extendAuthName'
    const defaultRes = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        adList: [],
        nums: {
          todayNum: 143,
          totalNum: 168996,
        },
        planlerList: [
          {
            id: 30134,
            userId: '3394',
            userCentreId: '3394',
            loginName: '2022554',
            realName: '刘琴',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13350072314',
            cvr: 0.092593,
            cvrValue: 60.683218,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 12112.4,
            busPerformanceValue: 86.575363,
            abilityValue: 67.466985,
            formatType: '工商',
          },
          {
            id: 30156,
            userId: '43999',
            userCentreId: '7704199733711282176',
            loginName: '96352931',
            realName: '岳雪冬',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13908231675',
            cvr: 0.145455,
            cvrValue: 64.543449,
            orderBus: 8,
            orderBusValue: 50.950718,
            busPerformance: 15623,
            busPerformanceValue: 91.389398,
            abilityValue: 71.329062,
            formatType: '工商',
          },
          {
            id: 30310,
            userId: '7930253930943676416',
            userCentreId: '7930253930615472128',
            loginName: '109870',
            realName: '李海怡',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13696057459',
            cvr: 0.106383,
            cvrValue: 61.705406,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 17770,
            busPerformanceValue: 93.504073,
            abilityValue: 70.2655,
            formatType: '工商',
          },
          {
            id: 30297,
            userId: '7887200447593906176',
            userCentreId: '7887200447257313280',
            loginName: '108862',
            realName: '李劲',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '18884259139',
            cvr: 0.159091,
            cvrValue: 65.511436,
            orderBus: 7,
            orderBusValue: 50.378921,
            busPerformance: 8744,
            busPerformanceValue: 79.993572,
            abilityValue: 68.049033,
            formatType: '工商',
          },
          {
            id: 30163,
            userId: '66475',
            userCentreId: '66475',
            loginName: '38798340',
            realName: '钟霞',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13730634929',
            cvr: 0.1,
            cvrValue: 61.23349,
            orderBus: 6,
            orderBusValue: 49.807025,
            busPerformance: 15278,
            busPerformanceValue: 90.996225,
            abilityValue: 69.28084,
            formatType: '工商',
          },
        ],
      },
    }
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      // 如果请求成功 把请求到的数据返回 否则把defaultRes的假数据返回
      if (res.code === 2000) {
        return { resultData: res.data }
      } else {
        return { resultData: defaultRes.data }
      }
      // 如果请求报错 把defaultRes的假数据返回
    } catch (error) {
      console.log(error)
      return { resultData: defaultRes.data }
    }
  },

  data() {
    return {
      title: '免费核名',
      /** 轮播规划师数据 */
      plannersData: [],
      plannersCommon: {
        title: '咨询规划师',
        imName: '免费核名_咨询规划师_在线咨询',
        telName: '免费核名_咨询规划师_拨打电话',
      },
      auditTaboo: {
        title: '公司起名，这些禁忌不能犯',
        taboo: [
          {
            id: 1,
            img: 'https://cdn.shupian.cn/sp-pt/wap/4o0wkcazz0o0000.png',
            details: '与其他公司重名',
          },
          {
            id: 2,
            img: 'https://cdn.shupian.cn/sp-pt/wap/3wj2bt56z380000.png',
            details: '触犯驰名商标',
          },
          {
            id: 3,
            img: 'https://cdn.shupian.cn/sp-pt/wap/ektzb2275kg0000.png',
            details: '与知名公司混淆',
          },
          {
            id: 4,
            img: 'https://cdn.shupian.cn/sp-pt/wap/8sg9dbf7ehw0000.png',
            details: '使用地区名及简称',
          },
          {
            id: 5,
            img: 'https://cdn.shupian.cn/sp-pt/wap/74lv2m747zw0000.png',
            details: '使用繁体/数字/英文',
          },
          {
            id: 6,
            img: 'https://cdn.shupian.cn/sp-pt/wap/8swye3g0wmc0000.png',
            details: '使用行业通用词',
          },
          {
            id: 7,
            img: 'https://cdn.shupian.cn/sp-pt/wap/86hkftm3wqs0000.png',
            details: '使用名人字号',
          },
          {
            id: 8,
            img: 'https://cdn.shupian.cn/sp-pt/wap/csc4z9bnyiw000.png',
            details: '带有宗教色彩',
          },
        ],
      },
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/591qqekl2f40000.png',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {},
  created() {
    // 请求回来的数据替代本地
    console.log(this.resultData)
    this.plannerHandle(this.resultData.planlerList)
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '免费核名',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage() // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '免费核名' }, () => {})
    }
  },
  methods: {
    /** 规划师数据处理 */
    plannerHandle(data) {
      if (data.length !== 0) {
        const guihuashiList = []
        data.forEach((item, i) => {
          const obj = {
            id: item.userCentreId,
            type: '金牌规划师',
            imgSrc: item.userHeadUrl,
            avatarImg: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 11,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.userPhoneloginName,
          }
          guihuashiList.push(obj)
        })
        this.plannersData = guihuashiList
        this.planner = guihuashiList[0]
      } else {
        return this.plannersData
      }
    },

    back() {
      // 返回上一页
      console.log(window.history.length)
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },
  },
  head() {
    return {
      title: '免费核名',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.audit-company-name {
  width: 750px;
  margin: 0 auto;
  position: relative;
  background-color: #ffffff;
  &__centenr {
    height: 900px;
    position: relative;
  }
  /deep/.fixed-head {
    .my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
      .slot-left {
        left: 32px;
      }
    }
  }
}
</style>
