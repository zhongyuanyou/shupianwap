<template>
  <section>
    <div
      v-for="(item, index) in orderData.productVo"
      :key="index"
      class="item"
      :class="index !== 0 ? 'border-top' : ''"
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
        <!-- <div
          v-if="item.serviceResourceList && item.serviceResourceList.length"
          class="sku-sercice"
        >
          <div class="title">服务明细</div>
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
        </div> -->
        <div
          v-if="item.serviceResourceList && item.serviceResourceList.length"
          class="sku-sercice"
        >
          <div class="title">增值服务</div>
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
  </section>
</template>

<script>
export default {
  props: {
    orderData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style lang="less" scoped>
.border-top {
  border-top: 1px solid #f4f4f4;
}
.item {
  padding: 20px 0;
  height: auto;
  margin-bottom: 20px;
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
      padding-right: 20px;
    }
    .sku-r {
      flex: 1;
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
.price-area {
  margin-top: 40px;
  p {
    margin-bottom: 20px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .money {
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
