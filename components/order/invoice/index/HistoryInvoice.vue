<template>
  <div class="history_invoice">
    <div v-for="item of list" :key="item.id" class="card">
      <div class="card_header flex">
        <div class="card_time flex_1">
          <my-icon
            name="details_ic_time"
            size="0.24rem"
            color="#CCCCCC"
            class="myIcon details_ic_time"
          />{{ item.time }}
        </div>
        <div>
          <my-icon
            name="order_ic_listnext"
            size="0.24rem"
            color="#CCCCCC"
            class="myIcon"
          />
        </div>
      </div>
      <div class="card_label">
        <span>电子普通发票</span>
      </div>
      <div class="card_footer">
        <div class="flex_1">
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="price">
          2.3333
          <span class="unit">元</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button, Empty } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  data() {
    return {
      list: [
        {
          number: 1,
          name: '11111111111111111111111111111111111111111111111111111111',
          price: 22200,
          time: '2020-20-20 13:45:78',
        },
        {
          number: 2,
          name: '11111111111111111111111111111111111111111111111111111111',
          price: 22200,
          time: '2020-20-20 13:45:78',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.history_invoice {
  background: #f5f5f5;
  overflow: hidden;
  padding: 0 0 20px;
  .flex {
    display: flex;
  }
  .flex_1 {
    flex: 1;
  }

  .card {
    margin-top: 20px;
    padding: 32px 40px;
    background: #ffffff;
    font-size: 0;
    min-width: 0;
    .card_header {
      padding: 0 0 42px;
      .card_time {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
        .details_ic_time {
          margin-right: 8px;
        }
      }
    }
    .card_label {
      padding: 0 0 26px;
      & > span {
        display: inline-block;
        padding: 9px 12px;
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4974f5;
        line-height: 22px;
        background: #f2f5ff;
      }
    }

    .card_footer {
      display: flex;
      min-width: 0;
      .flex_1 {
        min-width: 0;
        overflow: hidden;
        margin-right: 40px;
      }
      .name {
        display: inline-block;
        width: 100%;
        font-size: 32px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 32px;

        .mixin-text-oneoverflow();
      }
      .price {
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 36px;
      }
      .unit {
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 22px;
      }
    }
  }
}
</style>
