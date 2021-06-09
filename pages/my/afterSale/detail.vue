<template>
  <div class="sale-detail">
    <Header title="售后单详情">
      <template #right>
        <span
          class="recording"
          @click="$router.push('/my/afterSale/processRecords')"
          >处理记录</span
        >
      </template>
    </Header>
    <div class="container">
      <StatusBar :status="status">
        <!-- 请您确认，待处理，售后中状态栏样式 commodity_ic_ttime-->
        <template #icon>
          <div class="icon-box" :style="{ background: icon_bg }">
            <sp-icon
              class-prefix="spiconfont"
              size="0.46rem"
              :color="status.icon_color"
              :name="status.icon_name"
            ></sp-icon>
          </div>
        </template>
      </StatusBar>

      <div class="content">
        <!-- 处理意见 -->
        <div class="content-box">
          <div class="idea">
            <h3>处理意见</h3>
            <p>
              商家处理商家处理意见商家处理意见商家处理意见商家处理意见商家处理意见商家处理意见商家处理意见商家
            </p>
          </div>
        </div>
        <!-- 退款 -->
        <div class="content-box">
          <div class="refund-box">
            <div class="title">
              <div class="left">
                <div>退</div>
                <p>退款</p>
              </div>
              <div
                class="right"
                @click="$router.push('/my/afterSale/refundRecord')"
              >
                退款明细
              </div>
            </div>
            <div class="amount">
              <div class="left">
                <h3>退款金额</h3>
                <p>预计1-5个工作日到账</p>
              </div>
              <div class="right">500<span>元</span></div>
            </div>
          </div>
        </div>
        <!-- 售后方案 -->
        <div class="content-box">
          <div class="title-row">售后方案</div>
          <div class="row-list">
            <div class="row-list_title">
              <div class="title-lt">
                <div class="mark">换</div>
                <h3>业务变更</h3>
              </div>
              <div class="title-rt" @click="concatKefu(2)">
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
      <button @click="openDialog(0)">平台介入</button>
      <button @click="openDialog(1)">撤销</button>
      <button @click="openDialog(2)">确认方案</button>
      <!-- <button class="pay-btn">去支付</button> -->
    </div>
  </div>
</template>

<script>
import { Dialog, Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import StatusBar from '@/components/afterSale/StatusBar'
export default {
  components: {
    Header,
    StatusBar,
    SpIcon: Icon,
  },
  data() {
    return {
      // 状态栏
      status: {},
      // 双按钮弹窗
      doubleBtnDialog: [
        {
          title: '申请平台介入',
          message:
            '您好，申请平台介入后，平台客服将在24小时内联系您，请您保存电话畅通，耐心等待。',
          cancelButtonText: '',
          confirmButtonText: '',
        },
        {
          title: '您确定撤销此售后申请？',
          message: '提交后此售后方案将会关闭，如有需要您可重新发起售后。',
          cancelButtonText: '暂不取消',
          confirmButtonText: '确定撤销',
        },
        {
          title: '确认售后方案',
          message: '请您仔细阅读售后方案，是否要同意此售后方案？',
          cancelButtonText: '',
          confirmButtonText: '',
        },
        {
          title: '售后方案已确认',
          message:
            '您好，为您推送业务变更订单，你可在我的订单中查看订单详情。您的退款平台可能会多笔打到您原路退回到您支付的账户或打打您平台注册账户的钱包，请您注意查收',
          cancelButtonText: '查看订单',
          confirmButtonText: '我知道了',
        },
      ],
      // 单按钮alert弹窗
      singleBtnDialog: [
        {
          title: '操作成功',
          message: '平台客服将在47小时59分钟内为你处理，请您保持电话畅通',
          cancelButtonText: '',
          confirmButtonText: '我知道了',
        },
        {
          title: '售后方案已确认',
          message:
            '平台为您推送业务变更订单，请您及时支付订单剩余金额，以便尽快为您办理变更后的业务',
          cancelButtonText: '',
          confirmButtonText: '去支付',
        },
        {
          title: '售后方案已确认',
          message: '为您推送业务变更订单，你可在我的订单中查看订单详情。',
          cancelButtonText: '',
          confirmButtonText: '查看订单',
        },
        {
          title: '售后方案已确认',
          message:
            '您好，您的售后处理已完成，您的退款平台可能会多笔打到您原路退回到您支付的账户或打打您平台注册账户的钱包，请您注意查收',
          cancelButtonText: '',
          confirmButtonText: '我知道了',
        },
      ],
    }
  },
  created() {
    // 请您确认状态栏样式
    // this.status.title = '请您支付'
    // this.status.desc = '请您支付业务变更的剩余款项，以便尽快为您办理新业务'
    // this.status.bgColor = '#4974F5'
    // this.status.icon_color = '#4974F5'
    // this.status.icon_name = 'commodity_ic_ttime'
    // this.status.icon_bg = '#F2F5FF'
    // 售后关闭状态栏样式
    // this.status.title = '售后关闭'
    // this.status.desc = '如有需要可重新发起'
    // this.status.bgColor = '#808080'
    // this.status.icon_color = '#BBBBBB'
    // this.status.icon_name = 'popup_ic_closeb'
    // this.status.icon_bg = '#F8F8F8'
    // 已完成
    this.status.title = '已完成'
    this.status.desc = '退款将会在5个工作日打款到您的账户，请注意查收'
    this.status.bgColor = '#00B365'
    this.status.icon_color = '#00B365'
    this.status.icon_name = 'wancheng'
    this.status.icon_bg = '#E5F7EF'
  },
  methods: {
    openDialog(index) {
      Dialog.confirm({
        title: this.doubleBtnDialog[index].title,
        message: this.doubleBtnDialog[index].message,
        cancelButtonText: this.doubleBtnDialog[index].cancelButtonText,
        confirmButtonText: this.doubleBtnDialog[index].confirmButtonText,
      })
        .then(() => {
          if (index === 0) {
            this.alertDialog(index)
          } else if (index === 1) {
            this.$xToast.show({
              message: '撤销成功',
              duration: 1000,
            })
          } else if (index === 2) {
            // 如果确认方案的状态是是业务变更-有退款
            // this.confirmDialog(3)
            // 其它状态弹窗
            this.alertDialog(3)
          }
        })
        .catch(() => {
          if (index === 3) {
            console.log('查看订单')
          }
        })
    },
    alertDialog(index) {
      Dialog.alert({
        title: this.singleBtnDialog[index].title,
        message: this.singleBtnDialog[index].message,
        cancelButtonText: this.singleBtnDialog[index].cancelButtonText,
        confirmButtonText: this.singleBtnDialog[index].confirmButtonText,
      }).then(() => {})
    },
    concatKefu(kefuType) {
      let typeName = ''
      console.log(kefuType)
      kefuType === 1 ? (typeName = '规划师') : (typeName = '平台客服')
      Dialog.confirm({
        title: '',
        message: `您的业务变更方案，由企服${typeName}刘雅婷为您提供，你将收到${typeName}为您推送的订单，请及时查看，如有问题您可直接与${typeName}沟通`,
        cancelButtonText: '去联系',
        confirmButtonText: '我知道了',
      })
        .then(() => {})
        .catch(() => {})
    },
  },
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
          > ul {
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
              > .info {
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
        > .info {
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
                  margin-bottom: 16px;
                }
              }
            }
          }
        }
        .idea {
          padding: 35px 40px;
          background: #fff;
          margin-bottom: 20px;
          h3 {
            font-size: 26px;
            color: #222222;
            font-weight: bold;
            line-height: 36px;
          }
          p {
            font-size: 26px;
            color: #222222;
            line-height: 36px;
            margin-top: 10px;
          }
        }
        .refund-box {
          height: 244px;
          background: #fff;
          .title {
            height: 104px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #f4f4f4;
            padding: 0 40px;
            display: flex;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              > div {
                width: 32px;
                height: 34px;
                line-height: 34px;
                border: 1px solid #ec5330;
                border-radius: 4px;
                font-size: 24px;
                color: #ec5330;
              }
              > p {
                font-size: 32px;
                color: #222222;
                font-weight: bold;
                margin-left: 8px;
              }
            }
            .right {
              color: #4974f5;
              font-size: 28px;
            }
          }
          .amount {
            display: flex;
            height: 138px;
            padding: 28px 40px;
            align-items: center;
            justify-content: space-between;
            .left {
              h3 {
                font-size: 28px;
                color: #222222;
                font-weight: normal;
                line-height: 38px;
              }
              p {
                font-size: 24px;
                color: #999999;
                line-height: 34px;
                margin-top: 7px;
              }
            }
            .right {
              color: #ff3b30;
              font-size: 36px;
              span {
                font-size: 24px !important;
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
    .pay-btn {
      background: #ec5330 !important;
      border-radius: 8px;
      color: #fff;
      border-color: #ec5330 !important;
    }
  }
}
</style>
