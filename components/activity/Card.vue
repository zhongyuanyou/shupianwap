<template>
  <div class="body-content-items" :class="{ last: last }">
    <div class="left-content">
      <div v-if="endTime && endTime.sec" class="left-countdown">
        距结束 {{ endTime.hour }}:{{ endTime.min }}:{{ endTime.sec }}
      </div>
      <sp-image
        class="picture"
        fit="cover"
        :src="
          item.imageUrl ||
          'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
        "
        alt="商品图片"
      />
    </div>
    <div class="right-content">
      <div class="goods-name">
        <!-- <span class="rc-span">特卖</span>
        <span class="rc-span">千万补贴</span> -->
        {{ item.skuName }}
      </div>
      <div class="rc-middle">
        <div v-for="tag in tags" :key="tag">
          {{ overflowDot(tag, 6) }}
        </div>
      </div>
      <div class="rc-slogan">
        {{ item.slogan }}
      </div>
      <div class="rc-bottom">
        <div class="rc-bottom-lf">
          <span
            v-if="parsePrice(item.specialPrice) !== '面议'"
            class="rc-bottom-lf-my"
          >
            <span class="rc-bottom-lf-my-price">
              {{ item.specialUnit ? item.specialNewPrice : item.specialPrice }}
            </span>
            <span class="rc-bottom-lf-my-price-unit">{{
              item.specialUnit || '元'
            }}</span>
          </span>
          <span v-else class="rc-bottom-lf-my-price-unit">
            <span>面议</span>
          </span>

          <span v-if="parsePrice(item.specialPrice) !== '面议'" class="bf-my">
            {{ item.skuUnit ? item.skuNewPrice : item.skuPrice
            }}{{ item.skuUnit || '元' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,

    // SpIcon: Icon,
  },
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

    last: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tags() {
      const tag = this?.item?.tags?.split(',') || []
      return tag.slice(0, 2)
    },
  },
  methods: {
    overflowDot(str, num) {
      if (str.length > 6) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
    },
  },
}
</script>
<style lang="less" scoped>
.multiRowOverflowDot {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; //行数
  -webkit-box-orient: vertical;
}
.body-content-items {
  background: #fff;
  display: flex;
  justify-content: space-between;
  height: 276px;
  width: 100%;
  padding: 28px 20px;
  margin-bottom: 20px;
  border-radius: 24px;
}
.body-content-items.last {
  margin-bottom: 0px;
}
.left-content {
  position: relative;
  margin-right: 32px;
  width: 220px;
  height: 220px;
  flex-shrink: 0;
  overflow: hidden;

  border-radius: 12px;

  .picture {
    height: 100%;
    width: 100%;
    border-radius: 12px;
  }

  .left-countdown {
    white-space: nowrap;
    font-size: 20px;
    padding: 6px 10px;

    font-weight: 400;
    color: #ffffff;

    position: absolute;
    z-index: 1;
    top: 8px;
    left: 8px;
    word-break: break-all;

    background: #ec5330;
    border-radius: 4px;
    font-family: PingFangSC-Regular, PingFang SC;
    transform-origin: left top;
    transform: scale(0.83);
  }
}
.right-content {
  flex: 1;
  // width: 418px;
  display: flex;
  align-content: flex-start;
  position: relative;
  height: 220px;
  flex-direction: column;
  overflow: hidden;
  .goods-name {
    font-size: 32px;
    line-height: 42px;

    font-weight: bold;
    color: #222222;

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
    // display: flex;
    // align-content: flex-start;
    margin-top: 12px;
    font-size: 0;
    div {
      display: inline-block;
      font-size: 20px;
      font-weight: 400;
      flex-shrink: 0;
      color: #5c7499;
      line-height: 28px;
      padding: 0 6px;
      background: #f0f2f5;
      border-radius: 4px;
      margin-right: 8px;
      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
  .rc-slogan {
    margin-top: 16px;
    font-size: 22px;
    color: #222222;
    letter-spacing: 0;
    .mixin-text-oneoverflow();
  }
  .rc-bottom {
    position: absolute;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    .rc-bottom-lf {
      font-size: 0;
      span {
        display: inline-block;
      }
      .rc-bottom-lf-my-price {
        font-family: PingFangSC-Medium;
        font-weight: bold;
        font-size: 36px;
        color: #ec5330;
        letter-spacing: 0;
        line-height: 36px;
      }
      .rc-bottom-lf-my-price-unit {
        font-family: PingFangSC-Medium;
        font-weight: bold;
        font-size: 22px;
        color: #ec5330;
        letter-spacing: 0;
        line-height: 22px;
      }
      .bf-my {
        margin-left: 16px;
        font-size: 22px;
        color: #999999;
        letter-spacing: 0;
        line-height: 22px;
      }
    }
  }
}
</style>
