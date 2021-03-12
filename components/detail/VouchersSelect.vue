<template>
  <div class="container">
    <div class="cell" @click="show = true">
      <div class="cell_left">
        <div class="label">优惠</div>
        <div class="content">
          <template v-if="vouchers">
            <span class="tag">领券</span>
            <span class="hide">{{ vouchers }}</span>
          </template>
          <div v-else class="not_vouchers">暂无可用优惠券</div>
        </div>
      </div>
      <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
    </div>
    <div class="cell" @click="skuShow = true">
      <div class="cell_left">
        <div class="label">选择</div>
        <div class="content">锦江区，其它，有注册经营地址</div>
      </div>
      <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
    </div>
    <div class="cell" @click="safeguardShow = true">
      <div class="cell_left">
        <div class="label">保障</div>
        <div class="content">
          <span
            v-for="item in ['官方服务', '售后保障', '极速退款']"
            :key="item"
            class="item"
            >{{ item }}</span
          >
        </div>
      </div>
      <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
    </div>
    <sp-popup
      v-model="show"
      closeable
      round
      position="bottom"
      :style="{ maxHeight: '1067px' }"
    >
      <p class="popup_title">优惠</p>
      <div class="popup_box">
        <p class="p1">优惠预估</p>
        <p class="p2">使用以下优惠券后预估价<span>720.00元</span></p>
        <div class="vouchers_box">
          <p class="vouchers_box_title">可领取优惠券</p>
          <div class="vouchers_list">
            <div
              v-for="item in 5"
              :key="item"
              class="vouchers_item"
              :class="{ over: item == 1, receive: item == 2 }"
            >
              <div class="vouchers_item_left">
                <div class="amount">99</div>
                <div class="conditions">无门槛</div>
              </div>
              <div class="vouchers_item_right">
                <div class="vouchers_title">新用户通用券</div>
                <div class="vouchers_desc">全品类通用</div>
                <div class="vouchers_date">2020.09.01-2020.09.31</div>
                <div class="vouchers_bt">
                  {{ item == 1 ? '已领完' : item == 2 ? '已领取' : '立即领取' }}
                </div>
              </div>
            </div>
          </div>
          <div class="vouchers_tips">
            上述优惠预估仅为系统初步预估，不代表最终价格，请以订单实际价格为准。若有疑惑，请<span
              >联系客服</span
            >
          </div>
        </div>
      </div>
    </sp-popup>
    <sp-popup
      v-model="skuShow"
      round
      closeable
      padding
      position="bottom"
      :style="{ padding: '0.4rem 0.4rem' }"
    >
      <div class="sku_box">
        <div class="goods_info">
          <sp-image
            width="1.8rem"
            height="1.8rem"
            fit="cover"
            lazy-load
            src=""
          />
          <div class="goods_info_right">
            <div class="price">895 <span>元</span></div>
            <div class="code">编号 191015773</div>
          </div>
        </div>
        <div class="attrs_box">
          <div class="attrs_item">
            <div class="attrs_item_title">区域</div>
            <div class="attrs_item_value">锦江区</div>
          </div>
          <div class="attrs_item">
            <div class="attrs_item_title">地址情况</div>
            <div class="attrs_item_value">有注册地址</div>
          </div>
        </div>
        <div class="buy_num_box">
          <div class="buy_num_title">购买数量</div>
          <div class="count_box">
            <div class="count_reduce" @click="countReduce"></div>
            <div class="count">{{ num }}</div>
            <div class="count_add" @click="countAdd"></div>
          </div>
        </div>
        <div class="cart_buy_box">
          <div class="bt" @click="addCart">加入购物车</div>
          <div class="bt" @click="nowBuy">立即购买</div>
        </div>
      </div>
    </sp-popup>
    <sp-popup
      v-model="safeguardShow"
      title="平台保障"
      round
      closeable
      padding
      position="bottom"
      :style="{ padding: '25px 20px' }"
    >
      <sp-safeguard :options="options" success ellipsis></sp-safeguard>
    </sp-popup>
  </div>
</template>

<script>
import { Cell, Popup, Safeguard, Image } from '@chipspc/vant-dgg'
export default {
  name: 'VouchersSelect',
  components: {
    [Cell.name]: Cell,
    [Popup.name]: Popup,
    [Safeguard.name]: Safeguard,
    [Image.name]: Image,
  },
  data() {
    return {
      vouchers: '满400元减10元， 满1000元减30元',
      show: false,
      skuShow: false,
      safeguardShow: false,
      options: [
        {
          text: '由顶呱呱作为居间担保，12年专业企服领域，大品牌，值 得信赖',
          title: '担保交易',
          icon: 'sign',
        },
        {
          text: '为保障交易双方权益和交易产物安全，交易时需签署买卖交易合同',
          title: '签署合同',
          icon: 'sign',
        },
        {
          text:
            '交易时资金需暂时托管到薯片，待买方确认交易信息完全无误或买方签署合同并确认之后，打款到卖方，全程公平公正',
          title: '资金保障',
          icon: 'sign',
        },
      ],
      num: 1,
    }
  },
  methods: {
    // 减少数量
    countReduce() {
      if (this.num > 1) {
        this.num--
      }
    },
    // 增加数量
    countAdd() {
      this.num++
    },
    // 加入购物车
    addCart() {},
    // 立即购买
    nowBuy() {},
  },
}
</script>

<style lang="less" scoped>
.container {
  font-family: PingFang SC;
  font-weight: 400;
  background-color: #ffffff;
  border-bottom: 24px solid #f8f8f8;
  .cell {
    padding: 0 40px 0 39px;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f4f4f4;
    &:last-child {
      border-bottom: none;
    }
    &_left {
      display: flex;
      align-items: center;
      flex: 1;
      .label {
        color: #999999;
        font-size: 26px;
        margin-right: 40px;
      }
      .content {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
        color: #222222;
        font-size: 26px;
        .tag {
          display: inline-block;
          width: 60px;
          height: 32px;
          line-height: 32px;
          background-color: #feefef;
          color: #f1524e;
          font-size: 22px;
          text-align: center;
          margin-right: 9px;
        }
        .hide {
          width: 432px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .not_vouchers {
          color: #cccccc;
        }
        .item {
          margin-right: 40px;
          &::before {
            content: '1';
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            border-radius: 50%;
            text-align: center;
            border: 1px solid #cccccc;
            color: #cccccc;
            font-size: 16px;
            margin-right: 12px;
          }
          &:nth-child(2)::before {
            content: '2';
          }
          &:nth-child(3)::before {
            content: '3';
          }
        }
      }
    }
  }
  .sku_box {
    .goods_info {
      display: flex;
      &_right {
        margin-left: 24px;
        padding-top: 20px;
        .price {
          color: #ec5330;
          font-size: 40px;
          font-weight: bold;
          margin-bottom: 18px;
          span {
            font-size: 22px;
          }
        }
        .code {
          color: #999999;
          font-size: 24px;
        }
      }
    }
    .attrs_box {
      .attrs_item {
        font-size: 0;
        padding-bottom: 32px;
        border-bottom: 1px solid #f4f4f4;
        &_title {
          color: #222222;
          font-size: 28px;
          font-weight: bold;
          margin: 32px 0 30px;
        }
        &_value {
          display: inline-block;
          padding: 0 27px;
          min-width: 156px;
          height: 64px;
          font-size: 26px;
          color: #4974f5;
          text-align: center;
          line-height: 64px;
          border: 1px solid #4974f5;
          background-color: rgba(73, 116, 245, 0.08);
          border-radius: 4px;
        }
      }
    }
    .buy_num_box {
      padding: 32px 0;
      border-bottom: 1px solid #f4f4f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .buy_num_title {
        color: #222222;
        font-size: 28px;
        font-weight: bold;
      }
      .count_box {
        display: flex;
        height: 64px;
        background-color: #f8f8f8;
        .count_reduce {
          position: relative;
          width: 72px;
          &::before {
            content: '';
            position: absolute;
            left: 24px;
            top: 31px;
            width: 24px;
            height: 3px;
            background-color: #cdcdcd;
          }
        }
        .count {
          width: 96px;
          color: #222222;
          font-size: 30px;
          font-weight: bold;
          text-align: center;
          line-height: 64px;
          margin: 0 2px;
        }
        .count_add {
          position: relative;
          width: 72px;
          &::before {
            content: '';
            position: absolute;
            left: 24px;
            top: 31px;
            width: 24px;
            height: 3px;
            background-color: #cdcdcd;
          }
          &::after {
            content: '';
            position: absolute;
            left: 35px;
            top: 20px;
            width: 3px;
            height: 24px;
            background-color: #cdcdcd;
          }
        }
      }
    }
    .cart_buy_box {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      color: #ffffff;
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      line-height: 100px;
      .bt {
        width: 327px;
        border-radius: 8px;
        background-color: #fe8c29;
        &:last-child {
          background-color: #ec5330;
        }
      }
    }
  }
  .popup_title {
    color: #222222;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    padding: 48px 0;
  }
  /deep/.sp-popup__close-icon--top-right {
    top: 56px;
    right: 40px;
  }
  .popup_box {
    padding: 0 40px;
    .p1 {
      color: #222222;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 24px;
    }
    .p2 {
      color: #222222;
      font-size: 26px;
      font-weight: 400;
      margin-bottom: 32px;
      span {
        color: #ec5330;
      }
    }
    .vouchers_box {
      max-height: 820px;
      overflow-y: auto;
      padding-bottom: 54px;
      &_title {
        padding-top: 30px;
        color: #222222;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 24px;
      }
      .vouchers_list {
        .vouchers_item {
          display: flex;
          margin-bottom: 24px;
          width: 670px;
          height: 212px;
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
          background-size: 100% 100%;
          &_left {
            width: 200px;
            padding-top: 30px;
            text-align: center;
            .amount {
              font-size: 72px;
              color: #ffffff;
              font-family: Bebas;
              margin-bottom: 20px;
            }
            .conditions {
              color: #ffffff;
              font-size: 24px;
            }
          }
          &_right {
            flex: 1;
            position: relative;
            padding-left: 24px;
            padding-top: 30px;
            .vouchers_title {
              color: #222222;
              font-size: 32px;
              font-weight: bold;
              margin-bottom: 18px;
            }
            .vouchers_desc {
              color: #555555;
              font-size: 24px;
              width: 251px;
              line-height: 32px;
              min-height: 56px;
              margin-bottom: 10px;
            }
            .vouchers_date {
              color: #999999;
              font-size: 20px;
            }
            .vouchers_bt {
              position: absolute;
              top: 79px;
              right: 32px;
              width: 132px;
              height: 54px;
              text-align: center;
              line-height: 54px;
              color: #ffffff;
              font-size: 24px;
              border-radius: 27px;
              background-color: #ec5330;
              color: #ffffff;
            }
          }
        }
        .over {
          background-image: url('https://cdn.shupian.cn/sp-pt/wap/8j18z03j8c00000.png');
          .vouchers_bt {
            background-color: #cccccc;
            color: #ffffff;
          }
        }
        .receive {
          .vouchers_bt {
            background-color: #fdedea;
            border: 1px solid #ec5330;
            color: #ec5330;
          }
        }
      }
      .vouchers_tips {
        margin-top: 46px;
        color: #999999;
        font-size: 22px;
        span {
          color: #4974f5;
        }
      }
    }
  }
}
</style>
