<!--
 * @Author: xiao pu
 * @Date: 2020-11-30 15:10:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-04 17:41:20
 * @Description: file content
 * @FilePath: /chips-wap/components/common/sku/SkuServiceRow.vue
-->
<template>
  <div class="sku-row" :class="{ 'sp-hairline--bottom': !isSub }">
    <div :class="{ 'sku-row-sub': isSub }">
      <div class="sku-row__title">
        <span>{{ skuRow.k }}</span>
      </div>

      <div class="sku-row__wrap">
        <slot name="default">
          <template v-for="item of formateSkuRowVal">
            <SkuServiceRowItem
              :key="item.id"
              :sku-value="item"
              :actived="item.actived"
              :is-cancel="isCancel"
              @skuItemSelect="handleSelect"
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
          //   isMultiple: false, // 是否多选
        }
      },
    },
    actived: {
      type: Array,
      default() {
        return []
      },
    },
    // 异步选择
    asyncSelect: {
      type: Boolean,
      default: true,
    },
    // 是否像radio， 选中后不能取消, 默认能取消
    isCancel: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentActived: [],
    }
  },
  computed: {
    formateSkuRowVal() {
      const valList = this.skuRow.v
      if (!Array.isArray(valList)) return []
      return valList.map((item) => {
        item = item || {}
        const actived = this.currentActived.includes(item.id)
        return { ...item, actived }
      })
    },
  },
  watch: {
    actived: {
      handler(newVal, oldVal) {
        if (!Array.isArray(newVal)) return
        this.currentActived = newVal
      },
      immediate: true,
    },
  },
  methods: {
    handleSelect(value = {}) {
      const { actived, id } = value
      console.log('handleSelect:', actived, id)
      let activedList = []
      if (!this.asyncSelect) {
        // 多选项
        if (this.skuRow.isMultiple) {
          if (!actived) {
            // 取消
            const index = this.currentActived.indexOf(id)
            if (index > -1) {
              this.currentActived.splice(index, 1)
            }
          } else {
            this.currentActived.push(id)
          }
        } else {
          // 单选
          this.currentActived = actived ? [id] : []
        }
        activedList = this.currentActived.slice()
      } else {
        activedList = this.currentActived.slice()
        if (this.skuRow.isMultiple) {
          if (!actived) {
            // 取消
            const index = activedList.indexOf(id)
            if (index > -1) {
              activedList.splice(index, 1)
            }
          } else {
            activedList.push(id)
          }
        } else {
          // 单选
          activedList = actived ? [id] : []
        }
      }
      const inactivedList = this.skuRow.v.reduce((accumulator, item) => {
        !activedList.includes(item.id) && accumulator.push(item.id)
        return accumulator
      }, [])
      this.$emit('selectChange', {
        activedList,
        inactivedList,
        id: this.skuRow.k_id,
      })
    },
  },
}
</script>

<style lang="less" scoped>
@module-name: .sku-row;

@{module-name} {
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
    margin: 30px 0 0 0;
    font-size: 12px;
  }
  /deep/.sku-service-row-item {
    margin: 0 16px 16px 0;
  }

  &-sub {
    @{module-name}__title {
      font-size: 26px;
      font-weight: 500;
      color: #555555;
      line-height: 30px;
    }
    @{module-name}__wrap {
      margin: 24px 0 0 0;
    }
  }
}
</style>
