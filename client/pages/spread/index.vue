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
    <GuiHuaShi />
    <!-- END 企服规划师-->
    <!-- START 平台优势-->
    <PingTaiYouShi />
    <!-- END 平台优势-->
    <!-- START 薯片找人-->
    <ShuPianZhaoRen />
    <!-- END 薯片找人-->
    <!-- START 固定底部-->
    <FixedBottom />
    <!-- END 固定底部-->
  </div>
</template>

<script>
import Header from '@/components/common/head/header'
import Banner from '@/components/spread/home/Banner'
import Nav from '@/components/spread/home/Nav'
import HotSale from '@/components/spread/home/HotSale1'
import ChuChuang from '@/components/spread/home/ChuChuang'
import JingYing from '@/components/spread/home/JingYing'
import ShiYong from '@/components/spread/home/ShiYong'
import GuiHuaShi from '@/components/spread/home/GuiHuaShi'
import PingTaiYouShi from '@/components/spread/home/PingTaiYouShi'
import ShuPianZhaoRen from '@/components/spread/home/ShuPianZhaoRen'
import FixedBottom from '@/components/spread/home/FixedBottom1'
import KuaiSuChaXun from '@/components/spread/home/KuaiSuChaXun'
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
    GuiHuaShi,
    PingTaiYouShi,
    ShuPianZhaoRen,
    FixedBottom,
    KuaiSuChaXun,
  },
  data() {
    return {
      images: [
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: 750px;
  margin: 0 auto;
  font-family: @PingFangSC;
  padding-bottom: 60px;
}
</style>
