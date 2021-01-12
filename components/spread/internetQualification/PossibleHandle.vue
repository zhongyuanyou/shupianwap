<template>
  <div class="component">
    <div class="title">服务流程</div>
    <div class="content">
      <div v-for="(item, index) in data" :key="index" class="item">
        <img :src="item.img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PossibleHandle',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/awici0vuae80000.png',
          name: '公司注册',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ed1k72p7m280000.png',
          name: '工商注销',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6d8g6w4u6l00000.png',
          name: '工商变更',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/43itf8w7e6u0000.png',
          name: '体系认证',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ecc6seshue80000.png',
          name: '代理记账',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n9t9axruwo0000.png',
          name: '银行服务',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    flex: none;
    width: calc(100% - 80px);
    font-size: 40px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 40px;
  }

  .content {
    flex: none;
    width: calc(100% - 60px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 230px;
      height: 210px;
      img {
        width: 230px;
        height: 210px;
      }
    }
  }
}
</style>
