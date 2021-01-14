<!--
 * @Author: xiao pu
 * @Date: 2020-11-30 15:03:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-04 18:35:24
 * @Description: file content
 * @FilePath: /chips-wap/components/common/sku/SkuServiceRowItem.vue
-->
<template>
  <div
    class="sku-service-row-item"
    :class="{
      'sku-service-row-item--active': !disabled && isActive,
      'sku-service-row-item--disabled': disabled,
    }"
    @click="handleClick"
  >
    <sp-image
      v-if="skuValue.imgUrl"
      :src="skuValue.imgUrl"
      class="sku-service-row-item__image"
    ></sp-image>
    <span class="sku-service-row-item__name">{{ skuValue.name }}</span>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'

export default {
  name: 'SkuServiceRowItem',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
  },

  props: {
    skuValue: {
      type: Object,
      default() {
        return {}
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    actived: {
      type: Boolean,
      default: false,
    },
    isCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  computed: {},
  watch: {
    actived: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.isActive = newVal
      },
      immediate: true,
    },
  },
  methods: {
    handleClick() {
      console.log('sdf')
      if (this.disabled) return
      // 单选激活状态 再点击不触发
      if (!this.isCancel && this.isActive) return
      // this.isActive = !this.isActive
      this.$emit('skuItemSelect', { ...this.skuValue, actived: !this.isActive })
    },
  },
}
</script>

<style lang="less" scoped>
.sku-service-row-item {
  min-width: 80px;
  height: 64px;
  padding: 0 26px;
  background-color: #f8f8f8;
  border-radius: 4px;
  font-size: 26px;
  font-weight: 400;
  color: #222222;
  line-height: 30px;
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
  &__image {
    width: 40px;
    height: 40px;
    margin-right: 6px;
  }
  &__name {
  }
}
.sku-service-row-item--active {
  color: #4974f5;
  border-color: #4974f5;
  background-color: rgba(255, 255, 255, 0.08);
}
.sku-service-row-item--disabled {
}
</style>
