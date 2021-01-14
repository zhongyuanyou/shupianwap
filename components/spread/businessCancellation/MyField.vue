<template>
  <div class="field" @click="change">
    <div class="left">
      <slot name="left" />
    </div>
    <input
      v-model="data"
      :type="type"
      :readonly="readonly"
      :maxlength="max"
      :style="{ fontWeight: bold ? 'bold' : '400' }"
      :placeholder="placeholder"
      @input="validate"
    />
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number, undefined],
      required: true,
    },
    type: {
      type: [String],
      default: 'text',
    },
    readonly: {
      type: [Boolean],
      default: false,
    },
    bold: {
      type: [Boolean],
      default: false,
    },
    max: {
      type: [Number],
      default: 50,
    },
    formatter: {
      type: [Function],
      default: null,
    },
    placeholder: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      data: '',
    }
  },
  watch: {
    value() {
      this.data = this.value
    },
    data() {
      this.$emit('input', this.data)
    },
  },
  mounted() {
    this.data = this.value
  },
  methods: {
    change() {
      this.$emit('click')
    },
    /** 控制输入内容 */
    validate() {
      if (this.formatter) {
        this.data = this.formatter(this.data)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.field {
  position: relative;
  width: 100%;
  height: 80px;
  background: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  font-size: 28px;
  margin-bottom: 24px;
  .left {
    display: flex;
    align-items: center;
    position: absolute;
    width: 170px;
    height: 100%;
    font-size: 28px;
    font-weight: 400;
    color: #1a1a1a;
    > img {
      width: 28px;
      height: 28px;
      margin-left: 24px;
      margin-right: 13px;
    }
  }
  > input {
    width: 100%;
    height: 80px;
    padding-left: 179px;
    background: #f8f8f8;
    border: 0;
    outline: 0;
    font-size: 28px;
    font-weight: 400;
    color: #1a1a1a;
    &::placeholder {
      font-size: 28px;
      font-weight: 400;
      color: #cccccc;
    }
  }
  .right {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
  }
}
</style>
