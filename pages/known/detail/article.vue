<template>
  <section>
    <ShareModal
      :mch-id="shareValue.businessId"
      :source-id="shareValue.commonId"
      :share-id="shareValue.shareId"
    />
    <div class="article">
      <HeaderSlot>
        <div v-if="!showHead" class="flex">
          <div class="nav-back">
            <my-icon
              v-if="!isShare"
              name="nav_ic_back"
              size="0.40rem"
              color="#1a1a1a"
              class="my_icon"
              @click.native="$back()"
            ></my-icon>
          </div>
          <div class="search">
            <my-icon
              style="margin-right: 0.32rem"
              name="nav_ic_searchbig"
              size="0.40rem"
              color="#1a1a1a"
              class="my_icon"
              @click.native="$router.push('/known/search')"
            ></my-icon>
            <my-icon
              :style="{
                'margin-right':
                  articleDetails.createrId === userInfo.userId ? '0.32rem' : '',
              }"
              name="fenxiang"
              size="0.36rem"
              color="#1a1a1a"
              class="my_icon"
              @click.native="shareHandle"
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
      <DownLoadArea
        v-if="!isInApp"
        :ios-link="iosLink"
        :androd-link="androdLink"
      />
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
              <sp-button>
                <my-icon name="tianjia" size="0.27rem" color="#4974F5" />
                关注
              </sp-button>
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
      <Comment
        ref="openComment"
        :article-id="articleDetails.id"
        :source-type="articleDetails.type"
      />
      <sp-bottombar safe-area-inset-bottom>
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
            class="item"
            :style="{
              color: articleDetails.isCollectFlag === 1 ? '#4974F5' : '#999999',
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
              <my-icon name="bianji1" size="1rem" color="#555"></my-icon>
              <p>编辑</p>
            </li>
            <li @click="deleteQues(articleDetails.id)">
              <my-icon name="shanchu1" size="1rem" color="#555"></my-icon>
              <p>删除</p>
            </li>
          </ul>
          <div class="cancel" @click="popupShow = false">取消</div>
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
  Bottombar,
  ShareSheet,
} from '@chipspc/vant-dgg'
import { knownApi, planner } from '@/api'
import PageHead from '@/components/common/head/header'
import PageHead2 from '@/components/mustKnown/DetailHeaderUser'
// 推荐文章列表
import DetailArticleList from '@/components/mustKnown/DetailArticleList'
// 默认评论列表
import Comment from '~/components/mustKnown/DetailComment'
import HeaderSlot from '@/components/common/head/HeaderSlot'
import DownLoadArea from '@/components/common/downLoadArea'
import ShareModal from '@/components/common/ShareModal'
import { copyToClipboard, setUrlParams } from '@/utils/common'
// import SpBottom from '@/components/common/spBottom/SpBottom'
export default {
  layout: 'keepAlive',
  components: {
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Image.name]: Image,
    [Field.name]: Field,
    [Dialog.name]: Dialog,
    [Bottombar.name]: Bottombar,
    [ShareSheet.name]: ShareSheet,
    Comment,
    HeaderSlot,
    // PageHead,
    PageHead2,
    DetailArticleList,
    DownLoadArea,
    // Header,
    ShareModal,
  },
  async asyncData({ $axios, query, store }) {
    let articleDetails = {}
    let shareValue = {}
    try {
      if (query.redisKey) {
        const cacheValueRes = await $axios
          .get(planner.getShareId, {
            params: { cacheKey: query.redisKey },
          })
          .then((res) => {
            console.log('cacheRes', res)
            if (res.code === 200) {
              shareValue = JSON.parse(res.data.cacheValue)
            }
          })
      }
      const res = await $axios.get(knownApi.questionArticle.detail, {
        params: {
          id: query.id || shareValue.commonId,
          userId: store.state.user.userId,
          userHandleFlag: store.state.user.userId ? 1 : 0,
        },
      })
      if (res.code === 200) {
        articleDetails = res.data
      }
    } catch (error) {}

    return {
      shareValue,
      articleDetails,
    }
  },
  data() {
    return {
      iosLink: 'cpsccustomer://',
      androdLink: 'cpsccustomer://',
      isShare: false,
      popupShow: false,
      articleList: [],
      showHead: false,
      // articleDetails: '',
      currentDetailsId: '',
      handleType: '',
      isFollow: false,
      releaseFlag: false, // 是否发布的新文章
      shareOptions: [], // wap 分享设置
      showShare: false, // wap 分享开关
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
    if (process.client) {
      this.getRecommendData()
      if (this.userInfo.token) {
        this.initFollow()
      }
    }
  },

  mounted() {
    this.isShare = this.$route.query.isShare
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
            homeUserId: this.articleDetails.userId,
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
          dateType: 2,
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
        })
    },
    async shareHandle() {
      if (await this.$isLogin()) {
        if (this.isInApp) {
          const url = window && window.location.href
          const sharedUrl = setUrlParams(url, { isShare: 1 })
          const tile = this.articleDetails.title
          const content = this.articleDetails.contentText
            .substring(0, 50)
            .trim()
          console.log(`output tile: ${tile}`)
          console.log(`output content: ${content}`)
          const shareContent = {
            title: `${tile}`,
            url: sharedUrl,
          }
          // 薯片app
          if (this.appInfo.platformCode === 'COMDIC_PLATFORM_CRISPS') {
            shareContent.image =
              'https://cdn.shupian.cn/sp-pt/wap/images/g6trabnxtg80000.png'
            shareContent.subTitle = `${content}`
          } else {
            // 启大顺
            shareContent.description = `${content}`
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
      if (await this.$isLogin()) {
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
<style scoped lang="css">
.ql-align-right {
  text-align: right;
}
</style>
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
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  height: 0.88rem;
  padding: 0 0.32rem;
  .nav-back {
    float: left;
    margin-top: 24px;
    width: 40px;
    height: 40px;
  }
  .search {
    float: right;
  }
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
    margin-top: 10px;
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
      border-radius: 12px;
      display: flex;
      align-items: center;
      .sp-button {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
        border-radius: 12px;
        color: rgba(73, 116, 245, 1);
        display: block;
        font-weight: bold;
        float: left;
        display: flex;
      }
    }
  }
  .content {
    word-break: break-all;
    padding-top: 40px;
    font-size: 32px;
    line-height: 50px;
    color: #666;
    font-weight: 400;
    color: #555555;
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
// ::v-deep.my-head {
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

      ::v-deep img {
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
