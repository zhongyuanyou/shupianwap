<template>
  <div class="seal">
    <!--  头部  -->
    <Header v-show="!isInApp" :title="headTitle">
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
    <!--  头部  -->
    <!--  轮播/表单  -->
    <banner></banner>
    <!--  轮播/表单  -->
    <!--  刻章服务  -->
    <seal-serve></seal-serve>
    <!--  刻章服务  -->
    <!--  立即咨询  -->
    <consult-tel
      :tel="consultTel"
      button="免费咨询"
      md-name="专业刻章服务_免费咨询"
      title=""
    ></consult-tel>
    <!--  立即咨询  -->
    <!--  服务介绍  -->
    <ServiceIntroduced
      :service-list="serviceList"
      :service-title="serviceTitle"
    ></ServiceIntroduced>
    <!--  服务介绍  -->
    <!--  规划师  -->
    <gui-hua-shi-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
    ></gui-hua-shi-swipe>
    <!--  规划师  -->
    <!--  服务流程  -->
    <process></process>
    <!--  服务流程  -->
    <!--  平台优势  -->
    <goods></goods>
    <!--  平台优势  -->
    <!--  可能需要  -->
    <maby></maby>
    <!--  可能需要  -->
    <!--  立即咨询  -->
    <consult-tel
      :tel="consultTel"
      md-name="印章服务_疑问咨询"
      title="还有疑问？企服专家为您免费解答"
    ></consult-tel>
    <!--  立即咨询  -->
    <!--  薯片找人  -->
    <shuPianZhaoRen></shuPianZhaoRen>
    <!--  薯片找人  -->
    <!--  底部咨询  -->
    <fixedBottom :md="fixedMd" :planner="fixedBottomData"></fixedBottom>
    <!--  底部咨询  -->
    <!--  IM  -->
    <dgg-im-company></dgg-im-company>
    <!--  IM  -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import banner from '~/components/spread/seal/Banner'
import sealServe from '~/components/spread/seal/SealServe'
import consultTel from '@/components/spread/common/ConsultTel'
import guiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'
import process from '~/components/spread/seal/Process'
import ServiceIntroduced from '@/components/spread/common/ServiceIntroduced'
import goods from '~/components/spread/seal/Goods'
import maby from '~/components/spread/seal/Maby'
import shuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import fixedBottom from '~/components/spread/common/FixedBottom'
import dggImCompany from '~/components/spread/DggImCompany'
import { spreadApi } from '~/api/spread'

export default {
  name: 'Idnex',
  components: {
    Header,
    banner,
    sealServe,
    consultTel,
    guiHuaShiSwipe,
    process,
    ServiceIntroduced,
    goods,
    maby,
    shuPianZhaoRen,
    fixedBottom,
    dggImCompany,
  },
  // 服务端渲染请求数据
  async asyncData({ $axios }) {
    const type = 'extendSealEngraving'
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
      headTitle: '印章刻制',
      consultTel: '4000 - 962540',
      plannersData: [],
      plannersCommon: {
        title: '咨询规划师',
        imName: '印章服务_咨询规划师_在线咨询',
        telName: '印章服务_咨询规划师_拨打电话',
      },
      // 服务列表
      serviceList: [],
      pageTitle: '印章刻制',
      serviceTitle: '服务介绍',
      fixedBottomData: {},
      fixedMd: {
        telMd: {
          name: '印章服务_钻石展位_拔打电话',
          type: '售前',
        },
        imMd: {
          name: '印章服务_钻石展位_在线咨询',
          type: '售前',
        },
      },
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
      adList: [
        {
          pageCode: 'extendSealEngraving',
          locationShowTypeCode: 'GGWZXSS_GDXS',
          locationName: 'wap-推广页-印章刻制广告',
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
                  materialName: '推广页印章刻制1-1',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendSealEngraving1',
                  productDetail: {
                    id: 'extendSealEngraving1',
                    name: '公章',
                    referencePrice: 230,
                    operating: {
                      showName: '公章',
                      slogan: '公司对外事务时需要加盖',
                      productDescribe: '公司对外事务时需要加盖',
                      actualViews: 1802,
                      defaultSales: 1454,
                      actualSales: 1450,
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
                  materialName: '推广页印章刻制1-2',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendSealEngraving2',
                  productDetail: {
                    id: 'extendSealEngraving2',
                    name: '法人章',
                    referencePrice: 230,
                    operating: {
                      showName: '法人章',
                      slogan: '一般用于银行预留印鉴或者代替法人签名',
                      productDescribe: '一般用于银行预留印鉴或者代替法人签名',
                      actualViews: 1783,
                      defaultSales: 1302,
                      actualSales: 1298,
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
                  materialName: '推广页印章刻制1-3',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendSealEngraving3',
                  productDetail: {
                    id: 'extendSealEngraving3',
                    name: '财务章',
                    referencePrice: 230,
                    operating: {
                      showName: '法人章',
                      slogan: '一般用于银行预留印鉴或者代替法人签名',
                      productDescribe: '一般用于银行预留印鉴或者代替法人签名',
                      actualViews: 1783,
                      defaultSales: 1302,
                      actualSales: 1298,
                    },
                  },
                },
              ],
            },
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
                  materialName: '推广页印章刻制1-1',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendSealEngraving1',
                  productDetail: {
                    id: 'extendSealEngraving1',
                    name: '公章',
                    referencePrice: 230,
                    operating: {
                      showName: '公章',
                      slogan: '公司对外事务时需要加盖',
                      productDescribe: '公司对外事务时需要加盖',
                      actualViews: 1802,
                      defaultSales: 1454,
                      actualSales: 1450,
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
                  materialName: '推广页印章刻制1-2',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendSealEngraving2',
                  productDetail: {
                    id: 'extendSealEngraving2',
                    name: '法人章',
                    referencePrice: 230,
                    operating: {
                      showName: '法人章',
                      slogan: '一般用于银行预留印鉴或者代替法人签名',
                      productDescribe: '一般用于银行预留印鉴或者代替法人签名',
                      actualViews: 1783,
                      defaultSales: 1302,
                      actualSales: 1298,
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
                  materialName: '推广页印章刻制1-3',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendSealEngraving3',
                  productDetail: {
                    id: 'extendSealEngraving3',
                    name: '财务章',
                    referencePrice: 230,
                    operating: {
                      showName: '法人章',
                      slogan: '一般用于银行预留印鉴或者代替法人签名',
                      productDescribe: '一般用于银行预留印鉴或者代替法人签名',
                      actualViews: 1783,
                      defaultSales: 1302,
                      actualSales: 1298,
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
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    // 请求回来的数据替代本地
    if (this.result !== '' && this.result !== undefined) {
      if (
        this.result.planlerList !== undefined &&
        this.result.planlerList.length !== 0
      ) {
        this.planlerList = this.result.planlerList
      }
      if (this.result.adList !== undefined && this.result.adList.length !== 0) {
        this.adList = this.result.adList
      }
      if (this.result.nums !== undefined && this.result.nums.length !== 0) {
        this.todayNum = this.result.nums.todayNum
      }
    }
    this.getPlannersData()
    this.getServeData()
    this.getfixedBottomData()
  },
  mounted() {
    console.log(this.result)
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端印章服务推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '印章刻制' }, () => {})
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
    // 服务模块数据处理
    getServeData() {
      const length = this.adList[0].sortMaterialList.length
      for (let i = 0; i < length; i++) {
        const obj = {
          title: this.adList[0].sortMaterialList[i].materialList[0]
            .productDetail.name,
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent: this.adList[0].sortMaterialList[i].materialList[0]
            .productDetail.operating.productDescribe,
          actualViews: this.adList[0].sortMaterialList[i].materialList[0]
            .productDetail.operating.actualViews,
          defaultSales: this.adList[0].sortMaterialList[i].materialList[0]
            .productDetail.operating.defaultSales,
          actualSales: this.adList[0].sortMaterialList[i].materialList[0]
            .productDetail.operating.actualSales,
          price: this.adList[0].sortMaterialList[i].materialList[0]
            .productDetail.referencePrice,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
          planner: {
            id: this.planlerList[i % this.planlerList.length].userCentreId,
            name: this.planlerList[i % this.planlerList.length].realName,
            jobNum: this.planlerList[i % this.planlerList.length].loginName,
            telephone: this.planlerList[i % this.planlerList.length].userPhone,
            imgSrc: this.planlerList[i % this.planlerList.length].userHeadUrl,
          },
          labelsType: 'row',
          colLabels: [
            {
              icon: '',
              title: '',
              content: [],
            },
          ],
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5rm0wj4crok0000.png',
            text: ['办理快至2小时', '新公司必备', '送章上门'],
          },
        }
        this.serviceList.push(obj)
      }
    },
    // 规划师模块数据处理
    getPlannersData() {
      const length = this.planlerList.length
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
    // 底部模块数据处理
    getfixedBottomData() {
      this.fixedBottomData = {
        id: this.planlerList[0].userCentreId,
        name: this.planlerList[0].realName,
        jobNum: this.planlerList[0].loginName,
        telephone: this.planlerList[0].userPhone,
        imgSrc: this.planlerList[0].userHeadUrl,
      }
    },
  },
  head() {
    return {
      title: '印章刻制',
      meta: [
        {
          name: 'keywords',
          content: '专利转让网,专利转让平台,优质专利,专利交易,顶呱呱交易平台',
        },
        {
          name: 'description',
          content:
            '顶呱呱交易平台，提供特价专利转让、精品专利交易、专利买卖出售服务。百万海量专利资源在线选购，即买即用，专业的专利买卖平台就上顶呱呱，安全放心！',
        },
      ],
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
.seal {
  width: 750px;
  margin: 0 auto;
  .back_icon {
    margin-left: 40px;
  }
  /deep/ .my-head {
    width: 750px !important;
    left: auto !important;
  }
}

// 服务组件字体颜色
/deep/ .serviceList-content-head-title > span {
  color: #ffffff !important;
}

/deep/ .serviceList-content-head > span {
  color: #cccccc !important;
}

//咨询外边距
/deep/ .cousulttel-title {
  margin: 0 0 24px;
}

//咨询内边距
/deep/ .cousulttel {
  padding-bottom: 0;
}

//轮播规划师组件圆角
/deep/ .planner-content-item-shadow {
  border-radius: 8px;
}

// 规划师组件上边距
/deep/ .planner {
  padding-top: 64px;
}
</style>
