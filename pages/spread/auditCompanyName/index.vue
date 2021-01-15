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
      <AuditCompanyNameFrom :total="result.nums" />
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
    try {
      const res = await $axios.get(spreadApi.list, {
        params: {
          pageCode: type,
        },
      })
      if (res.code === 200) {
        return {
          result: res.data,
        }
      }
    } catch (error) {
      console.log('error', error)
      return {
        result: '',
      }
    }
  },

  data() {
    return {
      title: '免费核名',
      // 请求失败的备用数据
      planlerList: [
        {
          id: 30312,
          userId: '7930253930943676416',
          userCentreId: '7930253930615472128',
          loginName: '109870',
          realName: '李海怡',
          userHeadUrl:
            'http://fastdfs.dggvip.net:8080/group1/M00/0F/60/CgAAB18_I3GEbQtUAAAAAF_T27Q303.jpg',
          userPhone: '13696057459',
          cvr: 0.146341,
          cvrValue: 64.606717,
          orderBus: 6,
          orderBusValue: 49.807025,
          busPerformance: 13492,
          busPerformanceValue: 88.692524,
          abilityValue: 70.319713,
          formatType: '工商',
        },
        {
          id: 30136,
          userId: '3394',
          userCentreId: '3394',
          loginName: '2022554',
          realName: '刘琴',
          userHeadUrl:
            'http://fastdfs.dggvip.net:8080/group1/M00/0F/72/CgAAB19ExY6EVv-6AAAAAG6SJVc351.jpg',
          userPhone: '13350072314',
          cvr: 0.06383,
          cvrValue: 58.521736,
          orderBus: 3,
          orderBusValue: 48.092239,
          busPerformance: 4412.4,
          busPerformanceValue: 68.377345,
          abilityValue: 60.229761,
          formatType: '工商',
        },
        {
          id: 30299,
          userId: '7887200447593906176',
          userCentreId: '7887200447257313280',
          loginName: '108862',
          realName: '李劲',
          userHeadUrl:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          userPhone: '18884259139',
          cvr: 0.209302,
          cvrValue: 68.96185,
          orderBus: 9,
          orderBusValue: 51.522266,
          busPerformance: 12192,
          busPerformanceValue: 86.706115,
          abilityValue: 72.229634,
          formatType: '工商',
        },
      ],
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

    if (this.result !== '' && this.result !== undefined) {
      if (
        this.result.planlerList !== undefined &&
        this.result.planlerList.length !== 0
      ) {
        if (this.result.planlerList.length < 3) {
          this.planlerList.forEach((item, index) => {
            this.planlerList[index] = this.result.planlerList[
              index % this.result.planlerList.length
            ]
          })
        } else {
          this.planlerList = this.result.planlerList
        }
        console.log(this.planlerList)
        this.getPlannersData()
      }
      if (this.result.adList !== undefined && this.result.adList.length !== 0) {
        this.adList = this.result.adList
      }
      if (this.result.nums !== undefined && this.result.nums.length !== 0) {
        this.todayNum = this.result.nums.todayNum
      }
    }
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
    // 规划师模块数据处理
    getPlannersData() {
      const length = this.result.planlerList.length
      if (length > 0) {
        this.plannersData = []
      }
      for (let i = 0; i < length; i++) {
        const obj = {
          id: this.planlerList[i].userCentreId,
          type: '金牌规划师',
          avatarImg: this.planlerList[i].userHeadUrl,
          name: this.planlerList[i].realName,
          shuPianFen: 138,
          serverNum: 258,
          telephone: this.planlerList[i].userPhone,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: this.planlerList[i].loginName,
        }
        this.plannersData.push(obj)
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
