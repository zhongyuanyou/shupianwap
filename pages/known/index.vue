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
    <!-- 吸顶 start -->
    <sp-sticky>
      <div class="container_middle">
        <div class="tabs-box-items">
          <div
            v-for="(item, index) in tabs"
            :key="index"
            class="li-tab"
            @click="toggleTabs(index)"
          >
            <p>{{ item }}</p>
            <div class="line" :class="tabIndex ? 'line' : ''"></div>
          </div>
        </div>
        <my-icon
          name="guanbi_mian"
          size="0.32rem"
          color="#F5F5F5"
          class="my_icon"
          @click.native="showPop = false"
        ></my-icon>
        <!-- <Tabs @openPop="OpenPop($event)" @getBackIndex="getBackIndex($event)" /> -->
      </div>
    </sp-sticky>
    <!-- 吸顶 end -->
    <!-- 列表 start -->
    <div class="container_body">
      <section v-if="tabIndex === 0">
        <VisitUser v-if="attentionStatus" />
        <NotAttention v-if="showNotAttention" />
        <AttentionItem v-if="attentionStatus" />
      </section>
      <section v-else-if="tabIndex === 1"><ListItem /></section>
      <section v-else-if="tabIndex === 2"><ItemCard /></section>
    </div>
    <!-- 列表 end -->
    <!-- 弹出框tab修改列表 start -->
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
          <div class="popMiddle_span3" @click="editIcon(status)">
            {{ editFinish }}
          </div>
        </div>
        <div class="list">
          <div class="list_items">
            <div
              v-for="(item, index) in myPlate"
              :key="index"
              :class="status ? '' : index < 3 ? 'active' : ''"
              class="item"
            >
              {{ item }}
              <my-icon
                v-show="showIcon"
                name="guanbi_mian"
                size="0.28rem"
                color="#dddddd"
                class="my_icon"
                :class="index < 3 ? 'iconactive' : ''"
                @click.native="deleteToMyPlate(index)"
              ></my-icon>
            </div>
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
            <div v-for="(item, index) in morePlate" :key="index" class="item">
              {{ item }}
              <my-icon
                v-show="showIcon"
                name="fabu_mian"
                size="0.28rem"
                color="#dddddd"
                class="my_icon"
                @click.native="addToMyPlate(index)"
              ></my-icon>
            </div>
          </div>
        </div>
      </div>
    </sp-popup>
    <!-- 弹出框tab修改列表 end -->
    <!-- 弹出框文章 start -->
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
    <!-- 弹出框文章 end -->
    <!-- 底部tab start -->
    <Bottombar v-if="!isInApp" ref="bottombar" />
    <!-- 底部tab end -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { WorkTab, WorkTabs, Popup, Sticky, Tab, Tabs } from '@chipspc/vant-dgg'
import AttentionItem from '@/components/mustKnown/recommend/AttentionItem'
import NotAttention from '@/pages/known/attention/NotAttention'
import VisitUser from '@/components/mustKnown/recommend/VisitUser'
import ListItem from '@/components/mustKnown/recommend/ListItem'
import ItemCard from '@/components/mustKnown/recommend/ItemCard'
import Search from '@/components/mustKnown/recommend/search/Search'
// import Tabs from '@/components/mustKnown/recommend/tabs'
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
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Search,
    // Tabs,
    ListItem,
    ItemCard,
    VisitUser,
    AttentionItem,
    Bottombar,
    NotAttention,
  },
  data() {
    return {
      attentionStatus: true, // 已关注
      showNotAttention: false, // 未关注
      title: '考研复试体检包含什么项目',
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识', '数据'],
      editFinish: '编辑',
      nowIndex: 2,
      showPop: false,
      showIcon: false,
      status: true,
      showArticlePop: false,
      infoList: [
        {
          item: 1,
        },
        {
          item: 1,
        },
      ],
      myPlate: [
        '关注',
        '推荐',
        '热榜',
        '法律',
        '交易',
        '知产',
        '知识',
        '互联网',
        '工商注册',
        '办证',
        '刻章',
      ],
      morePlate: [
        '关注',
        '推荐',
        '热榜',
        '法律',
        '交易',
        '知产',
        '知识',
        '互联网',
        '工商注册',
        '办证',
        '刻章',
      ],
      tabIndex: 1,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      isShowOpenApp: (state) => state.app.isShowOpenApp,
    }),
  },
  mounted() {},
  methods: {
    toggleTabs(index) {
      console.log('index', index)
      this.tabIndex = index
    },
    OpenPop(event) {
      // console.log('evnet', event)
      if (event) {
        this.showPop = event
      }
    },
    getBackIndex(event) {
      if (event) {
        console.log(event)
      }
    },
    openArticle() {
      // console.log('open')
      this.showArticlePop = true
    },
    closePop() {
      this.showArticlePop = false
    },
    editIcon(status) {
      if (status) {
        this.showIcon = true
        this.editFinish = '完成'
        this.status = false
      } else {
        this.showIcon = false
        this.editFinish = '编辑'
        this.status = true
      }
    },
    addToMyPlate(index) {
      console.log('index', index)
      const arrayValue = this.morePlate[index]
      if (arrayValue) {
        this.myPlate.push(arrayValue)
        this.morePlate.pop(index)
      }
    },
    // changeTab(name, title) {
    //   console.log(name)
    // },
  },
}
</script>
<style lang="less" scoped>
.active {
  color: #cccccc !important;
}
.iconactive {
  display: none;
}
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
    padding: 0 32px;

    .tabs-box-items {
      display: flex;
      overflow: auto;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .li-tab {
        flex-shrink: 0;
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 32px;
        margin-right: 48px;
        .line {
          width: 24px;
          height: 6px;
          background: #4974f5;
          border-radius: 3px;
          margin-top: 12px;
          margin: 0 auto;
          margin-top: 12px;
        }
      }
      .active {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 32px;
      }

      // li:nth-child(1) {
      //   // margin-left: 20px;
      // }
      // li:nth-last-child(1) {
      //   margin-right: 16px;
      // }
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
          flex-flow: row wrap;
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
            margin: 8px 0;
            position: relative;
            margin-right: 18px;
            > .my_icon {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          div:nth-child(4n + 4) {
            margin-right: 0;
          }
        }
      }
    }
    .popContentTwo {
      margin-top: 72px;
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
          flex-flow: row wrap;
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
            margin: 8px 0;
            position: relative;
            margin-right: 18px;
            > .my_icon {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          div:nth-child(4n + 4) {
            margin-right: 0;
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
