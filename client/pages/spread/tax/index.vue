<template>
  <div class="center">
    <!--  头部  -->
    <Head :title="title"></Head>
    <!--  头部  -->
    <!--  轮播/表单  -->
    <Banner></Banner>
    <!--  轮播/表单  -->
    <!--  服务  -->
    <Serve></Serve>
    <!--  服务  -->
    <!--  咨询  -->
    <Conrult></Conrult>
    <!--  咨询  -->
    <!--  优势  -->
    <Super></Super>
    <!--  优势  -->
    <!--  服务流程  -->
    <Process></Process>
    <!--  服务流程  -->
    <!--  规划师  -->
    <GuiHuaShiSwipe :data="planners" :title="plannersTitle"></GuiHuaShiSwipe>
    <!--  规划师  -->
    <!--  可能需要  -->
    <Maby></Maby>
    <!--  可能需要  -->
    <!--  立即咨询  -->
    <ConsultTel
      title="对于代理记账还有疑问？企服专家为您免费解答"
      tel="4000-535800"
    ></ConsultTel>
    <!--  立即咨询  -->
    <!--  底部  -->
    <ShuPianZhaoRen></ShuPianZhaoRen>
    <FixedBottom :data="data"></FixedBottom>
    <!--  底部  -->
    <!--  IM  -->
    <dgg-im-company></dgg-im-company>
    <!--  IM  -->
  </div>
</template>

<script>
import Head from '~/components/common/head/header'
import Banner from '~/components/spread/tax/banner'
import Serve from '~/components/spread/tax/serve'
import Conrult from '~/components/spread/tax/conrult'
import Super from '~/components/spread/tax/super'
import Process from '~/components/spread/tax/process'
// import Planner from '~/components/spread/tax/planner'
import GuiHuaShiSwipe from '~/components/spread/common/GuiHuaShiSwipe'
import Maby from '~/components/spread/tax/maby'
// import Bottom from '~/components/spread/tax/bottom'
import dggImCompany from '~/components/spread/DggImCompany'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '~/components/spread/common/FixedBottom'
import ConsultTel from '@/components/spread/common/ConsultTel'
export default {
  name: 'TaxVue',
  components: {
    Head,
    Banner,
    Serve,
    Conrult,
    Super,
    Process,
    GuiHuaShiSwipe,
    Maby,
    // Bottom,
    dggImCompany,
    ShuPianZhaoRen,
    FixedBottom,
    ConsultTel,
  },
  data() {
    return {
      title: '税务筹划',
      planners: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 138,
          serverNum: 258,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
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
        },
      ],
      plannersTitle: '咨询规划师',
      data: {
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
