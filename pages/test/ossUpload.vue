<template>
  <div class="page">
    <uploadImg
      :img-num="imgNum"
      :img-list="imgList"
      @beforeUpload="beforeUpload"
      @afterUpload="afterUpload"
    />
  </div>
</template>

<script>
import uploadImg from '@/components/common/uploadImg'
export default {
  components: {
    uploadImg,
  },
  data() {
    return {
      imgList: [],
      imgNum: 10,
    }
  },
  methods: {
    beforeUpload(e) {
      console.log(e)
    },
    afterUpload(data) {
      console.log(data)
    },
  },
}
</script>

<style lang="less">
.page {
  width: 100%;
  padding: 40px;
}
</style>
