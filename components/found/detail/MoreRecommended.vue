<template>
  <div class="more">
    <p class="more_title">更多推荐</p>
    <div v-for="(item, index) in list" :key="index" class="more_item">
      <!--S 顶部-->
      <div class="more_item_tp">
        <!--S 左边区域-->
        <div class="more_item_tp_lf">
          <div>
            <p class="info">{{ item.name }} · {{ item.time }}</p>
            <p class="title">{{ item.title }}</p>
          </div>
          <p class="content">{{ item.content }}</p>
        </div>
        <!--E 左边区域-->
        <!--S 右边区域-->
        <div class="more_item_tp_rt">
          <img :src="item.img" />
        </div>
        <!--E 右边区域-->
      </div>
      <!--E 顶部-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'MoreRecommended',
  data() {
    return {
      list: [
        // 模拟更多推荐数据
        {
          name: '成都顶呱呱',
          time: '20分钟前',
          title: '关于非法盗用我司名义从事互联网商业活动的声明',
          content: '你觉得在一个战斗中，究竟聪明人和疯子谁会赢',
          tags: ['公司经营', '创业发展'],
          img: 'https://img.yzcdn.cn/vant/cat.jpeg',
          hot: 7563,
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.more {
  margin-top: 65px;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 28px;
  }
  &_item {
    padding-bottom: 40px;
    border-bottom: 1px solid #f4f4f4;
    margin-top: 42px;
    &_tp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      &_lf {
        height: 180px;
        width: 441px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        .info {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 42px;
        }
        .title {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        .content {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
      &_rt {
        width: 180px;
        height: 180px;
        border-radius: 4px;
        img {
          width: 180px;
          height: 180px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
