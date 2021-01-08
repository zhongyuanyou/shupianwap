<template>
  <div>
    <footer class="footer">
      <sp-button
        v-md-map
        v-md:p_formSubmit
        data-event_name="p_formSubmit"
        data-form_type="咨询表单"
        data-form_name="工商聚合页_表单"
        type="primary"
        @click="nextStep"
      >
        下一步(1/2)
      </sp-button>
    </footer>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
export default {
  name: 'FixedBottomBtn',
  components: {
    [Button.name]: Button,
  },
  props: {
    content: {
      type: Object,
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {
      data: {
        type: 'swch',
        content: {},
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    nextStep() {
      // 获取用户输入的值
      this.data.content = {
        办理业务: this.content.business,
        公司年营收: this.content.revenue,
        公司行业: this.content.industry,
      }
      // 本地存储数据
      localStorage.setItem('data', JSON.stringify(this.data))
      this.$router.push('/spread/second')
    },
  },
}
</script>
<style lang="less" scoped>
.footer {
  height: 136px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  // 固定定位
  width: @spread-page-width;
  padding-right: 80px;
  position: fixed;
  bottom: 0;

  /deep/ .sp-button {
    width: 100%;
    height: 88px;
    border-radius: 8px;
  }
}
</style>
