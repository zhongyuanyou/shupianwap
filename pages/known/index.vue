<template>
  <!--<div
    :class="
      tabs[active].executionParameters === 'guanzhu'
        ? 'flex_column container'
        : 'container'
    "
  >-->
  <div class="container">
    <header-slot height="1.8rem">
      <div class="container_head">
        <Search
          value="请输入关键词搜索"
          :icon-left="0.2"
          @click.native="$router.push('/known/search')"
        >
          <template v-if="isInApp" v-slot:left>
            <sp-icon name="arrow-left" size="0.4rem" @click="$back()" />
          </template>
        </Search>
        <my-icon
          name="fabu_mian"
          size="0.52rem"
          color="#4974F5"
          class="my_icon"
          @click.native="openArticle"
        ></my-icon>
      </div>
      <div class="category_box">
        <sp-tabs
          v-model="active"
          title-active-color="#222222"
          title-inactive-color="#999999"
          @change="toggleTabs"
        >
          <sp-tab
            v-for="(item, index) in tabs"
            :key="index"
            :title="item.name"
            :name="index"
          ></sp-tab>
        </sp-tabs>
        <my-icon
          name="fenlei"
          size="0.32rem"
          color="#1A1A1A"
          class="my_icon"
          @click.native="showPop = true"
        ></my-icon>
      </div>
    </header-slot>
    <template v-if="tabs && tabs.length">
      <Answer v-if="tabs[active].executionParameters === 'huida'" />

      <Attention v-else-if="tabs[active].executionParameters === 'guanzhu'"
        >关注</Attention
      >
      <hot-list
        v-else-if="tabs[active].executionParameters === 'rebang'"
        :category-id="tabs[active].id"
      />
      <Recommend v-else-if="tabs[active].executionParameters === 'tuijian'" />
      <ordinary-list v-else :categor-ids="tabs[active].id" />
    </template>

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
          <div class="my_icon close_btn" @click="showPop = false">×</div>
        </div>
        <div class="popMiddle">
          <div class="spans">
            <div class="popMiddle_span1">我的板块</div>
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
              <div class="item_name">{{ item.name }}</div>
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
          </div>
        </div>
        <div class="list">
          <div class="list_items">
            <div v-for="(item, index) in morePlate" :key="index" class="item">
              <div class="item_name">{{ item.name }}</div>
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
          <img :src="userInfo.avatar" alt="" />
        </div>
        <span>{{ userInfo.userName }}</span>
      </div>
      <div v-if="!isInApp" class="answer_article">
        <div class="item" @click="$router.push('/known/publish/question')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9blv1fi2icc0000.png"
            alt=""
          />
          <span>提个问题</span>
        </div>
        <div class="item" @click="$router.push('/known/publish/chooseque')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/8sixz8dnnt40000.png"
            alt=""
          />
          <span>回答问题</span>
        </div>
        <div class="item" @click="$router.push('/known/publish/article')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/eoeulbunbpk0000.png"
            alt=""
          />
          <span>写文章</span>
        </div>
      </div>
      <div v-else class="answer_article app">
        <div class="item" @click="$router.push('/known/publish/question')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9blv1fi2icc0000.png"
            alt=""
          />
          <span>提个问题</span>
        </div>
        <div class="item" @click="$router.push('/known/publish/article')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/eoeulbunbpk0000.png"
            alt=""
          />
          <span>写文章</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="button" @click="showArticlePop = false">取消</div>
    </sp-popup>
    <!-- 弹出框文章 end -->
    <!-- 底部tab start -->
    <Bottombar v-if="!isInApp" ref="bottombar" />
    <!-- 底部tab end -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  WorkTab,
  WorkTabs,
  Popup,
  Sticky,
  Tab,
  Tabs,
  PullRefresh,
  Icon,
} from '@chipspc/vant-dgg'
import Recommend from '@/components/mustKnown/Recommend'
import Attention from '@/components/mustKnown/attention/Index'
import HotList from '@/components/mustKnown/hotList/Index'
import OrdinaryList from '@/components/mustKnown/OrdinaryList'
import Answer from '@/components/mustKnown/answer/Answer'
import Search from '@/components/mustKnown/recommend/search/Search'
import Bottombar from '@/components/common/nav/Bottombar'
import HeaderSlot from '@/components/common/head/HeaderSlot'
import { knownApi } from '@/api'

export default {
  name: 'Index',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    Search,
    Answer,
    Bottombar,
    Recommend,
    Attention,
    HotList,
    OrdinaryList,
    HeaderSlot,
  },
  async asyncData({ $axios, store }) {
    const { code, message, data } = await $axios.get(
      knownApi.questionArticle.categoryList,
      {
        params: {
          // type 1 获取企大顺导航
          type: store.state.app.isInApp ? 1 : '',
          // type: 1,
        },
      }
    )
    return {
      tabs: data,
    }
  },
  data() {
    return {
      loading: false, // 加载状态
      editFinish: '编辑',
      showPop: false,
      showIcon: false,
      status: true,
      showArticlePop: false,
      myPlate: [],
      morePlate: [],
      active: 0,
      statusBarHeight: '',
      appStyle: {
        'padding-left': '12px',
        'padding-right': '16px',
        'padding-top': '',
      },
      tapSafeApp: {
        height: '',
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
    }),
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {
    if (this.appInfo) {
      this.statusBarHeight = this.appInfo.statusBarHeight
    }
    // this.containerStyle['padding-top'] = this.appInfo.statusBarHeight + 'px'
    this.appStyle['padding-top'] = this.statusBarHeight * 2 + 'px'
    this.tapSafeApp.height = this.statusBarHeight + 'px'
    this.init()
  },
  methods: {
    init() {
      if (localStorage.getItem('morePlate')) {
        this.morePlate = JSON.parse(localStorage.getItem('morePlate'))
        this.myPlate = this.tabs.filter(
          (item) => !this.morePlate.some((ele) => ele.id === item.id)
        )
        this.morePlate = this.tabs.filter((item) =>
          this.morePlate.some((ele) => ele.id === item.id)
        )
        this.tabs = this.myPlate
      } else {
        this.myPlate = this.tabs
      }
    },
    toggleTabs() {},
    // 打开文章编辑框
    async openArticle() {
      const result = await this.$isLogin()
      // 必须判断是否全等true 因为result可能会返回字符串
      if (result === true) {
        this.showArticlePop = true
      }
    },
    // 编辑
    editIcon(status) {
      if (status) {
        this.showIcon = true
        this.editFinish = '完成'
        this.status = false
      } else {
        this.showIcon = false
        this.editFinish = '编辑'
        this.status = true
        localStorage.setItem('morePlate', JSON.stringify(this.morePlate))
      }
    },
    // 添加到我的列表中
    addToMyPlate(index) {
      const arrayValue = this.morePlate[index]
      console.log('arrayValue1', arrayValue)
      if (arrayValue) {
        this.myPlate.push(arrayValue)
        this.morePlate.splice(index, 1)
      }
    },
    deleteToMyPlate(index) {
      if (index === this.active) {
        this.active--
      }
      const arrayValue = this.myPlate[index]
      if (arrayValue) {
        this.morePlate.push(arrayValue)
        this.myPlate.splice(index, 1)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.top-safe-app {
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 99;
}
/deep/ .sp-sticky {
  background: #fff;
}
.active {
  color: #cccccc !important;
}
.iconactive {
  display: none;
}
.tab_active {
  height: 32px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #222222;
  line-height: 32px;
}
.line_active {
  width: 24px;
  height: 6px;
  background: #4974f5;
  border-radius: 3px;
  margin-top: 12px;
  margin: 0 auto;
  margin-top: 12px;
}
.close_btn {
  background: #f5f5f5;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 40px;
  color: #999999;
  line-height: 48px;
  text-align: center;
}
::v-deep .sp-work-tab--active {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #222222;
}
/deep/ .sp-work-tab__text {
  flex-shrink: 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #999999;
}
/deep/ .sp-work-tabs__line {
  width: 24px;
  height: 6px;
  background: #4974f5;
  border-radius: 3px;
}
.flex_column {
  display: flex;
  flex-direction: column;
}

.container {
  height: 100%;
  background: #f5f5f5;
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    background: #fff;
  }
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
  .container_head_app {
    display: flex;
    justify-content: space-between;
    height: 88px;
    align-items: center;
    padding-left: 12px;
    padding-right: 16px;
    .my_icon {
      width: 52px;
      height: 52px;
      margin-left: 32px;
    }
  }
  .category_box {
    display: flex;
    align-items: center;
    .sp-tabs {
      width: 670px;
      /deep/.sp-tab {
        font-size: 32px;
        font-weight: 600;
      }
    }
    /deep/.sp-tabs__line {
      width: 24px;
      height: 6px;
      border-radius: 3px;
      bottom: 32px;
    }
    .my_icon {
      margin-left: 10px;
    }
  }
  .container_news_see {
    height: 136px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    margin-bottom: 24px;
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
        font-weight: 600;
        color: #133aa3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .news_span {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
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
        font-weight: 600;
        color: #564499;
        line-height: 28px;
        margin-left: 12px;
      }
    }
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
          font-weight: 600;
          color: #222222;
        }
        .my_icon {
          width: 48px;
          height: 48px;
        }
      }
      .popMiddle {
        padding: 10px 0;
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
            font-weight: 600;
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
            // font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            // line-height: 28px;
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
            > .item_name {
              width: 84px;
              // height: 28px;
              text-align: center;
              font-size: 26px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
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
            font-weight: 600;
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
            > .item_name {
              width: 84px;
              height: 28px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-align: center;
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
      font-weight: 600;
      color: #555555;
      line-height: 28px;
      > .popUserPhoto {
        > img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
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
          font-weight: 600;
          color: #222222;
          line-height: 24px;
          display: block;
          margin-top: 24px;
        }
      }
    }
    .answer_article.app {
      justify-content: space-around;
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
