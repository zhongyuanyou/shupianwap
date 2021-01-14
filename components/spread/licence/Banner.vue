<template>
  <div class="banner">
    <sp-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <sp-swipe-item v-for="(item, index) in imgList" :key="index"
        ><router-link :to="item.url"><img :src="item.img" alt="" /></router-link
      ></sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  props: {
    imgList: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  .my-swipe .sp-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 392px;
    text-align: center;
    > a {
      > img {
        width: 100%;
      }
    }
  }
  /deep/.sp-swipe__indicators {
    bottom: 96px;
  }
}
</style>
