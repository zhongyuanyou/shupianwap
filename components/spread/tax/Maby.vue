<template>
  <div class="maby">
    <div class="maby-title">这些业务您可能也需要</div>
    <div class="maby-banner">
      <a v-for="(item, i) of imgs" :key="i" href="javascript:;">
        <div
          v-sensorsTrack:webClick="{
            name: `这些业务您可能也需要_${item.title}`,
          }"
          class="maby-banner-item"
          :style="item.bg"
          @click="openImUrl(item.url)"
        ></div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maby',
  data() {
    return {
      imgs: [
        {
          title: '税务筹划',
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/3d8d9tdlhuy0000.png)',
          },
          url: 'https://shupian.dgg.cn/spread/tax',
        },
        {
          title: '代理记账',
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/21vfp6qa0i1s000.png)',
          },
          url: 'https://shupian.dgg.cn/spread/agency/',
        },
        {
          title: '其他服务',
          bg: {
            backgroundImage:
              'url(https://cdn.shupian.cn/sp-pt/wap/images/fuwvgf0lbig0000.png)',
          },
          url: '',
        },
      ],
    }
  },
  methods: {
    // 点击该模块判断是否进行跳转，如果不跳转就调用IM
    openImUrl(url) {
      if (url !== '') {
        window.location.href = url
      } else {
        this.$parent.openIm()
      }
    },
  },
}
</script>

<style scoped lang="less">
.maby {
  padding: 31px 40px 0;
  width: @spread-page-width;
  &-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
    line-height: 40px;
  }
  &-banner {
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    &-item {
      width: 207px;
      height: 187px;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      padding: 24px 0 0 24px;
      background-size: 100% 100%;
      margin-bottom: 24px;
    }
  }
  &-bottom {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin: 39px 0 31px 0;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  &-last {
    width: 670px;
    height: 80px;
    border: 2px solid #4974f5;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      margin-left: 26px;
      display: flex;
      align-items: center;
      &-text {
        font-size: 24px;
        line-height: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        margin: 0 14px;
      }
      &-number {
        font-size: 40px;
        line-height: 40px;
        font-family: @Bebas;
        font-weight: 400;
        color: #4974f5;
      }
    }
    &-button {
      width: 200px;
      height: 80px;
      background: #4974f5;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      padding: 0;
      border-radius: 0px 8px 8px 0px;
      color: #ffffff;
      margin-right: -1px;
    }
  }
}
</style>
