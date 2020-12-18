<template>
  <sp-bottombar safe-area-inset-bottom>
    <sp-bottombar-info title avatar :card="card" />
    <sp-bottombar-button type="info" :text="text1" @click="onClickButton">
    </sp-bottombar-button>
    <sp-bottombar-button type="primary" :text="text2" @click="onClickButton">
    </sp-bottombar-button>
  </sp-bottombar>
</template>

<script>
import {
  Bottombar,
  BottombarButton,
  BottombarIcon,
  BottombarInfo,
} from '@chipspc/vant-dgg'
export default {
  name: 'FixedBottom1',
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
        icon: '',
        round: true,
        avatarSize: 40,
      },
      text1: '在线咨询',
      text2: '电话咨询',
    }
  },
  methods: {
    onClickButton() {},
  },
}
</script>

<style lang="less" scoped>
/deep/ .sp-bottombar-info__name {
  display: flex;
}
/deep/ .sp-bottombar-info__avatar {
  display: flex;
}
/deep/ .sp-button--info {
  background: #24ae68;
  border: 1px solid #24ae68;
}
</style>
