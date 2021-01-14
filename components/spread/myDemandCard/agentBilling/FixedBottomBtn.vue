<template>
  <footer class="footer">
    <sp-button type="primary" @click="nextStep"> 下一步(1/2) </sp-button>
  </footer>
</template>

<script>
import { Button, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'FixedBottomBtn',
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
  },
  methods: {
    nextStep() {
      const sessionStorageFormData = JSON.parse(
        sessionStorage.getItem('formData')
      )
      const data = this.$parent.questionData
      //   if (!data[1].value) {
      //     Toast('请选择主营业务')
      //     return
      //   }
      let content = {
        注册时间: data[0].value,
        主营业务: data[1].value,
        是否支持开票: data[2].value,
        公司年收入: data[3].value,
      }
      // 合并两个页面之间缓存的数据
      if (sessionStorageFormData) {
        content = Object.assign(sessionStorageFormData.content, content)
      }
      // 将数据存储
      const str = JSON.stringify({
        type: 'kjdl',
        url: window.location.href,
        content,
      })
      sessionStorage.setItem('formData', str)
      // 下一步
      this.$router.push({ path: '/spread/myDemandCard/second' })
    },
  },
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding: 24px 40px;

  /deep/ .sp-button {
    width: 100%;
    height: 88px;
    border-radius: 8px;
  }
}
</style>
