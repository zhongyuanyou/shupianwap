<template>
  <div class="card">
    <div class="card-content">
      <h3>免费查询公司名称能否注册</h3>
      <sp-cell
        title-class="down-left"
        :value-class="
          selectValue == '请选择' ? 'down-right' : 'down-right_active'
        "
        :value="selectValue"
        is-link
        :border="false"
        arrow-direction="down"
        title="单元格"
        @click="downShow = true"
      >
        <!-- <template #default> 56646 </template> -->
      </sp-cell>
      <sp-action-sheet
        v-model="downShow"
        :actions="actions"
        @select="onSelect"
      />
      <div class="input-phone">
        <sp-cell-group @click="focus = verificationShow = true">
          <sp-field
            v-model="phoneValue"
            label="手机号"
            placeholder="信息保护中，仅官方可见"
            label-class="style-phone"
          />
        </sp-cell-group>
        <div v-show="verificationShow" class="input-verification">
          <sp-field
            v-model="sms"
            center
            clearable
            label="验证码"
            placeholder="请输入验证码"
            label-class="style-phone"
          >
            <template #button>
              <span class="verification">获取验证码</span>
            </template>
          </sp-field>
        </div>
      </div>
      <div class="button">
        <sp-button type="primary" block size="small">主要按钮</sp-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Image,
  Cell,
  CellGroup,
  ActionSheet,
  Toast,
  Icon,
  Field,
  Button,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      selectValue: '请选择',
      phoneValue: '',
      sms: '',
      verificationShow: false,
      downShow: false,
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.downShow = false
      this.selectValue = item.name
      Toast(item.name)
    },
  },
}
</script>
<style lang="less" scoped>
.card {
  .card-content {
    margin: 8px auto;
    border-radius: 8px;
    width: 670px;
    background-color: #fff;
    display: block;
    position: relative;
    padding: 0 40px 34px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.8);
    text-align: center;
    h3 {
      font-size: 32px;
      height: 110px;
      line-height: 110px;
      padding: 0 10px;
      color: #1a1a1a;
      &:before {
        content: '';
        display: inline-block;
        width: 48px;
        height: 2px;
        margin-right: 14px;
        vertical-align: middle;
        background: linear-gradient(to left, #918f8f, #fff);
      }
      &::after {
        content: '';
        display: inline-block;
        width: 48px;
        height: 2px;
        margin-left: 14px;
        vertical-align: middle;
        background: linear-gradient(to right, #918f8f, #fff);
      }
    }
    // 表单下拉
    .sp-cell {
      background-color: #f8f8f8;
      border-radius: 5px;
      padding: 16px 16px;
      .down-left {
        display: inline-block !important;
        margin-right: 16px;
        color: #1a1a1a;
        flex: 0 0 20%;
      }

      .down-right {
        display: inline-block;
        color: #cccccc;
        text-align: left;
      }
      .down-right_active {
        display: inline-block;
        width: 166px !important;
        color: #1a1a1a;
        text-align: left;
      }
    }
    /deep/.input-phone,
    .input-verification {
      margin: 24px 0 40px 0;
      .style-phone {
        width: 112px;
        margin-right: 8px;
        text-align: center;
        color: #1a1a1a;
      }
      //输入框
      .sp-field__control {
        &::-webkit-input-placeholder {
          font-size: 28px;
          font-weight: 400;
          color: #cccccc;
          line-height: 44px;
        }
      }
    }
    /deep/.input-verification {
      .sp-field__button {
        font-size: 28px;
        font-weight: 400;
        color: #4974f5;
      }
    }
  }
}
</style>
