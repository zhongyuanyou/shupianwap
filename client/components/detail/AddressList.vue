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
                <span
                  v-for="(attributes, i) of item.attribute"
                  :key="i"
                  v-text="attributes"
                ></span>
              </div>
              <div>销售价：<span v-text="item.price"></span></div>
            </div>
            <template #right-icon>
              <sp-radio ref="checkboxes" :name="item" />
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
import { RadioGroup, Radio, Cell, CellGroup, Button } from '@chipspc/vant-dgg'
export default {
  name: 'AddressList',
  components: {
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
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
    }
  },

  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onSubmit() {
      //  提交选择信息
      console.log(this.result)
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
      bottom: 24px;
      right: 40px;
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
