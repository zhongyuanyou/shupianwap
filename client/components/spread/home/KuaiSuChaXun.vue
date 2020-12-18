<template>
  <div class="chaxun">
    <div class="all-form">
      <div class="title">
        <img src="~/assets/spreadImages/home/busi_img_gscsbd01.png" />
        <p class="title-name">快速查询</p>
        <img src="~/assets/spreadImages/home/busi_img_gscsbd02.png" />
      </div>
      <div class="form">
        <div class="dropdown-menu">
          <div class="dropdown-menu-content" @click="showDropdownList">
            <span class="dropdown-menu-content-prefix">我需要</span>
            <span class="dropdown-menu-content-val">{{ value.name }}</span>
            <img
              class="dropdown-menu-content-img"
              src="~/assets/spreadImages/home/busi_img_gscsbd03.png"
            />
          </div>
          <sp-action-sheet
            v-model="dropdownMenuIsShow"
            :actions="dropList"
            @select="onSelect"
          />
        </div>
        <div class="input-all">
          <sp-cell-group>
            <sp-field
              v-model="telephone"
              label="手机号"
              type="tel"
              placeholder="请输入用户名"
            />
          </sp-cell-group>
        </div>
        <div class="input-all1">
          <sp-field
            v-model="sms"
            center
            clearable
            label="验证码"
            placeholder="请输入验证码"
          >
            <template #button>
              <sp-button size="small" type="primary" @click="sendSms">
                {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}</sp-button
              >
            </template>
          </sp-field>
        </div>
        <div class="submit">
          <sp-button type="primary">免费预约</sp-button>
        </div>
      </div>
      <div class="notes">
        <div v-for="item in formNotes" :key="item.id" class="note-item">
          <img
            class="note-item-img"
            src="~/assets/spreadImages/home/busi_img_gscsbd04.png"
          />
          <span class="note-item-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ActionSheet, Field, Button, CellGroup } from '@chipspc/vant-dgg'

export default {
  name: 'KuaiSuChaXun',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
  },
  data() {
    return {
      dropList: [
        { id: 1, name: '基本开户', color: '#5a79e8' },
        { id: 2, name: '公司注册', color: '#222222' },
        { id: 3, name: '公司变更', color: '#222222' },
        { id: 4, name: '刻制印章', color: '#222222' },
        { id: 5, name: '代理记账', color: '#222222' },
        { id: 6, name: '银行变更', color: '#222222' },
        { id: 7, name: '公司核名', color: '#222222' },
        { id: 8, name: '其他业务', color: '#222222' },
      ],
      value: '',
      dropdownMenuIsShow: false,
      telephone: '',
      sms: '', // 验证码
      formNotes: [
        {
          id: 1,
          img: require('~/assets/spreadImages/home/busi_img_gscsbd04.png'),
          name: '资金担保',
        },
        {
          id: 2,
          img: require('~/assets/spreadImages/home/busi_img_gscsbd04.png'),
          name: '信息安全',
        },
        {
          id: 3,
          img: require('~/assets/spreadImages/home/busi_img_gscsbd04.png'),
          name: '平台服务',
        },
      ],
      countdown: -1, // 发送验证码倒计时60秒
      countdownTimer: null,
    }
  },
  created() {
    this.value = this.dropList[0]
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.dropdownMenuIsShow = false
      this.value = item
      this.dropList.forEach((obj) => {
        if (obj.name === item.name) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    showDropdownList() {
      this.dropdownMenuIsShow = true
    },
    sendSms() {
      const vm = this
      if (this.countdown > -1) {
        return
      }
      this.countdown = 10
      this.countdownTimer = setInterval(function () {
        if (vm.countdown === 0) {
          vm.countdown = -1
          clearInterval(this.countdownTimer)
          vm.countdownTimer = null
        } else {
          vm.countdown > 0 && vm.countdown--
        }
      }, 1000)
    },
  },
}
</script>

<style lang="less" scoped>
.chaxun {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 30px 0;
  .all-form {
    width: 670px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    padding: 47px 40px 32px 40px;
    .title {
      margin-bottom: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 48px;
        height: 2px;
      }
      .title-name {
        height: 31px;
        font-size: 32px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 44px;
        margin: 0 15px;
      }
    }

    .form {
      .dropdown-menu {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        padding: 0 32px;
        .dropdown-menu-content {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
          .dropdown-menu-content-prefix {
            flex: none;
            font-size: 28px;
            font-weight: 400;
            color: #1a1a1a;
            margin-right: 33px;
          }
          .dropdown-menu-content-val {
            flex: none;
            font-size: 28px;
            font-weight: bold;
            color: #1a1a1a;
          }
          .dropdown-menu-content-img {
            flex: none;
            width: 20px;
            height: 11px;
            position: absolute;
            right: 0;
          }
        }
      }
      .input-all {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        margin: 24px 0;
      }
      .input-all1 {
        width: 100%;
        height: 80px;
        background: #f8f8f8;
        border-radius: 8px;
        /deep/ .sp-button {
          width: 140px;
          height: 80px;
          border-radius: 8px;
          background-color: transparent;
          border: none;
          color: #4974f5;
        }
        /deep/ .sp-button--small {
          padding: 0px;
        }
      }
      /deep/ input {
        font-weight: bold;
      }
      /deep/ input::-webkit-input-placeholder {
        color: #cccccc;
        font-weight: normal;
      }
      .submit {
        width: 100%;
        height: 80px;
        display: flex;
        margin: 40px 0 34px 0;
      }
      /deep/ .sp-cell {
        background: #f8f8f8;
        height: 80px;
        padding-right: 32px;
        .sp-field__label {
          width: auto;
          margin-right: 33px;
        }
        .sp-button__content {
          justify-content: flex-end;
        }
      }
      /deep/ .sp-hairline--top-bottom::after {
        display: none;
      }
      /deep/ .sp-button {
        width: 100%;
        height: 80px;
        border-radius: 8px;
      }
      /deep/ .sp-button::before {
      }
    }

    .notes {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .note-item {
        display: flex;
        align-items: center;
        .note-item-img {
          width: 24px;
          height: 24px;
          margin-right: 13px;
        }
        .note-item-name {
          font-size: 24px;
          font-weight: 400;
          color: #555555;
        }
      }
    }
  }
}
</style>
