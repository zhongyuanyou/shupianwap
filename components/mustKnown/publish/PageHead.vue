<template>
  <div class="page-head">
    <div class="btn-cancel" @click="handleCancel">取消</div>
    {{ title }}
    <!-- <div v-if="hasVal" class="btn-save blue" @click="submit">草稿</div> -->
    <div class="btn-submit" :class="hasVal ? 'blue' : 'dark'" @click="submit">
      {{ confirmText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    hasVal: {
      type: Boolean,
      default: false,
    },
    confirmText: {
      type: String,
      default: '发布',
    },
  },
  methods: {
    handleCancel() {
      console.log('取消')
      // this.$router.back(-1)
      this.$emit('handleCancel')
    },
    submit() {
      console.log('发布')
      this.$emit('submit')
    },
  },
}
</script>

<style lang="less" scoped>
.page-head {
  width: 100%;
  height: 88px;
  line-height: 88px;
  padding: 0 20px;
  position: fixed;
  left: 0;
  top: 0;
  font-size: 40px;
  background: white;
  z-index: 2;
  text-align: center;
  border-bottom: 1px solid #dddddd;
  font-size: 36px;
  font-weight: bold;
  color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  .btn-cancel {
    color: #999;
    font-weight: 400;
  }
  .blue {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #4974f5;
  }
  .dark {
    color: #a7baf2;
  }
  .btn-submit {
    font-weight: 500;
    width: auto;
    font-size: 32px;
  }
  // .btn-save {
  //   position: absolute;
  //   right: 120px;
  //   top: 0px;
  //   font-weight: 500;
  //   width: 100px;
  //   font-size: 32px;
  // }
}
</style>
