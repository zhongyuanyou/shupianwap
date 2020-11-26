<template>
  <div class="wrapper">
    <Header title="问题解答" @leftClickFuc="onClickLeft" />
  </div>
</template>

<script>
import Header from '@/components/common/my/header/header'
export default {
  name: 'Questions',
  components: { Header },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.wrapper {
}
</style>
