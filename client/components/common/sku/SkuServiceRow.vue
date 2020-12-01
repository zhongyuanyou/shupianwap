<!--
 * @Author: xiao pu
 * @Date: 2020-11-30 15:10:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-01 19:41:50
 * @Description: file content
 * @FilePath: /chips-wap/client/components/common/sku/SkuServiceRow.vue
-->
<template>
  <div class="sku-service-row" :class="{ 'sp-hairline--bottom': !isSub }">
    <div :class="{ 'sku-service-row-sub': isSub }">
      <div class="sku-service-row__title">
        <span>{{ skuRow.k }}</span>
      </div>

      <div class="sku-service-row__wrap">
        <slot name="default">
          <template v-for="item of skuRow.v">
            <SkuServiceRowItem
              :key="item.id"
              :sku-value="item"
              @sku-select="handleSelect"
            />
          </template>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'

import SkuServiceRowItem from './SkuServiceRowItem'

export default {
  name: 'SkuServiceRow',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    SkuServiceRowItem,
  },

  props: {
    isSub: {
      type: Boolean,
      default: false,
    },
    skuRow: {
      type: Object,
      default() {
        return {
          //   k: '颜色',
          //   k_s: 's1',
          //   k_id: '1',
          //   v: [
          //     {
          //       id: '3',
          //       name: '蓝色',
          //       imgUrl: 'https://b.yzcdn.cn/vant/sku/shoes-3.png',
          //     },
          //   ],
          //   largeImageMode: true,
          //   is_multiple: false, // 是否多选
        }
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    handleSelect(value = {}) {
      const { actived, id } = value
      console.log('handleSelect:', actived, id)
    },
  },
}
</script>

<style lang="less" scoped>
.sku-service-row {
  padding: 32px 0px;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
    color: #222222;
    line-height: 32px;
  }
  &__sub-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__wrap {
    margin: 30px -16px 0 0;
  }
  /deep/.sku-service-row-item {
    margin: 0 16px 16px 0;
  }

  &-sub {
    .sku-service-row__title {
      font-size: 26px;
      font-weight: 500;
      color: #555555;
      line-height: 30px;
    }
    .sku-service-row__wrap {
      margin: 24px -16px 0 0;
    }
  }
}
</style>
