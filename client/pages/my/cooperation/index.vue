<template>
  <div class="cooperation">
    <sp-sticky>
      <sp-top-nav-bar title="我要合作" ellipsis @on-click-left="back">
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <div class="cooperation-top">
      <p class="cooperation-top-title">合作共赢</p>
      <p class="cooperation-top-desc">千万级用户/海量资源/共同致富</p>
    </div>
    <div class="cooperation-form">
      <div class="cooperation-form-title">合作信息填写</div>
      <sp-form label-width="80" @submit="submit">
        <sp-field
          v-model="form.contactsName"
          name="联系人"
          label="联系人"
          placeholder="请输入您的姓名"
          :rules="[{ required: true, message: '请输入您的姓名' }]"
        />
        <sp-field
          v-model="form.companyName"
          name="公司名称"
          label="公司名称"
          placeholder="请输入公司名称"
          :rules="[{ required: true, message: '请输入公司名称' }]"
        />
        <sp-field
          v-model="form.position"
          name="您的职位"
          label="您的职位"
          :readonly="true"
          :clickable="true"
          placeholder="请选择您的职位"
          :rules="[
            { required: true, message: '请选择您的职位', trigger: 'onChange' },
          ]"
          @click="selectPosition"
        >
          <template #button>
            <sp-icon name="arrow" color="#CCCCCC"></sp-icon>
          </template>
        </sp-field>
        <sp-field
          v-model="form.companyAddress"
          name="公司地址"
          label="公司地址"
          placeholder="请输入公司地址"
        />
        <sp-field
          v-model="form.phone"
          center
          clearable
          type="tel"
          label="联系方式"
          placeholder="请输入联系方式"
          :rules="[
            {
              validator: checkTel,
              message: '请输入正确的手机号',
              trigger: 'onChange',
            },
          ]"
        >
          <template #button>
            <sp-button
              native-type="button"
              class="cooperation-form-button"
              :disabled="!correctPhone"
              size="small"
              plain
              type="primary"
              @click="getPhoneCode"
              >{{ btnText }}</sp-button
            >
          </template>
        </sp-field>
        <sp-field
          v-model="form.code"
          name=""
          label=" "
          placeholder="请输入验证码"
          :rules="[{ validator: checkCode, message: '请输入正确的验证码' }]"
        />
        <sp-bottombar safe-area-inset-bottom>
          <sp-bottombar-button
            type="primary"
            text="立即申请"
            native-type="submit"
          />
        </sp-bottombar>
      </sp-form>
    </div>
    <div class="cooperation-introduce">
      <p class="cooperation-introduce-title">平台介绍</p>
      <div
        v-for="(item, index) in introduceData"
        :key="index"
        class="cooperation-introduce-item"
      >
        <div class="cooperation-introduce-item-img">
          <sp-image
            class="detail-content-complain-imgs-item"
            width="100%"
            height="150"
            :src="item.imgUrl"
          />
        </div>
        <p class="cooperation-introduce-item-title">{{ item.title }}</p>
        <p class="cooperation-introduce-item-desc">{{ item.desc }}</p>
      </div>
    </div>
    <sp-popup v-model="showPop" position="bottom" :style="{ height: '318' }">
      <sp-picker
        title="职位选择"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </sp-popup>
  </div>
</template>
<script>
import {
  Button,
  Toast,
  TopNavBar,
  Bottombar,
  BottombarButton,
  Form,
  Field,
  Sticky,
  Image,
  Icon,
  Popup,
  Picker,
} from '@chipspc/vant-dgg'
import { checkPhone, checkAuthCode, getCode } from '@/utils/check.js'
export default {
  name: 'Cooperation',
  components: {
    [Button.name]: Button,
    [TopNavBar.name]: TopNavBar,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Form.name]: Form,
    [Field.name]: Field,
    [Sticky.name]: Sticky,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  data() {
    return {
      btnText: '获取验证码',
      timer: null,
      form: {
        contactsName: '',
        companyName: '',
        position: '',
        companyAddress: '',
        phone: '',
        code: '',
      },
      introduceData: [
        {
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg',
          title: '免费平台入驻',
          desc: '免费资质全方位资质评估，资质价值一览无余',
        },
        {
          imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
          title: '丰富的买家资质',
          desc: '全国线下6000+专业企服规划师，线上千万级浏览量',
        },
        {
          imgUrl: 'https://img.yzcdn.cn/vant/apple-3.jpg',
          title: '专业企服规划师培训体系',
          desc: '政策咨询，资质估价，专业风险评估',
        },
      ],
      correctPhone: false,
      showPop: false, // 下拉选择职位
      columns: [
        '某某职位',
        '某某职位',
        '某某职位',
        '某某职位',
        '某某职位',
        '某某职位',
        '某某职位',
        '某某职位',
      ],
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 校验手机号
    checkTel(val) {
      this.correctPhone = checkPhone(val)
      return this.correctPhone
    },
    // 校验验证码
    checkCode(code) {
      return checkAuthCode(code)
    },
    // 获取验证码
    getPhoneCode() {
      // TODO:获取验证码成功后，改变按钮文字
      getCode(this.form.phone)
    },
    // 选择职位
    selectPosition() {
      this.showPop = true
    },
    onConfirm(value, index) {
      this.form.position = value
      this.showPop = false
    },
    onCancel() {
      this.showPop = false
    },
    submit() {
      console.log('提交')
    },
  },
}
</script>
<style lang="less" scoped>
.cooperation {
  width: 100%;
  padding-bottom: 160px;
  &-top {
    width: 100%;
    height: 200px;
    background: #10bbb8;
    text-align: right;
    padding: 50px 40px 0px 0px;
    &-title {
      font-size: 50px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 56px;
    }
    &-desc {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 20px;
    }
  }
  &-form {
    padding: 52px 40px 0px;
    border-bottom: 23px solid #f8f8f8;
    &-title {
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 24px;
    }
    /deep/.sp-cell {
      padding: 36px 0px;
      &::after {
        left: 0;
        right: 0;
      }
    }
    /deep/.sp-field__label {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    /deep/.sp-field__control {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
      &::-webkit-input-placeholder {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #cccccc;
      }
    }
    &-button {
      border: 0;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4974f5;
    }
  }
  &-introduce {
    padding: 50px 40px 0px;
    &-title {
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 24px;
    }
    &-item {
      text-align: center;
      &-title {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        margin-top: 20px;
      }
      &-desc {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: 16px;
        margin-bottom: 60px;
      }
    }
  }
  /deep/.sp-bottombar {
    height: 96px;
    padding: 32px 40px;
    z-index: 999;
    &-button {
      height: 96px;
      font-family: PingFang SC;
    }
  }
}
</style>
