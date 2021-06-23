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
          @blur="blur"
        />
        <sp-field
          v-model="bankName"
          name="银行名称"
          label="银行名称"
          placeholder="银行名称"
          readonly="readonly"
          :rules="[{ required: true, message: '请输入正确的银行卡号匹配名称' }]"
        />
        <sp-field
          v-model="accountBank"
          name="开户行"
          label="开户行"
          placeholder="请输入开户行，系统自动搜索"
          :rules="[{ required: true, message: '请输入开户行，系统自动搜索' }]"
        />
        <div class="submit">
          <sp-button round block type="info" native-type="submit">
            提交
          </sp-button>
        </div>
      </sp-form>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
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
      accountBank: '建行',
      bankCode: '',
      bankPhone: '13333333333',
      bankIconUrl: '',
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem('info'))
    },
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post(walletApi.add_bank_card, {
        relationId: this.userInfo.id,
        ownershipName: this.accountName,
        bankCode: this.bankCode,
        bankName: this.bankName,
        cardNumber: this.cardNum,
        bankPhone: this.bankPhone,
        bankIconUrl: this.bankIconUrl,
        cardType: '借记卡',
        openingBankName: this.bankName,
        openingBankCode: this.bankCode,
        sysCode: 'crisps-app',
        operateId: this.userInfo.id,
        operateName: this.userInfo.fullName,
      })
      if (res.code === 200) {
        this.$router.push('/my/wallet/bankCards/list')
      }
    },
    async blur() {
      const res = await this.$axios.post(walletApi.card_no, {
        cardNumber: this.cardNum,
      })
      if (res.code === 200) {
        if (res.data.code && res.data.code === 500) {
          return false
        } else {
          this.bankCode = res.data.code
          this.bankName = res.data.name
          this.bankIconUrl = res.data.icon
        }
      }
    },
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
