<template>
  <sp-action-sheet v-model="show" title=" ">
    <div class="priceRed">
      <h1 class="priceRed-title">降价提醒</h1>
      <p class="priceRed-desc">
        产品价格变动时，将第一时间提醒您，不再错过降价
      </p>
      <div class="priceRed-content">
        <component
          :is="token ? 'Tel' : 'PriceFrom'"
          ref="priceFrom"
          :user-info="userInfoData"
        ></component>
      </div>
      <div class="priceRed-remind">
        <h4>
          <sp-checkbox v-model="checked" />
          允许我们将致电为您详细分析
        </h4>
        <p>规划师通过虚拟号码联系您，隐私安全不打扰</p>
      </div>
      <div class="remind-btn">
        <sp-button
          type="primary"
          :disabled="isBtnDisabled"
          block
          @click="handleSub"
          >确定</sp-button
        >
      </div>
    </div>
  </sp-action-sheet>
</template>

<script>
import { ActionSheet, Button, Checkbox } from '@chipspc/vant-dgg'
import Tel from '~/components/detail/priceReduction/Tel'
import PriceFrom from '~/components/detail/priceReduction/PriceFrom'
import { transactionConsApi } from '@/api/transactionConsultation'
import { userinfoApi } from '~/api'
export default {
  name: 'PriceReduction',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    Tel,
    PriceFrom,
  },
  data() {
    return {
      show: false,
      checked: true,
      componentName: 'PriceFrom',
      userInfoData: {
        decodePhone: null,
        fullName: null,
      },
      isBtnDisabled: false,
    }
  },
  computed: {
    token() {
      return this.$store.state.user.token
    },
    userInfo() {
      return this.$store.state.user.userInfo
    },
  },
  mounted() {
    this.getUserIndo()
  },
  methods: {
    // 复选框
    checkedReg() {
      if (!this.checked) {
        this.$xToast.show({
          message: '勾选确认框后,才能进行更多操作',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
        return false
      }
      return true
    },
    handleSub() {
      // 未登录
      if (!this.token && this.$refs.priceFrom.regFun() && this.checkedReg()) {
        this.$axios
          .post(transactionConsApi.add_consult, {
            web: 'flczmh', // 归属（原网站类型
            type: 'flzx', // 业务代码
            tel: this.$refs.priceFrom.phone, // 未加密的电话号码
            name: '未登录测试用户', // 客户名
            smsCode: this.$refs.priceFrom.value2, // 短信验证码
            content: '研发测试留言', // 以前的留言内容
            device: 'wap', // 设备来源
            place: 'all', // 地区代码，城市声母，如cd,bj
            url: location.href, // 留言所在页面的URL
          })
          .then((res) => {
            if (res.code === 200) {
              this.$refs.priceFrom.phone = null
              this.$refs.priceFrom.value2 = null
              this.$refs.priceFrom.clearTiemer()
              this.$xToast.show({
                message: '信息提交成功',
                duration: 1000,
                icon: 'toast_ic_comp',
                forbidClick: true,
              })
            } else {
              this.$xToast.show({
                message: '信息提交失败,请稍后重试',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          })
      } else if (this.checkedReg() && this.token) {
        //  登录用户
        this.$axios
          .post(transactionConsApi.consult, {
            web: 'flczmh', // 归属（原网站类型
            type: 'flzx', // 业务代码
            tel: this.userInfoData.decodePhone, // 未加密的电话号码
            name: this.userInfoData.fullName, // 客户名
            content: '研发测试留言', // 以前的留言内容
            // device: 'wap', // 设备来源
            place: 'all', // 地区代码，城市声母，如cd,bj
            url: location.href, // 留言所在页面的URL
          })
          .then((res) => {
            if (res.code === 200) {
              this.isBtnDisabled = true
              this.$xToast.show({
                message: '信息提交成功',
                duration: 1000,
                icon: 'toast_ic_comp',
                forbidClick: true,
              })
            } else {
              this.$xToast.show({
                message: '信息提交失败,请稍后重试',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          })
      }
    },
    // 获取手机号
    getUserIndo() {
      if (this.token) {
        this.$axios
          .get(userinfoApi.info, {
            params: {
              id: this.userInfo.userId,
            },
          })
          .then((res) => {
            if (res.code === 200) {
              this.userInfoData = res.data
            } else {
              this.$xToast.show({
                message: '网络错误,请刷稍后再试',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          })
      }
    },
  },
}
</script>

<style scoped lang="less">
/deep/.sp-popup--bottom.sp-popup--round {
  border-radius: 24px 24px 0px 0px;
}
.priceRed {
  padding: 64px 40px 40px 40px;
  &-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-desc {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    height: 34px;
    line-height: 34px;
    margin-top: 12px;
  }
  &-remind {
    width: 100%;
    padding: 31px 24px 29px 24px;
    background: #f8f8f8;
    border-radius: 8px;
    margin-bottom: 71px;
    margin-top: 32px;
    h4 {
      height: 30px;
      line-height: 30px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      margin-bottom: 15px;
      display: flex;
      & > div {
        margin-right: 16px;
      }
    }
    p {
      height: 27px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 38px;
    }
  }
}
</style>
