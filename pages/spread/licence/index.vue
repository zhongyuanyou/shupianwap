<template>
  <div class="licence-content">
    <!-- S 头部导航 -->
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
    <!-- E 头部导航 -->
    <!-- E 轮播图 -->
    <Banner :img-list="imgList" />
    <!-- E 轮播图 -->
    <!-- S 表单 -->
    <Form />
    <!-- E 表单 -->
    <!-- S 选择办理类型 -->
    <HandleType :type-list="typeList" />
    <!-- E 选择办理类型 -->
    <!-- S 许可证常见的办理问题 -->
    <Question :planner="plannerOne" />
    <!-- E 许可证常见的办理问题 -->
    <!-- S 为什么选择薯片平台 -->
    <Select />
    <!-- E 为什么选择薯片平台 -->
    <!-- S 咨询规划师 -->
    <Planner :planners-data="plannerList" />
    <!-- E 咨询规划师 -->
    <!-- S 您可能还需要办理 -->
    <Need />
    <!-- E 您可能还需要办理 -->
    <ConsultTel :title="titles" :tel="tel" />
    <!-- S 薯片找人 -->
    <ShuPianZhaoRen />
    <!-- E 薯片找人 -->
    <!-- S 底部 -->
    <FixedBottom :planner="plannerOne" />
    <!-- E 底部 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import Banner from '@/components/spread/licence/Banner'
import Form from '@/components/spread/licence/Form'
import HandleType from '@/components/spread/licence/HandleType'
import Question from '@/components/spread/licence/Question'
import Select from '@/components/spread/licence/Select'
import Planner from '@/components/spread/licence/Planner'
import Need from '@/components/spread/licence/Need'
import ConsultTel from '~/components/spread/common/ConsultTel'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '~/components/spread/common/FixedBottom'
import DggImCompany from '~/components/spread/DggImCompany'
import { spreadApi } from '~/api/spread'
export default {
  components: {
    Header, // 头部
    Banner, // 轮播
    Form, // 表单
    HandleType, // 办理类型
    Question, // 常见问题
    Select, // 选择原因
    Planner, // 咨询规划师
    Need, // 可能还需要办理
    ConsultTel, //  立即咨询
    ShuPianZhaoRen, //  薯片找人
    FixedBottom, //  底部推荐按钮
    DggImCompany, // IM弹框
  },
  async asyncData({ $axios }) {
    const result = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        adList: [
          {
            pageCode: 'extendLicence',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-许可证广告',
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
                    materialName: '许可证广告1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendLicence1',
                    productDetail: {
                      id: 'extendLicence1',
                      name: '',
                      referencePrice: 1800,
                      operating: {
                        showName: '食品经营许可证',
                        slogan: '从事食品销售和餐饮服务活动的都需要依法取得',
                        productDescribe:
                          '从事食品销售和餐饮服务活动的都需要依法取得',
                        actualViews: 299,
                        defaultSales: 256,
                        actualSales: 249,
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
                    materialName: '许可证广告1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendLicence2',
                    productDetail: {
                      id: 'extendLicence2',
                      name: '',
                      referencePrice: 1800,
                      operating: {
                        showName: '食品生产许可证',
                        slogan: '从事食品加工业务需要办理',
                        productDescribe: '从事食品加工业务需要办理',
                        actualViews: 167,
                        defaultSales: 126,
                        actualSales: 125,
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
                    materialName: '许可证广告1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendLicence3',
                    productDetail: {
                      id: 'extendLicence3',
                      name: '',
                      referencePrice: 25000,
                      operating: {
                        showName: '人力资源服务许可证',
                        slogan: '经营性人力资源机构的需要办理',
                        productDescribe: '经营性人力资源机构的需要办理',
                        actualViews: 43,
                        defaultSales: 36,
                        actualSales: 36,
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
                    materialName: '许可证广告1-4',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendLicence4',
                    productDetail: {
                      id: 'extendLicence4',
                      name: '',
                      referencePrice: 25000,
                      operating: {
                        showName: '劳务派遣许可证',
                        slogan: '经营劳务派遣的公司需要办理',
                        productDescribe: '经营劳务派遣的公司需要办理',
                        actualViews: 39,
                        defaultSales: 22,
                        actualSales: 22,
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
                    materialName: '许可证广告1-5',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendLicence5',
                    productDetail: {
                      id: 'extendLicence5',
                      name: '',
                      referencePrice: 28000,
                      operating: {
                        showName: '医疗器械经营许可证',
                        slogan: '售卖医用电子设备等需要办理',
                        productDescribe: '售卖医用电子设备等需要办理',
                        actualViews: 83,
                        defaultSales: 65,
                        actualSales: 65,
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
                    materialName: '许可证广告1-6',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendLicence6',
                    productDetail: {
                      id: 'extendLicence6',
                      name: '',
                      referencePrice: 12000,
                      operating: {
                        showName: '互联网药品信息服务许可证',
                        slogan: '通过互联网提供药品信息等服务需要办理',
                        productDescribe: '通过互联网提供药品信息等服务需要办理',
                        actualViews: 26,
                        defaultSales: 12,
                        actualSales: 12,
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
        ],
      },
    }
    const type = 'extendLicence'
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
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
      title: '许可证办理',
      titles: '还有疑问？企服专家为您免费解答',
      tel: '4000-962540', // 电话号码

      // 推荐规划师
      plannerOne: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://tenant-assets.meiqiausercontent.com/avatars/16984/5uyI/HqRHeYKk3pkWUn04xfOB.jpg',
      },
      plannerLsit: [
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
      // 轮播列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/h806qfpu5yg000.png',
        },
      ],
      typeList: [
        [
          {
            referencePrice: 1800,
            operating: {
              planner: {},
              showName: '食品经营许可证',
              slogan: '从事食品销售和餐饮服务活动的都需要依法取得',
              productDescribe: '从事食品销售和餐饮服务活动的都需要依法取得',
              actualViews: 299,
              defaultSales: 256,
              actualSales: 249,
              standard: '有相应场所',
              flow: '有相应设备等',
            },
          },
          {
            referencePrice: 1800,
            operating: {
              planner: {},
              showName: '食品生产许可证',
              slogan: '从事食品销售和餐饮服务活动的都需要依法取得',
              productDescribe: '从事食品销售和餐饮服务活动的都需要依法取得',
              actualViews: 167,
              defaultSales: 126,
              actualSales: 125,
              standard: '符合食品安全标准',
              flow: '有标准工艺流程',
            },
          },
        ],
        [
          {
            referencePrice: 25000,
            operating: {
              planner: {},
              showName: '人力资源服务许可证',
              slogan: '经营人力资源机构的需要办理',
              productDescribe: '经营性人力资源机构的需要办理',
              actualViews: 43,
              defaultSales: 36,
              actualSales: 36,
              standard: '有规范名称',
              flow: '有5名专职人员',
            },
          },
          {
            referencePrice: 25000,
            operating: {
              planner: {},
              showName: '劳务派遣许可证',
              slogan: '经营劳务派遣的公司需要办理',
              productDescribe: '经营劳务派遣的公司需要办理',
              actualViews: 39,
              defaultSales: 22,
              actualSales: 22,
              standard: '注册资金200万',
              flow: '有经营场所',
            },
          },
        ],
        [
          {
            referencePrice: 28000,
            operating: {
              planner: {},
              showName: '医疗器械经营许可证',
              slogan: '售卖医用电子设备等需要办理',
              productDescribe: '售卖医用电子设备等需要办理',
              actualViews: 83,
              defaultSales: 65,
              actualSales: 65,
              standard: '有贮存场所',
              flow: '有相应管理制度',
            },
          },
          {
            referencePrice: 12000,
            operating: {
              planner: {},
              showName: '互联网药品信息服务许可证',
              slogan: '通过互联网提供药品信息等服务需要办理',
              productDescribe: '通过互联网提供药品信息等服务需要办理',
              actualViews: 26,
              defaultSales: 12,
              actualSales: 12,
              standard: '依法设立的组织',
              flow: '有2名相关技术人员',
            },
          },
        ],
      ],
      standardList: [
        {
          standard: '有相应场所',
          flow: '有相应设备等',
        },
        {
          standard: '符合食品安全标准',
          flow: '有标准工艺流程',
        },
        {
          standard: '有规范名称',
          flow: '有5名专职人员',
        },
        {
          standard: '注册资金200万',
          flow: '有经营场所',
        },
        {
          standard: '有贮存场所',
          flow: '有相应管理制度',
        },
        {
          standard: '依法设立的组织',
          flow: '有2名相关技术人员',
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
    this.getProductDetail(this.result.data.adList[0].sortMaterialList || [])
  },
  mounted() {
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端许可证办理推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '许可证办理' }, () => {})
    }
  },
  methods: {
    // 头部返回
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
    //  获取办理类型数据
    getProductDetail(data) {
      this.getPlanlerList(this.result.data.planlerList || [])
      if (data.length) {
        const productList = []
        data.forEach((item, index) => {
          const res = item.materialList[0].productDetail
          const obj = {
            referencePrice: res.referencePrice,
            operating: {
              showName: res.operating.showName,
              slogan: res.operating.slogan,
              actualViews: res.operating.actualViews,
              defaultSales: res.operating.defaultSales,
              actualSales: res.operating.actualSales,
              standard: this.standardList[index].standard,
              flow: this.standardList[index].flow,
              planner: this.plannerList[
                `${
                  index < this.plannerList.length
                    ? index
                    : Math.floor(Math.random() * this.plannerList.length)
                }`
              ],
            },
          }
          productList.push(obj)
        })
        // 处理数据长度为3
        const list = []
        const foot = []
        const manpower = []
        const medical = []
        foot.push(productList[0])
        foot.push(productList[1])
        manpower.push(productList[2])
        manpower.push(productList[3])
        medical.push(productList[4])
        medical.push(productList[5])
        list.push(foot)
        list.push(manpower)
        list.push(medical)
        this.typeList = list
      }
    },
    // 获取规划师数据
    getPlanlerList(data) {
      if (data.length) {
        const planlers = []
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
          planlers.push(obj)
        })
        this.plannerList = planlers
        this.plannerOne = this.plannerList[0]
      } else {
        return this.plannerOne
      }
    },
  },
  head() {
    return {
      title: '许可证办理',
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
.licence-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  background-color: #ffffff;
  /deep/.fixed-head {
    /deep/.my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
    }
  }
}
/deep/ .sp-bottombar-info__sign {
  display: flex;
  align-items: center;
}
/deep/.cousulttel-title[data-v-024b2072] {
  margin: 29px 0 31px 0;
  text-align: left;
}
/deep/ .back_icon {
  margin-left: 40px;
}
</style>
