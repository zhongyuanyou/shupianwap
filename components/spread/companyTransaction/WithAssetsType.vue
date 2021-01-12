<template>
  <div class="my-component">
    <div class="title">附带资产类型</div>
    <div class="content">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="item"
        :class="index > 1 ? 'item-no-margin' : ''"
        :style="{
          backgroundImage: `url(${item.img})`,
          width: `${item.imgWidth / 100}rem`,
          height: `${item.imgHeight / 100}rem`,
        }"
      >
        <p class="item-title">{{ item.title }}</p>
        <p class="item-desc">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WithAssetsType',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/95jlgcm00og0000.png',
          title: '自带商标',
          desc: '无形资产，具有商业价值，推动企业发展',
          marketingImg: '',
          imgWidth: 329,
          imgHeight: 172,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/96v8xumj78w000.png',
          title: '网络资产',
          desc: '企业知名度高，规模大、市场中具备强竞争力',
          marketingImg: '',
          imgWidth: 329,
          imgHeight: 172,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/a1gotuztxag0000.png',
          title: '渠道资源',
          desc: '自带资源属性，上手快，市场竞争范围广',
          marketingImg: '',
          imgWidth: 215,
          imgHeight: 205,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/xamcmf3kgow000.png',
          title: '自带专利',
          desc: '优质公司附带专利，无形资产为企业赋能',
          marketingImg: '',
          imgWidth: 215,
          imgHeight: 205,
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6zxeunort1s0000.png',
          title: '外贸企业',
          desc: '规避贸易风险，节约人力成本，享受优惠政策',
          marketingImg: '',
          imgWidth: 215,
          imgHeight: 205,
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
      padding-right: 36px;
      padding-top: 36px;
      border-radius: 8px;

      margin-bottom: 12px;
      .item-title {
        flex: none;
        font-size: 28px;
        font-weight: bold;
        color: #222222;
        line-height: 28px;
        margin-bottom: 18px;
      }
      .item-desc {
        flex: none;
        font-size: 22px;
        font-weight: 400;
        color: #555555;
        line-height: 30px;
      }
    }
    .item-no-margin {
      margin-bottom: 0px;
    }
  }
}
</style>
