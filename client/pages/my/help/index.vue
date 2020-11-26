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
      <div class="searchDiv">
        <sp-search
          v-model="searchText"
          placeholder="搜索您遇到的问题"
          class="search"
        />
      </div>
      <div class="classificationDiv">
        <sp-tabs
          class="tabs"
          line-width="16px"
          line-height="3px"
          title-active-color="#4974F5"
          :before-change="beforeChange"
        >
          <sp-tab v-for="(item, index) in classificationList" :key="index">
            <template #title>
              <span class="tabClass">{{ item }}</span>
            </template>
          </sp-tab>
        </sp-tabs>
      </div>
      <div class="listDiv">
        <sp-cell-group>
          <sp-cell
            v-for="(item, index) in classificationList"
            :key="index"
            center
            is-link
            class="cellClass"
            @click="onServiceTouch"
          >
            <template #title>
              <span class="custom-title">{{ item + index }}</span>
            </template>
          </sp-cell>
        </sp-cell-group>
      </div>
      <div class="bottomCallDiv">
        <button class="callButton" @click="callClick">
          <sp-icon name="phone-o" size="25" /> 致电
        </button>
        <button class="keFuButton" @click="keFuClick">在线客服</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TopNavBar,
  Icon,
  Cell,
  CellGroup,
  Button,
  Search,
  Tab,
  Tabs,
} from '@chipspc/vant-dgg'
import Header from '@/components/common/my/header/header'

export default {
  name: 'Help',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Header,
  },
  props: {},
  data() {
    return {
      searchText: '',
      classificationList: [
        '热搜问题',
        '活动类',
        '订单类',
        '支付类',
        '售后类',
        '售后类',
        '售后类',
        '售后类',
        '售后类',
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    callClick() {
      console.log(1)
    },
    keFuClick() {
      console.log(2)
    },
    onServiceTouch() {
      this.$router.push({
        path: '/my/help/questions',
        query: { type: 1 },
      })
    },
    beforeChange(index) {
      console.log('index', index)
      return true
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
    .searchDiv {
      width: 100%;
      height: 136px;
      // background-color: blue;
      display: flex;
      align-items: center;
      .search {
        width: 100%;
        border-radius: 100%;
      }
    }
    .classificationDiv {
      width: 100%;
      height: 100px;
      // background-color: red;
      display: flex;
      align-items: center;
      .tabs {
        width: 100%;
      }
      .tabClass {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        // color: #4974f5;
      }
    }
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
    .listDiv {
      background-color: red;
      width: 100%;
      height: 470px;
      margin-top: 45px;
      overflow: scroll;
      .custom-title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 44px;
      }
      .cellClass {
        height: 72px;
      }
    }
  }
}
</style>
