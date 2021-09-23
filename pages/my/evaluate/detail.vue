<template>
  <div class="m-evaluate detail">
    <Header title="评价详情" :fixed="true" />
    <div class="header-line"></div>
    <div class="info">
      <sp-image
        square
        class="img"
        fit="cover"
        :src="indexImg"
        :width="imageSize"
        :height="imageSize"
        radius="8px"
      />
      <div class="info_right">
        <div class="info_right_title">{{ orderName }}</div>
        <div class="info_right_sku">{{ orderDesc }}</div>
      </div>
    </div>
    <div class="placeholder"></div>
    <CommentItem :comment="info" />
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import CommentItem from '@/components/detail/comment/CommentItem'
import { evaluateApi } from '@/api'
// mock data

export default {
  layout: 'keepAlive',
  name: 'EvaluateDetail',
  components: {
    Header,
    [Image.name]: Image,
    CommentItem,
  },
  data() {
    return {
      orderDesc: '',
      orderName: '',
      indexImg: 'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png',
      imageSize: '1.3rem',
      size: '2.1rem',
      info: {}, // 评价内容
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getEvaluateDetail()
      this.initData()
    },
    async getEvaluateDetail() {
      try {
        const params = {
          infoId: this.$route.query.infoId,
          evaluateUserId: this.$store.state.user.userId,
        }
        const res = await this.$axios.post(evaluateApi.getGoodsEvaluate, params)
        if (res.code === 200 && res.data.records.length) {
          const res1 = this.buildCommentData(res.data.records)
          this.info = res1[0]
        } else {
          throw new Error('获取用户信息失败')
        }
      } catch (e) {
        this.$xToast.show({ message: '获取信息失败' })
      }
    },
    initData() {
      this.indexImg =
        this.$route.query.indexImg ||
        'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png'
      this.orderName = this.$route.query.orderName
      this.orderDesc = this.$route.query.orderDesc
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
@font-medium:pingfangsc-medium, PingFang SC;
@font-regular:pingfangsc-regular, PingFang SC;
.m-evaluate.detail {
  .mixin-flex {
    display: flex;
  }
  .placeholder {
    height: 1px;
    background: #f4f4f4;
    margin: 0 40px;
  }
  .header-line {
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
  .info {
    padding: 41px 40px 24px 40px;
    .mixin-flex();
    &_right {
      margin-left: 24px;
      width: 516px;
      &_title {
        font: bold 28px/36px @font-medium;
        color: #222222;
        margin-bottom: 20px;
        .textOverflow(2);
      }
      &_sku {
        font: 400 24px @font-regular;
        color: #999999;
        line-height: 24px;
      }
    }
  }
}
</style>
