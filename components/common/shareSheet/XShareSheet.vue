<template>
  <sp-share-sheet v-model="showShare" :options="options" />
</template>

<script>
import { ShareSheet } from '@chipspc/vant-dgg'
export default {
  name: 'XShareSheet',
  components: {
    [ShareSheet.name]: ShareSheet,
  },
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link', description: '描述信息' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
    }
  },
}
</script>

<style lang="less" scoped></style>
