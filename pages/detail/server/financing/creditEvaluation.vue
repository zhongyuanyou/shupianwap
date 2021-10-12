<template>
  <div class="credit-evaluation">
    <sp-sticky>
      <div class="heaa-box">
        <Head title="额度评估">
          <template #left>
            <my-icon
              class="back-icon"
              name="nav_ic_back"
              size="0.4rem"
              color="#FFFFFF"
              @click.native="onLeftClick"
            ></my-icon>
          </template>
        </Head>
        <div class="num-box">
          <span class="head-msg">最高额度(元)</span>
          <span class="lines">{{ price }}</span>
        </div>
        <div class="prompt">输入以下信息，获取贷款额度</div>
      </div>
    </sp-sticky>

    <div class="content">
      <!-- 所在城市 -->
      <div class="list-content z-flex">
        <span class="title">所在城市</span>
        <div class="my-content">
          <input
            v-model="cityName"
            type="text"
            placeholder="优先选择工作地或户籍地"
            readonly
            class="city-input"
            @focus="chooseShow"
          />
          <div class="icon-box" @click="chooseShow">
            <my-icon
              class="back-icon"
              name="list_ic_next"
              size="0.32rem"
              color="#CCCCCC"
            ></my-icon>
          </div>
        </div>
      </div>
      <!-- 有无公积金 -->
      <div class="list-content">
        <span class="chooseTitle">有无缴满2年的公积金</span>
        <div class="gender-box">
          <span
            v-for="(item, idx) in isHave"
            :key="idx"
            :class="idx === reserveActived ? 'active' : ''"
            @click="insurance(idx, 'reserve')"
            >{{ item }}</span
          >
        </div>
      </div>
      <div v-show="reserveActived === 0" class="personal">
        <span class="personal-title">个人月缴金额</span>
        <input
          v-model="amount"
          type="number"
          class="personal-input"
          placeholder="请输入"
        />
        <span class="unit">元</span>
      </div>
      <!-- 是否缴纳保单 -->
      <div class="list-content">
        <span class="chooseTitle">有无生效2年的保单</span>
        <div class="gender-box">
          <span
            v-for="(item, idx) in isHave"
            :key="idx"
            :class="idx === insuranceActived ? 'active' : ''"
            @click="insurance(idx, 'insurance')"
            >{{ item }}</span
          >
        </div>
      </div>
      <div v-show="insuranceActived === 0" class="personal">
        <span class="personal-title">年缴保费</span>
        <input
          v-model="insuranceNum"
          type="number"
          class="insurance-input"
          placeholder="请输入"
        />
        <span class="unit">万元</span>
      </div>
      <!-- 有无房贷 -->
      <div class="list-content">
        <span class="chooseTitle">有无房贷</span>
        <div class="gender-box">
          <span
            v-for="(item, idx) in isHave"
            :key="idx"
            :class="idx === isTimeActived ? 'active' : ''"
            @click="insurance(idx, 'isTime')"
            >{{ item }}</span
          >
        </div>
      </div>
      <div v-show="isTimeActived === 0" class="reimbursement">
        <div class="reimbursement-box">
          <span class="reimbursement-title">房贷已还时间</span>
          <div class="time-box">
            <span
              v-for="(item, idx) in time"
              :key="idx"
              :class="timeActived === idx ? 'time-active' : ''"
              @click="insurance(idx, 'time')"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <div v-show="isTimeActived === 0" class="reimbursement-num">
        <span class="reimbursement-num-title">月供还款</span>
        <input
          v-model="reimbursementNum"
          type="number"
          class="reimbursement-num-input"
          placeholder="请输入"
        />
        <span class="reimbursement-unit">元</span>
      </div>
      <!-- 贷款类型 -->
      <div class="list-content z-flex">
        <span class="title">贷款类型</span>
        <div class="my-content">
          <input
            v-model="loanTypeTxt"
            type="text"
            placeholder="请选择贷款类型"
            readonly
            class="city-input"
            @focus="chooseShowLoan"
          />
          <div class="icon-box" @click="chooseShowLoan">
            <my-icon
              class="back-icon"
              name="list_ic_next"
              size="0.32rem"
              color="#CCCCCC"
            ></my-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="phone-box">
      <!-- 电话号码 -->
      <div class="phone-content">
        <span class="phone-title">手机号</span>
        <input
          v-if="!isLogin"
          v-model="phone"
          type="number"
          placeholder="请输入手机号"
          class="phone-input"
          @input="phoneReg"
        />
        <span v-else class="user-phone-input">{{ userPhone }}</span>
      </div>
      <!-- 获取验证码 -->
      <div v-if="!isLogin" class="phone-content">
        <span class="phone-title">验证码</span>
        <input
          v-model="sms"
          type="number"
          placeholder="输入短信校验码"
          class="sms-input"
          @input="smsReg"
        />
        <div class="line"></div>
        <span class="verification" @click="getSms">{{ test }}</span>
      </div>
    </div>
    <div class="btn-box">
      <button @click="onForm">立即申请</button>
      <div v-show="isShow" class="mask"></div>
    </div>
    <span class="btn-msg">薯片助贷服务，让更多人生活更美好！</span>
    <div v-if="isInApp" class="position"></div>
    <sp-popup v-model="pickerShow" position="bottom" :close-on-popstate="true">
      <sp-picker
        show-toolbar
        title="所在城市"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </sp-popup>
    <sp-popup
      v-model="pickerShowLoan"
      position="bottom"
      :close-on-popstate="true"
    >
      <sp-picker
        show-toolbar
        title="贷款类型"
        :columns="loanTypes"
        @confirm="onConfirmLoan"
        @cancel="onCancelLoan"
      />
    </sp-popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { Picker, Popup, Sticky } from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import { productDetailsApi, auth } from '@/api'
import imHandle from '@/mixins/imHandle'
import getUserSign from '@/utils/fingerprint'
export default {
  components: {
    Head,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
  },
  mixins: [imHandle /*, isLogin */],
  data() {
    return {
      // 页面规划师
      pagePlanner: {},
      num: '0',
      pickerShow: false,
      pickerShowLoan: false,
      columns: [],
      cityList: {},
      isHave: ['有', '无'],
      reserveActived: 1, // 是否有缴纳公积金
      amount: '', // 金额
      insuranceActived: 1,
      insuranceNum: '', // 保单缴费
      houseActived: 0, // 房贷已还时间
      isTimeActived: 1,
      time: ['半年-1年', '1年-3年', '3年-5年', '5年以上'],
      timeActived: 0,
      test: '获取验证码',
      phone: '', // 电话号码
      sms: '', // 验证码
      reimbursementNum: '',
      timeLimit: 20,
      cityName: '',
      isLogin: false, // 是否登录
      userPhone: '',
      loanTypes: [
        { text: '企业信贷', value: 1 },
        { text: '企业抵押', value: 1.3 },
        { text: '个人信贷', value: 1.1 },
        { text: '个人抵押', value: 1.2 },
      ],
      loanTypeTxt: '企业信贷',
      loanType: 1,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
      userId: (state) => state.user.userId, // 用户id
      token: (state) => state.user.token, // token
    }),
    price() {
      let finalPrice = 0
      if (this.amount >= 280 && this.insuranceNum && this.reimbursementNum) {
        const num =
          50000 +
          (this.amount - 280) * 575 +
          this.insuranceNum * 10000 * 25 +
          this.reimbursementNum * this.timeLimit
        finalPrice = num
      } else if (this.amount >= 280 && this.insuranceNum) {
        const num =
          50000 + (this.amount - 280) * 575 + this.insuranceNum * 10000 * 25
        finalPrice = num
      } else if (this.amount >= 280 && this.reimbursementNum) {
        const num =
          50000 +
          (this.amount - 280) * 575 +
          this.reimbursementNum * this.timeLimit
        finalPrice = num
      } else if (this.insuranceNum && this.reimbursementNum) {
        const num =
          50000 +
          this.insuranceNum * 10000 * 25 +
          this.reimbursementNum * this.timeLimit
        finalPrice = num
      } else if (this.amount >= 280) {
        // 有无缴满2年公积金
        const num = 50000 + (this.amount - 280) * 575
        finalPrice = num
      } else if (this.insuranceNum) {
        // 有无生效2年保单
        const num = this.insuranceNum * 10000 * 25
        finalPrice = num
      } else if (this.reimbursementNum) {
        // 房贷月供还款
        const num = this.reimbursementNum * this.timeLimit
        finalPrice = num
      } else {
        finalPrice = 0
      }
      if (!finalPrice || isNaN(finalPrice) || finalPrice === 0) {
        return '0'
      }
      finalPrice = finalPrice * this.loanType
      return finalPrice > 10000000 ? '10000000' : finalPrice
    },
    isShow() {
      if (this.phone && this.sms && this.cityName) {
        return false
      } else if (this.isLogin && this.cityName) {
        return false
      } else {
        return true
      }
    },
  },
  async mounted() {
    // 强制读取city name
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
    this.cityName = this.city.name
    this.userPhone = this.$cookies.get('userPhone', { path: '/' })
    if (this.userId && this.token && this.userPhone) {
      this.isLogin = true
    }
    this.getPagePlanner('app-ghsdgye-02')
    this.getCity()
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    getCity() {
      this.$axios
        .get(productDetailsApi.financing.get_city, {
          params: { code: 2147483647 },
        })
        .then((res) => {
          if (res.code === 200) {
            this.cityList = res.data.city
            this.columns = [
              { values: Object.keys(this.cityList) },
              { values: this.cityList['北京市'] },
            ]
          }
        })
    },
    onChange(picker, value) {
      picker.setColumnValues(1, this.cityList[value[0]])
    },
    // 推介规划师
    async getPagePlanner(scene) {
      const device = await getUserSign() // 获取用户唯一标识
      const areaCode = this.city.code || '510100' // 站点code
      // 站点code
      try {
        this.$axios
          .get(productDetailsApi.recPlanner, {
            params: {
              limit: 3,
              page: 1,
              login_name: '',
              deviceId: device, // 设备标识
              area: areaCode, // 站点code
              user_id: '',
              productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
              sceneId: scene, // 场景id
              level_2_ID: '', // 二级code
              platform: 'app',
              productId: '', //
              thirdTypeCodes: '', // 三级code
              firstTypeCode: 'FL20210425164558', // 一级code
            },
          })
          .then((res) => {
            if (
              res.code === 200 &&
              Array.isArray(res.data.records) &&
              res.data.records.length
            ) {
              this.pagePlanner = {
                id: res.data.records[0].mchUserId,
                name: res.data.records[0].userName,
                type: res.data.records[0].type,
                jobNum: res.data.records[0].userCenterNo,
                telephone: res.data.records[0].phone,
                imgSrc: res.data.records[0].imgaes,
              }
              console.log(`**********************************`)
              console.log(`output ${JSON.stringify(this.pagePlanner)}`)
              console.log(`**********************************`)
            }
          })
      } catch (error) {
        console.log('plannerApi.plannerReferrals error：', error.message)
      }
    },
    getSms() {
      if (this.test === '获取验证码') {
        const params = { phone: this.phone, type: 'default' }
        auth
          .smsCode({ axios: this.$axios }, params)
          .then((res) => {
            this.$xToast.success('验证码发送成功,请注意查收！')
          })
          .catch((e) => {
            this.$xToast.error('验证码发送失败！')
          })
      }
      let i = 59
      clearInterval(this.time)
      this.test = i + 's'
      this.time = setInterval(() => {
        if (i > 1) {
          i--
          this.test = i + 's'
        } else {
          this.test = '获取验证码'
          clearInterval(this.time)
        }
      }, 1000)
    },
    onForm() {
      const planner = {
        imUserId: this.pagePlanner.id,
        imUserType: this.pagePlanner.type,
      }
      // 证明未登录没有电话,需要验证
      if (!this.isLogin) {
        auth
          .checkSmsCode(
            { axios: this.$axios },
            {
              phone: this.phone,
              userType: 'ORDINARY_USER',
              smsCode: this.sms,
            }
          )
          .then((res) => {
            this.creatImSessionMixin(planner)
          })
          .catch((e) => {
            this.$xToast.error('手机验证码校验失败!')
            console.log(e)
          })
      } else {
        this.creatImSessionMixin(planner)
      }
    },
    // 返回上一页
    onLeftClick() {
      this.$back()
    },
    chooseShow() {
      this.pickerShow = true
    },
    chooseShowLoan() {
      this.pickerShowLoan = true
    },
    // 贷款期限弹出层确认按钮
    onConfirm(value, index) {
      this.cityName = value
      this.pickerShow = false
    },
    onConfirmLoan(value, index) {
      this.loanTypeTxt = value.text
      this.loanType = value.value
      this.pickerShowLoan = false
    },
    // 贷款期限弹出层取消按钮
    onCancel() {
      this.pickerShow = false
    },
    onCancelLoan() {
      this.pickerShowLoan = false
    },
    phoneReg(e) {
      e.target.value = e.target.value.match(/^(\d{0,11})/g)[0] || null
      this.phone = e.target.value
    },
    smsReg(e) {
      e.target.value = e.target.value.match(/^(\d{0,6})/g)[0] || null
      this.sms = e.target.value
    },
    insurance(idx, type) {
      type === 'insurance' && (this.insuranceActived = idx)
      type === 'reserve' && (this.reserveActived = idx)
      type === 'house' && (this.houseActived = idx)
      type === 'isTime' && (this.isTimeActived = idx)
      if (type === 'time') {
        this.timeActived = idx
        switch (this.time[idx]) {
          case '半年-1年':
            this.timeLimit = 20
            break
          case '1年-3年':
            this.timeLimit = 45
            break
          case '3年-5年':
            this.timeLimit = 70
            break
          default:
            this.timeLimit = 100
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.credit-evaluation {
  width: 100vw;
  margin: 0 auto;
  background: #f5f5f5;
  padding-bottom: 40px;
  min-height: 100vh;
  .position {
    width: 100%;
    height: 54px;
  }
  .heaa-box {
    width: 100%;
    background: #4974f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    ::v-deep.my-head {
      padding-top: 0 !important ;
      position: relative;
      background: transparent;
      .title {
        color: #ffffff;
      }
    }
    .num-box {
      padding-bottom: 65px;
      display: flex;
      flex-direction: column;
      align-items: center;
      > span {
        display: block;
      }
      .head-msg {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        margin-top: 40px;
      }
      .lines {
        height: 87px;
        font-size: 66px;
        font-family: Bebas;
        color: #ffffff;
        line-height: 87px;
        margin-top: 20px;
      }
    }
  }
  .prompt {
    width: 750px;
    height: 80px;
    padding: 20px 0 20px 40px;
    background: #f5f5f5;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40px;
  }
  .content {
    // margin-top: 420px;
    background: #ffffff;
    padding: 0 40px;
    > div {
      height: 120px;
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      font-size: 0;
      display: flex;
      align-items: center;
    }
    .list-content {
      &.z-flex {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      > span {
        display: block;
      }
      .chooseTitle {
        width: 315px;
        height: 45px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      .title {
        width: 160px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      .my-content {
        display: flex;
        align-items: center;
        > input {
          margin-right: 40px;
          font-size: 32px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          line-height: 50px;
          border: none;
          color: #222222;
          display: block;
        }
        > input:-ms-input-placeholder {
          color: #999999;
        }
      }
      > input {
        width: 238px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 50px;
        border: none;
        margin-left: 53px;
        color: #222222;
        display: block;
      }
      > input:-ms-input-placeholder {
        color: #999999;
      }
      .gender-box {
        display: flex;
        margin-left: auto;
        > span {
          display: block;
          width: 100px;
          height: 56px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #dddddd;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 56px;
          text-align: center;
        }
        > span:last-child {
          margin-left: 20px;
        }
        .active {
          background: #f2f5ff;
          border-radius: 8px;
          border: 1px solid #4974f5;
          color: #4974f5;
        }
      }
      .icon-box {
        width: 32px;
        height: 32px;
      }
      .city-input {
        width: 370px;
        text-align: right;
      }
    }
    .personal {
      .personal-title {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
        width: 200px;
      }
      .personal-input {
        display: block;
        margin-left: auto;
        width: 346px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 50px;
        border: none;
        text-align: right;
      }
      .personal-input:-moz-placeholder {
        color: #999999;
      }
      .insurance-input {
        display: block;
        margin-left: 60px;
        width: 314px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 50px;
        border: none;
        text-align: right;
      }
      .insurance-input:-moz-placeholder {
        color: #999999;
      }
      .unit {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
        margin-left: auto;
      }
    }
    .reimbursement {
      width: 100%;
      height: 200px;
      background: #ffffff;
      .reimbursement-box {
        border-bottom: 1px solid #f4f4f4;
        font-size: 0;
        .reimbursement-title {
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #222222;
          line-height: 45px;
        }
        .time-box {
          display: flex;
          font-size: 0;
          margin-top: 24px;
          > span:not(:first-child) {
            margin-left: 20px;
          }
          > span {
            width: 152px;
            height: 56px;
            border-radius: 8px;
            border: 1px solid #dddddd;
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 56px;
            text-align: center;
          }
          .time-active {
            color: #4974f5;
            background: #f2f5ff;
            border: 1px solid #4974f5;
          }
        }
      }
    }
    .reimbursement-num {
      .reimbursement-num-title {
        width: 192px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      .reimbursement-num-input {
        width: 346px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 50px;
        text-align: right;
        border: none;
        margin-left: 60px;
      }
      .reimbursement-num-input:-moz-placeholder {
        color: #999999;
      }
      .reimbursement-unit {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
        margin-left: auto;
      }
    }
  }
  .phone-box {
    background: #ffffff;
    padding: 0 40px;
    margin-top: 20px;
    .phone-content {
      height: 120px;
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      font-size: 0;
      display: flex;
      align-items: center;
      .user-phone-input {
        width: 482px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 50px;
        border: none;
        margin-left: 58px;
        color: #222222;
      }
      > span {
        display: block;
      }
      .phone-title {
        width: 130px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #222222;
        line-height: 45px;
      }
      > input {
        width: 238px;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 50px;
        border: none;
        margin-left: 58px;
        color: #222222;
        display: block;
      }
      > input:-ms-input-placeholder {
        color: #999999;
      }
      .sms-input {
        width: 274px;
      }
      .line {
        width: 1px;
        height: 40px;
        border: 1px solid #dddddd;
        margin-left: 24px;
      }
      .verification {
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 50px;
        margin-left: auto;
      }
    }
  }
  .btn-box {
    padding: 0 40px;
    font-size: 0;
    position: relative;
    > button {
      margin-top: 48px;
      width: 670px;
      height: 96px;
      background: #4974f5;
      border-radius: 8px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 96px;
    }
    .mask {
      width: 670px;
      height: 96px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 8px;
      position: absolute;
      top: 48px;
    }
  }
  .btn-msg {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #cccccc;
    line-height: 37px;
    margin-top: 40px;
  }
}
</style>
