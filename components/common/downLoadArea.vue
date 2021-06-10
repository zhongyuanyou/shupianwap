<template>
  <div class="download-area">
    <img :src="$ossImgSetV2('g6trabnxtg80000.png')" class="logo" />
    <div class="desc">
      <div class="desc-name">薯片APP</div>
      <div class="desc-desc">企业服务大平台</div>
    </div>
    <sp-button class="button" @click="openApp">立刻打开</sp-button>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>
<script>
import { Button } from '@chipspc/vant-dgg'
import openappV2 from '@/mixins/openappV2'

export default {
  name: 'DownLoadArea',
  components: { [Button.name]: Button },
  mixins: [openappV2],
  props: {
    iosLink: {
      type: String,
      default: 'cpsccustomer://',
    },
    androdLink: {
      type: String,
      default: 'cpsccustomer://', //  主页'cpsccustomer://{"path":"/main/android/main","parameter":{"selectedIndex":2}}'
    },
  },
  data() {
    return {
      myIosLink: this.iosLink,
      myAndrodLink: this.androdLink,
    }
  },
}
</script>
<style lang="less" scoped>
.download-area {
  position: relative;
  display: flex;
  align-items: center;
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
  .button {
    position: absolute;
    right: 28px;
    font: bold 26px @fontf-pfsc-med;
    background: #4974f5;
    width: 160px;
    height: 64px;
    border: none;
    border-radius: 8px;
    color: #ffffff;
  }
  ::v-deep .sp-center-popup {
    width: 540px;
  }
  ::v-deep .sp-center-popup__containerConfirm {
    width: 540px;
  }
  ::v-deep .sp-center-popup__title {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding: 0 !important;
    height: 130px;
    font: bold 36px/130px @fontf-pfsc-med;
    color: #1a1a1a;
    text-align: center;
    box-sizing: border-box;
  }
  ::v-deep .sp-center-popup__cancel {
    line-height: 96px;
    height: 96px;
    font-size: 32px;
    color: #222222;
  }
  ::v-deep .sp-center-popup__confirm {
    line-height: 96px;
    height: 96px;
    font-size: 32px;
    font-weight: bold;
    color: #4974f5;
  }
}
</style>
