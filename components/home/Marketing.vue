<template>
  <div class="sp-main-box">
    <div class="inner">
      <div v-for="(item, index) in list" :key="index" class="sp-item">
        <p class="sp-goods-title">
          {{ item.productName }}
          <span v-if="item.titleIcon" class="title-bar">
            {{ item.titleIcon }}
          </span>
        </p>
        <p class="sp-goods-slogan">
          {{ item.slogan }}
        </p>
        <p v-if="item.productDescript" class="sp-goods-des">
          {{ item.productDescript }}
        </p>
        <div v-if="item.imgs && item.imgs.length" class="imgs">
          <img
            v-for="(imgItem, imgIndex) in item.imgs"
            :key="imgIndex"
            :src="imgItem"
            alt=""
            srcset=""
            @click="linkUrl(item.url)"
          />
        </div>
        <sp-button
          v-if="item.buttonText"
          type="primary"
          class="sp-goods-btn"
          @click="linkUrl(item.url)"
          >{{ item.buttonText }}</sp-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
// 营销商品活动入口
export default {
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      list: [
        {
          productName: '资产交易',
          slogan: '快速转让',
          productDescript: '公司/商标/专利/网店/新媒',
          buttonText: '我要转让',
          url:
            'https://m.shupian.cn/search/searchResult?keywords=%E5%95%86%E6%A0%87%E4%BA%A4%E6%98%93',
        },
        {
          productName: '企服直播',
          slogan: '想你所想 新用户专享',
          imgs: ['https://cdn.shupian.cn/sp-pt/wap/images/8yl438481uk0000.png'],
        },
        {
          productName: '帮找服务',
          slogan: '一键发需求',
          productDescript: '全国规划师为您服务',
          buttonText: '立即咨询',
          type: 'planner',
          titleIcon: '精选规划师',
          url: 'https://m.shupian.cn/spread/myDemandCard',
        },
        {
          productName: '1000万补贴',
          slogan: '万款服务全补贴 先到先得',
          imgs: [
            'https://cdn.shupian.cn/sp-pt/wap/5o4toa1pfgk0000.png',
            'https://cdn.shupian.cn/sp-pt/wap/95f9n61gks00000.png',
          ],
        },
      ],
    }
  },
  methods: {
    linkUrl(url) {
      window.location.href = url
    },
  },
}
</script>

<style lang="less" scoped>
.sp-item {
  width: 50%;
  height: 300px;
  box-sizing: border-box;
  border-right: 1px solid rgba(244, 244, 244, 1);
  border-bottom: 1px solid rgba(244, 244, 244, 1);
  padding: 20px;
  position: relative;
  float: left;
  .sp-goods-title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 32px;
    .title-bar {
      display: inline-block;
      width: auto;
      background: #4974f5;
      color: white;
      font-size: 24px;
      padding: 4px 8px 6px 8px;
      transform: scale(0.9);
      transform-origin: 0 50%;
      border-radius: 4px;
      line-height: 24px;
      position: relative;
      &::before {
        position: absolute;
        content: '';
        left: -14px;
        top: 8px;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 10px solid #4974f5;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
      }
    }
  }
  .sp-goods-slogan {
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .sp-goods-des {
    height: 26px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  p {
    margin-bottom: 16px;
  }
  .imgs {
    width: 315px;
    height: 162px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    img {
      width: auto;
      border-radius: 12px;
    }
  }
  .sp-goods-btn {
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: auto;
    height: 48px;
    background: rgba(73, 116, 245, 0.1);
    border-radius: 8px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    border: none;
    color: #4974f5;
    padding: 0 12px;
  }
}
</style>
