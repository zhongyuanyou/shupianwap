<template>
  <div class="pay-page">
    <Banner :order-type="orderType" :order-status="orderStatus" />
    <div class="order-area">
      <ServeItem v-if="orderType !== 3" :order-data="orderData" />
      <div class="price-area">
        <p>
          <span> 商品总额 </span>
          <span class="money">
            {{ orderData.orderTotalMoney || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 活动优惠 </span>
          <span class="money">
            {{ orderData.orderTotalMoney || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 优惠券 </span>
          <span class="money">
            {{ orderData.orderDiscountMoney || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 其他优惠 </span>
          <span class="money">
            {{ orderData.orderDiscountMoney || 0 }}
            元
          </span>
        </p>
      </div>
      <p class="last-money">
        应付金额:
        <span class="pay-money">
          {{ orderData.orderPayableMoney || 0 }}
          元
        </span>
      </p>
    </div>

    <div class="order-info">
      <p>
        <span class="label">订单编号</span>
        <span class="text">{{ orderData.orderNo || '21321313' }}</span>
        <span class="btn">复制</span>
      </p>
      <p>
        <span class="label">下单时间</span>
        <span class="text">{{ orderData.createTime || '2021-02-02' }}</span>
      </p>
      <p>
        <span class="label">支付状态</span>
        <span class="text">未支付</span>
      </p>
      <p>
        <span class="label">合同</span>
        <span class="text">暂无</span>
      </p>
      <p>
        <span class="label">发票</span>
        <span class="text">暂无</span>
      </p>
      <p class="last-p">
        <span class="label">备注</span>
        <span class="text"
          >搞快点啊，等不及了搞快点啊，等不及了搞快点啊，等不及了搞快点啊，等不及了搞快点啊，等不及了搞快点啊，等不及了搞快点啊，等不及了</span
        >
      </p>
    </div>
    <div class="serve-time">
      <p>服务时间：9:00-24:00 周一至周日</p>
      <p class="btn">
        <a href="tel://962540">
          <my-icon
            name="per_ic_customer"
            size="0.28rem"
            color="#222222"
          ></my-icon>
          在线客服
        </a>
      </p>
    </div>
    <div class="btn-area">
      <div class="inner">
        <sp-button @click="handleClickItem(1)">取消订单</sp-button>
        <sp-button @click="handleClickItem(2)">签署合同</sp-button>
        <sp-button class="btn-pay" @click="handleClickItem(3)"
          >立即支付</sp-button
        >
      </div>
    </div>
    <CancelOrder
      ref="cancleOrderModel"
      :order-id="orderData.cusOrderId"
      :order-sku-list="orderData.selectedOrderSkuList"
    />
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import { mapMutations, mapState } from 'vuex'
import Banner from '@/components/order/detail/Banner'
import ServeItem from '@/components/order/detail/ServeItem'
import CancelOrder from '@/components/order/CancelOrder' // 取消订单弹窗
export default {
  components: {
    [Button.name]: Button,
    Banner,
    ServeItem,
    CancelOrder,
  },
  data() {
    return {
      orderId: '',
      orderType: 1,
      orderStatus: 1,
      orderData: {
        productVo: [],
      },
      // 交易资源
      jyList: [
        {
          id: '3113241',
          name: '四川成都******科技有限公司',
          price: 2345,
          goodsNum: 1,
          goodsInfos: [
            {
              key: '所属行业',
              val: '科技信息',
            },
            {
              key: '纳税类型',
              val: '小规模纳税',
            },
            {
              key: '注册资本',
              val: '100W-500W',
            },
            {
              key: '附带资产',
              val: '网站',
            },
          ],
        },
        {
          id: '31132413',
          name: '顶呱呱商标',
          price: 6345,
          goodsNum: 1,
          goodsInfos: [
            {
              key: '商标分类',
              val: '42类-化妆品类',
            },
            {
              key: '商标组合',
              val: '中英文商标',
            },
            {
              key: '使用项目',
              val: '鞋袜衣裤',
            },
          ],
        },
        {
          id: '31132414',
          name: '高级发明专利',
          price: 6345,
          goodsNum: 1,
          goodsInfos: [
            {
              key: '商标分类',
              val: '42类-化妆品类',
            },
            {
              key: '商标组合',
              val: '中英文商标',
            },
            {
              key: '使用项目',
              val: '鞋袜衣裤',
            },
          ],
        },
        {
          id: '31132414',
          name: '顶呱呱family',
          price: 6345,
          goodsNum: 1,
          goodsInfos: [
            {
              key: '公众号分类',
              val: '帅哥美女',
            },
            {
              key: '粉丝数',
              val: '250W',
            },
            {
              key: '使用项目',
              val: '鞋袜衣裤',
            },
          ],
        },
      ],
    }
  },
  created() {
    this.orderType = Math.ceil(Math.random(0, 1) * 3)
    this.orderStatus = Math.ceil(Math.random(0, 1) * 4)
  },
  mounted() {
    this.orderData = this.$store.state.order.orderData
    console.log('this.$route', this.$route)
    this.orderId = this.$route.query.id
    this.orderType = parseInt(this.orderId.charAt(this.orderId.length - 1))
    console.log('this.$orderData', this.orderData)
  },
  methods: {
    onLeftClick() {
      this.$router.go(-1)
    },
    handleClickItem(type, order) {
      this.selectedOrder = order
      switch (type) {
        case 1:
          // 取消订单 无关联订单直接取消
          if (!this.checkHasOtherOrder()) {
            this.$xToast.success('订单取消成功')
          } else {
            // 有关联订单则弹起弹窗
            this.$refs.cancleOrderModel.showPop = true
            this.$refs.cancleOrderModel.modalType = 1
          }
          break
        case 2:
          console.log('2')
          //
          break
        case 3:
          // 立即支付 无关联订单直接支付
          if (!this.checkHasOtherOrder()) this.$router.push('/order/pay')
          else {
            // 有关联订单则弹起弹窗
            this.$refs.cancleOrderModel.showPop = true
            this.$refs.cancleOrderModel.modalType = 2
          }
          break
      }
    },
    // 查询是否有关联订单  0 无 1有
    checkHasOtherOrder() {
      return Math.floor(Math.random(0, 1) * 2)
    },
  },
}
</script>

<style lang="less" scoped>
.pay-page {
  background: #f5f5f5;
  min-height: 100vh;
}
.order-area {
  background: white;
  margin-bottom: 20px;
  padding: 20px 40px 0 40px;
}
.price-area {
  margin-top: 40px;
  p {
    margin-bottom: 20px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .money {
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
.last-money {
  border-top: 1px solid #f4f4f4;
  font-size: 28px;
  text-align: right;
  padding: 40px 0;
  .pay-money {
    font-weight: bold;
    color: #ec5330;
    font-size: 36px;
  }
}
.order-info {
  background: white;
  padding: 40px;
  font-size: 26px;
  p {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    overflow: hidden;
    margin-bottom: 20px;
    span {
      display: block;
      float: left;
    }
    .label {
      width: 140px;
    }
    .text {
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      width: auto;
    }
    .btn {
      margin-left: 40px;
      background: #f4f4f4;
      border-radius: 16px;
      padding: 2px 6px;
      color: #222222;
      font-size: 22px;
    }
  }
  .last-p {
    margin-bottom: 0;
    display: flex;
    .text {
      flex: 1;
      line-height: 36px;
    }
  }
}
.serve-time {
  margin-top: 20px;
  width: 100%;
  height: auto;
  background: #ffffff;
  font-size: 28px;
  color: #999999;
  text-align: center;
  line-height: 90px;
  padding: 0 40px;
  .btn {
    border-top: 1px solid #f4f4f4;
    font-weight: bold;
    a {
      color: #222222;
    }
  }
}
.btn-area {
  margin-top: 20px;
  width: 100%;
  height: 128px;
  background: #ffffff;
  line-height: 0;
  padding: 24px 0;
  .inner {
    float: right;
    width: auto;
    margin-right: 40px;
    .sp-button {
      display: inline-block;
      height: 80px;
      margin-right: -10px;
      border-radius: 8px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .btn-pay {
      background: rgba(236, 83, 48, 1);
      color: white;
      border: none;
    }
  }
}
</style>
