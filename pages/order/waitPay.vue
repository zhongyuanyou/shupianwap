<template>
  <div>
    <div class="banner">
      <my-icon
        class="back-icon"
        name="nav_ic_back"
        size="0.4rem"
        color="#ffffff"
        @click.native="onLeftClick"
      ></my-icon>
      <p class="title">
        <my-icon
          name="details_ic_Unpaid"
          size="0.40rem"
          color="rgba(255, 255, 255, 1)"
        ></my-icon>
        <span class="text"> 等待付款 </span>
      </p>
      <p>
        请在24小时内支付，超时订单将自动关闭<br />
        12时20分54秒后自动关闭
      </p>
    </div>
    <div class="order-list">
      <div
        v-for="(item, index) in orderData.productVo"
        :key="index"
        class="item"
      >
        <div class="img">
          <img
            src="https://static.leetcode-cn.com/cn-assets/webpack_bundles/images/lcci_bg.7bfafcf36.png"
            alt=""
            srcset=""
          />
        </div>
        <div class="right">
          <p class="goods-name">
            <span class="name"> {{ item.name }}</span>
            <span class="money1"> {{ item.price }}元 </span>
          </p>
          <p class="sku-info">
            <span
              v-for="(item2, index2) in item.fieldList"
              :key="index2"
              class="sku-item"
              >{{ item2.fieldValue }};</span
            >
            <span class="goods-num">{{ item.goodsNumber }}</span>
          </p>
          <div class="sku-sercice">
            <div
              v-if="item.serviceResourceList && item.serviceResourceList.length"
              class="title"
            >
              增值服务
            </div>
            <div class="sku-r">
              <p
                v-for="(item3, index3) in item.serviceResourceList"
                :key="index3"
              >
                <span class="serve-name">
                  {{ item3.serviceItemValName }}
                </span>
                <span class="serve-price"> {{ item3.price }}元 </span>
                <span clss="serve-num"> ×{{ item3.num }} </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      orderData: (state) => state.order.orderData,
    }),
  },
  mounted() {
    console.log('orderData', this.orderData)
  },
  methods: {
    onLeftClick() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.banner {
  height: 250px;
  background: linear-gradient(
    90deg,
    rgba(254, 140, 41, 0.7),
    rgba(254, 140, 41, 1)
  );
  color: white;
  text-align: center;
  position: relative;
  .back-icon {
    position: absolute;
    left: 40px;
    top: 20px;
    color: white;
  }
  p {
    height: 28px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(256, 256, 256, 0.8);
    line-height: 48px;
  }
  .title {
    height: auto;
    font-size: 40px;
    font-family: PingFang SC;
    color: #ffffff;
    padding: 30px 0;
    .text {
      font-weight: bold;
    }
  }
}
.order-list {
  .item {
    padding: 20px 40px;
    height: auto;
    background: white;
    margin-top: 20px;
    display: flex;
    .img {
      width: 130px;
      height: 130px;
      background: rgba(0, 0, 0, 0.16);
      border-radius: 8px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      flex: 1;
      padding-left: 20px;
    }
    .goods-name {
      display: flex;
      font-size: 28px;
      font-family: PingFang SC;
      line-height: 36px;
      color: #222222;
      .name {
        font-weight: bold;
        flex: 1;
        .textOverflow(1);
        padding-right: 20px;
      }
      .money1 {
        font-weight: normal;
      }
    }
    .sku-info {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin: 10px 0 20px 0;
      .sku-item {
        margin-right: 10px;
      }
      .goods-num {
        display: block;
        float: right;
      }
    }
    .sku-sercice {
      display: flex;
      justify-content: space-between;
      min-height: 20px;
      .title {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36px;
      }
      .sku-r {
        p {
          display: flex;
          font-size: 22px;
          line-height: 36px;
          font-family: PingFang SC;
          color: #222222;
          font-weight: 400;
          .serve-name {
            .textOverflow(1);
            padding-right: 40px;
            padding-right: 20px;
            flex: 1;
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
