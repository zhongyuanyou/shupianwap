<template>
  <div class="address">
    <!--S 头部-->
    <Header
      :title="$route.params.type === 'add' ? '新增收货地址' : '编辑收货地址'"
      :head-style="fixHeadStyle"
    >
      <template #left>
        <div @click="onClickLeft">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
      <template v-if="$route.params.type === 'edit'" #right>
        <p class="process" @click="onClickRight">删除</p>
      </template>
    </Header>
    <!--E 头部-->
    <!--S 内容-->
    <div class="address_con">
      <sp-form class="address_con_tp">
        <sp-field
          v-model="ruleForm.contactName"
          center
          label="联系人"
          maxlength="20"
          placeholder="请填写收货人姓名"
        >
          <template #button>
            <div
              v-show="ruleForm.contactName"
              class="end"
              @click="handleEnd(1)"
            >
              <my-icon name="pay_ic_fail" color="#ccc" size="0.28rem" />
            </div>
          </template>
        </sp-field>
        <sp-field
          v-model="ruleForm.phone"
          center
          type="number"
          label="手机号"
          maxlength="11"
          placeholder="请填写收货人手机号"
        >
        </sp-field>
        <sp-field
          v-model="areaTxt"
          center
          readonly
          label="收货地区"
          placeholder="请填写收货地址"
          @click-input="handleAddress"
        >
          <template #button>
            <div class="end" @click="handleEnd(2)">
              <my-icon name="commodity_ic_tmap" color="#ccc" size="0.32rem" />
              <p class="txt">定位</p>
            </div>
          </template>
        </sp-field>
        <sp-field
          v-model="ruleForm.address"
          maxlength="100"
          center
          label="详细地址"
          placeholder="请填写详细地址"
        >
        </sp-field>
      </sp-form>
      <div class="address_con_bot">
        <p class="address_con_bot_title">设为默认地址</p>
        <sp-switch v-model="ruleForm.defaultAddress" inactive-color="#dddddd" />
      </div>
    </div>
    <!--E 内容-->
    <!--S 底部-->
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button
        :loading="btnLoading"
        type="primary"
        :text="'保存'"
        @click="handleSave"
      />
    </sp-bottombar>
    <!--E 底部-->
    <!--S 地址选择-->
    <AreaSelect :show.sync="show" :city-data="areaList" @select="select" />
    <!--E 地址选择-->
    <!--S 弹框-->
    <sp-center-popup
      v-model="popupStatus"
      :field="Field6"
      button-type="confirm"
      @confirm="confirm"
    />
    <!--E 弹框-->
    <sp-toast ref="spToast"></sp-toast>
    <Loading-center v-show="loading" />
  </div>
</template>

<script>
import {
  TopNavBar,
  Cell,
  Form,
  Field,
  Switch,
  Button,
  CenterPopup,
  Bottombar,
  BottombarButton,
  Sticky,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import AreaSelect from '~/components/common/areaSelected/AreaSelect'
import { userinfoApi } from '@/api'
import Header from '@/components/common/head/header'
import SpToast from '@/components/common/spToast/SpToast'
import LoadingCenter from '@/components/common/loading/LoadingCenter'

import noBounce from '@/utils/noBounce'

export default {
  name: 'Id',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Cell.name]: Cell,
    [Form.name]: Form,
    [Field.name]: Field,
    [Switch.name]: Switch,
    [Button.name]: Button,
    [CenterPopup.name]: CenterPopup,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Sticky.name]: Sticky,
    AreaSelect,
    Header,
    LoadingCenter,
    SpToast,
  },
  data() {
    return {
      isChangeCity: false,
      btnLoading: false,
      fixHeadStyle: null,
      ruleForm: {
        contactName: '',
        phone: '',
        address: '',
        defaultAddress: 0,
      },
      show: false, // 地区选择弹窗显示隐藏状态
      popupStatus: false, // 删除确认框显示隐藏状态
      Field6: {
        type: 'functional',
        title: '确定删除收货地址吗？',
      },
      areaList: [], // 地区集合
      areaTxt: '', // 地区字符串
      loading: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId || null,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    if (this.$route.params.type === 'edit') {
      this.getAddressDetail()
    }
    // 判断是否在app中，若在，则执行发送导航头数据的方法
    if (this.isInApp) {
      this.$appFn.dggSetTitle(
        {
          title:
            this.$route.params.type === 'edit'
              ? '编辑收货地址'
              : '新建收货地址',
        },
        (res) => {}
      )
    }
    // this.keepHeadView()
  },

  methods: {
    // 让顶部导航始终在视野最上面
    keepHeadView() {
      this.onScorll()
      noBounce.enable() // 因为橡皮筋效果，也会触发滚动，导致通过滚动判断是否键盘弹起有误，所以阻止橡皮筋效果
      this.$once('hook:beforeDestroy', () => {
        noBounce.disable()
      })
    },

    // 处理当键盘弹起后，在ios12中，网页自动滚动，导致head位置移动
    onScorll() {
      const scrollHandler = () => {
        // 在IOS下document.body.scrollTop 一直为0，要用document.documentElement.scrollTop
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop
        this.fixHeadStyle = { top: scrollTop + 'px' }
      }

      window && window.addEventListener('scroll', scrollHandler)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('scroll', scrollHandler)
      })
    },
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    handleEnd(val) {
      // 点击右边区域
      if (val === 1) {
        this.ruleForm.contactName = ''
      } else if (val === 2) {
        this.$appFn.dggLocation((res) => {
          // 拿到app定位后端数据并赋值
          const addressJSON = res.data
          console.log('addressJSON', addressJSON)
          this.areaTxt =
            addressJSON.province + addressJSON.city + addressJSON.district
          this.areaList[0] = { name: addressJSON.province, code: '' }
          this.areaList[1] = { name: addressJSON.city, code: '' }
          this.areaList[2] = { name: addressJSON.district, code: '' }
          this.ruleForm.address = addressJSON.address
        })
      }
    },
    select(data) {
      this.isChangeCity = true
      // 选择地址
      this.areaTxt = ''
      this.areaList = data
      data.forEach((item) => {
        this.areaTxt += item.name
      })
    },
    handleAddress() {
      // 点击收货地址显示弹窗
      this.show = true
    },
    onClickRight() {
      // 点击右边文字按钮
      if (this.$route.params.type === 'edit') {
        // 执行删除
        this.popupStatus = true
      }
    },
    async getAddressDetail() {
      // 获取地址详情
      const params = {
        id: this.$route.params.id,
      }
      const data = await this.$axios.get(userinfoApi.addressDetail, { params })
      this.ruleForm = data.data
      this.areaTxt = `${data.data.addressProvince || ''}${
        data.data.addressCity || ''
      }${data.data.addressArea || ''}`
      this.areaList[0] = {
        name: `${data.data.addressProvince}`,
        code: '',
      }
      this.areaList[1] = {
        name: `${data.data.addressCity}`,
        code: '',
      }
      this.ruleForm.defaultAddress = !!this.ruleForm.defaultAddress
    },
    handleSave() {
      // 保存
      const req = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      const regCn = /[^A-Za-z0-9\u4E00-\u9FA5]+/
      if (!this.ruleForm.contactName) {
        this.$refs.spToast.show({
          message: '请填写收货人姓名',
          duration: 1500,
          forbidClick: true,
        })
      } else if (
        this.ruleForm.contactName.length < 2 ||
        this.ruleForm.contactName > 20
      ) {
        this.$refs.spToast.show({
          message: '姓名限制为2-20位',
          duration: 1500,
          forbidClick: true,
        })
      } else if (regCn.test(this.ruleForm.contactName)) {
        this.$refs.spToast.show({
          message: '姓名不能输入特殊字符',
          duration: 1500,
          forbidClick: true,
        })
      } else if (!this.ruleForm.phone) {
        this.$refs.spToast.show({
          message: '请填写收货人手机号',
          duration: 1500,
          forbidClick: true,
        })
      } else if (!req.test(this.ruleForm.phone)) {
        this.$refs.spToast.show({
          message: '手机号格式不正确，请重新输入',
          duration: 1500,
          forbidClick: true,
        })
      } else if (!this.areaTxt) {
        this.$refs.spToast.show({
          message: '请填写收货地址',
          duration: 1500,
          forbidClick: true,
        })
      } else if (!this.ruleForm.address) {
        this.$refs.spToast.show({
          message: '请填写详细地址',
          duration: 1500,
          forbidClick: true,
        })
      } else {
        if (this.$route.params.type === 'edit') {
          this.saveEdit()
          return
        }
        this.saveNew()
      }
    },
    async saveEdit() {
      // 保存编辑内容
      // this.loading = true
      this.btnLoading = true
      this.ruleForm.defaultAddress = this.ruleForm.defaultAddress ? 1 : 0
      const params = {
        ...this.ruleForm,
        addressProvince: this.areaList.length ? this.areaList[0].code : '',
        addressCity: this.areaList.length > 1 ? this.areaList[1].code : '',
        addressArea: '',
      }
      if (!this.isChangeCity) {
        delete params.addressProvince
        delete params.addressCity
        delete params.addressArea
      }
      try {
        const res = await this.$axios.post(userinfoApi.updateAddress, params)
        this.loading = false
        this.btnLoading = false
        if (res.code === 200) {
          this.$router.back()
        } else {
          this.$refs.spToast.show({
            message: res.message,
            duration: 1500,
            forbidClick: true,
          })
        }
      } catch (err) {
        this.loading = false
      }
    },
    async saveNew() {
      // 保存新增内容
      // this.loading = true
      this.btnLoading = true
      this.ruleForm.defaultAddress = this.ruleForm.defaultAddress ? 1 : 0
      const params = {
        ...this.ruleForm,
        addressProvince: this.areaList.length ? this.areaList[0].code : '',
        addressCity: this.areaList.length > 1 ? this.areaList[1].code : '',
        addressArea: '',
        userId: this.userId,
      }
      if (!this.isChangeCity) {
        delete params.addressProvince
        delete params.addressCity
      }
      try {
        const res = await this.$axios.post(userinfoApi.updateAddress, params)
        this.loading = false
        this.btnLoading = true
        if (res.code === 200) {
          this.$router.back()
        } else {
          this.$refs.spToast.show({
            message: res.message,
            duration: 1500,
            forbidClick: true,
          })
        }
      } catch (err) {
        this.loading = false
      }
    },
    async confirm() {
      // 确定删除
      try {
        const params = {
          id: this.ruleForm.id,
        }
        await this.$axios.get(userinfoApi.delAddress, { params })
        this.$router.back()
      } catch (err) {}
    },
    clearName() {
      // 清除名称
      console.log(123)
      this.ruleForm.contactName = ''
    },
  },
}
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  -webkit-overflow-scrolling: auto;
  overscroll-behavior-y: none;
  ::v-deep .sp-field__label {
    width: 150px;
  }
  ::v-deep .sp-field__body {
    > input::-webkit-input-placeholder {
      color: #cccccc;
    }
  }
  ::v-deep .sp-bottombar {
    z-index: 999;
  }
  ::v-deep .sp-bottombar-button {
    font-size: 32px;
    font-weight: bold;
  }
  .back_icon {
    margin-left: 40px;
  }
  .process {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-right: 40px;
  }
  ::v-deep .sp-top-nav-bar {
    height: 88px;
  }
  &_con {
    display: flex;
    flex-direction: column;
    padding-bottom: 160px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    &_tp {
      margin-top: 24px;
      background-color: #fff;
      width: 100%;
      ::v-deep .sp-cell {
        height: 120px;
      }
      ::v-deep .sp-cell__title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 44px;
      }
      ::v-deep.sp-field__body {
        height: 119px;
      }
      ::v-deep.sp-field__control {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 34px;
        &:focus {
          outline: none;
        }
        -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
        //修改input-placeholder样式
        ::-webkit-input-placeholder {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #cccccc;
        }
      }
      .end {
        height: 120px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 44px;
        margin-left: 11px;
        .txt {
          margin-left: 11px;
        }
      }
    }
    &_bot {
      width: 100%;
      height: 120px;
      margin-top: 24px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0 40px;
      &_title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 44px;
      }
    }
  }
  &_bot {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 160px;
    background-color: #fff;
    display: flex;
    padding: 0 40px;
    justify-content: center;
    align-items: center;
    ::v-deep .sp-button {
      width: 100%;
    }
  }
}
</style>
