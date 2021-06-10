<template>
  <div class="collection_container">
    <Header title="我的收藏" />
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
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        @click="toDetail(item)"
      >
        <div class="title clamp2">{{ item.title }}</div>
        <!-- 除了回答,都有人物头像和图片 -->
        <div v-if="tabIndex !== 1" class="user">
          <sp-image
            round
            class="user_avatar"
            fit="cover"
            :src="item.avatar"
            @click.stop="toHome(item)"
          />{{ item.userName }}
        </div>
        <div v-if="item.contentImageUrl === ''" class="content clamp2">
          {{ item.contentText }}
        </div>
        <div v-else class="content_img">
          <div class="left_content clamp3">
            {{ item.contentText }}
          </div>
          <sp-image
            radius="0.12rem"
            class="right_img"
            fit="cover"
            :src="item.contentImageUrl.split(',')[0]"
          />
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
import { shopApi } from '@/api'
import Header from '@/components/common/head/header'

export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
    Header,
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
        {
          tile: '服务商品',
          id: 4,
        },
        {
          tile: '交易商品',
          id: 5,
        },
      ],
      list: [],
      page: 1,
      tabIndex: 1,
      limit: 15,
      error: false,
      loading: false,
      finished: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
  },
  methods: {
    toDetail(item) {
      this.$router.push({
        path:
          item.type === 1
            ? '/known/detail/question'
            : item.type === 2
            ? '/known/detail/article'
            : '/known/detail/answer',
        query: {
          id: item.id,
        },
      })
    },
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
    changeTab(name) {
      if (this.tabIndex === name) {
        return
      }
      this.tabIndex = name
      this.init()
      this.onLoad()
    },
    init() {
      this.page = 1
      this.finished = false
      this.error = false
      this.loading = true
      this.list = []
    },
    onLoad() {
      if (this.tabIndex < 4) {
        this.getList()
      } else {
        this.getGoodsList()
      }
    },
    async getList() {
      try {
        const params = {
          handleUserId: this.userId,
          dateType: this.tabIndex, //  1问题 2文章 3回答.默认问题
          limit: this.limit,
          page: this.page,
        }
        const res = await this.$axios.get(knownApi.home.collection, { params })
        if (res.code === 200) {
          this.list.push(...res.data.rows)
          this.page++
          if (this.page > res.data.totalPage) {
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
    getGoodsList() {
      this.$axios
        .post(shopApi.saveList, {
          goodsType: 1,
        })
        .then((res) => {
          console.log('goodsList', res)
        })
        .catch((err) => {
          console.log('error', err)
        })
    },
  },
}
</script>

<style lang="less" scoped>
.collection_container {
  height: 100%;
  background-color: #f8f8f8;

  .sp-tabs {
    width: 100%;
    height: 88px;
    background-color: #ffffff;
  }

  ::v-deep .sp-tabs__line {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    bottom: 32px;
  }

  .list_container {
    .item {
      background: #ffffff;
      padding: 24px 32px 28px;
      margin-bottom: 20px;
      word-break: break-all;
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
