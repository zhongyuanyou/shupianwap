<template>
  <div class="container">
    <div class="container_head">
      <Search :value="title" :icon-left="0.32"> </Search>
      <my-icon
        name="sear_ic_open"
        size="0.52rem"
        color="#4974F5"
        class="my_icon"
      ></my-icon>
    </div>
    <div class="container_news_see">
      <div class="news">
        <div class="news_num">25</div>
        <div class="news_span">日报精选</div>
      </div>
      <div class="see">
        <div class="see_like"></div>
        <div class="see_span">进站必看</div>
      </div>
    </div>
    <div class="container_middle">
      <sp-work-tabs v-model="active" is-nav-tab>
        <sp-work-tab
          :need-content="false"
          :title="index"
          v-for="index in tabs"
          :key="index"
        >
          {{ 'content' }} {{ index }}
        </sp-work-tab>
      </sp-work-tabs>
      <my-icon
        name="tabbar_ic_order"
        size="0.32rem"
        color="#1A1A1A"
        class="my_icon"
      ></my-icon>
    </div>
    <div class="container_body">
      <ItemCard />
    </div>
  </div>
</template>
<script>
import {
  WorkTab,
  WorkTabs,
  Tab,
  Tabs,
  Icon,
  TopNavBar,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  PullRefresh,
  List,
  Cell,
  Image,
} from '@chipspc/vant-dgg'
import ItemCard from '@/components/mustKnown/recommend/ItemCard'

import Search from '@/components/mustKnown/recommend/search/Search'
// import { domainUrl } from '~/config/index'
// import { foundApi } from '@/api'

export default {
  name: 'Recommend',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    ItemCard,
    Search,
  },
  data() {
    return {
      title: '考研复试体检包含什么项目',
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识'],
      nowIndex: 2,
      infoList: [
        {
          item: 1,
        },
        {
          item: 1,
        },
      ],
    }
  },
  methods: {
    toggleTabs(index) {
      console.log('index', index)
      this.nowIndex = index
    },
  },
}
</script>
<style lang="less" scoped>
//
::v-deep .sp-work-tab--active {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #222222;
}
/deep/ .sp-work-tab__text {
  flex-shrink: 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
}
/deep/ .sp-work-tabs__line {
  width: 24px;
  height: 6px;
  background: #4974f5;
  border-radius: 3px;
}
.container {
  padding: 0 32px;
  .container_head {
    display: flex;
    justify-content: space-between;
    height: 88px;
    align-items: center;
    .my_icon {
      width: 52px;
      height: 52px;
      margin-left: 32px;
    }
  }
  .container_news_see {
    height: 136px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .news {
      width: 329px;
      height: 88px;
      background: #dbe4fd;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      .news_num {
        width: 48px;
        height: 48px;
        background: #ffffff;
        border-radius: 50%;
        font-size: 22px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #133aa3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .news_span {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #133aa3;
        line-height: 28px;
        margin-left: 12px;
      }
    }
    .see {
      width: 329px;
      height: 88px;
      background: #d8cffa;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .see_like {
        width: 48px;
        height: 48px;
        background: #ffffff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .see_span {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #564499;
        line-height: 28px;
        margin-left: 12px;
      }
    }
  }
  .container_middle {
    height: 88px;
    background: #ffffff;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    .tabs-box {
      .tabs-box-items {
        display: flex;
        overflow: auto;
      }
    }
  }
  .container_body {
  }
}
</style>
