<template>
  <div class="result">
    <header-slot>
      <Search
        ref="searchRef"
        v-model="value"
        :disabled="true"
        :icon-left="0.24"
        placeholder="请输入搜索内容"
        @clickInputHandle="keyClickHandle"
      >
        <template v-slot:left>
          <my-icon
            name="nav_ic_back"
            size="0.40rem"
            color="#1a1a1a"
            class="my_icon"
            @click.native="$back()"
          ></my-icon>
        </template>
      </Search>
    </header-slot>
    <sp-tabs
      v-model="active"
      :class="[isInApp ? 'z-app' : '']"
      @change="changeTabs"
    >
      <template v-if="!isInApp">
        <sp-tab
          v-for="item in wapClassify"
          :key="item.code"
          :title="item.txt"
        ></sp-tab>
      </template>
      <template v-else>
        <sp-tab
          v-for="item in appClassify"
          :key="item.code"
          :title="item.txt"
          title-style="width: 20vw;"
        ></sp-tab>
      </template>
    </sp-tabs>
    <div v-show="actTab.template === 'txtlist'" class="listbox">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in searchList"
          :key="index"
          class="list"
          @click="toDetail(item.id)"
        >
          <txt-item :txt-item="item"></txt-item>
        </div>
      </sp-list>
    </div>
    <div v-show="actTab.template === 'userlist'" class="userlist">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <template v-for="item in userList">
          <User-item :key="item.id" :user-item="item"></User-item>
        </template>
      </sp-list>
    </div>
    <div v-show="actTab.template === 'video'" class="videolist">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in searchList"
          :key="index"
          class="list"
          @click="open(item)"
        >
          <video-item :video-item="item" :code="actTab.code"></video-item>
          <div v-if="index + 1 !== searchList.length" class="line"></div>
        </div>
      </sp-list>
    </div>
    <div v-show="actTab.template === 'svideo'" class="smallVideolist">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-if="searchList.length > 0" class="video-list">
          <template v-for="(item, index) in searchList" @click="open(item)">
            <small-video-item
              :key="index"
              :svideo-item="item"
            ></small-video-item
          ></template>
        </div>
      </sp-list>
    </div>
    <sp-center-popup v-model="showPop" :field="Filed4" button-type="confirm" />
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { List, CenterPopup, Tab, Tabs } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import VideoItem from '@/components/mustKnown/search/VideoItem'
import TxtItem from '@/components/mustKnown/search/TxtItem'
import UserItem from '@/components/mustKnown/search/UserItem'
import SmallVideoItem from '@/components/mustKnown/search/SmallVideoItem'
import knownApi from '@/api/known'
import HeaderSlot from '@/components/common/head/HeaderSlot'
import { numChangeW } from '@/utils/common'

export default {
  layout: 'keepAlive',
  name: 'Searchresult',
  components: {
    Search,
    VideoItem,
    TxtItem,
    UserItem,
    SmallVideoItem,
    [List.name]: List,
    [CenterPopup.name]: CenterPopup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    HeaderSlot,
  },
  data() {
    return {
      searchList: [],
      userList: [],
      // wap 页面对应分类
      wapClassify: [
        {
          code: 'question',
          txt: '问题',
          template: 'txtlist', // 页面展示template
          apiCode: 'txt',
          type: 1,
        },
        {
          code: 'article',
          txt: '文章',
          template: 'txtlist',
          apiCode: 'txt',
          type: 2,
        },
        {
          code: 'user',
          txt: '用户',
          template: 'userlist',
          apiCode: 'user',
        },
      ],
      // app 页面对应分类
      appClassify: [
        {
          code: 'question',
          txt: '问题',
          template: 'txtlist',
          apiCode: 'txt',
          type: 1,
        },
        {
          code: 'article',
          txt: '文章',
          template: 'txtlist',
          apiCode: 'txt',
          type: 2,
        },
        {
          code: 'live',
          txt: '直播',
          template: 'video',
          apiCode: 'live',
          type: 'LIVEING,WAIT_LIVE',
        },
        {
          code: 'vback',
          txt: '回放',
          template: 'video',
          apiCode: 'live',
          type: 'LIVE_END',
        },
        {
          code: 'video',
          txt: '短视频',
          template: 'video',
          apiCode: 'video',
          originalVideoType: 1,
        },
        {
          code: 'svideo',
          txt: '小视频',
          template: 'svideo',
          apiCode: 'video',
          originalVideoType: 2,
        },
        {
          code: 'course',
          txt: '大讲堂',
          template: 'video',
          apiCode: 'course',
        },
        {
          code: 'user',
          txt: '用户',
          template: 'userlist',
          apiCode: 'user',
        },
      ],
      tabIndex: '1',
      value: '',
      page: 1,
      limit: 15,
      error: false,
      loading: false,
      finished: false,
      showPop: false,
      Filed4: {
        type: 'functional',
        showCancelButton: false,
        title: '提示！',
        description: `请到App去观看`,
        confirmButtonText: '好的',
      },
      showItem: true,
      isInApp: true,
      active: 0, // 当前tabIndex
      actTemplate: 'txtlist', // 默认展示分类模板
      // 默认展示第一个
      actTab: {
        code: 'question',
        txt: '问题',
        template: 'txtlist',
        apiCode: 'txt',
        type: 1,
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user, // 登录的用户信息
      userId: (state) => state.user.userId, // userId 用于判断登录
      // isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
      // isApplets: (state) => state.app.isApplets,
    }),
    appInfo() {
      return this.$store.state.app.appInfo
    },
  },
  mounted() {
    const query = this.$route.query
    this.tabIndex = query.type || '1'
    this.value = query.keyword
  },
  beforeRouteLeave(to, from, next) {
    if (['known-detail-question', 'known-detail-article'].includes(to.name)) {
      this.SET_KEEP_ALIVE({ type: 'add', name: 'Searchresult' })
    } else {
      this.SET_KEEP_ALIVE({ type: 'remove', name: 'Searchresult' })
    }
    next()
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    changeTabs() {
      this.initTab()
      this.onLoad()
    },
    keyClickHandle() {
      this.$router.replace({
        path: '/known/search',
        query: { type: this.tabIndex, keyword: this.value },
      })
    },
    toDetail(id) {
      if (this.tabIndex === '2') {
        this.$router.push({
          path: '/known/detail/article',
          query: {
            id,
          },
        })
      } else {
        this.$router.push({
          path: '/known/detail/question',
          query: {
            id,
          },
        })
      }
    },
    initTab() {
      // start: 赋值当前模板
      let curTabList = this.wapClassify
      if (this.isInApp) {
        curTabList = this.appClassify
      }
      this.actTab = curTabList[this.active]
      // end: 赋值当前模板
      this.loading = true
      this.finished = false
      this.error = false
      this.page = 1
      this.searchList = []
      this.userList = []
    },
    async getSearchListApi() {
      if (!this.actTab.apiCode) {
        this.$xToast.error('暂不支持此方法查询')
      }
      // 请求后台接口
      try {
        const res = await this.$axios.post(knownApi.search.listV2, {
          keyword: this.value,
          type: this.actTab.type ? this.actTab.type : 99,
          limit: this.limit,
          page: this.page,
          originalVideoType: this.actTab.originalVideoType
            ? this.actTab.originalVideoType
            : 99,
          apiCode: this.actTab.apiCode,
        })
        if (res.code === 200) {
          // 用户数据
          if (this.actTab.code === 'user') {
            res.data.records.forEach((item) => {
              item.custAttentionFlag = false
            })
            this.userList.push(...res.data.records)
          } else if (this.actTab.code === 'svideo') {
            res.data.records.forEach((item) => {
              item.custTotalCount = numChangeW(item.totalViewCount)
            })
            this.searchList.push(...res.data.records)
          } else {
            this.searchList.push(...res.data.records)
          }
          this.page++
          if (this.page > res.data.totalPage) {
            this.finished = true
          }
        } else {
          this.error = true
        }
        this.loading = false
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },
    onLoad() {
      this.getSearchListApi()
    },
    open(item) {
      if (this.isInApp && this.appInfo.appCode === 'CPSAPP') {
        if (this.tabIndex === '4') {
          try {
            this.$appFn.dggOpenVideo(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开视频失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            })
          } catch (error) {
            console.error('changeTop error:', error)
          }
        } else if (this.tabIndex === '5') {
          try {
            this.$appFn.dggOpenCourse(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开课程失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            })
          } catch (error) {
            console.error('changeTop error:', error)
          }
        } else if (this.tabIndex === '6') {
          try {
            this.$appFn.dggOpenSmallVideo(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开小视频失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            })
          } catch (error) {
            console.error('changeTop error:', error)
          }
        }
      } else if (this.isInApp && this.appInfo.appCode === 'syscode') {
        this.showItem = false
      } else {
        this.showPop = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.result {
  background: #f5f5f5;
  min-height: 100vh;
  ::v-deep.search-content {
    padding: 10px 32px 10px 24px;
    height: 0.88rem;
  }
  ::v-deep.input-box {
    background: #f5f5f5;
    border: none;
    box-shadow: none;
    height: 64px;
    margin-left: 16px;
    input {
      background: #f5f5f5;
    }
    .imitate-input {
      color: #000;
    }
  }
  ::v-deep.cloose-btn {
    margin-left: 32px;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
  }
  ::v-deep.sp-tabs__wrap {
    height: 80px;
  }
  ::v-deep.sp-tab {
    padding: 0;
    font-size: 30px;
    line-height: 30px;
    color: #999;
  }
  ::v-deep.sp-tab__text--ellipsis {
    overflow: unset;
  }
  ::v-deep.sp-tabs__line {
    width: 28px;
    height: 6px;
    bottom: 23px;
  }
  ::v-deep .sp-tab--active {
    color: #222222;
    font-weight: bold;
  }
  ::v-deep.sp-tabs__nav--line {
    padding-bottom: 15px;
  }
  ::v-deep.sp-tabs__nav--complete {
    padding-left: unset;
    padding-right: unset;
  }
  .z-app {
    overflow: hidden;
    width: 100vw;
  }
  .sp-tab__app {
    width: 20vw;
  }
  .tabs-wrap {
    width: 100vw;
    overflow: hidden;
    .z-app__wrap {
      height: 80px;
      overflow: hidden;
      .z-app {
        display: flex;
        overflow-y: hidden;
        overflow-x: auto;
        box-sizing: content-box;
        height: 100%;
        user-select: none;
      }
    }
    p {
      flex: 1 0 auto;
      height: 30px;
      font-size: 30px;
      color: #999999;
      line-height: 30px;
      text-align: center;
      &.wap-item {
        width: 33.3%;
      }
      &.app-item {
        width: 20vw;
      }
      &.z-active {
        font-weight: bold;
        color: #222222;
        i {
          display: block;
        }
      }
      i {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
        display: none;
        margin: 11px auto 0 auto;
      }
    }
  }
  > .listbox {
    .list {
      padding: 40px 32px;
      background: #fff;
      margin-top: 20px;
    }
  }
  > .userlist {
    background: #fff;
    margin-top: 20px;
    padding-top: 40px;
  }
  .videolist {
    .list {
      background: #fff;
      .line {
        margin: 0 32px;
        height: 1px;
        background: #f5f5f5;
      }
    }
  }
  > .smallVideolist {
    .video-list {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0 2px;
    }
  }
}
</style>
