<template>
  <div class="list">
    <div class="list_item">
      <div class="flex list_header">
        <div class="goods_img">
          <sp-image
            width="100%"
            height="100%"
            fit="cover"
            :src="item.indexImg || 'https://img.yzcdn.cn/vant/cat.jpeg'"
          />
        </div>
        <div class="flex_1 list_header_center">
          <div class="name">案例名称案例名称案例名称案例名称</div>
          <div class="time">办理周期：28天</div>
        </div>
        <div class="list_header_right">
          <span class="num">9.6</span>
          <span class="unit">分</span>
        </div>
      </div>

      <div class="list_content">
        <div class="san"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Image, Button, Empty } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  props: {
    item: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  font-size: 0;

  .flex {
    display: flex;
  }
  .flex_1 {
    flex: 1;
  }
  .list_item {
    margin-top: 20px;
    padding: 40px;
    background-color: #ffffff;

    .list_header {
      .goods_img {
        width: 174px;
        height: 120px;
        background: #d8d8d8;
        border-radius: 4px;
        overflow: hidden;
      }
      .list_header_center {
        padding: 0 35px 0 24px;
        .name {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #222222;
          line-height: 44px;
        }
        .time {
          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: #1a1a1a;
          margin-top: 14px;
        }
      }
      .list_header_right {
        .num {
          font-family: Bebas;
          font-size: 46px;
          color: #4975f5;
          letter-spacing: 0;
        }
        .unit {
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #4974f5;
          letter-spacing: 0;
          line-height: 24px;
        }
      }
    }

    .list_content {
      height: 167.4px;
      background: #f8f8f8;

      .san {
        width: 0;
        height: 0;
        border-left: 24px solid transparent;
        border-right: 24px solid transparent;
        border-bottom: 30px solid red;
      }
    }
  }
  .list_item:last-child {
  }
}
</style>
