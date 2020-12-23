<template>
  <sp-bottombar safe-area-inset-bottom>
    <sp-bottombar-info title avatar :card="data.show" />
    <sp-bottombar-button type="info" :text="text1" @click="onClickButton1">
    </sp-bottombar-button>
    <sp-bottombar-button type="primary" :text="text2" @click="onClickButton2">
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
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
        return {
          show: {
            imgSrc:
              'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
            cardName: '王深林',
            cardSign: '金牌规划师',
            icon: '',
            round: true,
            avatarSize: 40,
          },
          info: {
            id: '7862495547640840192',
            name: '张毅',
            jobNum: '107547',
            telephone: '18402858698',
          },
        }
      },
    },
  },
  data() {
    return {
      text1: '在线咨询',
      text2: '电话咨询',
    }
  },
  methods: {
    // @--在线咨询
    onClickButton1() {
      // 7862495547640840192：规划师id。必需
      // 张毅：规划师名字。
      // 107547：工号。可不传
      this.$root.$emit(
        'openIMM',
        this.data.info.id,
        this.data.info.name || '',
        this.data.info.jobNum || ''
      )
    },
    // @--电话咨询
    onClickButton2() {},
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
