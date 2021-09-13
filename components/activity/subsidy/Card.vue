<template>
  <div class="body-content-items" :class="{ first: first, last: last }">
    <div class="left-content">
      <div v-if="endTime && endTime.sec" class="left-countdown">
        距结束 {{ endTime.hour }}:{{ endTime.min }}:{{ endTime.sec }}
      </div>
      <sp-image
        class="picture"
        fit="cover"
        :src="
          item.imageUrl
            ? $resizeImg(250, 250, item.imageUrl)
            : 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
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

      <div v-if="tags.length > 0" class="rc-middle">
        <div v-for="tag of tags" :key="tag">
          {{ overflowDot(tag, 6) }}
        </div>
      </div>
      <div class="rc-slogan">{{ item.slogan }}</div>
      <div class="rc-bottom">
        <div class="price-content">
          <span
            v-if="parsePrice(item.specialPrice) !== '面议'"
            class="price-content-mianyi"
          >
            <span class="price-content-mianyi-price-unit">补贴价</span>
            <span class="price-content-mianyi-price">
              {{ parseFloat(item.specialPrice) }}
            </span>
            <span class="price-content-mianyi-price-unit">元</span>
          </span>
          <span v-else class="price-content-mianyi-price-unit">面议</span>

          <!-- <span v-if="parsePrice(item.specialPrice) !== '面议'" class="mianyi">
            <span>{{ parseFloat(item.skuPrice) }}</span
            ><span>{{ '元' }}</span>
          </span> -->
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
    first: {
      type: Boolean,
      default: false,
    },
    last: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tags() {
      const tag = this?.item?.tags ? this.item.tags.split(',') : []
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
  padding: 32px 0px;
  border-bottom: 1px solid #f4f4f4;
}
.body-content-items.first {
  padding: 0px 0px 32px;
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
    font-family: @fontf-pfsc-med;
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
    margin-bottom: 12px;
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

  .rc-middle {
    // display: flex;
    // align-content: flex-start;
    margin-bottom: 16px;
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
      font-family: @fontf-pfsc-med;
    }
  }
  .rc-slogan {
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
    .price-content {
      font-size: 0;
      span {
        display: inline-block;
      }
      .price-content-mianyi {
        margin-right: 16px;
      }
      .price-content-mianyi-price {
        font-family: @fontf-pfsc-med;
        font-weight: bold;
        font-size: 36px;
        color: #ec5330;
        letter-spacing: 0;
        line-height: 36px;
      }
      .price-content-mianyi-price-unit {
        font-family: @fontf-pfsc-med;

        font-weight: bold;
        font-size: 22px;
        color: #ec5330;
        letter-spacing: 0;
        line-height: 22px;
      }
      .mianyi {
        font-size: 22px;
        color: #999999;
        letter-spacing: 0;
        line-height: 22px;
        // font-family: PingFangSC-Regular, PingFang SC, PingFangSC-Medium;
        font-family: @fontf-pfsc-reg;
        & > span {
          display: inline-block;
        }
        .bold {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
