<template>
  <div class="quotation_scheme">
    <div class="title_bottom">
      <div class="title_bottom_button" @click="show = true">报价方案</div>
    </div>
    <sp-action-sheet v-model="show" safe-area-inset-bottom title="报价方案">
      <div class="content">
        <div class="sum">
          <div class="name">整体费用</div>
          <div class="price">{{ sum }}</div>
          <div class="unit">元</div>
        </div>

        <div v-for="(item, index) of info" :key="index" class="list">
          <div class="icon"></div>
          <div class="name">{{ item.name }}</div>
          <div class="price">{{ item.amount / 100 }}</div>
          <div class="unit">元</div>
        </div>
      </div>
    </sp-action-sheet>
  </div>
</template>

<script>
import { ActionSheet } from '@chipspc/vant-dgg'
export default {
  components: {
    [ActionSheet.name]: ActionSheet,
    // SpIcon: Icon,
  },
  props: {
    info: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    sum() {
      if (this.info.length > 0) {
        let sum = 0
        this.info.map((item) => {
          sum += parseFloat(item.amount) / 100 || 0
        })
        return sum.toFixed(2)
      }
      return 0
    },
  },
}
</script>

<style lang="less" scoped>
.quotation_scheme {
  .title_bottom_button {
    height: 96px;
    line-height: 96px;
    background: #4974f5;
    border-radius: 8px;

    font-family: PingFangSC-Medium;
    font-weight: bold;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
  }
  ::v-deep .sp-action-sheet__header--title {
    font-family: PingFangSC-Medium;
    font-weight: bold;
    font-size: 40px;
    color: #222222;
  }
  ::v-deep .sp-action-sheet__close {
    color: #222222;
  }

  .sp-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  .content {
    font-family: PingFangSC-Regular;
    padding: 30px 40px 40px;
    font-size: 0;
    max-height: 60vh;
    min-height: 400px;
    overflow: auto;

    .sum {
      display: flex;
      align-items: center;
      padding: 31px 0;
      .name {
        flex: 1;
        font-weight: bold;
        font-size: 34px;
        color: #1a1a1a;
        line-height: 34px;
        margin: 0 14px;
      }
      .price {
        font-weight: bold;
        font-size: 44px;
        color: #ec5330;
        line-height: 44px;
      }
      .unit {
        font-weight: bold;
        font-size: 44px;
        color: #ec5330;
        letter-spacing: 0;

        transform-origin: left center;
        transform: scale(0.75);
      }
    }
    .list {
      display: flex;
      align-items: center;
      padding: 34px 0;
      .icon {
        width: 20px;
        height: 20px;
        background: url(https://cdn.shupian.cn/sp-pt/wap/images/5g6jbb872x00000.png)
          no-repeat;
        background-size: 100%;
        // background-color: rgba(73, 116, 245, 1);
        // border: 4px solid rgba(73, 116, 245, 0.1);
        // border-radius: 100%;
      }

      .name {
        flex: 1;
        font-size: 28px;
        color: #222222;
        letter-spacing: 0;
        line-height: 28px;
        margin: 0 14px;
      }

      .price {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #222222;
        text-align: right;
        line-height: 32px;
      }

      .unit {
        font-size: 32px;
        color: #1a1a1a;
        letter-spacing: 0;
        text-align: center;
        line-height: 32px;
        transform-origin: left bottom;
        transform: scale(0.8);
      }
    }
  }
}
</style>
