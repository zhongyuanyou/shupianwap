<template>
  <div class="chuchuang">
    <div class="title">经营必备</div>
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
        <div class="product-price-position">
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
  name: 'JingYing',
  data() {
    return {
      productList: [
        {
          id: 1,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy01.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 2000,
        },
        {
          id: 2,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy02.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 3488,
        },
        {
          id: 3,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy03.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: false,
          price: 200,
        },
        {
          id: 4,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy04.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 888,
        },
        {
          id: 5,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy05.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 300,
        },
        {
          id: 6,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy06.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: false,
          price: 200,
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
      border: 1px solid rgba(205, 205, 205, 0.3);
      margin-bottom: 12px;
      position: relative;

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
