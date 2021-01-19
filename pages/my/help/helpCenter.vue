<template>
  <div class="wrapper">
    <Header title="帮助中心">
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
    <sp-search
      v-model="params.keyword"
      placeholder="搜索您遇到的问题"
      background="#f8f8f8"
      class="search"
      clearable
      reverse
      :maxlength="20"
      @search="searchFuc"
    />
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
      <!-- <span class="lastSpan">联系客服</span> -->
    </div>
    <Loading-center v-show="loading" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Search, Cell, CellGroup, TopNavBar, Sticky } from '@chipspc/vant-dgg'
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '@/config/constant'
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
  },
  data() {
    return {
      loading: false,
      params: {
        keyword: '',
        findType: 1, // 查询类型 （0：初始化查询广告+分类+文章 1：查询文章）
        categoryCode: 'con100873',
        limit: 1000,
        page: 1,
        keywordField: 'title', // 需要检索的字段
        terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
        platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
        includeField: 'id,title', // 必须要输出的内容字段
      },
      searchResult: [],
      noData: false,
    }
  },
  watch: {
    $route(to, from) {
      // 返回帮助首页清空数据
      if (to.path === '/my/help') {
        this.params.keyword = ''
        this.noData = false
        this.searchResult = []
      }
    },
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'HelpCenter' })
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    onServiceTouch(id) {
      this.$router.push({
        path: '/my/help/questions',
        query: { id },
      })
    },
    // 搜索
    searchFuc() {
      if (!this.params.keyword) {
        return
      }
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
}
</script>
<style lang="less" scoped>
.wrapper {
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
  }
}
</style>
