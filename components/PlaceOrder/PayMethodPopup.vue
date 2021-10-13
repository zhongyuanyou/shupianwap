<template>
  <div v-show="show" class="popup">
    <Popup
      v-model="show"
      position="bottom"
      :close-on-click-overlay="false"
      round
      @click-overlay="close(false)"
    >
      <div class="box">
        <div class="head">
          <h1 v-if="title">{{ title }}</h1>
          <Icon v-if="closeIcon" name="cross" size="22" @click="close(false)" />
        </div>
        <div class="databox">
          <div
            v-for="(item, index) of list"
            :key="index"
            class="list"
            :class="{ active: item.value == value }"
            @click="submit(item)"
          >
            {{ item.text }}
          </div>
          <div class="line"></div>
          <div class="list cancel" @click="close">取消</div>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import {
  Popup,
  Icon,
  RadioGroup,
  Radio,
  Toast,
  Button,
} from '@chipspc/vant-dgg'
import { order } from '@/api/index'
export default {
  name: 'PlaceOrderPopup',
  components: {
    Popup,
    Icon,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Button.name]: Button,
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return false
      },
    },

    title: {
      type: String,
      default() {
        return '订单提交以后支付方式不可更改'
      },
    },

    closeIcon: {
      type: Boolean,
      default() {
        return false
      },
    },

    list: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      checkarr: '',
    }
  },
  computed: {},

  mounted() {},
  methods: {
    checkitem(item, index) {},
    close() {
      this.$emit('close')
    },
    submit(item) {
      this.$emit('change', item)
      this.close()
    },
  },
}
</script>

<style lang="less" scoped>
.popup {
  .box {
    // padding: 20px 0;
    box-sizing: border-box;
    > .head {
      padding: 0 40px;
      display: flex;
      align-items: center;
      height: 114px;
      // line-height: 114px;
      box-sizing: border-box;
      > h1 {
        flex: 1;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #999999;
        letter-spacing: 0;
        text-align: center;
      }
    }

    .databox {
      // height: calc(67vh - 324px);

      .list {
        background: #ffffff;

        font-family: PingFangSC-Medium;
        font-weight: bold;
        font-size: 32px;
        color: #222222;
        text-align: center;
        line-height: 112px;
        height: 112px;
      }

      .line {
        height: 24px;
        background: #f5f5f5;
      }
    }
  }

  ::v-deep .sp-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
