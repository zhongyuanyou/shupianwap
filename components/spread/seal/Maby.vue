<template>
  <div class="seal-maby">
    <div class="seal-maby-title">你可能还需要办理</div>
    <div class="seal-maby-content">
      <div
        v-for="(item, index) of tabs"
        :key="index"
        :style="{ backgroundImage: 'url(' + item + ')' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Maby',
  data() {
    return {
      tabs: [
        'https://cdn.shupian.cn/sp-pt/wap/images/9plp8m0xtck0000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/fv759tm5sq00000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/7b66y39y3500000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/citl4m2kkxs0000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/3im1v31i6180000.jpg',
        'https://cdn.shupian.cn/sp-pt/wap/images/admktawxnq00000.jpg',
      ],
    }
  },
}
</script>

<style scoped lang="less">
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
    > div {
      width: 215px;
      height: 163px;
      background: #f8f8f8;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 8px;
      margin-bottom: 12px;
      background-size: 100% 100%;
      background-position: center;
    }
  }
}
</style>
