<template>
  <div v-if="list.length > 0" class="box">
    <div class="list">
      <div class="list_container">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="list_item"
          @click="jump(item)"
        >
          <div class="img_container">
            <img :src="imgTags[index]" class="hot" />
            <sp-image
              class="picture"
              fit="cover"
              :src="
                item.imageUrl ? $resizeImg(250, 250, item.imageUrl) : defaultImg
              "
              alt="薯片科技"
              @click="$emit('preview', item)"
            ></sp-image>
          </div>

          <div
            v-if="parsePrice(item.specialPrice) !== '面议'"
            class="priceContainer"
          >
            <span class="price_des">惊爆价</span
            ><span class="price">{{
              item.specialUnit
                ? parseFloat(item.specialNewPrice)
                : parseFloat(item.specialPrice)
            }}</span
            ><span class="unit">
              {{ item.specialUnit || '元' }}
            </span>
          </div>
          <div v-else class="priceContainer unit">面议</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'

export default {
  name: 'Recommend',
  components: {
    [Image.name]: Image,

    // SpIcon: Icon,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    parsePrice: {
      type: Function,
      default() {},
    },
  },
  data() {
    return {
      defaultImg: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
      imgTags: [
        'https://cdn.shupian.cn/sp-pt/wap/images/ahzxvufoqrk000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/cj95mvv9xts0000.png',
        'https://cdn.shupian.cn/sp-pt/wap/images/7t8g8nzgsuo0000.png',
      ],
    }
  },
  computed: {},
  methods: {
    commentfn() {
      this.$emit('onComment')
    },
    jump(item) {
      this.$emit('jump', item)
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  font-family: PingFangSC;
  // margin: 24px 20px 0;
  // padding: 20px;

  border-radius: 24px;

  font-size: 0;

  .list {
    overflow: hidden;

    .list_container {
      .list_item:nth-child(2) {
        margin: 0 16px;
      }
      .list_item {
        display: inline-block;
        white-space: nowrap;
        width: 31.5%;
        width: calc((100% - 34px) / 3);
        padding: 8px;

        overflow: hidden;
        background: #f7f7f7;
        border-radius: 16px;
        text-align: center;

        .img_container {
          position: relative;
          .hot {
            position: absolute;
            z-index: 1;
            left: 17px;
            top: 0;

            width: 30px;
          }
          .picture {
            border-radius: 16px 16px 0 0;
            overflow: hidden;
          }
        }

        .priceContainer {
          font-size: 20px;
          text-align: left;
          line-height: 35px;

          letter-spacing: 0;
          margin: 20px 12px 20px;
          & > span {
            display: inline-block;
          }
        }
        .price_des {
          line-height: 22px;
          font-weight: 600;
          color: #222222;
          font-weight: bold;
        }
        .price {
          font-family: PingFangSC-Regular;
          color: #ec5330;
          font-weight: bold;
          font-size: 35px;
          letter-spacing: 0;
          margin: 0 2px;
        }
        .unit {
          color: #ec5330;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
