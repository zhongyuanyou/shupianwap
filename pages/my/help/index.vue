<template>
  <div class="help-page">
    <!-- S 头部 -->
    <Header v-if="!isApplets" ref="headerRef" title="帮助中心">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- E 头部 -->
    <!-- S 广告位 -->
    <div v-if="adData.length" class="help-bn">
      <sp-swipe
        class="my-swipe"
        :autoplay="autoplay"
        :show-indicators="indicators"
      >
        <sp-swipe-item v-for="(item, index) in adData" :key="index">
          <a href="javascript:void(0)" class="swiper-box">
            <img
              :src="item.materialList[0].materialUrl + $ossImgSet(750, 320)"
              alt=""
            />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!-- E 广告位 -->
    <div class="hele-centent">
      <!-- S 功能 -->
      <div v-if="isInApp" class="func-list">
        <div @click="handleClick(0)">
          <img :src="$ossImgSet(48, 48, '6vjgpndq5g00000.png')" alt="" />
          <span>{{ isPassword ? '修改登录密码' : '设置登录密码' }}</span>
        </div>
        <div @click="handleClick(1)">
          <img :src="$ossImgSet(48, 48, '9ez5xkd5qcc0000.png')" alt="" />
          <span>实名认证</span>
        </div>
        <div @click="handleClick(2)">
          <img :src="$ossImgSet(48, 48, 'df83pk71vgw0000.png')" alt="" />
          <span>修改手机号</span>
        </div>
        <div @click="handleClick(3)">
          <img :src="$ossImgSet(48, 48, 'b4r8f0ylxag0000.png')" alt="" />
          <span>我要吐槽</span>
        </div>
      </div>
      <!-- E 功能 -->
      <!-- S 搜索 -->
      <div class="search-content">
        <strong>更多服务</strong>
        <sp-search
          shape="round"
          :disabled="true"
          placeholder="搜索您遇到的问题"
          @click="$router.push('/my/help/helpCenter')"
        >
          <template #left-icon>
            <my-icon
              name="notify_ic_search"
              size="0.24rem"
              color="#999999"
            ></my-icon>
          </template>
        </sp-search>
      </div>
      <!-- E 搜索 -->
      <div v-if="tabData.length" class="tab-content">
        <!-- S tab -->
        <sp-sticky
          :class="{ isBorder: isFixed }"
          :offset-top="headHeight - 0.5"
          @scroll="searchHandle"
        >
          <sp-tabs
            v-model="active"
            :ellipsis="false"
            :scrollspy="false"
            @click="tabsClickHandle"
          >
            <sp-tab
              v-for="(item, index) in tabData"
              :key="index"
              :title="item.name"
              :name="index"
            ></sp-tab>
          </sp-tabs>
        </sp-sticky>
        <!-- E tab -->
        <!-- S 列表 -->
        <div v-if="tabData.length" class="problem-list">
          <ul>
            <li
              v-for="(item, index) in tabData[active].articleData"
              :key="index"
              @click="onServiceTouch(item)"
            >
              <span>{{ item.title }}</span>
              <my-icon
                name="order_ic_listnext"
                size="0.21rem"
                color="#CCCCCC"
              ></my-icon>
            </li>
          </ul>
          <Loading-down
            v-if="tabData.length"
            :loading="loading && !tabData[active].noMore"
            :no-data="tabData[active].noMore"
            bg-color="#fff"
          />
        </div>
        <!-- E 列表 -->
      </div>
    </div>
    <!-- S footer -->
    <!-- <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-icon icon="phone-o" text="致电" @click="handleTel" />
      <sp-bottombar-button type="primary" text="在线客服" @click="openDggKf" />
    </sp-bottombar> -->
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-icon
        type="primary"
        icon="comment-o"
        text="留言"
        class="left"
        @click="gourl()"
      />
      <sp-bottombar-button
        v-if="isInApp"
        type="info"
        text="在线客服"
        class="green"
        @click="handleIM"
      />
      <sp-bottombar-button type="primary" text="电话客服" @click="handleCall" />
    </sp-bottombar>
    <!-- E footer -->
    <div class="empty-box"></div>
  </div>
</template>

<script>
import {
  Search,
  Tab,
  Tabs,
  Bottombar,
  BottombarButton,
  BottombarIcon,
  TopNavBar,
  Sticky,
  Swipe,
  swipeItem,
} from '@chipspc/vant-dgg'
import { mapState, mapMutations } from 'vuex'
import {
  PLATFORM_CODE,
  TERMINAL_CODE,
  HELP_CLASS_CODE,
} from '@/config/constant'
import { helpApi } from '@/api'
import LoadingDown from '@/components/common/loading/LoadingDown'
import Header from '@/components/common/head/header'
import imHandle from '@/mixins/imHandle'
export default {
  layout: 'keepAlive',
  name: 'Help',
  components: {
    LoadingDown,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
    [TopNavBar.name]: TopNavBar,
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    Header,
  },
  mixins: [imHandle],
  async asyncData({ store, $axios }) {
    const params = {
      findType: 0, // 查询类型 （0：初始化查询广告+分类+文章 1：查询文章）
      locationCode: 'ad113195', // 广告位code
      code: store.state.app.isInApp
        ? store.state.app.appInfo.platformCode === 'COMDIC_PLATFORM_QIDABAO'
          ? HELP_CLASS_CODE.qdaCode
          : store.state.app.appInfo.platformCode === 'COMDIC_PLATFORM_CRISPS'
          ? HELP_CLASS_CODE.spAppCode
          : HELP_CLASS_CODE.qdsCode
        : HELP_CLASS_CODE.wapCode, // 获取分类列表选项的code
      limit: 15,
      page: 1,
      categoryCode: '', // 分类code赛选文章
      terminalCode: store.state.app.isInApp
        ? TERMINAL_CODE.app
        : TERMINAL_CODE.wap, // 查询资讯的终端code
      platformCode: store.state.app.isInApp
        ? store.state.app.appInfo.platformCode
        : PLATFORM_CODE.wap, // 查询资讯的平台code
      includeField:
        'id,title,linkType,wapRoute,link,jumpImageUrl,iosRoute,androidRoute', // 必须要输出的内容字段
    }
    let tabData = []
    let adData = []
    try {
      const res = await $axios.post(helpApi.findArticle, params)
      if (res.code === 200) {
        adData = res.data.adListData
        if (res.data.categoryList.length) {
          res.data.categoryList.forEach((item, imdex) => {
            item.limit = params.limit
            item.page = params.page
            item.noMore =
              imdex === 0 && res.data.articleData.length < params.limit
            item.articleData = []
          })
          tabData = res.data.categoryList
          tabData[0].articleData = res.data.articleData
        }
      }
    } catch (error) {}
    return {
      params,
      tabData,
      adData,
    }
  },
  data() {
    return {
      autoplay: 5000, // 切换间隔
      indicators: false, // 是否需要指示器
      loading: false,
      active: 0,
      isFixed: false,
      headHeight: 0,
      tabData: [],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      isPassword: (state) => state.user.userInfo.isPassword || 0,
      isApplets: (state) => state.app.isApplets,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
    if (!this.isInApp && !this.isApplets) {
      this.headHeight = this.$refs.headerRef.$el.clientHeight // 获取头部高度
    } else if (this.isInApp) {
      // 设置app导航名称
      this.$appFn.dggSetTitle(
        {
          title: '帮助中心',
        },
        (res) => {}
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    if (['my-complain'].includes(to.name)) {
      console.log(123456789)
      this.SET_KEEP_ALIVE({ type: 'add', name: 'Help' })
    } else {
      this.SET_KEEP_ALIVE({ type: 'remove', name: 'Help' })
    }
    next()
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    gourl() {
      this.$router.push({
        path: '/my/complain',
      })
    },
    handleIM() {
      // const isLogin = await this.judgeLoginMixin()
      // if (isLogin) {
      this.uPIM({
        entranceId: 'STAFF_HELP_CENTER_CODE',
      })
      // } else {
      //   Toast({
      //     message: '请先登录账号',
      //     iconPrefix: 'sp-iconfont',
      //     icon: 'popup_ic_fail',
      //   })
      // }
    },
    uPIM(data = {}) {
      // const { mchUserId, userName, type } = data
      // 如果当前页面在app中，则调用原生IM的方法
      if (this.isInApp) {
        try {
          // 需要判断登陆没有，没有登录就是调用登录
          // await this.getUserInfo()
          this.$appFn.dggOpenOnlineServiceIM(
            {
              entranceId: 'STAFF_HELP_CENTER_CODE',
            },
            (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `联系失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            }
          )
        } catch (error) {
          console.error('uPIM error:', error)
        }
      }
    },
    // app获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.userInfo.userId) {
          resolve(this.userInfo.userId)
          return
        }
        this.$appFn.dggGetUserInfo((res) => {
          const { code, data } = res || {}
          // 未登录需要登录
          if (code !== 200) {
            this.$appFn.dggLogin((loginRes) => {
              if (loginRes && loginRes.code === 200) {
                console.log('loginRes : ', loginRes)
                let loginResData = {}
                // 为了兼容 企大顺
                if (typeof loginRes.data === 'string') {
                  try {
                    loginResData = JSON.parse(loginRes.data)
                  } catch (error) {
                    console.error(error)
                  }
                } else {
                  loginResData = loginRes.data
                }
                if (loginResData && loginResData.userId && loginResData.token) {
                  this.setUserInfo(loginResData)
                  resolve(loginResData.userId)
                  return
                }
                reject(new Error('登录后userId或者token缺失'))
                return
              }
              reject(new Error('登录失败'))
            })
            return
          }
          let userInfo = {}
          if (typeof data === 'string') {
            try {
              userInfo = JSON.parse(data)
            } catch (error) {
              console.error(error)
            }
          } else {
            userInfo = data
          }
          if (userInfo && userInfo.userId && userInfo.token) {
            this.setUserInfo(userInfo)
            resolve(userInfo.userId)
            return
          }
          reject(new Error('用户信息中userId或者token缺失'))
        })
      })
    },
    handleCall() {
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggCallPhone(
          {
            phone: '028-954310',
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) this.$xToast.error('拨号失败！')
          }
        )
      } else {
        window.location.href = 'tel:028-954310'
      }
    },
    // tab切换
    tabsClickHandle(index) {
      if (!this.tabData[index].articleData.length) {
        this.getProblemList(index, 1)
      }
    },
    // 监听滚动吸顶与触底加载更多
    searchHandle({ scrollTop, isFixed }) {
      if (!this.isApplets) {
        this.headHeight = this.$refs?.headerRef?.$el?.clientHeight // 获取头部高度
      }
      this.isFixed = isFixed
      if (
        this.tabData.length &&
        this.tabData[this.active].articleData.length &&
        !this.loading &&
        !this.tabData[this.active].noMore
      ) {
        const pageScrollHeight = document.body.scrollHeight // 页面文档的总高度
        const pageClientHeight = window.innerHeight // 窗口文档显示区域的高度
        // 监听页面是否滚动到底部加载更多数据
        if (Math.ceil(scrollTop + pageClientHeight) >= pageScrollHeight) {
          this.loading = true
          this.tabData[this.active].page += 1
          this.getProblemList(this.active, 2)
        }
      }
    },
    // 获取问题列表
    getProblemList(index, type) {
      const params = {
        findType: 1,
        categoryCode: this.tabData[index].code,
        locationCode: null,
        limit: this.tabData[index].limit,
        page: this.tabData[index].page,
      }
      this.params = Object.assign(this.params, params)
      this.$axios.post(helpApi.findArticle, this.params).then((res) => {
        this.loading = false
        // 切换加载
        if (res.code === 200 && type === 1) {
          const obj = {
            ...this.tabData[index],
            articleData: res.data.articleData,
          }
          this.$set(this.tabData, index, obj)
        }
        // 触底加载更多
        if (res.code === 200 && type === 2) {
          this.tabData[index].articleData = this.tabData[
            index
          ].articleData.concat(res.data.articleData)
        }
        // 无更多数据
        if (res.data.articleData.length < this.tabData[index].limit) {
          this.tabData[index].noMore = true
        }
      })
    },
    onServiceTouch(data) {
      // linkType跳转链接类型 1、跳转文章详情,2、跳转内链,3、跳转外链,4、跳转图片链接
      switch (data.linkType) {
        // 跳转文章详情
        case 1:
          this.$router.push({
            path: '/my/help/questions',
            query: { id: data.id },
          })
          break
        // 跳转内链
        case 2:
          this.$router.push({
            path: `${data.wapRoute}`,
          })
          break
        // 跳转外链
        case 3:
          window.location.href = data.link
          break
        // 跳转图片链接
        case 4:
          this.$router.push({
            name: 'img',
            params: {
              url: data.jumpImageUrl,
            },
          })
          break
        default:
          this.$router.push({
            path: '/my/help/questions',
            query: { id: data.id },
          })
          break
      }
    },
    handleClick(val) {
      if (val === 3) {
        this.$router.push('/my/complain')
      } else if (val === 2) {
        // 修改手机号
        this.$appFn.dggChangePhone((res) => {
          console.log('phone', res)
        })
      } else if (val === 0) {
        this.$appFn.dggChangePwd((res) => {
          console.log('pwd', res)
        })
      } else if (val === 1) {
        this.$appFn.dggGetRealNameAuthAddress((res) => {
          if (res.code === 200) {
            this.$appFn.dggOpenNewWeb(
              {
                urlString: res.data.url,
              },
              (response) => {}
            )
          }
        })
      }
    },
    handleTel() {
      // 拨打电话
      if (this.isInApp) {
        // 如果当前页面在app中，则调用原生拨打电话的方法
        this.$appFn.dggCallPhone({ phone: '400-0962-540' }, (res) => {})
        return
      }
      window.location.href = 'tel:400-0962-540'
    },
    back() {
      if (this.isInApp) {
        // this.$appFn.dggWebGoBack((res) => {})
        this.$appFn.dggCloseWebView((res) => {
          if (!res || res.code !== 200) {
            this.$xToast.show({
              message: '返回失败',
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        return
      }
      this.$router.push('/my')
    },
    openDggKf() {
      // eslint-disable-next-line
      dggMi.showPanel({
        type: 'groupToken',
        value: '',
      })
    },
  },
  head() {
    return {
      title: '帮助中心',
      script: [
        {
          src: 'https://cdn.shupian.cn/sp-pt/wap/files/23ef8zvw9sww000.js', // 美洽客服临时文件
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.help-page {
  width: 100%;
  .back_icon {
    margin-left: 40px;
  }
  .help-bn {
    width: 100%;
    height: 320px;
    background: #4974f5;
    .swiper-box {
      display: block;
      width: 100%;
      height: 320px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .hele-centent {
    position: relative;
    z-index: 2;
    width: 100%;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    margin-top: -20px;
    padding-top: 52px;
    .func-list {
      display: flex;
      padding: 0 40px;
      margin-bottom: 63px;
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        > img {
          width: 48px;
          height: 48px;
        }
        > span {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
          margin-top: 24px;
        }
      }
    }
    .search-content {
      display: flex;
      align-items: center;
      padding: 0 40px;
      margin-bottom: 20px;
      ::v-deep .sp-field__control {
        transform: translateY(2px);
      }
      ::v-deep .sp-field__control:disabled {
        color: #cccccc !important;
        -webkit-text-fill-color: #cccccc !important;
      }
      > strong {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-right: 24px;
      }
    }
    ::v-deep .sp-search {
      flex: 1;
      padding: 0;
    }
    ::v-deep .sp-icon {
      color: #999999;
    }
    ::v-deep .sp-search .sp-cell {
      padding: 8px 16px 8px 0;
    }
    ::v-deep .sp-field__control {
      &::placeholder {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #cccccc;
      }
    }
  }
  .tab-content {
    ::v-deep .sp-tabs__nav {
      padding-left: 8px;
    }
    .isBorder {
      ::v-deep .sp-tabs__wrap {
        border-bottom: none;
      }
    }
    ::v-deep .sp-tabs__wrap {
      height: 100px;
      padding-right: 8px;
      border-bottom: 1px solid #f4f4f4;
    }
    ::v-deep .sp-tab {
      padding: 0 32px;
      padding-top: 29px;
      display: inline !important;
      flex: none !important;
      .sp-tab__text {
        font-size: 32px;
        line-height: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
    }
    ::v-deep .sp-tabs__nav .sp-tab {
      &:last-child {
        padding-right: 40px !important;
      }
    }
    ::v-deep .sp-tabs__line {
      width: 32px;
      height: 6px;
      background: #4974f5;
      border-radius: 3px;
      bottom: 44px;
    }
    ::v-deep .sp-tab--active .sp-tab__text {
      color: #4974f5;
    }
  }
  .problem-list {
    width: 100%;
    padding: 22px 40px;
    ul {
      display: flex;
      flex-direction: column;
      > li {
        height: 74px;
        display: flex;
        align-items: center;
        > span {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          flex: 1;
          margin-right: 20px;
          .textOverflow(1);
        }
      }
    }
  }
  ::v-deep .sp-bottombar {
    z-index: 3;
    padding: 32px 40px;
    > .green {
      background: #24ae68;
      border: 1px solid #24ae68;
    }
    > .left {
      .sp-icon {
        font-weight: bold;
        font-size: 40px;
      }
    }
  }
  ::v-deep .sp-icon-phone-o {
    color: #1a1a1a;
    font-weight: bold;
  }
  .empty-box {
    display: block;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 140px;
    }
  }
  ::v-deep .sp-button__text {
    font-size: 32px;
    font-weight: bold;
  }
}
</style>
