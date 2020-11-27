<!--
 * @Author: xiao pu
 * @Date: 2020-11-21 15:13:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-27 16:18:55
 * @Description: file content
 * @FilePath: /chips-wap/client/components/common/serviceSelected/ServiceSelect.vue
-->
<template>
  <div class="service-select">
    <sp-tree-select
      :items="items"
      :active-id.sync="activeIds"
      :main-active-index.sync="active"
      @click-nav="handleClickNav"
    >
      <template #content>
        <div class="service-select__content">
          <div
            v-for="item of childrenList"
            :key="item.text"
            class="service-select__item"
            :class="{
              'service-select__item--active': selectData[1].services.some(
                (service) => service.id === item.id
              ),
            }"
            @click="handleClickItem(item)"
          >
            <p>{{ item.text }}</p>
            <div class="service-select__icon">
              <sp-icon
                name="success"
                class="service-select__icon--success"
                color="#4974F5"
                size="0.2rem"
              />
            </div>
          </div>
        </div>
      </template>
    </sp-tree-select>
    <div class="fixed-half-opacity"></div>
  </div>
</template>

<script>
import { TreeSelect, Icon } from '@chipspc/vant-dgg'
import clone from '@/utils/clone'
import objectDiff from '@/utils/objectDiff'

const initSelectData = [{}, { services: [] }]

export default {
  name: 'ServiceSelect',
  components: {
    [TreeSelect.name]: TreeSelect,
    [Icon.name]: Icon,
  },
  props: {
    items: {
      type: Array,
      default() {
        return [
          {
            text: '不限',
            id: '0',
            className: 'my-class',
            children: [
              {
                text: '不限',
                id: -1,
              },
            ],
          },
          {
            text: '工商服务',
            id: '1',
            className: 'my-class',
            children: [
              {
                text: '不限',
                id: -1,
              },
              {
                text: '有限公司注册',
                id: 1,
              },
              {
                text: '外资公司注册',
                id: 2,
                disabled: true,
              },
              {
                text: '印章',
                id: 3,
              },
              {
                text: '公司地址变更',
                id: 4,
              },
            ],
          },
          {
            text: '会计财税',
            id: '2',
            className: 'my-class',
            children: [],
          },
          {
            text: '知产服务',
            id: '3',
            className: 'my-class',
            children: [],
          },
        ]
      },
    },
    activeData: {
      type: Array,
      default() {
        return initSelectData
      },
    },
  },
  data() {
    return {
      active: 0,
      activeIds: [-1],
      selectData: initSelectData,
    }
  },
  computed: {
    childrenList() {
      if (
        !Array.isArray(this.items) ||
        !this.items[this.active] ||
        !Array.isArray(this.items[this.active].children)
      ) {
        return []
      }

      return this.items[this.active].children
    },
  },
  watch: {
    activeData: {
      handler(newVal, odlVal) {
        if (objectDiff.diffOwnProperties(newVal, odlVal).changed === 'equal') {
          return
        }

        if (
          objectDiff.diffOwnProperties(newVal, this.selectData).changed ===
          'equal'
        ) {
          return
        }

        if (!Array.isArray(newVal) || !newVal[0]) {
          this.selectData = clone(initSelectData, true)
        } else {
          this.selectData = clone(newVal, true)
        }
        this.items.forEach((item, index) => {
          if (this.selectData[0].id === item.id) {
            this.active = index
          }
        })
      },
      immediate: true,
    },

    selectData(newVal) {
      this.$emit('select', clone(newVal, true))
    },
  },

  mounted() {},
  methods: {
    handleClickNav(navIndex) {
      console.log('navIndex:', navIndex)
      const navItem = (this.items && this.items[0]) || {}
      this.$set(this.selectData, 0, { id: navItem.id, text: navItem.text })
      this.$set(this.selectData, 1, { services: [this.childrenList[0]] })

      //   this.$emit('select', [...this.selectData])
    },
    handleClickItem(item = {}) {
      console.log('item:', item)
      const { id, text } = item
      const firstItem = this.childrenList[0] || {}
      let services = this.selectData[1].services || []
      const isSelected = services.some((service) => service.id === id)
      if (firstItem.id === id) {
        // 只要点击了 不限 ,就只能是第一个
        services = [item]
      } else if (isSelected) {
        services = services.filter((service) => service.id !== id)
      } else {
        services = services
          .concat({ ...item })
          .filter((service) => service.id !== firstItem.id) // 只要点击其他项 选中的里面有不限，则删除不限
      }

      this.$set(this.selectData, 1, { services })

      //   this.$emit('select', [...this.selectData])
    },
  },
}
</script>

<style lang="less" scoped>
.service-select {
  background: #fff;
  display: flex;
  flex-direction: column;
  /deep/.sp-tree-select {
    min-height: 200px;
    max-height: 400px;
    flex: 1 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .sp-tree-select__nav {
      flex: 190px 0 1;
      .sp-sidebar-item {
        padding: 30px 40px;
        color: @text-main-color;
        font-size: 28px;
        font-weight: 400;
        background-color: #f0f0f0;
      }
      .sp-sidebar-item--select {
        color: @main-color;
        font-weight: bold;
        background-color: #f8f8f8;
        &::before {
          display: none;
        }
      }
    }
    .sp-tree-select__content {
      background-color: #f8f8f8;
    }
  }
  &__content {
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 30px 40px;
    color: @text-main-color;
    font-size: 28px;
    font-weight: 400;
    line-height: 40px;
    &--active {
      color: @main-color;
      font-weight: bold;
      .service-select__icon {
        border-color: @main-color !important;
        .service-select__icon--success {
          display: inline-block !important;
        }
      }
    }
    p {
      flex: 1;
    }
  }
  .service-select__icon {
    width: 28px;
    height: 28px;
    background: #f8f8f8;
    border: 2px solid #cdcdcd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    .service-select__icon--success {
      display: none;
    }
  }
  .fixed-half-opacity {
    pointer-events: none;
    height: 84px;
    margin-top: -84px;
    z-index: 0;
    background-image: linear-gradient(0deg, #ffffff, rgba(255, 255, 255, 0));
  }
}
</style>
