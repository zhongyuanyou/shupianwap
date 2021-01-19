<template>
  <div class="swipe">
    <sp-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
      <sp-swipe-item v-for="(item, i) of banners" :key="i">
        <nuxt-link :to="item.url">
          <img :src="item.img" alt="" />
        </nuxt-link>
      </sp-swipe-item>
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
    banners: {
      type: Array,
      required: true,
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
.swipe {
  width: 100%;
  height: 392px;
}
.my-swipe,
.sp-swipe-item {
  z-index: 1;
  width: 100%;
  height: 100%;
  a {
    width: 100%;
    height: 100%;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
