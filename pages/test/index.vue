<template>
  <div>
    <div class="content">
      <h2>文本区域111</h2>
    </div>
    <div class="page-btn">
      <sp-field type="text" placeholder="请输入1" />
    </div>
    <div>下单协议</div>
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import { auth } from '@/api'
export default {
  components: {
    [Field.name]: Field,
  },
  mounted() {
    this.getProtocol('protocol100008')
  },
  methods: {
    async getProtocol(categoryCode) {
      if (!categoryCode) {
        this.$xToast.warn('请传入需要获取的协议!')
        return
      }
      const params = {
        categoryCode,
        includeField: 'content,title',
      }
      try {
        this.loading = true
        const data = await auth.protocol(params)
        console.log('data:', data)
        const { rows = [] } = data || {}
        this.article = rows[0] || {}
        this.loading = false
        return rows[0] || {}
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },
  },
}
</script>

<style lang="less">
.content {
  height: 120vh;
}
.page-btn {
  position: fixed;
  height: 100px;
  width: 100%;
  padding: 10px;
  left: 0;
  bottom: 0;
  background: yellow;
}
</style>
