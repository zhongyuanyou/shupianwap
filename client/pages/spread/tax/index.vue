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
    <Planner :planners="planners"></Planner>
    <!--  规划师  -->
    <!--  可能需要  -->
    <Maby></Maby>
    <!--  可能需要  -->
    <!--  底部  -->
    <Bottom></Bottom>
    <!--  底部  -->
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
import Planner from '~/components/spread/common/planner'
import Maby from '~/components/spread/tax/maby'
import Bottom from '~/components/spread/tax/bottom'
export default {
  name: 'TaxVue',
  components: {
    Head,
    Banner,
    Serve,
    Conrult,
    Super,
    Process,
    Planner,
    Maby,
    Bottom,
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
