<template>
  <div class="company-registry">
    <sp-top-nav-bar
      title="公司注册"
      background="#FFFFFF"
      title-color="#1A1A1A"
      ellipsis
      @on-click-left="onClickLeft"
    >
      <div slot="left" class="nav-back">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </sp-top-nav-bar>
    <div class="banner">
      <sp-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <sp-swipe-item v-for="(image, index) in images" :key="index">
          <nuxt-link :to="{ name: image.url }">
            <sp-image
              :src="require(`../../../assets/` + image.img)"
              fit="cover"
          /></nuxt-link>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div class="precontract">
      <Card />
    </div>
    <div class="introduction">
      <h5>服务介绍</h5>
      <Registerlist />
    </div>
    <div class="norm">
      <h5>办理标准</h5>
      <Standard />
    </div>
    <!-- S注册公司准备工作-平台优势 -->
    <!-- <div class="register-ready"></div> -->
    <RegisterReady />
    <!-- E注册公司准备工作-平台优势 -->
  </div>
</template>
<script>
import {
  TopNavBar,
  NavSearch,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
} from '@chipspc/vant-dgg'
import Card from '@/components/spread/registerRegister/Card.vue'
import Registerlist from '@/components/spread/registerRegister/Registerlist.vue'
import Standard from '@/components/spread/registerRegister/standard.vue'
import RegisterReady from '@/components/spread/registerRegister/RegisterReady'

export default {
  name: 'CompanyRegistry',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Image.name]: Image,
    RegisterReady,
    Card,
    Registerlist,
    Standard,
  },
  data() {
    return {
      images: [
        {
          code: 1,
          url: '',
          img: 'spreadImages/home/busi_img_gscsbanner01.jpg',
        },
      ],
    }
  },
  methods: {
    onClickLeft() {
      console.log('返回')
    },
  },
}
</script>
<style lang="less" scoped>
.company-registry {
  // -------
  padding-bottom: 600px;
  .banner {
    /deep/.my-swipe .sp-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 392px;
      text-align: center;
      img {
        width: 100%;
        height: 392px;
      }
    }
  }
  .introduction {
    padding: 63px 42px 0 42px;
    h5 {
      font-size: 40px;
      margin-bottom: 36px;
    }
  }
  .norm {
    padding: 63px 42px 64px 42px;
    h5 {
      font-size: 40px;
      margin-bottom: 36px;
    }
  }
}
</style>
