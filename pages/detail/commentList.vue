<template>
  <div class="good-commentlist">
    <Header title="评价列表">
      <template #left>
        <div @click="$back()">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <div class="comments-wrap">
      <sp-list
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <template v-for="(info, i) in comments" class="comment">
          <CommentItem :key="i" :comment="info" /> </template
      ></sp-list>
    </div>
  </div>
</template>

<script>
import { List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import CommentItem from '@/components/detail/CommentItem'
import { evaluateApi } from '~/api'

export default {
  name: 'GoodCommentList',
  components: {
    Header,
    CommentItem,
    [List.name]: List,
  },
  filters: {
    fliterLevel(val) {
      const txts = ['', '非常差', '差', '一般', '好', '非常好']
      return txts[val]
    },
    filterTags(val) {
      if (Array.isArray(val) && val.length) {
        const arr = val.reduce((acc, cur) => {
          acc.push(cur.name)
          return acc
        }, [])
        return arr.join()
      } else {
        return ''
      }
    },
  },
  data() {
    return {
      goodId: '', // 商品id
      comments: [],
      page: 1,
      limit: 15,
      error: false,
      loading: true,
      finished: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.goodId = this.$route.query.goodId
    this.onLoad()
  },
  methods: {
    onLoad() {
      // 获取评价
      this.getCommentsApi()
    },
    // 得到评价内容
    async getCommentsApi() {
      try {
        const params = {
          start: this.page,
          limit: this.limit,
          ext1: this.goodId, // 商品id
        }
        if (this.user && this.user.userId) {
          params.userId = this.user.userId
          params.evaluateUserId = this.user.userId
        }
        const { data, code, message } = await this.$axios.post(
          evaluateApi.getGoodsEvaluate,
          params
        )
        if (code !== 200) {
          throw new Error(message)
        }
        this.comments.push(...data.records)
        this.page++
        if (this.page > data.totalPage) {
          this.finished = true
        }
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.good-commentlist {
  ::v-deep.my-head {
    box-shadow: 0px 1px 0px 0px #f4f4f4;
  }
  .back_icon {
    margin-left: 40px;
  }
  background: #f5f5f5;
}
</style>
