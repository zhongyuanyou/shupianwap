<template>
  <div>
    <Header title="写回答" :fixed="true" @leftClickFuc="onClickLeft" />
    <div class="main">
      <sp-tabs v-model="active" @change="init">
        <sp-tab title="推荐">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="list"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoadRecommend"
          >
            <div
              v-for="(item, index) in recommendList"
              :key="index"
              class="item"
            >
              <div class="user-info">
                <div class="img" :src="item.avatar"></div>
                <div class="infos">
                  <p class="user-name">{{ item.userName || '' }}</p>
                  <p class="pub-time">
                    的提问期待你的回答 · {{ item.time || '' }}前
                  </p>
                </div>
              </div>
              <div class="item-content">{{ item.contentText }}</div>
              <div class="item-bottom">
                <div class="left">
                  {{ item.num1 }}回答 · {{ item.num2 }}关注
                </div>
                <div class="btn">
                  <sp-button type="primary" @click="chooseQue(item.id)"
                    >写回答</sp-button
                  >
                </div>
              </div>
            </div>
          </sp-list>
        </sp-tab>
        <sp-tab title="邀请">
          <sp-list
            v-model="loading1"
            :finished="finished1"
            finished-text="没有更多了"
            class="list"
            :error.sync="error1"
            error-text="请求失败，点击重新加载"
            :immediate-check="immediateCheck"
            @load="onLoadAnswer"
          >
            <div v-for="(item, index) in answerList" :key="index" class="item">
              <p class="view-num">最近 2.3 万人浏览</p>
              <div class="item-content">{{ item.content }}</div>
              <div class="item-bottom">
                <div class="left">
                  {{ item.num1 }}回答 · {{ item.num2 }}关注
                </div>
                <div class="btn">
                  <sp-button type="primary" @click="chooseQue(item.id)"
                    >写回答</sp-button
                  >
                </div>
              </div>
            </div>
          </sp-list>
        </sp-tab>
      </sp-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tab, Tabs, Button, List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import knownApi from '@/api/known'

export default {
  components: {
    Header,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [List.name]: List,
  },
  data() {
    return {
      error: false,
      loading: false,
      finished: false,
      recommendPage: 1,
      error1: false,
      loading1: false,
      finished1: false,
      answerPage: 1,
      recommendList: [],
      answerList: [],
      active: 0,
      isFromApp: '', // 是否从APP跳转
      immediateCheck: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId, // userId 用于判断登录
    }),
  },
  methods: {
    init() {
      // 初始化数据
      this.recommendList = []
      this.answerList = []
      this.recommendPage = 1
      this.answerPage = 1
      this.error = false
      this.error1 = false
      this.writeAnswerApi()
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    cancel() {
      this.id = ''
    },
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
    setTopic(val) {
      this.topics = val
      const arr = val.map((item) => {
        return item.name
      })
      this.topicStr = arr.join(',')
      console.log('话题', this.topics)
      console.log('topicStr', this.topicStr)
    },
    chooseQue(id) {
      this.id = id
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          id,
          type: 2,
        },
      })
    },
    editorChange(val) {
      this.formData.content = val
    },
    onLoadRecommend() {
      this.writeAnswerApi()
    },
    onLoadAnswer() {
      this.writeAnswerApi()
    },
    async writeAnswerApi() {
      try {
        const params = {
          type: this.active === 0 ? 1 : 2, // 1 推荐回答 2 邀请回答
          handleUserId: this.userId,
          page: this.active === 0 ? this.recommendPage : this.answerPage,
          limit: 10,
        }
        const { code, data } = await this.$axios.get(
          knownApi.question.writeAnswer,
          { params }
        )
        if (this.active === 0) {
          this.buildRecommendData(code, data)
        } else {
          this.buildAnswerData(code, data)
        }
      } catch (e) {
        if (this.active === 0) {
          this.error = true
          this.loading = false
        } else {
          this.error1 = true
          this.loading1 = false
        }
      }
    },
    buildRecommendData(code, data) {
      if (code === 200) {
        if (data.rows || data.rows.length === 0) {
          this.recommendList = []
          this.finished = true
        }
        this.recommendList.push(...data.rows)
        this.recommendPage++
        if (this.recommendPage > data.totalPage) {
          this.finished = true
        }
      } else {
        this.error = true
      }
      this.loading = false
    },
    buildAnswerData(code, data) {
      if (code === 200) {
        if (data.rows || data.rows.length === 0) {
          this.answerList = []
          this.finished1 = true
        }
        this.answerList.push(...data.rows)
        this.answerPage++
        if (this.answerPage > data.totalPage) {
          this.finished1 = true
        }
      } else {
        this.error1 = true
      }
      this.loading1 = false
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.my-head {
  box-shadow: unset;
}
.main {
  /deep/.sp-tabs {
    .sp-tabs__wrap {
      height: 72px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ddd;
      .sp-tab {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 30px;
      }
      .sp-tab--active {
        color: #222222;
        font-weight: bold;
      }
      .sp-tab__text--ellipsis {
        overflow: unset;
      }
      .sp-tabs__line {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
      }
    }
  }
}
.list {
  padding: 0 32px;
  .item {
    padding: 40px 0;
    font-size: 28px;
    color: #222;
    border-bottom: 1px solid #ddd;
    .view-num {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
      margin-bottom: 20px;
    }
    .user-info {
      width: 100%;
      height: 92px;
      .img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: #f4f4f4;
        float: left;
      }
      .infos {
        width: auto;
        padding-left: 92px;
        min-width: 500px;
        .user-name {
          font-size: 30px;
          color: #222222;
        }
        .pub-time {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .item-content {
      height: auto;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 40px;
      margin-bottom: 20px;
      .textOverflow(2);
    }
    .item-bottom {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 26px;
        color: #999;
      }
      .btn {
        width: 180px;
        height: 64px;
        background: #4974f5;
        border-radius: 8px;
        text-align: center;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        .sp-button {
          width: 160px;
          height: 64px;
          background: #4974f5;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
