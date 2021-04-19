<template>
  <div class="comment">
    <h1>用户评价</h1>
    <sp-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <sp-swipe-item>1</sp-swipe-item>
      <sp-swipe-item>2</sp-swipe-item>
      <sp-swipe-item>3</sp-swipe-item>
      <sp-swipe-item>4</sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
export default {
  name: 'Comment',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      list: '',
    }
  },
}
</script>

<style lang="less" scoped>
.comment {
  padding-top: 48px;
}
</style>
