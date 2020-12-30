<template>
  <div class="goods-item" @click="jumpUrl">
    <div class="goods-item-left">
      <img src="" alt="" class="goods-img" />
      <!--<span class="tag">急售</span>-->
    </div>
    <div class="goods-right">
      <h3 v-html="heightLightHtml(itemData.name)"></h3>
      <p
        :style="{
          visibility: description ? 'visible' : 'hidden',
        }"
        v-html="heightLightHtml(description)"
      ></p>
      <div
        class="tags"
        :style="{
          visibility: goodstype.type === 'serve' ? 'visible' : 'hidden',
        }"
      >
        <span v-for="(item, index) in tags" :key="index">{{ item.name }}</span>
      </div>
      <div class="price-sales">
        <span>{{ itemData.referencePrice }}元</span
        ><span v-if="goodstype.type === 'serve'"
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
    searchKey: {
      // 用户搜索的关键词
      type: String,
      default() {
        return ''
      },
    },
    goodstype: {
      type: Object,
      default() {
        return {
          type: 'serve',
          typeCode: '',
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
      // 描述，包括
      if (this.itemData.productDescription) {
        return this.itemData.productDescription
      }
      if (this.itemData.fieldList && this.itemData.fieldList.length) {
        const desc = []
        this.itemData.fieldList.forEach((item) =>
          desc.push(item.fieldValueCn || item.fieldValueList[0])
        )
        return desc.join(' | ')
      }
      return ''
    },
    tags() {
      if (
        'PRO_SALES_TAG' in this.itemData &&
        this.itemData.PRO_SALES_TAG.length
      ) {
        return this.itemData.PRO_SALES_TAG
      } else {
        return []
      }
    },
  },
  methods: {
    jumpUrl() {
      if (this.goodstype.type === 'serve') {
        this.$router.push(
          `/detail/serviceDetails?productId=${this.itemData.id}`
        )
      } else {
        this.$router.push(
          `/detail/transactionDetails?type=${this.goodstype.typeCode}&productId=${this.itemData.id}`
        )
      }
    },
    heightLightHtml(str) {
      // 高亮显示
      if (this.searchKey !== '' && str.indexOf(this.searchKey) !== -1) {
        const _str = str.replaceAll(
          this.searchKey,
          `<span style="color: #4974f5;">${this.searchKey}</span>`
        )
        return _str
      } else {
        return str
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
