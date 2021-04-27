<template>
  <div class="home_container">
    <Header title="列表" />
    <div class="bottom_box">
      <sp-tabs
        v-model="active"
        title-active-color="#222222"
        title-inactive-color="#999999"
        @change="tabChange"
      >
        <sp-tab
          v-for="item in menuList"
          :key="item.index"
          :title="item.name"
          :name="item.index"
        ></sp-tab>
      </sp-tabs>
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="list_container"
        @load="getList"
      >
        <div v-for="(item, index) in list" :key="index">
          <Item :item="item" @comments="comments" /></div
      ></sp-list>
    </div>
    <comment-list
      v-model="commentShow"
      :article-id="articleId"
      @release="release"
    ></comment-list>
  </div>
</template>

<script>
import { Tabs, Tab, Image, List } from '@chipspc/vant-dgg'
import CommentList from '@/components/mustKnown/CommentList'
import Item from '@/components/mustKnown/home/Item'
import { knownApi } from '~/api'
import Header from '@/components/common/head/header'
export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
    CommentList,
    Item,
    Header,
  },
  asyncData({ $axios, query, store, redirect }) {
    if (!query.homeUserId && !store.state.user.userId) {
      return redirect('/known')
    }
    const active = Number(query.type)
    return {
      active,
    }
    // let userInfo = {
    //   avatar: '',
    //   userName: '',
    //   desc: '',
    //   type: '',
    //   isAttention: false,
    //   attentionNum: 0,
    //   fansNum: 0,
    //   applaudNum: 0,
    // }
    // const { code, data } = await $axios.get(knownApi.home.userInfo, {
    //   params: {
    //     homeUserId: query.homeUserId || store.state.user.userId,
    //     homeUserType:
    //       query.type || utils.getUserType(store.state.user.userType),
    //   },
    // })
    // if (code === 200) {
    //   userInfo = data
    // }

    // return userInfo
  },
  data() {
    return {
      articleId: '', // 打开评论列表需要传的id
      menuList: [
        {
          name: '全部',
          index: 0,
        },
        {
          name: '问题',
          index: 1,
        },
        {
          name: '回答',
          index: 3,
        },
        {
          name: '文章',
          index: 2,
        },
      ],
      list: [],
      loading: false,
      finished: false,
      commentShow: false,
      page: 1,
      limit: 10,
      fixed: false,
    }
  },
  computed: {
    // 主页用户id
    homeUserId() {
      return this.$route.query.homeUserId
    },
    userInfo() {
      return this.$store.state.user
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
    appInfo() {
      return this.$store.state.app.appInfo
    },
  },
  mounted() {
    // window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    getScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      if (scrollTop > 180) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    tabChange() {
      this.page = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.getList()
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
    comments(id) {
      this.articleId = id
      this.commentShow = true
    },
    release() {
      console.log('点击了发布')
    },
    async getList() {
      const { code, message, data } = await this.$axios.post(
        knownApi.home.list,
        {
          type: this.active,
          userIds: this.homeUserId || this.userInfo.userId,
          currentUserId: this.userInfo.userId,
          page: this.page,
          limit: this.limit,
        }
      )
      if (code === 200) {
        this.list = this.list.concat(data.rows)
        this.loading = false
        this.page++
        if (this.page > data.totalPage) {
          this.finished = true
        }
      } else {
        console.log(message)
        this.loading = false
        this.finished = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  background: #fff;
  .bottom_box {
    background-color: #f8f8f8;
    /deep/ .sp-tabs {
      border-bottom: 1px solid #f4f4f4;
    }
    /deep/ .sp-tab {
      font-size: 30px;
    }
    .sp-tab--active {
      font-size: 32px;
      font-weight: 600;
    }

    .list_container {
      .item {
        background: #ffffff;
        padding: 28px 32px 28px;
        margin-bottom: 20px;
        .user {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
          .user_avatar {
            width: 66px;
            height: 66px;
            margin-right: 16px;
          }
          .user_info {
            &_name {
              font-size: 28px;
              font-weight: 400;
              color: #222222;
              line-height: 28px;
            }
            &_time {
              margin-top: 12px;
              font-size: 24px;
              font-weight: 400;
              color: #999999;
              line-height: 24px;
            }
          }
        }
        .title {
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 36px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 48px;
          margin-bottom: 17px;
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
            margin-right: 32px;
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
          display: flex;
          &_item {
            display: flex;
            align-items: center;
            margin-right: 24px;
            min-width: 148px;
            i {
              margin-right: 16px;
            }
          }
        }
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
