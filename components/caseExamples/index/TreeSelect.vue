<template>
  <div class="tree_select">
    <div class="col_container">
      <div class="col_1">
        <div
          v-for="(row, index) of col_1"
          :key="index"
          :class="{ active: active_1.id == row.id }"
          @click.stop="rowClick(1, row, index)"
        >
          {{ row.text }}
        </div>
      </div>

      <div class="col_2">
        <div
          v-for="(row, index) of col_2"
          :key="index"
          :class="{ active: active_2.id == row.id }"
          @click.stop="rowClick(2, row, index)"
        >
          {{ row.text }}
        </div>
      </div>

      <div class="col_3">
        <div
          v-for="(row, index) of col_3"
          :key="index"
          :class="{ active: active_3.id == row.id }"
          @click.stop="rowClick(3, row, index)"
        >
          <div>{{ row.text || row.name }}</div>
          <div v-show="active_3.id === row.id">
            <my-icon name="yiguanzhu" color="#4974F5" size="0.28rem" />
          </div>
        </div>
      </div>
    </div>

    <BottomConfirm
      class="BottomConfirm"
      @resetFilters="reset"
      @confirmFilters="confirm"
    ></BottomConfirm>
  </div>
</template>

<script>
import clone from '@/utils/clone'
import BottomConfirm from '@/components/common/filters/BottomConfirm.vue'

export default {
  components: {
    BottomConfirm,
  },

  props: {
    // 层级
    level: {
      type: Number || String,
      default: 2,
    },

    list: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      col_1: [], // 第一列的数据
      col_2: [],
      col_3: [],

      active_1: {}, // 第一列激活的对象
      active_2: {},
      active_3: {},

      selected_ids: [],

      formatList: [],
    }
  },
  // computed: {
  //   formatList() {
  //     if (!Array.isArray(this.list)) return []
  //     const cloneItem = clone(this.list, true)
  //     console.log(cloneItem)
  //     return this.setData(cloneItem)
  //   },
  // },
  watch: {
    list: {
      immediate: true,
      deep: true,
      handler(newVal) {
        console.log('监听变化')
        const cloneItem = clone(this.list, true)
        this.formatList = this.setData(cloneItem)

        this.init()
      },
    },
  },

  methods: {
    rowClick(num, row, index) {
      if (num === 1) {
        this.active_1 = row
        this.active_2 =
          this.active_1.children && this.active_1.children.length > 0
            ? this.active_1.children[0]
            : {}
        this.active_3 =
          this.active_2.children && this.active_2.children.length > 0
            ? this.active_2.children[0]
            : {}

        this.col_2 = this.active_1.children || []
        this.col_3 = this.active_2.children || []
      } else if (num === 2) {
        this.active_2 = row
        this.active_3 =
          this.active_2.children && this.active_2.children.length > 0
            ? this.active_2.children[0]
            : {}

        this.col_3 = this.active_2.children || []
      } else if (num === 3) {
        this.active_3 = row
      }
    },
    init() {
      this.setData(this.formatList)

      this.col_1 = this.formatList

      this.rowClick(1, this.formatList.length > 0 ? this.formatList[0] : [])
    },
    setData(formatList) {
      return formatList.map((item) => {
        item.text = item.name

        if (item.children) {
          item.children = this.setData(item.children)
        }
        return item
      })
    },

    reset() {
      this.init()
      this.callback()
    },
    confirm() {
      this.callback()
    },
    callback() {
      this.$emit(
        'select',
        this.active_1 || {},
        this.active_2 || {},
        this.active_3 || {}
      )
    },
  },
}
</script>

<style lang="less" scoped>
.tree_select {
  height: 60vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .col_container {
    // height: 100%;
    flex: 1;
    display: flex;
    overflow: hidden;

    .col_1,
    .col_2,
    .col_3 {
      font-family: PingFangSC;
      font-size: 28px;
      color: #222222;
      letter-spacing: 0;
      line-height: 28px;
      overflow-y: auto;
      height: 100%;
      > div {
        padding: 28px 12px 28px 40px;
      }
    }
    .active {
      font-weight: bold;
      color: #4974f5;
      background-color: #fff;
    }

    .col_1 {
      width: 186px;
      background: #f0f0f0;
    }
    .col_2 {
      width: 240px;
      background: #f8f8f8;
    }

    .col_3 {
      flex: 1;

      background: #ffffff;
      line-height: 34px;
    }
    .col_3 > div {
      display: flex;
    }
    .col_3 > div > div:nth-child(1) {
      flex: 1;
    }
    .col_3 > div > div:nth-child(2) {
      width: 28px;
      height: 28px;
      padding: 0 40px;
    }
  }

  .BottomConfirm {
    flex-shrink: 0;
  }
}
</style>
