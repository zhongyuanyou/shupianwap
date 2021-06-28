<template>
  <div class="need">
    <p class="need_title">猜您需要</p>
    <sp-skeleton :row="20" :loading="needLoading">
      <div
        v-for="(item, index) in productData"
        :key="index + '' + item.id"
        class="need_item"
      >
        <nuxt-link
          :to="{
            path: '/detail',
            query: {
              productId: item.id,
            },
          }"
        >
          <div class="need_item_img">
            <sp-image
              width="1.6rem"
              height="1.6rem"
              fit="cover"
              radius="0.04rem"
              lazy-load
              :src="`${item.img}?x-oss-process=image/resize,m_fill,w_160,h_160,limit_0`"
            />
          </div>
          <div class="need_item_rt">
            <p class="title">
              {{ item.name }}
            </p>
            <div class="label">
              <span
                v-for="(labelItem, index2) in item.salesGoodsTags"
                v-show="labelItem.categoryCode === 'DSJTC20210514000042'"
                :key="index2"
                class="label_item"
                >{{ labelItem.tagValueName }}</span
              >
            </div>

            <div class="desc">
              <p>{{ item.salesGoodsOperatings.slogan }}</p>
            </div>
            <p class="money">{{ item.salesPrice || item.price }}元</p>
          </div>
        </nuxt-link>
      </div>
    </sp-skeleton>
  </div>
</template>

<script>
import { Image, Skeleton } from '@chipspc/vant-dgg'
export default {
  name: 'RelatedRecommend',
  components: {
    [Image.name]: Image,
    [Skeleton.name]: Skeleton,
  },
  props: {
    productData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      needLoading: true,
    }
  },
  computed: {
    detailType() {
      return this.$route.query.type ? this.$route.query.type : null
    },
  },
  methods: {
    getItemList(list) {
      const listArr = []
      list.forEach((item) => {
        if (item.fieldValueCn && item.fieldValueCn !== null) {
          listArr.push(item.fieldValueCn)
        } else if (item.fieldValue && item.fieldValueCn !== null) {
          listArr.push(item.fieldValue)
        }
      })
      return listArr
    },
  },
}
</script>

<style lang="less" scoped>
.need {
  background-color: #fff;
  padding: 48px 40px 0 40px;
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
    a {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      padding: 40px 0;
      border-bottom: 1px solid #f4f4f4;
      overflow: hidden;
    }
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
        align-items: center;
        margin-top: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &_item {
          padding: 0 10px;
          height: 32px;
          line-height: 32px;
          color: #5c7499;
          background-color: #f0f2f5;
          font-size: 22px;
          font-family: PingFang SC;
          margin-right: 12px;
          border-radius: 4px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .desc {
        margin-top: 12px;
        color: #222222;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .money {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
        margin-top: 10px;
      }
    }
  }
}
</style>
