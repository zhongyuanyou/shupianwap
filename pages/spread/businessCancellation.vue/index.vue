<template>
  <div class="page-content">
    <!-- 轮播图区域 -->
    <My-swipe :banners="banners" />
    <!-- 预约区域 -->
    <Appointment />
    <!-- 影响 -->
    <Influence />
    <!-- 业务介绍 -->
    <Introduce />
    <!-- 注销资料 -->
    <Material />
    <!-- 服务流程 -->
    <Process />
    <!-- 咨询规划师 -->
    <Consult />
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
import { spreadApi } from '@/api/spread'
export default {
  components: {
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
  },
  // async asyncData({ $axios }) {
  //   const type = 'extendBussineWithdraw'
  //   const defaultRes = {
  //     code: 200,
  //     message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
  //     data: {
  //       adList: [
  //         {
  //           pageCode: 'extendBussineWithdraw',
  //           locationShowTypeCode: 'GGWZXSS_GDXS',
  //           locationName: 'wap-推广页-工商注销广告',
  //           locationId: '8027896820880179200',
  //           locationAddressCode: '',
  //           sortMaterialList: [
  //             {
  //               locationSort: 1,
  //               materialList: [
  //                 {
  //                   materialTypeCode: 'GGLX_TP',
  //                   materialUrl:
  //                     'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
  //                   imgLink: '',
  //                   materialLink: 'https://www.baidu.com/',
  //                   materialCode: 'src100302',
  //                   materialHeight: 1334,
  //                   materialId: 0,
  //                   materialDescription: '',
  //                   materialName: '推广页工商注销广告1-1',
  //                   androidLink: '',
  //                   materialWidth: 750,
  //                   iosLink: '',
  //                   linkType: 2,
  //                   wapLink: '',
  //                   executeParam: '',
  //                   productId: 'extendBussineWithdraw1',
  //                   productDetail: {
  //                     id: 'extendBussineWithdraw1',
  //                     name: '公司注销',
  //                     referencePrice: 2500,
  //                     operating: {
  //                       showName: '公司注销',
  //                       slogan: '当公司不经营时申请注销，终止公司法人资格。',
  //                       productDescribe:
  //                         '当公司不经营时申请注销，终止公司法人资格。',
  //                       actualViews: 484,
  //                       defaultSales: 302,
  //                       actualSales: 293,
  //                     },
  //                   },
  //                 },
  //               ],
  //             },
  //             {
  //               locationSort: 2,
  //               materialList: [
  //                 {
  //                   materialTypeCode: 'GGLX_TP',
  //                   materialUrl:
  //                     'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
  //                   imgLink: '',
  //                   materialLink: 'https://www.baidu.com/',
  //                   materialCode: 'src100302',
  //                   materialHeight: 1334,
  //                   materialId: 0,
  //                   materialDescription: '',
  //                   materialName: '推广页工商注销广告1-2',
  //                   androidLink: '',
  //                   materialWidth: 750,
  //                   iosLink: '',
  //                   linkType: 2,
  //                   wapLink: '',
  //                   executeParam: '',
  //                   productId: 'extendBussineWithdraw2',
  //                   productDetail: {
  //                     id: 'extendBussineWithdraw2',
  //                     name: '工商注销',
  //                     referencePrice: 1000,
  //                     operating: {
  //                       showName: '工商注销',
  //                       slogan: '企业税务或税务已清税的情况下的营业执照注销。',
  //                       productDescribe:
  //                         '企业税务或税务已清税的情况下的营业执照注销。',
  //                       actualViews: 370,
  //                       defaultSales: 296,
  //                       actualSales: 290,
  //                     },
  //                   },
  //                 },
  //               ],
  //             },
  //             {
  //               locationSort: 3,
  //               materialList: [
  //                 {
  //                   materialTypeCode: 'GGLX_TP',
  //                   materialUrl:
  //                     'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
  //                   imgLink: '',
  //                   materialLink: 'https://www.baidu.com/',
  //                   materialCode: 'src100302',
  //                   materialHeight: 1334,
  //                   materialId: 0,
  //                   materialDescription: '',
  //                   materialName: '推广页工商注销广告1-3',
  //                   androidLink: '',
  //                   materialWidth: 750,
  //                   iosLink: '',
  //                   linkType: 2,
  //                   wapLink: '',
  //                   executeParam: '',
  //                   productId: 'extendBussineWithdraw3',
  //                   productDetail: {
  //                     id: 'extendBussineWithdraw3',
  //                     name: '个体注销',
  //                     referencePrice: 2000,
  //                     operating: {
  //                       showName: '工商注销',
  //                       slogan: '企业税务或税务已清税的情况下的营业执照注销。',
  //                       productDescribe:
  //                         '企业税务或税务已清税的情况下的营业执照注销。',
  //                       actualViews: 334,
  //                       defaultSales: 316,
  //                       actualSales: 316,
  //                     },
  //                   },
  //                 },
  //               ],
  //             },
  //             {
  //               locationSort: 4,
  //               materialList: [
  //                 {
  //                   materialTypeCode: 'GGLX_TP',
  //                   materialUrl:
  //                     'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
  //                   imgLink: '',
  //                   materialLink: 'https://www.baidu.com/',
  //                   materialCode: 'src100302',
  //                   materialHeight: 1334,
  //                   materialId: 0,
  //                   materialDescription: '',
  //                   materialName: '推广页工商注销广告1-4',
  //                   androidLink: '',
  //                   materialWidth: 750,
  //                   iosLink: '',
  //                   linkType: 2,
  //                   wapLink: '',
  //                   executeParam: '',
  //                   productId: 'extendBussineWithdraw4',
  //                   productDetail: {
  //                     id: 'extendBussineWithdraw4',
  //                     name: '简易注销',
  //                     referencePrice: 998,
  //                     operating: {
  //                       showName: '简易注销',
  //                       slogan: '企业无经营活动，无债权债务的企业注销。',
  //                       productDescribe:
  //                         '企业无经营活动，无债权债务的企业注销。',
  //                       actualViews: 135,
  //                       defaultSales: 107,
  //                       actualSales: 102,
  //                     },
  //                   },
  //                 },
  //               ],
  //             },
  //           ],
  //           locationCode: 'ad100230',
  //           locationCodeLocType: 3,
  //         },
  //       ],
  //       planlerList: [
  //         {
  //           id: 314,
  //           userId: '7930253930943676416',
  //           userCentreId: '7930253930615472128',
  //           loginName: '109870',
  //           realName: '李海怡',
  //           userHeadUrl:
  //             'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
  //           userPhone: '13696057459',
  //           cvr: 0.108696,
  //           cvrValue: 61.875876,
  //           orderBus: 5,
  //           orderBusValue: 49.23518,
  //           busPerformance: 17770,
  //           busPerformanceValue: 93.504073,
  //           abilityValue: 70.355913,
  //           formatType: '工商',
  //         },
  //         {
  //           id: 160,
  //           userId: '43999',
  //           userCentreId: '7704199733711282176',
  //           loginName: '96352931',
  //           realName: '岳雪冬',
  //           userHeadUrl:
  //             'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
  //           userPhone: '13908231675',
  //           cvr: 0.132075,
  //           cvrValue: 63.58191,
  //           orderBus: 7,
  //           orderBusValue: 50.378921,
  //           busPerformance: 15348,
  //           busPerformanceValue: 91.077286,
  //           abilityValue: 70.635122,
  //           formatType: '工商',
  //         },
  //         {
  //           id: 138,
  //           userId: '3394',
  //           userCentreId: '3394',
  //           loginName: '2022554',
  //           realName: '刘琴',
  //           userHeadUrl:
  //             'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
  //           userPhone: '13350072314',
  //           cvr: 0.092593,
  //           cvrValue: 60.683218,
  //           orderBus: 5,
  //           orderBusValue: 49.23518,
  //           busPerformance: 7612.4,
  //           busPerformanceValue: 77.299492,
  //           abilityValue: 64.446251,
  //           formatType: '工商',
  //         },
  //         {
  //           id: 167,
  //           userId: '66475',
  //           userCentreId: '66475',
  //           loginName: '38798340',
  //           realName: '钟霞',
  //           userHeadUrl:
  //             'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
  //           userPhone: '13730634929',
  //           cvr: 0.086207,
  //           cvrValue: 60.206605,
  //           orderBus: 5,
  //           orderBusValue: 49.23518,
  //           busPerformance: 15278,
  //           busPerformanceValue: 90.996225,
  //           abilityValue: 68.653875,
  //           formatType: '工商',
  //         },
  //         {
  //           id: 301,
  //           userId: '7887200447593906176',
  //           userCentreId: '7887200447257313280',
  //           loginName: '108862',
  //           realName: '李劲',
  //           userHeadUrl:
  //             'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
  //           userPhone: '18884259139',
  //           cvr: 0.155556,
  //           cvrValue: 65.261689,
  //           orderBus: 7,
  //           orderBusValue: 50.378921,
  //           busPerformance: 8544,
  //           busPerformanceValue: 79.535461,
  //           abilityValue: 67.767387,
  //           formatType: '工商',
  //         },
  //       ],
  //     },
  //   }
  //   try {
  //     const res = await $axios.get(spreadApi.list, {
  //       params: { pageCode: type },
  //     })
  //     if (res.code === 200) {
  //       return { resultData: res.data }
  //     } else {
  //       return { resultData: defaultRes }
  //     }
  //   } catch (error) {
  //     return { resultData: defaultRes }
  //   }
  //   return { resultData: defaultRes }
  // },
  data() {
    return {
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
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
    }
  },
  computed: {},
  watch: {},
  created() {
    // this.serviceList(this.resultData)
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端工商注销推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {
    /** 业务介绍数据处理 */
    serviceList(data) {
      const listAll = data.adList[0].sortMaterialList
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
</style>
