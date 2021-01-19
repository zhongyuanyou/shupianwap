<!--
 * @Author: xiao pu
 * @Date: 2020-11-28 17:00:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-19 20:03:43
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
    }
  }
}
</style>
