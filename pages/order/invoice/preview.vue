<template>
  <div class="invoice_preview">
    <sp-sticky>
      <Header class="my-header" title="查看电子发票"></Header>
      <sp-divider :style="{ margin: '0' }" />
    </sp-sticky>
    <div class="preview_image">
      <sp-image width="100%" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>

    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import { Sticky, Image, Divider } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'

export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    LoadingCenter,
    Header,

    [Sticky.name]: Sticky,
    [Image.name]: Image,
    [Divider.name]: Divider,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      type: 2,
      formData: { username: '' },
      checked: true,
    }
  },
  methods: {
    del() {},
    submit() {},
    // back() {
    //   if (this.isInApp) {
    //     this.$appFn.dggWebGoBack((res) => {})
    //     return
    //   }
    //   this.$router.back()
    // },
  },
}
</script>

<style lang="less" scoped>
.invoice_preview {
  background: #ffffff;
  min-height: 100vh;
  position: relative;

  .preview_image {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
