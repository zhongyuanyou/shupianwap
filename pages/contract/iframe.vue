<template>
  <div class="box">
    <Head> </Head>
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
      src: '',
    }
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  > .ifr {
    width: 100%;
  }
}
</style>
