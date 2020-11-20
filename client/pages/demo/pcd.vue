<!--
 * @Author: xiao pu
 * @Date: 2020-11-20 09:56:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-20 16:47:41
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/demo/pcd.vue
-->
<template>
  <div class="demo-page">
    <div class="modle-item">
      <ImgAuthDialog v-model="show" :submit-code="handleSubmit"></ImgAuthDialog>
    </div>
    <sp-button type="primary" @click="handleBtn">验证码调用方式</sp-button>
  </div>
</template>

<script>
import { Button, Toast } from '@chipspc/vant-dgg'
import ImgAuthDialog from '@/components/imgAuth/ImgAuthDialog'
import ImgAuthDialogFn from '@/components/imgAuth'
export default {
  name: 'Test',
  components: {
    [Button.name]: Button,
    ImgAuthDialog,
  },
  data() {
    return { show: false }
  },
  methods: {
    handleSubmit(code) {
      console.log('getCode:', code)
      return new Promise((resolve) => {
        setTimeout(resolve, 5000)
      })
    },
    handleBtn() {
      // 方法一： 通过组件调用
      this.show = !this.show
      // 方法二： 通过方法调用
      // ImgAuthDialogFn({ submitCode: this.handleSubmit })
    },
  },
}
</script>

<style lang="less" scoped>
.demo-page {
  width: 100%;
  .modle-item {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }
}
</style>
