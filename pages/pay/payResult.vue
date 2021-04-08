<template>
  <section>
    <div class="banner">
      <my-icon
        class="back-icon"
        name="nav_ic_back"
        size="0.4rem"
        color="rgba(26, 26, 26, 1)"
        @click.native="onLeftClick"
      ></my-icon>
      <p v-if="payStatus" class="title title1">
        <my-icon
          name="pay_ic_fail"
          size="0.4rem"
          color="rgba(241, 82, 78, 1)"
        ></my-icon>
        支付失败
      </p>
      <p v-else class="title title1">
        <my-icon
          name="pay_ic_success"
          size="0.4rem"
          color="rgba(73, 116, 245, 1)"
        ></my-icon>
        支付成功
      </p>

      <p v-if="payStatus" class="toast">
        请尽快完成付款，超过订单付款期限，<br />
        系统将自动取消订单
      </p>
      <p v-else class="toast">
        本次支付已完成，付款5000元，<br />
        详细信息请点击查看订单
      </p>
      <div class="btn-area">
        <sp-button class="btn1">查看订单</sp-button>
        <sp-button v-if="payStatus" class="btn3" @click="againPay"
          >重新支付</sp-button
        >
        <sp-button v-else class="btn2">返回首页</sp-button>
      </div>
    </div>
    <div class="list"></div>
    <div class="body_container">
      <div class="recommend">为你推荐</div>
      <div class="recommend_list">
        <div
          v-for="(item, index) in itemsData"
          :key="index"
          class="recommend_item"
        >
          <div class="item_lf">
            <div class="hot">{{ item.span1 }}</div>
          </div>
          <div class="item_rt">
            <div class="item_title">{{ item.title }}</div>
            <div class="item_span">
              <span>{{ item.span2 }}</span>
              <span>{{ item.span3 }}</span>
              <span>{{ item.span4 }}</span>
            </div>
            <div class="item_content">
              顶呱呱集团专业会计师团队代账，服务快...
            </div>
            <div class="item_money">
              <div class="money_num">{{ item.money }}</div>
              <div class="money_icon">元</div>
              <div class="sale_num">半年销量 {{ item.sold_num }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import { pay } from '@/api'
export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      responseData: [],
      formData: {
        payCusId: 10000000,
      }, // 请求数据
      payStatus: false,
      itemsData: [
        {
          span1: '热卖',
          title: '0元购小规模代理记账',
          span2: '极速办理',
          span3: '官方保障',
          span4: '专业高效',
          money: '1500',
          sold_num: '123541',
        },
        {
          span1: '热卖',
          title: '四川省成都市*****科技有限公司',
          span2: '极速办理',
          span3: '官方保障',
          span4: '专业高效',
          money: '1500',
          sold_num: '123541',
        },
        {
          span1: '热卖',
          title: '0元购小规模代理记账',
          span2: '极速办理',
          span3: '官方保障',
          span4: '专业高效',
          money: '1500',
          sold_num: '123541',
        },
      ],
    }
  },
  mounted() {
    // this.payStatus = Math.floor(Math.random() * 2)
    this.payStatus = this.$route.query.payStatus
    console.log('this.payStatus', this.payStatus)
    pay
      .enablePayMoney({ axios: this.$axios }, this.formData)
      .then((result) => {
        console.log('result的值', result)
        this.responseData = result.data
      })
      .catch((e) => {
        if (e.code !== 200) {
          console.log(e)
        }
      })
  },
  methods: {
    onLeftClick() {
      this.$router.go(-1)
    },
    againPay() {
      this.$router.replace('/pay/payType')
    },
  },
}
</script>

<style lang="less" scoped>
.banner {
  background: #f4f4f4;
  position: relative;
  padding-top: 88px;
  .back-icon {
    position: absolute;
    left: 40px;
    top: 20px;
    color: white;
  }
  .title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 44px;
    text-align: center;
    margin-bottom: 20px;
  }
  .toast {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 36px;
    text-align: center;
  }
  .btn-area {
    display: flex;
    justify-content: space-between;
    margin: 40px auto 0 auto;
    width: 60%;
    height: 120px;
    .sp-button {
      width: 210px;
      height: 72px;
      border-radius: 4px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      background: none;
    }
    .btn1 {
      color: #555555;
      border: 1px solid #cdcdcd;
    }
    .btn2 {
      border: 1px solid #4974f5;
      border-radius: 4px;
      color: #4974f5;
    }
    .btn3 {
      background: #fa5741;
      border-radius: 4px;
      color: #ffffff;
      border: none;
    }
  }
}
.body_container {
  padding: 48px 40px 0 40px;
  .recommend {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    margin-bottom: 7px;
  }
  .recommend_item {
    display: flex;
    justify-content: flex-start;
    padding: 32px 0;
    .item_lf {
      width: 160px;
      height: 160px;
      background: red;
      border-radius: 8px;
      position: relative;
      margin-right: 32px;
      .hot {
        position: absolute;
        top: 0;
        left: 0;
        height: 44px;
        background: #fa5741;
        border-radius: 8px 0px 8px 0px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 44px;
        padding: 0 13px;
      }
    }
    .item_rt {
      flex: 1;
      .item_title {
        width: 401px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-bottom: 15px;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        white-space: nowrap;
        height: 32px;
        line-height: 32px;
      }
      .item_span {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 15px;
        line-height: 28px;
        height: 28px;
        span {
          background: #f0f2f5;
          border-radius: 4px;
          padding: 0 5px;
          margin-right: 14px;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          // line-height: 28px;
        }
      }
      .item_content {
        width: 411px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        margin-bottom: 18px;
        height: 23px;
        line-height: 23px;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        white-space: nowrap;
      }
      .item_money {
        display: flex;
        // justify-content: center;
        align-items: center;
        .money_num {
          height: 24px;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
          line-height: 24px;
        }
        .money_icon {
          // width: 21px;
          // height: 19px;
          height: 22px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ec5330;
          line-height: 22px;
          margin: 4px 0 0 4px;
        }
        .sale_num {
          height: 22px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 22px;
          margin-left: 18px;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>
