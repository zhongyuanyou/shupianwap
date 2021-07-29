<template>
  <section>
    <ShareModal
      v-show="
        answerDetails.title &&
        answerDetails.flag == 1 &&
        answerDetails.status == 1 &&
        answerDetails.materialStatus == 1
      "
      :mch-id="shareValue.businessId"
      :source-id="shareValue.commonId || answerDetails.id || ''"
      @setPlannerInfo="setPlannerInfo"
    />
    <HeaderSlot>
      <div class="flex">
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
            v-if="answerDetails.createrId === userInfo.userId"
            name="ellipsis"
            size="0.4rem"
            color="#1a1a1a"
            class="ellipsis"
            @click="popupShow = true"
          />
        </div>
      </div>
      <!-- <div v-if="showHead" class="flex">
        <PageHead2
          :header-data="answerDetails"
          :is-follow="false"
          :is-show-follow="false"
        />
      </div> -->
    </HeaderSlot>
    <DownLoadArea
      v-if="isShare"
      :ios-link="iosLink"
      :androd-link="androdLink"
    />
    <div
      class="page-list"
      style="background: #f5f5f5"
      v-show="
        quesDetail.title &&
        answerDetails.flag == 1 &&
        answerDetails.status == 1 &&
        answerDetails.materialStatus === 1
      "
    >
      <div class="area area1">
        <div class="title-area">
          <div class="title">{{ quesDetail.title }}</div>
          <div class="nums_area">
            <p v-if="quesDetail.answerCount">
              {{ quesDetail.totalBrowseCount || 0 }}浏览 ·
              {{ quesDetail.answerCount || 0 }}个回答 ·
              {{ quesDetail.collectCount || 0 }}收藏
            </p>
          </div>
        </div>
        <!-- <div class="html_content" v-html="answerDetails.content"></div> -->

        <!-- 推荐文章 -->
        <!-- <DetailArticleList :article-list="answerDetails.relatedArticles" /> -->
      </div>
      <div class="area area2">
        <div class="userinfos">
          <div class="user_head">
            <img
              :src="
                answerDetails.avatar ||
                'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png'
              "
              alt=""
              srcset=""
            />
          </div>
          <div class="user_name">{{ answerDetails.userName }}</div>
        </div>
        <div class="html_content" v-html="answerDetails.content"></div>
        <p class="pub-time">编辑于 {{ answerDetails.createTime }}</p>
        <div class="nums_area">
          {{ answerDetails.applaudCount || 0 }}赞同 ·
          {{ answerDetails.collectCount || 0 }}个收藏 ·
          {{ answerDetails.remarkCount || 0 }}评论
        </div>
      </div>
      <div v-if="quesList.length > 0" class="area area3 list3">
        <div class="recommend">
          <div class="recommend-title">相关问题</div>
          <div
            v-for="(item, index) in quesList"
            :key="index"
            class="item"
            :class="'item' + index"
            @click="toDetail(item.id)"
          >
            <p class="ques-title">
              {{ item.title }}
            </p>
            <p>
              <span> {{ item.applaudCount }} 赞同 </span>·
              <span> {{ item.remarkCount }} 评论 </span>·
              <span>{{ item.createTime }}</span>
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="
          answerDetails &&
          answerDetails.goodsList &&
          answerDetails.goodsList.length > 0
        "
        class="area area3"
      >
        <div class="recommend">
          <div class="recommend-title">推荐商品</div>
          <div v-for="goods of answerDetails.goodsList" :key="goods.id">
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
            <li @click="editQues(answerDetails.id)">
              <my-icon name="bianji1" size="1rem" color="#555"></my-icon>
              <p>编辑</p>
            </li>
            <li @click="deleteQues(answerDetails.id)">
              <my-icon name="shanchu1" size="1rem" color="#555"></my-icon>
              <p>删除</p>
            </li>
          </ul>
          <div class="cancel" @click="popupShow = false">取消</div>
        </div>
      </sp-popup>
    </div>
    <div
      v-if="
        (answerDetails.flag !== 1 ||
          answerDetails.status !== 1 ||
          answerDetails.materialStatus !== 1) &&
        isLoaded
      "
      class="no-data"
    >
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
        alt=""
        srcset=""
      />
      <p>内容失效</p>
    </div>
    <div v-show="isLoaded" class="bottom-btn">
      <planner-bottom
        :planner-id="topPlannerInfo.id || shareValue.businessId || plannerId"
        ref="myPlanner"
      ></planner-bottom>
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
} from '@chipspc/vant-dgg'
import { knownApi } from '@/api'
import PageHead from '@/components/common/head/header'
// import PageHead2 from '@/components/mustKnown/DetailHeaderUser.vue'
// 推荐文章列表
// import DetailArticleList from '@/components/mustKnown/DetailArticleList.vue'
// 推荐商品组件
import ShareGoods from '@/components/mustKnown/share/ShareGoods.vue'

import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import DownLoadArea from '@/components/common/downLoadArea.vue'
import ShareModal from '@/components/common/ShareModal.vue'
// import SpBottom from '@/components/common/spBottom/SpBottom'
import { callPhone } from '@/utils/common'

import { planner, userinfoApi } from '~/api'
import imHandle from '~/mixins/imHandle'
import PlannerBottom from '@/components/mustKnown/share/PlannerBottom.vue'
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
    PlannerBottom,
    HeaderSlot,
    // PageHead,
    // PageHead2,
    // DetailArticleList,
    DownLoadArea,
    // Header,
    ShareModal,
    ShareGoods,
  },
  mixins: [imHandle],

  data() {
    return {
      plannerId: '',
      isLoaded: false,
      isShare: false,
      popupShow: false,
      articleList: [],
      showHead: false,
      // answerDetails: '',
      currentDetailsId: '',
      handleType: '',

      releaseFlag: false, // 是否发布的新文章
      shareId: '', // 分享id
      planerInfo: {},
      topPlannerInfo: {},
      prefixPath: 'cpsccustomer://',
      iosPath: {
        path: 'CPSCustomer:CPSCustomer/CPSCSharePlaceholderViewController///push/animation',
        parameter: {
          selectedIndex: 0,
          type: '2',
          cid: '',
        },
      },
      iosPathFinally: '',
      androdPath: {
        path: '/main/android/main',
        parameter: {
          selectedIndex: 1,
          isLogin: '0',
          secondLink: '/known/detail/article',
          id: '',
        },
      },
      androdFinally: '',
      iosLink: 'cpsccustomer://',
      androdLink: 'cpsccustomer://',
      answerDetails: {},
      quesDetail: {},
      shareValue: {},
      quesList: [],
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
    this.plannerId = this.$route.query.plannerId
    window.addEventListener('scroll', this.handleScroll)
    if (this.$route.query.redisKey) {
      this.getShareId(this.$route.query.redisKey)
    } else {
      this.getDetail()
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        path: '/known/detail/answer',
        query: {
          id,
        },
      })
    },
    getShareId(cacheKey) {
      this.$axios
        .get(planner.getShareId, {
          params: { cacheKey },
        })
        .then((res) => {
          if (res.code === 200) {
            const cacheValue = JSON.parse(res.data.cacheValue)
            this.shareValue = cacheValue
            this.shareId = cacheValue.shareId
            this.plannerId = this.shareValue.businessId
            console.log('shareValue', this.shareValue)
            this.getDetail(this.shareId)
            this.$refs.myPlanner.getPlannerInfoApi(this.shareValue.businessId)
          } else {
            this.isLoaded = true
          }
        })
        .catch(() => {
          this.isLoaded = true
        })
    },
    getQuesDetail(id) {
      this.$axios
        .get(knownApi.questionArticle.detail, {
          params: {
            id,
            platForm: 'chips-wap',
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.quesDetail = res.data
            console.log('问题详情', this.quesDetail)
          }
          this.isLoaded = true
        })
    },
    setPlannerInfo(data) {
      console.log('设置规划师', data)
      if (data.mchUserId && data.name) {
        this.topPlannerInfo = data
      }
    },
    getDetail(shareId) {
      this.$axios
        .get(knownApi.questionArticle.anserShareDetail, {
          params: {
            shareId: this.$route.query.shareId || shareId,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            if (res.data.goodsList) {
              const goods = res.data.goodsList.filter((item) => {
                return item.status === 'PRO_STATUS_PUT_AWAY'
              })
              res.data.goodsList = goods
            }
            this.answerDetails = res.data
            if (res.data.relatedQuestion) {
              this.getQuesList(res.data.relatedQuestion)
            }
            this.iosPath.parameter.cid = this.answerDetails.id
            this.iosLink = this.prefixPath + JSON.stringify(this.iosPath)
            this.androdPath.parameter.id = this.answerDetails.id
            this.androdLink = this.prefixPath + JSON.stringify(this.androdPath)
            this.getQuesDetail(this.answerDetails.sourceId)
            // if (this.shareId) {
            //   this.iosLink = `cpsccustomer://{"path":"CPSCustomer:CPSCustomer/CPSCSharePlaceholderViewController///push/animation","parameter":{"selectedIndex":0,"type":2,"cid":${this.answerDetails.id}}}`
            //   this.androdLink = `cpsccustomer://{"path":"/main/android/main","parameter":{"selectedIndex":1,"isLogin":"0","secondLink":"/known/detail/article","id":${this.answerDetails.id}}}`
            // }
          } else {
            this.isLoaded = true
          }
        })
        .catch((err) => {
          this.isLoaded = true
          console.error(err)
          this.isLoaded = true
        })
    },
    getQuesList(ids) {
      ids = ids.split(',')
      this.$axios
        .post(knownApi.questionArticle.webList, {
          ids,
        })
        .then((res) => {
          if (res.code === 200) {
            console.log('相关问题', res.data.rows)
            this.quesList = res.data.rows || []
          }
        })
    },
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
            this.answerDetails = res.data
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
          businessId: this.id,
          handleType: this.handleType,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: 2,
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
                this.$xToast.show({ message: '已反对' })
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
          customerPhone: this.topPlannerInfo.phone || this.planerInfo.phone,
          requireCode: '',
          requireName: '',
        }

        try {
          const telData = await planner.newtel(params)
          // 解密电话
          if (telData.status === 1) {
            const tel = telData.phone
            window.location.href = `tel:${tel}`
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
    //       text: this.answerDetails.title,
    //     }),
    //     extContent: this.$route.query, // 路由参数
    //     productName: this.answerDetails.title, // 产品名称
    //     productContent: this.answerDetails.content, // 产品信息
    //     price: 0, // 价格
    //     forwardAbstract: this.answerDetails.content, // 摘要信息，可与显示内容保持一致
    //     // routerId: this.answerDetails.routerId, // 路由ID
    //     // imageUrl: this.answerDetails.imageUrl[0], // 产品图片
    //     // unit: this.answerDetails.unit, // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
    //   }
    //   this.sendTemplateMsgMixin({ sessionParams, msgParams })
    //   // this.sendTemplateMsgMixin({ sessionParams })
    // },
  },
}
</script>

<style lang="less" scoped>
.page-list {
  padding-bottom: 140px;
  min-height: calc(100vh - 250px);
}
.area1 {
  margin-bottom: 40px;
}
.area2 {
  margin-bottom: 40px;
  .userinfos {
    overflow: hidden;
  }
  .user_head {
    width: 72px;
    height: 72px;
    background: #d8d8d8;
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user_name {
    font-size: 30px;
    color: #222222;
    line-height: 30px;
    float: left;
    line-height: 72px;
  }
}
.article {
  background: #f5f5f5;
}
.list3 {
  margin-bottom: 20px;
  font-size: 24px;
  .item {
    padding: 24px 0;
    border-top: 1px solid #f0f0f0;
    .ques-title {
      font-size: 28px;
      margin-bottom: 8px;
      color: #222;
      font-weight: 600;
    }
  }
  .item0 {
    border: none !important;
  }
  p {
    margin-top: 10px;
    color: #666;
  }
}
// 推荐标题
.recommend-title {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #222222;
  line-height: 32px;
  padding: 30px 0;
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
  .title {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 56px;
    font-weight: bold;
  }
}
.nums_area {
  font-size: 26px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #999999;
  margin: 20px 0;
  font-weight: bold;
}
.area {
  background: white;
  padding: 40px;
  .html_content {
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
    > .btn-area {
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
.no-data {
  text-align: center;
  font-size: 24px;
  color: #666;
  img {
    width: 400px;
    height: 400px;
    margin: 0 auto;
  }
}
.bottom-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 144px;
  width: 100%;
  padding: 10px 40px 0 40px;
  background: white;
  .user-info {
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    .img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #222222;
      line-height: 30px;
      padding-left: 16px;
      .name {
        font-size: 32px;
        color: #222222;
        font-weight: bold;
        margin-bottom: 20px;
      }
      span {
        font-size: 24px;
        background: #ffefc5;
        border: 2px solid #dac79a;
        border-radius: 4px;
        font-size: 22px;
        color: #7b6225;
        letter-spacing: 0;
        text-align: center;
        line-height: 0;
        padding: 8px 10px;
      }
    }
    .bottom_btn_area {
      float: right;
      height: 72px;
      font-size: 32px;
      color: #ffffff;
      ::v-deep.sp-button--info {
        margin-left: 12px;
        background-color: #24ae68;
        border: 1px solid #24ae68;
      }
      .sp-button {
        height: 96px;
        border-radius: 8px;
        font-size: 32px;
        color: #ffffff;
      }
      .btn1 {
        margin-right: 20px;
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
}
</style>
