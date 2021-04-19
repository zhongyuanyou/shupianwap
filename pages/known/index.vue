<template>
  <div class="container">
    <div class="container_head">
      <Search
        value="请输入关键词搜索"
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
    </sp-sticky>

    <Answer
      v-if="tabs[active].executionParameters === 'huida'"
      :answer-list="answerList"
    />

    <Attention v-else-if="tabs[active].executionParameters === 'guanzhu'"
      >关注</Attention
    >
    <hot-list
      v-else-if="tabs[active].executionParameters === 'rebang'"
      :category-id="tabs[active].id"
    />
    <Recommend v-else-if="tabs[active].executionParameters === 'tuijian'" />

    <ordinary-list v-else :categor-ids="tabs[active].id" />

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
      <div class="answer_article">
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
} from '@chipspc/vant-dgg'
import Recommend from '@/components/mustKnown/Recommend'
import Attention from '@/components/mustKnown/attention/Index'
import HotList from '@/components/mustKnown/hotList/Index'
import OrdinaryList from '@/components/mustKnown/OrdinaryList'
import Answer from '@/components/mustKnown/answer/Answer'
import Search from '@/components/mustKnown/recommend/search/Search'
import Bottombar from '@/components/common/nav/Bottombar'
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
    Search,
    Answer,
    Bottombar,
    Recommend,
    Attention,
    HotList,
    OrdinaryList,
  },
  async asyncData({ $axios, store }) {
    const { code, message, data } = await $axios.get(
      knownApi.questionArticle.categoryList,
      {
        params: {
          // type 1 获取企大顺导航 2 获取薯片wap和app导航
          type: store.state.app.isInApp ? 1 : '',
        },
      }
    )
    return {
      tabs: data,
      morePlate: data.slice(4, data.length),
      myPlate: data.slice(0, 3),
    }
  },
  data() {
    return {
      answerList: [],
      editFinish: '编辑',
      showPop: false,
      showIcon: false,
      status: true,
      showArticlePop: false,
      myPlate: [],
      morePlate: [],
      active: 0,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {
    console.log(this.tabs)
  },
  methods: {
    toggleTabs() {
      console.log(this.active)
    },
    // 请求回答列表
    async getAnswerList(limit, page) {
      const params = {
        handleUserId: this.userInfo.userId || this.$cookies.get('userId'),
        type: 1,
        limit,
        page,
      }

      const { code, message, data } = await this.$axios.get(
        knownApi.question.writeAnswer,
        { params }
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.answerList = data.rows
        } else {
        }
      } else {
      }
    },
    async isLogin() {
      if (this.userInfo.userId && this.userInfo.token) {
        return true
      } else if (this.isInApp) {
        await this.$appFn.dggLogin()
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.fullPath,
          },
        })
      }
    },
    // 打开文章编辑框
    openArticle() {
      if (!this.isLogin()) {
        return
      }
      this.showArticlePop = true
    },
    // 编辑
    editIcon(status) {
      if (status) {
        this.showIcon = true
        this.editFinish = '完成'
        this.status = false
        localStorage.setItem('tabsList', JSON.stringify(this.myPlate))
      } else {
        this.showIcon = false
        this.editFinish = '编辑'
        this.status = true
      }
    },
    // 添加到我的列表中
    addToMyPlate(index) {
      const arrayValue = this.morePlate[index]
      if (arrayValue) {
        this.myPlate.push(arrayValue)
        this.morePlate.pop(index)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.sp-sticky {
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
  font-weight: 500;
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
  background: #fff;
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
  .category_box {
    display: flex;
    align-items: center;
    .sp-tabs {
      width: 670px;
      /deep/.sp-tab {
        font-size: 32px;
        font-weight: 500;
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
      font-weight: 500;
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
