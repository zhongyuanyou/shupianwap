<template>
  <div class="m-known-share appdown">
    <img :src="$ossImgSetV2('g6trabnxtg80000.png')" class="logo" />
    <div class="desc">
      <div class="desc-name">薯片APP</div>
      <div class="desc-desc">企业服务大平台</div>
    </div>
    <sp-button>立刻打开</sp-button>
  </div>
</template>
<script>
import { Button } from '@chipspc/vant-dgg'

export default {
  name: 'KnownAppLink',
  components: { [Button.name]: Button },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.m-known-share.appdown {
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 120px;
  padding: 0 28px;
  background: #fff;
  .logo {
    height: 80px;
    width: 80px;
  }
  .desc {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    &-name {
      font: bold 32px @fontf-pfsc-med;
      color: #222;
    }
    &-desc {
      font: 24px @fontf-pfsc-reg;
      color: #999;
    }
  }
  ::v-deep.sp-button {
    position: absolute;
    right: 28px;
    font: 26px @fontf-pfsc-med;
    background: #4974f5;
    width: 160px;
    height: 64px;
    border: none;
    border-radius: 8px;
    color: #ffffff;
  }
}
</style>
