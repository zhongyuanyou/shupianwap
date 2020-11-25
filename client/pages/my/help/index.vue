<template>
  <div class="wrapper">
    <Header title="帮助中心" @leftClickFuc="onClickLeft" />
    <div class="hiDiv">
      <div class="hiSpanDiv">
        <span>Hi，您好 </span>
        <span>我们随时为您服务</span>
      </div>
    </div>
    <div class="bottomDiv">
      <div class="bottomCallDiv">
        <!-- <sp-button icon="phone-o" type="default">电话</sp-button> -->
        <!-- <div class="keFuButtonDiv">
          <sp-button type="primary" size="large">在线客服</sp-button>
        </div> -->
        <button class="callButton">
          <sp-icon name="phone-o" size="25" /> 致电
        </button>
        <button class="keFuButton">在线客服</button>
      </div>
    </div>
  </div>
</template>

<script>
import { TopNavBar, Icon, Cell, CellGroup, Button } from '@chipspc/vant-dgg'
import Header from '@/components/common/my/header/header'

export default {
  name: 'Help',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    Header,
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.wrapper {
  .hiDiv {
    width: 750px;
    height: 320px;
    background: #4974f5;
    position: relative;
    .hiSpanDiv {
      position: absolute;
      top: 96px;
      left: 70px;
      // bottom: 114px;
      // width: 365px;
      // height: 110px;
      span {
        display: block;
        font-size: 46px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 66px;
      }
    }
  }
  .bottomDiv {
    width: 750px;
    height: 905px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    position: absolute;
    margin-top: -20px;
    .bottomCallDiv {
      // background-color: red;
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        font-family: PingFang SC;
        font-weight: bold;
      }
      .keFuButton {
        width: 574px;
        height: 96px;
        background: #4974f5;
        border-radius: 8px;
        color: #ffffff;
        font-size: 32px;
      }
      .callButton {
        width: 100px;
        height: 96px;
        background: #ffffff;
        // color: #ffffff;-
        border-radius: 8px;
        color: #1a1a1a;
        font-size: 24px;
      }
    }
    .keFuButtonDiv {
      width: 574px;
      height: 96px;
    }
  }
}
</style>
