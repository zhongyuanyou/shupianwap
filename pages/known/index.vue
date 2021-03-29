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
    <sp-sticky>
      <div class="container_middle">
        <Tabs @openPop="OpenPop($event)" />
      </div>
    </sp-sticky>
    <div class="container_body">
      <ListItem />
    </div>
    <sp-popup
      v-model="showPop"
      position="bottom"
      class="popup"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0.4)' }"
    >
      <div class="popTop">
        <div class="popTop_title">全部板块</div>
        <my-icon
          name="notify_ic_close"
          size="0.48rem"
          color="#999999"
          class="my_icon"
        ></my-icon>
      </div>
      <div class="popMiddle">
        <div class="spans">
          <div class="popMiddle_span1">我的板块</div>
          <div class="popMiddle_span2">长按拖拽排序</div>
        </div>
        <div class="popMiddle_span3">编辑</div>
      </div>
      <div class="list">
        <div class="list_items">
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
        </div>
      </div>

      <div class="popBottom">
        <div class="spans">
          <div class="popBottom_span1">我的板块</div>
          <div class="popBottom_span2">长按拖拽排序</div>
        </div>
        <div class="popBottom_span3">编辑</div>
      </div>
      <div class="list">
        <div class="list_items">
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
          <div class="item">关注</div>
        </div>
      </div>
    </sp-popup>
  </div>
</template>
<script>
import { WorkTab, WorkTabs, Popup, Sticky } from '@chipspc/vant-dgg'
import ListItem from '@/components/mustKnown/recommend/ListItem'
import Search from '@/components/mustKnown/recommend/search/Search'
import Tabs from '@/components/mustKnown/recommend/tabs'
// import { domainUrl } from '~/config/index'
// import { foundApi } from '@/api'

export default {
  name: 'Index',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
    Search,
    Tabs,
    ListItem,
  },
  data() {
    return {
      title: '考研复试体检包含什么项目',
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识'],
      nowIndex: 2,
      showPop: false,

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
    OpenPop(event) {
      console.log('evnet', event)
      if (event) {
        this.showPop = event
      }
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
  background: #f5f5f5;
  .container_head {
    display: flex;
    justify-content: space-between;
    height: 88px;
    align-items: center;
    padding: 0 32px;
    .my_icon {
      width: 52px;
      height: 52px;
      margin-left: 32px;
    }
  }
  .container_middle {
    height: 88px;
    background: #ffffff;
    display: flex;
    align-items: center;
    // margin-bottom: 24px;

    .tabs-box {
      .tabs-box-items {
        display: flex;
        overflow: auto;
      }
    }
  }
  .container_body {
  }
  .popup {
    height: 1012px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    padding: 0 40px;
    .popTop {
      display: flex;
      height: 120px;
      align-items: center;
      justify-content: space-between;
      .popTop_title {
        height: 40px;
        font-size: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 40px;
      }
      .my_icon {
        width: 48px;
        height: 48px;
        background: #f5f5f5;
      }
    }
    .popMiddle {
      // height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .spans {
        height: 50px;
        display: flex;
        align-items: center;
        .popMiddle_span1 {
          height: 30px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 30px;
        }
        .popMiddle_span2 {
          height: 24px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
          margin-left: 15px;
        }
      }

      .popMiddle_span3 {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 28px;
      }
    }
    .list {
      .list_items {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 154px;
          height: 88px;
          background: #f5f5f5;
          border-radius: 44px;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 16px 0 16px 0;
        }
      }
    }

    .popBottom {
      // height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .spans {
        height: 50px;
        display: flex;
        align-items: center;
        .popBottom_span1 {
          height: 30px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 30px;
        }
        .popBottom_span2 {
          height: 24px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
          margin-left: 15px;
        }
      }

      .popBottom_span3 {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 28px;
      }
    }
    .list {
      .list_items {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .item {
          width: 154px;
          height: 88px;
          background: #f5f5f5;
          border-radius: 44px;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 16px 0 16px 0;
        }
      }
    }
  }
}
</style>
