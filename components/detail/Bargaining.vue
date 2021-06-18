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
          :loading="btnLoading"
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
import { userinfoApi, auth } from '~/api'
import { productResourceType } from '~/utils/productResourceType'
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
      btnLoading: false,
      show: false,
      radio: '1',
      isBtnDisabled: false,
      userInfoData: {}, // 用户信息 明文
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
    async handleSub() {
      this.btnLoading = true
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
      if (!this.token && this.$refs.bargCom.regFun()) {
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
        secondSourceChannel: 'crisps-app-two-offer-price', // 出价
        bizAreaCode: this.city.code || '510100', // 区域Code
        bizAreaName: this.city.name || '成都市',
        customerPhone:
          this.$refs.bargCom.phone || this.userInfoData.mainAccount,
        sourceUrl: location.href,
        customerName: this.userInfoData.fullName || '游客',
        customerSex: this.userInfoData.sex || 2,
        customerAttribute: JSON.stringify({
          意向价格: this.$refs.bargCom.price,
        }),
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
            // 初始化表单
            if (!this.token) {
              this.isBtnDisabled = true
              this.$refs.bargCom.price = null
              this.$refs.bargCom.phone = null
              this.$refs.bargCom.code = null
              this.$refs.bargCom.clearTiemer()
              this.isBtnDisabled = false
            } else if (this.token) {
              this.$refs.bargCom.price = null
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
        if (!this.$refs.bargCom.phone || !this.$refs.bargCom.code) {
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
              phone: this.$refs.bargCom.phone,
              userType: 'ORDINARY_USER',
              smsCode: this.$refs.bargCom.code,
            }
          )
          .then((res) => {
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
    handleSubOld() {
      let fromData = {}
      let subMitUrl = transactionConsApi.consult
      // 未登录
      if (!this.token && this.$refs.bargCom.regFun()) {
        fromData = {
          web: 'SPAPP', // 归属（原网站类型
          type: productResourceType(this.dictCode), // 业务代码
          tel: this.$refs.bargCom.phone, // 未加密的电话号码
          name: '未登录用户', // 客户名
          smsCode: this.$refs.bargCom.code, // 短信验证码
          content: `yxjg:${this.$refs.bargCom.price}`, // 留言内容
          device: 'wap', // 设备来源
          place: this.city.code, // 地区代码
          url: location.href, // 留言所在页面的URL
        }
        subMitUrl = transactionConsApi.add_consult
        this.isBtnDisabled = true
      } else if (this.token) {
        fromData = {
          web: 'SPAPP', // 归属（原网站类型
          type: productResourceType(this.dictCode), // 业务代码
          tel: this.userInfo.mainAccountFull, // 未加密的电话号码
          name: this.userInfo.fullName, // 客户名
          content: `yxjg:${this.$refs.bargCom.price}`, // 留言内容
          place: this.city.code, // 地区代码，城市声母，如cd,bj
          url: location.href, // 留言所在页面的URL
        }
        subMitUrl = transactionConsApi.consult
        this.isBtnDisabled = true
      } else {
        this.isBtnDisabled = false
        return
      }
      //  登录用户
      this.$axios.post(subMitUrl, fromData).then((res) => {
        if (res.code === 200) {
          // 初始化表单
          if (!this.token) {
            this.isBtnDisabled = true
            this.$refs.bargCom.price = null
            this.$refs.bargCom.phone = null
            this.$refs.bargCom.code = null
            this.$refs.bargCom.clearTiemer()
            this.isBtnDisabled = false
          } else if (this.token) {
            this.$refs.bargCom.price = null
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
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        }
      })
    },
    // 获取用户信息 明文
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
              // this.$store.dispatch('user/setInfo', res.data)
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
  .bargaining-desc {
    font-size: 28px;
  }
  ::v-deepinput {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    height: 38px;
    line-height: 38px;
    &::placeholder,
    &::-webkit-input-placeholder,
    &::-moz-placeholder,
    &:-moz-placeholder,
    &:-ms-input-placeholder {
      color: #cccccc;
    }
  }
}
</style>
