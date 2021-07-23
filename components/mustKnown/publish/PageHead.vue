<template>
  <div class="page-head" :class="showHead2 ? 'page-head2' : ''">
    <div class="btn-cancel" @click="handleCancel">取消</div>
    {{ title }}
    <div class="btn-submit" :class="hasVal ? 'blue' : ''" @click="submit">
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
    top: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showHead2: false,
    }
  },
  mounted() {
    if (window.AlipayJSBridge) {
      this.showHead2 = true
    }
  },
  methods: {
    handleCancel() {
      this.$emit('handleCancel')
    },
    submit() {
      this.$emit('submit')
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep.my-head {
  box-shadow: unset !important;
}

.page-head {
  position: fixed;
  left: 0;
  width: 100%;
  height: 88px;
  line-height: 88px;
  padding: 0 32px;
  font-size: 40px;
  background: white;
  z-index: 2;
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #1a1a1a;
  display: flex;
  justify-content: space-between;
  .btn-cancel {
    color: #999;
    font-weight: 400;
    font-size: 32px;
  }
  .btn-submit {
    font-weight: bold;
    width: auto;
    font-size: 32px;
    color: #b6c7fb;
  }
  .blue {
    color: #4974f5;
  }
  // .btn-save {
  //   position: absolute;
  //   right: 120px;
  //   top: 0px;
  //   font-weight: bold;
  //   width: 100px;
  //   font-size: 32px;
  // }
}
.page-head2 {
  height: 168px !important;
  padding: 80px 32px 0 32px !important;
}
</style>
