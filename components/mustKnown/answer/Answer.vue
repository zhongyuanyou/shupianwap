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
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list"
      @load="onLoad"
    >
      <sp-cell v-for="(item, index) in list" :key="index">
        <div class="item" @click="toDetail(item)">
          <div class="item_content">
            <div class="item_content_lf">
              <div class="item_Info">
                <div class="user_photo">
                  <img :src="item.avatar" alt="" />
                </div>
                <div class="user_name">
                  <p>{{ item.userName }}</p>
                  <div class="user_answer">
                    的提问期待你的解答{{ item.createTime }}
                  </div>
                </div>
              </div>
              <p class="content">
                {{ item.contentText }}
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
  Skeleton,
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
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      answerTabs: ['推荐', '邀请'],
      active: 2,
      loading: false,
      finished: false,
      list: [],
      page: 1,
      limit: 10,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  methods: {
    tabChange() {
      console.log(this.active)
      this.page = 1
      this.limit = 10
      this.list = []
      this.finished = false
      this.loading = true
      this.writeAnswerApi()
    },
    onLoad() {
      this.writeAnswerApi()
    },
    async writeAnswerApi() {
      try {
        const params = {
          type: this.active ? 2 : 1, // 1 推荐回答 2 邀请回答
          handleUserId: this.userInfo.userId,
          page: this.page,
          limit: this.limit,
        }
        const { code, data } = await this.$axios.get(
          knownApi.question.writeAnswer,
          { params }
        )
        if (code === 200) {
          this.list.push(...data.rows)
          this.page++
          if (this.page > data.totalPage) {
            this.finished = true
          }
          this.loading = false
        } else {
          this.error = true
        }
        this.loading = false
      } catch (e) {
        this.error = true
        this.loading = false
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
    toDetail(item) {
      this.$router.push({
        path: '/known/detail/question',
        query: {
          id: item.id,
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
            width: 100%;
            height: 100%;
            border-radius: 50%;
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
</style>
