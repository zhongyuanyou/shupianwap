<template>
  <div class="bank">
    <Header title="银行卡管理" />
    <div class="bank-list">
      <ul>
        <li
          @click="$router.push('/my/wallet/bill/detail')"
          style="
            background-image: linear-gradient(90deg, #14bdbb 0%, #0bb3b3 100%);
          "
        >
          <div class="left-logo">
            <img />
          </div>
          <div class="right-info">
            <h3>中国工商银行</h3>
            <p>四川虎居信息科技有限公司</p>
            <div class="card-num">
              <span>****</span><span>****</span><span>****</span
              ><span>3253</span>
            </div>
          </div>
        </li>
        <li
          @click="$router.push('/my/wallet/bill/detail')"
          style="
            background-image: linear-gradient(90deg, #14bdbb 0%, #0bb3b3 100%);
          "
        >
          <div class="left-logo">
            <img />
          </div>
          <div class="right-info">
            <h3>中国工商银行</h3>
            <p>四川虎居信息科技有限公司</p>
            <div class="card-num">
              <span>****</span><span>****</span><span>****</span
              ><span>3253</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer-btn">
      <button>添加收款账户</button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
  },
}
</script>

<style lang="less" scoped>
.bank {
  min-height: 100vh;
  background: #fff;
  width: 100%;
  .bank-list {
    padding: 0 40px;
    border-top: 1px solid #f8f8f8;
    padding-bottom: 200px;

    ul {
      margin-top: 8px;
      li {
        display: flex;
        padding: 44px 32px;
        align-items: center;
        margin-top: 32px;
        border-radius: 8px;
        .left-logo {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: #000;
          overflow: hidden;
          display: flex;
          img {
            width: 60px;
            height: 60px;
            border: none;
          }
        }
        .right-info {
          margin-left: 24px;
          color: #fff;
          h3 {
            color: #fff;
            line-height: 44px;
            font-size: 32px;
          }
          p {
            line-height: 30px;
            font-size: 22px;
            margin-top: 6px;
            color: rgba(255, 255, 255, 0.8);
          }
          .card-num {
            font-size: 30px;
            line-height: 30px;
            margin-top: 25px;
            display: flex;
            align-items: center;
            span {
              margin-right: 24px;
              position: relative;
              top: 3px;
              color: rgba(255, 255, 255, 0.8);
              &:last-child {
                top: -3px;
                color: rgba(255, 255, 255) !important;
              }
            }
          }
        }
      }
    }
  }
  .footer-btn {
    height: 160px;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    background: #fff;
    padding: 0 32px;
    left: 0;
    button {
      display: block;
      height: 96px;
      width: 100%;
      background: #4974f5;
      color: #fff;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      border-radius: 8px;
    }
  }
}
</style>
