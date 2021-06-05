<template>
  <div class="phone-verify">
    <Header title="验证原手机号" />
    <div>
      <sp-cell-group>
        <sp-field
          v-model="phone"
          clearable
          label="原手机号"
          maxlength="11"
          placeholder="请输入原手机号"
        />
        <sp-field
          v-model="sms"
          center
          clearable
          label="验证码"
          maxlength="6"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <sp-button size="small" type="primary">获取验证码</sp-button>
          </template>
        </sp-field>
      </sp-cell-group>
    </div>
    <div class="submit"><button>验证</button></div>
  </div>
</template>

<script>
import { Icon, Field } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  data() {
    return { smsCode: '', phone: '' }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.phone-verify {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: PingFangSC-Regular;
  ::v-deep .sp-cell {
    margin-top: 20px;
    height: 112px;
    display: flex;
    align-items: center;
  }
  ::v-deep .sp-field__button {
    color: #222;
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
