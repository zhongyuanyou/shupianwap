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

          >
            <div class="list_item"   @click="jump(item)">
              <div class="img_container">
                <img
                  src="https://cdn.shupian.cn/sp-pt/wap/images/64t0fajm5dw0000.png"
                  class="hot"
                />
                <img
                  class="picture"
                  mode="aspectFill"
                  :src="
                    item.imageUrl
                      ? $resizeImg(250, 250, item.imageUrl)
                      : defaultImg
                  "
                  alt="薯片科技"

                ></img>
              </div>
              <div class="skuName">{{ item.skuName }}</div>
              <div
                v-if="parsePrice(item.specialPrice) !== '面议'"
                class="priceContainer"
              >
                 <span class="price">{{
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
        autoplay: true,
        speed: 400,

        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
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

  ::v-deep .swiper-slide {
    text-align: center;
    font-size: 18px;

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
    transform-origin: center 76.8%;
    transform: scale(0.832);
  }
  ::v-deep .swiper-slide-active,
  ::v-deep .swiper-slide-duplicate-active {
    transform: scale(1);
  }
  ::v-deep .swiper-slide-prev {
    mask-image: linear-gradient(to top, rgba(19, 30, 62, 0) 0%, #0b1327 100%);

    border-radius: 24px;
  }
  ::v-deep .swiper-slide-next {
    mask-image: linear-gradient(to top, rgba(19, 30, 62, 0) 0%, #0b1327 100%);
    border-radius: 24px;
  }
  .list {
    overflow: hidden;

    .list_item {
      display: inline-block;
      width: 100%;

      overflow: hidden;

      background: #f7f7f7;
      border-radius: 24px;
      text-align: center;

      .img_container {
        position: relative;
        padding: 12px 12px 20px;

        .hot {
          position: absolute;
          z-index: 1;
          left: 12px;
          top: 12px;

          width: 60px;
        }
        .picture {
          width: 100%;
          // width: 266px;
          border-radius: 10px;
          overflow: hidden;
        }
      }
      .skuName {
        font-size: 26px;
        color: #222222;
        line-height: 36px;

        font-weight: bold;
        text-align: left;

        // height: 72px;
        padding: 0 20px;
        .textOverflow(2);
      }
      .priceContainer {
        color: #555555;
        text-align: left;

        letter-spacing: 0;
        margin: 12px 12px 30px;
        & > span {
          display: inline-block;
        }
      }
      .price {
        font-family: PingFangSC-Regular;
        color: #ec5330;
        font-weight: bold;
        font-size: 40px;
        line-height: 40px;
      }
      .unit {
        color: #ec5330;
        font-size: 22px;
        font-weight: bold;
      }
    }
  }
}
</style>
