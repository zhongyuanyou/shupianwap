<template>
  <div class="bottom">
    <div class="bottom-gray">
      <div class="bottom-gray-first">
        <div></div>
        <span>薯片找人</span>
        <div></div>
      </div>
      <div class="bottom-gray-second">
        薯片找人企业服务平台，2800万用户的选择
      </div>
      <div class="bottom-gray-three">薯片科技版权所有 | 关于我们</div>
    </div>
    <div class="bottom-position"></div>
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-info title avatar :card="card" />
      <sp-bottombar-button type="info" color="#24AE68" :text="text1">
      </sp-bottombar-button>
      <sp-bottombar-button type="primary" :text="text2"> </sp-bottombar-button>
    </sp-bottombar>
  </div>
</template>

<script>
import { Bottombar, BottombarInfo, BottombarButton } from '@chipspc/vant-dgg'
export default {
  name: 'Bottom',
  components: {
    [Bottombar.name]: Bottombar,
    [BottombarInfo.name]: BottombarInfo,
    [BottombarButton.name]: BottombarButton,
  },
  data() {
    return {
      card: {
        imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
        cardName: '王深林',
        cardSign: '金牌规划师',
        round: true,
        avatarSize: '0.8rem',
      },
      text1: '在线咨询',
      text2: '电话联系',
    }
  },
}
</script>

<style scoped lang="less">
.bottom {
  &-gray {
    width: 750px;
    height: 241px;
    background: #f4f4f4;
    padding: 64px 0 63px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    &-first {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #555555;
      line-height: 52px;
      margin: -10px 0;
      display: flex;
      align-items: center;
      div {
        width: 90px;
        height: 1px;
        background: #c5c5c5;
      }
      span {
        margin: 0 11.5px;
      }
    }
    &-second {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 36px;
      margin: 9px 0 17px 0;
    }
    &-three {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #c5c5c5;
      line-height: 36px;
      margin: -8px;
    }
  }
  &-position {
    height: 164px;
  }
}
//引入组件的整体
/deep/ .sp-bottombar {
  display: flex;
  align-items: center;
  height: 116px;
}
//头像
/deep/ .sp-bottombar-info__avatar {
  display: flex;
  align-items: center;
  position: relative;
}
//名字
/deep/ .sp-bottombar-info__card {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
/deep/ .sp-bottombar-info__name {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #222222;
  line-height: 32px;
}
/deep/ .sp-bottombar-info__sign {
  width: 125px;
  height: 32px;
  line-height: 28px;
  background: #ffefc5;
  border: 2px solid #dac79a;
  border-radius: 4px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #7b6225;
  padding: 0;
  margin-top: 6px;
}
//按钮
/deep/ .sp-bottombar-button {
  font-size: 32px;
  font-family: PingFang SC;
  font-weight: bold;
  height: 100px;
}
/deep/ .sp-button__content {
  border: 0;
}
</style>
