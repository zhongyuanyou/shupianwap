<template>
  <div>
    <sp-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      pulling-text="下拉即可刷新..."
      loosing-text="释放即可刷新..."
      loading-text="加载中..."
      @refresh="onRefresh"
    >
      <sp-list
        v-model="loading"
        :finished="finished"
        offset="0"
        finished-text="没有更多了"
        @load="attentionList"
      >
        <div v-for="(item, index) in list" :key="index">
          <Item :item="item" @comments="comments" />
        </div>
      </sp-list>
    </sp-pull-refresh>
    <comment-list
      v-model="commentShow"
      :article-id="articleId"
      @release="release"
    ></comment-list>
  </div>
</template>
<script>
import { PullRefresh, Cell, List } from '@chipspc/vant-dgg'
import CommentList from '@/components/mustKnown/CommentList'
import Item from '@/components/mustKnown/home/Item'
import { knownApi } from '@/api'
export default {
  name: 'AttentionItem',
  components: {
    [PullRefresh.name]: PullRefresh,
    [Cell.name]: Cell,
    [List.name]: List,
    CommentList,
    Item,
  },

  data() {
    return {
      commentShow: false,
      articleId: '',
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      list: [],
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {},
  methods: {
    onRefresh() {
      this.finished = false
      this.list = []
      this.page = 1
      this.loading = true
      this.refreshing = false
      this.attentionList()
    },
    release() {
      console.log('点击了发布')
    },
    comments(id) {
      this.articleId = id
      this.commentShow = true
    },
    openAnswer(id) {
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          id,
          type: 2,
        },
      })
    },
    invite() {
      this.$router.push({
        path: '/known/detail/invitationList',
      })
    },
    toTimeStamp(time) {
      console.log('time', time)
      let times = time.replace(/-/g, '/')
      times = Date.parse(times)
      const nowTime = new Date().getTime()
      let result = ''
      // 的倒时差
      const diff = nowTime - times
      if (diff < 3600000) {
        result = diff / 60000 + '分钟前'
      } else if (diff > 3600000 && diff < 86400000) {
        result = diff / 3600000 + '小时前'
      } else {
        const m =
          new Date(times).getMonth() + 1 < 10
            ? '0' + new Date(times).getMonth()
            : new Date(times).getMonth()
        const d =
          new Date(times).getDate() < 10
            ? '0' + new Date(times).getDate()
            : new Date(times).getDate()
        result = m + '-' + d
      }
      return result
    },
    // 进入文章/问题/回答详情页面
    goDetailPage(type, id) {
      if (type === 1) {
        this.$router.push({
          path: '/known/detail/question',
          query: {
            id,
          },
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/known/detail/article',
          query: {
            id,
          },
        })
      } else if (type === 3) {
        this.$router.push({
          path: '/known/detail/answer',
          query: {
            id,
          },
        })
      }
    },
    // 进入用户详情
    goUserDetail(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
    // 点赞（取消）
    async like(item) {
      const params = {
        handleUserId: this.userInfo.userId,
        handleUserName: this.userInfo.userName,
        businessId: item.id,
        handleUserType: item.userType,
        dateType: item.type,
        handleType: item.isApplaudFlag ? 0 : 1,
      }
      const { code, message, data } = await this.$axios.post(
        knownApi.home.operation,
        params
      )
      if (code === 200) {
        item.isApplaudFlag = item.isApplaudFlag ? 0 : 1
        this.$xToast.show({
          message: item.isApplaudFlag ? '点赞成功' : '取消成功',
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
      } else {
        this.$xToast.show({
          message,
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
      }
    },
    // 请求关注用户的列表数据
    async attentionList() {
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.attentionUserList,
        {
          handleUserId: this.userInfo.userId,
          dateType: 0,
          userHandleFlag: 1,
          limit: this.limit,
          page: this.page,
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
.sp-list {
  background: #f5f5f5;
}

.like_active {
  color: #4974f5 !important;
}
/deep/ .sp-cell {
  padding: 0 0 20px 0;
  position: relative;
}
.item {
  background: #ffffff;
  padding: 0 32px;
  margin-bottom: 20px;
  .item_title {
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 48px;
  }
  .item_Info {
    display: flex;
    padding: 28px 0 32px 0;
    align-items: center;

    .userPhoto {
      width: 66px;
      height: 66px;
      background: #6d7177;
      margin-right: 16px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .item_status {
      flex: 1;
      .userName {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        margin-bottom: 12px;
      }
      .item_time {
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
    }
  }
  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 42px;
      margin: 17px 0 24px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }
    img {
      display: block;
      width: 190px;
      height: 127px;
      background: #d8d8d8;
      border-radius: 12px;
      margin-left: 24px;
    }
  }
  .item_bottom {
    // width: 294px;
    // height: 28px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 28px;
    > .bottom_icon {
      display: inline-flex;
      > span {
        margin-left: 16px;
      }
    }
  }
}
</style>
