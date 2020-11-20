<template>
  <!-- tab 切换组件     -->
  <div class="tab-curve">
    <ul class="tab-curve-list">
      <li v-for="(item, index) in tabList" :key="index">{{ item.label }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TabCurve',
  props: {
    tabList: {
      type: Array,
      default: () => {
        return [
          {
            label: '限时特惠',
            code: '1',
          },
          {
            label: '内容待定',
            code: '2',
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.tab-curve {
  &-list {
    display: flex;
    // font-size: 22px;
  }
}
</style>
