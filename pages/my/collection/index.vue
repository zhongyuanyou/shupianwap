<template>
  <div class="collection_container">
    <sp-tabs
      title-active-color="#4974F5"
      title-inactive-color="#222222"
      @click="changeTab"
    >
      <sp-tab
        v-for="item in tabs"
        :key="item.id"
        :title="item.tile"
        :name="item.id"
      ></sp-tab>
    </sp-tabs>
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list_container"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      offset="30"
    >
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="title clamp2">{{ item.title }}</div>
        <!-- 除了回答,都有人物头像和图片 -->
        <div v-if="tabIndex !== 1" class="user">
          <sp-image
            round
            class="user_avatar"
            fit="cover"
            :src="item.avatar"
          />{{ item.userName }}
        </div>
        <div v-if="item.contentImageUrl === ''" class="content clamp2">
          {{ item.contentText }}
        </div>
        <div v-else class="content_img">
          <div class="left_content clamp3">
            {{ item.contentText }}
          </div>
          <sp-image class="right_img" fit="cover" :src="item.contentImageUrl" />
        </div>
        <div class="bottom">
          {{
            tabIndex !== 1
              ? `${item.applaudCount} 赞 ${item.remarkCount} 评论`
              : `${item.answerCount} 回答 · ${item.collectCount} 收藏`
          }}
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tabs, Tab, Image, List } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'

export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
  },
  data() {
    return {
      content: '',
      tabs: [
        {
          tile: '问题',
          id: 1,
        },
        {
          tile: '回答',
          id: 3,
        },
        {
          tile: '文章',
          id: 2,
        },
      ],
      list: [],
      loading: false,
      finished: false,
      page: 1,
      tabIndex: 1,
      limit: 10,
      error: false,
      totalPage: 1,
      apiLock: false, // tab 切换会有重复发送请求问题,这里设置lock锁,防止重复请求
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
  },
  methods: {
    changeTab(name) {
      if (this.tabIndex === name) {
        return
      }
      // 重置 list 列表页面渲染参数
      this.page = 1
      this.tabIndex = name
      this.finished = false
      this.error = false
      this.apiLock = false
      this.list = []
      this.onLoad()
    },
    onLoad() {
      if (this.page > this.totalPage) {
        this.finished = true
        return
      }
      if (!this.apiLock) {
        this.getList()
      }
    },
    async getList() {
      this.apiLock = true
      try {
        const params = {
          handleUserId: this.userId,
          dateType: this.tabIndex, //  1问题 2文章 3回答.默认问题
          limit: 10,
          page: this.page,
        }
        const res = await this.$axios.get(knownApi.home.collection, { params })
        if (res.code === 200) {
          if (!res.data.rows || res.data.rows.length === 0) {
            this.finished = true
          } else {
            this.list.push(...res.data.rows)
            this.totalPage = res.data.totalPage
            // 当成功时,则处理 page ++
            this.page++
          }
        } else {
          this.error = true
        }
        this.loading = false
        this.apiLock = false
      } catch (e) {
        this.error = true
        this.loading = false
        this.apiLock = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.collection_container {
  height: 100%;
  background-color: #f8f8f8;

  .sp-tabs {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 88px;
  }

  /deep/ .sp-tabs__line {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    bottom: 32px;
  }

  .list_container {
    padding-top: 108px;
    .item {
      background: #ffffff;
      padding: 24px 32px 28px;
      margin-bottom: 20px;
      .title {
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 36px;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 48px;
        margin-bottom: 16px;
      }
      .user {
        display: flex;
        align-items: center;
        color: #555555;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        margin-bottom: 12px;
        .user_avatar {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
      }
      .content {
        font-family: PingFangSC-Regular, PingFang SC;
        font-size: 30px;
        font-weight: 400;
        color: #555555;
        line-height: 42px;
      }
      .content_img {
        display: flex;
        .left_content {
          font-family: PingFangSC-Regular, PingFang SC;
          font-size: 30px;
          font-weight: 400;
          color: #555555;
          line-height: 42px;
          flex: 1;
          margin-right: 48px;
        }
        .right_img {
          width: 190px;
          height: 127px;
          background: #cccccc;
          border-radius: 12px;
        }
      }
      .bottom {
        font-family: PingFangSC-Regular, PingFang SC;
        margin-top: 24px;
        font-size: 28px;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
      }
    }
  }
  .clamp2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .clamp3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>
