<template>
  <header-slot>
    <div class="page-head">
      <div class="btn-cancel" @click="handleCancel">取消</div>
      {{ title }}
      <div class="btn-submit" :class="hasVal ? 'blue' : ''" @click="submit">
        {{ confirmText }}
      </div>
    </div>
  </header-slot>
</template>

<script>
import HeaderSlot from '@/components/common/head/HeaderSlot'

export default {
  components: {
    HeaderSlot,
  },
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
      this.$emit('handleCancel')
    },
    submit() {
      this.$emit('submit')
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.my-head {
  box-shadow: unset !important;
}

.page-head {
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
    font-weight: 500;
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
  //   font-weight: 500;
  //   width: 100px;
  //   font-size: 32px;
  // }
}
</style>
