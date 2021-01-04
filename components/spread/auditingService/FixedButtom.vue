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
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    nextStep() {
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
  padding: 0 40px;
  position: fixed;
  bottom: 0;

  /deep/ .sp-button {
    width: 100%;
    height: 88px;
    border-radius: 8px;
  }
}
</style>
