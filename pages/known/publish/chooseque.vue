<template>
  <div class="chooseque">
    <Header title="写回答" :fixed="true" />
    <div class="main">
      <sp-tabs v-model="active" @change="changeTab">
        <sp-tab title="推荐">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="list"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in list"
              :key="index"
              class="item"
              @click="toDetail(item)"
            >
              <div class="user-info">
                <sp-image
                  round
                  class="img"
                  fit="cover"
                  :src="item.avatar"
                  @click.stop="toHome(item)"
                />
                <div class="infos">
                  <p class="user-name">{{ item.userName || '' }}</p>
                  <p class="pub-time">
                    的提问期待你的回答 · {{ item.createTime || '' }}
                  </p>
                </div>
              </div>
              <div class="item-content">{{ item.title }}</div>
              <div class="item-bottom">
                <div class="left">
                  {{ item.answerCount }} 回答 · {{ item.collectCount }} 收藏
                </div>
                <div class="btn">
                  <sp-button type="primary" @click.stop="chooseQue(item)"
                    >写回答</sp-button
                  >
                </div>
              </div>
            </div>
          </sp-list>
        </sp-tab>
        <sp-tab title="邀请">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="list"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in list"
              :key="index"
              class="item"
              @click="toDetail(item)"
            >
              <p class="view-num">最近{{ item.browseCount }}人浏览</p>
              <div class="item-content">{{ item.title }}</div>
              <div class="item-bottom">
                <div class="left">
                  {{ item.answerCount }} 回答 · {{ item.collectCount }} 收藏
                </div>
                <div class="btn">
                  <sp-button type="primary" @click.stop="chooseQue(item)"
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
import { Tab, Tabs, Button, List, Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import knownApi from '@/api/known'

export default {
  components: {
    Header,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [List.name]: List,
    [Image.name]: Image,
  },
  data() {
    return {
      error: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 15,
      list: [],
      active: 0,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId, // userId 用于判断登录
    }),
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    changeTab() {
      this.init()
      this.onLoad()
    },
    init() {
      this.list = []
      this.page = 1
      this.error = false
      this.finished = false
      this.loading = true
    },
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: 2, // 推荐的用户都是规划师
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
    chooseQue(item) {
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          id: item.id,
        },
      })
    },
    editorChange(val) {
      this.formData.content = val
    },
    onLoad() {
      this.writeAnswerApi()
    },
    async writeAnswerApi() {
      try {
        const params = {
          type: this.active === 0 ? 1 : 2, // 1 推荐回答 2 邀请回答
          handleUserId: this.userId,
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
        } else {
          this.error = true
        }
        this.loading = false
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep.my-head {
  box-shadow: unset;
}
.chooseque {
  background: #fff;
}
.main {
  ::v-deep.sp-tabs {
    .sp-tabs__wrap {
      height: 72px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f4f4f4;
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
    border-bottom: 1px solid #f4f4f4;
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
      font-weight: bold;
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
        // width: 180px;
        height: 64px;
        background: #4974f5;
        border-radius: 8px;
        text-align: center;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        .sp-button {
          width: 100%;
          height: 100%;
          background: #4974f5;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>
