<template>
  <div class="chuchuang">
    <div class="title">初创必备</div>
    <div class="product">
      <a
        v-for="product in productList"
        :key="product.id"
        v-md-map
        class="product-item"
        :style="{
          backgroundImage: 'url(' + product.img + ')',
          width: product.imgWidth / 100 + 'rem',
          height: product.imgHeight / 100 + 'rem',
        }"
        href="javascript:void(0);"
        @click="
          () => {
            $parent.jumpLink(product.url)
          }
        "
      >
        <div v-if="product.id != 5" class="product-price-position">
          <div class="middle-transition">
            <span class="product-price">{{ product.price }}</span>
            <span class="product-price-suffix">元起</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSale',
  data() {
    return {}
  },
  created() {
    this.productList = this.$parent.chuChuangProductList
  },
}
</script>

<style lang="less" scoped>
.chuchuang {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding: 30px 0;
  font-family: PingFang SC;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .product {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .product-item {
      flex: none;
      background-size: cover;
      border-radius: 8px;
      box-sizing: border-box;
      margin-bottom: 12px;
      position: relative;

      .middle-transition {
        display: flex;
        align-items: flex-end;
        span {
          display: block;
        }
      }

      .product-price-position {
        position: absolute;
        left: 20px;
        bottom: 15px;
      }
      .product-price {
        font-size: 28px;
        line-height: 28px;
        font-weight: bold;
        color: #ec5330;
      }
      .product-price-suffix {
        font-size: 20px;
        line-height: 24px;
        color: #ec5330;
      }
    }
  }
}
</style>
