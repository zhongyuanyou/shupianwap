<template>
  <div>
    <!--S 搜索-->
    <FoundHeader :left="true" />
    <!--E 搜索-->
  </div>
</template>

<script>
import FoundHeader from '~/components/found/common/FoundHeader'
export default {
  name: 'Keywords',
  components: {
    FoundHeader,
  },
}
</script>

<style scoped></style>
