<template>
  <div class="img-page">
    <img :src="url" alt="" />
  </div>
</template>

<script>
export default {
  name: 'ImgPage',
  asyncData({ params }) {
    console.log(params)
    return {
      url: params.url,
    }
  },
  data() {
    return {
      url: '',
    }
  },
}
</script>

<style lang="less" scoped>
.img-page {
  img {
    width: 100%;
  }
}
</style>
