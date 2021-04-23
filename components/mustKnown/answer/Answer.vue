<template>
  <div class="answer">
    <div class="answer_container">
      <sp-tabs v-model="active" @click="tabChange">
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
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <sp-cell v-for="(item, index) in list" :key="index">
        <div class="item" @click="toDetail(item)">
          <div class="item_browse">最近 {{ item.totalBrowseCount }}人浏览</div>
          <div class="item_content">
            {{ item.contentText }}
          </div>
          <div class="item_bottom">
            <p>{{ item.answerCount }} 回答 · {{ item.collectCount }} 收藏</p>
            <div class="btn" @click.stop="goAnswer(item.id)">写回答</div>
          </div>
        </div>
      </sp-cell>
    </sp-list>
  </div>
</template>
<script>
import { Tabs, Tab, List, Cell } from '@chipspc/vant-dgg'
import { knownApi } from '@/api'

export default {
  name: 'Answer',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Cell.name]: Cell,
  },
  data() {
    return {
      answerTabs: ['推荐', '邀请'],
      active: 0,
      loading: false,
      finished: false,
      list: [],
      page: 1,
      limit: 10,
      error: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  methods: {
    tabChange() {
      this.page = 1
      this.limit = 10
      this.list = []
      this.finished = false
      this.loading = true
      this.error = false
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
.list {
  background: #fff;
}
/deep/ .sp-cell {
  width: 686px;
  margin: 0 auto;
  padding: 40px 0;
  position: relative;
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #dddddd;
    -webkit-transform: scaleY(0.6);
    transform: scaleY(0.6);
  }
}
/deep/ .sp-tabs__wrap {
  height: 80px;
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
.answer_container {
  border-bottom: 1px solid #ddd;

  &_tabs {
    height: 80px;
    padding: 0 32px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
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
  .item_browse {
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 28px;
    margin-bottom: 32px;
  }

  .item_content {
    margin-bottom: 20px;
    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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
