<template>
  <div class="m-evaluate list">
    <div class="item">
      <div class="item-info">
        <sp-image class="img" fit="cover" :src="evaluateInfo.indexImg || ''" />
        <div class="desc">
          <div class="desc-name">{{ evaluateInfo.orderName || '' }}</div>
          <div class="desc-content">{{ evaluateInfo.orderDesc || '' }}</div>
        </div>
      </div>
      <template v-if="evaluateInfo.evaluateStatus === 1">
        <div class="item-button" @click="linkWrite(evaluateInfo)">写评价</div>
      </template>
      <template v-else>
        <div class="item-button read" @click="linkDetail(evaluateInfo)">
          查看评价
        </div>
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
  data() {
    return {
      evaluateInfo: this.item,
    }
  },
  methods: {
    linkWrite(evaluateInfo) {
      this.$router.push({
        path: '/my/evaluate/write',
        query: {
          indexImg: evaluateInfo.indexImg,
          orderName: evaluateInfo.orderName,
        },
      })
    },
    linkDetail(evaluateInfo) {
      this.$router.push({
        path: '/my/evaluate/detail',
        query: {
          indexImg: evaluateInfo.indexImg,
          orderName: evaluateInfo.orderName,
          orderDesc: evaluateInfo.orderDesc,
          infoId: evaluateInfo.evaluateCenterId,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.m-evaluate.list {
  @item-padding: 32px 40px;
  @item-img-size: 130px;

  .item {
    padding: @item-padding;
    font-family: @fontf-pfsc-med;
    &-info {
      display: flex;
      .img {
        width: @item-img-size;
        height: @item-img-size;
        border-radius: 0;
        background: #f4f4f4;
        margin-right: 24px;
      }
      .desc {
        width: 516px;
        &-name {
          font-weight: bold;
          font-size: 28px;
          color: #222222;
          line-height: 36px;
          margin-bottom: 20px;
          .textOverflow(2);
        }
        &-content {
          height: 24px;
          line-height: 24px;
          font-size: 24px;
          font-weight: 400;
          color: #999999;
          .mixin-text-oneoverflow();
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
