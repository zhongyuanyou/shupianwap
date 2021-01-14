<template>
  <div class="center">
    <!--  头部  -->
    <Header :title="headTitle">
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
    <banner :today-num="todayNum"></banner>
    <!--  轮播/表单  -->
    <!--  服务  -->
    <serve :serve-data="serveData"></serve>
    <!--  服务  -->
    <!--  咨询  -->
    <conrult></conrult>
    <!--  咨询  -->
    <!--  优势  -->
    <good></good>
    <!--  优势  -->
    <!--  服务流程  -->
    <process></process>
    <!--  服务流程  -->
    <!--  规划师  -->
    <gui-hua-shi-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
    ></gui-hua-shi-swipe>
    <!--  规划师  -->
    <!--  可能需要  -->
    <maby></maby>
    <!--  可能需要  -->
    <!--  立即咨询  -->
    <consult-tel :tel="consultTel" :title="consultTitle"></consult-tel>
    <!--  立即咨询  -->
    <!--  底部  -->
    <shu-pian-zhao-ren></shu-pian-zhao-ren>
    <fixed-bottom :planner="fixedBottomData" :md="fixedMd"></fixed-bottom>
    <!--  底部  -->
    <!--  IM  -->
    <dgg-im-company></dgg-im-company>
    <!--  IM  -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import banner from '~/components/spread/tax/Banner'
import serve from '~/components/spread/tax/Serve'
import conrult from '~/components/spread/tax/Conrult'
import good from '~/components/spread/tax/Good'
import process from '~/components/spread/tax/Process'
import guiHuaShiSwipe from '~/components/spread/common/GuiHuaShiSwipe'
import maby from '~/components/spread/tax/Maby'
import dggImCompany from '~/components/spread/DggImCompany'
import shuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import fixedBottom from '~/components/spread/common/FixedBottom'
import consultTel from '@/components/spread/common/ConsultTel'
import { spreadApi } from '@/api/spread'

export default {
  name: 'TaxVue',
  components: {
    Header,
    banner,
    serve,
    conrult,
    good,
    process,
    guiHuaShiSwipe,
    maby,
    dggImCompany,
    shuPianZhaoRen,
    fixedBottom,
    consultTel,
  },
  // 服务端渲染请求数据
  async asyncData({ $axios }) {
    const type = 'extendTaxPlanning'
    try {
      const res = await $axios.get(spreadApi.list, {
        params: {
          pageCode: type,
        },
      })
      if (res.code === 200) {
        return {
          result: '',
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
      headTitle: '税务筹划',
      plannersData: [
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ],
      plannersCommon: {
        title: '咨询规划师',
        imName: '税务筹划_咨询规划师_在线咨询',
        telName: '税务筹划_咨询规划师_拨打电话',
      },
      fixedBottomData: {
        id: '7862495547640840192',
        name: '郭亮亮',
        jobNum: '107547',
        telephone: '12345679985',
        imgSrc: '',
      },
      fixedMd: {
        telMd: {
          name: '税务筹划_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '税务筹划_钻石展位_在线咨询',
          type: '售前',
        },
      },
      consultTitle: '对于代理记账还有疑问？企服专家为您免费解答',
      consultTel: '4000-962540',
      serveData: [
        {
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/21cjuvpuz5vk000.jpg)',
          },
          num1: '',
          num2: '',
          num3: '',
          price: '',
          person: '',
          id: '',
          name: '',
          jobNum: '',
          productName: '增值税筹划',
          phone: '',
        },
        {
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/3i3g8eyy7q20000.jpg)',
          },
          num1: '',
          num2: '',
          num3: '',
          price: '',
          person: '',
          id: '',
          name: '',
          jobNum: '',
          productName: '企业所得税筹划',
        },
        {
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/fab76tq8cnk0000.jpg)',
          },
          num1: '',
          num2: '',
          num3: '',
          price: '',
          person: '',
          id: '',
          name: '',
          jobNum: '',
          productName: '个人所得税筹划',
        },
      ],
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
          pageCode: 'extendTaxPlanning',
          locationShowTypeCode: 'GGWZXSS_GDXS',
          locationName: 'wap-推广页-税务筹划广告',
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
                  materialName: '税务筹划广告物料1-1',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendTaxPlanning1',
                  productDetail: {
                    id: 'extendTaxPlanning1',
                    name: '增值税筹划',
                    referencePrice: 500,
                    operating: {
                      showName: '增值税筹划',
                      slogan: '增值税即征即退',
                      productDescribe: '增值税即征即退',
                      actualViews: 2720,
                      defaultSales: 2042,
                      actualSales: 2039,
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
                  materialName: '税务筹划广告物料1-2',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendTaxPlanning2',
                  productDetail: {
                    id: 'extendTaxPlanning2',
                    name: '企业所得税筹划',
                    referencePrice: 500,
                    operating: {
                      showName: '企业所得税筹划',
                      slogan:
                        '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
                      productDescribe:
                        '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
                      actualViews: 2720,
                      defaultSales: 2042,
                      actualSales: 2039,
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
                  materialName: '税务筹划广告物料1-3',
                  androidLink: '',
                  materialWidth: 750,
                  iosLink: '',
                  linkType: 2,
                  wapLink: '',
                  executeParam: '',
                  productId: 'extendTaxPlanning3',
                  productDetail: {
                    id: 'extendTaxPlanning3',
                    name: '个人所得税筹划',
                    referencePrice: 500,
                    operating: {
                      showName: '个人所得税筹划',
                      slogan:
                        '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
                      productDescribe:
                        '计算全年应纳税所得额和应纳所得税，确定应补、退税额',
                      actualViews: 2720,
                      defaultSales: 2042,
                      actualSales: 2039,
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
      todayNum: 118,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  created() {
    let pbool = false // 确定数据返回
    let abool = false // 确定数据返回
    let nbool = false // 确定数据返回
    // 请求回来的数据替代本地
    if (this.result !== '' && this.result !== undefined) {
      if (
        this.result.planlerList.length !== 0 &&
        this.result.planlerList.length !== undefined
      ) {
        pbool = true
        if (this.result.planlerList.length < 3) {
          this.planlerList.forEach((item, index) => {
            this.planlerList[index] = this.result.planlerList[
              index % this.result.planlerList.length
            ]
          })
        } else {
          this.planlerList = this.result.planlerList
        }
        this.getPlannersData()
      }
      if (
        this.result.adList.length !== 0 &&
        this.result.adList.length !== undefined
      ) {
        abool = true
        this.adList = this.result.adList
      }
      if (
        this.result.nums.todayNum !== '' &&
        this.result.nums.todayNum !== undefined
      ) {
        nbool = true
        this.nums = this.result.nums
      }
    }
    // 各个数据都返回后再处理各个模块的数据
    if (pbool && abool && nbool) {
      this.getServeData()
      this.getPlannersData()
      this.getfixedBottomData()
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
      for (let i = 0; i < this.serveData.length; i++) {
        // 循环价格
        this.serveData[i].price = this.adList[0].sortMaterialList[
          i
        ].materialList[0].productDetail.referencePrice
        // 循环在线咨询
        this.serveData[i].num1 = this.adList[0].sortMaterialList[
          i
        ].materialList[0].productDetail.operating.actualViews
        // 循环累计成交
        this.serveData[i].num2 = this.adList[0].sortMaterialList[
          i
        ].materialList[0].productDetail.operating.defaultSales
        // 循环成功案例
        this.serveData[i].num3 = this.adList[0].sortMaterialList[
          i
        ].materialList[0].productDetail.operating.actualSales
        // 循环头像
        this.serveData[i].person = this.planlerList[i].userHeadUrl
        // 循环id
        this.serveData[i].id = this.planlerList[i].userCentreId
        // 循环名字
        this.serveData[i].name = this.planlerList[i].realName
        // 循环工号
        this.serveData[i].jobNum = this.planlerList[i].loginName
        // 循环电话号码
        this.serveData[i].phone = this.planlerList[i].userPhone
      }
    },
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
    // 底部模块数据处理
    getfixedBottomData() {
      // 循环头像
      this.fixedBottomData.imgSrc = this.planlerList[0].userHeadUrl
      // 循环id
      this.fixedBottomData.id = this.planlerList[0].userCentreId
      // 循环名字
      this.fixedBottomData.name = this.planlerList[0].realName
      // 循环工号
      this.fixedBottomData.jobNum = this.planlerList[0].loginName
      // 循环工号
      this.fixedBottomData.telephone = this.planlerList[0].userPhone
    },
    // 这个页面统一调用IM时的信息
    openIm() {
      this.$root.$emit(
        'openIMM',
        this.planlerList[0].userCentreId,
        this.planlerList[0].realName,
        this.planlerList[0].loginName,
        this.planlerList[0].userHeadUrl
      )
    },
  },
  head() {
    return {
      title: '税务筹划',
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
        {
          src: '/js/spread/tax-md-config.js',
        },
        {
          src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.center {
  width: 750px;
  margin: 0 auto;
  .back_icon {
    margin-left: 40px;
  }
}

/deep/ .my-head {
  width: 750px !important;
  left: auto !important;
}
</style>
