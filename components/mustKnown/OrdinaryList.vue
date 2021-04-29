<template>
  <sp-pull-refresh
    v-model="refreshing"
    success-text="刷新成功"
    pulling-text="下拉即可刷新..."
    loosing-text="释放即可刷新..."
    loading-text="加载中..."
    @refresh="onRefresh"
  >
    <sp-list
      v-model="loading"
      :finished="finished"
      offset="0"
      finished-text="没有更多了"
      @load="getList"
    >
      <Item v-for="(item, index) in list" :key="index" :item="item" />
    </sp-list>
  </sp-pull-refresh>
</template>
<script>
import { PullRefresh, List, Cell } from '@chipspc/vant-dgg'
import Item from './Item'
import { knownApi } from '@/api'
export default {
  name: 'Index',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    Item,
  },
  props: {
    categorIds: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      list: [],
    }
  },
  watch: {
    categorIds() {
      this.finished = false
      this.list = []
      this.page = 1
      this.loading = true
      this.getList()
    },
  },
  methods: {
    onRefresh() {
      this.finished = false
      this.page = 1
      this.loading = true
      this.getList()
    },
    // 请求推荐列表数据
    async getList() {
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.list,
        {
          currentUserId: this.$store.state.user.userId,
          categorIds: [this.categorIds],
          type: [2, 3],
          limit: this.limit,
          page: this.page,
        },
        {
          headers: {
            'x-cache-control': 'cache',
          },
        }
      )
      if (code === 200) {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        this.list = this.list.concat(data.rows)
        this.loading = false
        this.page++
        if (this.page > Math.ceil(data.total / this.limit)) {
          this.finished = true
        }
      } else {
        console.log(message)
        this.loading = false
        this.finished = true
      }
    },
  },
}
</script>
<style lang="less" scoped>
/deep/ .sp-list {
  padding-bottom: 110px;
}
</style>
