<template>
  <div>
    <sp-button @click="jiami">加密</sp-button>
    <div class="btn" @click="openModal">发布文章</div>
    <!-- <PublishModal ref="publishModal" /> -->
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import PublishModal from '@/components/mustKnown/PublishModal'
export default {
  components: {
    // PublishModal,
    [Button.name]: Button,
  },
  mounted() {
    // this.jiami()
  },
  methods: {
    openModal() {
      this.$refs.publishModal.showPop = true
    },
    jiami() {
      this.$axios
        .get(
          'http://dspmicrouag.shupian.cn/crisps-c-middle-service-api/nk/encryptAndDecrypt/encryption_data.do',
          {
            parmas: {
              stayEncryptData: 134567890112,
            },
          }
        )
        .then((res) => {
          console.log('res', res)
        })
    },
  },
}
</script>

<style></style>
