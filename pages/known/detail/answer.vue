<template>
  <section>
    <ShareModal />
    <div class="answer">
      <div>
        <header-slot>
          <div v-show="!showHead2" class="head1">
            <my-icon
              v-if="!isShare"
              name="nav_ic_back"
              size="0.40rem"
              color="#1a1a1a"
              class="my_icon nav-back"
              @click.native="$back()"
            ></my-icon>
            <div class="btn-area">
              <div
                class="content"
                style="margin-right: 0.32rem"
                @click="onInvite"
              >
                <my-icon name="yaoqinghuida_mian" size="0.36rem"></my-icon>
                <span>邀请</span>
              </div>
              <template
                v-if="
                  answerDetails && answerDetails.createrId !== userInfo.userId
                "
              >
                <div
                  class="content"
                  style="margin-right: 0.32rem"
                  @click.stop="writeAnswer"
                >
                  <my-icon name="xiehuida" size="0.36rem"></my-icon>
                  <span>写回答</span>
                </div>
                <my-icon
                  style="margin-top: 0.06rem"
                  name="fenxiang"
                  size="0.32rem"
                  color="#1a1a1a"
                  class="my_icon"
                  @click.native="shareHandle"
                ></my-icon>
              </template>
              <template v-else>
                <my-icon
                  style="margin-right: 0.32rem; margin-top: 0.06rem"
                  name="fenxiang"
                  size="0.32rem"
                  color="#1a1a1a"
                  class="my_icon"
                  @click.native="shareHandle"
                ></my-icon>
                <my-icon
                  name="gengduo"
                  size="0.4rem"
                  color="#000000"
                  @click.native="more"
                ></my-icon>
              </template>
            </div>
          </div>
          <div v-show="showHead2" class="head2">
            <my-icon
              v-if="!isShare"
              name="nav_ic_back"
              size="0.40rem"
              color="#1a1a1a"
              class="my_icon nav-back"
              @click.native="$back()"
            ></my-icon>
            <div class="user-info">
              <sp-image
                class="img"
                :src="answerDetails.avatar"
                @click="goUser(answerDetails.userId, answerDetails.userType)"
              />
              <div class="infos">{{ answerDetails.userName }}</div>
              <template v-if="answerDetails.createrId !== userInfo.userId">
                <div v-if="!isFollow" class="btn" @click="follow">
                  <sp-button
                    ><my-icon name="tianjia" size="0.27rem" color="#4974F5" />
                    关注
                  </sp-button>
                </div>
                <div v-else class="btn2" @click="follow">
                  <span class="follow">已关注</span>
                </div>
              </template>
            </div>
          </div>
        </header-slot>
      </div>
      <DownLoadArea
        v-if="!isInApp"
        :ios-link="iosLink"
        :androd-link="androdLink"
      />
      <div class="title-area" @click="toQueDetail">
        <div class="title">{{ answerDetails.title }}</div>
        <div class="nums-area">
          {{ answerDetails.answerCount }} 个回答 ·
          {{ answerDetails.collectCount }} 收藏
        </div>
      </div>
      <div class="main">
        <div ref="myPage" class="user-info">
          <sp-image
            class="img"
            :src="answerDetails.avatar"
            @click="goUser(answerDetails.userId, answerDetails.userType)"
          />
          <div class="infos">{{ answerDetails.userName }}</div>
          <template v-if="answerDetails.createrId !== userInfo.userId">
            <div v-if="!isFollow" class="btn" @click="follow">
              <sp-button
                ><my-icon name="tianjia" size="0.27rem" color="#4974F5" />
                关注</sp-button
              >
            </div>
            <div v-else class="btn2" @click="follow">
              <span class="follow">已关注</span>
            </div>
          </template>
        </div>
        <div class="content" v-html="answerDetails.content"></div>
        <p class="pub-time">编辑于{{ answerDetails.createTime }}</p>
      </div>
      <Comment
        ref="openComment"
        :article-id="answerDetails.id"
        :source-type="answerDetails.type"
      />
      <sp-bottombar safe-area-inset-bottom>
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
          <span class="icon oppose" @click="handleClickBottom(2)">
            <my-icon name="fandui" size="0.28rem" color="#4974F5"></my-icon
          ></span>
        </div>
        <div
          v-if="answerDetails && answerDetails.isApplaudFlag === 1"
          class="applaud"
          @click="handleClickBottom(1)"
        >
          <span class="icon">
            <my-icon name="zantong_mian" size="0.28rem" color="#fff"></my-icon
          ></span>
          <span class="text">已赞同</span>
        </div>
        <div
          v-if="answerDetails.isDisapplaudFlag === 1"
          class="applaud dis-applaud"
          @click="handleClickBottom(2)"
        >
          <span class="icon">
            <my-icon name="fandui_mian" size="0.28rem" color="#fff"></my-icon
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
      </sp-bottombar>
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
      <sp-share-sheet
        v-model="showShare"
        title="分享"
        :options="shareOptions"
        @select="onSelect"
      />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import {
  Field,
  Button,
  Image,
  Toast,
  Popup,
  Dialog,
  Icon,
  Bottombar,
  ShareSheet,
} from '@chipspc/vant-dgg'
import Comment from '@/components/mustKnown/DetailComment'
import HeaderSlot from '@/components/common/head/HeaderSlot'
import DownLoadArea from '@/components/common/downLoadArea'
import ShareModal from '@/components/common/ShareModal'
import { knownApi, userinfoApi } from '@/api'
import util from '@/utils/changeBusinessData'
import { copyToClipboard, setUrlParams } from '@/utils/common'
export default {
  layout: 'keepAlive',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [ShareSheet.name]: ShareSheet,
    [Dialog.name]: Dialog,
    [Bottombar.name]: Bottombar,
    Comment,
    HeaderSlot,
    DownLoadArea,
    ShareModal,
  },
  async asyncData({ $axios, query, store }) {
    let answerDetails = {}
    try {
      const res = await $axios.get(knownApi.questionArticle.detail, {
        params: {
          id: query.id,
          userId: store.state.user.userId,
          userHandleFlag: store.state.user.userId ? 1 : 0,
        },
      })
      if (res.code === 200) {
        answerDetails = res.data
      }
    } catch (error) {}

    return {
      answerDetails,
    }
  },
  data() {
    return {
      iosLink: 'cpsccustomer://',
      androdLink: 'cpsccustomer://',
      isShare: false,
      showHead2: false,
      answerDetails: '',
      popupShow: false,
      answerCollectCount: '',
      isFollow: false,
      userType: '',
      shareOptions: [], // wap 分享设置
      showShare: false, // wap 分享开关
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user, // 登录的用户信息
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  created() {
    this.isShare = this.$route.query.isShare
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
    goUser(id, usertype) {
      this.$router.push({
        path: '/known/home',
        query: { homeUserId: id, type: usertype },
      })
    },
    toQueDetail() {
      this.$router.replace(
        '/known/detail/question?id=' + this.answerDetails.sourceId
      )
    },
    async initData() {
      const res = await this.$axios.get(knownApi.questionArticle.detail, {
        params: {
          id: this.$route.query.id,
          userId: this.userInfo.userId,
          userHandleFlag: this.userInfo.userId ? 1 : 0,
        },
      })
      if (res.code === 200) {
        this.answerDetails = res.data
      }
    },
    async follow() {
      if (!(await this.isLogin())) {
        return
      }
      this.loading = true
      this.$axios
        .post(knownApi.home.attention, {
          handleUserName: this.userInfo.userName || '测试用户',
          handleUserId: this.userInfo.userId || '120',
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          handleType: this.isFollow ? 2 : 1,
          attentionUserId: this.answerDetails.userId,
          attentionUserName: this.answerDetails.userName,
          attentionUserType: this.answerDetails.userType,
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.$xToast.show({
              message: this.isFollow ? '取消关注' : '关注成功',
            })
            this.isFollow = !this.isFollow
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
            homeUserId: this.answerDetails.userId,
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
    async onInvite() {
      if (await this.isLogin()) {
        this.$router.push({
          path: '/known/detail/invitationList',
          query: {
            questionId: this.answerDetails.sourceId,
          },
        })
      }
    },
    async writeAnswer() {
      if (await this.isLogin()) {
        this.$router.push({
          path: '/known/publish/answer',
          query: {
            id: this.answerDetails.sourceId,
          },
        })
      }
    },
    async isLogin() {
      const res = await this.$isLogin()
      if (res === 'app_login_success') {
        this.initFollow()
        this.initData()
        return false
      }
      return true
    },
    more() {
      this.popupShow = true
    },
    cancel() {
      this.popupShow = false
    },
    // 获取回答数和收藏数
    getAnswerCollectCount() {
      this.$axios
        .get(knownApi.questionArticle.detail, {
          params: {
            id: this.answerDetails.sourceId,
            userId: this.userInfo.userId,
            userHandleFlag: 1,
            userType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
            userName: this.userInfo.userName,
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
      const scrollTop = this.$refs.myPage.getBoundingClientRect().bottom // 滚动条距离顶部的位置
      const than = document.body.clientWidth / 375
      if (scrollTop / than <= ((this.appInfo.statusBarHeight || 0) + 88) / 2) {
        this.showHead2 = true
      } else {
        this.showHead2 = false
      }
    },
    onLeftClick() {
      this.$router.back(-1)
    },

    async handleClickBottom(type) {
      if (!(await this.isLogin())) {
        return
      }
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
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName,
          businessId: this.currentDetailsId,
          handleType: this.handleType,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: 3,
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
        query: {
          id: curId,
          editType: 2,
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
              currentUserId: this.userInfo.userId,
            })
            .then((res) => {
              this.loading = false
              if (res.code === 200) {
                this.$xToast.show({ message: '删除成功' })
                this.$router.replace({ path: '/known' })
              } else {
                Toast.fail({
                  duration: 2000,
                  message:
                    res.data.error || res.message || '服务异常，请刷新重试！',
                  forbidClick: true,
                  className: 'my-toast-style',
                })
              }
            })
        })
        .catch((err) => {
          Toast.fail({
            duration: 2000,
            message: '服务异常，请刷新重试！',
            forbidClick: true,
            className: 'my-toast-style',
          })
          console.log(err)
          // on cancel
        })
    },
    async shareHandle() {
      if (await this.isLogin()) {
        if (this.isInApp) {
          const url = window && window.location.href
          const sharedUrl = setUrlParams(url, { isShare: 1 })
          const tile = this.answerDetails.title
          const shareContent = {
            title: `${tile}`,
            url: sharedUrl,
          }

          // 薯片app
          if (this.appInfo.platformCode === 'COMDIC_PLATFORM_CRISPS') {
            shareContent.image =
              'https://cdn.shupian.cn/sp-pt/wap/images/g6trabnxtg80000.png'
            shareContent.subTitle = `${
              this.answerDetails.userName || '薯片用户'
            }回答了问题,已获${
              this.answerDetails.applaudCount || 0
            }个赞,快来看看吧!`
          } else {
            // 启大顺
            shareContent.description = `${
              this.answerDetails.userName || '薯片用户'
            }回答了问题,已获${
              this.answerDetails.applaudCount || 0
            }个赞,快来看看吧!`
            shareContent.imgUrl =
              'https://cdn.shupian.cn/sp-pt/wap/images/g6trabnxtg80000.png'
          }

          this.$appFn.dggShare(shareContent, (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '分享失败！',
                duration: 1500,
                forbidClick: false,
                icon: 'toast_ic_remind',
              })
            }
          })
          return
        }
        this.shareOptions = [{ name: '复制链接', icon: 'link' }]
        this.showShare = true
      }
    },
    async onSelect() {
      if (await this.isLogin()) {
        if (this.isInApp) {
          this.showShare = false
          return
        }
        const url = window && window.location.href
        const sharedUrl = setUrlParams(url, { isShare: 1 })
        const isSuccess = copyToClipboard(sharedUrl)
        if (isSuccess) {
          this.$xToast.show({
            message: '复制成功',
            duration: 1500,
            icon: 'toast_ic_comp',
            forbidClick: true,
          })
        }
        this.showShare = false
        scrollTo(0, 0)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.ql-align-right {
  text-align: right;
}
.answer {
  background: #fff;
}
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
    font-weight: bold;
    color: #222222;
    bottom: 0;
    border-top: 1px solid #f4f4f4;
  }
}
.nav-back {
  float: left;
  margin-top: 20px;
}
.head1 {
  padding: 0 40px;
  height: 88px;
  font-size: 30px;
  background: #ffffff;
  .btn-area {
    float: right;
    display: flex;
    align-items: center;
    height: 100%;
    .content {
      color: #4974f5;
      span {
        font-weight: bold;
      }
    }
    p {
      color: #4974f5;
      padding: 0 20px;
    }
    span {
      color: #4974f5;
      font-weight: bold;
      // padding: 0 20px;
    }
  }
}
.head2 {
  padding: 0 40px;
  height: 88px;
  background: #ffffff;
  .user-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      font-size: 0.3rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bold;
      color: #222;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
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
        display: block;
        float: left;
        font-size: 30px;
        border-radius: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #4974f5;
        border: none;
        p {
          margin-top: 10px;
        }
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
  padding: 20px 40px;
  border-bottom: 2px solid #f4f4f4;
  .title {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 56px;
    font-weight: bold;
  }
  .nums-area {
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #999999;
    margin: 20px 0;
    font-weight: bold;
  }
}
.main {
  padding: 40px;
  .user-info {
    display: flex;
    align-items: center;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 30px;
      padding-left: 16px;
    }
    .btn2 {
      background: none;
      font-size: 30px;
      font-weight: bold;
      color: #999999;
      background: #f5f5f5;
      height: 72px;
      border-radius: 0.12rem;
      padding: 0 25px;
      display: flex;
      align-items: center;
    }
    .btn {
      height: 72px;
      background: #f5f5f5;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        border-radius: 12px;
        color: rgba(73, 116, 245, 1);
        display: block;
        font-weight: bold;
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
    font-size: 32px;
    color: #666;
    line-height: 50px;
    font-weight: 400;
    color: #555555;
    word-break: break-all;
    overflow: hidden;
    ::v-deep img {
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
::v-deep.sp-bottombar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
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
      position: relative;
    }
    .text {
      font-weight: bold;
    }
  }
  .left-area {
    float: left;
    width: auto;
    height: 72px;
    background: #f2f5ff;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: block;
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
        top: 18px;
        padding: 0;
        margin: 0;
        line-height: 0;
      }
    }
    .icon.oppose {
      padding-left: 20px;
      margin-left: 20px;
      border-left: 1px solid #ddd;
      .spiconfont {
        left: 20px;
      }
    }
    .text {
      margin-top: 1px;
      font-size: 24px;
      color: #4974f5;
      font-weight: bold;
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
      color: #999999;
      font-size: 20px;
      .icon {
        width: 100%;
        height: 40px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
