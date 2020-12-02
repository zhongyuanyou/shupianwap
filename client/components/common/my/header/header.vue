<template>
  <div class="my-head">
    <sp-top-nav-bar
      :title="title"
      left-arrow
      ellipsis
      @on-click-left="onLeftClick"
    >
      <template #left>
        <sp-icon class-prefix="sp-iconfont" name="specialreturn2" />
      </template>
    </sp-top-nav-bar>
  </div>
</template>

<script>
import { TopNavBar, Icon, Cell, CellGroup } from '@chipspc/vant-dgg'
export default {
  name: 'Header',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
  },
  props: {
    title: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLeftClick() {
      this.$emit('leftClickFuc')
    },
  },
}
</script>
<style lang="less" scoped>
.my-head {
  /deep/ .sp-iconfont {
    font-size: 40px;
  }
}
</style>
