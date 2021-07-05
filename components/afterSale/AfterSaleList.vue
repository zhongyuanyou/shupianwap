<template>
  <div>
    <ul class="sale-list_ul">
      <li v-for="(item, index) in saleList" :key="index">
        <div class="row-title">
          <div class="sale-type">售后单：{{ item.afterSaleNo }}</div>
          <div class="refund-type">
            <div
              v-if="item.afterSaleFactType === 'AFTER_SALE_TYPE_1'"
              class="red"
            >
              退
            </div>
            <div v-else class="blue">换</div>
            <p v-if="item.afterSaleFactType === 'AFTER_SALE_TYPE_1'">退款</p>
            <p v-else>业务变更</p>
          </div>
        </div>
        <div class="row-cont">
          <ul>
            <li
              v-for="(child, index2) in item.skuList"
              :key="index2"
              @click="
                $router.push(
                  `/my/afterSale/detail?id=${item.id}&orderId=${item.orderId}&orderNo=${item.orderNo}`
                )
              "
            >
              <div class="img-box">
                <img :src="child.filepath" />
              </div>
              <div class="info">
                <div class="top">
                  <span
                    v-if="item.afterSaleFactType === 'AFTER_SALE_TYPE_1'"
                    class="mark red"
                  >
                    退</span
                  >
                  <span v-else class="mark blue"> 换</span>
                  <span class="title">{{ child.spuName }}</span>
                </div>
                <div class="center">
                  {{ child.skuExtInfo }}
                </div>
                <div class="bottom">
                  单价 {{ child.skuPriceYuan || '' }}，数量
                  {{ child.skuNum || '' }}
                </div>
                <div
                  v-if="
                    item.afterSaleSubStatusNo === 'AFTERSALE_STATUS_TAG_6' ||
                    item.afterSaleSubStatusNo === 'AFTERSALE_STATUS_TAG_9'
                  "
                  class="refund-money"
                >
                  <span v-if="child.afterSaleMoneyYuan > 0"
                    >退款金额 {{ child.afterSaleMoneyYuan || '' }}元</span
                  >
                </div>
              </div>
              <div class="img-mark">
                <img
                  v-if="child.skuDealType === 'SKU_DEAL_TYPE_1'"
                  src="https://cdn.shupian.cn/sp-pt/wap/images/7yo84dwgx0k0000.png"
                  alt="取消办理"
                />
                <img
                  v-else-if="child.skuDealType === 'SKU_DEAL_TYPE_2'"
                  src="https://cdn.shupian.cn/sp-pt/wap/images/2qi17702lc00000.png"
                  alt="继续办理"
                />
              </div>
            </li>
          </ul>
        </div>

        <!-- break
          case 'AFTERSALE_STATUS_4':
            if (
              this.afterSaleDetail.refundStatusNo === 'REFUND_STATUS_1' ||
              this.afterSaleDetail.refundStatusNo === 'REFUND_STATUS_4'
            ) {
              this.statusBar = this.status[2]
              this.statusBar.title = '已完成'
              if (this.afterSaleDetail.refundStatusNo === 'REFUND_STATUS_1') {
                this.statusBar.desc = '售后完成'
              } else {
                this.statusBar.desc = '退款成功'
              }
            } else if (
              this.afterSaleDetail.refundStatusNo === 'REFUND_STATUS_2' ||
              this.afterSaleDetail.refundStatusNo === 'REFUND_STATUS_3' ||
              this.afterSaleDetail.refundStatusNo === 'REFUND_STATUS_5'
            ) {
              this.statusBar = this.status[0]
              this.statusBar.title = '退款中'
              this.statusBar.desc =
                '退款将会在5个工作日打款到您的账户，请注意查收'
            } -->

        <!-- 售后中,待确认，退款中，已关闭 -->
        <div
          v-if="item.afterSaleStatusNo === 'AFTERSALE_STATUS_1'"
          class="status"
        >
          <strong> 售后中</strong>
          <span>您的售后正在飞速处理中，请您耐心等待</span>
        </div>
        <div
          v-else-if="item.afterSaleStatusNo === 'AFTERSALE_STATUS_2'"
          class="status"
        >
          <strong>待处理</strong>
          <span>商家驳回了您的申请，请您及时处理</span>
        </div>
        <div
          v-else-if="item.afterSaleStatusNo === 'AFTERSALE_STATUS_3'"
          class="status"
        >
          <strong>待确认</strong>
          <span>请您确认售后方案</span>
        </div>
        <div
          v-else-if="item.afterSaleStatusNo === 'AFTERSALE_STATUS_4'"
          class="status"
        >
          <div
            v-if="
              item.refundStautsNo === 'REFUND_STATUS_1' ||
              item.refundStautsNo === 'REFUND_STATUS_4'
            "
          >
            <strong>已完成</strong>
            <span v-if="item.refundStautsNo === 'REFUND_STATUS_1'"
              >售后完成</span
            >
            <span v-else-if="item.refundStautsNo === 'REFUND_STATUS_4'"
              >退款成功</span
            >
          </div>
          <div
            v-else-if="
              item.refundStautsNo === 'REFUND_STATUS_2' ||
              item.refundStautsNo === 'REFUND_STATUS_3' ||
              item.refundStautsNo === 'REFUND_STATUS_5'
            "
          >
            <strong>退款中</strong>
            <span>退款将会在5个工作日打款到您的账户，请注意查收</span>
          </div>
        </div>
        <div
          v-else-if="item.afterSaleStatusNo === 'AFTERSALE_STATUS_5'"
          class="status"
        >
          <strong>已关闭</strong>
          <span v-if="item.afterSaleSubStatusNo === 'AFTERSALE_STATUS_TAG_9'"
            >平台驳回了您的申请，售后关闭，如您的问题未解决，您可重新发起申请</span
          >
          <span
            v-else-if="item.afterSaleSubStatusNo === 'AFTERSALE_STATUS_TAG_10'"
            >因您撤销申请，售后关闭，如您的问题未解决，您可重新发起申请</span
          >
          <span
            v-else-if="item.afterSaleSubStatusNo === 'AFTERSALE_STATUS_TAG_11'"
            >因您超时未处理，售后关闭，如您的问题未解决，您可重新发起申请</span
          >
        </div>

        <div class="detail-btn">
          <button
            v-if="item.afterSaleStatusNo === 'AFTERSALE_STATUS_4'"
            @click="
              $router.push(
                `/my/afterSale/refundDetails?id=${item.refundSheetId}`
              )
            "
          >
            退款详情
          </button>
          <button
            @click="
              $router.push(
                `/my/afterSale/detail?id=${item.id}&orderId=${item.orderId}&orderNo=${item.orderNo}`
              )
            "
          >
            售后详情
          </button>
        </div>
      </li>
      <!-- <li>
        <div class="row-title">
          <div class="sale-type">售后单：2001</div>
          <div class="refund-type">
            <div class="refund-style">退</div>
            <p>退款</p>
          </div>
        </div>
        <div class="row-cont">
          <ul>
            <li>
              <div class="img-box">
                <img />
              </div>
              <div class="info">
                <div class="top">
                  <span class="mark red">退</span>
                  <span class="title">刻章</span>
                </div>
                <div class="center">武侯区；无注册地址；认缴申请税务</div>
                <div class="bottom">应付 500元，实付 500元</div>
              </div>
            </li>
            <li>
              <div class="img-box">
                <img />
              </div>
              <div class="info">
                <div class="top">
                  <span class="mark red">退</span>
                  <span class="title">刻章</span>
                </div>
                <div class="center">武侯区；无注册地址；认缴申请税务</div>
                <div class="bottom">应付 500元，实付 500元</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="status">
          <strong>售后中</strong>
          <span>售后专员飞速处理中，请您耐心等待</span>
        </div>
        <div class="detail-btn">
          <button>售后详情</button>
        </div>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    saleList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.red {
  color: #ec5330 !important;
  border-color: #ec5330 !important;
}
.blue {
  border: 1px solid #4974f5 !important;
  color: #4974f5 !important;
}
.sale-list_ul {
  > li {
    background: #fff;
    padding: 0 40px;
    margin-top: 20px;
    .row-title {
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .sale-type {
        font-size: 24px;
        color: #999999;
      }
      .refund-type {
        display: flex;
        align-items: center;
        > div {
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #4974f5;
          border-radius: 4px;
          font-size: 18px;
          color: #4974f5;
          transform: scale(0.83);
          &.refund-style {
            color: #ec5330 !important;
            border-color: #ec5330 !important;
          }
        }
        p {
          margin-left: 8px;
          font-size: 24px;
          color: #555555;
        }
      }
    }
    .row-cont {
      > ul {
        li {
          position: relative;
          display: flex;
          padding: 32px 0px;
          border-bottom: 1px solid #f4f4f4;
          .img-box {
            width: 130px;
            height: 130px;
            background: #f5f5f5;
            border-radius: 8px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 8px;
            }
          }
          > .info {
            margin-left: 25px;
            .top {
              display: flex;
              line-height: 38px;
              align-items: center;

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
          > .img-mark {
            position: absolute;
            right: 0;
            top: 0;
            width: 140px;
            height: 105px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .status {
      padding: 20px 40px;
      font-size: 24px;
      display: flex;
      color: #222222;
      background: #f8f8f8;
      strong {
        font-weight: bold;
        font-size: 24px;
      }
      span {
        max-width: 460px;
        margin-left: 40px;
        font-size: 24px;
      }
    }
    .detail-btn {
      height: 128px;
      display: flex;
      justify-content: flex-end;
      align-content: center;
      button {
        display: block;
        width: 152px;
        height: 64px;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 32px;
        font-size: 26px;
        color: #222222;
        text-align: center;
        margin-top: 32px;
        margin-left: 20px;
      }
    }
  }
}
</style>
