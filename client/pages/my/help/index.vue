<template>
  <div class="help-page">
    <!-- S 头部 -->
    <Header ref="headerRef" title="帮助中心" />
    <!-- E 头部 -->
    <!-- S 广告位 -->
    <div class="help-bn">
      <img src="" alt="" />
    </div>
    <!-- E 广告位 -->
    <div class="hele-centent">
      <!-- S 功能 -->
      <div class="func-list">
        <div>
          <img src="" alt="" />
          <span>修改登录密码</span>
        </div>
        <div>
          <img src="" alt="" />
          <span>实名认证</span>
        </div>
        <div>
          <img src="" alt="" />
          <span>免打扰设置</span>
        </div>
        <div>
          <img src="" alt="" />
          <span>我要吐槽</span>
        </div>
      </div>
      <!-- E 功能 -->
      <!-- S 搜索 -->
      <div class="search-content">
        <strong>更多服务</strong>
        <sp-search
          v-model="keywords"
          shape="round"
          placeholder="搜索您遇到的问题"
        />
      </div>
      <!-- E 搜索 -->
      <div class="tab-content">
        <!-- S tab -->
        <sp-sticky
          :class="{ isBorder: isFixed }"
          :offset-top="headHeight - 0.5"
          @scroll="searchHandle"
        >
          <sp-work-tabs v-model="active" @click="tabsClickHandle">
            <sp-work-tab
              v-for="(item, index) in tabData"
              :key="index"
              :title="item.title"
              :name="item.code"
            ></sp-work-tab>
          </sp-work-tabs>
        </sp-sticky>
        <!-- E tab -->
        <!-- S 列表 -->
        <div class="problem-list">
          <ul>
            <li v-for="(item, index) in problemList" :key="index">
              <span>{{ item.text + index }}</span>
              <my-icon
                name="order_ic_listnext"
                size="0.21rem"
                color="#CCCCCC"
              ></my-icon>
            </li>
          </ul>
        </div>
        <!-- E 列表 -->
      </div>
    </div>
    <!-- S footer -->
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-icon icon="phone-o" text="致电" />
      <sp-bottombar-button type="primary" text="在线客服" />
    </sp-bottombar>
    <!-- E footer -->
    <div class="empty-box"></div>
  </div>
</template>

<script>
import {
  Search,
  WorkTab,
  WorkTabs,
  Bottombar,
  BottombarButton,
  BottombarIcon,
  Sticky,
} from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  name: 'Help',
  components: {
    Header,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
  },
  data() {
    return {
      keywords: '',
      active: 0,
      isFixed: false,
      headHeight: 0,
      tabData: [
        {
          title: '热搜问题',
          code: 'a',
        },
        {
          title: '活动类',
          code: 'b',
        },
        {
          title: '订单类',
          code: 'c',
        },
        {
          title: '支付类',
          code: 'd',
        },
        {
          title: '售后类',
          code: 'e',
        },
        {
          title: '其它类',
          code: 'f',
        },
      ],
      problemList: [
        {
          id: '1',
          text:
            '公司注册需要哪些资料？公司注册需要哪些资料？公司注册需要哪些资料？公司注册需要哪些资料？',
        },
        {
          id: '2',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '3',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '4',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '5',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '6',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '7',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '8',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '9',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？',
        },
        {
          id: '1',
          text: '公司注册需要哪些资料？abc',
        },
      ],
    }
  },
  mounted() {
    this.headHeight = this.$refs.headerRef.$el.clientHeight // 获取头部高度
  },
  methods: {
    // tab切换
    tabsClickHandle(name, title) {
      console.log(name, title)
    },
    // 监听滚动吸顶
    searchHandle({ isFixed }) {
      this.isFixed = isFixed
    },
  },
}
</script>
<style lang="less" scoped>
.help-page {
  width: 100%;
  .help-bn {
    width: 100%;
    height: 320px;
    background: #4974f5;
  }
  .hele-centent {
    position: relative;
    z-index: 2;
    width: 100%;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    margin-top: -20px;
    padding-top: 52px;
    .func-list {
      display: flex;
      padding: 0 40px;
      margin-bottom: 63px;
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        > img {
          width: 48px;
          height: 48px;
          background: #c2c2c2;
        }
        > span {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
          margin-top: 24px;
        }
      }
    }
    .search-content {
      display: flex;
      align-items: center;
      padding: 0 40px;
      margin-bottom: 20px;
      > strong {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-right: 24px;
      }
    }
    /deep/ .sp-search {
      flex: 1;
      padding: 0;
    }
    /deep/ .sp-icon {
      color: #999999;
    }
    /deep/ .sp-search .sp-cell {
      padding: 8px 16px 8px 0;
    }
    /deep/ .sp-field__control {
      &::placeholder {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #cccccc;
      }
    }
  }
  .tab-content {
    /deep/ .sp-work-tabs__nav {
      padding-left: 8px;
    }
    .isBorder {
      /deep/ .sp-work-tabs__wrap {
        border-bottom: none;
      }
    }
    /deep/ .sp-work-tabs__wrap {
      height: 100px;
      padding-right: 8px;
      border-bottom: 1px solid #f4f4f4;
    }
    /deep/ .sp-work-tab {
      padding: 0 32px;
      padding-top: 29px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .sp-work-tab__text {
        font-size: 32px;
        line-height: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
    }
    /deep/ .sp-work-tabs__nav .sp-work-tab {
      &:last-child {
        padding-right: 40px !important;
      }
    }
    /deep/ .sp-work-tabs__line {
      width: 32px;
      height: 6px;
      background: #4974f5;
      border-radius: 3px;
      bottom: 14px;
    }
    /deep/ .sp-work-tab--active .sp-work-tab__text {
      color: #4974f5;
    }
  }
  .problem-list {
    width: 100%;
    padding: 22px 40px;
    ul {
      display: flex;
      flex-direction: column;
      > li {
        height: 74px;
        display: flex;
        align-items: center;
        > span {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          flex: 1;
          margin-right: 20px;
          .textOverflow(1);
        }
      }
    }
  }
  /deep/ .sp-bottombar {
    z-index: 3;
    padding: 32px 40px;
  }
  /deep/ .sp-icon-phone-o {
    color: #1a1a1a;
    font-weight: bold;
  }
  .empty-box {
    display: block;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 140px;
    }
  }
}
</style>
