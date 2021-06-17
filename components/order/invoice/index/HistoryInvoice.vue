<template>
  <div class="all_invoice">
    <div v-for="item of list" :key="item.id" class="card">
      <div class="card_header flex">
        <div class="card_time flex_1">{{ item.number }}</div>
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
        <div class="flex_1"></div>
        <div>2.3333元</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
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
          name: '',
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
.all_invoice {
  background: #f5f5f5;
  overflow: hidden;
  padding: 0 0 20px;
  .flex {
    display: flex;
  }
  .flex_1 {
    flex: 1;
  }
  .unit {
    font-size: 20px;
    line-height: 20px;
  }
  .card {
    margin-top: 20px;
    padding: 32px 40px;
    background: #ffffff;
    .card_header {
      .card_time {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
    }

    .card_price {
    }
    .card_footer {
      text-align: right;
    }
  }
}
</style>
