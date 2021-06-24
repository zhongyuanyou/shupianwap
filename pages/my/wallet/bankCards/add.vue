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
          readonly="readonly"
          :rules="[{ required: true, message: '' }]"
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
          v-if="bankName"
          v-model="bankName"
          name="银行名称"
          label="银行名称"
          placeholder="银行名称"
          readonly="readonly"
          :rules="[{ required: true, message: '' }]"
        />
        <sp-field
          v-model="accountBank"
          name="开户行"
          label="开户行"
          placeholder="请输入开户行，系统自动搜索"
          maxlength="19"
          readonly="readonly"
          :rules="[
            {
              required: true,
              message: '请输入开户行，系统自动搜索',
            },
          ]"
          @click="openPullPop"
        />
        <sp-field
          v-model="bankPhone"
          type="tel"
          name="银行预留手机号"
          label="银行预留手机号"
          placeholder="请输入银行预留手机号"
          maxlength="11"
          :rules="[{ required: true, message: '请输入银行预留手机号' }]"
        ></sp-field>
        <div class="submit">
          <sp-button round block type="info" native-type="submit">
            提交
          </sp-button>
        </div>
      </sp-form>
    </div>
    <div class="content">
      <sp-popup
        v-model="showPullPop"
        round
        position="bottom"
        cl
        :style="{ width: '100%', height: '60%' }"
      >
        <div class="form-search">
          <sp-icon
            class-prefix="spiconfont"
            name="houtui"
            size="0.30rem"
            color="#999"
            @click="showPullPop = false"
          ></sp-icon>
          <sp-search
            v-model="searchName"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
          />
        </div>
        <div class="bank-list">
          <ul v-if="list.length > 0" class="bank-ul">
            <li
              v-for="(item, index) in list"
              :key="index"
              class="bank-li"
              @click="selectItem(item)"
            >
              <p>{{ item.name }}</p>
              <sp-icon
                v-if="item.id === activeIndex"
                class-prefix="spiconfont"
                name="gou"
                size="0.30rem"
                color="#4974F5"
              ></sp-icon>
            </li>
          </ul>
          <div v-else class="no-data">未找到相关数据，换个关键词试试</div>
        </div>
      </sp-popup>
    </div>
  </div>
</template>

<script>
import { Form, Field, Button, Popup, Search, Icon } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Search.name]: Search,
    [Icon.name]: Icon,
  },
  data() {
    return {
      accountName: '',
      cardNum: '',
      bankName: '',
      accountBank: '',
      bankCode: '',
      bankPhone: '13880458128',
      bankIconUrl: '',
      showPullPop: false,
      activeIndex: -1,
      searchName: '',
      list: [],
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem('info'))
    },
  },
  created() {
    this.getAccountBankInfo()
    this.getAuthInfo()
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
      if (res.code === 200 && !res.data.code) {
        this.$router.push('/my/wallet/bankCards/list')
      } else {
        this.$xToast.show({ message: '绑定失败，换张卡试试' })
      }
    },
    async getBankInfo() {
      const res = await this.$axios.post(walletApi.card_no, {
        cardNumber: this.cardNum,
      })
      if (res.code === 200) {
        if (res.data.code && !res.data.code) {
          return false
        } else {
          this.bankCode = res.data.code
          this.bankName = res.data.name
          this.bankIconUrl = res.data.icon
        }
      }
    },
    // 账户名称
    async getAuthInfo() {
      const res = await this.$axios.get(walletApi.account_info, {
        params: {
          accId: '1031626164970629466',
        },
      })
      if (res.code === 200) {
        if (res.data.code && !res.data.code) {
          return false
        } else {
          this.accountName = res.data.cardName
        }
      }
    },
    async getAccountBankInfo() {
      const res = await this.$axios.post(walletApi.card_info, {
        name: this.searchName,
        code: '',
        isOnlyBank: '',
        parentCode: '',
        limit: '50',
      })
      if (res.code === 200) {
        if (res.data.code && !res.data.code) {
          return false
        } else {
          this.list = res.data
        }
      }
    },
    blur() {
      this.getBankInfo()
    },
    openPullPop() {
      this.showPullPop = true
    },
    onSearch() {
      this.getAccountBankInfo()
    },
    onCancel() {
      console.log(22222)
    },
    selectItem(item) {
      this.accountBank = item.name
      this.activeIndex = item.id
      this.showPullPop = false
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  ::v-deep .sp-search {
    padding: 20px;
    width: 100%;
    padding-right: 0;
  }
  ::v-deep.sp-popup__close-icon {
    top: 56px;
  }
  ::v-deep .title {
    font-family: PingFangSC-Medium;
    width: 100%;
    font-size: 40px;
    color: #1a1a1a;
    letter-spacing: 0;
    line-height: 136px;
    text-align: left;
    font-weight: bold;
    padding-left: 40px;
  }
  ::v-deep .sp-popup {
    > .form-search {
      display: flex;
      align-items: center;
      padding: 10px 30px;
      border-bottom: 1px solid #f4f4f4;
    }
    .bank-list {
      max-height: 80%;
      overflow-y: auto;
      padding: 0 40px;
      .no-data {
        width: 100%;
        text-align: center;
        padding-top: 200px;
        font-size: 28px;
      }
      .bank-ul {
        .bank-li {
          display: flex;
          align-items: center;
          height: 112px;
          justify-content: space-between;
          .spiconfont-gou {
            font-weight: bold;
          }
          .bank-logo {
            width: 48px;
            height: 48px;
            background: #000;
          }
          p {
            width: 552px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            height: 48px;
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #222222;
          }
          span {
            margin-left: auto;
          }
        }
      }
      .bank-add {
        display: flex;
        align-items: center;
        height: 112px;
        .spiconfont-you {
          margin-left: auto !important;
        }
        p {
          margin-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #222222;
        }
        .right {
          width: 30px;
          margin-left: auto;
        }
      }
    }
  }
}
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
    width: 7em;
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
