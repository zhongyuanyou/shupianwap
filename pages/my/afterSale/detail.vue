<template>
  <div class="sale-detail">
    <Header title="售后单详情">
      <template #right>
        <span class="recording">处理记录</span>
      </template>
    </Header>
    <div class="container">
      <div class="status-bar">
        <div class="status-bar_box">
          <div class="icon-box">
            <sp-icon
              class-prefix="spiconfont"
              size="0.46rem"
              color="#4974F5"
              name="commodity_ic_ttime"
            ></sp-icon>
          </div>
          <div class="desc">
            <h3>请您确认</h3>
            <p>如未有问题请您点击"<span>确认方案</span>"</p>
          </div>
        </div>
      </div>
      <div class="content">
        <!-- 售后方案 -->
        <div class="content-box">
          <div class="title-row">售后方案</div>
          <div class="row-list">
            <div class="row-list_title">
              <div class="title-lt">
                <div class="mark">换</div>
                <h3>业务变更</h3>
              </div>
              <div class="title-rt">
                <div class="img-box"><img /></div>
                <span>刘雅婷</span>
                <sp-icon
                  class-prefix="spiconfont"
                  size="0.24rem"
                  color="#CCCCCC"
                  name="per_ic_help"
                ></sp-icon>
              </div>
            </div>
            <ul>
              <li>
                <div class="img-box">
                  <img />
                </div>
                <div class="info">
                  <div class="top">
                    <span class="mark">新</span>
                    <span class="title">刻章</span>
                  </div>
                  <div class="center">武侯区；无注册地址；认缴申请税务</div>
                  <div class="bottom">应付 500元，数量 1</div>
                </div>
              </li>
              <li>
                <div class="img-box">
                  <img />
                </div>
                <div class="info">
                  <div class="top">
                    <span class="mark">新</span>
                    <span class="title">刻章</span>
                  </div>
                  <div class="center">武侯区；无注册地址；认缴申请税务</div>
                  <div class="bottom">应付 500元，数量 1</div>
                </div>
              </li>
            </ul>
            <div class="pay-amount">
              总价 2480元，抵扣 280元，<span>还需支付 00元</span>
            </div>
            <div class="refund-amount">
              <div class="title">退款金额：</div>
              <div class="money">100<span>元</span></div>
            </div>
            <div class="tips">退款将在确认方案后在1-5个工作日到账</div>
          </div>
        </div>
        <!-- 售后明细 -->
        <div class="content-box">
          <div class="title-row">售后明细</div>
          <div class="row-list">
            <ul>
              <li>
                <div class="img-box">
                  <img />
                </div>
                <div class="info">
                  <div class="top">
                    <span class="mark blue">换</span>
                    <span class="title">刻章</span>
                  </div>
                  <div class="center">武侯区；无注册地址；认缴申请税务</div>
                  <div class="bottom">应付 500元，实付 500元</div>
                  <div class="refund-money">退款金额 200元</div>
                </div>
              </li>
              <li>
                <div class="img-box">
                  <img />
                </div>
                <div class="info">
                  <div class="top">
                    <span class="mark blue">换</span>
                    <span class="title">刻章</span>
                  </div>
                  <div class="center">武侯区；无注册地址；认缴申请税务</div>
                  <div class="bottom">应付 500元，实付 500元</div>
                  <div class="refund-money">退款金额 200元</div>
                </div>
              </li>
            </ul>

            <div class="total-refund_amount">
              <div class="title">退款金额：</div>
              <div class="money">100<span>元</span></div>
            </div>
          </div>
        </div>
        <!-- 售后信息 -->
        <div class="content-box">
          <div class="info">
            <div class="item-row">
              <h3>售后编号</h3>
              <p>DD201982652586353</p>
              <div class="copy">复制</div>
            </div>
            <div class="item-row">
              <h3>申请时间</h3>
              <p>2020-09-21 12:40</p>
            </div>
            <div class="item-row">
              <h3>关联订单</h3>
              <p>2001</p>
            </div>
            <div class="item-row">
              <h3>售后类型</h3>
              <p>业务变更</p>
            </div>
            <div class="item-row">
              <h3>售后原因</h3>
              <p>办理超期</p>
            </div>
            <div class="item-row">
              <h3>描述问题</h3>
              <div class="question">
                <p>
                  问题描述问题描述问题描述问题描述问题描述问题描述问题描述问题描述
                </p>
                <ul>
                  <li><img /></li>
                  <li><img /></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="footer-btns">
      <button>联系客服</button>
      <button>平台介入</button>
      <button>撤销</button>
      <button>确认方案</button>
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    SpIcon: Icon,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.sale-detail {
  min-height: 100vh;
  background: #f8f8f8;
  padding-bottom: 148px;
  ::v-deep.recording {
    margin-right: 32px;
    font-family: PingFangSC-Medium;
    font-size: 28px;
    color: #1a1a1a;
    font-weight: bold;
  }
  .container {
    .status-bar {
      height: 268px;
      background: #4974f5;
      padding: 40px 40px 0px 40px;
      .status-bar_box {
        display: flex;
        height: 160px;
        background: #ffffff;
        border-radius: 12px;
        padding: 40px;
        .icon-box {
          width: 80px;
          height: 80px;
          background: #f2f5ff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .desc {
          color: #222222;
          margin-left: 28px;
          h3 {
            font-family: PingFangSC-Medium;
            font-size: 32px;
            line-height: 40px;
          }
          p {
            margin-top: 10px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            line-height: 34px;
            span {
              color: #4974f5 !important;
            }
          }
        }
      }
    }
    .content {
      min-height: 400px;
      margin-top: -28px;
      position: relative;
      z-index: 9;
      border-radius: 24px 24px 0px 0px;
      overflow: hidden;
      .content-box {
        .title-row {
          line-height: 80px;
          padding: 0 40px;
          background: #f8f8f8;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #999999;
        }
        .row-list {
          background: #fff;
          .row-list_title {
            display: flex;
            height: 100px;
            justify-content: space-between;
            padding: 0 40px;
            align-items: center;
            border-bottom: 1px solid #f4f4f4;
            .title-lt {
              display: flex;
              align-items: center;
              .mark {
                width: 32px;
                height: 32px;
                background: #ffffff;
                border: 1px solid #4974f5;
                border-radius: 4px;
                font-size: 24px;
                color: #4974f5;
                line-height: 32px;
                text-align: center;
              }
              h3 {
                font-size: 32px;
                font-weight: bold;
                color: #222222;
                margin-left: 8px;
              }
            }
            .title-rt {
              display: flex;
              align-items: center;
              .img-box {
                width: 40px;
                height: 40px;
                background: #000;
                border-radius: 40px;
                overflow: hidden;
              }
              span {
                font-size: 28px;
                color: #555555;
                margin-left: 8px;
                margin-right: 8px;
              }
            }
          }
          ul {
            padding: 0 40px;
            li {
              display: flex;
              padding: 32px 0px;
              border-bottom: 1px solid #f4f4f4;
              .img-box {
                width: 130px;
                height: 130px;
                background: #f5f5f5;
                border-radius: 8px;
                overflow: hidden;
              }
              .info {
                margin-left: 25px;
                .top {
                  display: flex;
                  line-height: 38px;
                  align-items: center;
                  .blue {
                    border: 1px solid #4974f5 !important;
                    color: #4974f5 !important;
                  }
                  .mark {
                    background: #ffffff;
                    border: 1px solid #00b365;
                    border-radius: 4px;
                    font-size: 20px;
                    color: #00b365;
                    text-align: center;
                    font-size: 20px;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                  }
                  .title {
                    font-size: 28px;
                    color: #222222;
                    font-weight: bold;
                    margin-left: 6px;
                    max-width: 480px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                }
                .center {
                  font-size: 24px;
                  color: #999999;
                  margin-top: 10px;
                  line-height: 34px;
                  max-width: 480px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                .bottom {
                  font-size: 24px;
                  color: #999999;
                  margin-top: 22px;
                  line-height: 34px;
                }
                .refund-money {
                  font-size: 24px;
                  color: #222222;
                  line-height: 32px;
                  margin-top: 12px;
                }
              }
            }
          }
          .pay-amount {
            height: 90px;
            padding: 28px 40px;
            border-bottom: 1px solid #f4f4f4;
            font-size: 24px;
            color: #999999;
            text-align: right;
            span {
              color: #1a1a1a !important;
            }
          }
          .refund-amount {
            margin-top: 26px;
            line-height: 50px;
            padding: 0 40px;
            display: flex;
            justify-content: space-between;
            .title {
              font-size: 26px;
              color: #1a1a1a;
              font-weight: bold;
            }
            .money {
              font-size: 36px;
              color: #ec5330;
              font-weight: bold;
              span {
                font-size: 24px !important;
              }
            }
          }
          .tips {
            padding: 0 40px;
            font-size: 24px;
            color: #999999;
            line-height: 34px;
            margin-top: 8px;
            padding-bottom: 28px;
          }
          .total-refund_amount {
            display: flex;
            line-height: 100px;
            justify-content: flex-end;
            padding: 0 40px;
            .title {
              font-size: 26px;
              color: #1a1a1a;
              font-weight: bold;
            }
            .money {
              font-size: 36px;
              color: #ec5330;
              font-weight: bold;
              span {
                font-size: 24px !important;
              }
            }
          }
        }
        .info {
          padding: 38px 40px;
          background: #fff;
          margin-top: 20px;
          .item-row {
            display: flex;
            margin-bottom: 22px;
            line-height: 36px;
            h3 {
              font-size: 26px;
              color: #222222;
            }
            > p {
              margin-left: 40px;
              font-size: 26px;
              color: #1a1a1a;
            }
            .copy {
              width: 72px;
              height: 32px;
              background: #f5f5f5;
              border-radius: 16px;
              margin-left: 16px;
              font-size: 22px;
              color: #1a1a1a;
              text-align: center;
            }
            .question {
              margin-left: 40px;
              max-width: 520px;
              > p {
                font-size: 26px;
                color: #1a1a1a;
              }
              ul {
                display: flex;
                flex-wrap: wrap;
                margin-top: 16px;
                li {
                  width: 140px;
                  height: 140px;
                  background: #f5f5f5;
                  border-radius: 4px;
                  overflow: hidden;
                  margin-right: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
  .footer-btns {
    padding: 24px;
    display: flex;
    height: 128px;
    background: #fff;
    position: fixed;
    justify-content: flex-end;
    bottom: 0;
    z-index: 9;
    width: 100%;
    button {
      width: 159px;
      height: 80px;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #222222;
      margin: 0 8px;
    }
  }
}
</style>
