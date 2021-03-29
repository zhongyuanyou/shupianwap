<template>
  <div class="container">
    <div class="container_head">
      <Search
        :value="title"
        :icon-left="0.2"
        @click.native="$router.push('/known/search')"
      >
      </Search>
      <my-icon
        name="fabu_mian"
        size="0.52rem"
        color="#4974F5"
        class="my_icon"
        @click.native="openArticle"
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
      <div class="popContentOne">
        <div class="popTop">
          <span class="popTop_title">全部板块</span>
          <my-icon
            name="guanbi_mian"
            size="0.48rem"
            color="#F5F5F5"
            class="my_icon"
            @click.native="showPop = false"
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
      </div>
      <div class="popContentTwo">
        <div class="popBottom">
          <div class="spans">
            <div class="popBottom_span1">更多板块</div>
            <div class="popBottom_span2">长按拖拽排序</div>
          </div>
        </div>
        <div class="list">
          <div class="list_items">
            <div class="item">
              关注
              <my-icon
                name="fabu_mian"
                size="0.28rem"
                color="#dddddd"
                class="my_icon"
                @click.native="openArticle"
              ></my-icon>
            </div>
            <div class="item">关注</div>
            <div class="item">关注</div>
            <div class="item">关注</div>
            <div class="item">关注</div>
            <div class="item">关注</div>
            <div class="item">关注</div>
            <div class="item">关注</div>
          </div>
        </div>
      </div>
    </sp-popup>
    <sp-popup
      v-model="showArticlePop"
      position="bottom"
      class="popupArticle"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0.4)' }"
    >
      <div class="popUserInfo">
        <div class="popUserPhoto">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9blv1fi2icc0000.png"
            alt=""
          />
        </div>
        <span>提个问题</span>
      </div>
      <div class="answer_article">
        <div class="item">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9blv1fi2icc0000.png"
            alt=""
          />
          <span>提个问题</span>
        </div>
        <div class="item">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9blv1fi2icc0000.png"
            alt=""
          />
          <span>提个问题</span>
        </div>
        <div class="item">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9blv1fi2icc0000.png"
            alt=""
          />
          <span>提个问题</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="button" @click="closePop">取消</div>
    </sp-popup>
    <Bottombar v-if="!isInApp && !isApplets" ref="bottombar" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { WorkTab, WorkTabs, Popup, Sticky } from '@chipspc/vant-dgg'
import ListItem from '@/components/mustKnown/recommend/ListItem'
import Search from '@/components/mustKnown/recommend/search/Search'
import Tabs from '@/components/mustKnown/recommend/tabs'
import Bottombar from '@/components/common/nav/Bottombar'
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
    Bottombar,
  },
  data() {
    return {
      title: '考研复试体检包含什么项目',
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识'],
      nowIndex: 2,
      showPop: false,
      showArticlePop: false,
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
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      isShowOpenApp: (state) => state.app.isShowOpenApp,
    }),
  },
  methods: {
    toggleTabs(index) {
      // console.log('index', index)
      this.nowIndex = index
    },
    OpenPop(event) {
      // console.log('evnet', event)
      if (event) {
        this.showPop = event
      }
    },
    openArticle() {
      // console.log('open')
      this.showArticlePop = true
    },
    closePop() {
      this.showArticlePop = false
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
    .popContentOne {
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
        }
        .my_icon {
          width: 48px;
          height: 48px;
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
            position: relative;
            > .my_icon {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
    .popContentTwo {
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
            position: relative;
            border: 2px dashed #dddddd;
            > .my_icon {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
  }
  .popupArticle {
    height: 519px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    > .popUserInfo {
      height: 136px;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 40px;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #555555;
      line-height: 28px;
      > .popUserPhoto {
        > img {
          width: 48px;
          height: 48px;
          background: #6d7177;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
      // > .popUserNick {
      //   height: 28px;
      //   font-size: 28px;
      //   font-family: PingFangSC-Medium, PingFang SC;
      //   font-weight: 500;
      //   color: #555555;
      //   line-height: 28px;
      // }
    }
    > .answer_article {
      height: 285px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 78px;
      > .item {
        text-align: center;
        > img {
          width: 96px;
          height: 96px;
          display: block;
        }
        > span {
          height: 24px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 24px;
          display: block;
          margin-top: 24px;
        }
      }
    }
    > .line {
      height: 1px;
      background: #dddddd;
    }
    > .button {
      height: 98px;
      background: #ffffff;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      width: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
}
</style>
