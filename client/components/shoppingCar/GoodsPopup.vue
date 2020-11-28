<!--
 * @Author: xiao pu
 * @Date: 2020-11-28 17:00:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-28 17:35:45
 * @Description: file content
 * @FilePath: /chips-wap/client/components/shoppingCar/GoodsPopup.vue
-->
<template>
  <div class="goods-item">
    <sp-center-popup
      v-model="showPopup"
      button-type="confirm"
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
  name: 'GoodsItem',
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

<style lang="less" scoped></style>
