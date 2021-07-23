<template>
  <div class="comment">
    <h1 class="title">客户评价</h1>

    <div v-for="(item, index) in list" :key="index" class="item">
      <div class="head">
        <img :src="item.img || $ossImgSetV2('727ro8a1oa00000.jpg')" alt="" />
        <div>
          <div class="phone">
            <p>{{ item.username }}</p>
          </div>
          <div v-if="item.time" class="date">{{ formatDate(item.time) }}</div>
        </div>
      </div>
      <p class="tit">
        {{ item.content }}
      </p>
      <div class="images">
        <div class="images_container">
          <sp-image
            v-for="(image, imageIndex) in item.imgs"
            :key="imageIndex"
            class="image"
            :src="image"
          ></sp-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { Swipe, SwipeItem, Image, Rate } from '@chipspc/vant-dgg'
export default {
  name: 'Comment',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Rate.name]: Rate,
    [Image.name]: Image,
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    formatDate(time) {
      return moment(time).format('YYYY年MM月DD日')
    },
  },
}
</script>

<style lang="less" scoped>
.comment {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 16px 0;

  > .title {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }

  > .item {
    margin-top: 42px;
    padding: 0 40px 0px;
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
        > .phone {
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 32px;
          display: flex;
          width: 100%;
        }
        > .date {
          margin-top: 12px;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          align-self: center;
        }
      }
    }
    .tit {
      margin-top: 24px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 38px;
      padding-left: 100px;
    }

    .images {
      overflow: hidden;
      font-size: 0;
      margin-top: 24px;
      padding-left: 100px;

      .images_container {
        margin: 0 -5px;
      }
      .image {
        margin: 0 5px 10px;
        width: 32%;
        width: calc(33% - 10px);
        max-width: 216px;
        height: 131px;
      }
    }
  }
}
</style>
