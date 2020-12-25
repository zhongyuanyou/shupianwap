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
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      if (res.code === 200) {
        return {
          result: res,
        }
      }
    } catch (error) {
      // 请求出错也要保证页面正常显示
      return {}
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
      nums: null,
      planner: {
        id: '',
        name: '',
        jobNum: '',
        telephone: '',
        imgSrc: '',
      },
      resultData: {
        code: 200,
        message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
        data: {
          nums: {
            todayNum: 12528,
            totalNum: 652517,
          },
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
            {
              id: 30158,
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
              id: 30165,
              userId: '66475',
              userCentreId: '66475',
              loginName: '38798340',
              realName: '钟霞',
              userHeadUrl:
                'http://fastdfs.dggvip.net:8080/group1/M00/0F/E7/CgAAB19jRe-EZCmnAAAAAOB-9qQ642.jpg',
              userPhone: '13730634929',
              cvr: 0.157895,
              cvrValue: 65.427034,
              orderBus: 9,
              orderBusValue: 51.522266,
              busPerformance: 20770,
              busPerformanceValue: 95.658559,
              abilityValue: 73.270253,
              formatType: '工商',
            },
          ],
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
        },
      },
      // 轮播列表
      imgList: [
        {
          code: 1,
          url: '',
          img: require('~/assets/spreadImages/agency/busi_img_dljzbanner@1,5x.jpg'),
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
          bgimage: require('~/assets/spreadImages/agency/busi_img_dljzcp01@1,5x.jpg'),
          planner: '',
        },
        {
          id: '',
          actualViews: '983',
          defaultSales: '642',
          actualSales: '642',
          price: '1500',
          bgimage: require('~/assets/spreadImages/agency/busi_img_dljzcp02@1,5x.jpg'),
          planner: '',
        },
        {
          id: '',
          actualViews: '1275',
          defaultSales: '937',
          actualSales: '937',
          price: '6988',
          bgimage: require('~/assets/spreadImages/agency/busi_img_dljzcp03@1,5x.jpg'),
          planner: '',
        },
      ],
      // 规划师列表

      plannersList: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
        {
          id: 2,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
        {
          id: 3,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
      ],
    }
  },
  created() {
    if (this.result.length !== 0) {
      this.productDetail(this.result.data.adList[0].sortMaterialList)
      this.nums = this.result.data.nums
      if (this.result.data.planlerList !== 0) {
        this.plannerHandleData(this.result.data.planlerList || [])
      } else {
        this.plannerHandleData(this.resultData.data.planlerList || [])
      }
    } else {
      this.productDetail(this.resultData.data.adList[0].sortMaterialList)
      this.plannerHandleData(this.resultData.data.planlerList || [])
      this.nums = this.resultData.data.nums
    }
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
            bgimage: require(`~/assets/spreadImages/agency/busi_img_dljzcp0${
              index + 1
            }@1,5x.jpg`),
            planner: this.plannersList[`${index >= 1 ? 1 : index}`],
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
        window.open(url, '_blank')
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
      return this.planner
    },
  },
  head() {
    return {
      title: '代理记账',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
        {
          src: '/js/spread/businessAgency-md-config.js',
        },
        {
          src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
        },
      ],
    }
  },
}
</script>

<style lang="less">
.agency {
  width: 750px;
  margin: 0 auto;
}
</style>
