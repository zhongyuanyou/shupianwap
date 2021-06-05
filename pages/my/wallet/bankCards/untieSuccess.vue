<template>
  <div class="untie">
    <Header title="解绑成功" />
    <div class="untie-box">
      <sp-icon
        class-prefix="spiconfont"
        size="1.19rem"
        color="#00B365"
        name="popup_img_success"
      />
      <p>解绑成功</p>
      <button @click="$router.push('/my/wallet/bankCards/list')">返回</button>
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    SpIcon: Icon,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.untie {
  padding: 0 40px;
  padding-top: 74px;
  min-height: 100vh;
  background: #f5f5f5;
  .untie-box {
    text-align: center;
    p {
      font-family: PingFangSC-Medium;
      font-size: 36px;
      color: #1a1a1a;
      margin-top: 42px;
    }
    button {
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      width: 100%;
      display: block;
      height: 95px;
      background: #4974f5;
      border-radius: 8px;
      margin-top: 92px;
    }
  }
}
</style>
