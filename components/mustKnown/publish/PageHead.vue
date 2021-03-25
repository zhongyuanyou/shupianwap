<template>
  <div class="page-head">
    <div class="btn-cancel" @click="cancle">取消</div>
    {{ title }}
    <div v-if="hasVal" class="btn-save blue" @click="submit">草稿</div>
    <div class="btn-submit" :class="hasVal ? 'blue' : 'dark'" @click="submit">
      发布
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '攥写文章',
    },
    hasVal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancle() {
      console.log('取消')
    },
    submit() {
      console.log('发布')
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
  .btn-cancel {
    position: absolute;
    left: 20px;
    top: 0px;
    font-size: 32px;
    color: #999;
    width: 100px;
    font-weight: 400;
  }
  .blue {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #4974f5;
  }
  .dark {
    color: #a7baf2;
  }
  .btn-submit {
    position: absolute;
    right: 20px;
    top: 0px;
    font-weight: 500;
    width: 100px;
    font-size: 32px;
    right: 20px;
  }
  .btn-save {
    position: absolute;
    right: 120px;
    top: 0px;
    font-weight: 500;
    width: 100px;
    font-size: 32px;
  }
}
</style>
