<template>
  <div class="box">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="list"
      :class="active == index ? 'act' : ''"
      @click="activefn(index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [{ name: '从低到高' }, { name: '从高到低' }],
      active: -1,
    }
  },
  methods: {
    activefn(index) {
      this.active = index
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
