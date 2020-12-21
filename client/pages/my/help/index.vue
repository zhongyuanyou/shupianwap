<template>
  <div class="help-page">
    <!-- S 头部 -->
    <Header ref="headerRef" title="帮助中心" />
    <!-- E 头部 -->
    <!-- S 广告位 -->
    <div class="help-bn">
      <img :src="adData.materialUrl" alt="" />
    </div>
    <!-- E 广告位 -->
    <div class="hele-centent">
      <!-- S 功能 -->
      <div class="func-list">
        <div>
          <img src="" alt="" />
          <span>修改登录密码</span>
        </div>
        <div>
          <img src="" alt="" />
          <span>实名认证</span>
        </div>
        <div>
          <img src="" alt="" />
          <span>免打扰设置</span>
        </div>
        <div>
          <img src="" alt="" />
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
              @click="onServiceTouch(item.id)"
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
            v-if="tabData.length && tabData[active].articleData.length"
            :loading="loading && !tabData[active].noMore"
            :no-data="tabData[active].noMore"
          />
        </div>
        <!-- E 列表 -->
      </div>
    </div>
    <!-- S footer -->
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-icon icon="phone-o" text="致电" />
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
  Sticky,
} from '@chipspc/vant-dgg'
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '@/config/constant'
import { helpApi } from '@/api'
import Header from '@/components/common/head/header'
import LoadingDown from '@/components/common/loading/LoadingDown'

export default {
  name: 'Help',
  components: {
    Header,
    LoadingDown,
    [Sticky.name]: Sticky,
    [Search.name]: Search,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [BottombarIcon.name]: BottombarIcon,
  },
  async asyncData({ $axios }) {
    const params = {
      findType: 0, // 查询类型 （0：初始化查询广告+分类+文章 1：查询文章）
      locationCode: 'ad100006', // 广告位code
      code: 'con100873', // 获取分类列表选项的code
      limit: 10,
      page: 1,
      categoryCode: '', // 分类code赛选文章
      terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
      platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
      includeField: 'id,title', // 必须要输出的内容字段
    }
    let tabData = []
    let adData = {}
    try {
      const res = await $axios.post(helpApi.findArticle, params)
      if (res.code === 200) {
        res.data.categoryList.forEach((item) => {
          item.limit = params.limit
          item.page = params.page
          item.noMore = false
          item.articleData = []
        })
        tabData = res.data.categoryList
        tabData[0].articleData = res.data.articleData
        adData = res.data.adListData[0].materialList[0]
      }
      console.log('服务端', res)
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
  mounted() {
    console.log(this.params, this.tabData)
    this.headHeight = this.$refs.headerRef.$el.clientHeight // 获取头部高度
  },
  methods: {
    // tab切换
    tabsClickHandle(index) {
      if (!this.tabData[index].articleData.length) {
        this.getProblemList(index, 1)
      }
    },
    // 监听滚动吸顶与触底加载更多
    searchHandle({ scrollTop, isFixed }) {
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
      console.log(this.params)
      this.$axios.post(helpApi.findArticle, this.params).then((res) => {
        console.log(res)
        this.loading = false
        // 无更多数据
        if (!res.data.articleData.length) {
          this.tabData[index].noMore = true
          return
        }
        // 切换加载
        if (res.code === 200 && type === 1) {
          const obj = {
            ...this.tabData[index],
            articleData: res.data.articleData,
          }
          this.$set(this.tabData, index, obj)
          return
        }
        // 触底加载更多
        if (res.code === 200 && type === 2) {
          this.tabData[index].articleData = this.tabData[
            index
          ].articleData.concat(res.data.articleData)
        }
      })
    },
    onServiceTouch(id) {
      this.$router.push({
        path: '/my/help/questions',
        query: { id },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.help-page {
  width: 100%;
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
          background: #c2c2c2;
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
      display: flex;
      align-items: flex-start;
      justify-content: center;
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
