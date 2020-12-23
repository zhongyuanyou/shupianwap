<template>
  <div class="goods-item" @click="jumpUrl">
    <div class="goods-item-left">
      <img src="" alt="" class="goods-img" />
      <!--<span class="tag">急售</span>-->
    </div>
    <div class="goods-right">
      <h3>{{ itemData.name }}</h3>
      <p>{{ description }}</p>
      <div v-if="itemType.type === 'serve'" class="tags">
        <span>极速办理</span>
        <span>极速办理</span>
        <span>极速办理</span>
        <span>极速办理</span>
      </div>
      <div class="price-sales">
        <span>{{ itemData.referencePrice }}元</span
        ><span v-if="itemType.type === 'serve'"
          >销量 {{ itemData.salesSum }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    itemType: {
      type: Object,
      default() {
        return {
          type: 'serve',
          classify: 'wd',
        }
      },
    },
    itemData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    description() {
      if (this.itemData.productDescription) {
        return this.itemData.productDescription
      }
      if (this.itemData.fieldList) {
        return this.itemData.fieldList
      }
      return ''
    },
  },
  methods: {
    jumpUrl() {
      if (this.itemType.type === 'serve') {
        this.$router.push('/detail/serviceDetails')
      } else {
        this.$router.push(
          `/detail/${this.itemType.classify}/${this.itemData.id}`
        )
      }
    },
  },
}
</script>

<style lang="less" scoped>
.goods-item {
  display: flex;
  width: 100%;
  align-items: flex-start;
  overflow: hidden;
  .goods-item-left {
    position: relative;
    width: 160px;
    height: 160px;
    min-width: 160px;
    min-height: 160px;
    background: #f8f8f8;
    border-radius: 4px;
    margin: 40px 32px 0 40px;
    .goods-img {
      width: 160px;
      height: 160px;
      min-width: 160px;
      min-height: 160px;
    }
    .tag {
      position: absolute;
      font-size: 22px;
      line-height: 1;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      background: #fa5741;
      border-radius: 4px 0px 4px 0px;
      padding: 10px;
      left: 0;
      top: 0;
    }
  }
  .goods-right {
    display: flex;
    flex-direction: column;
    width: calc(100% - 52px);
    padding-right: 52px;
    overflow: hidden;
    h3 {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 38px;
      .textOverflow(2);
      overflow: hidden;
      margin-top: 36px;
      margin-bottom: 12px;
    }
    p {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-bottom: 12px;
      .textOverflow(1);
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      display: inherit;
      height: 32px;
      overflow: hidden;
      span {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        margin-right: 12px;
        .textOverflow(1);
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .price-sales {
      display: flex;
      align-items: flex-end;
      display: inherit;
      margin-top: 12px;
      margin-bottom: 34px;
      span {
        &:nth-child(1) {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
          margin-right: 20px;
        }
        &:nth-child(2) {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
</style>
