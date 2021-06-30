<template>
  <div class="settings">
    <Header title="密码设置" />
    <div class="set-pwd">
      <div class="item" @click="$router.push('/my/settings/phoneVerify')">
        <h3>重置支付密码</h3>
        <sp-icon
          class-prefix="spiconfont"
          name="you"
          size="0.25rem"
          color="#ccc"
        ></sp-icon>
      </div>
    </div>
    <div class="small-tips">
      <p>
        <sp-icon
          class-prefix="spiconfont"
          size="0.24rem"
          color="#999"
          name="toast_ic_remind"
        />请不要设置与常用软件(如社交软件)、网站(如社交平台、论坛)等相同；或相似的密码，并做定期修改。
      </p>
    </div>
    <!-- <div class="submit"><button>提交</button></div> -->
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
    return {
      value: '',
      showKeyboard: true,
      valid: false,
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.settings {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: PingFangSC-Regular;
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

  .set-pwd {
    margin-top: 20px;
    .item {
      padding: 0 40px;
      height: 112px;
      line-height: 112px;
      color: #222222;
      font-size: 32px;
      display: flex;
      background: #fff;
      justify-content: space-between;
      &:first-child {
        border-bottom: 1px solid #f4f4f4;
      }
      h3 {
        font-weight: normal;
        font-size: 32px;
      }
      p {
        text-align: right;
        font-size: 32px;
        font-weight: bold;
      }
    }
  }
  .small-tips {
    background: #f4f4f4;
    padding: 0 40px;
    p:first-child {
      margin-top: 36px;
      margin-bottom: 4px;
    }
    p {
      font-family: PingFangSC-Regular;
      line-height: 40px;
      font-size: 24px;
      color: #999999;
      ::v-deep i {
        margin-right: 10px;
      }
      span {
        color: #ec5330 !important;
      }
    }
  }
}
</style>
