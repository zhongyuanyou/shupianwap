<template>
  <div class="company-registry">
    <sp-top-nav-bar
      title="公司注册"
      left-arrow
      background="#F2F2F2"
      ellipsis
      @on-click-left="onClickLeft"
    >
      <template #right>
        <sp-icon name="specialreturn2" size="18" />
      </template>
    </sp-top-nav-bar>
    <div class="banner">
      <sp-swipe class="my-swipe" :autoplay="3000" indicator-color="#e6e6e6">
        <sp-swipe-item v-for="(image, index) in images" :key="index">
          <sp-image :src="image" fit="contain" />
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
import Card from '@/components/businessHome/card.vue'

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
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
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
  }
  /deep/.my-swipe .sp-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    // background-color: #39a9ed;
    img {
      width: 100%;
      height: 244px;
    }
  }
}
</style>
