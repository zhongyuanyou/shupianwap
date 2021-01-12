<template>
  <div class="tel">{{ userInfo.decodePhone }}</div>
</template>

<script>
import { userinfoApi } from '~/api'
export default {
  name: 'Tel',
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="less">
.tel {
  font-size: 36px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #222222;
  line-height: 42px;
  margin-top: 60px;
  margin-bottom: 30px;
}
</style>
