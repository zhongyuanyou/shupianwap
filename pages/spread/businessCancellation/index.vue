<template>
  <div class="page-content">
    <!-- 头部 -->
    <Header v-show="!isInApp" title="工商注销">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1a1a1a"
          />
        </div>
      </template>
    </Header>
    <!-- 轮播图区域 -->
    <My-swipe :banners="banners" />
    <!-- 预约区域 -->
    <Appointment />
    <!-- 影响 -->
    <Influence />
    <!-- 业务介绍 -->
    <Introduce :service-list="serviceListData" />
    <!-- 注销资料 -->
    <Material />
    <!-- 服务流程 -->
    <Process />
    <!-- 咨询规划师 -->
    <Consult :planners-data="plannersData" />
    <!-- 还需办理 -->
    <You-need />
    <!-- 薯片找人 -->
    <Shu-pian />
    <!-- 固定底部-->
    <Fixed-bottom :planner="planner" md-type="new" :md="fixedMd" />
    <!-- im组件 -->
    <Dgg-im-company />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Header from '@/components/common/head/header'
import MySwipe from '@/components/spread/businessCancellation/MySwipe'
import Appointment from '@/components/spread/businessCancellation/Appointment'
import Influence from '@/components/spread/businessCancellation/Influence'
import Introduce from '@/components/spread/businessCancellation/Introduce'
import Material from '@/components/spread/businessCancellation/Material'
import Process from '@/components/spread/businessCancellation/Process'
import Consult from '@/components/spread/businessCancellation/Consult'
import YouNeed from '@/components/spread/businessCancellation/YouNeed'
import ShuPian from '@/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '@/components/spread/common/FixedBottom'
import DggImCompany from '@/components/spread/DggImCompany'
import MyIcon from '@/components/common/myIcon/MyIcon'
import { spreadApi } from '@/api/spread'

export default {
  components: {
    Header,
    MySwipe,
    Appointment,
    Influence,
    Introduce,
    Material,
    Process,
    Consult,
    YouNeed,
    ShuPian,
    FixedBottom,
    DggImCompany,
    MyIcon,
  },
  async asyncData({ $axios }) {
    const type = 'extendBussineWithdraw'
    const defaultRes = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        adList: [
          {
            pageCode: 'extendBussineWithdraw',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-工商注销广告',
            locationId: '8027896820880179200',
            locationAddressCode: '',
            sortMaterialList: [
              {
                locationSort: 1,
                materialList: [
                  {
                    materialTypeCode: 'GGLX_TP',
                    materialUrl:
                      'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
                    imgLink: '',
                    materialLink: 'https://www.baidu.com/',
                    materialCode: 'src100302',
                    materialHeight: 1334,
                    materialId: 0,
                    materialDescription: '',
                    materialName: '推广页工商注销广告1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineWithdraw1',
                    productDetail: {
                      id: 'extendBussineWithdraw1',
                      name: '公司注销',
                      referencePrice: 2500,
                      operating: {
                        showName: '公司注销',
                        slogan: '当公司不经营时申请注销，终止公司法人资格。',
                        productDescribe:
                          '当公司不经营时申请注销，终止公司法人资格。',
                        actualViews: 484,
                        defaultSales: 302,
                        actualSales: 293,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 2,
                materialList: [
                  {
                    materialTypeCode: 'GGLX_TP',
                    materialUrl:
                      'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
                    imgLink: '',
                    materialLink: 'https://www.baidu.com/',
                    materialCode: 'src100302',
                    materialHeight: 1334,
                    materialId: 0,
                    materialDescription: '',
                    materialName: '推广页工商注销广告1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineWithdraw2',
                    productDetail: {
                      id: 'extendBussineWithdraw2',
                      name: '工商注销',
                      referencePrice: 1000,
                      operating: {
                        showName: '工商注销',
                        slogan: '企业税务或税务已清税的情况下的营业执照注销。',
                        productDescribe:
                          '企业税务或税务已清税的情况下的营业执照注销。',
                        actualViews: 370,
                        defaultSales: 296,
                        actualSales: 290,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 3,
                materialList: [
                  {
                    materialTypeCode: 'GGLX_TP',
                    materialUrl:
                      'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
                    imgLink: '',
                    materialLink: 'https://www.baidu.com/',
                    materialCode: 'src100302',
                    materialHeight: 1334,
                    materialId: 0,
                    materialDescription: '',
                    materialName: '推广页工商注销广告1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineWithdraw3',
                    productDetail: {
                      id: 'extendBussineWithdraw3',
                      name: '个体注销',
                      referencePrice: 2000,
                      operating: {
                        showName: '个体注销',
                        slogan: '个体工商户不再从事经营活动办理的注销登记',
                        productDescribe:
                          '个体工商户不再从事经营活动办理的注销登记',
                        actualViews: 334,
                        defaultSales: 316,
                        actualSales: 316,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 4,
                materialList: [
                  {
                    materialTypeCode: 'GGLX_TP',
                    materialUrl:
                      'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
                    imgLink: '',
                    materialLink: 'https://www.baidu.com/',
                    materialCode: 'src100302',
                    materialHeight: 1334,
                    materialId: 0,
                    materialDescription: '',
                    materialName: '推广页工商注销广告1-4',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineWithdraw4',
                    productDetail: {
                      id: 'extendBussineWithdraw4',
                      name: '简易注销',
                      referencePrice: 998,
                      operating: {
                        showName: '简易注销',
                        slogan: '企业无经营活动，无债权债务的企业注销。',
                        productDescribe:
                          '企业无经营活动，无债权债务的企业注销。',
                        actualViews: 135,
                        defaultSales: 107,
                        actualSales: 102,
                      },
                    },
                  },
                ],
              },
            ],
            locationCode: 'ad100230',
            locationCodeLocType: 3,
          },
        ],
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
      if (res.code === 200) {
        return { resultData: res.data }
      } else {
        return { resultData: defaultRes.data }
      }
    } catch (error) {
      return { resultData: defaultRes.data }
    }
  },
  data() {
    return {
      /** 底部规划师数据 */
      planner: {},
      /** 轮播图数据 */
      banners: [
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/8beijb7x3aw0000.png',
        },
      ],
      /** 业务介绍数据 */
      serviceListData: [],
      /** 服务列表标签 */
      lables: [
        ['快至30个工作日', '成功率高，省心省钱'],
        ['快至30个工作日', '流程手续正规化'],
        ['快至30个工作日', '专业团队申请，快速高效'],
        ['快至30个工作日', '流程透明化，节点清晰可查'],
      ],
      /** 固定底部数据 */
      fixedMd: {
        telMd: {
          name: '工商注销_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '工商注销_钻石展位_在线咨询',
          type: '售前',
        },
      },
      /** 轮播规划师数据 */
      plannersData: [],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {},
  created() {
    this.serviceList(this.resultData)
    this.plannerHandle(this.resultData.planlerList)
  },
  mounted() {
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端工商注销推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '工商注销' }, () => {})
    }
  },
  methods: {
    /** 返回上一页 */
    back() {
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
    /** 业务介绍数据处理 */
    serviceList(data) {
      const listAll = data.adList[0].sortMaterialList
      if (listAll.length !== 0) {
        const dataList = []
        listAll.forEach((item, index) => {
          /** 获取随机下标，当lables长度不够时 */
          const subscript = `${
            index < this.lables.length
              ? index
              : Math.floor(Math.random() * this.lables.length)
          }`
          const list = item.materialList[0].productDetail
          const obj = {
            title: list.operating.showName,
            titlelable:
              'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
            titleContent: list.operating.slogan,
            lowerPrice: list.referencePrice,
            tags: this.lables[subscript],
            number: [
              { content: '在线咨询', num: list.operating.actualViews },
              { content: '累计成交', num: list.operating.defaultSales },
              { content: '成功案例', num: list.operating.actualSales },
            ],
            planner: {
              id: '66475',
              name: '钟霞',
              jobNum: '38798340',
              telephone: '13730634929',
              imgSrc:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.gw_defult/xdy-xcx/my/trueAndFalse/gw_defult.png',
            },
          }
          if (data.planlerList.length > 0) {
            const subPlanner =
              data.planlerList[
                `${
                  index < data.planlerList.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ]
            obj.planner.id = subPlanner.userCentreId
            obj.planner.name = subPlanner.realName
            obj.planner.jobNum = subPlanner.loginName
            obj.planner.telephone = subPlanner.userPhone
            obj.planner.imgSrc = subPlanner.userHeadUrl
          } else {
            return null
          }
          dataList.push(obj)
        })
        this.serviceListData = dataList
      }
    },
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
      }
    },
  },
  head() {
    return {
      title: '工商注销',
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
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  background-color: #fff;
}
.back_icon {
  margin-left: 40px;
}

/deep/ .sp-bottombar-info__sign {
  display: flex;
  align-items: center;
}
/deep/ .cousulttel-content-left-number {
  margin-top: -7px;
}
/deep/ .cousulttel-content-left-text {
  margin-right: 16px;
}
/deep/.fixed-head {
  /deep/.my-head {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
}
/deep/ .sp-bottombar {
  z-index: 99;
}
</style>
