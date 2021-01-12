<template>
  <div class="my-component">
    <a
      v-for="(item, index) in data"
      :key="index"
      class="item"
      :class="index > 4 ? 'item-no-margin' : ''"
    >
      <div
        class="item-img-big"
        :class="index > 4 ? 'item-img-small' : 'item-img-big'"
      >
        <img
          src="https://cdn.shupian.cn/sp-pt/wap/images/7b9uok6ghx80000.png"
        />
      </div>
      <div class="item-text">{{ item.text }}</div>
      <div v-if="item.marketingImg" class="item-marketing">
        <img :src="item.marketingImg" />
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'NavBtns',
  data() {
    return {
      data: [
        {
          img: '',
          text: '科技信息',
          marketingImg: '',
        },
        {
          img: '',
          text: '电子贸易',
          marketingImg: '',
        },
        {
          img: '',
          text: '广告传媒',
          marketingImg: '',
        },
        {
          img: '',
          text: '餐饮美容',
          marketingImg: '',
        },
        {
          img: '',
          text: '教育培训',
          marketingImg: '',
        },
        {
          img: '',
          text: '独家公司',
          marketingImg: '',
        },
        {
          img: '',
          text: '急售公司',
          marketingImg: '',
        },
        {
          img: '',
          text: '特价公司',
          marketingImg: '',
        },
        {
          img: '',
          text: '优质公司',
          marketingImg: '',
        },
        {
          img: '',
          text: '出售公司',
          marketingImg: '',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0 40px;
  .item {
    width: 20%;
    margin-bottom: 36px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    .item-img-big {
      flex: none;
      width: 104px;
      height: 72px;
      margin-bottom: 24px;
      img {
        display: flex;
        width: 104px;
        height: 72px;
      }
    }
    .item-img-small {
      flex: none;
      width: 50px;
      height: 50px;
      margin-bottom: 20px;
      img {
        display: flex;
        width: 50px;
        height: 50px;
      }
    }
    .item-text {
      flex: none;
      font-size: 24px;
      font-weight: bold;
      color: #222222;
      line-height: 24px;
    }
    .item-marketing {
      width: auto;
      height: 24px;
      position: absolute;
      top: -12px;
      right: 0px;
    }
  }
  .item-no-margin {
    margin-bottom: 0px;
  }
}
</style>
