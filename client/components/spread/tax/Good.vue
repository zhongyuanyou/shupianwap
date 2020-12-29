<template>
  <div class="super">
    <div class="super-title">我们的优势</div>
    <div class="super-banner">
      <div v-for="(item, i) of banners" :key="i" class="super-banner-item">
        <div class="super-banner-item-left">
          <img :src="item.img" alt="" class="super-banner-item-left-icon" />
        </div>
        <div class="super-banner-item-right">
          <div class="big">{{ item.bigfont }}</div>
          <div class="small" :style="item.style">{{ item.smallfont }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Super',
  data() {
    return {
      banners: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/bbtvn2y2nts0000.png',
          bigfont: '税务合规',
          smallfont: '严格依据税法政策确保合规',
          style: { width: '1.92rem', marginBottom: '0.58rem' },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/dwl0crnzuq80000.png',
          bigfont: '专业团队',
          smallfont: '专业税务筹划团队，出具匹配度更高的方案',
          style: { width: '2.4rem', marginBottom: '0.58rem' },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3ssn8agw5sw0000.png',
          bigfont: '资金安全',
          smallfont: '多重技术保障资金',
          style: { width: '1.92rem' },
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/evan1mws7d40000.png',
          bigfont: '政策稳定',
          smallfont: '享受专属优惠',
          style: { width: '2.4rem' },
        },
      ],
      url: '',
    }
  },
}
</script>

<style scoped lang="less">
.super {
  width: 750px;
  padding: 31px 40px 26px;
  &-title {
    font-size: 40px;
    line-height: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 47px;
  }
  &-banner {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    &-item {
      display: flex;
      margin-right: 18px;
      a {
        display: flex;
      }
      &-left {
        display: flex;
        align-items: flex-start;
        margin-right: 16px;
        &-icon {
          display: inline-block;
          width: 64px;
          height: 64px;
        }
      }
    }
    .big {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 30px;
      margin-bottom: 9px;
    }
    .small {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 36px;
    }
  }
}
</style>
