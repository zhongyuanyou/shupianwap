<template>
  <div class="article">
    <HeaderSlot>
      <div v-if="!showHead" class="flex">
        <div>
          <my-icon
            name="nav_ic_back"
            size="0.40rem"
            color="#1a1a1a"
            class="my_icon"
            @click.native="$back()"
          ></my-icon>
        </div>
        <div>
          <my-icon
            style="margin-right: 0.15rem"
            name="nav_ic_searchbig"
            size="0.40rem"
            color="#1a1a1a"
            class="my_icon"
            @click.native="$router.push('/known/search')"
          ></my-icon>
          <sp-icon
            v-if="articleDetails.createrId === userInfo.userId"
            name="ellipsis"
            size="0.4rem"
            color="#1a1a1a"
            class="ellipsis"
            @click="popupShow = true"
          />
        </div>
      </div>
      <div v-if="showHead" class="flex">
        <PageHead2
          :header-data="articleDetails"
          :is-follow="isFollow"
          :is-show-follow="articleDetails.createrId !== userInfo.userId"
          @follow="follow"
        />
      </div>
    </HeaderSlot>
    <div class="title-area">
      <div class="title">{{ articleDetails.title }}</div>
    </div>
    <div class="main">
      <div ref="myPage" class="user-info">
        <sp-image
          class="img"
          :src="articleDetails.avatar"
          @click.stop="goUser(articleDetails.userId, articleDetails.userType)"
        />
        <div class="infos">{{ articleDetails.userName }}</div>
        <template v-if="articleDetails.createrId !== userInfo.userId">
          <div v-if="!isFollow" class="btn" @click="follow">
            <sp-button><my-icon name="jia" size="0.28rem" /> 关注</sp-button>
          </div>
          <div v-else class="btn2" @click="follow">
            <span class="follow">已关注</span>
          </div>
        </template>
      </div>
      <div class="content" v-html="articleDetails.content"></div>
      <p class="pub-time">编辑于 {{ articleDetails.createTime }}</p>
      <DetailArticleList :article-list="articleList" />
    </div>
    <Comment ref="openComment" :article-id="articleDetails.id" />
    <div class="page-bottom">
      <div>
        <div
          v-if="
            articleDetails.isApplaudFlag === 0 &&
            articleDetails.isDisapplaudFlag === 0
          "
          class="left-area"
        >
          <span class="icon" @click="handleClickBottom(1)">
            <my-icon name="zantong" size="0.28rem" color="#4974F5"></my-icon
          ></span>
          <span class="text" @click="handleClickBottom(1)"
            >赞同{{ articleDetails.applaudCount }}</span
          >
          <span class="icon" @click="handleClickBottom(2)">
            <my-icon name="fandui" size="0.28rem" color="#4974F5"></my-icon
          ></span>
        </div>
        <div
          v-if="articleDetails.isApplaudFlag === 1"
          class="applaud"
          @click="handleClickBottom(1)"
        >
          <span class="icon">
            <my-icon name="zantong_mian" size="0.28rem" color="#fff"></my-icon
          ></span>
          <span class="text">已赞同</span>
        </div>
        <div
          v-if="articleDetails.isDisapplaudFlag === 1"
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
            v-if="articleDetails.isApplaudFlag === 1"
            class="applaud"
            @click="handleClickBottom(1)"
          >
            <span class="icon">
              <my-icon name="zantong_mian" size="0.28rem" color="#fff"></my-icon
            ></span>
            <span class="text">已赞同</span>
          </div>
          <div
            v-if="articleDetails.isDisapplaudFlag === 1"
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
                color:
                  articleDetails.isCollectFlag === 1 ? '#4974F5' : '#999999',
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
      </div>
    </div>
    <!--    上拉组件-->
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
          <li @click="editQues(articleDetails.id)">
            <my-icon name="bianji1" size="1rem" color="#1a1a1a"></my-icon>
            <p>编辑</p>
          </li>
          <li @click="deleteQues(articleDetails.id)">
            <my-icon name="shanchu1" size="1rem" color="#1a1a1a"></my-icon>
            <p>删除</p>
          </li>
        </ul>
        <div class="cancel" @click="popupShow = false">取消</div>
      </div>
    </sp-popup>
  </div>
</template>

<script>
import {
  Field,
  Tab,
  Tabs,
  Button,
  Image,
  Toast,
  Icon,
  Popup,
  Dialog,
} from '@chipspc/vant-dgg'
import { knownApi } from '@/api'
import PageHead from '@/components/common/head/header'
import PageHead2 from '@/components/mustKnown/DetailHeaderUser'
// 推荐文章列表
import DetailArticleList from '@/components/mustKnown/DetailArticleList'
// 默认评论列表
import Comment from '~/components/mustKnown/DetailComment'
import HeaderSlot from '@/components/common/head/HeaderSlot'
export default {
  layout: 'keepAlive',
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Image.name]: Image,
    [Field.name]: Field,
    [Dialog.name]: Dialog,
    Comment,
    HeaderSlot,
    // PageHead,
    PageHead2,
    DetailArticleList,
    // Header,
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
      articleDetails: res.data,
    }
  },
  data() {
    return {
      popupShow: false,
      articleList: [],
      showHead: false,
      // articleDetails: '',
      currentDetailsId: '',
      handleType: '',
      isFollow: false,
      releaseFlag: false, // 是否发布的新文章
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    id() {
      return this.$route.query.id
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
    appInfo() {
      return this.$store.state.app.appInfo
    },
  },
  created() {
    this.getRecommendData()
    if (this.userInfo.token) {
      this.initFollow()
    }
  },

  mounted() {
    if (this.$route.query.status === 'release') {
      this.releaseFlag = true
    }
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
    initFollow() {
      this.$axios
        .get(knownApi.questionArticle.findAttention, {
          params: {
            currentUserId: this.userInfo.userId,
            homeUserId: this.articleDetails.createrId,
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
    async follow() {
      const res = await this.$isLogin()
      if (res === 'app_login_success') {
        this.initFollow()
        return
      }
      this.$axios
        .post(knownApi.home.attention, {
          handleUserName: this.userInfo.userName,
          handleUserId: this.userInfo.userId,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          handleType: this.isFollow ? 2 : 1,
          attentionUserId: this.articleDetails.userId,
          attentionUserName: this.articleDetails.userName,
          attentionUserType: this.articleDetails.userType,
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
    comment() {
      this.$refs.openComment.commentShow = true
    },
    getRecommendData() {
      this.loading = true
      this.$axios
        .get(knownApi.questionArticle.recommendArticle, { params: {} })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.articleList = res.data
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
    getDetailData() {
      this.loading = true
      this.$axios
        .get(knownApi.questionArticle.detail, {
          params: {
            id: this.id,
            userHandleFlag: 1,
          },
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.articleDetails = res.data
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
        this.showHead = true
      } else {
        this.showHead = false
      }
    },
    onLeftClick() {
      this.$router.back(-1)
    },
    async handleClickBottom(type) {
      if (!(await this.$isLogin())) {
        return
      }
      this.handleType = ''
      if (type === 1) {
        this.articleDetails.applaudCount = Number(
          this.articleDetails.applaudCount
        )
        if (this.articleDetails.isApplaudFlag === 1) {
          this.handleType = 7
          this.articleDetails.isApplaudFlag = 0
          this.articleDetails.applaudCount =
            this.articleDetails.applaudCount - 1
        } else {
          this.handleType = 1
          this.articleDetails.isApplaudFlag = 1
          this.articleDetails.applaudCount =
            this.articleDetails.applaudCount + 1
        }
      }
      if (type === 2) {
        if (this.articleDetails.isDisapplaudFlag === 1) {
          this.handleType = 8
          this.articleDetails.isDisapplaudFlag = 0
        } else {
          this.handleType = 2
          this.articleDetails.isDisapplaudFlag = 1
        }
      }
      if (type === 3) {
        if (this.articleDetails.isCollectFlag === 1) {
          this.handleType = 9
          this.articleDetails.isCollectFlag = 0
        } else {
          this.handleType = 4
          this.articleDetails.isCollectFlag = 1
        }
      }
      this.$axios
        .post(knownApi.home.operation, {
          handleUserId: this.userInfo.userId || '120',
          handleUserName: this.userInfo.userName || '测试用户',
          businessId: this.id,
          handleType: this.handleType,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: 1,
        })
        .then((res) => {
          if (res.code === 200) {
            if (type === 1) {
              if (this.articleDetails.isApplaudFlag === 1) {
                this.$xToast.show({ message: '点赞成功' })
              } else {
                this.$xToast.show({ message: '取消点赞' })
              }
            }
            if (type === 2) {
              if (this.articleDetails.isDisapplaudFlag === 1) {
                this.$xToast.show({ message: '已反对' })
              } else {
                this.$xToast.show({ message: '取消反对' })
              }
            }
            if (type === 3) {
              if (this.articleDetails.isCollectFlag === 1) {
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
    editQues(id) {
      const curId = id
      this.$router.push({
        path: '/known/publish/article',
        query: {
          id: curId,
          editType: 2,
        },
      })
    },
    deleteQues(id) {
      const curId = id
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
        })
    },
  },
}
</script>

<style lang="less" scoped>
.article {
  background: #fff;
}
// .fixed-head {
//   position: fixed;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 104px;
//   z-index: 99;
// }
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.88rem;
  padding: 0 0.32rem;
  div {
    display: flex;
    height: 0.88rem;
    align-items: center;
  }
}
.head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 104px;
  background: #ffffff;
  line-height: 88px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
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
.title-area {
  // margin-top: 120px;
  padding: 20px 40px;
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
    }
    .btn {
      height: 72px;
      border-radius: 12px;
      display: flex;
      align-content: center;
      .sp-button {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        border-radius: 12px;
        color: rgba(73, 116, 245, 1);
        display: block;
        font-weight: bold;
        float: left;
      }
    }
  }
  .content {
    word-break: break-all;
    padding-top: 40px;
    font-size: 34px;
    color: #666;
    font-weight: 400;
    color: #555555;
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
  width: 100%;
  left: 0;
  bottom: 0;
  height: 116px;
  background: #fff;
  z-index: 1;
  > div {
    position: fixed;
    left: 0;
    bottom: 20px;
    width: 100%;
    height: 96px;
    background: #ffffff;
    padding: 10px 40px;
    border-top: 1px solid #f4f4f4;
    z-index: 2;
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
      .text {
        margin-top: 8px;
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
        margin-top: 6px;
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
}
// /deep/.my-head {
//   padding: 0 32px;
//   box-sizing: border-box !important;
// }
.problem {
  padding-top: 20px;
  background: #fff;
  > .tag {
    width: 100%;
    overflow: auto;
    padding: 0 32px;
    margin-bottom: 36px;
    > .box {
      display: flex;
      width: auto;
      > li {
        background: #f5f5f5;
        border-radius: 8px;
        padding: 16px 24px;
        font-size: 28px;
        font-weight: 400;
        color: #999999;
        margin-left: 16px;
      }
      > li:first-child {
        margin-left: 0;
      }
    }
  }
  > .tit {
    font-size: 40px;
    margin-bottom: 28px;
    font-weight: bold;
    color: #222222;
    padding: 0 32px;
    line-height: 56px;
  }
  > .imglist {
    display: flex;
    padding: 0 32px;
    justify-content: space-between;
    margin-bottom: 28px;
    > .imgbox {
      width: 339px;
      height: 226px;
      background: #f5f5f5;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      > .imgbox1 {
        position: absolute;
        left: 0;
        top: 0;
        width: 339px;
        height: 226px;
        background: rgba(0, 0, 0, 0.4);
        font-size: 52px;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        line-height: 226px;
        border-radius: 12px;
      }
    }
  }
  > .content {
    font-size: 30px;
    font-weight: 400;
    color: #555555;
    line-height: 42px;
    padding: 0 32px;
    position: relative;
    margin-bottom: 48px;
    word-break: break-all;
    > .tit {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;

      /deep/ img {
        width: 100%;
        height: auto;
      }
    }
    > div.tit {
      display: block;
    }
    > .btn {
      margin-top: 20px;
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  > .num {
    display: flex;
    padding: 0 32px;
    align-items: center;
    margin-bottom: 40px;
    > .left {
      display: flex;
      > div {
        font-size: 24px;
        font-weight: bold;
        color: #222222;
        > span {
          color: #999999;
        }
      }
      > p {
        width: 4px;
        height: 4px;
        background: #999999;
        border-radius: 50%;
        margin: 0 16px;
        align-self: center;
      }
    }
    > .right {
      padding: 0 20px;
      height: 56px;
      background: #f5f5f5;
      border-radius: 28px;
      font-size: 24px;
      font-weight: bold;
      color: #999999;
      margin-left: auto;
      text-align: center;
      line-height: 56px;
    }
    > .act {
      background: #f2f5ff;
      color: #4974f5;
    }
  }
  > .btns {
    display: flex;
    border-bottom: 1px solid #f4f4f4;
    border-top: 1px solid #f4f4f4;
    > .box {
      padding-top: 23px;
      box-sizing: border-box;
      width: 250px;
      height: 118px;
      font-size: 26px;
      font-weight: bold;
      color: #555555;
      text-align: center;
      border-left: 1px solid #ddd;
      p {
        margin-top: 10px;
      }
    }
    > .box:first-child {
      border-left: none;
    }
  }
}
.down_slide_list {
  ul {
    display: flex;
    padding: 70px;
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
</style>
