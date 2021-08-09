<template>
  <div v-if="list.length > 0" class="box">
    <div v-if="title" class="title">{{ title }}</div>

    <div class="list">
      <div class="list_container">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="list_item"
          @click="jump(item)"
        >
          <div class="img_container">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/snvfwuqf4rk000.png"
              class="hot"
            />
            <sp-image
              class="picture"
              fit="cover"
              :src="item.imageUrl || defaultImg"
              @click="$emit('preview', item)"
            ></sp-image>
          </div>
          <div class="skuName">{{ item.skuName }}</div>
          <div v-if="parsePrice(item.specialPrice) !== '面议'" class="price">
            <span>低至</span
            ><span class="unit">
              {{ item.specialUnit ? item.specialNewPrice : item.specialPrice
              }}{{ item.specialUnit || '元' }}
            </span>
          </div>
          <div v-else class="price unit">面议</div>
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
    title: {
      type: String,
      default: '',
    },

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
  margin: 24px 20px 0;
  padding: 24px 20px 0;
  background: #ffffff;
  border-radius: 24px;

  font-size: 0;
  .flex {
    display: flex;
    align-items: center;
    // align-items: flex-start;
  }
  .flex_1 {
    flex: 1;
  }

  .title {
    font-weight: bold;
    font-size: 32px;
    color: #222222;
    margin-bottom: 28px;
  }

  .list {
    overflow: hidden;

    .list_container {
      margin: 0 -5px;
    }
    .list_item {
      margin: 0 6px 28px;
      display: inline-block;
      width: 32%;

      width: calc(33% - 10px);

      overflow: hidden;

      max-width: 215px;

      background: #f7f7f7;
      border-radius: 12px;
      text-align: center;

      .skuName {
        font-weight: bold;
        font-size: 24px;
        color: #222222;
        text-align: center;
        line-height: 28px;
        height: 56px;
        padding: 0 20px;
        .textOverflow(2);
      }
      .price {
        font-size: 20px;
        color: #555555;
        text-align: center;
        line-height: 28px;

        letter-spacing: 0;
        margin: 12px;
        & > span {
          display: inline-block;
        }
      }
      .unit {
        color: #ec5330;
      }
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
          margin: 0px auto 24px;
          height: 136px;
        }
      }
    }
  }
}
</style>
