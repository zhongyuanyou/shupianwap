<template>
  <div>
    <sp-nav-bar title="税务筹划">
      <template #left>
        <sp-icon class-prefix="sp-iconfont" name="specialreturn2" />
      </template>
    </sp-nav-bar>
  </div>
</template>

<script>
import { Icon, NavBar } from '@chipspc/vant-dgg'
export default {
  name: 'HeadVue',
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
  },
  methods: {},
}
</script>

<style scoped></style>
