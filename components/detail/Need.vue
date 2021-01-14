<template>
  <div class="need">
    <p class="need_title">猜您需要</p>
    <div v-for="item in productData" :key="item.id" class="need_item">
      <nuxt-link
        :to="{
          path: '/detail/transactionDetails',
          query: {
            type: detailType,
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
            :src="item.productImgArr[0]"
          />
        </div>
        <div class="need_item_rt">
          <p class="title">
            {{ item.name }}
          </p>
          <div class="label">{{ getItemList(item.fieldList).join(' | ') }}</div>
          <div class="tags">
            <div v-for="(tItem, index) in 0" :key="index" class="tags_item">
              {{ tItem }}
            </div>
          </div>
          <p class="money">{{ item.platformPrice }}元</p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  name: 'Need',
  components: {
    [Image.name]: Image,
  },
  props: {
    productData: {
      type: Array,
      default: () => [],
    },
    detailType: {
      type: String,
      default: () => {
        return this.$route.query.type ? this.$route.query.type : null
      },
    },
  },
  data() {
    return {
      label: ['四川成都', '2025到期', '有安许证'],
      tags: ['公司干净', '总包公司', '市政三级'],
    }
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
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 2px;
        width: 4.78rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        white-space: nowrap;
      }
      .tags {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 7px;
        &_item {
          padding: 5px 10px;
          background: #f0f2f5;
          border-radius: 4px;
          margin-right: 12px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
        }
      }
      .money {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
        margin-top: 9px;
      }
    }
  }
}
</style>
