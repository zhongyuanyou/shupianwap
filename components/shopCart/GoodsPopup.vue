<!--
 * @Author: xiao pu
 * @Date: 2020-11-28 17:00:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-22 17:30:56
 * @Description: file content
 * @FilePath: /chips-wap/components/shoppingCar/GoodsPopup.vue
-->
<template>
  <div class="goods-popup">
    <sp-center-popup
      v-model="showPopup"
      button-type="confirm"
      class="goods-popup__container"
      :field="popupConfig"
      @confirm="handlePopupComfirm"
      @cancel="handlePopupCancel"
    />
  </div>
</template>

<script>
import { CenterPopup } from '@chipspc/vant-dgg'

let promiseStatusOperation = { reslove: () => {}, reject: () => {} }

const popupConfigList = {
  attention: { type: 'functional', title: '确定移入关注？' },
  detele: {
    type: 'functional',
    title: '确定删除该内容？',
    confirmButtonText: '删除',
    confirmButtonColor: '#F2524E',
  },
}

export default {
  name: 'GoodsPopup',
  components: {
    [CenterPopup.name]: CenterPopup,
  },
  props: {},
  data() {
    return {
      showPopup: false,
      popupConfig: {},
    }
  },
  methods: {
    handlePopupComfirm() {
      console.log('handlePopupComfirm')
      if (typeof promiseStatusOperation.resolve !== 'function') return
      promiseStatusOperation.resolve()
    },
    handlePopupCancel() {
      console.log('handlePopupComfirm')
      if (typeof promiseStatusOperation.reject !== 'function') return
      promiseStatusOperation.reject()
    },

    /* *
     * @descript 外部可直接调用此方法，打开弹出框
     * @param {string} type 弹框的类型(attention:关注，detele:删除)
     * @returns {promise}
     */
    open(type) {
      promiseStatusOperation = {}
      this.popupConfig = popupConfigList[type] || {}
      this.showPopup = true
      return new Promise((resolve, reject) => {
        promiseStatusOperation = { resolve, reject }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.goods-popup {
  &__container {
    /deep/.sp-center-popup__containerConfirm {
      width: 540px;
      .sp-center-popup__title {
        margin: 64px 10px 50px !important;
        font-size: 28px;
        line-height: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
      .sp-center-popup__cancel {
        color: #999999;
      }
    }
  }
}
</style>
