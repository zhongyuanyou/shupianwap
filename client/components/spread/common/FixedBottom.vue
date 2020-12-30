<template>
  <sp-bottombar v-show="isFixed" safe-area-inset-bottom class="my-sp-bottombar">
    <sp-bottombar-info title avatar :card="card" />
    <sp-bottombar-button
      v-md-map
      v-md:p_IMClick
      :data-im-name="md.imMd.name"
      :data-im_type="md.imMd.type"
      type="info"
      :text="text1"
      @click="onClickButton1"
    >
    </sp-bottombar-button>
    <sp-bottombar-button
      v-md-map
      v-md:webClick
      :data-name="md.telMd.name"
      type="primary"
      :text="text2"
      @click="onClickButton2"
    >
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
    planner: {
      type: Object,
      required: true,
      default: () => {
        return {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc: '',
        }
      },
    },
    md: {
      type: Object,
      default: () => {
        return {
          telMd: {
            name: '工商聚合页_底部_电话联系',
            type: '售前',
          },
          imMd: {
            name: '工商聚合页_底部_在线咨询',
            type: '售前',
          },
        }
      },
    },
  },
  data() {
    return {
      card: {},
      text1: '在线咨询',
      text2: '电话咨询',
      // 默认屏幕高度
      // isFixed: true, // 是否固定定位
      // maxDocHeight: 0,
      // docHeight: 0, // 一开始的屏幕高度，不会变
      // showHeight: 0, // 真实屏幕高度，因为键盘弹入弹出发生变化
    }
  },
  watch: {
    // showHeight: {
    //   handler(newVal, oldVal) {
    //     console.log(`docHeight：${this.docHeight}`)
    //     console.log(`maxDocHeight：${this.maxDocHeight}`)
    //
    //     console.log(`oldShowHeight：${oldVal}`)
    //     console.log(`newShowHeight：${newVal}`)
    //
    //     // if (this.showHeight === 0) {
    //     //   if (!((this.showHeight === this.docHeight) === this.maxDocHeight)) {
    //     //     this.isFixed = false
    //     //     return
    //     //   }
    //     // }
    //     if (this.showHeight > this.maxDocHeight) {
    //       // 显示高度如果大于固定高度，表示在未加载完就打开键盘，导致固定高度小于显示高度。
    //       // 重新获取固定高度后比较高度
    //       this.maxDocHeight = this.showHeight
    //     }
    //
    //     if (this.maxDocHeight > this.showHeight) {
    //       // 当键盘弹出时
    //       this.isFixed = false
    //     } else {
    //       // 显示高度等于固定高度
    //       // 当键盘隐藏时
    //       this.isFixed = true
    //     }
    //   },
    //   immediate: true,
    // },
  },
  created() {
    this.card = {
      imgSrc:
        this.planner.imgSrc ||
        'https://tenant-assets.meiqiausercontent.com/avatars/16984/5uyI/HqRHeYKk3pkWUn04xfOB.jpg',
      cardName: this.planner.name,
      cardSign: '金牌规划师',
      icon: '',
      round: true,
      avatarSize: 40,
    }
  },
  mounted() {
    const vm = this
    this.docHeight = document.body.clientHeight
    this.maxDocHeight = document.body.clientHeight
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        vm.showHeight = document.body.clientHeight
        console.log(`onresize-showHeight：${vm.showHeight}`)
      })()
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
        this.planner.id,
        this.planner.name || '',
        this.planner.jobNum || '',
        this.planner.imgSrc || ''
      )
    },
    // @--电话咨询
    onClickButton2() {
      if (!this.planner.telephone) return
      window.location.href = `tel:${this.planner.telephone}`
    },
  },
}
</script>

<style lang="less" scoped>
// .my-sp-bottombar覆写了组件原本的样式
.my-sp-bottombar {
  width: calc(@spread-page-width - 80px);
  left: auto;
  right: auto;
}

/deep/ .sp-bottombar {
}
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
