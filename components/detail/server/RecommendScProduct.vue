<template>
  <div class="need">
    <p class="need_title">猜您需要</p>

    <sp-skeleton :row="20" :loading="scProLoading">
      <div v-for="item in recommendProductData" :key="item.id">
        <nuxt-link
          class="need_item"
          :to="{
            path: '/detail',
            query: { productId: item.id },
          }"
        >
          <div class="need_item_img">
            <sp-image
              width="1.6rem"
              height="1.6rem"
              fit="cover"
              radius="0.04rem"
              :src="
                item.productImgArr
                  ? `${item.productImgArr[0]}?x-oss-process=image/resize,m_fill,w_160,h_160,limit_0`
                  : defaultProImg
              "
            />
          </div>
          <div class="need_item_rt">
            <p class="title">
              {{ item.name }}
            </p>
            <div class="label">
              <span>{{ item.operating ? item.operating.slogan : null }}</span>
            </div>
            <div class="tags">
              <div
                v-for="tItem in tagsFilter(item.tags)"
                :key="tItem.id"
                class="tags_item"
              >
                {{ tItem.name }}
              </div>
            </div>
            <p class="money">{{ item.salesPrice || item.referencePrice }}元</p>
          </div>
        </nuxt-link>
      </div>
    </sp-skeleton>
  </div>
</template>

<script>
import { Image, Skeleton } from '@chipspc/vant-dgg'
import { GOODSLIST } from '~/config/constant'
export default {
  name: 'RecommendScProduct',
  components: {
    [Image.name]: Image,
    [Skeleton.name]: Skeleton,
  },
  props: {
    recommendProductData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      scProLoading: true,
      defaultProImg: GOODSLIST,
    }
  },
  watch: {
    recommendProductData(data) {
      console.log(data)
    },
  },
  methods: {
    tagsFilter(tags) {
      let tagsarr = []
      if (!tags) return
      tagsarr = tags.filter((item) => {
        return (item.tagType = 'PRO_SALES_TAG')
      })
      return tagsarr
    },
  },
}
</script>

<style lang="less" scoped>
.need {
  background-color: #fff;
  padding: 48px 40px 0 40px;
  overflow: hidden;
  ::v-deep.sp-skeleton {
    margin-top: 64px;
  }
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 24px;
  }
  &_item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    padding: 40px 0;
    border-bottom: 1px solid #f4f4f4;
    &:last-child {
      border-bottom: none;
    }
    &_img {
      width: 160px;
      height: 160px;
    }
    &_rt {
      width: 100%;
      margin-left: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      .title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-top: -6px;
        line-height: 44px;
        .textOverflow(2);
      }
      .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 2px;
        span {
          font-size: 22px;
          font-weight: 400;
          color: #222222;
          display: block;
          width: 478px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      .tags {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 7px;
        flex-wrap: wrap;
        height: 51px;
        overflow: hidden;
        &_item {
          padding: 5px 10px;
          background: #f0f2f5;
          border-radius: 4px;
          margin-right: 12px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          margin-bottom: 9px;
          height: 42px;
        }
      }
      .money {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
      }
    }
  }
}
</style>
