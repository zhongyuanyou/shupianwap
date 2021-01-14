<template>
  <div class="businesschange">
    <!-- s 头部分 -->
    <Header v-if="!isInApp" :title="title">
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
    <!-- e 头部分 -->
    <!-- s banner轮播 -->
    <BannerSwipe :imglist="imgList" />
    <!-- e banner轮播 -->
    <!-- s form表单 -->
    <Form />
    <!-- e form表单 -->
    <!-- s 公司不变更，风险有多大 -->
    <Risk />
    <!-- e 公司不变更，风险有多大 -->
    <!-- s 变更服务介绍 -->
    <ServiceIntroduced :servicelist="servicelist" />
    <!-- e 变更服务介绍 -->
    <!-- s 服务流程 -->
    <ServiceProcess />
    <!-- e 服务流程 -->
    <!-- s 规划师 -->
    <Planners :planners-data="plannersList" :planners-common="plannersTitle" />
    <!-- e 规划师 -->
    <!-- s 可能需要办理 -->
    <Need />
    <!-- e 可能需要办理 -->
    <!-- s 底部导航 -->
    <Bottom :planner="planner" :md="fixedMd" />
    <!-- e 底部导航 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../../../components/common/head/header'
import BannerSwipe from '../../../components/spread/businessChange/bannerSwipe'
import Form from '../../../components/spread/businessChange/form'
import Risk from '../../../components/spread/businessChange/risk'
import ServiceIntroduced from '../../../components/spread/businessChange/serviceIntroduced'
import ServiceProcess from '../../../components/spread/businessChange/serviceProcess'
import Planners from '../../../components/spread/common/GuiHuaShiSwipe'
import Need from '../../../components/spread/businessChange/need'
import Bottom from '../../../components/spread/common/FixedBottom'
import dggImCompany from '../../../components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'

export default {
  components: {
    Header,
    BannerSwipe,
    Form,
    Risk,
    ServiceIntroduced,
    ServiceProcess,
    Planners,
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
            pageCode: 'extendBussineChange',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-工商变更广告',
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
                    materialName: '工商变更广告1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineChange1',
                    productDetail: {
                      id: 'extendBussineChange1',
                      name: '',
                      referencePrice: 488,
                      operating: {
                        showName: '公司名称变更',
                        slogan:
                          '因公司经营变化、业务拓展等原因需要变更公司名称',
                        productDescribe:
                          '因公司经营变化、业务拓展等原因需要变更公司名称',
                        actualViews: 293,
                        defaultSales: 203,
                        actualSales: 203,
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
                    materialName: '工商变更广告1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineChange3',
                    productDetail: {
                      id: 'extendBussineChange3',
                      name: '',
                      referencePrice: 600,
                      operating: {
                        showName: '股东变更',
                        slogan: '因公司发展或策略调整，公司股东要更换',
                        productDescribe: '因公司发展或策略调整，公司股东要更换',
                        actualViews: 96,
                        defaultSales: 66,
                        actualSales: 63,
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
                    materialName: '工商变更广告1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineChange3',
                    productDetail: {
                      id: 'extendBussineChange3',
                      name: '',
                      referencePrice: 600,
                      operating: {
                        showName: '股东变更',
                        slogan: '因公司发展或策略调整，公司股东要更换',
                        productDescribe: '因公司发展或策略调整，公司股东要更换',
                        actualViews: 96,
                        defaultSales: 66,
                        actualSales: 63,
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
                    materialName: '工商变更广告1-4',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineChange4',
                    productDetail: {
                      id: 'extendBussineChange4',
                      name: '',
                      referencePrice: 488,
                      operating: {
                        showName: '股权变更',
                        slogan: '公司股东投资比例，股权结构变更',
                        productDescribe: '公司股东投资比例，股权结构变更',
                        actualViews: 53,
                        defaultSales: 38,
                        actualSales: 36,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 5,
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
                    materialName: '工商变更广告1-5',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineChange5',
                    productDetail: {
                      id: 'extendBussineChange5',
                      name: '',
                      referencePrice: 488,
                      operating: {
                        showName: '认缴年限变更',
                        slogan: '公司注册资金增加，公司规模扩大',
                        productDescribe: '公司注册资金增加，公司规模扩大',
                        actualViews: 173,
                        defaultSales: 139,
                        actualSales: 136,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 6,
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
                    materialName: '工商变更广告1-6',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineChange6',
                    productDetail: {
                      id: 'extendBussineChange6',
                      name: '',
                      referencePrice: 488,
                      operating: {
                        showName: '同区地址变更',
                        slogan:
                          '同一城市同一区域内注册地址变更，不跨工商管理局',
                        productDescribe:
                          '同一城市同一区域内注册地址变更，不跨工商管理局',
                        actualViews: 92,
                        defaultSales: 61,
                        actualSales: 61,
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
            id: 30169,
            userId: '7887200447593906176',
            userCentreId: '7887200447257313280',
            loginName: '108862',
            realName: '李劲',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '18884259139',
            cvr: 0.204545,
            cvrValue: 68.643112,
            orderBus: 9,
            orderBusValue: 51.522266,
            busPerformance: 12192,
            busPerformanceValue: 86.706115,
            abilityValue: 72.060582,
            formatType: '工商',
          },
          {
            id: 30006,
            userId: '3394',
            userCentreId: '3394',
            loginName: '2022554',
            realName: '刘琴',
            userHeadUrl:
              'http://fastdfs.dggvip.net:8080/group1/M00/0F/72/CgAAB19ExY6EVv-6AAAAAG6SJVc351.jpg',
            userPhone: '13350072314',
            cvr: 0.0625,
            cvrValue: 58.420922,
            orderBus: 3,
            orderBusValue: 48.092239,
            busPerformance: 4412.4,
            busPerformanceValue: 68.377345,
            abilityValue: 60.176291,
            formatType: '工商',
          },
          {
            id: 30028,
            userId: '43999',
            userCentreId: '7704199733711282176',
            loginName: '96352931',
            realName: '岳雪冬',
            userHeadUrl:
              'http://fastdfs.dggvip.net:8080/group1/M00/02/C0/wKiyYlubWPyEbXyQAAAAAH6D3Zw879.jpg',
            userPhone: '13908231675',
            cvr: 0.140625,
            cvrValue: 64.197653,
            orderBus: 9,
            orderBusValue: 51.522266,
            busPerformance: 24742,
            busPerformanceValue: 97.482166,
            abilityValue: 73.212083,
            formatType: '工商',
          },
          {
            id: 30182,
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
            id: 30035,
            userId: '66475',
            userCentreId: '66475',
            loginName: '38798340',
            realName: '钟霞',
            userHeadUrl:
              'http://fastdfs.dggvip.net:8080/group1/M00/0F/E7/CgAAB19jRe-EZCmnAAAAAOB-9qQ642.jpg',
            userPhone: '13730634929',
            cvr: 0.152542,
            cvrValue: 65.048084,
            orderBus: 9,
            orderBusValue: 51.522266,
            busPerformance: 20770,
            busPerformanceValue: 95.658559,
            abilityValue: 73.069267,
            formatType: '工商',
          },
        ],
      },
    }
    const type = 'extendBussineChange'
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      // console.log(`Spread.Api 工商变更 : ${res.code} - ${res.message}`)
      if (res.code === 200) {
        return {
          result: res,
        }
      } else {
        return { result }
      }
    } catch (error) {
      console.log('error', error)
      // 请求出错也要保证页面正常显示
      return { result }
    }
  },
  data() {
    return {
      title: '工商变更',
      plannersTitle: {
        title: '咨询规划师',
        imName: '工商变更咨询规划师_在线咨询',
        telName: '工商变更咨询规划师_拨打电话',
      },
      planner: {
        id: '7862495547640840192',
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
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2mnnuo078ew0000.jpg',
        },
        {
          code: 2,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/eqvnfyw0u6o0000.jpg',
        },
      ],
      serviceBG: [
        'https://cdn.shupian.cn/sp-pt/wap/images/5uwyafh2j1g0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/althqxxyow00000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/6bd02flvql80000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/a7m299uz5bc0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/ep6v5p1eork0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/9818rtvq5c80000.png',
      ],
      // 服务列表
      servicelist: [
        {
          id: '',
          actualViews: '18万',
          defaultSales: '17万',
          actualSales: '17万',
          price: '488',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/5uwyafh2j1g0000.png',
          planner: {},
          plannerName: '',
        },
        {
          id: '',
          actualViews: '15万',
          defaultSales: '14万',
          actualSales: '14万',
          price: '488',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/althqxxyow00000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '2万',
          defaultSales: '2万',
          actualSales: '2万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/6bd02flvql80000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '1万',
          defaultSales: '1万',
          actualSales: '1万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/a7m299uz5bc0000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '7万',
          defaultSales: '6万',
          actualSales: '6万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/ep6v5p1eork0000.png',
          planner: {},
        },
        {
          id: '',
          actualViews: '6万',
          defaultSales: '6万',
          actualSales: '6万',
          price: '600',
          headimg: '',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/9818rtvq5c80000.png',
          planner: {},
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
      // 埋点
      fixedMd: {
        telMd: {
          name: '工商变更_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '工商变更_钻石展位_在线咨询',
          type: '售前',
        },
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
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
      product_line: 'Wap端工商变更推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {
    back() {
      // 返回上一页
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
            bgimage: this.serviceBG[index],
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
      title: '工商变更',
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
.businesschange {
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
  .back_icon {
    margin-left: 40px;
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
}
</style>
