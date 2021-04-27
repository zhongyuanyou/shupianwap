<template>
  <div>
    <LoadingCenter v-show="loading" />
  </div>
</template>

<script>
import LoadingCenter from '@/components/common/loading/LoadingCenter'

export default {
  layout: 'appSafeView',
  components: {
    LoadingCenter,
  },

  data() {
    return {
      loading: true,
    }
  },
  created() {
    this.$router.replace({
      path: this.$route.query.page,
      query: {
        id: this.$route.query.id,
      },
    })
  },
}
</script>

<style></style>
