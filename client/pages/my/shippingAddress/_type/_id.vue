<template>
  <div class="address">
    <!--S 头部-->
    <sp-top-nav-bar
      :title="$route.params.type === 'add' ? '新增收货地址' : '编辑收货地址'"
      left-arrow
      ellipsis
      :fixed="true"
      :right-text="$route.params.type === 'edit' ? '删除' : null"
      @on-click-left="onClickLeft"
      @on-click-right="onClickRight"
    />
    <!--E 头部-->
    <!--S 内容-->
    <div class="address_con">
      <sp-form class="address_con_tp">
        <sp-field
          v-model="ruleForm.name"
          center
          label="联系人"
          placeholder="请填写收货人姓名"
        >
          <template #button>
            <div class="end" @click="handleEnd(1)">
              <my-icon name="pay_ic_fail" color="#ccc" size="0.28rem" />
            </div>
          </template>
        </sp-field>
        <sp-field
          v-model="ruleForm.tel"
          center
          type="number"
          label="手机号"
          placeholder="请填写收货人手机号"
        >
        </sp-field>
        <sp-field
          v-model="ruleForm.address"
          center
          readonly
          label="收货地区"
          placeholder="请填写收货地址"
          @click-input="handleAddress"
        >
          <template #button>
            <div class="end" @click="handleEnd(2)">
              <my-icon name="per_ic_addressr" color="#999" size="0.32rem" />
              <p class="txt">定位</p>
            </div>
          </template>
        </sp-field>
        <sp-field
          v-model="ruleForm.detailedAddress"
          center
          label="详细地址"
          placeholder="请填写详细地址"
        >
        </sp-field>
      </sp-form>
      <div class="address_con_bot">
        <p class="address_con_bot_title">设为默认地址</p>
        <sp-switch v-model="ruleForm.default" inactive-color="#dddddd" />
      </div>
    </div>
    <!--E 内容-->
    <!--S 底部-->
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button type="primary" :text="'保存'" />
    </sp-bottombar>
    <!--E 底部-->
    <!--S 地址选择-->
    <AreaSelect :show.sync="show" />
    <!--E 地址选择-->
    <!--S 弹框-->
    <sp-center-popup
      v-model="popupStatus"
      :field="Field6"
      button-type="confirm"
    />
    <!--E 弹框-->
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
} from '@chipspc/vant-dgg'
import AreaSelect from '~/components/common/areaSelected/AreaSelect'
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
    AreaSelect,
  },
  data() {
    return {
      ruleForm: {
        name: '',
        tel: '',
        address: '',
        detailedAddress: '',
        default: false,
      },
      show: false, // 地区选择弹窗显示隐藏状态
      popupStatus: false, // 删除确认框显示隐藏状态
      Field6: {
        type: 'functional',
        title: '确定删除收货地址吗？',
      },
    }
  },
  methods: {
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    handleEnd(val) {
      // 点击右边区域
      if (val === 1) {
        this.ruleForm.name = ''
        return
      }
      alert('需跳转到app的地址定位页面')
    },
    handleAddress() {
      // 点击收货地址显示弹窗
      this.show = true
    },
    onClickRight() {
      // 点击右边文字按钮
      if (this.$route.params.type === 'edit') {
        this.popupStatus = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.address {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /deep/ .sp-top-nav-bar {
    height: 88px;
  }
  &_con {
    padding-top: 88px;
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
      /deep/ .sp-cell {
        height: 120px;
      }
      /deep/ .sp-cell__title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 44px;
      }
      /deep/ .sp-field__control {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        height: 119px;
        line-height: 119px;
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
    /deep/ .sp-button {
      width: 100%;
    }
  }
}
</style>
