<template>
  <div class="my-component">
    <a
      v-for="(item, index) in data"
      :key="index"
      v-sensorsTrack:webClick="{
        name: `${item.text}顶部金刚区按钮点击`,
        track_code: 'SPTG000001',
      }"
      class="item"
      :class="index > 4 ? 'item-no-margin' : ''"
    >
      <div
        class="item-img-big"
        :class="index > 4 ? 'item-img-small' : 'item-img-big'"
      >
        <img :src="item.img" />
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
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/axroobu5a740000.png',
          text: '热门公司',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fg2ksxx000o0000.png',
          text: '优质公司',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jhr24e0irw000.png',
          text: '特价公司',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1zjw4j2cor34000.png',
          text: '精品公司',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1887y4q19x9c000.png',
          text: '人气公司',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7ry6zqnzmtg0000.png',
          text: '科技信息',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5fly9lt75bs0000.png',
          text: '电子贸易',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6ral3star6s0000.png',
          text: '广告传媒',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4dn7hmjqqcq0000.png',
          text: '教育培训',
          marketingImg: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/44l5cj3uoxk0000.png',
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
