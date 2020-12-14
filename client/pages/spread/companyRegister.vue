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
            <sp-image :src="require(`../../assets/` + image.img)" fit="cover"
          /></nuxt-link>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div class="precontract">
      <Card />
    </div>
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
    Card,
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
  .precontract {
  }
}
</style>
