<template>
  <div class="center">
    <!--  头部  -->
    <headHeader :title="headTitle"></headHeader>
    <!--  头部  -->
    <!--  轮播/表单  -->
    <banner></banner>
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
      :planners-data="plannersData"
      :title="plannersTitle"
    ></gui-hua-shi-swipe>
    <!--  规划师  -->
    <!--  可能需要  -->
    <maby></maby>
    <!--  可能需要  -->
    <!--  立即咨询  -->
    <consult-tel :title="consultTitle" :tel="consultTel"></consult-tel>
    <!--  立即咨询  -->
    <!--  底部  -->
    <shu-pian-zhao-ren></shu-pian-zhao-ren>
    <fixed-bottom :planner="fixedBottomData"></fixed-bottom>
    <!--  底部  -->
    <!--  IM  -->
    <dgg-im-company></dgg-im-company>
    <!--  IM  -->
  </div>
</template>

<script>
import headHeader from '~/components/common/head/header'
import banner from '~/components/spread/tax/Banner'
import serve from '~/components/spread/tax/Serve'
import conrult from '~/components/spread/tax/Conrult'
import good from '~/components/spread/tax/Good'
import process from '~/components/spread/tax/Process'
// import planner from '~/components/spread/tax/Planner'
import guiHuaShiSwipe from '~/components/spread/common/GuiHuaShiSwipe'
import maby from '~/components/spread/tax/maby'
// import bottom from '~/components/spread/tax/Bottom'
import dggImCompany from '~/components/spread/DggImCompany'
import shuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import fixedBottom from '~/components/spread/common/FixedBottom'
import consultTel from '@/components/spread/common/ConsultTel'
import { spreadApi } from '@/api/spread'
export default {
  name: 'TaxVue',
  components: {
    headHeader,
    banner,
    serve,
    conrult,
    good,
    process,
    // planner,
    guiHuaShiSwipe,
    maby,
    // bottom,
    dggImCompany,
    shuPianZhaoRen,
    fixedBottom,
    consultTel,
  },
  async asyncData({ $axios }) {
    const type = 'extendTaxPlanning '
    try {
      const res = await $axios.get(spreadApi.list, {
        params: {
          pageCode: type,
        },
      })
      if (res.code === 200) {
        console.log(res.data.adList[0].sortMaterialList[0].materialList[0])
        return {
          result: res.data,
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  },
  data() {
    return {
      headTitle: '税务筹划',
      sortMaterialList: [
        {
          materialList: [
            {
              productDetail: {
                id: 'extendAccount1',
                name: '',
                referencePrice: 2288,
                operating: {
                  showName: '小规模纳税人代理记账',
                  slogan: '连续12个月应征增值税销售额未超过500万元',
                  productDescribe: '连续12个月应征增值税销售额未超过500万元',
                  actualViews: 210000,
                  defaultSales: 180000,
                  actualSales: 180000,
                },
              },
            },
          ],
        },
      ],
      plannersData: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 138,
          serverNum: 258,
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
      plannersTitle: '咨询规划师',
      fixedBottomData: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
      },
      consultTitle: '对于代理记账还有疑问？企服专家为您免费解答',
      consultTel: '4000-535800',
      serveData: [
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchlist1.jpg') +
              ')',
          },
          num1: '28',
          num2: '27',
          num3: '27',
          price: '500',
          person: '',
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchlist2.jpg') +
              ')',
          },
          num1: '28',
          num2: '27',
          num3: '27',
          price: '500',
          person: '',
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
        {
          bg: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_img_swchlist3.jpg') +
              ')',
          },
          num1: '28',
          num2: '27',
          num3: '27',
          price: '500',
          person: '',
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
      ],
      im: {
        id: '7862495547640840192',
        name: '张毅',
        num: '107547',
      },
    }
  },
  created() {
    // 调用服务模块数据处理
    // this.getServeData(this.result)
  },
  methods: {
    // 服务模块数据处理
    // getServeData(res) {
    //   for (let i = 0; i < this.serveData.length; i++) {
    //     // 循环价格
    //     this.serveData[i].price =
    //       res.adList[0].sortMaterialList[
    //         i
    //       ].materialList[0].productDetail.referencePrice
    //     // 循环咨询
    //     this.serveData[i].num1 =
    //       res.adList[0].sortMaterialList[i].materialList[0].productDetail
    //         .operating.actualViews / 10000
    //     // 循环咨询
    //     this.serveData[i].num2 =
    //       res.adList[0].sortMaterialList[i].materialList[0].productDetail
    //         .operating.defaultSales / 10000
    //     // 循环咨询
    //     this.serveData[i].num3 =
    //       res.adList[0].sortMaterialList[i].materialList[0].productDetail
    //         .operating.actualSales / 10000
    //   }
    // },
    // 这个页面统一调用IM时的信息
    openIm() {
      this.$root.$emit('openIMM', this.im.id, this.im.name, this.im.num)
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
      ],
    }
  },
}
</script>

<style scoped>
.center {
  width: 750px;
  margin: 0 auto;
}
</style>
