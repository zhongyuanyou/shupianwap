<template>
  <div>
    <div ref="myPage">
      <PageHead v-if="!showHead2" :title="articleDetails.title"></PageHead>
      <PageHead2
        v-if="showHead2"
        :header-data="headerData"
        :is-follow="isFollow"
        :is-show-follow="articleDetails.createrId !== userInfo.userId"
        @follow="follow"
      />
    </div>
    <div class="title-area">
      <div class="title">{{ articleDetails.title }}</div>
    </div>
    <div class="main">
      <div class="user-info">
        <sp-image class="img" :src="articleDetails.avatar" />
        <div class="infos">
          <p>{{ articleDetails.createrName }}</p>
          {{ articleDetails.contentText }}
        </div>
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
          <my-icon name="zantong" size="0.28rem" color="#fff"></my-icon
        ></span>
        <span class="text">已赞同</span>
      </div>
      <div
        v-if="articleDetails.isDisapplaudFlag === 1"
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
    </div>
  </div>
</template>

<script>
import { Field, Tab, Tabs, Button, Image, Toast } from '@chipspc/vant-dgg'
import { knownApi } from '@/api'
import PageHead from '@/components/common/head/header'
import PageHead2 from '@/components/mustKnown/DetailHeaderUser'
// 推荐文章列表
import DetailArticleList from '@/components/mustKnown/DetailArticleList'
// 默认评论列表
import Comment from '~/components/mustKnown/DetailComment'
export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Field.name]: Field,
    Comment,
    PageHead,
    PageHead2,
    DetailArticleList,
  },
  data() {
    return {
      articleList: '',
      headerData: {},
      showHead2: false,
      articleDetails: '',
      currentDetailsId: '',
      handleType: '',
      isFollow: false,
    }
  },
  asyncData(context) {
    return Promise.all([
      context.$axios.get(
        'http://172.16.132.255:7001/service/nk/question_article/v2/find_detail.do',
        {
          params: { id: '8065065421625749504', userHandleFlag: 1 },
        }
      ),
    ])
      .then((res) => {
        if (res[0] && res[0].code === 200) {
          return {
            articleDetails: res[0].data,
            headerData: {
              createrName: res[0].createrName,
              contentText: res[0].contentText,
              avatar: res[0].avatar,
            },
          }
        }
      })
      .catch((error) => {
        console.log(error)
        Promise.reject(error)
      })
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
    this.getRecommendData()
    this.initFollow()
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
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
          attentionUserId: this.articleDetails.userId,
          attentionUserName: this.articleDetails.userName,
          attentionUserType: this.articleDetails.userType,
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
            id: this.currentDetailsId,
            userHandleFlag: 1,
          },
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.articleDetails = res.data
            this.headerData.createrName = this.articleDetails.createrName
            this.headerData.contentText = this.articleDetails.contentText
            this.headerData.avatar = this.articleDetails.avatar
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
      console.log('scrollTop', scrollTop)
      if (scrollTop < 0) {
        this.showHead2 = true
      } else {
        this.showHead2 = false
      }
    },
    onLeftClick() {
      this.$router.back(-1)
    },
    handleClickBottom(type) {
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
          businessId: this.currentDetailsId,
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
  },
}
</script>

<style lang="less" scoped>
.fixed-head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 104px;
  z-index: 99;
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
.title-area {
  margin-top: 120px;
  padding: 20px 40px;
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
    }
  }
  .content {
    padding-top: 40px;
    font-size: 34px;
    color: #666;
    font-weight: 400;
    color: #555555;
    line-height: 52px;
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
