<template>
  <div class="my-component">
    <div class="title">热门行业分类</div>
    <div class="content">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="item"
        :class="index > 2 ? 'item-no-margin' : ''"
        :style="{ backgroundImage: `url(${item.img})` }"
      >
        <p class="item-title">{{ item.title }}</p>
        <p class="item-desc">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotIndustry',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/adksgyc99w40000.png',
          title: '科技信息',
          desc: '精选热门',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6q2uu5nbrlo0000.png',
          title: '电子贸易',
          desc: '性价首选',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/4p3m1qi3dpk0000.png',
          title: '广告传媒',
          desc: '用心甄选',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3rhz2ew70i40000.png',
          title: '教育培训',
          desc: '人气推荐',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/b7hjncoq3s80000.png',
          title: '餐饮美容',
          desc: '严选商品',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7bxz1lgw8vk0000.png',
          title: '物业地产',
          desc: '爆款热销',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(@spread-page-width - 80px);
  margin: 0 auto;
  .title {
    font-size: 40px;
    line-height: 40px;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 215px;
      height: 130px;
      background-repeat: no-repeat;
      background-size: cover;
      padding-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 12px;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 8px;
      .item-title {
        flex: none;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 28px;
        margin-bottom: 7px;
      }
      .item-desc {
        flex: none;
        font-size: 22px;
        font-weight: 400;
        color: #555555;
        line-height: 22px;
      }
    }
    .item-no-margin {
      margin-bottom: 0px;
    }
  }
}
</style>
