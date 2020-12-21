<template>
  <div class="chuchuang">
    <div class="title">热销专区</div>
    <div class="product">
      <div
        v-for="product in productList"
        :key="product.id"
        class="product-item"
        :style="{
          backgroundImage: 'url(' + product.img + ')',
          width: product.imgWidth / 100 + 'rem',
          height: product.imgHeight / 100 + 'rem',
        }"
      >
        <div
          v-if="product.id != 5"
          class="product-price-position"
          :style="{ top: product.id == 1 ? `${150 / 2}px` : 'none' }"
        >
          <div class="middle-transition">
            <span class="product-price">{{ product.price }}</span>
            <span class="product-price-suffix">元起</span>
          </div>
        </div>
        <div
          v-if="product.id == 5"
          class="product-price-position product-price"
        >
          <span class="product-text">免费核查</span>
          <img
            class="product-icon"
            src="~/assets/spreadImages/home/busi_img_gscsjg_arro.png"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSale',
  data() {
    return {
      productList: [
        {
          id: 1,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx01.jpg'),
          imgWidth: 225,
          imgHeight: 348,
          marginRight: true,
          price: 1800,
        },
        {
          id: 2,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx02.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: true,
          price: 488,
        },
        {
          id: 3,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx03.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: true,
          price: 1500,
        },
        {
          id: 4,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx04.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: false,
          price: 600,
        },
        {
          id: 5,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx05.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: false,
          price: 0,
        },
      ],
    }
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
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    height: 348px;
    .product-item {
      flex: none;
      background-size: cover;
      border-radius: 8px;
      box-sizing: border-box;
      position: relative;
      border: 1px solid rgba(205, 205, 205, 0.3);
      height: 22px;
      .middle-transition {
        display: flex;
        align-items: center;
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
        line-height: 20px;
        color: #ec5330;
      }
      .product-text {
        font-size: 22px;
      }
      .product-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
