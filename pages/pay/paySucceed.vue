<template>
  <div class="container">
    <div class="header_container">
      <div class="header">
        <my-icon
          name="nav_ic_back"
          class="back_icon"
          color="#1A1A1A"
          size="0.38rem"
        ></my-icon>
        <div class="finish">完成</div>
      </div>
      <div class="md_body_t">
        <my-icon
          name="popup_img_success"
          color="#4974f5"
          size="0.4rem"
          class="body_icon"
        ></my-icon>
        <div class="body_content">支付成功</div>
      </div>
      <div class="md_body_m">
        本次支付已完成，付款 5000元， 详细信息请点击查看订单
      </div>
      <div class="md_body_b">
        <div class="button_one">查看订单</div>
        <div class="button_two">返回首页</div>
      </div>
    </div>
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
  </div>
</template>
<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;
  .header_container {
    width: 100%;
    height: 426px;
    background: #f8f8f8;
    .header {
      width: 100%;
      height: 88px;
      background: #f8f8f8;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .back_icon {
        position: absolute;
        top: 28px;
        left: 32px;
        width: 40px;
        height: 33px;
        //   line-height: 33px;
      }

      .finish {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #4974f5;
        margin-right: 40px;
      }
    }
    .md_body_t {
      display: flex;
      // align-items: center;
      justify-content: center;
      margin: 25px 0 31px 0;
      .body_icon {
        width: 40px;
        height: 40px;
      }
      .body_content {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        margin-left: 14px;
      }
    }
    .md_body_m {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      width: 363px;
      height: 61px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 32px;
      text-align: center;
    }
    .md_body_b {
      height: 72px;
      display: flex;
      justify-content: center;
      margin-top: 46px;
      .button_one {
        width: 210px;
        height: 72px;
        background: #f8f8f8;
        border: 1px solid #cdcdcd;
        border-radius: 4px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 72px;
        text-align: center;
      }
      .button_two {
        width: 210px;
        height: 72px;
        background: #f8f8f8;
        border: 1px solid #4974f5;
        border-radius: 4px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #4974f5;
        margin-left: 24px;
        line-height: 72px;
        text-align: center;
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
}
</style>

<script>
import { CountDown, Sticky, Checkbox } from '@chipspc/vant-dgg'
export default {
  name: 'PaySucceed',
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      time: '',
      zfb_checked: true,
      wechat_checked: false,
      checked: false,
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
}
</script>
