<template>
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
          :is-follow="false"
          :is-show-follow="false"
        />
      </div>
    </HeaderSlot>
    <DownLoadArea
      v-if="isShare"
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
          :src="articleDetails.avatar || $ossImgSetV2('9zzzas17j8k0000.png')"
          @click.stop="goUser(articleDetails.userId, articleDetails.userType)"
        />
        <div class="infos">{{ articleDetails.userName }}</div>
        <!-- && planerInfo.mchUserId -->
        <template
          v-if="
            articleDetails.createrId !== userInfo.userId &&
            articleDetails.userType == 2
          "
        >
          <div class="btn">
            <sp-button
              size="small"
              type="primary"
              @click="sendTextMessage(planerInfo.mchUserId)"
              >在线问</sp-button
            >
            <sp-button
              size="small"
              type="info"
              @click="handleTel(planerInfo.mchUserId)"
              >打电话</sp-button
            >
          </div>
        </template>
      </div>
      <div class="content" v-html="articleDetails.content"></div>
      <p class="pub-time">编辑于 {{ articleDetails.createTime }}</p>

      <!-- 推荐文章 -->
      <DetailArticleList :article-list="articleDetails.relatedArticles" />

      <div
        v-if="
          articleDetails &&
          articleDetails.goodsList &&
          articleDetails.goodsList.length > 0
        "
        class="recommend"
      >
        <div class="recommend-title">推荐商品</div>
        <div v-for="goods of articleDetails.goodsList" :key="goods.id">
          <ShareGoods
            :info="goods"
            :type="
              goods.productType === 'PRO_CLASS_TYPE_SALES'
                ? 'Service'
                : 'Trading'
            "
          ></ShareGoods>
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
    <ShareModal />
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
  Bottombar,
} from '@chipspc/vant-dgg'
import { knownApi } from '@/api'
import PageHead from '@/components/common/head/header'
import PageHead2 from '@/components/mustKnown/DetailHeaderUser.vue'
// 推荐文章列表
import DetailArticleList from '@/components/mustKnown/DetailArticleList.vue'
// 推荐商品组件
import ShareGoods from '@/components/mustKnown/share/ShareGoods.vue'

import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import DownLoadArea from '@/components/common/downLoadArea.vue'
import ShareModal from '@/components/common/ShareModal.vue'
// import SpBottom from '@/components/common/spBottom/SpBottom'
import { callPhone } from '@/utils/common'

import { planner, userinfoApi } from '~/api'
import imHandle from '~/mixins/imHandle'

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

    HeaderSlot,
    // PageHead,
    PageHead2,
    DetailArticleList,
    DownLoadArea,
    // Header,
    ShareModal,
    ShareGoods,
  },
  mixins: [imHandle],
  async asyncData({ $axios, query, store }) {
    let articleDetails = {}
    try {
      const res = await $axios.get(knownApi.questionArticle.articleDetail, {
        params: {
          shareId: query.shareId,
        },
      })
      if (res.code === 200) {
        articleDetails = res.data
      }
    } catch (error) {}

    return {
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

      releaseFlag: false, // 是否发布的新文章
      shareId: '', // 分享id

      planerInfo: {},
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    city() {
      return this.$store.state.city.currentCity
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
  created() {},

  mounted() {
    if (this.$route.query.status === 'release') {
      this.releaseFlag = true
    }
    this.isShare = this.$route.query.isShare
    this.shareId = this.$route.query.shareId
    if (this.shareId) {
      this.androdLink = `cpsccustomer://{"path":"/main/android/main","parameter":{"selectedIndex":1,"isLogin":"0","secondLink":"/known/detail/article","id":${articleDetails.id}}}`
    }
    if (this.articleDetails.userId) {
      this.getPlanerInfo(this.articleDetails.userId)
    }

    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getPlanerInfo(id) {
      // const res = await this.$axios.get(userinfoApi.info, {
      //   params: { id },
      // })
      // console.log('res', res)
      // if (res.code === 200) {
      // }

      planner.detail({ id }).then((res) => {
        const obj = {
          mchUserId: res.id,
          portrait: res.img,
          userName: res.name,
          postName: res.zwName,
          type: res.mchClass,
        }

        this.planerInfo = {
          ...obj,
          ...res,
        }
        console.log('planerInfo', this.planerInfo)
      })
    },
    goUser(id, usertype) {
      this.$router.push({
        path: '/known/home',
        query: { homeUserId: id, type: usertype },
      })
    },

    comment() {
      this.$refs.openComment.commentShow = true
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
    // 拨打电话
    async handleTel(mchUserId) {
      console.log('mchUserId', mchUserId)
      try {
        if (this.isInApp) {
          this.$appFn.dggBindHiddenPhone({ plannerId: mchUserId }, (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '拨号失败！',
                duration: 1000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
            }
          })
          return
        }

        // if (this.planerInfo.phone) {
        //   window.location.href = `tel://${this.planerInfo.phone}`
        //   return
        // } else {
        //   Toast({
        //     message: '无法拨打电话',
        //     iconPrefix: 'sp-iconfont',
        //     icon: 'popup_ic_fail',
        //   })
        //   return
        // }

        // if (this.$store.state.user.userId) {
        const params = {
          areaCode: this.city.code,
          areaName: this.city.name,
          customerUserId: this.$store.state.user.userId,
          plannerId: mchUserId,
          customerPhone: this.planerInfo.phone,
          requireCode: '',
          requireName: '',
        }

        try {
          const telData = await planner.newtel(params)
          // 解密电话
          if (telData.status === 1) {
            const tel = telData.phone
            window.location.href = `tel://${tel}`
          } else if (telData.status === 0) {
            Toast({
              message: '当前人员已禁用，无法拨打电话',
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_fail',
            })
          } else if (telData.status === 3) {
            Toast({
              message: '当前人员已离职，无法拨打电话',
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_fail',
            })
          }
        } catch (error) {
          Toast({
            message: error.message || '无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
          console.error('getTel:', error)
          return Promise.reject(error)
        }
        // } else {
        //   Toast({
        //     message: '未登录',
        //     iconPrefix: 'sp-iconfont',
        //     icon: 'popup_ic_fail',
        //   })
        // }
      } catch (err) {
        console.log(err)
        Toast({
          message: '未获取到划师联系方式',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
    },
    // // 调起IM
    // // 发送模板消息(带图片)
    // sendTemplateMsgWithImg(mchUserId, type) {
    //   // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
    //   // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
    //   // const intentionType = {}
    //   // intentionType[
    //   //   this.baseData.parentClassCode &&
    //   //     this.baseData.parentClassCode.split(',')[0]
    //   // ] = this.baseData.className
    //   // // 意向城市
    //   // const intentionCity = {}
    //   // intentionCity[this.city.code] = this.city.name
    //   console.log(mchUserId, type)
    //   const sessionParams = {
    //     imUserId: mchUserId, // 商户用户ID
    //     imUserType: type, // 用户类型
    //     requireCode: '',
    //     requireName: '',
    //     ext: {
    //       intentionType: '', // 意向业务 非必传
    //       intentionCity: '', // 意向城市 非必传
    //       recommendId: '',
    //       recommendAttrJson: {},
    //       startUserType: 'cps-app', //
    //     },
    //   }
    //   const msgParams = {
    //     sendType: 1, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
    //     msgType: 'text', // 消息类型
    //     content: JSON.stringify({
    //       text: this.articleDetails.title,
    //     }),
    //     extContent: this.$route.query, // 路由参数
    //     productName: this.articleDetails.title, // 产品名称
    //     productContent: this.articleDetails.content, // 产品信息
    //     price: 0, // 价格
    //     forwardAbstract: this.articleDetails.content, // 摘要信息，可与显示内容保持一致
    //     // routerId: this.articleDetails.routerId, // 路由ID
    //     // imageUrl: this.articleDetails.imageUrl[0], // 产品图片
    //     // unit: this.articleDetails.unit, // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
    //   }
    //   this.sendTemplateMsgMixin({ sessionParams, msgParams })
    //   // this.sendTemplateMsgMixin({ sessionParams })
    // },
  },
}
</script>

<style lang="less" scoped>
.article {
  background: #fff;
}
// 推荐标题
.recommend-title {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #222222;
  line-height: 32px;
  padding: 40px 0;
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

      ::v-deep.sp-button--info {
        margin-left: 12px;
        background-color: #24ae68;
        border: 1px solid #24ae68;
      }

      // .sp-button {
      //   width: 100%;
      //   height: 100%;
      //   background: #f5f5f5;
      //   border-radius: 12px;
      //   color: rgba(73, 116, 245, 1);
      //   display: block;
      //   font-weight: bold;
      //   float: left;
      //   display: flex;
      // }
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
