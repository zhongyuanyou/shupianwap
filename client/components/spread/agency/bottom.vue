<template>
  <div class="bottom-btn">
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-info title avatar :card="card" />
      <sp-bottombar-button type="info" :text="text1" @click="onLineButton">
      </sp-bottombar-button>
      <sp-bottombar-button type="primary" :text="text2" @click="CallButton">
      </sp-bottombar-button>
    </sp-bottombar>
  </div>
</template>

<script>
import {
  Bottombar,
  BottombarButton,
  BottombarIcon,
  BottombarInfo,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
    [BottombarInfo.name]: BottombarInfo,
  },
  data() {
    return {
      card: {
        imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
        cardName: '王深林',
        cardSign: '金牌规划师',
        icon: 'coupon-o',
        round: true,
        avatarSize: 40,
      },
      text1: '在线咨询',
      text2: '电话咨询',
    }
  },
  methods: {
    onLineButton() {
      console.log('在线咨询')
    },
    CallButton() {
      console.log('电话咨询')
    },
  },
}
</script>
<style lang="less" scoped>
.bottom-btn {
  width: 100%;
  /deep/.sp-icon {
    display: none;
  }
  /deep/.sp-bottombar-info__avatar {
    display: flex;
  }
  /deep/.sp-bottombar-info__card {
    display: flex;
  }
  /deep/.sp-button--info {
    background: #24ae68;
    border: 1px solid#24ae68;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
