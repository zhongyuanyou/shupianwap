<template>
  <div class="box">
    <Head :title="title">
      <template #left>
        <my-icon
          class="back-icon"
          name="nav_ic_back"
          size="0.4rem"
          color="#1A1A1A"
          @click.native="onLeftClick"
        ></my-icon>
      </template>
    </Head>
    <iframe :src="src" frameborder="0" class="ifr"></iframe>
  </div>
</template>

<script>
import Head from '@/components/common/head/header'
export default {
  name: 'Iframe',
  components: {
    Head,
  },
  data() {
    return {
      src: this.$route.query.src,
      title: this.$route.query.type === 'qs' ? '签署合同' : '个人认证',
    }
  },
  methods: {
    onLeftClick() {
      console.log(this.$route.query.type)
      if (this.$route.query.type === 'qs') {
        this.$router.replace({
          path: '/contract/contractList',
        })
      } else {
        this.$router.back()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100vh;
  > .ifr {
    width: 100%;
    height: calc(100vh - 100px);
  }
}
</style>
