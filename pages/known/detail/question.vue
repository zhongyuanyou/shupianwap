<template>
  <div
    class="detail"
    :style="{
      paddingBottom: fixedshow ? '1.3rem' : '',
    }"
  >
    <HeaderSlot>
      <div class="flex">
        <div>
          <my-icon
            name="nav_ic_back"
            size="0.40rem"
            color="#1a1a1a"
            class="my_icon"
            @click.native="goBack"
          ></my-icon>
        </div>
        <p class="title">{{ title }}</p>
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
            v-if="questionDetails.createrId === userInfo.userId"
            name="ellipsis"
            size="0.4rem"
            color="#1a1a1a"
            class="ellipsis"
            @click="moreOperate"
          />
        </div>
      </div>
    </HeaderSlot>
    <div class="problem">
      <div class="tag">
        <ul class="box">
          <template v-for="(item, index) in questionDetails.categoryName">
            <li v-if="item" :key="index">
              {{ item }}
            </li>
          </template>
        </ul>
      </div>
      <h1 ref="title" class="tit">{{ questionDetails.title }}</h1>
      <div
        v-if="
          questionDetails.contentImageUrl &&
          questionDetails.contentImageUrl.length <= 2 &&
          questionDetails.contentImageUrl.length > 0 &&
          !contentshow
        "
        class="imglist"
      >
        <div
          v-for="(item, index) in questionDetails.contentImageUrl"
          :key="index"
          class="imgbox"
        >
          <img :src="item" alt="" />
        </div>
      </div>
      <div
        v-if="
          questionDetails.contentImageUrl &&
          questionDetails.contentImageUrl.length > 2 &&
          !contentshow
        "
        class="imglist"
      >
        <div class="imgbox">
          <img :src="questionDetails.contentImageUrl[0]" alt="" />
        </div>
        <div class="imgbox">
          <img :src="questionDetails.contentImageUrl[1]" alt="" />
          <div class="imgbox1">
            {{ `+${questionDetails.contentImageUrl.length}` }}
          </div>
        </div>
      </div>
      <div class="content">
        <p v-if="!contentshow" class="tit">
          {{ questionDetails.contentText }}
        </p>
        <div v-else class="tit" v-html="questionDetails.content"></div>

        <div class="btn" @click="contentshow = !contentshow">
          <span class="tit">{{ contentshow ? '收起' : '展开' }}</span>
          <sp-icon
            v-show="contentshow"
            name="arrow-up"
            size="0.3rem"
            color="#999999"
            style="margin-top: -0.06rem; margin-left: 0.05rem"
            class="ellipsis"
          />
          <sp-icon
            v-show="!contentshow"
            name="arrow-down"
            size="0.3rem"
            color="#999999"
            style="margin-left: 0.05rem"
            class="ellipsis"
          />
        </div>
      </div>
      <div class="num">
        <div class="left">
          <div>{{ questionDetails.collectCount }} <span>收藏</span></div>
          <p></p>
          <div @click="commentShow = true">
            {{ questionDetails.remarkCount }} <span>评论</span>
          </div>
          <p></p>
          <div>{{ questionDetails.totalBrowseCount }} <span>浏览</span></div>
        </div>
        <div
          class="right"
          :class="questionDetails.isApplaudFlag === 1 ? 'act' : ''"
          @click="like('LIKE')"
        >
          <my-icon name="dianzan" size="0.24rem"></my-icon>
          好问题
          <span v-if="questionDetails.applaudCount > 0">{{
            questionDetails.applaudCount
          }}</span>
        </div>
      </div>
      <div ref="btns" class="btns">
        <div
          class="box"
          :class="[questionDetails.status === 0 ? 'form-onlyRead' : '']"
          @click="goInvitionPage"
        >
          <my-icon name="yaoqinghuida_mian" size="0.32rem"></my-icon>
          <p>邀请回答</p>
        </div>
        <div
          class="box"
          :class="[questionDetails.status === 0 ? 'form-onlyRead' : '']"
          @click="goPublishAnswer"
        >
          <my-icon name="xiehuida" size="0.32rem"></my-icon>
          <p>写回答</p>
        </div>
        <div class="box" @click="like('COLLECT')">
          <my-icon
            :name="
              questionDetails.isCollectFlag === 1 ? 'shoucang_mian' : 'shoucang'
            "
            :color="questionDetails.isCollectFlag === 1 ? '#555555' : '#4974F5'"
            size="0.32rem"
          ></my-icon>
          <p
            :style="{
              color:
                questionDetails.isCollectFlag === 1 ? '#555555' : '#4974F5',
            }"
          >
            {{ questionDetails.isCollectFlag === 1 ? '已收藏' : '收藏' }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="releaseStatus === 'release'" class="success">
      <div>
        <sp-icon name="certificate" size="0.45rem" color="#00B365" /><span
          >成功提问</span
        >
      </div>
      <p>你可以邀请用户来更快获得回答</p>
    </div>
    <div class="answer">
      <div class="head">
        <p>回答 {{ total }}</p>
        <div>
          <i class="bg" :class="answersort === 1 ? 'right' : ''"></i>
          <span :class="answersort === 0 ? 'act' : ''" @click="answersortfn(0)"
            >默认</span
          >
          <span :class="answersort === 1 ? 'act' : ''" @click="answersortfn(1)"
            >最新</span
          >
        </div>
      </div>
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in questionList"
          :key="index"
          class="list"
          @click="goAnsDetail(item.id)"
        >
          <div class="head">
            <img
              :src="item.avatar"
              alt=""
              @click.stop="goUser(item.userId, item.userType)"
            />
            <p>{{ item.userName }}</p>
          </div>
          <p class="content">
            {{ item.contentText }}
          </p>
          <div class="foot">
            <p>{{ item.applaudCount }} 赞同</p>
            <span></span>
            <p>{{ item.collectCount }} 喜欢</p>
            <span></span>
            <p>{{ item.remarkCount }} 评论</p>
            <span></span>
            <p>{{ item.createTime }}</p>
          </div>
        </div>
      </sp-list>
    </div>
    <template v-show="fixedshow">
      <sp-bottombar safe-area-inset-bottom>
        <div
          class="btn"
          :class="[questionDetails.status === 0 ? 'form-onlyRead' : '']"
          @click="goInvitionPage"
        >
          <my-icon name="yaoqinghuida_mian" size="0.4rem"></my-icon>
          <span>邀请回答</span>
        </div>
        <div
          class="btn"
          :class="[questionDetails.status === 0 ? 'form-onlyRead' : '']"
          @click="goPublishAnswer"
        >
          <my-icon name="xiehuida" size="0.4rem"></my-icon>
          <span>写回答</span>
        </div>
        <div
          class="collect"
          :style="{
            background:
              questionDetails.isCollectFlag === 1 ? '#F5F5F5' : '#4974F5',
            color: questionDetails.isCollectFlag === 1 ? '#CCCCCC' : '#FFFFFF',
          }"
          @click="like('COLLECT')"
        >
          <my-icon
            :name="
              questionDetails.isCollectFlag === 1 ? 'shoucang_mian' : 'shoucang'
            "
            :color="questionDetails.isCollectFlag === 1 ? '#CCCCCC' : '#FFFFFF'"
            size="0.32rem"
          ></my-icon>
          <span>{{
            questionDetails.isCollectFlag === 1 ? '已收藏' : '收藏'
          }}</span>
        </div>
      </sp-bottombar>
    </template>

    <comment-list
      v-model="commentShow"
      :article-id="questionDetails.id"
      :source-type="questionDetails.type"
    ></comment-list>

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
          <li @click="editQues(questionDetails.id)">
            <my-icon name="bianji1" size="1rem" color="#555"></my-icon>
            <p>编辑</p>
          </li>
          <li @click="deleteQues(questionDetails.id)">
            <my-icon name="shanchu1" size="1rem" color="#555"></my-icon>
            <p>删除</p>
          </li>
        </ul>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </sp-popup>
  </div>
</template>

<script>
import { Icon, Toast, List, Popup, Dialog, Bottombar } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import CommentList from '@/components/mustKnown/CommentList'
import { knownApi, userinfoApi } from '@/api'
import HeaderSlot from '@/components/common/head/HeaderSlot'
import util from '@/utils/changeBusinessData'
export default {
  layout: 'keepAlive',
  name: 'Detail',
  components: {
    HeaderSlot,
    [Icon.name]: Icon,
    [List.name]: List,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
    [Bottombar.name]: Bottombar,
    CommentList,
  },
  async asyncData({ $axios, query, store }) {
    let questionDetails = []
    try {
      const res = await $axios.get(knownApi.questionArticle.detail, {
        params: {
          id: query.id,
          userId: store.state.user.userId,
          userHandleFlag: store.state.user.userId ? 1 : 0,
        },
      })
      if (res.code === 200) {
        if (res.data.categoryName) {
          res.data.categoryName = res.data.categoryName.split(',')
        }
        if (res.data.contentImageUrl) {
          res.data.contentImageUrl = res.data.contentImageUrl.split(',')
        }
        questionDetails = res.data
      }
    } catch (error) {}

    return {
      questionDetails,
    }
  },
  data() {
    return {
      title: '',
      contentshow: false,
      answersort: 0,
      fixedshow: false,
      scrollTop: 0,
      questionList: [],
      releaseStatus: '',
      orderBy: 'applaudCount=desc;',
      handleLikeType: null,
      finished: false,
      page: 1,
      loading: false,
      limit: 15,
      error: false,
      total: '',
      popupShow: false,
      currentDetailsId: '',
      commentShow: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
      userId: (state) => state.user.userId,
      userInfo: (state) => state.user, // 登录的用户信息
    }),
  },
  created() {
    if (this.$route.query.id) {
      this.currentDetailsId = this.$route.query.id
    }
    if (this.$route.query.status) {
      this.releaseStatus = this.$route.query.status
    }
  },
  mounted() {
    window.addEventListener('scroll', this.watchScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.watchScroll)
  },
  methods: {
    goUser(id, usertype) {
      this.$router.push({
        path: '/known/home',
        query: { homeUserId: id, type: usertype },
      })
    },
    onLoad() {
      this.getQuesDataApi()
    },
    goAnsDetail(id) {
      this.$router.push({
        path: '/known/detail/answer',
        query: { id },
      })
    },
    async getDetailApi() {
      try {
        const res = await this.$axios.get(knownApi.questionArticle.detail, {
          params: {
            id: this.currentDetailsId,
            userId: this.userId,
            userHandleFlag: this.userId ? 1 : 0,
          },
        })
        if (res.code === 200) {
          if (res.data.categoryName) {
            res.data.categoryName = res.data.categoryName.split(',')
          }
          if (res.data.contentImageUrl) {
            res.data.contentImageUrl = res.data.contentImageUrl.split(',')
          }
          this.questionDetails = res.data
        } else {
          this.pageError()
        }
      } catch (e) {
        this.pageError()
      }
    },
    pageError() {
      this.$xToast.error('服务器加载异常,请稍后重试.')
      const _this = this
      setTimeout(() => {
        _this.$back()
      }, 1000)
    },
    async isLogin() {
      const res = await this.$isLogin()
      if (res === 'app_login_success') {
        this.getDetailApi()
        return false
      }
      return true
    },
    getQuesDataApi() {
      this.$axios
        .post(knownApi.questionArticle.list, {
          sourceIds: [this.currentDetailsId],
          orderBy: this.orderBy,
          page: this.page,
          currentUserId: this.userInfo.userId,
          limit: this.limit,
        })
        .then((res) => {
          if (res.code === 200) {
            this.questionList.push(...res.data.rows)
            this.total = res.data.total
            this.page++
            if (!res.data.totalPage || this.page > res.data.totalPage) {
              this.finished = true
            }
          } else {
            this.error = true
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
          this.loading = false
        })
        .catch((e) => {
          this.error = true
          this.loading = false
        })
    },
    async like(type) {
      if (!(await this.isLogin())) {
        return
      }

      this.handleLikeType = ''
      if (type === 'LIKE') {
        this.questionDetails.applaudCount = Number(
          this.questionDetails.applaudCount
        )
        if (this.questionDetails.isApplaudFlag === 1) {
          this.handleLikeType = 7
          this.questionDetails.isApplaudFlag = 0
          this.questionDetails.applaudCount =
            this.questionDetails.applaudCount - 1
        } else {
          this.handleLikeType = 1
          this.questionDetails.isApplaudFlag = 1
          this.questionDetails.applaudCount =
            this.questionDetails.applaudCount + 1
        }
      }
      if (type === 'COLLECT') {
        this.questionDetails.collectCount = Number(
          this.questionDetails.collectCount
        )
        if (this.questionDetails.isCollectFlag === 1) {
          this.handleLikeType = 9
          this.questionDetails.isCollectFlag = 0
          this.questionDetails.collectCount =
            this.questionDetails.collectCount - 1
        } else {
          this.handleLikeType = 4
          this.questionDetails.isCollectFlag = 1
          this.questionDetails.collectCount =
            this.questionDetails.collectCount + 1
        }
      }
      this.$axios
        .post(knownApi.home.operation, {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName,
          businessId: this.currentDetailsId,
          handleType: this.handleLikeType,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: 1,
        })
        .then((res) => {
          if (res.code === 200) {
            if (type === 'LIKE') {
              if (this.questionDetails.isApplaudFlag === 1) {
                this.$xToast.show({ message: '点赞成功' })
              } else {
                this.$xToast.show({ message: '取消点赞' })
              }
            }
            if (type === 'COLLECT') {
              if (this.questionDetails.isCollectFlag === 1) {
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
    moreOperate() {
      this.popupShow = true
    },
    cancel() {
      this.popupShow = false
    },
    editQues(id) {
      const curId = id
      this.$router.push({
        path: '/known/publish/question',
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
    sum(val) {
      console.log(val)
    },
    sort(value) {
      console.log(value)
    },
    answersortfn(index) {
      if (this.answersort === index) {
        return
      }
      this.answersort = index
      if (this.answersort === 0) {
        this.orderBy = 'applaudCount=desc;'
      } else {
        this.orderBy = 'createTime=desc;'
      }
      this.init()
      this.onLoad()
    },

    init() {
      this.page = 1
      this.questionList = []
      this.finished = false
      this.loading = true
      this.error = false
    },

    watchScroll() {
      if (this.$refs.btns.getBoundingClientRect().top < 0) {
        this.fixedshow = true
      } else {
        this.fixedshow = false
      }
      // 获取推荐板块到顶部的距离 减 搜索栏高度
      const scrollTop = this.$refs.title.getBoundingClientRect().bottom // 滚动条距离顶部的位置
      const than = document.body.clientWidth / 375
      if (scrollTop / than <= ((this.appInfo.statusBarHeight || 0) + 88) / 2) {
        this.title = this.questionDetails.title
      } else {
        this.title = ''
      }
    },
    goBack() {
      this.$back()
    },
    async goInvitionPage() {
      if (await this.isLogin()) {
        this.$router.push({
          path: '/known/detail/invitationList',
          query: {
            questionId: this.currentDetailsId,
          },
        })
      }
    },
    async goPublishAnswer() {
      if (await this.isLogin()) {
        this.$router.push({
          path: '/known/publish/answer',
          query: {
            id: this.currentDetailsId,
          },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep.title {
  text-align: left !important;
}
.form-onlyRead {
  pointer-events: none;
  color: #ccc !important;
}
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
  .title {
    font-size: 0.36rem;
    font-weight: bold;
    color: #1a1a1a;
    flex: 1;
    max-width: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
        // color: #999999;
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

.detail {
  min-height: 100vh;
  background: #f5f5f5;
  ::v-deep.fixed-head {
    background: #fff;
    .my-head {
      background: #fff;
    }
  }
  > .problem {
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
      word-break: break-all;
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
      padding: 0 32px;
      position: relative;
      margin-bottom: 48px;
      word-break: break-all;
      > .tit {
        word-break: break-all;
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
        // padding-top: 23px;
        box-sizing: border-box;
        width: 250px;
        height: 118px;
        font-size: 26px;
        font-weight: bold;
        color: #555555;
        border-left: 1px solid #f4f4f4;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        p {
          margin-top: 10px;
        }
      }
      > .box:first-child {
        border-left: none;
      }
    }
  }
  > .success {
    margin-top: 21px;
    background: #fff;
    padding: 32px 0 40px 0;
    border: 1px solid #dddddd;
    > div {
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      color: #222222;
      ::v-deep i {
        vertical-align: -11px;
        margin-right: 5px;
      }
    }
    > p {
      margin-top: 24px;
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      text-align: center;
    }
  }
  > .user {
    background: #fff;
    > .head {
      display: flex;
      align-items: center;
      height: 162px;
      padding: 0 32px;
      > .left {
        > h1 {
          font-size: 32px;
          font-weight: bold;
          color: #222222;
        }
        > p {
          margin-top: 16px;
          font-size: 26px;
          font-weight: 400;
          color: #999999;
        }
      }
      > .right {
        margin-left: auto;
        width: 144px;
        height: 72px;
        background: #f2f5ff;
        border-radius: 8px;
        font-size: 26px;
        font-weight: bold;
        color: #4974f5;
        text-align: center;
        line-height: 72px;
      }
    }
    > .listbox {
      margin: 0 32px;
      border-top: 1px solid #f4f4f4;
      padding-bottom: 58px;
      > .list {
        display: flex;
        margin: 20px 0;
        align-items: center;
        > img {
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          border-radius: 50%;
          margin-right: 24px;
        }
        > p {
          font-size: 30px;
          font-weight: bold;
          color: #222222;
        }
        > div {
          width: 144px;
          height: 72px;
          background: #4974f5;
          border-radius: 8px;
          font-size: 26px;
          font-weight: bold;
          color: #ffffff;
          margin-left: auto;
          text-align: center;
          line-height: 72px;
          box-sizing: border-box;
        }
      }
    }
    > .none {
      background: #f5f5f5;
      height: 96px;
      font-size: 24px;
      font-weight: 400;
      color: #999999;
      line-height: 96px;
      text-align: center;
    }
  }
  > .answer {
    margin-top: 21px;
    > .head {
      padding: 0 32px;
      height: 96px;
      // border-bottom: 1px solid #f4f4f4;
      display: flex;
      align-items: center;
      background: #fff;
      position: relative;
      > p {
        font-size: 30px;
        font-weight: bold;
        color: #222222;
      }
      > div {
        // width: 216px;
        height: 60px;
        background: #f5f5f5;
        border-radius: 31px;
        position: relative;
        display: flex;
        margin-left: auto;
        align-items: center;
        > span {
          width: 104px;
          // height: 52px;
          display: block;
          font-size: 26px;
          font-weight: bold;
          color: #999999;
          text-align: center;
          // line-height: 52px;
          position: relative;
          z-index: 1;
        }
        > .act {
          color: #222222;
        }
        > .bg {
          width: 97px;
          height: 52px;
          background: #ffffff;
          border-radius: 27px;
          display: block;
          position: absolute;
          z-index: 0;
          top: 4px;
          left: 4px;
          transition: all 0.3s;
        }
        > .right {
          left: 108px;
          transition: all 0.3s;
        }
      }
    }
    > .head::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #f4f4f4;
      -webkit-transform: scaleY(0.6);
      transform: scaleY(0.6);
    }
    .list {
      margin-bottom: 10px;
      background: #fff;
      padding: 32px 32px 40px 32px;
      > .head {
        display: flex;
        align-items: center;
        > img {
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          object-fit: cover;
          border-radius: 50%;
        }
        > p {
          font-size: 30px;
          font-weight: bold;
          color: #222222;
          margin-left: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      > .content {
        margin-top: 22px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        font-size: 30px;
        font-weight: 400;
        color: #555555;
      }
      > .foot {
        margin-top: 20px;
        display: flex;
        align-items: center;
        > p {
          font-size: 26px;
          font-weight: 400;
          color: #999999;
        }
        > span {
          width: 4px;
          height: 4px;
          background: #999999;
          display: block;
          margin: 0 16px;
        }
      }
    }
  }
  ::v-deep.sp-bottombar {
    display: flex;
    background: #ffffff;
    border-radius: 8px;
    font-size: 28px;
    font-weight: bold;
    color: #222222;
    text-align: center;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    > .btn {
      width: 216px;
      height: 72px;
      background: #ffffff;
      border-radius: 8px;
      font-size: 28px;
      font-weight: 600;
      color: #222222;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #dddddd;
      > span {
        margin-left: 0.1rem;
      }
    }
    .collect {
      width: 216px;
      height: 72px;
      background: #ffffff;
      border-radius: 8px;
      font-size: 28px;
      font-weight: 600;
      color: #222222;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .spiconfont {
        padding-top: 3px;
      }
      > span {
        margin-left: 0.1rem;
      }
    }
  }
}
</style>
