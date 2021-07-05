<template>
  <div>
    <!-- v-for="(item, index) in responseData" -->
    <!-- :key="index" -->
    <div :class="couponType === 0 ? 'notUse' : 'haveUse'" class="coupon_item">
      <div class="item-lf">
        <div class="coupon_price">
          {{ item.rebatePrice }}
        </div>
        <div v-if="item.fullPrice" class="can_use">
          满{{ item.fullPrice }}元可用
        </div>
        <div v-if="item.stock" class="coupon_progress">
          <sp-progress
            class="sp-progress"
            :percentage="50"
            :show-pivot="false"
            stroke-width="0.08rem"
            color="#ffffff"
            track-color="rgba(255,255,255,0.4)"
          />
          <span>剩余{{ parseInt((item.leftStock / item.stock) * 100) }}%</span>
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
          <span class="coupon_type_name">
            {{ item.type == 1 ? '折扣卡' : '满减' }}
          </span>
          {{ item.cardName }}
        </div>
        <div class="item-rt-content">
          <div class="item-rt-content-left">
            <div ref="textpro" class="content">
              {{ getuseTypeName(item.useType) }}
              <!-- item.useType === 1? '全品类通用': item.useType === 2? '限定部分类别产品使用': '置顶产品使用' -->
            </div>

            <div class="surplus warn">可使用{{ item.availableTimes }}次</div>

            <div class="date-container">
              <span class="date" :class="item.showColorTime ? 'warn' : ''">
                <span v-if="item.validateType == 1">
                  {{ item.validateDate }}天
                </span>
                <span v-if="item.validateType == 2">
                  {{ formatTime(item.validateDateStart) }}-{{
                    formatTime(item.validateDateEnd)
                  }}
                </span>
              </span>
            </div>
          </div>
          <div class="item-rt-content-right">
            <button>xxxx元抢</button>
          </div>
        </div>

        <!-- 右侧显示 end-->
      </div>
    </div>
  </div>
</template>
<script>
import { Progress } from '@chipspc/vant-dgg'
export default {
  components: {
    [Progress.name]: Progress,
  },
  props: {
    // 单条信息
    item: {
      type: Object,
      default() {
        return {}
      },
    },
    // 优惠券类型 未使用 已使用 已失效
    couponType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },

  methods: {
    formatTime(time) {
      if (time) {
        return time.split(' ')[0]
      }
      return ''
    },
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
  margin: 24px 40px 0;
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
      font-size: 72px;
      font-family: Bebas;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      // padding-top: 27px;
    }
    .can_use {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      // padding-top: 10px;
    }
    .coupon_progress {
      display: flex;
      align-items: center;
      padding-left: 22px;
      .sp-progress {
        // width: 98px;
        flex: 1;
        flex-shrink: 0.5;
      }
      & > span {
        flex: 1;
        flex-shrink: 1;
        white-space: nowrap;
        opacity: 0.8;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #fffcd6;
        letter-spacing: 0;
        text-align: right;

        transform-origin: center center;
        transform: scale(0.75);
      }
    }
  }
  .item-rt {
    padding-left: 24px;
    height: auto;
    flex: 1;

    .sign {
      position: absolute;
      width: 90px;
      background-size: 100% 100%;
      right: 0px;
      top: 0px;
    }
    .title {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
      margin: 26px 0 15px 0;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
      overflow: hidden;

      .coupon_type_name {
        background-image: linear-gradient(90deg, #fa6d5a 0%, #fa5741 100%);
        border-radius: 4px;
        padding: 1px 6px;
        margin-right: 5px;

        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #ffffff;
      }
    }

    .item-rt-content {
      font-size: 0;
      display: flex;
      // justify-content: center;
      align-items: center;
      .item-rt-content-left {
        flex: 1;
      }
      .item-rt-content-right {
        button {
          height: 54px;
          margin-right: 40px;
          background: #ec5330;

          border-radius: 27px;
          padding: 10px 20px;

          font-family: PingFangSC-Medium;
          font-weight: bold;
          font-size: 24px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
        }
      }
      .content {
        // width: 404px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 32px;
        margin-bottom: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
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
      }
      .warn {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f1524e;
      }
      .surplus {
        display: inline-block;
        margin-right: 30px;
        margin-bottom: 10px;
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
