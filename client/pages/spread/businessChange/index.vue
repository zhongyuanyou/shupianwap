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
    <Bottom :planner="planner" />
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
import Bottom from '../../../components/spread/common/FixedBottom'
import dggImCompany from '../../../components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'

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
  async asyncData({ $axios }) {
    const type = 'extendBussineChange'
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      console.log(res)
      return {
        resultData: res,
      }
    } catch (error) {
      console.log('error', error)
      // 请求出错也要保证页面正常显示
      return {}
    }
  },
  data() {
    return {
      title: '工商变更',
      plannersTitle: '咨询规划师',
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
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
          id: '',
          actualViews: '18万',
          defaultSales: '17万',
          actualSales: '17万',
          price: '488',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw01.png'),
        },
        {
          id: '',
          actualViews: '15万',
          defaultSales: '14万',
          actualSales: '14万',
          price: '488',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw02.png'),
        },
        {
          id: '',
          actualViews: '2万',
          defaultSales: '2万',
          actualSales: '2万',
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw03.png'),
        },
        {
          id: '',
          actualViews: '1万',
          defaultSales: '1万',
          actualSales: '1万',
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw04.png'),
        },
        {
          id: '',
          actualViews: '7万',
          defaultSales: '6万',
          actualSales: '6万',
          price: '600',
          headimg: '',
          bgimage: require('~/assets/spreadImages/businessChange/busi_img_gsbgfw05.png'),
        },
        {
          id: '',
          actualViews: '6万',
          defaultSales: '6万',
          actualSales: '6万',
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
  created() {
    this.productDetail(this.resultData.data.adList[0].sortMaterialList)
  },
  methods: {
    productDetail(data) {
      if (data.length === 0) {
      } else {
        const fuWuList = []
        data.forEach((item, index) => {
          const obj = {
            id: item.id,
            actualViews:
              item.materialList[0].productDetail.operating.actualViews,
            defaultSales:
              item.materialList[0].productDetail.operating.defaultSales,
            actualSales:
              item.materialList[0].productDetail.operating.actualSales,
            price: item.materialList[0].productDetail.referencePrice,
            bgimage: require(`~/assets/spreadImages/businessChange/busi_img_gsbgfw0${
              index + 1
            }.png`),
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
        const planner = this.planner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || ''
        )
      }
    },
  },
  head() {
    return {
      title: '工商变更',
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
