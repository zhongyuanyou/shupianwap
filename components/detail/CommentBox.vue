<template>
  <div class="comment">
    <div class="tile">
      <div class="tile-tile">用户评价</div>
      <div class="tile-more">
        <div class="tile-more__txt">更多评价</div>
        <my-icon></my-icon>
      </div>
    </div>
    <div class="content-wrap">
      <div class="tile">
        <div class="tile-avatar"></div>
        <div class="tile-desc">
          <div class="tile-desc__name">哆啦不是A梦</div>
          <div class="tile-desc__date">2020/09/19 14:00</div>
        </div>
        <div class="tile-icon"></div>
      </div>
      <div class="score">
        <div class="score-txt">服务评分</div>
        <div class="score-star"></div>
        <div class="score-level">一般</div>
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
.comment {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 16px 0;
  > h1 {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  ::v-deep.sp-swipe__indicator {
    background: #cccccc;
  }
  ::v-deep.sp-swipe__indicator--active {
    background: #4974f5 !important;
  }
  ::v-deep.sp-swipe__indicators {
    bottom: 0;
  }
  > .my-swipe {
    margin-top: 42px;
  }
  .item {
    padding: 0 40px 30px 40px;
    .head {
      display: flex;
      > img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
      }
      > div {
        margin-left: 20px;
        width: 100%;
        > div {
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 32px;
          display: flex;
          width: 100%;
          > span {
            margin-left: auto;
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            align-self: center;
          }
        }
        > .rate {
          margin-top: 12px;
          width: 100%;
          font-size: 24px;
        }
      }
    }
    .tit {
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 38px;
      padding-left: 100px;
    }
  }
}
</style>
