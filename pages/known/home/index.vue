<template>
  <div class="home_container">
    <div
      class="header"
      :class="{ header_fixed: fixed }"
      :style="{ paddingTop: (appInfo.statusBarHeight || 0) + 'px' }"
    >
      <my-icon
        name="zuo"
        size="0.4rem"
        :color="fixed ? '#1A1A1A' : '#D8D8D8'"
        @click.native="$back"
      ></my-icon>
      {{ fixed ? userName : '' }}
    </div>
    <div class="top_box">
      <div class="card">
        <sp-image round class="user_avatar" fit="cover" :src="avatar" />
        <div class="bt_box">
          <template v-if="homeUserId && homeUserId !== userInfo.userId">
            <div
              class="bt_attention"
              :class="{ bt_has_attention: isAttention }"
              @click="attention"
            >
              {{ isAttention ? '已关注' : '+ 关注' }}
            </div>
          </template>
          <div
            v-if="appInfo.appCode === 'CPSAPP' && type === 2"
            class="bt_contact"
            @click="contact"
          >
            <my-icon
              name="pinglun_mian"
              size="0.36rem"
              color="#ffffff"
            ></my-icon>
          </div>
        </div>
        <div class="user_name">{{ userName }}</div>
        <!-- <div class="user_desc clamp3">{{ desc }}</div> -->
        <div class="user_data">
          <div class="user_data_item" @click="toFans">
            <div class="user_data_item_num">{{ fansNum }}</div>
            <div class="user_data_item_name">粉丝</div>
          </div>
          <div class="user_data_item" @click="toAttention">
            <div class="user_data_item_num">{{ attentionNum }}</div>
            <div class="user_data_item_name">关注</div>
          </div>
          <div class="user_data_item">
            <div class="user_data_item_num">{{ applaudNum }}</div>
            <div class="user_data_item_name">获赞</div>
          </div>
        </div>
        <sp-image round class="user_banner" fit="cover" src="" />
      </div>
    </div>
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
import utils from '@/utils/changeBusinessData'
export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
    CommentList,
    Item,
  },
  async asyncData({ $axios, query, store, redirect }) {
    if (!query.homeUserId && !store.state.user.userId) {
      return redirect('/known')
    }
    let userInfo = {
      avatar: '',
      userName: '',
      desc: '',
      type: '',
      isAttention: false,
      attentionNum: 0,
      fansNum: 0,
      applaudNum: 0,
    }
    const { code, data } = await $axios.get(knownApi.home.userInfo, {
      params: {
        homeUserId: query.homeUserId || store.state.user.userId,
        homeUserType:
          query.type || utils.getUserType(store.state.user.userType),
      },
    })
    if (code === 200) {
      userInfo = data
    }

    return userInfo
  },
  data() {
    return {
      articleId: '', // 打开评论列表需要传的id
      active: 0,
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
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    toFans() {
      this.$router.push({
        path: '/known/home/fans',
        query: { homeUserId: this.homeUserId },
      })
    },
    toAttention() {
      this.$router.push({
        path: '/known/home/attention',
        query: { homeUserId: this.homeUserId },
      })
    },
    contact() {
      this.$appFn.dggOpenIM(
        {
          name: this.userName, // 商户用户名称
          userId: this.homeUserId, // 商户用户ID
          userType: 'MERCHANT_USER', // 用户类型
        },
        (res) => {}
      )
    },
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
    async attention() {
      if (!(await this.$isLogin())) {
        return
      }
      const { code, message } = await this.$axios.post(
        knownApi.home.attention,
        {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName || '测试用户',
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          handleType: this.isAttention ? 2 : 1,
          attentionUserId: this.$route.query.homeUserId,
          attentionUserName: this.userName,
          attentionUserType: this.type,
        }
      )
      if (code === 200) {
        this.$xToast.show({
          message: this.isAttention ? '取关成功' : '关注成功',
          duration: 1000,
          icon: 'toast_ic_comp',
          forbidClick: true,
        })
        this.isAttention = !this.isAttention
      } else {
        console.log(message)
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
  .header {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88px;
    padding-left: 86px;
    color: #1a1a1a;
    font-size: 36px;
    font-weight: 500px;
    display: flex;
    align-items: center;
    transition: 0.3s all;
    box-sizing: content-box;
    .spiconfont-zuo {
      position: absolute;
      left: 24px;
      bottom: 20px;
    }
  }
  .header_fixed {
    border-bottom: 1px solid #dddddd;
    background: #ffffff;
  }

  .top_box {
    padding-top: 320px;
    background: #026ac3;
    .card {
      position: relative;
      background-color: #ffffff;
      border-radius: 24px 24px 0px 0px;
      padding: 33px 32px 40px;
      font-size: 0;
      .user_avatar {
        width: 194px;
        height: 194px;
        background: #d9d9d9;
        border: 3px solid #ffffff;
        position: absolute;
        left: 32px;
        top: -97px;
      }
      .bt_box {
        display: flex;
        justify-content: flex-end;
        text-align: center;
        font-size: 26px;
        font-weight: 500;
        height: 64px;
        .bt_attention {
          width: 144px;
          height: 64px;
          line-height: 64px;
          background: #4974f5;
          border-radius: 8px;
          color: #ffffff;
        }
        .bt_has_attention {
          background: #f5f5f5;
          color: #999999;
        }
        .bt_contact {
          width: 63px;
          height: 64px;
          background: #999999;
          border-radius: 8px;
          margin-left: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .user_name {
        margin-top: 48px;
        font-size: 44px;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 44px;
      }
      .user_desc {
        margin-top: 24px;
        font-size: 26px;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
      }
      .user_data {
        margin-top: 48px;
        display: flex;
        &_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 64px;
          &_num {
            color: #4974f5;
            font-size: 36px;
            line-height: 36px;
            font-weight: 500;
          }
          &_name {
            font-size: 26px;
            font-weight: 400;
            color: #999999;
            line-height: 26px;
            margin-top: 16px;
          }
        }
      }
      .user_banner {
        margin-top: 48px;
        width: 686px;
        height: 180px;
        border-radius: 12px;
      }
    }
  }

  .bottom_box {
    background-color: #f8f8f8;
    /deep/ .sp-tabs {
      border-bottom: 1px solid #dddddd;
    }
    /deep/ .sp-tab {
      font-size: 30px;
    }
    .sp-tab--active {
      font-size: 32px;
      font-weight: 500;
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
          font-weight: 500;
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
