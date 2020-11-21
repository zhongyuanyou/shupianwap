<!--
 * @Author: xiao pu
 * @Date: 2020-11-20 09:56:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-21 15:34:49
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/demo/pcd.vue
-->
<template>
  <div class="demo-page">
    <div class="modle-item">
      <ImgAuthDialog v-model="show" :submit-code="handleSubmit"></ImgAuthDialog>
      <!-- 支持vant 中 popup里的属性与方法 -->
      <RecommendDialog
        v-model="showRecommendDialog"
        @closed="handleDialogClosed"
      >
      </RecommendDialog>
      <InstallAppDialog
        v-model="showInstallAppDialog"
        :close-on-click-overlay="false"
        @closed="handleDialogClosed"
      >
      </InstallAppDialog>
    </div>
    <sp-button class="btn" type="primary" @click="handleImgAuthBtn"
      >验证码调用方式</sp-button
    >
    <sp-button class="btn" type="primary" @click="handleRecommendBtn"
      >广告推荐框调用</sp-button
    >
    <sp-button class="btn" type="primary" @click="handleAppInstallBtn"
      >app下载推荐框调用</sp-button
    >
    <div class="m-t-10">
      <ServiceSelect> </ServiceSelect>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from '@chipspc/vant-dgg'
import ImgAuthDialog from '@/components/imgAuth/ImgAuthDialog'
import ImgAuthDialogFn from '@/components/imgAuth'
import RecommendDialog from '@/components/RecommendDialog'
import InstallAppDialog from '@/components/app/InstallAppDialog'
import ServiceSelect from '@/components/serviceSelected/ServiceSelect'
export default {
  name: 'Test',
  components: {
    [Button.name]: Button,
    ImgAuthDialog,
    RecommendDialog,
    InstallAppDialog,
    ServiceSelect,
  },
  data() {
    return {
      show: false,
      showRecommendDialog: false,
      showInstallAppDialog: false,
    }
  },
  methods: {
    handleSubmit(code) {
      console.log('getCode:', code)
      return new Promise((resolve) => {
        setTimeout(resolve, 5000)
      })
    },
    handleDialogClosed() {
      console.log('触发关闭！')
    },
    handleImgAuthBtn() {
      // 方法一： 通过组件调用
      this.show = !this.show
      // 方法二： 通过方法调用
      // ImgAuthDialogFn({ submitCode: this.handleSubmit })
    },
    handleRecommendBtn() {
      this.showRecommendDialog = !this.showRecommendDialog
    },
    handleAppInstallBtn() {
      this.showInstallAppDialog = !this.showInstallAppDialog
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
  .btn {
    margin: 20px;
  }
  .m-t-10 {
    margin-top: 10px;
  }
}
</style>
