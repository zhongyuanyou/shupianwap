<template>
  <div class="box">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="list"
      :class="sortactive.code == item.code ? 'act' : ''"
      @click="activefn(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    sortactive: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    activefn(item) {
      this.$emit('sortfn', item)
    },
  },
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  padding: 55px 40px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  box-sizing: border-box;
  color: #222222;
  > .list {
    margin-top: 40px;
  }
  > .list:nth-child(1) {
    margin-top: 0px;
  }
  > .act {
    color: #4974f5;
  }
}
</style>
