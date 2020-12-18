<template>
  <div class="banner">
    <sp-swipe class="banner-swipe" :loop="true" autoplay="5000">
      <sp-swipe-item v-for="(item, index) in images" :key="index">
        <sp-image fit="cover" :src="item" />
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'

export default {
  name: 'Banner',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
  },
  props: {
    images: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      current: 0, // banner下标
    }
  },
}
</script>

<style scoped>
.banner {
  width: 100%;
  height: 240px;
  margin-bottom: 20px;
}
.banner-swipe {
  height: 240px;
}
</style>
