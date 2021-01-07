<template>
  <div class="recommend">
    <div class="recommend_tp">
      <p class="recommend_tp_title">同类推荐</p>
      <div class="recommend_tp_more">
        <nuxt-link
          :to="{
            path: '/list/jyList',
            query: {
              typeCode: detailType,
            },
          }"
        >
          查看更多
          <span>
            <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
          </span>
        </nuxt-link>
      </div>
    </div>
    <sp-swipe :loop="false" :width="315.5" :show-indicators="false">
      <sp-swipe-item v-for="item in similarRecommendData" :key="item.id">
        <nuxt-link
          :to="{
            path: '/detail/transactionDetails',
            query: { type: detailType, productId: item.id },
          }"
        >
          <div class="swipe_item_con">
            <div class="swipe_item_con_img">
              <sp-image
                width="1.6rem"
                height="1.6rem"
                fit="cover"
                lazy-load
                :src="item.productImgArr[0]"
              />
            </div>
            <div class="swipe_item_con_rt">
              <p class="title">{{ item.name }}</p>
              <div class="label">
                <span v-for="(lItem, index) in item.fieldList" :key="index">{{
                  `${lItem.fieldValueCn}${
                    index === item.fieldList.length - 1 ? '' : '|'
                  }`
                }}</span>
              </div>
              <div class="swipe_item_con_rt_bot">
                <p class="money">{{ item.platformPrice }}元</p>
                <!-- <p class="province">四川省</p>-->
              </div>
            </div>
          </div>
        </nuxt-link>
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from '@chipspc/vant-dgg'
export default {
  name: 'Recommend',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
  },
  props: {
    similarRecommendData: {
      type: Array,
      default: () => [],
    },
    detailType: {
      type: String,
      default: () => {
        return this.$route.query.type ? this.$route.query.type : null
      },
    },
  },
}
</script>

<style lang="less" scoped>
.recommend {
  background-color: #fff;
  padding: 48px 0 40px 0;
  border-bottom: 24px solid #f8f8f8;
  &_tp {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 40px;
    &_title {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    &_more {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      a {
        color: #999999;
        span {
          margin-left: 8px;
        }
      }
    }
  }
  /deep/ .sp-swipe {
    margin-top: 39px;
    padding-right: 40px;
  }
  /deep/ .sp-swipe-item {
    width: 100%;
    height: 224px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    padding-left: 20px;
    &:first-child {
      padding-left: 40px;
    }
    &:last-child {
      justify-content: flex-end;
      padding-right: 40px;
    }
  }
  .swipe_item_con {
    width: 591px;
    height: 224px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    padding: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    overflow: hidden;
    &_rt {
      width: 100%;
      /*height: 160px;*/
      margin-left: 23px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      .title {
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-top: -0.06rem;
        line-height: 0.44rem;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        word-break: break-all;
        overflow: hidden;
        white-space: normal;
        .textOverflow(2);
      }
      .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 2px;
        margin-bottom: 9px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        span {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
        }
      }
      &_bot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        width: 100%;
        .money {
          font-size: 0.3rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
          margin-top: 0.09rem;
        }
        .province {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 36px;
        }
      }
    }
  }
}
</style>
