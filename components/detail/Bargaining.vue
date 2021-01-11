<template>
  <sp-action-sheet v-model="show" title=" ">
    <div class="bargaining">
      <h1 class="bargaining-title">73.9%的卖家会接受议价哦</h1>
      <p class="bargaining-desc">
        规划师将立即与卖家联系，稍后会回复您反馈结果
      </p>
      <div class="bargaining-content">
        <component
          :is="token ? 'BargPrrice' : 'BargainingFrom'"
          ref="bargCom"
        ></component>
      </div>
      <div class="remind-btn">
        <sp-button
          type="primary"
          block
          :disabled="isBtnDisabled"
          @click="handleSub"
          >确定</sp-button
        >
      </div>
    </div>
  </sp-action-sheet>
</template>

<script>
import { ActionSheet, Button, RadioGroup, Radio } from '@chipspc/vant-dgg'
import BargPrrice from '~/components/detail/bargaining/BargPrrice'
import BargainingFrom from '~/components/detail/bargaining/BargainingFrom'
import { transactionConsApi } from '~/api/transactionConsultation'
import { userinfoApi } from '~/api'
export default {
  name: 'Bargaininguction',
  components: {
    [ActionSheet.name]: ActionSheet,
    [Button.name]: Button,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    BargPrrice,
    BargainingFrom,
  },
  data() {
    return {
      show: false,
      radio: '1',
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
    handleSub() {
      // 登录
      if (this.token) {
        //  登录用户
        this.$axios
          .post(transactionConsApi.consult, {
            web: 'flczmh', // 归属（原网站类型
            type: 'flzx', // 业务代码
            tel: this.userInfoData.decodePhone, // 未加密的电话号码
            name: this.userInfoData.fullName, // 客户名
            content: `用户出价${this.$refs.bargCom.price}`, // 以前的留言内容
            // device: 'wap', // 设备来源
            place: 'all', // 地区代码，城市声母，如cd,bj
            url: location.href, // 留言所在页面的URL
          })
          .then((res) => {
            if (res.code === 200) {
              this.isBtnDisabled = true
              this.$refs.bargCom.price = null
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
      } else if (!this.token && this.$refs.bargCom.regFun()) {
        //  登录用户
        this.$axios
          .post(transactionConsApi.consult, {
            web: 'flczmh', // 归属（原网站类型
            type: 'flzx', // 业务代码
            tel: this.$refs.bargCom.phone, // 未加密的电话号码
            name: '未登录测试用户', // 客户名
            content: `用户出价${this.$refs.bargCom.price}`, // 以前的留言内容
            // device: 'wap', // 设备来源
            place: 'all', // 地区代码，城市声母，如cd,bj
            url: location.href, // 留言所在页面的URL
          })
          .then((res) => {
            if (res.code === 200) {
              this.isBtnDisabled = true
              this.$refs.bargCom.price = null
              this.$refs.bargCom.phone = null
              this.$refs.bargCom.code = null
              this.$refs.bargCom.clearTiemer()
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
.bargaining {
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
}
</style>
