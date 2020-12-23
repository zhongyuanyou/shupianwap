<template>
  <div class="conrult">
    <div class="conrult-title">量身打造各行各业稅收解決方案</div>
    <div class="conrult-banner">
      <sp-grid :border="false" :column-num="4">
        <sp-grid-item
          v-for="(item, i) of banners"
          :key="i"
          @click="openIMurl()"
        >
          <div class="conrult-banner-img" :style="item.style"></div>
          <div class="conrult-banner-font">{{ item.title }}</div>
        </sp-grid-item>
      </sp-grid>
    </div>
    <div class="conrult-gray">更多行业解决方案</div>
    <button class="conrult-button" @click="$parent.openIm">立即咨询</button>
  </div>
</template>

<script>
import { Grid, GridItem } from '@chipspc/vant-dgg'
export default {
  name: 'Conrult',
  components: {
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
  },
  data() {
    return {
      banners: [
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon1.png') +
              ')',
          },
          title: '微商、直播',
        },
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon2.png') +
              ')',
          },
          title: '技术服务',
        },
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon3.png') +
              ')',
          },
          title: '营销推广',
        },
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon4.png') +
              ')',
          },
          title: '金融服务',
        },
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon5.png') +
              ')',
          },
          title: '商贸物流',
        },
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon6.png') +
              ')',
          },
          title: '设计服务',
        },
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon7.png') +
              ')',
          },
          title: '咨询服务',
        },
        {
          style: {
            backgroundImage:
              'url(' +
              require('~/assets/spreadImages/tax/busi_ic_swchicon8.png') +
              ')',
          },
          title: '建筑及安装',
        },
      ],
      url: '',
    }
  },
  methods: {
    openIMurl() {
      if (this.url !== '') {
        window.open = this.url
      } else {
        this.$parent.openIm()
      }
    },
  },
}
</script>

<style scoped lang="less">
.conrult {
  margin-top: 32px;
  width: 750px;
  padding: 32px 40px;
  font-size: 0;
  &-title {
    margin-left: 2px;
    font-size: 40px;
    line-height: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-banner {
    margin: 55px 0 16px 0;
    &-img {
      width: 120px;
      height: 120px;
      margin-bottom: -9px;
      background-size: 100% 100%;
      background-position: center center;
    }
    &-font {
      font-size: 24px;
      line-height: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
      margin-bottom: 45px;
    }
  }
  &-gray {
    font-size: 28px;
    line-height: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    text-align: center;
  }
  &-button {
    width: 670px;
    height: 96px;
    background: #4974f5;
    border-radius: 8px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    padding: 0;
    margin-top: 31px;
  }
}
/deep/ .sp-grid-item__content {
  padding: 0;
}
</style>
