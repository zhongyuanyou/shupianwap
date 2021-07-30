<template>
  <div class="body-content-items">
    <div class="left-content" :style="{ 'background-image': item.imageUrl }">
      <div class="left-countdown">
        距离结束{{ endTime.hour }}:{{ endTime.min }}:{{ endTime.sec }}
      </div>
      <img
        height="100%"
        width="100%"
        :src="
          item.imageUrl ||
          'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
        "
        alt="商品图片"
      />
    </div>
    <div class="right-content">
      <div class="goods-name">
        <span class="rc-span">特卖</span>
        <span class="rc-span">千万补贴</span>{{ item.skuName }}
      </div>
      <div class="rc-middle">
        <div v-for="tag in item.tags.split(',').slice(0, 2)" :key="tag">
          {{ overflowDot(tag, 6) }}
        </div>
      </div>
      <div class="rc-bottom">
        <div class="rc-bottom-lf">
          <div
            v-if="parsePrice(item.specialPrice) !== '面议'"
            class="rc-bottom-lf-my"
          >
            <div>
              {{ item.specialUnit ? item.specialNewPrice : item.specialPrice }}
            </div>
            <div>{{ item.specialUnit || '元' }}</div>
          </div>
          <div v-else class="rc-bottom-lf-my">
            <div>面议</div>
          </div>

          <div v-if="parsePrice(item.specialPrice) !== '面议'" class="bf-my">
            原价{{ item.skuUnit ? item.skuNewPrice : item.skuPrice
            }}{{ item.skuUnit || '元' }}
          </div>
        </div>
        <div class="rc-bottom-rt">去抢购</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    endTime: {
      type: [Object, String],
      default: () => {
        return {}
      },
    },
    parsePrice: {
      type: Function,
      default() {},
    },
    item: {
      type: [Object],
      default: () => {
        return {}
      },
    },
    overflowDot: {
      type: Function,
      default() {},
    },
  },
}
</script>
<style lang="less">
.multiRowOverflowDot {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; //行数
  -webkit-box-orient: vertical;
}
.body-content-items {
  display: flex;
  justify-content: space-between;
  height: 332px;
  width: 100%;
  padding: 32px 0;
}
.left-content {
  position: relative;
  margin-right: 32px;
  width: 260px;
  overflow: hidden;
  height: 260px;
  background: linear-gradient(180deg, #46494d 0%, #797d83 0%, #414347 100%);
  border-radius: 12px;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  .left-countdown {
    height: 40px;
    font-size: 22px;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    padding: 0 23px 0 12px;
    position: absolute;
    top: 0px;
    left: 0px;
    word-break: break-all;
    background: #ec5330;
    border-radius: 24px 0px 98px 0px;
    font-family: PingFangSC-Regular, PingFang SC;
  }
}
.right-content {
  flex: 1;
  width: 418px;
  display: flex;
  align-content: flex-start;
  position: relative;
  height: 260px;
  flex-direction: column;
  .goods-name {
    font-size: 32px;
    height: 92px;
    font-weight: bold;
    color: #222222;
    line-height: 0.42rem;
    padding-bottom: 24px;
    .multiRowOverflowDot();
    span {
      margin-right: 4px;
      background: #ec5330;
      border-radius: 4px;
      padding: 6px 8px;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
      line-height: 20px;
    }
  }
  .rc-top {
    font-size: 32px;
    font-weight: bold;
    color: #222222;
    line-height: 32px;
    text-overflow: ellipsis;
    word-break: break-all;
    font-family: PingFangSC-Medium, PingFang SC;
    overflow: hidden;
    white-space: normal;
    max-height: 84px;
    line-height: 42px;
    text-indent: 172px;
    .multiRowOverflowDot();

    .rc-title {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      line-height: 42px;
    }
  }
  .rc-middle {
    display: flex;
    align-content: flex-start;
    margin-top: 12px;
    div {
      font-size: 20px;
      font-weight: 400;
      color: #5c7499;
      line-height: 28px;
      padding: 0 6px;
      background: #f0f2f5;
      border-radius: 4px;
      margin-right: 8px;
      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
  .rc-bottom {
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    .rc-bottom-lf {
      .rc-bottom-lf-my {
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        padding-top: 0.05rem;
        align-items: center;
        div {
          color: #ec5330;
        }
        div:nth-of-type(1) {
          font-size: 40px;
          height: 40px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          line-height: 40px;
        }
        div:nth-of-type(2) {
          font-size: 22px;
          font-weight: bold;
          margin: 13px 0 0 2px;
          line-height: 22px;
        }
      }
      .bf-my {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 8px;
        font-size: 22px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
        margin-left: 2px;
      }
    }
    .rc-bottom-rt {
      width: 100px;
      //height: 100px;
      background: yellow;
      width: 176px;
      //height: 80px;
      font-family: PingFangSC-Medium, PingFang SC;
      background: linear-gradient(139deg, #fe525d 0%, #fd3543 100%);
      border-radius: 8px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      line-height: 80px;
    }
  }
}
</style>
