<template>
  <div class="hot-sale">
    <div class="title">热销专区</div>
    <div class="product">
      <div class="product-col1">
        <div class="product-col1-tab-position product-price">
          <span class="product-price">1800</span>
          <span class="product-price-suffix">元起</span>
        </div>
      </div>
      <div class="product-col2">
        <div class="product-col2-bg product-col2-bg-img1">
          <div class="product-col2-tab-position product-price">
            <span class="product-price">488</span>
            <span class="product-price-suffix">元起</span>
          </div>
        </div>
        <div class="product-col2-bg product-col2-bg-img2">
          <div class="product-col2-tab-position product-price">
            <span class="product-price">600</span>
            <span class="product-price-suffix">元起</span>
          </div>
        </div>
      </div>
      <div class="product-col2">
        <div class="product-col2-bg product-col2-bg-img3">
          <div class="product-col2-tab-position product-price">
            <span class="product-price">1500</span>
            <span class="product-price-suffix">元起</span>
          </div>
        </div>
        <div class="product-col2-bg product-col2-bg-img4">
          <div class="product-col2-tab-position product-price">
            <span class="product-text">免费核查</span>
            <img
              class="product-icon"
              src="~/assets/spreadImages/home/busi_img_gscsjg_arro.png"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSale',
}
</script>

<style lang="less" scoped>
.hot-sale {
  padding: 30px 40px;
  font-family: @PingFangSC;

  .title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .product {
    height: 348px;
    display: flex;
    justify-content: center;

    .product-col1 {
      width: 225px;
      height: 100%;
      flex: none;
      background-image: url('~assets/spreadImages/home/busi_img_gscsrx01.jpg');
      background-size: cover;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 8px;
      margin-right: 12px;
      margin-left: 0px;
      display: flex;
      align-items: center;

      .product-col1-tab-position {
        flex: none;
        width: 100%;
        color: #ec5330;
        padding-left: 20px;
      }
    }

    .product-col2 {
      flex: none;
      width: 210px;
      display: flex;
      flex-direction: column;
      margin-right: 12px;
      justify-content: space-between;

      .product-col2-bg {
        width: 210px;
        height: 168px;
        background-size: cover;
        border: 1px solid rgba(205, 205, 205, 0.5);
        border-radius: 8px;
        position: relative;
        .product-col2-tab-position {
          position: absolute;
          left: 20px;
          bottom: 15px;
          color: #ec5330;
        }
      }
      .product-col2-bg-img1 {
        background-image: url('~assets/spreadImages/home/busi_img_gscsrx02.jpg');
      }
      .product-col2-bg-img2 {
        background-image: url('~assets/spreadImages/home/busi_img_gscsrx04.jpg');
      }
      .product-col2-bg-img3 {
        background-image: url('~assets/spreadImages/home/busi_img_gscsrx02.jpg');
      }
      .product-col2-bg-img4 {
        background-image: url('~assets/spreadImages/home/busi_img_gscsrx04.jpg');
      }
    }

    .product-price {
      font-size: 28px;
      font-weight: bold;
    }
    .product-price-suffix {
      font-size: 20px;
    }
    .product-text {
      font-size: 22px;
      font-weight: bold;
    }
    .product-icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
