<template>
  <div class="serve">
    <div class="serve-text">稅筹服务介绍</div>
    <div class="serve-card">
      <div class="serve-card-first">
        <div>
          <div class="serve-card-first-big">28万+</div>
          <div class="serve-card-first-small">在线咨询</div>
        </div>
        <div>
          <div class="serve-card-first-big">27万+</div>
          <div class="serve-card-first-small">累计成交</div>
        </div>
        <div>
          <div class="serve-card-first-big">27万+</div>
          <div class="serve-card-first-small">成功案列</div>
        </div>
      </div>
      <div class="serve-card-second">
        <div class="serve-card-second-left">
          <span>500</span><span>元起</span><strike>488.00</strike>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Serve',
}
</script>

<style scoped lang="less">
.serve {
  margin: 11px 41px 0;
  &-text {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 50px 0 32px 10px;
  }
  &-card {
    width: 670px;
    height: 472px;
    background: url('~assets/spreadImages/tax/busi_img_swchlist1.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    &-first {
      padding-top: 251px;
      display: flex;
      justify-content: space-around;
      &-big {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
      &-small {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
    }
    &-second {
      height: 77px;
      &-left {
        > :nth-child(1) {
          font-size: 40px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        > :nth-child(2) {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        > :nth-child(3) {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          text-decoration: line-through;
          color: #cccccc;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
