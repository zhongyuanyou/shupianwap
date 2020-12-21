<template>
  <div class="businesschange">
    <!-- s 头部分 -->
    <Header :title="title" />
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
    <Planners :data="plannersList" :title="plannersTitle" />
    <!-- e 规划师 -->
    <!-- s 可能需要办理 -->
    <Need />
    <!-- e 可能需要办理 -->
    <!-- s 底部导航 -->
    <Bottom />
    <!-- e 底部导航 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import Header from '../../../components/common/head/header'
import BannerSwipe from '../../../components/spread/businessChange/bannerSwipe'
import Form from '../../../components/spread/businessChange/form'
import Risk from '../../../components/spread/businessChange/risk'
import ServiceIntroduced from '../../../components/spread/businessChange/serviceIntroduced'
import ServiceProcess from '../../../components/spread/businessChange/serviceProcess'
import Planners from '../../../components/spread/common/GuiHuaShiSwipe'
import Need from '../../../components/spread/businessChange/need'
import Bottom from '../../../components/spread/agency/bottom'
import dggImCompany from '../../../components/spread/dggImCompany'
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
  data() {
    return {
      title: '工商注册',
      plannersTitle: '咨询规划师',
      // 轮播列表
      imgList: [
        {
          code: 1,
          url: '',
          img: require('~/assets/spreadImages/businessChange/busi_img_gsbgbanner01.jpg'),
        },
        {
          code: 2,
          url: '',
          img: require('~/assets/spreadImages/businessChange/busi_img_gsbgbanner02.jpg'),
        },
      ],
      // 服务列表
      servicelist: [
        {
          code: 1,
          tatol: [
            { price: '18万+', title: '在线质询' },
            { price: '17万+', title: '累计成交' },
            { price: '17万+', title: '成功注册' },
          ],
          price: '488',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw01.png'),
        },
        {
          code: 2,
          tatol: [
            { price: '15万+', title: '在线质询' },
            { price: '14万+', title: '累计成交' },
            { price: '14万+', title: '成功注册' },
          ],
          price: '488',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw02.png'),
        },
        {
          code: 3,
          tatol: [
            { price: '2万+', title: '在线质询' },
            { price: '2万+', title: '累计成交' },
            { price: '2万+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw03.png'),
        },
        {
          code: 3,
          tatol: [
            { price: '6万+', title: '在线质询' },
            { price: '5万+', title: '累计成交' },
            { price: '5万+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw04.png'),
        },
        {
          code: 4,
          tatol: [
            { price: '6万+', title: '在线质询' },
            { price: '5万+', title: '累计成交' },
            { price: '5万+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw05.png'),
        },
        {
          code: 6,
          tatol: [
            { price: '6万+', title: '在线质询' },
            { price: '5万+', title: '累计成交' },
            { price: '5万+', title: '成功注册' },
          ],
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw06.png'),
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

<style lang="less" scoped>
.businesschange {
  width: 750px;
  margin: 0 auto;
  background: #ffffff;
}
</style>
