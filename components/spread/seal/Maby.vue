<template>
  <div class="seal-maby">
    <div class="seal-maby-title">你可能还需要办理</div>
    <div class="seal-maby-content">
      <a v-for="(item, index) of tabs" :key="index" href="javascript:;">
        <div
          v-sensorsTrack:webClick="{
            name: `可能还需要办理_${item.name}`,
          }"
          :style="{ backgroundImage: 'url(' + item.img + ')' }"
          class="seal-maby-content-item"
          @click="tabUrl(item.url)"
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
      tabs: [
        {
          name: '工商注销',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9plp8m0xtck0000.jpg',
          url: '/spread/businessCancellation',
        },
        {
          name: '代理记账',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fv759tm5sq00000.jpg',
          url: '/spread/agency',
        },
        {
          name: '许可证办理',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7b66y39y3500000.jpg',
          url: '/spread/licence',
        },
        {
          name: '互联网资质',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/citl4m2kkxs0000.jpg',
          url: '/spread/internetQualification',
        },
        {
          name: '财务稅筹',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3im1v31i6180000.jpg',
          url: '/spread/tax',
        },
        {
          name: '银行服务',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/admktawxnq00000.jpg',
          url: '/spread/bankService',
        },
      ],
    }
  },
  methods: {
    // 点击该模块判断是否进行跳转，如果不跳转就调用IM
    tabUrl(url) {
      this.$router.push(url)
      // window.location.href = url
    },
  },
}
</script>

<style scoped lang="less">
a {
  text-decoration: none;
  color: inherit;
}
.seal-maby {
  margin: 0 40px 52px;
  &-title {
    margin-bottom: 31px;
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 215px;
      height: 163px;
      background: #f8f8f8;
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      margin-bottom: 12px;
      background-size: 100% 100%;
      background-position: center;
    }
  }
}
</style>
