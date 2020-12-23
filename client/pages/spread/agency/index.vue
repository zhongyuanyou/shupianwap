<template>
  <div class="agency">
    <!-- s 头部导航 -->
    <Header :title="title" />
    <!-- e 头部导航 -->
    <!-- s Banner -->
    <Banner :imglist="imgList" />
    <!-- e Banner -->
    <!-- s form表单 -->
    <Form />
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
    <Planners :data="plannersList" :title="plannersTitle" />
    <!-- e 咨询规划师 -->
    <!-- s 可能需要 -->
    <Need />
    <!-- e 可能需要 -->
    <!-- s 底部导航 -->
    <Bottom />
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
import Bottom from '../../../components/spread/agency/bottom'
import Need from '../../../components/spread/agency/need'
import dggImCompany from '../../../components/spread/DggImCompany'

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
  data() {
    return {
      title: '代理记账',
      plannersTitle: '咨询规划师',
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
          code: 1,
          tatol: [
            { price: '21万+', title: '在线质询' },
            { price: '18万+', title: '累计成交' },
            { price: '18万+', title: '成功注册' },
          ],
          price: '2288',
          headimg: '',
          bgimage: require('~/assets/spreadImages/agency/busi_img_dljzcp01@1,5x.jpg'),
        },
        {
          code: 2,
          tatol: [
            { price: '13万+', title: '在线质询' },
            { price: '10万+', title: '累计成交' },
            { price: '10万+', title: '成功注册' },
          ],
          price: '1500',
          headimg: '',
          bgimage: require('~/assets/spreadImages/agency/busi_img_dljzcp02@1,5x.jpg'),
        },
        {
          code: 3,
          tatol: [
            { price: '6万+', title: '在线质询' },
            { price: '5万+', title: '累计成交' },
            { price: '5万+', title: '成功注册' },
          ],
          price: '6988',
          headimg: '',
          bgimage: require('~/assets/spreadImages/agency/busi_img_dljzcp03@1,5x.jpg'),
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

<style lang="less">
.agency {
  width: 750px;
  margin: 0 auto;
}
</style>
