<template>
  <div class="m-evaluate list">
    <div class="item">
      <div class="item-info">
        <sp-image round class="img" fit="cover" :src="item.avatar || ''" />
        <div class="desc">
          <div class="desc-name">{{ item.name || '' }}</div>
          <div class="desc-content">{{ item.desc || '' }}</div>
        </div>
      </div>
      <template v-if="item.commentFlag === 1">
        <div class="item-button">写评价</div>
      </template>
      <template v-else>
        <div class="item-button read">查看评价</div>
      </template>
      <div class="item-clear"></div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'

export default {
  name: 'EvaluateList',
  components: {
    [Image.name]: Image,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>
<style lang="less" scoped>
.m-evaluate.list {
  .item {
    padding: 32px 40px;
    &-info {
      display: flex;
      .img {
        width: 130px;
        height: 130px;
        border-radius: 0;
        background: #f4f4f4;
        margin-right: 24px;
      }
      .desc {
        width: 516px;
        &-name {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          font-size: 28px;
          color: #222222;
          line-height: 36px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 20px;
        }
        &-content {
          height: 24px;
          line-height: 24px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
      }
    }
    &-button {
      margin-top: 32px;
      padding: 19px 41px;
      font-size: 26px;
      color: #4974f5;
      border-radius: 8px;
      border: 1px solid #4974f5;
      float: right;
      &.read {
        border-radius: 6px;
        border: 1px solid #cccccc;
        color: #cccccc;
      }
    }
    &-clear {
      clear: both;
    }
  }
  .placeholder {
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
}
</style>
