<template>
  <div class="all_invoice">
    <div v-for="item of list" :key="item.id" class="card">
      <div class="card_header flex">
        <div class="card_number flex_1">订单编号：{{ item.number }}</div>
        <div class="card_status">已开票</div>
      </div>
      <div v-for="goods of item.goods" :key="goods.id" class="card_item flex">
        <div class="goods_img">
          <sp-image
            width="100%"
            height="100%"
            fit="cover"
            :src="goods.img || 'https://img.yzcdn.cn/vant/cat.jpeg'"
          />
        </div>
        <div class="goods_info flex_1">
          <div class="flex">
            <div class="goods_info_title flex_1">
              1111111111111111111111111111111111111111111
            </div>
            <div class="goods_num goods_price">
              22222<span class="unit">元</span>
            </div>
          </div>

          <div class="flex">
            <div class="goods_info_des flex_1">
              2222222222222222222222222222222222222222222
            </div>
            <div class="goods_num">x1</div>
          </div>

          <div class="flex">
            <div class="goods_info_increment flex_1">
              <span class="goods_info_increment_label">增值服务</span>
              <span class="goods_info_increment_des">加急办理3天完成</span>
            </div>
            <div class="goods_num goods_info_increment_price">100元 x1</div>
          </div>
        </div>
      </div>

      <div class="card_price">
        <span
          >总价 2480<span class="unit">元</span>，优惠 280<span class="unit"
            >元</span
          >
        </span>
        <span>已付款 2200</span>
        <span class="unit">元</span>
      </div>
      <div class="card_footer">
        <sp-button
          plain
          size="small"
          round
          type="default"
          @click="toInvoiceApply"
          >申请开发票</sp-button
        >
        <sp-button plain size="small" round type="default">查看发票</sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem, Image, Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Image.name]: Image,
    [Button.name]: Button,
  },
  data() {
    return {
      list: [
        {
          number: 1,
          status: 1,
          goods: [
            {
              name: '1111111111111111111111111111111111111111111111111',
              img: '',
            },
            {
              name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
              img: '',
            },
          ],
        },
        {
          number: 2,
          status: 2,
          goods: [
            {
              name: '1111111111111111111111111111111111111111111111111',
              img: '',
            },
            {
              name: '1111111111111111111111111111111111111111111111111',
              img: '',
            },
          ],
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
      .card_number {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
      .card_status {
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 24px;

        .success {
          color: #00b365;
        }
        .error {
          color: #ff3b30;
        }
        .warn {
          color: #fe8c29;
        }
      }
    }
    // 每一项的商品
    .card_item {
      padding: 32px 0;
      .goods_img {
        width: 130px;
        height: 130px;
      }
      .goods_info {
        min-width: 0;
        padding: 0 32px 0 24px;
      }
      .goods_info_title {
        padding-bottom: 14px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 28px;
        .mixin-text-oneoverflow();
      }
      .goods_info_des {
        padding-bottom: 26px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 32px;
      }
      .goods_num {
        padding-left: 32px;
        min-width: 120px;
        text-align: right;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
      .goods_price {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        text-align: right;
      }

      .goods_info_increment {
        font-size: 0;
        .goods_info_increment_label {
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 30px;
        }
        .goods_info_increment_des {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 30px;
        }
        .goods_info_increment_price {
          font-size: 22px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 22px;
        }
      }
    }
    .card_price {
      text-align: right;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 24px;
    }
    .card_footer {
      text-align: right;
    }
  }
}
</style>
