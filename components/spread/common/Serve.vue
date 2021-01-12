<template>
  <div class="hotSale-serve">
    <div v-if="serveData.type === 'hot'">
      <div
        v-for="(item, index) of serveData.productList"
        :key="index"
        class="hotSale-serve-tab"
      >
        <div class="hotSale-serve-tab-img">
          <sp-image
            width="2.66rem"
            height="100%"
            lazy-load
            fit="cover"
            :src="item.productImgArr[0]"
          />
          <div class="hotSale-serve-tab-img-top">TOP{{ index + 1 }}</div>
        </div>
        <div class="hotSale-serve-tab-text">
          <div class="hotSale-serve-tab-text-first">{{ item.name }}</div>
          <div class="hotSale-serve-tab-text-second">
            <span v-for="(tag, i) of item.tags" :key="i">{{ tag.name }}</span>
          </div>
          <div class="hotSale-serve-tab-text-three">
            {{ item.operating.productDescribe }}
          </div>
          <div class="hotSale-serve-tab-text-four">
            <div>{{ item.referencePrice }}</div>
            <div>元</div>
            <div>销量 {{ item.operating.actualSales }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="serveData.type === 'transactions'">
      <div
        v-for="(item, index) of serveData.productList"
        :key="index"
        class="hotSale-serve-tab"
      >
        <div class="hotSale-serve-tab-img">
          <sp-image
            width="2.66rem"
            height="100%"
            lazy-load
            fit="cover"
            :src="item.productImgArr[0]"
          />
          <div class="hotSale-serve-tab-img-top">TOP{{ index + 1 }}</div>
        </div>
        <div class="hotSale-serve-tab-text">
          <div class="hotSale-serve-tab-text-first">{{ item.name }}</div>
          <div class="hotSale-serve-tab-text-three">
            <div v-for="(tag, i) of item.fieldList" :key="i">
              <div v-show="i !== 0">|</div>
              {{ tag.fieldName }}
            </div>
          </div>
          <div class="hotSale-serve-tab-text-four">
            <div>{{ item.goodsPrice }}元</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from '@chipspc/vant-dgg'
export default {
  name: 'Serve',
  components: {
    [VanImage.name]: VanImage,
  },
  props: {
    serveData: {
      type: Object,
      default: () => {
        return {
          productList: {},
          type: 'transactions',
        }
      },
    },
    current: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {}
  },
  mounted() {},
}
</script>

<style scoped lang="less">
.hotSale-serve {
  margin: 40px;
  &-tab {
    width: 670px;
    min-height: 266px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.2);
    box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    margin-bottom: 40px;
    display: flex;
    &-img {
      width: 266px;
      border-radius: 8px 0px 0px 8px;
      position: relative;
      flex-shrink: 0;
      &-top {
        width: 83px;
        height: 49px;
        background: #f85840;
        border-radius: 8px 0px 8px 0px;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        line-height: 49px;
        text-align: center;
      }
    }
    &-text {
      width: 404px;
      padding: 26px 10px 0 33px;
      &-first {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
        line-height: 42px;
        margin-bottom: 10px;
        width: 318px;
      }
      &-second {
        display: flex;
        flex-wrap: wrap;
        > span {
          flex: none;
          background: #f0f2f5;
          border-radius: 4px;
          font-size: 20px;
          font-weight: 400;
          color: #5c7499;
          line-height: 20px;
          margin: 0 8px 5px 0;
          padding: 5px;
        }
      }
      &-three {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 44px;
        margin-bottom: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        > div {
          display: inline-block;
          > div {
            display: inline-block;
            margin: 0 7px;
          }
        }
      }
      &-four {
        display: flex;
        font-size: 22px;
        font-weight: 400;
        line-height: 22px;
        align-items: center;
        margin-bottom: 15px;
        > :nth-child(1) {
          font-size: 32px;
          font-weight: bold;
          color: #ec5330;
          line-height: 32px;
        }
        > :nth-child(2) {
          color: #ec5330;
          margin-right: 16px;
        }
        > :nth-child(3) {
          color: #999999;
        }
      }
    }
  }
}
</style>
