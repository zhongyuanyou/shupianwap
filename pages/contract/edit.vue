<template>
  <div class="edit">
    <Head ref="head" :title="title"></Head>
    <div class="tips">
      同一订单中合同的甲方名称必须与发票抬头保持一致，以下信息将作为合同甲方信息填充到正式合同中
    </div>
    <div class="form">
      <Form>
        <Field
          v-model="partyName"
          :required="true"
          clearable
          name="partyName"
          label="甲方名称"
          placeholder="请输入合同甲方信息"
          :rules="[{ required: true, message: '请输入合同甲方信息' }]"
        />
        <Field
          v-model="userName"
          :required="true"
          clearable
          name="userName"
          label="联系人"
          placeholder="请输入合同联系人姓名"
          :rules="[{ required: true, message: '请输入合同联系人姓名' }]"
          class="wd70"
        />
        <Field
          v-model="phone"
          :required="true"
          clearable
          name="phone"
          label="联系电话"
          placeholder="请输入合同联系人姓名"
          :rules="[{ pattern, message: '请输入正确的联系人电话' }]"
        />
        <Field
          v-if="formshow"
          v-model="email"
          clearable
          name="email"
          label="电子邮箱"
          placeholder="请输入合同联系人邮箱"
          :rules="[{ validator, message: '请输入合同联系人正确的邮箱' }]"
        />
        <Field
          v-if="formshow"
          v-model="address"
          clearable
          name="address"
          label="联系地址"
          placeholder="请输入联系人地址"
        />
      </Form>
      <div class="showbtn">
        <div class="box" @click="formshow = !formshow">
          {{ formshow ? '收起非必填信息' : '更多非必填信息' }}
          <Icon :name="formshow ? 'arrow-up' : 'arrow-down'" />
        </div>
      </div>
    </div>
    <div class="btn">
      <div class="box" @click="sumfn()">立即申请</div>
    </div>
  </div>
</template>
<script>
import {
  Form,
  Field,
  Icon,
  // CheckboxGroup,
} from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import orderApi from '@/api/order'
import contractApi from '@/api/contract'
export default {
  name: 'Edit',
  components: {
    Head,
    Form,
    Field,
    Icon,
  },
  data() {
    return {
      title: '完善合同',
      userName: '',
      partyName: '',
      phone: '',
      pattern: /^1[3456789]\d{9}$/,
      email: '',
      address: '',
      formshow: false,
      orderItem: this.$route.query,
      orderData: '',
    }
  },
  mounted() {
    this.getorder()
  },
  methods: {
    validator(val) {
      if (val) {
        return /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
          val
        )
      } else {
        return true
      }
    },
    getorder() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.orderItem.orderId, cusOrderId: this.orderItem.cusOrderId }
        )
        .then((res) => {
          this.orderData = res.data
          if (this.orderData.contractVo2s.length > 0) {
            this.partyName = this.orderData.contractVo2s[0].contractFirstName
            this.userName = this.orderData.contractVo2s[0].contractFirstContacts
            this.phone = this.orderData.contractVo2s[0].contractFirstPhone
          }
        })
        .catch((err) => {
          this.$xToast.show(err.message)
          console.log('错误信息err', err)
        })
    },
    applycontart() {
      contractApi
        .applycontart(
          { axios: this.axios },
          {
            orderId: this.orderItem.orderId,
            contractFirstName: this.partyName,
            contractFirstContacts: this.userName,
            contractFirstPhone: this.phone,
            contractFirstEmail: this.email,
            contractFirstAddr: this.address,
          }
        )
        .then((res) => {
          this.$router.push({
            path: '/contract/preview',
            query: {
              contractUrl: res.contractUrl,
              contractId: res.contractId,
              contractNo: res.contractNo,
              signerName: this.userName,
              contactWay: this.phone,
            },
          })
        })
        .catch((err) => {
          this.$xToast.show(err.message)
          console.log('错误信息err', err)
        })
    },
    sumfn() {
      const _this = this
      if (this.partyName && this.userName && this.phone) {
        _this.applycontart()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.edit {
  background: #f8f8f8;
  height: 100vh;
  > .tips {
    box-sizing: border-box;
    padding: 15px 40px;
    height: 114px;
    background: rgba(254, 140, 41, 0.1);
    font-size: 26px;
    font-weight: 400;
    color: #fe8c29;
    line-height: 40px;
  }
  > .form {
    background: #fff;
    padding: 0 40px;
    /deep/.sp-cell--required::before {
      left: 145px;
    }
    /deep/.wd70::before {
      left: 115px;
    }
    /deep/.sp-cell__title {
      font-size: 28px;
      font-weight: 400;
      color: #1a1a1a;
    }
    /deep/.sp-field__body {
      input {
        font-size: 28px;
        font-weight: 400;
      }
    }
    > .showbtn {
      border-top: 1px solid #f4f4f4;
      padding: 36px 0;
      > .box {
        width: 231px;
        height: 48px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        border-radius: 24px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        margin: 0 auto;
        text-align: center;
        line-height: 48px;
      }
    }
  }
  > .btn {
    width: 100%;
    height: 160px;
    background: #ffffff;
    padding: 32px 0;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    > .box {
      width: 670px;
      height: 96px;
      background: #4974f5;
      border-radius: 8px;
      margin: 0 auto;
      line-height: 96px;
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
