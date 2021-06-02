<template>
  <div class="account-security">
    <Header title="账号与安全" />
    <div class="select-row">
      <div class="title">手机号</div>
      <div class="select-val" @click="openSelectBankPop">
        <span class="c22">185******88</span>
        <sp-icon
          class-prefix="spiconfont"
          size="0.25rem"
          color="#ccc"
          name="you"
        />
      </div>
    </div>
    <div class="select-row">
      <div class="title">登录密码</div>
      <div class="select-val" @click="openSelectBankPop">
        <span>修改密码</span>
        <sp-icon
          class-prefix="spiconfont"
          size="0.25rem"
          color="#ccc"
          name="you"
        />
      </div>
    </div>
    <div class="select-row">
      <div class="title">绑定账号</div>
      <div class="select-val" @click="openSelectBankPop">
        <sp-icon
          class-prefix="spiconfont"
          size="0.25rem"
          color="#ccc"
          name="you"
        />
      </div>
    </div>
    <div class="submit"><button>提交</button></div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Icon.name]: Icon,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.account-security {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: PingFangSC-Regular;
  .select-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 112px;
    background: #fff;
    padding: 0 40px;
    margin-top: 20px;
    .title {
      font-size: 32px;
      color: #222222;
      font-family: PingFangSC-Regular;
      line-height: 44px;
    }
    .select-val {
      display: flex;
      align-items: center;
      span {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #999999;
        margin-right: 16px;
        &.c22 {
          color: #222 !important;
        }
      }
    }
  }
  .submit {
    padding: 0 40px;
    position: fixed;
    bottom: 32px;
    left: 0;
    width: 100%;

    > button {
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      width: 100%;
      display: block;
      height: 95px;
      background: #4974f5;
      border-radius: 8px;
      font-weight: bold;
    }
  }
}
</style>
