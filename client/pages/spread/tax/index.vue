<template>
  <div class="center">
    <!--  头部  -->
    <headHeader :title="headTitle"></headHeader>
    <!--  头部  -->
    <!--  轮播/表单  -->
    <banner></banner>
    <!--  轮播/表单  -->
    <!--  服务  -->
    <serve></serve>
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
      :plannersdata="plannersData"
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
    <fixed-bottom :data="fixedBottomData"></fixed-bottom>
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
        show: {
          imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
          cardName: '王深林',
          cardSign: '金牌规划师',
          icon: '',
          round: true,
          avatarSize: 40,
        },
        info: {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
        },
      },
      consultTitle: '对于代理记账还有疑问？企服专家为您免费解答',
      consultTel: '4000-535800',
      im: {
        id: '7862495547640840192',
        name: '张毅',
        num: '107547',
      },
    }
  },
  methods: {
    openIm() {
      this.$root.$emit('openIMM', this.im.id, this.im.name, this.im.num)
    },
  },
  head() {
    return {
      title: '税务筹划',
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
