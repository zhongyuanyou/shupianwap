<template>
  <div v-if="list.length > 0" class="box">
    <div class="list">
      <div class="list_container">
        <swiper
          ref="mySwiper"
          class="my-swipe"
          :autoplay="true"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="(item, index) of list"
            :key="index"
            @click="jump(item)"
          >
            <div class="list_item">
              <div class="img_container">
                <img
                  src="https://cdn.shupian.cn/sp-pt/wap/images/snvfwuqf4rk000.png"
                  class="hot"
                />
                <sp-image
                  class="picture"
                  fit="cover"
                  :src="
                    item.imageUrl
                      ? $resizeImg(250, 250, item.imageUrl)
                      : defaultImg
                  "
                  alt="薯片科技"
                  @click="$emit('preview', item)"
                ></sp-image>
              </div>
              <div class="skuName">{{ item.skuName }}</div>
              <div
                v-if="parsePrice(item.specialPrice) !== '面议'"
                class="priceContainer"
              >
                <span>低至</span
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
          </swiper-slide>
        </swiper>

        <!-- <div
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
              :src="
                item.imageUrl ? $resizeImg(250, 250, item.imageUrl) : defaultImg
              "
              alt="薯片科技"
              @click="$emit('preview', item)"
            ></sp-image>
          </div>
          <div class="skuName">{{ item.skuName }}</div>
          <div
            v-if="parsePrice(item.specialPrice) !== '面议'"
            class="priceContainer"
          >
            <span>低至</span
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

export default {
  name: 'Recommend',
  components: {
    [Image.name]: Image,
    Swiper,
    SwiperSlide,
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

      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: true,
      },
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
  ::v-deep .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
  }
  ::v-deep .swiper-slide-active,
  ::v-deep .swiper-slide-duplicate-active {
    transform: scale(1);
  }
  ::v-deep .swiper-slide-prev {
    background-image: linear-gradient(
      180deg,
      rgba(19, 30, 62, 0) 0%,
      #0b1327 100%
    );
    border-radius: 24px;
  }
  ::v-deep .swiper-slide-next {
    background-image: linear-gradient(
      180deg,
      rgba(19, 30, 62, 0) 0%,
      #0b1327 100%
    );
    border-radius: 24px;
  }
  .list {
    overflow: hidden;

    .list_container {
    }
    .list_item {
      display: inline-block;
      width: 100%;

      // width: calc(33% - 10px);

      overflow: hidden;

      // max-width: 215px;

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
      .priceContainer {
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
      .price {
        font-family: PingFangSC-Regular;
        color: #ec5330;
        font-weight: bold;
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
          margin: 25px auto 24px;

          max-width: 126px;
          height: 120px;
          border-radius: 4px;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
