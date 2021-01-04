<template>
  <div>
    <Header
      :title="
        error.statusCode === 404 && error.path !== '/500' ? '404' : '错误请求'
      "
    />
    <div
      v-if="error.statusCode === 404 && error.path !== '/500'"
      class="content"
    >
      <img :src="$ossImgSet(340, 340, '6s9j7abkuc00000.png')" alt="" />
      <p>页面已失效</p>
    </div>
    <div v-else class="content">
      <img :src="$ossImgSet(340, 340, '8kozn06p6vk0000.png')" alt="" />
      <p>请求错误</p>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/head/header'
export default {
  layout: 'default',
  name: 'ErrorPage',
  components: {
    Header,
  },
  props: {
    error: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  mounted() {
    console.log(this.error)
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 170px;
  > img {
    width: 340px;
    height: 340px;
  }
  > p {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #1a1a1a;
    margin-top: 24px;
  }
}
</style>
