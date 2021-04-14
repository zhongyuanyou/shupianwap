<template>
  <div class="answer">
    <div class="answer_container">
      <sp-tabs
        v-model="active"
        class="answer_container_tabs"
        @click="tabChange"
      >
        <sp-tab
          v-for="(item, index) in answerTabs"
          :key="index"
          :title="item"
          :name="index"
        ></sp-tab>
      </sp-tabs>
    </div>
    <!-- <div class="answer_container--line"></div> -->
    <!-- 回答推荐 start -->
    <div v-if="showItem" class="answer_item">
      <sp-list
        v-if="answerList.length"
        v-model="loading"
        :finished="finished"
        offset="0"
        finished-text="没有更多了"
      >
        <sp-cell v-for="(item, index) in answerList" :key="index">
          <div class="item" @click="$router.push('/known/detail/article')">
            <div class="item_content">
              <div class="item_content_lf">
                <div class="item_Info">
                  <div class="user_photo">
                    <img src="" alt="" />
                  </div>
                  <div class="user_name">
                    <p>{{ item.userName }}</p>
                    <div class="user_answer">的提问期待你的解答30分钟前</div>
                  </div>
                </div>
                <p class="content">
                  {{ item.content }}
                </p>
              </div>
            </div>
            <div class="item_bottom">
              <p>{{ item.answerCount }} 回答 · {{ item.collectCount }}收藏</p>
              <div class="btn" @click="goAnswer(item.id)">写回答</div>
            </div>
          </div>
        </sp-cell>
      </sp-list>
    </div>
    <!-- 回答推荐 end -->
    <!-- 回答邀请 start -->
    <div v-if="showInvite" class="answer_invite">
      <sp-list
        v-if="inviteList.length"
        v-model="loading"
        :finished="finished"
        offset="0"
        finished-text="没有更多了"
      >
        <sp-cell v-for="(item, index) in inviteList" :key="index">
          <div class="item">
            <div class="item_content">
              <div class="item_content_lf">
                <div
                  class="item_Info"
                  @click="
                    $router.push({
                      path: '/known/detail/article',
                      query: { id: item.id },
                    })
                  "
                >
                  最近{{ item.browseCount / 10000 }}万人浏览
                </div>
                <p
                  class="content"
                  @click="
                    $router.push({
                      path: '/known/detail/article',
                      query: { id: item.id },
                    })
                  "
                >
                  {{ item.content }}
                </p>
              </div>
            </div>
            <div class="item_bottom">
              <p>{{ item.answerCount }}回答 · {{ item.collectCount }}收藏</p>
              <div class="btn" @click="goAnswer(item.id)">写回答</div>
            </div>
          </div>
        </sp-cell>
      </sp-list>
    </div>
    <!-- 回答问题 end -->
  </div>
</template>
<script>
import {
  Tabs,
  Tab,
  TopNavBar,
  Toast,
  PullRefresh,
  List,
  Cell,
} from '@chipspc/vant-dgg'
import { knownApi } from '@/api'

export default {
  name: 'Answer',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
  },
  props: {
    answerList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      inviteList: [],
      haisdaas: true,
      showItem: true,
      showInvite: false,
      answerTabs: ['推荐', '邀请'],
      active: 2,
      loading: true,
      finished: false,
      tabIndex: 0,
    }
  },
  methods: {
    tabChange(name, title) {
      console.log('name', name)
      this.tabIndex = name
      if (this.tabIndex === 0) {
        this.showItem = true
        this.showInvite = false
        this.getAnswerList()
      } else if (this.tabIndex === 1) {
        console.log('this.tabIndex', this.tabIndex)
        this.showInvite = true
        this.showItem = false
        this.getList()
      }
    },
    // 请求回答列表
    async getAnswerList() {
      const params = {}
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.recommendList,
        params
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          console.log('this.rows', data.rows)
          this.answerList = data.rows
        } else {
          // this.attentionStatus = false
          // this.showNotAttention = true
        }
      } else {
        console.log(message)
      }
    },
    // 请求邀请
    async getList() {
      const params = {
        limit: 10,
        page: 1,
      }
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.findMyInvitedPage,
        params
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.inviteList = data.rows
          console.log('this.inviteList', this.inviteList)
        } else {
          // this.attentionStatus = false
          // this.showNotAttention = true
        }
      } else {
        console.log(message)
      }
    },
    // 去回答页面
    goAnswer(id) {
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          id,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .sp-cell {
  padding: 40px 32px;
  border-top: 1px solid #ddd;
}

/deep/ .sp-tab {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 400;
  color: #999999;
}
/deep/ .sp-tab--active {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #222222;
}
/deep/ .sp-tabs__line {
  width: 28px;
  height: 3px;
  background: #4974f5;
  border-radius: 3px;
}
.active {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #222222;
}
.answer_container {
  margin-bottom: 2px;
  &_tabs {
    height: 80px;
    padding: 0 32px;
    display: flex;
    align-items: center;
    &_items {
      width: 60px;
      height: 30px;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
    }
    .active {
      width: 60px;
      height: 30px;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 30px;
    }
  }
  &--line {
    height: 1px;
    background: #dddddd;
  }
}
.answer_item {
  .item {
    background: #fff;
    border-radius: 12px;
    // position: relative;
    .item_title {
      height: 36px;
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1a1a1a;
      line-height: 36px;
    }

    .item_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .item_content_lf {
        .item_Info {
          display: flex;
          margin-bottom: 20px;
          align-items: center;
          .user_photo {
            width: 72px;
            height: 72px;

            background: #6d7177;
            margin-right: 16px;
            border-radius: 50%;
            img {
            }
          }
          .user_name {
            height: 0.72rem;
            padding: 3px 0;
            p {
              height: 30px;
              font-size: 30px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #222222;
              line-height: 30px;
            }
            .user_answer {
              height: 24px;
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
              line-height: 24px;
              margin-top: 12px;
            }
          }
        }
        .content {
          min-height: 80px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 40px;
          // margin-right: 0.32rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .item_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
      }
      .btn {
        // position: absolute;
        // top: 232px;
        // right: 0;
        width: 160px;
        height: 64px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 64px;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}
.answer_invite {
  .item {
    background: #fff;
    border-radius: 12px;
    // position: relative;
    .item_title {
      height: 36px;
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #1a1a1a;
      line-height: 36px;
    }

    .item_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .item_content_lf {
        .item_Info {
          height: 28px;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
          margin-bottom: 32px;
        }
        .content {
          min-height: 80px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 40px;
          // margin-right: 0.32rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .item_bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
      }
      .btn {
        // position: absolute;
        // top: 232px;
        // right: 0;
        width: 160px;
        height: 64px;
        background: #4974f5;
        border-radius: 8px;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 64px;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}
</style>
