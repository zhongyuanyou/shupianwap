<template>
  <div class="input">
    <div v-if="!canEdit" class="title-area">
      <p class="content-title">{{ title }}</p>
    </div>
    <section v-else>
      <div v-show="hideInput" class="title-area">
        <p class="content-title" @click="handleClickTitle">{{ title }}</p>
        <p v-if="overNum > 0" class="more-text">超出{{ overNum }}个字符</p>
      </div>
      <sp-field
        v-show="!hideInput"
        v-model="inputVal"
        placeholder="请输入标题"
        type="textarea"
        rows="1"
        maxlength="80"
        autosize
        @input="inputTitle"
        @blur="blur"
      />
    </section>
  </div>
</template>

<script>
// 本组件支持标题编辑显示效果等
import { Field } from '@chipspc/vant-dgg'
export default {
  components: {
    [Field.name]: Field,
  },
  props: {
    // 标题最大长度
    maxLength: {
      type: Number,
      default: 60,
    },
    // 输入框最大长度
    inputLength: {
      type: Number,
      default: 80,
    },
    // 标题
    title: {
      type: String,
      default: '',
    },
    // 是否可修改
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      hideInput: false,
      inputVal: '',
    }
  },
  computed: {
    overNum() {
      return this.inputVal.length - this.maxLength
    },
  },
  methods: {
    handleClickTitle() {
      this.hideInput = false
    },
    blur(a) {
      this.$emit('setTitle', this.inputVal)
      if (this.inputVal) this.hideInput = true
    },
    inputTitle(a) {
      console.log('a', a)
    },
  },
}
</script>

<style lang="less" scoped>
.title-area {
  width: 100%;
  font-size: 40px;
  position: relative;
  padding: 20px 32px;
  border-bottom: 1px solid #ddd;
  .content-title {
    color: #222222;
    line-height: 52px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    font-size: 40px;
  }
  .more-text {
    width: auto;
    height: 24px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff3b30;
    line-height: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: right;
  }
}
</style>
