<template>
  <div class="wrapper">
    <Header title="关于我们" @leftClickFuc="onClickLeft" />
    <div class="contentBg">
      <div class="content">
        <div class="iconBg">
          <img :src="$ossImgSet(160, 160, 'g6trabnxtg80000.png')" alt="" />
        </div>
        <span class="versionText">当前版本：V 1.2</span>
      </div>
    </div>
    <sp-cell-group>
      <sp-cell center is-link class="cellClass" @click="onServiceTouch">
        <template #title>
          <span class="custom-title">薯片用户服务协议</span>
        </template>
      </sp-cell>
      <sp-cell center is-link class="cellClass" @click="onPrivacyTouch">
        <template #title>
          <span class="custom-title">薯片隐私协议</span>
        </template>
      </sp-cell>
    </sp-cell-group>
  </div>
</template>

<script>
import { TopNavBar, Icon, Cell, CellGroup } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'

export default {
  // layout: 'default',
  name: 'About',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
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
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      this.$router.back()
    },
    onServiceTouch() {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode: 'protocol100122' },
      })
    },
    onPrivacyTouch() {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode: 'protocol100121' },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.wrapper {
  width: 750px;
  height: 1334px;
  background: #f8f8f8;
  .header {
    height: 88px;
    font-size: 34px;
  }
  .contentBg {
    display: flex;
    height: 342px;
    width: 100%;
    align-items: center;
    justify-content: center;
    .content {
      // display: flex;
      margin: 0 auto;
      .iconBg {
        display: flex;
        width: 160px;
        height: 160px;
        background: #4974f5;
        border-radius: 40px;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .versionText {
        width: 191px;
        height: 23px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        display: block;
        margin-top: 32px;
      }
    }
  }
  .custom-title {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 44px;
  }
  .cellClass {
    height: 111px;
  }
}
</style>
