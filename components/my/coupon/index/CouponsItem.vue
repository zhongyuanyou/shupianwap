<template>
  <div>
    <!-- v-for="(item, index) in responseData" -->
    <!-- :key="index" -->
    <div :class="couponType === 0 ? 'notUse' : 'haveUse'" class="coupon_item">
      <div class="item-lf">
        <div class="coupon_price">
          <span v-if="item.couponType === 2">{{
            getDiscount(item.discount)
          }}</span>
          <span v-if="item.couponType === 2" class="coupon_price_unit">折</span>

          <span v-else-if="item.couponType === 1">{{ item.reducePrice }}</span>
        </div>
        <div v-if="item.fullPrice == 0" class="can_use">无门槛</div>
        <div v-else-if="item.fullPrice" class="can_use">
          满{{ item.fullPrice }}元可用
        </div>
      </div>
      <div class="item-rt">
        <div class="sign" :class="getStatusClassName()"></div>
        <div class="title" @click="goDetailPage(item)">
          <span
            class="coupon_type_name"
            :class="{ invalid: couponType != 0 }"
            >{{ item.couponType == 1 ? '满减券' : '折扣券' }}</span
          >
          <span class="coupon_name">
            {{ item.couponName }}
          </span>
        </div>
        <div class="content">
          {{ getuseTypeName(item.useType, item) }}
          <!-- item.useType === 1
              ? '全品类通用'
              : item.useType === 2
              ? '限定部分类别产品使用'
              : '指定产品使用' -->
        </div>
        <div class="date-container">
          <span class="date" :class="item.showColorTime ? 'warn' : ''">
            {{ item.serviceLife }}
          </span>
          <!-- <span class="surplus warn">剩余5次</span> -->
        </div>

        <!-- 右侧显示 end-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 单条信息
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    // 优惠券类型 0正常 2已失效
    couponType: {
      type: Number,
      default: 0,
    },
    // 1.未使用 2.已使用,
    // 没有已失效状态
    logType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },

  methods: {
    // 获取状态对应的类名
    getStatusClassName() {
      if (this.couponType === 2) {
        if (this.logType === 2) {
          // 已使用
          return 'have_use_icon'
        } else {
          // 未使用，但过期了
          return 'lose'
        }
      }
    },
    getuseTypeName(useType, item) {
      let useTypeName = ''
      switch (useType) {
        case 1:
          useTypeName = '全场通用'
          break
        case 2:
          useTypeName = '仅限指定品类使用'
          break
        case 3:
          // useTypeName = '仅限指定商品使用'

          useTypeName = item.productName
            ? item.productName + '-可用'
            : '仅限指定商品使用'
      }
      return useTypeName
    },
    getDiscount(count) {
      return Number(count) / 100
    },
    // 进入详情
    goDetailPage(item) {
      if (item.useType === 1) {
        // 全服务品类列表
        // this.$router.push({ path: '/' })
      } else if (item.useType === 2) {
        // 分类列表
        // this.$router.push({ path: '/' })
      } else {
        // 商品列表
        // this.$router.push({ path: '/' })
      }
    },
  },
}
</script>

<style lang="less" scoped>
// 已过期的图标
.lose {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/8a099vjhmbc0000.png');
}
// 已使用的图标
.have_use_icon {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/29a165hg8w4k000.png');
}
// 已使用的背景
.haveUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/5cx1r4tc3js0000.png');
  // background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/15vv9a0bvb1c000.png');
  .coupon_price {
    margin-left: 16px !important;
  }
}
// 未使用的背景
.notUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/15vv9a0bvb1c000.png');
}
.not_coupon_data {
  background: #f5f5f5 !important;
}

.coupon_item {
  width: 670px;
  height: 212px;
  // background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
  background-size: 100% 100%;

  // padding: 0 40px;
  display: flex;
  position: relative;

  .item-lf {
    width: 201px;
    height: 212px;
    display: flex;
    // align-items: center;
    justify-content: center;
    flex-direction: column;

    .coupon_price {
      //   height: 67px;
      white-space: nowrap;
      font-size: 72px;
      font-family: Bebas;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      // padding-top: 27px;
      .coupon_price_unit {
        font-size: 36px;
        margin-left: -6px;
      }
    }
    .can_use {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      padding-top: 12px;
    }
  }
  .item-rt {
    padding-left: 24px;
    height: auto;
    flex: 1;

    .sign {
      position: absolute;
      width: 90px;
      height: 84px;
      // background-image: url('https://cdn.shupian.cn/sp-pt/wap/dcdo6nc5o6g0000.png');
      background-size: 100% 100%;
      right: 0px;
      top: 0px;
    }
    .title {
      font-size: 32px;
      line-height: 44px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      // line-height: 32px;
      margin: 30px 24px 6px 0;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
      overflow: hidden;

      .coupon_name {
        margin-left: -12px;
      }
      .coupon_type_name {
        background-image: linear-gradient(90deg, #fa6d5a 0%, #fa5741 100%);
        border-radius: 4px;
        padding: 2px 8px;
        line-height: normal;
        // margin-right: 5px;

        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #ffffff;
        text-align: center;
        display: inline-block;
        transform: scale(0.83);
        transform-origin: left center;
      }
      .coupon_type_name.invalid {
        background-image: none;
        background: #bbbbbb;
      }
    }
    .content {
      width: 404px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 32px;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;

      min-height: 64px;
      margin-bottom: 8px;
    }

    .date-container {
      display: flex;
      font-size: 0;
      .date {
        flex: 1;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .warn {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f1524e;
      }
      .surplus {
        margin-right: 30px;
        background: #fff3e9;
        border-radius: 4px;
        padding: 0 6px;
      }
    }
  }
}

// ::v-deep .sp-tabs__line {
//   width: 64px;
// }
// ::v-deep .sp-tab--active {
//   font-size: 28px;
//   font-family: PingFang SC;
//   font-weight: bold;
//   color: #4974f5;
// }
</style>
