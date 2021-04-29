<template>
  <div v-if="salesGoodsSubVos.length > 1" class="container">
    <div class="container_tp">
      <p class="container_tp_title">包含服务</p>
    </div>
    <div class="container_list">
      <div
        v-for="item in salesGoodsSubVos"
        :key="item.productId"
        class="container_list_item"
      >
        <div class="item_box">
          <!--          <sp-image-->
          <!--            width="1.2rem"-->
          <!--            height="1.2rem"-->
          <!--            fit="cover"-->
          <!--            lazy-load-->
          <!--            src=""-->
          <!--          />-->
          <div class="content">
            <div class="content_title hide">{{ item.goodsSubName }}</div>
            <!-- <div class="content_desc hide">
              {{ item.goodsSubDetailsName }}
            </div> -->
            <div class="content_price">
              {{ item.salesPriceEdit }} <span>元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'ContainService',
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
  },
  data() {
    return {
      expand: false,
    }
  },
  computed: {
    salesGoodsSubVos() {
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
        .salesGoodsSubVos
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
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
  }
  &_list {
    margin-top: 10px;
    padding: 0 40px 16px;
    &_item {
      &:last-child .item_box {
        border-bottom: none;
      }
      .item_box {
        padding: 32px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f4f4f4;
        .content {
          position: relative;
          /*margin-left: 28px;*/
          flex: 1;
          min-width: 0;
          &_title {
            color: #222222;
            font-size: 32px;
            font-weight: bold;
          }
          &_desc {
            color: #222222;
            font-size: 22px;
            overflow: hidden;
          }
          &_price {
            font-weight: bold;
            color: #ec5330;
            font-size: 30px;
            margin-top: 16px;
            span {
              font-weight: 400;
              font-size: 22px;
            }
          }
          &_detail {
            position: absolute;
            right: 0;
            bottom: 0;
            color: #4974f5;
            font-size: 22px;
            display: flex;
            align-items: center;
            ::v-deep .sp-icon-arrow-down {
              margin-left: 10px;
              transition: all 0.3s;
            }
            .arrow_up {
              transform: rotate(180deg);
            }
          }
        }
      }
      .detail {
        padding: 30px 0;
        border-bottom: 1px solid #f4f4f4;
        display: flex;
        flex-wrap: wrap;
        &_attr {
          min-width: 50%;
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
          &:last-child {
            margin-bottom: 0;
          }
          &_label {
            color: #999999;
            font-size: 28px;
            min-width: 140px;
            margin-right: 8px;
          }
          &_content {
            flex: 1;
            color: #222222;
            font-size: 30px;
          }
        }
      }
    }
  }
  .hide {
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 6px;
    overflow: hidden;
  }
}
</style>
