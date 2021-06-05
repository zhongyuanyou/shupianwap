<template>
  <div>
    <Header title="新增银行卡" />
    <div class="form">
      <sp-form @submit="onSubmit">
        <sp-field
          v-model="accountName"
          name="账户名称"
          label="账户名称"
          placeholder="账户名称"
          :rules="[{ required: true, message: '请输入账户名称' }]"
          >用户名*</sp-field
        >
        <sp-field
          v-model="cardNum"
          type="number"
          name="银行卡号"
          label="银行卡号"
          maxlength="20"
          placeholder="请输入银行卡号"
          :rules="[{ required: true, message: '请输入银行卡号' }]"
        />
        <sp-field
          v-model="bankName"
          name="银行名称"
          label="银行名称"
          placeholder="银行名称"
          :rules="[{ required: true, message: '请输入银行名称' }]"
        />
        <sp-field
          v-model="accountBank"
          name="开户行"
          label="开户行"
          placeholder="请输入开户行，系统自动搜索"
          :rules="[{ required: true, message: '请输入开户行，系统自动搜索' }]"
        />
        <div class="submit">
          <sp-button
            round
            block
            type="info"
            native-type="submit"
            @click="$router.push('/my/wallet/bankCards/list')"
          >
            提交
          </sp-button>
        </div>
      </sp-form>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      accountName: '',
      cardNum: '',
      bankName: '',
      accountBank: '',
    }
  },
}
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
  ::v-deep .sp-cell {
    height: 112px;
    align-items: center;
  }
  ::v-deep.sp-field__body input {
    text-align: right;
  }
  ::v-deep.sp-field__error-message {
    text-align: right;
  }
  ::v-deep.sp-field__label {
    span {
      position: relative;
      &:after {
        position: absolute;
        content: '*';
        color: #ec5330;
        top: 1px;
      }
    }
  }
}
.submit {
  height: 160px;
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  background: #fff;
  padding: 0 32px;
  left: 0;
  ::v-deep button {
    display: block;
    height: 96px;
    width: 100%;
    background: #4974f5;
    color: #fff;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    border-radius: 8px;
  }
}
</style>
