<template>
  <div class="seal-goods">
    <div class="seal-goods-title">平台优势</div>
    <div class="seal-goods-content">
      <div v-for="(item, index) of tabs" :key="index">
        <img :src="item.img" alt="" class="seal-goods-content-img" />
        <div class="seal-goods-content-text">
          <div class="seal-goods-content-text-title">{{ item.title }}</div>
          <div class="seal-goods-content-text-subTitle">
            {{ item.subTitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data() {
    return {
      tabs: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8g7yab36jag0000.png',
          title: '大品牌',
          subTitle: '覆盖全国14个城市',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/62gn6iptdxw0000.png',
          title: '更专业',
          subTitle: '30万+专业规划师',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/c8gx8sa1xk0000.png',
          title: '更准时',
          subTitle: '两小时内响应',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6d3qjucw0tk0000.png',
          title: '零风险',
          subTitle: '急速售后急速退款',
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.seal-goods {
  margin: 0 40px 39px;
  &-title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 31px;
  }
  &-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > div {
      width: 323px;
      height: 144px;
      background: #ffffff;
      border: 1px solid rgba(205, 205, 205, 0.3);
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      margin-bottom: 24px;
      display: flex;
    }
    &-img {
      height: 32px;
      width: 32px;
      margin: 40px 0 0 32px;
    }
    &-text {
      margin: 40px 0 0 16px;
      &-title {
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 28px;
        margin-bottom: 15px;
      }
      &-subTitle {
        font-size: 22px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
      }
    }
  }
}
</style>
