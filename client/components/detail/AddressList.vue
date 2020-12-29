<template>
  <div class="address-list">
    <div class="addres-item">
      <sp-radio-group v-model="result">
        <sp-cell-group>
          <sp-cell
            v-for="(item, index) in list"
            :key="index"
            clickable
            @click="toggle(index)"
          >
            <div class="content">
              <div v-text="item.title"></div>
              <div>
                <!-- 循环属性 -->
                <span v-for="field of item.fieldList" :key="field.fieldCode">{{
                  `${field.fieldName}:${field.fieldValue}`
                }}</span>
              </div>
              <div>销售价：<span v-text="item.goodsPrice"></span></div>
            </div>
            <template #right-icon>
              <sp-radio ref="checkboxes" :name="item">
                <template #icon="{ checked }">
                  <sp-icon
                    class-prefix="spiconfont"
                    size="0.28rem"
                    :name="checked ? 'login_ic_radio_s' : 'login_ic_radio_n'"
                    :color="checked ? '#4974F5' : '#CCCCCC'"
                  />
                </template>
              </sp-radio>
            </template>
          </sp-cell>
        </sp-cell-group>
      </sp-radio-group>
      <div class="submit">
        <sp-button color="#4974F5" block @click="onSubmit()">
          确认选择
        </sp-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  RadioGroup,
  Radio,
  Cell,
  CellGroup,
  Button,
  Icon,
} from '@chipspc/vant-dgg'
export default {
  name: 'AddressList',
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      result: [],
      lastIndex: -1,
    }
  },

  methods: {
    toggle(index) {
      // 保持只有一个选项
      if (this.lastIndex > -1 && index !== this.lastIndex) {
        this.$refs.checkboxes[this.lastIndex].toggle(false)
      }
      this.lastIndex = index

      this.$refs.checkboxes[index].toggle()
    },
    onSubmit() {
      //  提交选择信息
      console.log(this.result)
      this.$emit('operation', {
        type: 'confirm',
        data: this.result,
      })
    },
  },
}
</script>
<style lang="less" scoped>
.address-list {
  .addres-item {
    .content {
      div:first-child {
        color: #1a1a1a;
        font-size: 30px;
        line-height: 38px;
      }
      div:nth-child(2) {
        color: #222222;
        font-size: 22px;
        line-height: 44px;
        span:not(:last-child):after {
          content: ' | ';
        }
      }
      div:last-child {
        color: #ec5330;
        font-size: 26px;
        line-height: 44px;
      }
    }
    .submit {
      position: fixed;
      bottom: 0px;
      padding: 10px 40px 24px;
      width: 100%;
      background-color: #fff;
      /deep/.sp-button {
        width: 670px;
        height: 104px;
        border-radius: 8px;
      }
    }
    .sp-cell {
      padding: 31px 40px 31px 43px;
    }

    .sp-cell:first-child {
      padding-top: 15px;
    }
  }
}
</style>
