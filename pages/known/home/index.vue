<template>
  <div class="home_container">
    <div class="top_box">
      <div class="card">
        <sp-image round class="user_avatar" fit="cover" src="" />
        <div class="bt_box">
          <div v-if="!isAttention" class="bt_attention" @click="attention">
            + 关注
          </div>
          <div v-else class="bt_has_attention">已关注</div>
          <div v-if="source" class="bt_contact">
            <my-icon
              name="pinglun_mian"
              size="0.36rem"
              color="#ffffff"
            ></my-icon>
          </div>
        </div>
        <div class="user_name">罗振宇</div>
        <div class="user_desc clamp3">这个人很懒，什么也没留下</div>
        <div class="user_data">
          <div class="user_data_item" @click="$router.push('/known/home/fans')">
            <div class="user_data_item_num">9999万</div>
            <div class="user_data_item_name">粉丝</div>
          </div>
          <div
            class="user_data_item"
            @click="$router.push('/known/home/attention')"
          >
            <div class="user_data_item_num">9999万</div>
            <div class="user_data_item_name">关注</div>
          </div>
          <div class="user_data_item">
            <div class="user_data_item_num">9999万</div>
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
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="user">
            <sp-image
              round
              class="user_avatar"
              fit="cover"
              :src="item.avatar"
            />
            <div class="user_info">
              <div class="user_info_name">{{ item.userName }}</div>
              <div class="user_info_time">27分钟前·回答了问题</div>
            </div>
          </div>
          <div class="title clamp2">
            {{ item.title }}
          </div>
          <div v-if="!item.contentImageUrl" class="content clamp3">
            {{ item.contentText }}
          </div>
          <div v-else class="content_img">
            <div class="left_content clamp3">
              {{ item.contentText }}
            </div>
            <sp-image class="right_img" fit="cover" src="" />
          </div>
          <div v-if="item.type !== 1" class="bottom">
            <div
              class="bottom_item"
              :style="{ color: item.isApplaudFlag ? '#4974f5' : '#999999' }"
              @click="like(item)"
            >
              <my-icon
                name="zantong"
                size="0.36rem"
                :color="item.isApplaudFlag ? '#4974f5' : '#999999'"
              ></my-icon>
              {{ item.applaudCount || '赞同' }}
            </div>
            <div class="bottom_item" @click="comments(item.id)">
              <my-icon name="pinglun" size="0.36rem" color="#999999"></my-icon>
              {{ item.remarkCount || '评论' }}
            </div>
          </div>
          <div v-else class="bottom">
            <div class="bottom_item" @click="invitation(item.id)">
              <my-icon name="yaoqing" size="0.36rem" color="#999999"></my-icon>
              邀请
            </div>
            <div class="bottom_item" @click="answer(item.id)">
              <my-icon name="xiehuida" size="0.36rem" color="#999999"></my-icon>
              写回答
            </div>
          </div>
        </div>
      </sp-list>
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
import { knownApi } from '~/api'
export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
    CommentList,
  },
  async asyncData({ $axios, query, store }) {
    // const { code, message, data } = await $axios.post(knownApi.home.userInfo, {
    //   userId: query.userId,
    //   currentUserId: store.state.user.userId,
    // })
    // if (code === 200) {
    // } else {
    //   throw message
    // }
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
      isAttention: false,
      commentShow: false,
      page: 1,
      limit: 10,
    }
  },
  computed: {
    source() {
      return this.$route.query.source
    },
    // 主页用户id
    homeUserId() {
      return this.$route.query.homeUserId
    },
    userInfo() {
      return this.$store.state.user
    },
  },
  methods: {
    tabChange() {
      this.page = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.getList()
    },
    attention() {
      console.log('关注')
    },
    comments(id) {
      this.articleId = id
      this.commentShow = true
    },
    invitation(id) {
      this.$router.push({
        path: '/known/detail/invitationList',
        query: {
          questionId: id,
        },
      })
    },
    answer(id) {
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          questionId: id,
        },
      })
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
    async like(item) {
      const { code, message, data } = await this.$axios.post(
        knownApi.home.operation,
        {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName || '测试用户名',
          businessId: item.id,
          handleType: item.isApplaudFlag ? 7 : 1, // 1是点赞 7是取消点赞
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: item.type,
        }
      )
      if (code === 200) {
        if (item.isApplaudFlag) {
          item.isApplaudFlag = 0
          item.applaudCount--
        } else {
          item.isApplaudFlag = 1
          item.applaudCount++
        }
      } else {
        console.log(message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;

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
        .bt_attention {
          width: 144px;
          height: 64px;
          line-height: 64px;
          background: #4974f5;
          border-radius: 8px;
          color: #ffffff;
        }
        .bt_has_attention {
          width: 144px;
          height: 64px;
          line-height: 64px;
          background: #f5f5f5;
          border-radius: 8px;
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
