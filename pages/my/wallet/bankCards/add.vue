<template>
  <div>
    <Header title="新增银行卡" />
    <div class="tips">
      <sp-icon
        class-prefix="spiconfont"
        size="0.30rem"
        color="#F86E21"
        name="laba"
      />
      <p>请准确选择开户行，若开户行选择错误，提现将会失败哦！</p>
    </div>
    <div class="form">
      <sp-form @submit="onSubmit">
        <sp-field
          v-model="accountName"
          name="账户名称"
          label="账户名称"
          placeholder="账户名称"
          readonly="readonly"
          :rules="[{ required: true, message: '' }]"
        ></sp-field>
        <!-- <sp-field
          v-model="cardNo"
          name="身份证号"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请输入身份证号' }]"
          ></sp-field
        > -->
        <sp-field
          v-model="cardNum"
          type="number"
          name="银行卡号"
          label="银行卡号"
          maxlength="19"
          placeholder="请输入银行卡号"
          :rules="[{ required: true, message: '请输入银行卡号' }]"
          @blur="blur"
        />
        <sp-field
          v-model="bankName"
          name="银行名称"
          label="银行名称"
          placeholder="请输入银行卡号，系统自动识别"
          readonly="readonly"
          :rules="[{ required: true }]"
        />
        <!-- <sp-field
          v-model="accountBank"
          type="textarea"
          name="开户行"
          label="开户行"
          placeholder="请输入开户行，系统自动搜索"
          readonly="readonly"
          :rules="[
            {
              required: true,
            },
          ]"
          @click="openPullPop"
        /> -->
        <div class="textarea">
          <div class="title">开户行<span>*</span></div>
          <div class="name" @click="openPullPop">
            {{ accountBank }}
            <span v-show="!accountBank">请输入开户行，系统自动搜索</span>
          </div>
        </div>
        <!-- <sp-field
          v-model="bankPhone"
          type="tel"
          name="银行预留手机号"
          label="银行预留手机号"
          placeholder="请输入银行预留手机号"
          maxlength="11"
          :rules="[{ required: true, message: '请输入银行预留手机号' }]"
        ></sp-field> -->
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
        :style="{ width: '100%', height: '70%' }"
      >
        <div class="form-search">
          <sp-icon
            class-prefix="spiconfont"
            name="houtui"
            size="0.30rem"
            color="#999"
            @click="showPullPop = false"
          ></sp-icon>
          <form action="/">
            <sp-search
              v-model="searchName"
              placeholder="请输入搜索关键词"
              @input="onSearch"
              @cancel="onCancel"
            />
          </form>
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
    <!--S loding-->
    <LoadingCenter v-show="loading" :title="loadingTitle" />
    <!--E loding-->
  </div>
</template>

<script>
import { Form, Field, Button, Popup, Search, Icon } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  components: {
    Header,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Search.name]: Search,
    [Icon.name]: Icon,
    LoadingCenter,
  },
  data() {
    return {
      accountName: '',
      cardNum: '',
      bankName: '',
      accountBank: '',
      bankCode: '',
      bankIconUrl: '',
      showPullPop: false,
      activeIndex: -1,
      searchName: '',
      list: [],
      userInfo: '',
      accountInfo: '',
      openingBankCode: '',
      loading: false,
      loadingTitle: '绑定中,请稍后...',
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('info'))
    this.accountInfo = JSON.parse(localStorage.getItem('accountInfo'))
    this.getAccountBankInfo()
    this.getAuthInfo()
  },
  methods: {
    async onSubmit() {
      this.loadingTitle = '绑定中,请稍后...'
      this.loading = true
      const res = await this.$axios.post(walletApi.add_bank_card, {
        relationId: this.userInfo.id,
        ownershipName: this.accountName,
        bankCode: this.bankCode,
        bankName: this.bankName,
        cardNumber: this.cardNum,
        bankIconUrl: this.bankIconUrl,
        cardType: '借记卡',
        openingBankName: this.accountBank,
        openingBankCode: this.openingBankCode,
        sysCode: 'spc-wap',
        operateId: this.userInfo.id,
        operateName: this.userInfo.fullName,
      })
      this.loading = false
      if (res.code === 200) {
        this.$xToast.show({ message: '绑定成功' })
        this.$router.push('/my/wallet/bankCards/list')
      } else {
        this.$xToast.warning(res.data.error)
      }
    },
    async getBankInfo() {
      this.loadingTitle = '识别中...'
      this.loading = true
      const res = await this.$axios.post(walletApi.card_no, {
        cardNumber: this.cardNum,
      })
      this.loading = false
      if (res.code === 200) {
        this.bankCode = res.data.code
        this.bankName = res.data.name
        this.bankIconUrl = res.data.icon
      } else {
        this.bankCode = ''
        this.bankName = ''
        this.bankIconUrl = ''
        this.$xToast.error('请输入有效的银行卡号')
      }
    },
    // ①获取认证信息
    // async getAuthInfo() {
    //   const res = await this.$axios.get(walletApi.authentication_info, {
    //     params: {
    //       userId: this.userInfo.id,
    //       isWriting: true,
    //     },
    //   })
    //   if (res.code === 200) {
    //     this.certificateInfo = res.data
    //   }
    // },
    // 账户名称
    async getAuthInfo() {
      const res = await this.$axios.get(walletApi.account_info, {
        params: {
          accId: this.accountInfo.id,
        },
      })
      if (res.code === 200) {
        this.accountName = res.data.createrName
      }
    },
    async getAccountBankInfo() {
      const res = await this.$axios.post(walletApi.card_info, {
        name: this.searchName || this.bankName,
        code: this.bankCode,
        isOnlyBank: '1',
        limit: '50',
      })
      if (res.code === 200) {
        this.list = res.data
      }
    },
    blur() {
      this.getBankInfo()
    },
    async openPullPop() {
      if (!this.bankCode) {
        this.$xToast.warning('请先输入银行卡号')
        return false
      }
      await this.getAccountBankInfo()
      this.showPullPop = true
    },
    throttle(func, wait) {
      let timeout
      return function () {
        if (!timeout) {
          timeout = setTimeout(() => {
            timeout = null
            func.call(this, arguments)
          }, wait)
        }
      }
    },
    onSearch() {
      this.throttle(this.getAccountBankInfo(), 1000)
      // this.getAccountBankInfo()
    },
    onCancel() {
      console.log(22222)
    },
    selectItem(item) {
      this.accountBank = item.name
      this.activeIndex = item.id
      this.openingBankCode = item.icbcToOtherCode
      this.showPullPop = false
    },
  },
}
</script>

<style lang="less" scoped>
.tips {
  display: flex;
  background: #fff3e9;
  padding: 17px 30px;
  align-items: flex-start;
  i {
    position: relative;
    top: 5px;
  }
  p {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #f86e21;
    line-height: 38px;
    margin-left: 12px;
  }
}
.textarea {
  display: flex;
  justify-content: space-between;
  padding: 38px 20px;
  min-height: 112px;
  border-bottom: 1px solid #f4f4f4;
  .title {
    color: #222;
    font-size: 32px;
    span {
      color: #ec5330;
      position: relative;
      top: 5px;
    }
  }
  .name {
    font-size: 32px;
    color: #222;
    font-weight: bold;
    max-width: 4.8rem;
    line-height: 44px;
    span {
      color: #999 !important;
      font-weight: normal !important;
    }
  }
}
::v-deep .sp-field__body {
  ::-webkit-input-placeholder {
    font-weight: normal !important;
    color: #999 !important;
    font-size: 32px !important;
  }
  textarea {
    font-size: 32px;
    font-weight: bold;
    color: #222;
  }
}
::v-deep .sp-field__control {
  color: #222;
}
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
      > form {
        width: 100%;
      }
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
    min-height: 112px;
    align-items: center;
    padding: 10px 20px;
  }
  ::v-deep.sp-field__body input {
    text-align: right;
    font-weight: bold;
    font-size: 32px;
  }
  ::v-deep.sp-field__error-message {
    text-align: right;
  }
  ::v-deep.sp-field__label {
    width: 4.8em;
    font-size: 32px;
    color: #222;
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
