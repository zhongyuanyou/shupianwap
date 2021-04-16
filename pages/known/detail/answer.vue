<template>
  <div ref="myPage">
    <div v-if="!showHead2" class="head head1">
      <my-icon
        name="zuo"
        class="btn-icon"
        size="0.4rem"
        color="#1A1A1A"
        @click.native="onLeftClick"
      ></my-icon>
      <div class="btn-area">
        <span @click="onInvite">
          <my-icon name="yaoqing" size="0.4rem"></my-icon>
          邀请</span
        >
        <span
          v-if="answerDetails && answerDetails.createrId === userInfo.userId"
        >
          <my-icon
            name="xiehuida"
            size="0.4rem"
            @click.native="writeAnswer"
          ></my-icon>
          写回答</span
        >
        <span v-else>
          <my-icon
            name="gengduo"
            size="0.4rem"
            color="#000000"
            @click.native="more"
          ></my-icon>
        </span>
      </div>
    </div>
    <div v-if="showHead2">
      <HeadSlot>
        <div class="head head2">
          <my-icon
            class="btn-icon"
            name="zuo"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          ></my-icon>
          <div class="user-info">
            <sp-image class="img" :src="answerDetails.avatar" />
            <div class="infos">
              <p>{{ answerDetails.createrName }}</p>
              {{ answerDetails.contentText }}
            </div>
            <template v-if="answerDetails.createrId !== userInfo.userId">
              <div v-if="!isFollow" class="btn" @click="follow">
                <sp-button
                  ><my-icon name="jia" size="0.28rem" /> 关注</sp-button
                >
              </div>
              <div v-else class="btn2" @click="follow">
                <span class="follow">已关注</span>
              </div>
            </template>
          </div>
        </div>
      </HeadSlot>
    </div>
    <div class="title-area">
      <div class="title">{{ answerDetails.title }}</div>
      <div class="nums-area">
        {{ answerDetails.answerCount }}个回答 ·
        {{ answerDetails.collectCount }} 收藏
      </div>
    </div>
    <div class="main">
      <div class="user-info">
        <sp-image class="img" :src="answerDetails.avatar" />
        <div class="infos">
          <p>{{ answerDetails.createrName }}</p>
          {{ answerDetails.contentText }}
        </div>
        <template v-if="answerDetails.createrId !== userInfo.userId">
          <div v-if="!isFollow" class="btn" @click="follow">
            <sp-button><my-icon name="jia" size="0.28rem" /> 关注</sp-button>
          </div>
          <div v-else class="btn2" @click="follow">
            <span class="follow">已关注</span>
          </div>
        </template>
      </div>
      <div class="content" v-html="answerDetails.content"></div>
      <p class="pub-time">编辑于{{ answerDetails.createTime }}</p>
    </div>
    <Comment ref="openComment" :article-id="answerDetails.id" />
    <div class="page-bottom">
      <div
        v-if="
          answerDetails &&
          answerDetails.isApplaudFlag === 0 &&
          answerDetails.isDisapplaudFlag === 0
        "
        class="left-area"
      >
        <span class="icon" @click="handleClickBottom(1)">
          <my-icon name="zantong" size="0.28rem" color="#4974F5"></my-icon
        ></span>
        <span class="text" @click="handleClickBottom(1)"
          >赞同{{ answerDetails.applaudCount }}</span
        >
        <span class="icon" @click="handleClickBottom(2)">
          <my-icon name="fandui" size="0.28rem" color="#4974F5"></my-icon
        ></span>
      </div>
      <div
        v-if="answerDetails && answerDetails.isApplaudFlag === 1"
        class="applaud"
        @click="handleClickBottom(1)"
      >
        <span class="icon">
          <my-icon name="zantong" size="0.28rem" color="#fff"></my-icon
        ></span>
        <span class="text">已赞同</span>
      </div>
      <div
        v-if="answerDetails.isDisapplaudFlag === 1"
        class="applaud dis-applaud"
        @click="handleClickBottom(2)"
      >
        <span class="icon">
          <my-icon name="fandui" size="0.28rem" color="#fff"></my-icon
        ></span>
        <span class="text">已反对</span>
      </div>
      <div class="right-area">
        <div
          class="item"
          :style="{
            color: answerDetails.isCollectFlag === 1 ? '#4974F5' : '#999999',
          }"
          @click="handleClickBottom(3)"
        >
          <div class="icon">
            <my-icon name="shoucang" size="0.4rem"></my-icon>
          </div>
          收藏
        </div>
        <div class="item" @click="comment()">
          <div class="icon">
            <my-icon name="pinglun" size="0.4rem" color="#999999"></my-icon>
          </div>
          评论
        </div>
      </div>
    </div>
    <!-- 上拉组件 -->
    <sp-popup
      v-model="popupShow"
      position="bottom"
      :style="{ height: '30%' }"
      round
      close-icon="close"
      :close-on-click-overlay="false"
    >
      <div class="down_slide_list">
        <ul>
          <li @click="editAnswer(answerDetails.id)">
            <my-icon name="bianji1" size="1rem" color="#1a1a1a"></my-icon>
            <p>编辑</p>
          </li>
          <li @click="deleteAnswer(answerDetails.id)">
            <my-icon name="shanchu1" size="1rem" color="#1a1a1a"></my-icon>
            <p>删除</p>
          </li>
        </ul>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </sp-popup>
  </div>
</template>

<script>
import { Field, Button, Image, Toast, Popup, Dialog } from '@chipspc/vant-dgg'
import Comment from '~/components/mustKnown/DetailComment'
import HeadSlot from '@/components/common/head/header-slot'
import { knownApi } from '~/api'
export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    Comment,
    HeadSlot,
  },
  async asyncData({ $axios, query, store }) {
    const res = await $axios.get(knownApi.questionArticle.detail, {
      params: {
        id: query.id,
        userId: store.state.user.userId,
        userHandleFlag: store.state.user.userId ? 1 : 0,
      },
    })
    return {
      answerDetails: res.data,
      headerData: {
        createrName: res.createrName,
        contentText: res.contentText,
        avatar: res.avatar,
      },
      sourceId: res.sourceId,
      homeUserId: res.userId,
    }
    // return Promise.all([
    //   context.$axios.get(knownApi.questionArticle.detail, {
    //     params: {
    //       id: context.query.id,
    //       userHandleFlag: context.store.state.user.userId ? 1 : 0,
    //     },
    //   }),
    // ])
    //   .then((res) => {
    //     if (res[0] && res[0].code === 200) {
    //       return {
    //         answerDetails: res[0].data,
    //         headerData: {
    //           createrName: res[0].createrName,
    //           contentText: res[0].contentText,
    //           avatar: res[0].avatar,
    //         },
    //         sourceId: res[0].sourceId,
    //         homeUserId: res[0].userId,
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     Promise.reject(error)
    //   })
  },
  data() {
    return {
      showHead2: false,
      answerDetails: '',
      headerData: {},
      popupShow: false,
      sourceId: '',
      answerCollectCount: '',
      homeUserId: '',
      isFollow: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  created() {
    if (this.$route.query.id) {
      this.currentDetailsId = this.$route.query.id
    }
    this.initFollow()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    follow() {
      let followStatus = ''
      if (this.isFollow) {
        followStatus = 2
        this.isFollow = false
      } else {
        followStatus = 1
        this.isFollow = true
      }
      this.loading = true
      this.$axios
        .post(knownApi.home.attention, {
          handleUserName: this.userInfo.userName || '测试用户',
          handleUserId: this.userInfo.userId || '120',
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          handleType: followStatus,
          attentionUserId: this.answerDetails.userId,
          attentionUserName: this.answerDetails.userName,
          attentionUserType: this.answerDetails.userType,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            if (this.isFollow) {
              this.$xToast.show({ message: '关注成功' })
            } else {
              this.$xToast.show({ message: '取消关注' })
            }
          } else {
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
    },
    initFollow() {
      this.$axios
        .get(knownApi.questionArticle.findAttention, {
          params: {
            currentUserId: this.userInfo.userId,
            homeUserId: this.homeUserId || '120',
          },
        })
        .then((res) => {
          if (res.data) {
            this.isFollow = true
          } else {
            this.isFollow = false
          }
        })
    },
    onInvite() {
      this.$router.push('/known/detail/invitationList')
    },
    writeAnswer() {
      this.$router.push('/known/publish/answer')
    },
    more() {
      this.popupShow = true
    },
    cancel() {
      this.popupShow = false
    },
    getDetailData() {
      this.loading = true
      this.$axios
        .get(knownApi.questionArticle.detail, {
          params: {
            id: this.currentDetailsId,
            userHandleFlag: 1,
          },
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.answerDetails = res.data
            console.log(this.answerDetails)
            this.headerData.createrName = this.answerDetails.createrName
            this.headerData.contentText = this.answerDetails.contentText
            this.headerData.avatar = this.answerDetails.avatar
            this.sourceId = this.answerDetails.sourceId
            this.homeUserId = this.answerDetails.userId
          } else {
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
    },
    // 获取回答数与关注数
    getAnswerCollectCount() {
      this.$axios
        .get(knownApi.questionArticle.detail, {
          params: {
            id: this.sourceId,
            userId: this.userInfo.userId || '120',
            userHandleFlag: 1,
            userType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
            userName: this.userInfo.userName || '测试用户',
          },
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.answerCollectCount = res.data
          } else {
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
    },
    handleScroll() {
      // 获取推荐板块到顶部的距离 减 搜索栏高度
      const scrollTop = this.$refs.myPage.getBoundingClientRect().top // 滚动条距离顶部的位置
      if (scrollTop < 0) {
        this.showHead2 = true
      } else {
        this.showHead2 = false
      }
    },
    onLeftClick() {
      this.$router.back(-1)
    },
    answersortfn(index) {
      console.log(index)
    },

    handleClickBottom(type) {
      this.handleType = ''
      if (type === 1) {
        this.answerDetails.applaudCount = Number(
          this.answerDetails.applaudCount
        )
        if (this.answerDetails.isApplaudFlag === 1) {
          this.handleType = 7
          this.answerDetails.isApplaudFlag = 0
          this.answerDetails.applaudCount = this.answerDetails.applaudCount - 1
        } else {
          this.handleType = 1
          this.answerDetails.isApplaudFlag = 1
          this.answerDetails.applaudCount = this.answerDetails.applaudCount + 1
        }
      }
      if (type === 2) {
        if (this.answerDetails.isDisapplaudFlag === 1) {
          this.handleType = 8
          this.answerDetails.isDisapplaudFlag = 0
        } else {
          this.handleType = 2
          this.answerDetails.isDisapplaudFlag = 1
        }
      }
      if (type === 3) {
        if (this.answerDetails.isCollectFlag === 1) {
          this.handleType = 9
          this.answerDetails.isCollectFlag = 0
        } else {
          this.handleType = 4
          this.answerDetails.isCollectFlag = 1
        }
      }
      this.$axios
        .post(knownApi.home.operation, {
          handleUserId: this.userInfo.userId || '120',
          handleUserName: this.userInfo.userName || '测试用户',
          businessId: this.currentDetailsId,
          handleType: this.handleType,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: 1,
        })
        .then((res) => {
          if (res.code === 200) {
            if (type === 1) {
              if (this.answerDetails.isApplaudFlag === 1) {
                this.$xToast.show({ message: '点赞成功' })
              } else {
                this.$xToast.show({ message: '取消点赞' })
              }
            }
            if (type === 2) {
              if (this.answerDetails.isDisapplaudFlag === 1) {
                this.$xToast.show({ message: '反对成功' })
              } else {
                this.$xToast.show({ message: '取消反对' })
              }
            }
            if (type === 3) {
              if (this.answerDetails.isCollectFlag === 1) {
                this.$xToast.show({ message: '收藏成功' })
              } else {
                this.$xToast.show({ message: '取消收藏' })
              }
            }
          } else {
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
    },
    editAnswer(id) {
      const curId = id
      this.$router.push({
        path: '/known/publish/answer',
        params: {
          id: curId,
        },
      })
    },
    comment() {
      this.$refs.openComment.commentShow = true
    },
    deleteAnswer(id) {
      const curId = id
      this.loading = true
      Dialog.confirm({
        title: '提示',
        message: '确定要删除吗？',
      })
        .then(() => {
          this.$axios
            .post(knownApi.content.dlt, {
              id: curId,
              userId: this.userInfo.userId || '120',
            })
            .then((res) => {
              this.loading = false
              if (res.code === 200) {
                this.$xToast.show({ message: '删除成功' })
                this.$router.replace({ path: '/known' })
              } else {
                Toast.fail({
                  duration: 2000,
                  message: '服务异常，请刷新重试！',
                  forbidClick: true,
                  className: 'my-toast-style',
                })
              }
            })
        })
        .catch((err) => {
          console.log(err)
          // on cancel
        })
    },
  },
}
</script>

<style lang="less" scoped>
.down_slide_list {
  ul {
    display: flex;
    padding: 70px 60px;
    box-sizing: border-box;
    li {
      width: 100px;
      text-align: center;
      margin-right: 76px;
      p {
        font-size: 24px;
        color: #999999;
      }
    }
  }
  .cancel {
    width: 100%;
    height: 98px;
    line-height: 98px;
    text-align: center;
    position: absolute;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    bottom: 0;
    border-top: 1px solid #f0f0f0;
  }
}
.head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 88px;
  background: #ffffff;
  line-height: 88px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  padding: 0 40px;
  z-index: 99;
  .btn-icon {
    float: left;
  }
}
.head1 {
  height: 88px;
  background: #ffffff;
  line-height: 88px;
  .btn-area {
    float: right;
    width: auto;
    height: 100%;
    span {
      padding: 0 20px;
    }
  }
}
.head2 {
  height: 104px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  .user-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    padding-left: 20px;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      height: 26px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-bottom: 20px;
      }
    }
    .btn2 {
      background: none;
      font-size: 30px;
      color: #999999;
    }
    .btn {
      background: none;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        color: rgba(73, 116, 245, 1);
        display: block;
        float: left;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4974f5;
        border: none;
      }
      .follow {
        color: #999999;
        font-size: 30px;
      }
    }
  }
  .btn-icon {
    line-height: 104px;
    float: left;
  }
}
.title-area {
  margin-top: 100px;
  padding: 20px 40px;
  border-bottom: 2px solid #ddd;
  .title {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 68px;
    font-weight: 600;
  }
  .nums-area {
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #999999;
    margin: 20px 0;
    font-weight: 500;
  }
}
.main {
  padding: 40px;
  .user-info {
    display: flex;
    justify-content: space-between;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      height: 26px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-bottom: 20px;
      }
    }
    .btn2 {
      background: none;
      font-size: 30px;
      color: #999999;
    }
    .btn {
      height: 72px;
      background: #f5f5f5;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        color: rgba(73, 116, 245, 1);
        display: block;
        float: left;
      }
      .follow {
        color: #999999;
        font-size: 30px;
      }
    }
  }
  .content {
    padding-top: 40px;
    font-size: 34px;
    color: #666;
    font-weight: 400;
    color: #555555;
    line-height: 52px;
    /deep/ img {
      width: 100%;
      height: auto;
    }
  }
  .pub-time {
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 26px;
    margin-top: 40px;
  }
}
.page-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 96px;
  background: #ffffff;
  padding: 10px 40px;
  border-top: 1px solid #ddd;
  .applaud {
    display: flex;
    align-items: center;
    float: left;
    height: 72px;
    background: #f2f5ff;
    border-radius: 8px;
    padding: 20px 15px;
    box-sizing: border-box;
    background: #4974f5;
    span {
      display: block;
      float: left;
      margin-right: 4px;
      font-size: 24px;
      color: #ffffff;
      text-align: center;
    }
    .icon {
      padding: 0;
      width: 40px;
      height: 100%;
      line-height: 0;
      position: relative;
      .spiconfont {
        position: absolute;
        left: 0px;
        top: 20px;
        padding: 0;
        margin: 0;
        line-height: 0;
      }
    }
  }
  .left-area {
    float: left;
    width: auto;
    height: 72px;
    background: #f2f5ff;
    border-radius: 8px;
    padding: 20px;
    span {
      display: block;
      float: left;
      margin-right: 4px;
    }
    .icon {
      padding: 0;
      width: 40px;
      height: 100%;
      line-height: 0;
      position: relative;
      .spiconfont {
        position: absolute;
        left: 0px;
        top: 20px;
        padding: 0;
        margin: 0;
        line-height: 0;
      }
    }
    .text {
      border-right: 1px solid #ddd;
      margin-right: 20px;
      font-size: 24px;
      color: #4974f5;
      font-weight: 500;
      padding-right: 20px;
    }
  }
  .right-area {
    float: right;
    width: auto;
    .item {
      height: 100%;
      float: left;
      margin-left: 10px;
      text-align: center;
      width: 80px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
      font-size: 28px;
      .icon {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
