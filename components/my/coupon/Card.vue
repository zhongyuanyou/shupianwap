<template>
  <div>
    <!-- v-for="(item, index) in responseData" -->
    <!-- :key="index" -->
    <div :class="couponType === 0 ? 'notUse' : 'haveUse'" class="coupon_item">
      <div class="item-lf">
        <div class="coupon_price">
          {{ item.marketingCouponVO.reducePrice }}
        </div>
        <div class="can_use">
          满{{ item.marketingCouponVO.fullPrice }}元可用
        </div>
      </div>
      <div class="item-rt">
        <div
          class="sign"
          :class="
            couponType === 1 ? 'have_use_icon' : couponType === 0 ? '' : 'lose'
          "
        ></div>
        <div class="title" @click="goDetailPage(item)">
          {{ item.marketingCouponVO.couponName }}
        </div>
        <div ref="textpro" class="content">
          {{ getuseTypeName(item.marketingCouponVO.useType) }}
          <!-- item.marketingCouponVO.useType === 1
              ? '全品类通用'
              : item.marketingCouponVO.useType === 2
              ? '限定部分类别产品使用'
              : '置顶产品使用' -->
        </div>
        <div class="date-container">
          <span
            class="date"
            :class="item.marketingCouponVO.showColorTime ? 'expiredate' : ''"
          >
            {{ item.marketingCouponVO.serviceLife }}
          </span>
          <span class="expiredate">剩余5次</span>
        </div>

        <!-- 右侧显示 end-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      couponType: 0, // 优惠券类型 未使用 已使用 已失效
    }
  },
  // computed: {
  //   newItem(){
  //     const newItem =JSON.parse(JSON.stringify(this.item))

  //     if(newItem.marketingCouponVO&&newItem.marketingCouponVO.useType){

  //     }
  //     return this.item
  //   },
  // },
  methods: {
    getuseTypeName(useType) {
      let useTypeName = ''
      switch (useType) {
        case 1:
          useTypeName = '全品类通用'
          break
        case 2:
          useTypeName = '限定部分类别产品使用'
          break
        default:
          useTypeName = '置顶产品使用'
      }
      return useTypeName
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
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/2ozhssqe5py0000.png');
}
// 未使用的背景
.notUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/g4kbai7wgrk0000.png');
}
.not_coupon_data {
  background: #f5f5f5 !important;
}

.coupon_item {
  width: 670px;
  height: 212px;
  // background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
  background-size: 100% 100%;
  margin: 24px 0;
  display: flex;
  position: relative;
  .item-lf {
    width: 201px;
    height: 212px;
    .coupon_price {
      //   height: 67px;
      font-size: 72px;
      font-family: Bebas;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      padding-top: 27px;
    }
    .can_use {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      padding-top: 23px;
    }
  }
  .item-rt {
    padding-left: 24px;
    height: auto;
    flex: 1;
    .title {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
      margin: 36px 0 23px 0;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
      overflow: hidden;
    }
    .content {
      width: 404px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 32px;
      margin-bottom: 13px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }

    .sign {
      position: absolute;
      width: 90px;
      height: 84px;
      // background-image: url('https://cdn.shupian.cn/sp-pt/wap/dcdo6nc5o6g0000.png');
      background-size: 100% 100%;
      right: 0px;
      top: 0px;
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
      .expiredate {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f1524e;
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
