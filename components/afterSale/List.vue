<template>
  <div>
    <ul class="sale-list_ul">
      <li>
        <div class="row-title">
          <div class="sale-type">售后单：2001</div>
          <div class="refund-type">
            <div>换</div>
            <p>业务变更</p>
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
                  <span class="mark blue">换</span>
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
                  <span class="mark blue">换</span>
                  <span class="title">刻章</span>
                </div>
                <div class="center">武侯区；无注册地址；认缴申请税务</div>
                <div class="bottom">应付 500元，实付 500元</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="status">
          <!-- 售后中,待确认，退款中，已关闭 -->
          <strong>售后中</strong>
          <span>售后专员飞速处理中，请您耐心等待</span>
        </div>
        <div class="detail-btn">
          <button @click="$router.push('/my/afterSale/detail')">
            售后详情
          </button>
        </div>
      </li>
      <li>
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
        <!-- 状态 -->
        <div class="status">
          <strong>售后中</strong>
          <span>售后专员飞速处理中，请您耐心等待</span>
        </div>
        <div class="detail-btn">
          <button>售后详情</button>
        </div>
      </li>
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
                &.red {
                  color: #ec5330 !important;
                  border-color: #ec5330 !important;
                }
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
    }
    .status {
      padding: 0 40px;
      height: 74px;
      font-size: 24px;
      display: flex;
      color: #222222;
      align-items: center;
      background: #f8f8f8;
      strong {
        font-weight: bold;
        font-size: 24px;
      }
      span {
        max-width: 460px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      }
    }
  }
}
</style>
