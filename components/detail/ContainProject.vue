<template>
  <div
    v-if="
      serviceGoods.length === 1 && serviceGoods[0]['serviceItems'].length > 0
    "
    class="container"
  >
    <!--    服务商品的服务项-->
    <div class="container_tp">
      <p class="container_tp_title">包含项目</p>
      <div class="container_tp_more" @click="showRoundCorner = true">
        查看更多<span
          ><my-icon name="order_ic_listnext" size="0.21rem" color="#ccc"
        /></span>
      </div>
    </div>
    <div class="container_list">
      <div
        v-for="(item, index) in serviceGoods[0]['serviceItems']"
        :key="index"
        class="container_list_item"
      >
        <span class="label hide">{{ item.title }}</span>
        <!-- <span class="desc hide">{{ item.text }}</span> -->
      </div>
    </div>
    <sp-popup
      v-model="showRoundCorner"
      title="包含项目"
      round
      closeable
      padding
      position="bottom"
      :style="{ padding: '25px 20px' }"
    >
      <sp-safeguard
        :options="serviceGoods[0]['serviceItems']"
        success
      ></sp-safeguard>
    </sp-popup>
  </div>
</template>

<script>
import { Safeguard, Popup } from '@chipspc/vant-dgg'
export default {
  name: 'ContainProject',
  components: {
    [Safeguard.name]: Safeguard,
    [Popup.name]: Popup,
  },
  data() {
    return {
      projectList: [],
      showRoundCorner: false,
    }
  },
  computed: {
    //  服务商品的SKU集合
    serviceGoods() {
      //  基础商品
      const salesGoodsSubVos = JSON.stringify(
        this.$store.state.sellingGoodsDetail.sellingGoodsData.salesGoodsSubVos
      )
      // 找出服务商品
      const serviceGoods = JSON.parse(salesGoodsSubVos).map((item) => {
        item.serviceItems = item.serviceItems.map((serviceList) => {
          return {
            title: serviceList.serviceItemName,
            // text: serviceList.description,
          }
        })
        return item
      })
      console.log(serviceGoods)
      return serviceGoods
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep.sp-safeguard__title {
  max-width: none;
}
.container {
  background-color: #fff;
  padding-top: 44px;
  border-bottom: 24px solid #f8f8f8;
  font-family: PingFang SC;
  font-weight: 400;
  &_tp {
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_title {
      font-size: 40px;
      font-weight: bold;
      color: #1a1a1a;
    }
    &_more {
      font-size: 26px;
      color: #999999;
      span {
        margin-left: 15px;
      }
    }
  }
  &_list {
    margin-top: 14px;
    &_item {
      font-size: 26px;
      padding: 0 40px 0 39px;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f4f4f4;
      &:last-child {
        border-bottom: none;
      }
      .label {
        color: #222222;
        width: 260px;
      }
      .desc {
        color: #999999;
        width: 330px;
        text-align: right;
      }
    }
  }
  .hide {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
