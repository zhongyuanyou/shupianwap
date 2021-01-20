<template>
  <div class="keyword">
    <!--S 搜索-->
    <FoundHeader
      :left="true"
      :keywords="keywords"
      @handelKeydown="handelKeydown"
    />
    <!--E 搜索-->
    <!--S 内容-->
    <div class="safe_con">
      <div class="safe_con_con">
        <div class="safe_con_con_title">相关新闻</div>
        <sp-list
          v-model="loading"
          :finished="finished"
          offset="0"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, index) in list" :key="index">
            <Item :info="item" />
          </div>
        </sp-list>
      </div>
    </div>
    <!--E 内容-->
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import FoundHeader from '~/components/found/common/FoundHeader'
import Item from '~/components/found/search/Item'
import { foundApi } from '@/api'
export default {
  name: 'Keywords',
  components: {
    FoundHeader,
    Item,
    [List.name]: List,
  },
  data() {
    return {
      keywords: this.$route.query.keyword || '', // 资讯搜索关键字
      list: [], // 通过关键字查询的资讯列表
      limit: 10, // 每页显示条数
      page: 1, // 当前页
      loading: false,
      finished: false,
      historySearch: [],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
    }),
  },
  mounted() {
    try {
      this.historySearch = this.$cookies.get('foundHistory')
        ? this.$cookies.get('foundHistory')
        : []
    } catch (err) {}
    // this.getInfoList()
  },
  methods: {
    handelKeydown(data) {
      this.keywords = data
      const history = this.historySearch
      const isHas = history.some((item) => {
        return item === this.keywords
      })
      if (!isHas && this.keywords) {
        history.unshift(this.keywords)
      }
      this.$cookies.set('foundHistory', history)
      this.page = 1
      this.getInfoList()
    },
    async getInfoList() {
      // 获取资讯列表
      const params = {
        keyword: this.keywords,
        limit: this.limit,
        page: this.page,
        platformCode: this.isInApp
          ? this.platformCode
          : 'COMDIC_PLATFORM_CRISPS',
        terminalCode: this.isInApp
          ? 'COMDIC_TERMINAL_APP'
          : 'COMDIC_TERMINAL_WAP',
      }
      const res = await this.$axios.get(foundApi.infoList, { params })
      if (res.code === 200) {
        this.list = res.data.information_list
      }
    },
    async onLoad() {
      const page = this.page++
      const params = {
        keyword: this.keywords,
        limit: this.limit,
        page,
        platformCode: this.isInApp
          ? this.platformCode
          : 'COMDIC_PLATFORM_CRISPS',
        terminalCode: this.isInApp
          ? 'COMDIC_TERMINAL_APP'
          : 'COMDIC_TERMINAL_WAP',
      }
      const res = await this.$axios.get(foundApi.infoList, { params })
      if (res.code === 200) {
        if (res.data.information_list.length) {
          this.loading = false
          this.list = this.list.concat(res.data.information_list)
        } else {
          this.finished = true
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.keyword {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 40px;
  .safe_con {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    &_con {
      margin-top: 128px;
      padding-top: 33px;
      &_title {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
  }
}
</style>
