<template>
  <div class="hotSale-serve">
    <div v-for="(item, index) of tabs" :key="index" class="hotSale-serve-tab">
      <div class="hotSale-serve-tab-img"></div>
      <div class="hotSale-serve-tab-text">
        <div class="hotSale-serve-tab-text-first">有限公司注册</div>
        <div class="hotSale-serve-tab-text-second">
          <div>带地址</div>
          <div>无烂坏账</div>
          <div>小规模</div>
        </div>
        <div class="hotSale-serve-tab-text-three">
          专业会计团队代账,服务快捷无忧
        </div>
        <div class="hotSale-serve-tab-text-four">
          <div>4030</div>
          <div>元</div>
          <div>销量 1279</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Serve',
  data() {
    return {
      tabs: 3,
    }
  },
}
</script>

<style scoped lang="less">
.hotSale-serve {
  margin: 40px;
  &-tab {
    width: 670px;
    height: 266px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.2);
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    margin-bottom: 40px;
    display: flex;
    &-img {
      width: 266px;
      height: 266px;
      background: #f4f4f4;
      border-radius: 8px 0px 0px 8px;
    }
    &-text {
      flex: 1;
      margin: 31px 0 0 33px;
      &-first {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        line-height: 32px;
        margin-bottom: 15px;
      }
      &-second {
        display: flex;
        > div {
          background: #f0f2f5;
          border-radius: 4px;
          font-size: 20px;
          font-weight: 400;
          color: #5c7499;
          line-height: 20px;
          margin: 0 8px 16px 0;
          padding: 5px;
        }
      }
      &-three {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 22px;
        margin-bottom: 23px;
      }
      &-four {
        display: flex;
        font-size: 22px;
        font-weight: 400;
        line-height: 22px;
        align-items: center;
        > :nth-child(1) {
          font-size: 32px;
          font-weight: bold;
          color: #ec5330;
          line-height: 32px;
        }
        > :nth-child(2) {
          color: #ec5330;
          margin-right: 16px;
        }
        > :nth-child(3) {
          color: #999999;
        }
      }
    }
  }
}
</style>
