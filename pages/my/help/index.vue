<template>
  <div class="help-page">
    <!-- S 头部 -->
    <Header ref="headerRef" title="帮助中心">
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
    <div class="help-bn">
      <img :src="adData.materialUrl" alt="" />
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
        />
      </div>
      <!-- E 搜索 -->
      <div class="tab-content">
        <!-- S tab -->
        <sp-sticky
          :class="{ isBorder: isFixed }"
          :offset-top="headHeight - 0.5"
          @scroll="searchHandle"
        >
          <sp-work-tabs
            v-model="active"
            :ellipsis="false"
            :scrollspy="false"
            @click="tabsClickHandle"
          >
            <sp-work-tab
              v-for="(item, index) in tabData"
              :key="index"
              :title="item.name"
              :name="index"
            ></sp-work-tab>
          </sp-work-tabs>
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
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-icon icon="phone-o" text="致电" @click="handleTel" />
      <sp-bottombar-button type="primary" text="在线客服" />
    </sp-bottombar>
    <!-- E footer -->
    <div class="empty-box"></div>
  </div>
</template>

<script>
import {
  Search,
  WorkTab,
  WorkTabs,
  Bottombar,
  BottombarButton,
  BottombarIcon,
  TopNavBar,
  Sticky,
} from '@chipspc/vant-dgg'
import { mapState, mapMutations } from 'vuex'
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '@/config/constant'
import { helpApi } from '@/api'
import LoadingDown from '@/components/common/loading/LoadingDown'
import Header from '@/components/common/head/header'

export default {
  layout: 'keepAlive',
  name: 'Help',
  components: {
    LoadingDown,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
    [TopNavBar.name]: TopNavBar,
    Header,
  },
  async asyncData({ $axios }) {
    const params = {
      findType: 0, // 查询类型 （0：初始化查询广告+分类+文章 1：查询文章）
      locationCode: 'ad100006', // 广告位code
      code: 'con100873', // 获取分类列表选项的code
      limit: 15,
      page: 1,
      categoryCode: '', // 分类code赛选文章
      terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
      platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
      includeField:
        'id,title,linkType,wapRoute,link,jumpImageUrl,iosRoute,androidRoute', // 必须要输出的内容字段
    }
    let tabData = []
    let adData = {}
    try {
      const res = await $axios.post(helpApi.findArticle, params)
      if (res.code === 200) {
        res.data.categoryList.forEach((item, imdex) => {
          item.limit = params.limit
          item.page = params.page
          item.noMore =
            imdex === 0 && res.data.articleData.length < params.limit
          item.articleData = []
        })
        tabData = res.data.categoryList
        tabData[0].articleData = res.data.articleData
        adData = res.data.adListData[0].materialList[0]
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
    }),
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'Help' })
    if (!this.isInApp) {
      this.headHeight = this.$refs.headerRef.$el.clientHeight // 获取头部高度
    } else {
      // 设置app导航名称
      this.$appFn.dggSetTitle(
        {
          title: '帮助中心',
        },
        (res) => {}
      )
    }
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    // tab切换
    tabsClickHandle(index) {
      if (!this.tabData[index].articleData.length) {
        this.getProblemList(index, 1)
      }
    },
    // 监听滚动吸顶与触底加载更多
    searchHandle({ scrollTop, isFixed }) {
      this.headHeight = this.$refs.headerRef.$el.clientHeight // 获取头部高度
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
        // this.$appFn.dggJumpRoute({
        //   iOSRouter:
        //     '{"path":"CPSCustomer:CPSCustomer/CPSVerificationViewController///push/animation","parameter":{"":""},"isLogin":"1","version":"1.0.0"}',
        //   androidRouter:
        //     '{"path":"/account_security/bind_newPhone","parameter":{"":""},"isLogin":"1","version":"1.0.0"}',
        // })
        // 修改手机号
        this.$appFn.dggChangePhone((res) => {
          console.log('phone', res)
        })
      } else if (val === 0) {
        // const iosSetPassword =
        //   '{"path":"CPSCustomer:CPSCustomer/CPSSettingOrChangePwdViewController///push/animation","parameter":{"":""},"isLogin":"1","version":"1.0.0"}'
        // const androisSetPassword =
        //   '{"path":"/login/set_password","parameter":{"":""},"isLogin":"1","version":"1.0.0"}'
        // const iosUpdatePassword =
        //   '{"path":"CPSCustomer:CPSCustomer/CPSSettingOrChangePwdViewController///push/animation","parameter":{"":""},"isLogin":"1","version":"1.0.0"}'
        // const androisUpdatePassword =
        //   '{"path":"/account_security/change_password","parameter":{"":""},"isLogin":"1","version":"1.0.0"}'
        // this.$appFn.dggJumpRoute({
        //   iOSRouter: this.isPassword ? iosUpdatePassword : iosSetPassword,
        //   androidRouter: this.isPassword
        //     ? androisUpdatePassword
        //     : androisSetPassword,
        // })
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
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      this.$router.back()
    },
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
    img {
      width: 100%;
      height: 100%;
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
      > strong {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-right: 24px;
      }
    }
    /deep/ .sp-search {
      flex: 1;
      padding: 0;
    }
    /deep/ .sp-icon {
      color: #999999;
    }
    /deep/ .sp-search .sp-cell {
      padding: 8px 16px 8px 0;
    }
    /deep/ .sp-field__control {
      &::placeholder {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #cccccc;
      }
    }
  }
  .tab-content {
    /deep/ .sp-work-tabs__nav {
      padding-left: 8px;
    }
    .isBorder {
      /deep/ .sp-work-tabs__wrap {
        border-bottom: none;
      }
    }
    /deep/ .sp-work-tabs__wrap {
      height: 100px;
      padding-right: 8px;
      border-bottom: 1px solid #f4f4f4;
    }
    /deep/ .sp-work-tab {
      padding: 0 32px;
      padding-top: 29px;
      display: inline !important;
      flex: none !important;
      .sp-work-tab__text {
        font-size: 32px;
        line-height: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
    }
    /deep/ .sp-work-tabs__nav .sp-work-tab {
      &:last-child {
        padding-right: 40px !important;
      }
    }
    /deep/ .sp-work-tabs__line {
      width: 32px;
      height: 6px;
      background: #4974f5;
      border-radius: 3px;
      bottom: 14px;
    }
    /deep/ .sp-work-tab--active .sp-work-tab__text {
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
  /deep/ .sp-bottombar {
    z-index: 3;
    padding: 32px 40px;
  }
  /deep/ .sp-icon-phone-o {
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
}
</style>
