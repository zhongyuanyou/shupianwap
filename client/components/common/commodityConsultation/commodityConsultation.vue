<template>
  <div class="commodityConsult">
    <div class="commodityConsult-containner">
      <div class="commodityConsult-containner-userInfo">
        <sp-image
          width="0.8rem"
          height="0.8rem"
          round
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="commodityConsult-containner-userInfo-name">
          <p>王深林</p>
          <h3>金牌规划师</h3>
        </div>
      </div>
      <div class="commodityConsult-containner-handle">
        <sp-button type="primary">在线咨询</sp-button>
        <sp-button type="info">电话联系</sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
export default {
  name: 'CommodityConsultation',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
}
</script>

<style lang="less" scoped>
.commodityConsult {
  width: 100vw;
  height: 148px;
  background-color: #fff;
  &-containner {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100vw;
    height: 148px;
    padding-left: 40px;
    padding-right: 40px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    &-userInfo {
      height: 80px;
      line-height: 80px;
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      &-name {
        margin-left: 25px;
        p {
          font-size: 32px;
          font-weight: bold;
          color: #1a1a1a;
          height: 33px;
          line-height: 33px;
          margin-top: 3px;
          margin-bottom: 9px;
        }
        h3 {
          height: 32px;
          line-height: 30px;
          padding-left: 8px;
          padding-right: 8px;
          background: #ffefc5;
          border: 2px solid #dac79a;
          border-radius: 4px;
          font-size: 22px;
          font-weight: 400;
          color: #7b6225;
        }
      }
    }
    &-handle {
      height: 100%;
      line-height: 100%;
      display: flex;
      justify-content: flex-end;
      padding-top: 24px;
      /deep/ button {
        height: 100px;
        line-height: 100px;
        border-radius: 8px;
        font-size: 32px;
        font-weight: bold;
        color: #ffffff;
        padding-left: 21px;
        padding-right: 21px;
        &:first-child {
          margin-right: 16px;
          background: #24ae68;
          border: 1px solid #24ae68;
        }
      }
    }
  }
}
</style>
