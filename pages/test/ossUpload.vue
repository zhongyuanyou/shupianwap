<template>
  <div class="page">
    <uploadImg />
  </div>
</template>

<script>
import uploadImg from '@/components/common/uploadImg'
export default {
  components: {
    uploadImg,
  },
}
</script>

<style lang="less">
.page {
  width: 100%;
  padding: 40px;
}
</style>
