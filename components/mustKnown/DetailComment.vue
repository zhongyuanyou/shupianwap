<template>
  <div class="comment-area">
    <div class="title">评论{{ total }}</div>
    <div class="list">
      <div class="comment-input">
        <sp-image
          width="0.6rem"
          height="0.6rem"
          round
          fit="cover"
          :src="avatar"
        />
        <div class="input-area" @click="commentShow = true">
          写下你的评论...
        </div>
      </div>
      <div v-for="(item, index) in list" :key="index" class="comment-item">
        <sp-image
          class="img"
          :src="item.avatar"
          fit="cover"
          @click.stop="goUser(item.userId, item.userType)"
        />
        <div class="right">
          <p class="user-name">{{ item.userName }}</p>
          <p class="item-content">{{ item.content }}</p>
          <div class="time-area">
            <span class="time">{{ item.createTime }}</span>
            <div>
              <my-icon
                name="dianzan"
                size="0.32rem"
                :color="item.isApplaud ? '#4974f5' : '#999999'"
                @click.native="Applaud(item)"
              ></my-icon>
              {{ item.applaudCount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="toast" @click="commentShow = true">
      查看全部评论
      <my-icon name="you" size="0.2rem"></my-icon>
    </div>

    <comment-list v-model="commentShow" :article-id="articleId" :source-type="sourceType"></comment-list>
  </div>
</template>

<script>
// 详情页非弹窗的评论列表
import { Image, Field, Button } from '@chipspc/vant-dgg'
import CommentList from '@/components/mustKnown/CommentList'
import { knownApi } from '~/api'
import { GOODSLIST } from '@/config/constant'
export default {
  components: {
    [Image.name]: Image,
    [Field.name]: Field,
    [Button.name]: Button,
    CommentList,
  },
  props: {
    articleId: {
      type: String,
      default: '',
    },
    sourceType: {
      type: Number,
      default: 2, // 类型：2 文章 3 回答
    },
  },
  data() {
    return {
      commentShow: false,
      value: '',
      total: 0,
      list: [],
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    avatar() {
      return this.$store.state.user.avatar || GOODSLIST
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
  },
  created() {
    this.getCommentsList()
  },
  methods: {
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
        return false
      }
    },
    async Applaud(item) {
      if (!this.isLogin()) {
        return
      }
      const { code, message, data } = await this.$axios.post(
        knownApi.comments.like,
        {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName,
          businessId: item.id,
          handleType: item.isApplaud ? 2 : 1,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
        }
      )
      if (code === 200) {
        if (item.isApplaud) {
          item.applaudCount--
          item.isApplaud = 0
        } else {
          item.applaudCount++
          item.isApplaud = 1
        }
      } else {
        console.log(message)
      }
    },
    goUser(id, usertype) {
      this.$router.push({
        path: '/known/home',
        query: { homeUserId: id, type: usertype },
      })
    },
    submit() {
      if (!this.userInfo.userId) {
        return this.$xToast.error('请先登录')
      }
      this.$axios
        .post(knownApi.comments.publish, {
          content: this.value,
          sourceId: this.articleId,
          sourceType: this.sourceType,
          userId: this.userInfo.userId,
          userName: this.userInfo.userName,
          userType: this.userInfo.type === 'ORDINARY_USER' ? 2 : 3,
        })
        .then((res) => {
          if (res.code === 200) {
            this.$xToast.show({
              message: '评论成功',
            })
            this.getCommentsList()
            this.value = ''
          } else {
            this.$xToast.error(res.message)
          }
        })
        .catch((err) => {
          this.$xToast.error(err.message)
        })
    },
    async getCommentsList() {
      const { code, message, data } = await this.$axios.post(
        knownApi.comments.list,
        {
          currentUserId: this.userInfo.userId,
          sourceIds: this.articleId,
        }
      )
      if (code === 200) {
        this.list = data.rows.slice(0, 2)
        this.total = data.total
      } else {
        console.log(message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.comment-area {
  padding: 20px 32px 120px;
  .comment-input {
    display: flex;
    align-items: center;
    margin-bottom: 22px;

    .input-area {
      flex: 1;
      padding: 0;
      height: 72px;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #dddddd;
      line-height: 72px;
      padding-left: 24px;
      margin-left: 20px;
      color: #999999;
      font-size: 26px;
    }
  }

  .title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 32px;
    margin-bottom: 40px;
  }
  .list {
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #555555;
    .comment-item {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
      .right {
        padding-left: 20px;
        flex: 1;
        .user-name {
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          margin-bottom: 16px;
        }
        .item-content {
          line-height: 42px;
          .textOverflow(2);
        }
        .time-area {
          margin-top: 16px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
          display: flex;
          justify-content: space-between;
          span {
            display: block;
          }
        }
      }
    }
  }
  .toast {
    height: 26px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 26px;
    text-align: center;
    margin: 40px 0;
  }
}
</style>
