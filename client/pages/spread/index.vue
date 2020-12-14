<template>
  <div class="page-content">
    <Header title="工商财税" />
    <!--    START 轮播图-->
    <Banner :images="images" />
    <!--    END 轮播图-->
  </div>
</template>

<script>
import Header from '@/components/common/head/header'
import Banner from '@/components/spread/home/Banner'

export default {
  name: 'Index',
  components: {
    Banner,
    Header,
  },
  data() {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/cat.jpeg',
      ],
    }
  },
}
</script>

<style scoped></style>
