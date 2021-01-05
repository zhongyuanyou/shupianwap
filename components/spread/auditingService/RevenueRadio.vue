<template>
  <div class="content-item">
    <div class="content-item-title">{{ title }}</div>
    <div class="content-item-all-tab">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="content-item-one-tab"
        :class="[
          tabWidthClass,
          tab === value ? 'content-item-one-tab-active' : '',
          noMarginRight.indexOf(tab) > -1
            ? ''
            : 'content-item-one-tab-margin-right',
        ]"
        @click="clickTab(tab)"
      >
        {{ tab }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectTab',
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      },
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      },
    },
    noMarginRight: {
      type: Array,
      default: () => {
        return []
      },
    },
    title: {
      type: String,
      default: () => {
        return ''
      },
    },
    tabWidthClass: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    clickTab(value) {
      this.$emit('update:value', value)
    },
  },
}
</script>

<style lang="less" scoped>
.content-item {
  margin-bottom: 40px;
  .content-item-title {
    height: 34px;
    font-size: 36px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 32px;
  }
  .content-item-all-tab {
    display: flex;
    //justify-content: center;
    flex-wrap: wrap;
    .content-item-one-tab {
      width: 150px;
      height: 72px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8f8f8;
      border-radius: 8px;
      font-size: 24px;
      font-weight: 400;
      color: #222222;
      text-align: center;
      margin-bottom: 24px;
    }
    // 判断后的样式
    .content-item-one-tab-active {
      background: #ffffff;
      border: 3px solid #000000;
    }
    .content-item-one-tab-margin-right {
      margin-right: 23px;
    }
    .tab-width-class1 {
      width: 149px !important;
    }
    .tab-width-class2 {
      width: 207px !important;
    }
  }
}
</style>
