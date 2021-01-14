<template>
  <div class="agency">
    <!-- s 头部导航 -->
    <Header :title="title" />
    <!-- e 头部导航 -->
    <!-- s Banner -->
    <Banner :imglist="imgList" />
    <!-- e Banner -->
    <!-- s form表单 -->
    <Form :nums="nums" />
    <!-- e form表单 -->
    <!-- s 服务介绍 -->
    <Service :servicelist="servicelist" />
    <!-- e 服务介绍 -->
    <!-- s 服务内容 -->
    <ServiceContent />
    <!-- e 服务内容 -->
    <!-- s 服务流程 -->
    <Process />
    <!-- e 服务流程 -->
    <!-- s 为什么选择薯片平台-->
    <Choose />
    <!-- e 为什么选择薯片平台-->
    <!-- s 咨询规划师 -->
    <Planners :planners-data="plannersList" :planners-common="plannersTitle" />
    <!-- e 咨询规划师 -->
    <!-- s 可能需要 -->
    <Need />
    <!-- e 可能需要 -->
    <!-- s 底部导航 -->
    <Bottom :planner="planner" />
    <!-- e 底部导航 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import Header from '../../../components/common/head/header'
import Banner from '../../../components/spread/agency/banner'
import Form from '../../../components/spread/agency/form'
import Service from '../../../components/spread/agency/service'
import ServiceContent from '../../../components/spread/agency/servicecontent'
import Process from '../../../components/spread/agency/process'
import Choose from '../../../components/spread/agency/choose'
import Planners from '../../../components/spread/common/GuiHuaShiSwipe'
import Bottom from '../../../components/spread/common/FixedBottom'
import Need from '../../../components/spread/agency/need'
import dggImCompany from '../../../components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'

export default {
  components: {
    Header,
    Banner,
    Form,
    Service,
    ServiceContent,
    Process,
    Choose,
    Planners,
    Need,
    Bottom,
    dggImCompany,
  },
  async asyncData({ $axios }) {
    const type = 'extendAccount'
    const result = {
      code: 201,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        nums: {
          todayNum: 123,
          totalNum: 640116,
        },
        adList: [
          {
            pageCode: 'extendAccount',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-代理记账',
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
                    materialName: '代理记账1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendAccount1',
                    productDetail: {
                      id: 'extendAccount1',
                      name: '',
                      referencePrice: 2288,
                      operating: {
                        showName: '小规模纳税人代理记账',
                        slogan: '连续12个月应征增值税销售额未超过500万元',
                        productDescribe:
                          '连续12个月应征增值税销售额未超过500万元',
                        actualViews: 7295,
                        defaultSales: 5173,
                        actualSales: 5173,
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
                    materialName: '代理记账1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendAccount2',
                    productDetail: {
                      id: 'extendAccount2',
                      name: '',
                      referencePrice: 1500,
                      operating: {
                        showName: '个体户代理记账',
                        slogan:
                          '经营修理服务、加工、个体运输业、饮食业等的个体户',
                        productDescribe:
                          '经营修理服务、加工、个体运输业、饮食业等的个体户',
                        actualViews: 983,
                        defaultSales: 642,
                        actualSales: 642,
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
                    materialName: '代理记账1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendAccount3',
                    productDetail: {
                      id: 'extendAccount3',
                      name: '',
                      referencePrice: 6988,
                      operating: {
                        showName: '一般纳税人代理记账',
                        slogan: '应税服务年销售额大于500万元',
                        productDescribe: '应税服务年销售额大于500万元',
                        actualViews: 1275,
                        defaultSales: 937,
                        actualSales: 937,
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
            id: 442,
            userId: '43999',
            userCentreId: '7704199733711282176',
            loginName: '96352931',
            realName: '岳雪冬',
            userHeadUrl:
              'http://fastdfs.dggvip.net:8080/group1/M00/02/C0/wKiyYlubWPyEbXyQAAAAAH6D3Zw879.jpg',
            userPhone: '13908231675',
            cvr: 0,
            cvrValue: 60.340715,
            orderBus: 0,
            orderBusValue: 39.659285,
            busPerformance: 0,
            busPerformanceValue: 60.340715,
            abilityValue: 57.363272,
            formatType: '会计',
          },
        ],
      },
    }
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      // console.log(`Spread.Api 代理记账: ${res.code} - ${res.message}`)
      if (res.code === 200) {
        return {
          result: res,
        }
      } else {
        return { result }
      }
    } catch (error) {
      // 请求出错也要保证页面正常显示
      return { result }
    }
  },
  data() {
    return {
      title: '代理记账',
      plannersTitle: {
        title: '咨询规划师',
        imName: '代理记账咨询规划师_在线咨询',
        telName: '代理记账咨询规划师_拨打电话',
      },
      serviceBg: [
        'https://cdn.shupian.cn/sp-pt/wap/images/98njyijmjzg0000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/g9qto371i600000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/3nw97vec94s0000.jpg',
      ],
      nums: null,
      planner: {
        id: '7887200447257313280',
        name: '李劲',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      // 轮播列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/dshrn46ces00000.jpg',
        },
      ],
      // 服务介绍列表
      servicelist: [
        {
          id: '',
          actualViews: '7295',
          defaultSales: '5173',
          actualSales: '5173',
          price: '2288',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/98njyijmjzg0000.jpg',
          planner: {
            id: '',
            name: '',
            jobNum: '',
            telephone: '',
            imgSrc: '',
            avatarImg: '',
          },
          plannerName: '',
        },
        {
          id: '',
          actualViews: '983',
          defaultSales: '642',
          actualSales: '642',
          price: '1500',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/g9qto371i600000.jpg',
          planner: '',
          plannerName: '',
        },
        {
          id: '',
          actualViews: '1275',
          defaultSales: '937',
          actualSales: '937',
          price: '6988',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/3nw97vec94s0000.jpg',
          planner: '',
          plannerName: '',
        },
      ],
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
      ],
    }
  },
  created() {
    this.productDetail(this.result.data.adList[0].sortMaterialList)
    this.nums = this.result.data.nums
    if (this.result.data.planlerList !== 0) {
      this.plannerHandleData(this.result.data.planlerList || [])
    }
  },
  mounted() {
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端代理记账推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {
    // 商品数据处理
    productDetail(data) {
      this.plannerHandleData(this.result.data.planlerList || [])
      if (data.length === 0) {
      } else {
        const fuWuList = []
        data.forEach((item, index) => {
          const obj = {
            id: item.materialList[0].productDetail.id,
            actualViews:
              item.materialList[0].productDetail.operating.actualViews,
            defaultSales:
              item.materialList[0].productDetail.operating.defaultSales,
            actualSales:
              item.materialList[0].productDetail.operating.actualSales,
            price: item.materialList[0].productDetail.referencePrice,
            bgimage: this.serviceBg[index],
            planner: this.plannersList[
              `${
                index < this.plannersList.length
                  ? index
                  : Math.floor(Math.random() * this.plannersList.length)
              }`
            ],
            plannerName: item.materialList[0].productDetail.operating.showName,
          }
          fuWuList.push(obj)
        })
        this.servicelist = fuWuList
      }
    },
    // 跳转判断
    openIM(url) {
      if (url) {
        window.location.href = url
      } else {
        const guiHuaShi = this.planner
        this.$root.$emit(
          'openIMM',
          guiHuaShi.id,
          guiHuaShi.name || '',
          guiHuaShi.jobNum || '',
          guiHuaShi.imgSrc || ''
        )
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
            avatarImg: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 11,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.loginName,
            imgSrc: item.userHeadUrl,
          }
          guiHuaShiList.push(obj)
        })
        this.plannersList = guiHuaShiList
        // 转站规划师
        this.planner = this.plannersList[0]
      } else {
        return this.planner
      }
    },
  },
  head() {
    return {
      title: '代理记账',
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
.agency {
  width: 750px;
  margin: 0 auto;
  position: relative;
  /deep/.fixed-head {
    /deep/.my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
    }
  }
}
</style>
