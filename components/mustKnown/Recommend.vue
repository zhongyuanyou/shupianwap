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
      @load="recommendList"
    >
      <Item v-for="(item, index) in list" :key="index" :item="item" />
    </sp-list>
  </sp-pull-refresh>
</template>
<script>
import { PullRefresh, List, Cell, Skeleton } from '@chipspc/vant-dgg'
import Item from './Item'
import { knownApi } from '@/api'
export default {
  name: 'Index',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Skeleton.name]: Skeleton,
    Item,
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
  methods: {
    onRefresh() {
      this.finished = false
      this.page = 1
      this.loading = true
      this.recommendList()
    },
    // 请求推荐列表数据
    async recommendList() {
      const { code, message, data } = await this.$axios.get(
        knownApi.questionArticle.recommendList,
        {
          headers: {
            'x-cache-control': 'cache',
          },
          params: {
            limit: this.limit,
            page: this.page,
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
        if (this.page > data.totalPage) {
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
.item_span {
  width: 94px;
  height: 40px;
  background: #4974f5;
  border-radius: 4px;
  position: absolute;
  top: -20px;
  right: 32px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.4rem;
  text-align: center;
}
</style>
