<template>
  <div>
    <div class="btn" @click="openModal">发布文章</div>
    <PublishModal ref="publishModal" />
  </div>
</template>

<script>
import PublishModal from '@/components/mustKnown/PublishModal'
export default {
  components: {
    PublishModal,
  },
  methods: {
    openModal() {
      this.$refs.publishModal.showPop = true
    },
  },
}
</script>

<style></style>
