<template>
  <div class="detail" :style="{ paddingBottom: fixedshow ? '1.3rem' : '' }">
    <Header :title="questionDetials.title">
      <template #left>
        <div>
          <sp-icon name="arrow-left" size="0.4rem" @click="goBack" />
        </div>
      </template>
      <template #right>
        <div class="btn">
          <sp-icon
            name="search"
            size="0.4rem"
            color="#1a1a1a"
            class="ss"
            @click="$router.push('/known/search')"
          />
          <sp-icon
            v-if="questionDetials.createrId === userInfo.userId"
            name="ellipsis"
            size="0.4rem"
            color="#1a1a1a"
            class="ellipsis"
            @click="moreOperate"
          />
        </div>
      </template>
    </Header>
    <div class="problem">
      <div class="tag">
        <ul class="box">
          <li
            v-for="(item, index) in questionDetials.categoryName"
            :key="index"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <h1 ref="title" class="tit">{{ questionDetials.title }}</h1>
      <div
        v-if="
          questionDetials.contentImageUrl &&
          questionDetials.contentImageUrl.length <= 2 &&
          questionDetials.contentImageUrl.length > 0 &&
          !contentshow
        "
        class="imglist"
      >
        <div
          v-for="(item, index) in questionDetials.contentImageUrl"
          :key="index"
          class="imgbox"
        >
          <img :src="item" alt="" />
        </div>
      </div>
      <div
        v-if="
          questionDetials.contentImageUrl &&
          questionDetials.contentImageUrl.length > 2 &&
          !contentshow
        "
        class="imglist"
      >
        <div class="imgbox">
          <img :src="questionDetials.contentImageUrl[0]" alt="" />
        </div>
        <div class="imgbox">
          <img :src="questionDetials.contentImageUrl[1]" alt="" />
          <div class="imgbox1">
            {{ `+${questionDetials.contentImageUrl.length}` }}
          </div>
        </div>
      </div>
      <div class="content">
        <p v-if="!contentshow" class="tit">
          {{ questionDetials.contentText }}
        </p>
        <div v-else class="tit" v-html="questionDetials.content"></div>
        <div class="btn" @click="contentshow = !contentshow">
          <span class="tit">{{ contentshow ? '收起' : '展开' }}</span>
          <sp-icon
            :name="contentshow ? 'arrow-up' : 'arrow-down'"
            size="0.4rem"
            color="#999999"
            class="ellipsis"
          />
        </div>
      </div>
      <div class="num">
        <div class="left">
          <div>{{ questionDetials.remarkCount }} <span>评论</span></div>
          <p></p>
          <div>{{ questionDetials.totalBrowseCount }} <span>浏览</span></div>
        </div>
        <div
          class="right"
          :class="questionDetials.isApplaudFlag === 1 ? 'act' : ''"
          @click="like('LIKE')"
        >
          <my-icon name="dianzan" size="0.24rem"></my-icon>
          好问题 {{ questionDetials.applaudCount }}
        </div>
      </div>
      <div ref="btns" class="btns">
        <div
          class="box"
          :class="[questionDetials.status === 0 ? 'form-onlyRead' : '']"
          @click="$router.push('/known/detail/invitationList')"
        >
          <my-icon name="yaoqinghuida_mian" size="0.32rem"></my-icon>
          <p>邀请回答</p>
        </div>
        <div
          class="box"
          :class="[questionDetials.status === 0 ? 'form-onlyRead' : '']"
          @click="$router.push('/known/publish/answer')"
        >
          <my-icon name="xiehuida" size="0.32rem"></my-icon>
          <p>写回答</p>
        </div>
        <div class="box">
          <my-icon
            :name="
              questionDetials.isCollectFlag === 1 ? 'shoucang_mian' : 'shoucang'
            "
            :color="questionDetials.isCollectFlag === 1 ? '#555555' : '#4974F5'"
            size="0.32rem"
          ></my-icon>
          <p
            :style="{
              color:
                questionDetials.isCollectFlag === 1 ? '#555555' : '#4974F5',
            }"
            @click="like('COLLECT')"
          >
            {{ questionDetials.isCollectFlag === 1 ? '已收藏' : '收藏' }}
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
            <img :src="item.avatar" alt="" />
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
            <p>{{ item.publishTime }}</p>
          </div>
        </div>
      </sp-list>
    </div>
    <!-- <div v-show="fixedshow" class="fiexdbtn"> -->
    <div class="fiexdbtn">
      <div
        class="btn"
        :class="[questionDetials.status === 0 ? 'form-onlyRead' : '']"
        @click="$router.push('/known/detail/invitationList')"
      >
        <sp-icon name="friends-o" size="0.4rem" />
        <span>邀请回答</span>
      </div>
      <div
        class="btn"
        :class="[questionDetials.status === 0 ? 'form-onlyRead' : '']"
        @click="$router.push('/known/publish/answer')"
      >
        <sp-icon name="edit" size="0.4rem" />
        <span>写回答</span>
      </div>
      <div
        class="btn"
        :style="{
          background: questionDetials.isCollectFlag === 1 ? '#4974F5' : '',
          color: questionDetials.isCollectFlag === 1 ? '#fff' : '',
        }"
        @click="like('COLLECT')"
      >
        <sp-icon name="like-o" size="0.4rem" />
        <span>收藏</span>
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
          <li @click="editQues(questionDetials.id)">
            <my-icon name="bianji1" size="1rem" color="#1a1a1a"></my-icon>
            <p>编辑</p>
          </li>
          <li @click="deleteQues(questionDetials.id)">
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
import { Icon, Toast, List, Popup, Dialog } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import Header from '@/components/common/head/header'
import { knownApi } from '@/api'
export default {
  name: 'Detail',
  components: {
    Header,
    [Icon.name]: Icon,
    [List.name]: List,
    [Popup.name]: Popup,
    [Dialog.name]: Dialog,
  },
  data() {
    return {
      title: '',
      contentshow: false,
      answersort: 0,
      fixedshow: false,
      scrollTop: 0,
      questionDetials: '',
      questionList: [],
      releaseStatus: '',
      orderBy: 'totalBrowseCount=desc',
      handleLikeType: null,
      finished: false,
      page: 1,
      loading: false,
      limit: 15,
      error: false,
      total: '',
      popupShow: false,
      currentDetailsId: '',
    }
  },
  computed: {
    ...mapState({
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
    this.getDetailApi()
  },
  destroyed() {
    window.removeEventListener('scroll', this.watchScroll)
  },
  methods: {
    onLoad() {
      this.getQuesDataApi()
    },
    goAnsDetail(id) {
      this.$route.push({
        path: '/known/detail/answer',
        query: id,
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
          this.questionDetials = res.data
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
    getQuesDataApi() {
      this.$axios
        .post(knownApi.questionArticle.list, {
          sourceIds: [this.currentDetailsId],
          orderBy: this.orderBy,
          page: this.page,
          userId: this.userInfo.userId || '120',
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
    like(type) {
      this.handleLikeType = ''
      if (type === 'LIKE') {
        this.questionDetials.applaudCount = Number(
          this.questionDetials.applaudCount
        )
        if (this.questionDetials.isApplaudFlag === 1) {
          this.handleLikeType = 7
          this.questionDetials.isApplaudFlag = 0
          this.questionDetials.applaudCount =
            this.questionDetials.applaudCount - 1
        } else {
          this.handleLikeType = 1
          this.questionDetials.isApplaudFlag = 1
          this.questionDetials.applaudCount =
            this.questionDetials.applaudCount + 1
        }
      }
      if (type === 'COLLECT') {
        this.questionDetials.collectCount = Number(
          this.questionDetials.collectCount
        )
        if (this.questionDetials.isCollectFlag === 1) {
          this.handleLikeType = 9
          this.questionDetials.isCollectFlag = 0
          this.questionDetials.collectCount =
            this.questionDetials.collectCount - 1
        } else {
          this.handleLikeType = 4
          this.questionDetials.isCollectFlag = 1
          this.questionDetials.collectCount =
            this.questionDetials.collectCount + 1
        }
      }
      this.$axios
        .post(knownApi.home.operation, {
          handleUserId: this.userInfo.userId || '120',
          handleUserName: this.userInfo.userName || '测试用户',
          businessId: this.currentDetailsId,
          handleType: this.handleLikeType,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: 1,
        })
        .then((res) => {
          if (res.code === 200) {
            if (type === 'LIKE') {
              if (this.questionDetials.isApplaudFlag === 1) {
                this.$xToast.show({ message: '点赞成功' })
              } else {
                this.$xToast.show({ message: '取消点赞' })
              }
            }
            if (type === 'COLLECT') {
              if (this.questionDetials.isCollectFlag === 1) {
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
        this.orderBy = 'totalBrowseCount=desc'
      } else {
        this.orderBy = 'updateTime=desc'
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
      if (this.$refs.title.getBoundingClientRect().top < 0) {
        this.title = this.questionDetials.title
      } else {
        this.title = ''
      }
    },
    goBack() {
      this.$back()
    },
  },
}
</script>

<style lang="less" scoped>
.form-onlyRead {
  pointer-events: none;
  color: #ccc !important;
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
    font-weight: 500;
    color: #222222;
    bottom: 0;
    border-top: 1px solid #f0f0f0;
  }
}

.detail {
  min-height: 100vh;
  background: #f5f5f5;
  /deep/.my-head {
    padding: 0 32px;
    box-sizing: border-box;
    .title {
      > span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        width: 500px;
        margin: 0 auto;
      }
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
      font-weight: 600;
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
          font-weight: 500;
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
          font-weight: 500;
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
        width: 156px;
        height: 56px;
        background: #f5f5f5;
        border-radius: 28px;
        font-size: 24px;
        font-weight: 500;
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
      border-top: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      > .box {
        padding-top: 23px;
        box-sizing: border-box;
        width: 250px;
        height: 118px;
        font-size: 26px;
        font-weight: 500;
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
  > .success {
    margin-top: 21px;
    background: #fff;
    padding: 32px 0 40px 0;
    border: 1px solid #dddddd;
    > div {
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      color: #222222;
      /deep/ i {
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
          font-weight: 600;
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
        font-weight: 500;
        color: #4974f5;
        text-align: center;
        line-height: 72px;
      }
    }
    > .listbox {
      margin: 0 32px;
      border-top: 1px solid #dddddd;
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
          font-weight: 500;
          color: #222222;
        }
        > div {
          width: 144px;
          height: 72px;
          background: #4974f5;
          border-radius: 8px;
          font-size: 26px;
          font-weight: 500;
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
      border-bottom: 1px solid #dddddd;
      display: flex;
      align-items: center;
      background: #fff;
      > p {
        font-size: 30px;
        font-weight: 500;
        color: #222222;
      }
      > div {
        width: 216px;
        height: 60px;
        background: #f5f5f5;
        border-radius: 31px;
        position: relative;
        display: flex;
        margin-left: auto;
        align-items: center;
        > span {
          width: 104px;
          height: 52px;
          display: block;
          font-size: 26px;
          font-weight: 500;
          color: #999999;
          text-align: center;
          line-height: 52px;
          position: relative;
          z-index: 1;
        }
        > .act {
          color: #222222;
        }
        > .bg {
          width: 104px;
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
          font-weight: 600;
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
  > .fiexdbtn {
    position: fixed;
    height: 104px;
    background: #ffffff;
    width: 100vw;
    bottom: -1px;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 2;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
    > .btn {
      width: 216px;
      height: 72px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #dddddd;
      font-size: 28px;
      font-weight: 500;
      color: #222222;
      text-align: center;
      line-height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
