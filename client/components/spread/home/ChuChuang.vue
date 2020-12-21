<template>
  <div class="chuchuang">
    <div class="title">初创必备</div>
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
        <div v-if="product.id != 5" class="product-price-position">
          <div class="middle-transition">
            <span class="product-price">{{ product.price }}</span>
            <span class="product-price-suffix">元起</span>
          </div>
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
          img: require('~/assets/spreadImages/home/busi_img_gscscc01.png'),
          imgWidth: 329,
          imgHeight: 188,
          marginRight: true,
          price: 888,
        },
        {
          id: 2,
          img: require('~/assets/spreadImages/home/busi_img_gscscc02.png'),
          imgWidth: 329,
          imgHeight: 188,
          marginRight: false,
          price: 580,
        },
        {
          id: 3,
          img: require('~/assets/spreadImages/home/busi_img_gscscc03.png'),
          imgWidth: 215,
          imgHeight: 188,
          marginRight: true,
          price: 600,
        },
        {
          id: 4,
          img: require('~/assets/spreadImages/home/busi_img_gscscc04.png'),
          imgWidth: 215,
          imgHeight: 188,
          marginRight: true,
          price: 688,
        },
        {
          id: 5,
          img: require('~/assets/spreadImages/home/busi_img_gscscc05.png'),
          imgWidth: 215,
          imgHeight: 188,
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
        align-items: center;
        align-content: center;
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
        padding-bottom: 5px;
      }
      .product-price-suffix {
        font-size: 20px;
        line-height: 20px;
        color: #ec5330;
      }
    }
  }
}
</style>
