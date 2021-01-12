<template>
  <div class="component">
    <div class="title">服务流程</div>
    <div class="content">
      <div v-for="(item, index) in process" :key="index" class="item">
        <div class="item-img"><img :src="item.img" /></div>
        <p class="item-title">{{ item.title }}</p>
        <p class="item-desc">{{ item.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceProcess',
  data() {
    return {
      process: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/euyda65cxeg0000.png',
          title: '线上申请',
          desc: '一键下单，规划师快速 响应',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6sye15ws3zg0000.png',
          title: '材料编写',
          desc: '专业工作人员准备申请 材料',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/67701z2mxkg0000.png',
          title: '资料上交',
          desc: '绿色通道，快速办理',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/562jlh6ug500000.png',
          title: '领取证书',
          desc: '领取互联网资质证书',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.component {
  width: calc(100% - 80px);
  margin: 0 auto;

  .title {
    font-size: 40px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 40px;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 324px;
      flex: none;
      background: #ffffff;
      border: 1px solid rgba(205, 205, 205, 0.4);
      border-radius: 8px;
      padding: 24px 38px 30px 38px;
      margin-bottom: 24px;
      .item-img {
        width: 76px;
        height: 76px;
        margin-bottom: 22px;
        img {
          display: flex;
          width: 76px;
          height: 76px;
        }
      }
      .item-title {
        font-size: 28px;
        line-height: 28px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 16px;
      }
      .item-desc {
        font-size: 24px;
        font-weight: 400;
        color: #999999;
      }
    }
  }
}
</style>
