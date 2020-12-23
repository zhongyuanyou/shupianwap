<template>
  <div class="page-content">
    <Header title="工商财税" />
    <!-- START 轮播图-->
    <Banner :images="images" />
    <!-- END 轮播图-->
    <!-- START 导航-->
    <Nav />
    <!-- END 导航-->
    <!-- START 热销专区-->
    <HotSale />
    <!-- END 热销专区-->
    <!-- START 快速查询-->
    <KuaiSuChaXun />
    <!-- END 快速查询-->
    <!-- START 初创必备-->
    <ChuChuang />
    <!-- END 初创必备-->
    <!-- END 经营必备-->
    <JingYing />
    <!-- END 经营必备-->
    <!-- START 实用工具-->
    <ShiYong />
    <!-- END 实用工具-->
    <!-- START 企服规划师-->
    <GuiHuaShiSwipe :data="guiHuaShiList" title="企服规划师" />
    <!-- END 企服规划师-->
    <!-- START 平台优势-->
    <PingTaiYouShi />
    <!-- END 平台优势-->
    <!-- START 薯片找人-->
    <ShuPianZhaoRen />
    <!-- END 薯片找人-->
    <!-- START 固定底部-->
    <FixedBottom :data="guiHuaShiBottom" />
    <!-- END 固定底部-->
    <!-- START IM在线咨询-->
    <dgg-im-company></dgg-im-company>
    <!-- END IM在线咨询-->
  </div>
</template>

<script>
import dggImCompany from '~/components/spread/DggImCompany'
import Header from '@/components/common/head/header'
import Banner from '@/components/spread/home/Banner'
import Nav from '@/components/spread/home/Nav'
import HotSale from '@/components/spread/home/HotSale1'
import ChuChuang from '@/components/spread/home/ChuChuang'
import JingYing from '@/components/spread/home/JingYing'
import ShiYong from '@/components/spread/home/ShiYong'
import PingTaiYouShi from '@/components/spread/home/PingTaiYouShi'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '~/components/spread/common/FixedBottom'
import KuaiSuChaXun from '@/components/spread/home/KuaiSuChaXun'
import GuiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'
import { homeApi } from '~/api'
export default {
  name: 'Index',
  components: {
    Banner,
    Header,
    Nav,
    HotSale,
    ChuChuang,
    JingYing,
    ShiYong,
    PingTaiYouShi,
    ShuPianZhaoRen,
    FixedBottom,
    KuaiSuChaXun,
    GuiHuaShiSwipe,
    dggImCompany,
  },
  async asyncData({ $axios }) {
    // const type = 'extendBussineHome'
    // const res = await $axios.get(
    //   `http://172.16.133.7:7001/service/nk/spread/v1/list.do?pageCode=${type}`
    // )
    // console.log(res)
  },
  data() {
    return {
      images: [
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
      ],
      guiHuaShiList: [
        {
          id: 1,
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
      guiHuaShiBottom: {
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
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
      },
    }
  },
  methods: {
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        const planner = this.pagePlanner
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
      title: '工商首页',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: 750px;
  margin: 0 auto;
  font-family: PingFang SC;
}
</style>
