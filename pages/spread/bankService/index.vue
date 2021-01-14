<template>
  <div class="bankService">
    <!-- 头部导航 -->
    <Header :title="title" />
    <!-- banner图 -->
    <Banner :imglist="imgList" />
    <!-- 表单 -->
    <From />
    <!-- 服务列表 -->
    <Service :service-list="serviceList" :service-title="serviceTitle">
    </Service>
    <!-- 为什么选择薯片平台 -->
    <Choose />
    <!-- 咨询规划师  -->
    <Planner
      :planners-data="plannersList"
      :planners-common="plannersTitle"
      :page-title="title"
      md-type="new"
    />
    <!-- 您可能还需要办理 -->
    <Need />
    <!-- 底部导航 -->
    <Bottom :planner="planner" md-type="new" :md="fixedMd" />
    <!-- im对话框 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import Header from '../../../components/common/head/header'
import Banner from '../../../components/spread/bankService/BannerSwipe'
import From from '../../../components/spread/bankService/Form'
import Service from '../../../components/spread/common/ServiceIntroduced'
import Choose from '../../../components/spread/bankService/Choose'
import Planner from '../../../components/spread/common/GuiHuaShiSwipe'
import Need from '../../../components/spread/bankService/MayNeed'
import Bottom from '../../../components/spread/common/FixedBottom'
import dggImCompany from '../../../components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'
export default {
  components: {
    Header,
    Banner,
    From,
    Service,
    Choose,
    Planner,
    Need,
    Bottom,
    dggImCompany,
  },
  async asyncData({ $axios }) {
    const result = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        adList: [
          {
            pageCode: 'extendBankServer',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-银行服务广告',
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
                    materialName: '推广页银行服务广告1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBankServer1',
                    productDetail: {
                      id: 'extendBankServer1',
                      name: '基本开户',
                      referencePrice: 600,
                      operating: {
                        showName: '基本开户',
                        slogan: '',
                        productDescribe:
                          '企事业单位进行日常转账结算和现金收付的主板账户',
                        actualViews: 1402,
                        defaultSales: 992,
                        actualSales: 992,
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
                    materialName: '推广页银行服务广告1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBankServer2',
                    productDetail: {
                      id: 'extendBankServer2',
                      name: '一般户开户',
                      referencePrice: 600,
                      operating: {
                        showName: '一般户开户',
                        slogan: '',
                        productDescribe:
                          '只能办理转账结算和现金存缴，不能支取现金',
                        defaultSales: 632,
                        actualSales: 421,
                        actualViews: 416,
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
                    materialName: '推广页银行服务广告1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBankServer3',
                    productDetail: {
                      id: 'extendBankServer3',
                      name: '银行销户',
                      referencePrice: 800,
                      operating: {
                        showName: '一般户开户',
                        slogan: '',
                        productDescribe:
                          '不再使用银行提供的服务，对账户信息进行删除销毁处理',
                        defaultSales: 152,
                        actualSales: 108,
                        actualViews: 108,
                      },
                    },
                  },
                ],
              },
            ],
            locationCode: 'ad100230',
            locationCodeLocType: 2,
          },
        ],
        planlerList: [
          {
            id: 169,
            userId: '7887200447593906176',
            userCentreId: '7887200447257313280',
            loginName: '108862',
            realName: '李劲',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '18884259139',
            cvr: 0.162791,
            cvrValue: 65.771926,
            orderBus: 7,
            orderBusValue: 50.378921,
            busPerformance: 8544,
            busPerformanceValue: 79.535461,
            abilityValue: 68.038005,
            formatType: '工商',
          },
          {
            id: 28,
            userId: '43999',
            userCentreId: '7704199733711282176',
            loginName: '96352931',
            realName: '岳雪冬',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13908231675',
            cvr: 0.127273,
            cvrValue: 63.23411,
            orderBus: 7,
            orderBusValue: 50.378921,
            busPerformance: 15348,
            busPerformanceValue: 91.077286,
            abilityValue: 70.450657,
            formatType: '工商',
          },
          {
            id: 182,
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
            id: 6,
            userId: '3394',
            userCentreId: '3394',
            loginName: '2022554',
            realName: '刘琴',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13350072314',
            cvr: 0.090909,
            cvrValue: 60.557728,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 7612.4,
            busPerformanceValue: 77.299492,
            abilityValue: 64.379694,
            formatType: '工商',
          },
          {
            id: 35,
            userId: '66475',
            userCentreId: '66475',
            loginName: '38798340',
            realName: '钟霞',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13730634929',
            cvr: 0.086207,
            cvrValue: 60.206605,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 15278,
            busPerformanceValue: 90.996225,
            abilityValue: 68.653875,
            formatType: '工商',
          },
        ],
      },
    }
    const type = 'extendBankServer'
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      if (res.code === 200) {
        console.log(res)
        return {
          result: res,
        }
      } else {
        return {
          result,
        }
      }
    } catch (error) {
      console.log('error', error)
      return { result }
    }
  },
  data() {
    return {
      title: '银行服务',
      serviceTitle: '银行服务介绍',
      // banner图列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3g7zzv8ntk80000.jpg',
        },
        {
          code: 2,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1o0vmlzd6ef4000.jpg',
        },
      ],
      // 服务列表
      serviceList: [
        {
          title: '基本开户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '1402',
          defaultSales: '992',
          actualSales: '992',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'col',
          rowLabels: {
            title: '注意事项',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
            content: [
              '要求法人到场面核，需要全体股东身份证原件',
              '合作银行不同，所需资料及流程不同',
            ],
          },
        },
        {
          title: '一般户开户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '632',
          defaultSales: '421',
          actualSales: '416',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'col',
          rowLabels: {
            title: '所需资料',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
            content: ['营业执照正副本原件，三章', '法人、经办人身份证原件'],
          },
        },
        {
          title: '银行销户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '152',
          defaultSales: '108',
          actualSales: '108',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'col',
          rowLabels: {
            title: '所需资料',
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
            content: [
              '由法人代表及直接出具销户报告',
              '各种未使用的重要空白票据及结算凭证',
            ],
          },
        },
      ],
      // 服务列表标签
      lables: [
        {
          title: '注意事项',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
          content: [
            '要求法人到场面核，需要全体股东身份证原件',
            '合作银行不同，所需资料及流程不同',
          ],
        },
        {
          title: '所需资料',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
          content: ['营业执照正副本原件，三章', '法人、经办人身份证原件'],
        },
        {
          title: '所需资料',
          icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
          content: [
            '由法人代表及直接出具销户报告',
            '各种未使用的重要空白票据及结算凭证',
          ],
        },
      ],
      // 规划师title
      plannersTitle: {
        title: '咨询规划师',
        imName: '银行服务咨询规划师_在线咨询',
        telName: '银行服务咨询规划师_拨打电话',
      },
      // 规划师列表
      plannersList: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '李劲',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 18402858698,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7887200447257313280',
            name: '李劲',
            num: '108862',
          },
        },
        {
          id: 1,
          type: '金牌规划师',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '李劲',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 18402858698,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7887200447257313280',
            name: '李劲',
            num: '108862',
          },
        },
      ],
      // 底部规划师
      planner: {
        id: '7862495547640840192',
        name: '李劲',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      fixedMd: {
        telMd: {
          name: '银行服务_钻石展位_拔打电话',
          type: '售前',
        },
        imMd: {
          name: '银行服务_钻石展位_在线咨询',
          type: '售前',
        },
      },
    }
  },
  created() {
    this.productDetail(this.result.data.adList[0].sortMaterialList)
    this.planner = this.plannersList[0]
    this.plannerHandleData(this.result.data.planlerList || [])
  },
  mounted() {
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端银行服务推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {
    // 跳转判断
    openIM(url) {
      if (url) {
        window.location.href = url
      } else {
        const planner = this.planner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || '',
          planner.imgSrc || ''
        )
      }
    },
    // 处理服务列表数据
    productDetail(data) {
      const vm = this
      this.plannerHandleData(this.result.data.planlerList || [])
      if (data.length === 0) {
      } else {
        const serviceList = []
        data.forEach((item, index) => {
          const obj = {
            id: item.materialList[0].productId,
            title: item.materialList[0].productDetail.operating.showName,
            titleLabel:
              'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
            titleContent:
              item.materialList[0].productDetail.operating.productDescribe,
            actualViews:
              item.materialList[0].productDetail.operating.actualViews,
            defaultSales:
              item.materialList[0].productDetail.operating.defaultSales,
            actualSales:
              item.materialList[0].productDetail.operating.actualSales,
            price: item.materialList[0].productDetail.referencePrice,
            bgImg:
              'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
            planner: this.plannersList[
              `${
                index < this.plannersList.length
                  ? index
                  : Math.floor(Math.random() * this.plannersList.length)
              }`
            ],
            labelsType: 'col',
            colLabels:
              vm.lables[
                `${
                  index < vm.lables.length
                    ? index
                    : Math.floor(Math.random() * vm.lables.length)
                }`
              ],
          }
          serviceList.push(obj)
        })
        this.serviceList = serviceList
      }
    },
    // 规划师处理
    plannerHandleData(data) {
      // 规划师列表
      if (data.length !== 0) {
        const guiHuaShiList = []
        data.forEach((item) => {
          const obj = {
            id: item.userCentreId,
            type: '金牌规划师',
            avatarImg: item.userHeadUrl,
            imgSrc: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 11,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.loginName,
          }
          guiHuaShiList.push(obj)
        })
        this.plannersList = guiHuaShiList
        this.planner = this.plannersList[0]
      } else {
        return this.plannersList
      }
    },
  },
  head() {
    return {
      title: '银行服务',
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
.bankService {
  width: @spread-page-width;
  margin: 0 auto;
  position: relative;
  /deep/.my-head {
    width: @spread-page-width;
    position: fixed;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
  }
  /deep/.sp-popup--round {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
  /deep/.sp-overlay {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
  /deep/.my-sp-bottombar {
    z-index: 2;
  }
}
</style>
