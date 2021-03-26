<template>
  <div class="list">
    <p class="title1">推荐阅读</p>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="item"
      :class="index === 0 ? 'no-border' : ''"
    >
      <div class="left">
        <div class="title">{{ item.title }}</div>
        <p>
          <span>3000</span>
          <span>科技</span>
        </p>
      </div>
      <div class="right">
        <sp-image src="" />
      </div>
    </div>
  </div>
</template>

<script>
// 文章详情的推荐列表
export default {
  data() {
    return {
      list: [
        {
          title: '哪一刻你发现年轻人正在悄悄改变社会？',
          id: '13124314',
        },
        {
          title: '哪一刻你发现年轻人正在悄悄asdsad改变社会？',
          id: '13124314',
        },
        {
          title: '哪一刻你发现年轻人正在悄悄改变社会addada？',
          id: '13124314',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.list {
  margin-top: 60px;
  .title1 {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 32px;
  }
  .item {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 39px;
    border-top: 1px solid #ddd;
    padding: 40px 0;
    .left {
      flex: 1;
      padding-right: 40px;
      .title {
        margin-bottom: 20px;
        .textOverflow(2);
        line-height: 44px;
      }
      p {
        span {
          margin-right: 40px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
        }
      }
    }
    .right {
      width: 190px;
      height: 127px;
      background: #cccccc;
      border-radius: 12px;
      overflow: hidden;
    }
  }
  .no-border {
    border-top: none;
  }
}
</style>
