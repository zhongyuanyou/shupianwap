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
        // 构建评价数据
        const res = this.buildCommentData(data.records)
        this.comments.push(...res)
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
    buildCommentData(data) {
      if (!Array.isArray(data) || !data.length) {
        return []
      }
      data.forEach((cur) => {
        // 构建追评数据
        const reviewComment = cur.triggerReviewReplies
        // 追评数据不存在
        if (Array.isArray(reviewComment) && reviewComment.length) {
          // 构建追评数据
          if (
            reviewComment.some((item) => Number(item.reviewReplyType) === 1)
          ) {
            cur.custAddComment = reviewComment.find(
              (item) => Number(item.reviewReplyType) === 1
            )
            const xDayAfter = this.xDayAfter(
              cur.evaluateTime,
              cur.custAddComment.reviewReplyTime
            )
            if (xDayAfter < 1) {
              cur.custAddComment.xDayAfterTxt = '用户当天追评:'
            } else {
              cur.custAddComment.xDayAfterTxt = `用户${Math.floor(
                xDayAfter
              )}天后追评:`
            }
          }
          // 构建回复数据
          if (
            reviewComment.some((item) => Number(item.reviewReplyType) === 2)
          ) {
            cur.custReplayComment = reviewComment.find(
              (item) => Number(item.reviewReplyType) === 2
            )
          }
        }
      })
      return data
    },
    xDayAfter(start, end) {
      return (Date.parse(end) - Date.parse(start)) / (1 * 24 * 60 * 60 * 1000)
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
