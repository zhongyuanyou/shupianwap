<template>
  <div class="wrapper">
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
    <form action="javascript:return true">
      <sp-search
        ref="searchRef"
        v-model="params.keyword"
        placeholder="搜索您遇到的问题"
        background="#f8f8f8"
        class="search"
        clearable
        reverse
        :maxlength="20"
        @search="searchFuc"
      >
        <template #left-icon>
          <my-icon
            name="notify_ic_search"
            size="0.24rem"
            color="#999999"
          ></my-icon>
        </template>
      </sp-search>
    </form>
    <sp-cell-group>
      <sp-cell
        v-for="(item, index) in searchResult"
        :key="index"
        center
        is-link
        class="cellClass"
        @click="onServiceTouch(item.id)"
      >
        <template #title>
          <span class="custom-title">{{ item.title }}</span>
        </template>
      </sp-cell>
    </sp-cell-group>
    <div v-if="noData" class="noFindDiv">
      <div>
        <img :src="$ossImgSet(340, 340, '9vnk3u2qlk80000.png')" alt="" />
      </div>
      <span class="firstSpan">抱歉，未找到相关问题</span>
      <b v-if="isInApp" class="im" @click="handleIM">联系客服</b>
      <!-- <span class="lastSpan">联系客服</span> -->
    </div>
    <Loading-center v-show="loading" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  Search,
  Cell,
  CellGroup,
  TopNavBar,
  Sticky,
  Bottombar,
  BottombarButton,
  BottombarIcon,
} from '@chipspc/vant-dgg'
import {
  PLATFORM_CODE,
  TERMINAL_CODE,
  HELP_CLASS_CODE,
} from '@/config/constant'
import { helpApi } from '@/api'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'HelpCenter',
  components: {
    LoadingCenter,
    [Search.name]: Search,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    Header,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
  },
  data() {
    return {
      loading: false,
      params: {
        keyword: '',
        findType: 1, // 查询类型 （0：初始化查询广告+分类+文章 1：查询文章）
        categoryCode: '',
        limit: 1000,
        page: 1,
        keywordField: 'title', // 需要检索的字段
        terminalCode: '', // 查询资讯的终端code
        platformCode: '', // 查询资讯的平台code
        includeField: 'id,title', // 必须要输出的内容字段
      },
      searchResult: [],
      noData: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      isPassword: (state) => state.user.userInfo.isPassword || 0,
    }),
  },
  watch: {
    $route(to, from) {
      // 返回帮助首页清空数据
      if (to.path === '/my/help') {
        this.params.keyword = ''
        this.noData = false
        this.searchResult = []
      }
      if (to.path === '/my/help/helpCenter' && this.params.keyword === '') {
        this.inputFocus() // 打开页面弹出软键盘
      }
    },
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'HelpCenter' })
    this.inputFocus() // 打开页面弹出软键盘
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
    handleIM() {
      this.uPIM({
        entranceId: 'STAFF_NOT_RESULT_HELP_CENTER_CODE',
      })
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
              entranceId: 'STAFF_NOT_RESULT_HELP_CENTER_CODE',
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
    inputFocus() {
      try {
        setTimeout(() => {
          this.$nextTick(() => {
            const inputEl = this.$refs.searchRef.getElementsByClassName(
              'sp-field__control'
            )[0]
            inputEl.focus()
          })
        }, 100)
      } catch (error) {}
    },
    onServiceTouch(id) {
      this.$router.push({
        path: '/my/help/questions',
        query: { id },
      })
    },
    // 搜索
    searchFuc() {
      if (!this.params.keyword) {
        this.searchResult = []
        return
      }
      this.params.categoryCode = this.$store.state.app.isInApp
        ? this.$store.state.app.appInfo.platformCode ===
          'COMDIC_PLATFORM_QIDABAO'
          ? HELP_CLASS_CODE.qdaCode
          : this.$store.state.app.appInfo.platformCode ===
            'COMDIC_PLATFORM_CRISPS'
          ? HELP_CLASS_CODE.spAppCode
          : HELP_CLASS_CODE.qdsCode
        : HELP_CLASS_CODE.wapCode // 获取分类列表选项的code
      this.params.terminalCode = this.$store.state.app.isInApp
        ? TERMINAL_CODE.app
        : TERMINAL_CODE.wap // 查询资讯的终端code
      this.params.platformCode = this.$store.state.app.isInApp
        ? this.$store.state.app.appInfo.platformCode
        : PLATFORM_CODE.wap // 查询资讯的平台code
      this.loading = true
      this.$axios.post(helpApi.findArticle, this.params).then((res) => {
        if (res.code === 200) {
          this.loading = false
          if (!res.data.articleData || !res.data.articleData.length) {
            this.searchResult = []
            this.noData = true
            return
          }
          this.noData = false
          this.searchResult = res.data.articleData
        }
      })
    },
    back() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      this.$router.back()
    },
  },
  head() {
    return {
      title: '帮助中心',
    }
  },
}
</script>
<style lang="less" scoped>
.wrapper {
  ::v-deep .sp-field__control {
    transform: translateY(2px);
  }
  ::v-deep .sp-field__control {
    &::placeholder {
      color: #cccccc !important;
    }
  }
  ::v-deep .sp-hairline--top-bottom {
    &[class*='sp-hairline']::after {
      border: none;
    }
  }
  .back_icon {
    margin-left: 40px;
  }
  .custom-title {
    .textOverflow(1);
  }
  .noFindDiv {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 176px;
    span {
      margin-top: 24px;
      font-family: PingFang SC;
      font-weight: bold;
    }
    img {
      width: 340px;
      height: 340px;
    }
    .firstSpan {
      font-size: 30px;
      color: #1a1a1a;
    }
    .lastSpan {
      font-size: 28px;
      color: #4974f5;
    }
    .im {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #4974f5;
      width: 100%;
      margin-top: 32px;
      text-align: center;
    }
  }
  ::v-deep .green {
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
</style>
