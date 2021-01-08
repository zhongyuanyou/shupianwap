<template>
  <div class="system">
    <!-- S 头部分 -->
    <Header :title="TopTitle" />
    <!-- E 头部分 -->
    <!-- S banner轮播 -->
    <BannerSwipe :banner-images="bannerImages" />
    <!-- E banner轮播 -->
    <!-- S 表单 -->
    <Card :card-title="cardTitle" />
    <!-- E 表单 -->
    <!-- S 列表 -->
    <SystemList />
    <!-- E 列表 -->
    <!-- S 侧边导航 -->
    <SidebarNavbar />
    <!-- E 侧边导航 -->
  </div>
</template>
<script>
import Header from '@/components/common/head/header'
import BannerSwipe from '@/components/spread/system/BannerSwiper'
import Card from '@/components/spread/system/Card'
import SystemList from '@/components/spread/system/ListSystem'
import SidebarNavbar from '@/components/spread/system/SidebarNavbar'
export default {
  components: {
    Header,
    BannerSwipe,
    Card,
    SystemList,
    SidebarNavbar,
  },
  data() {
    return {
      TopTitle: '体系认证',
      bannerImages: [
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/92ccqbb36mg0000.jpg',
        },
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/fzcndei5exs0000.jpg',
        },
      ],
      cardTitle: '体系认证 费用测算',
    }
  },
}
</script>

<style lang="less" scoped>
.system {
}
</style>
