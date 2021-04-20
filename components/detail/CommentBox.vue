<template>
  <div class="comment">
    <h1>用户评价</h1>
    <sp-swipe
      class="my-swipe"
      :autoplay="1000000000"
      indicator-color="#4974f5;"
    >
      <sp-swipe-item v-for="(item, index) in list" :key="index">
        <div class="item">
          <div class="head">
            <img :src="item.img" alt="" />
            <div>
              <div>
                <p>{{ item.phone }}</p>
                <span>{{ item.date }}</span>
              </div>
              <sp-rate
                v-model="item.val"
                size="0.24rem"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                class="rate"
                readonly
              />
            </div>
          </div>
          <p class="tit">
            {{ item.tit }}
          </p>
        </div>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Rate } from '@chipspc/vant-dgg'
export default {
  name: 'Comment',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Rate.name]: Rate,
  },
  data() {
    return {
      list: [
        {
          phone: '180****1234',
          img:
            'https://cdn.shupian.cn/ed1155394e5843b283731c2a6de5c0ae1612509469370.jpeg',
          date: '2021.04.13',
          tit:
            '服务态度很好。这里是评价内容，这里是评价内容这里是评价内容这里是评价内容这里是评价。',
          val: 95,
        },
        {
          phone: '180****4321',
          img:
            'https://cdn.shupian.cn/ed1155394e5843b283731c2a6de5c0ae1612509469370.jpeg',
          date: '2021.04.13',
          tit:
            '服务态度很好。这里是评价内容，这里是评价内容这里是评价内容这里是评价内容这里是评价。',
          val: 95,
        },
      ],
    }
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
  /deep/.sp-swipe__indicator {
    background: #cccccc;
  }
  /deep/.sp-swipe__indicator--active {
    background: #4974f5 !important;
  }
  /deep/.sp-swipe__indicators {
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
