<template>
  <sp-action-sheet v-model="show" title=" " style="overflow: hidden">
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
          :loading="btnLoading"
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
import { userinfoApi, auth } from '~/api'
import { productResourceType } from '~/utils/productResourceType'
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
      btnLoading: false,
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
    dictCode() {
      return this.$store.state.tcProductDetail.detailData.dictCode
    },
    city() {
      return this.$store.state.city.currentCity
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
    async handleSub() {
      //    接入客源中心
      //   bizAreaCode: this.city.code, // 区域Code
      //   bizAreaName: this.city.name,
      //   comment: this.formData.content.备注,  // 客户备注
      //   customerAttribute: JSON.stringify(this.formData.content),
      //   customerName: userInfo.fullName,
      //   customerPhone: userInfo.mainAccount, // 电话号码必传
      //   customerSex: userInfo.sex || 1,
      //   sourceUrl: location.href,
      //   sourceSyscode: 'crisps-app', // 来源系统
      //   firstSourceChannel: 'crisps-app-one-home-page', // 一级来源渠道 产品一级分类
      //   secondSourceChannel: 'crisps-app-two-look-service', // 二级来源渠道 产品一级分类
      //   requireCode: 'gszc', // 需求编码
      //   requireName: '公司资产', // 需求名称
      let isCheckPhone
      this.btnLoading = true
      if (!this.token) {
        isCheckPhone = await this.checkPhoneCode()
      } else {
        isCheckPhone = true
      }
      if (!isCheckPhone) {
        this.btnLoading = false
        return
      }
      const goodsDetail = this.$store.state.tcProductDetail.detailData
      const formData = {
        sourceSyscode: 'crisps-app',
        firstSourceChannel: 'crisps-app-one-deal-product', // 一级来源渠道 交易商品详情
        secondSourceChannel: 'crisps-app-two-cut-price', // 出价
        bizAreaCode: this.city.code || '510100', // 区域Code
        bizAreaName: this.city.name || '成都市',
        customerPhone:
          this.$refs.priceFrom.phone || this.userInfoData.mainAccount,
        customerName: this.userInfoData.fullName || '游客',
        sourceUrl: location.href,
        customerSex: this.userInfoData.sex || 2,
        customerAttribute: '交易商品降价提醒',
        // content: `yxjg:${this.$refs.bargCom.price}`, // 留言内容
        requireCode:
          goodsDetail.classCodeLevelList[1] ||
          goodsDetail.classCodeLevelList[0], // 需求编码 产品编码二级分类
      }
      this.$axios
        .post(transactionConsApi.resouse_form, formData)
        .then((res) => {
          this.btnLoading = false
          if (res.code === 200) {
            // 初始化表单数据
            if (!this.token) {
              this.$refs.priceFrom.phone = null
              this.$refs.priceFrom.value2 = null
              this.$refs.priceFrom.clearTiemer()
              this.isBtnDisabled = false
            }
            this.$xToast.show({
              message: '信息提交成功',
              duration: 1000,
              icon: 'toast_ic_comp',
              forbidClick: true,
            })
            // 关闭弹窗
            this.show = false
          } else {
            this.isBtnDisabled = false
            this.$xToast.show({
              message: '信息提交失败,请稍后重试',
              duration: 1500,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        .catch((err) => {
          this.btnLoading = false
          console.error(err)
          this.$xToast.show({
            message: '信息提交失败,请稍后重试',
            duration: 1500,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        })
    },
    checkPhoneCode() {
      return new Promise((resolve, reject) => {
        if (!this.$refs.priceFrom.phone || !this.$refs.priceFrom.value2) {
          this.$xToast.show({
            message: '请输入电话号码和验证码',
            duration: 1500,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
          resolve(false)
        }
        // 先验证电话
        auth
          .checkSmsCode(
            { axios: this.$axios },
            {
              phone: this.$refs.priceFrom.phone,
              userType: 'ORDINARY_USER',
              smsCode: this.$refs.priceFrom.value2,
            }
          )
          .then((res) => {
            console.log('验证电话', res)
            resolve(true)
          })
          .catch((e) => {
            this.$xToast.hideLoading()
            this.$xToast.show({
              message: e.message,
              duration: 1500,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
            resolve(false)
          })
      })
    },
    // handleSub() {
    //   if (!this.checkedReg()) {
    //     return
    //   }
    //   let fromData = {}
    //   let subMitUrl = transactionConsApi.consult
    //   // 未登录
    //   if (!this.token && this.$refs.priceFrom.regFun()) {
    //     fromData = {
    //       web: 'SPAPP', // 归属（原网站类型
    //       type: productResourceType(this.dictCode), // 业务代码
    //       tel: this.$refs.priceFrom.phone, // 未加密的电话号码
    //       name: '未登录用户', // 客户名
    //       smsCode: this.$refs.priceFrom.value2, // 短信验证码
    //       content: '研发测试留言', // 以前的留言内容
    //       device: 'wap', // 设备来源
    //       place: this.city.code, // 地区代码，城市声母，如cd,bj
    //       url: location.href, // 留言所在页面的URL
    //     }
    //     subMitUrl = transactionConsApi.add_consult
    //     this.isBtnDisabled = true
    //   } else if (this.token) {
    //     fromData = {
    //       web: 'SPAPP', // 归属（原网站类型
    //       type: productResourceType(this.dictCode), // 业务代码
    //       tel: this.userInfoData.mainAccountFull, // 未加密的电话号码
    //       name: this.userInfoData.fullName, // 客户名
    //       content: '', // 以前的留言内容
    //       place: this.city.code, // 地区代码，城市声母，如cd,bj
    //       url: location.href, // 留言所在页面的URL
    //     }
    //     subMitUrl = transactionConsApi.consult
    //     this.isBtnDisabled = true
    //   } else {
    //     this.isBtnDisabled = false
    //     return
    //   }
    //   this.$axios.post(subMitUrl, fromData).then((res) => {
    //     if (res.code === 200) {
    //       // 初始化表单数据
    //       if (!this.token) {
    //         this.$refs.priceFrom.phone = null
    //         this.$refs.priceFrom.value2 = null
    //         this.$refs.priceFrom.clearTiemer()
    //         this.isBtnDisabled = false
    //       }
    //       this.$xToast.show({
    //         message: '信息提交成功',
    //         duration: 1000,
    //         icon: 'toast_ic_comp',
    //         forbidClick: true,
    //       })
    //       // 关闭弹窗
    //       this.show = false
    //     } else {
    //       this.isBtnDisabled = false
    //       this.$xToast.show({
    //         message: '信息提交失败,请稍后重试',
    //         duration: 1000,
    //         icon: 'toast_ic_error',
    //         forbidClick: true,
    //       })
    //     }
    //   })
    // },
    // 获取手机号
    getUserIndo() {
      if (this.token) {
        this.$axios
          .get(userinfoApi.info_decrypt, {
            params: {
              id: this.userInfo.userId,
            },
          })
          .then((res) => {
            if (res.code === 200) {
              this.userInfoData = res.data
              this.$store.dispatch('user/setInfo', res.data)
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
::v-deep.sp-popup--bottom.sp-popup--round {
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
    margin-bottom: 69px;
    margin-top: 32px;
    h4 {
      height: 34px;
      line-height: 34px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      margin-bottom: 13px;
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
  ::v-deepinput {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    height: 38px;
    line-height: 38px;
    &::-webkit-input-placeholder,
    &::-moz-placeholder,
    &:-moz-placeholder,
    &:-ms-input-placeholder {
      color: #ccc;
    }
  }
}
</style>
