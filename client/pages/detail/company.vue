<template>
  <div class="company">
    <!--S banner-->
    <Banner :images="info.images" />
    <!--S banner-->
    <!--S 第一版-->
    <!--E 第一版-->
  </div>
</template>

<script>
import Banner from '~/components/detail/Banner'
export default {
  name: 'Company',
  components: {
    Banner,
  },
  data() {
    return {
      info: {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
      },
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.company {
}
</style>
