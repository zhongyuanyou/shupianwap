<template>
  <div class="text">
    <ServiceIntroduced />
  </div>
</template>

<script>
import ServiceIntroduced from '../../components/spread/common/ServiceIntroduced.vue'
export default {
  components: {
    ServiceIntroduced,
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.text {
  width: 750px;
}
</style>
