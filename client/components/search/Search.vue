<template>
  <div class="search-content">
    <slot name="left"></slot>
    <div class="input-box">
      <slot name="center"></slot>
      <my-icon
        class="search-icon"
        name="sear_ic_sear"
        size="0.3rem"
        color="#999999"
        :style="{ marginLeft: iconLeft + 'rem' }"
      ></my-icon>
      <input
        v-model="value"
        type="text"
        :placeholder="placeholder"
        @input="searchInputHandle"
        @blur="searchBlurHandle"
        @focus="searchFocusHandle"
      />
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: '请输入城市名称',
    },
    // 搜索图标距离左边的位置
    iconLeft: {
      type: Number,
      default: 0.35,
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    // input 事件
    searchInputHandle() {
      this.$emit('searchInputHandle', this.value)
    },
    // 失焦 事件
    searchBlurHandle() {
      this.$emit('searchBlurHandle')
    },
    // 触焦 事件
    searchFocusHandle() {
      this.$emit('searchFocusHandle')
    },
    // 清除输入内容
    clearInputValue() {
      this.value = ''
    },
  },
}
</script>
<style lang="less" scoped>
.search-content {
  display: flex;
  align-items: center;
  width: 100%;
  height: 128px;
  background: #ffffff;
  padding: 16px 40px;
  box-sizing: border-box;
  .input-box {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    input {
      flex: 1;
      font-size: 30px;
      font-weight: bold;
      font-family: PingFang SC;
      border: none;
      font-size: 30px;
      &::placeholder {
        color: #999999;
      }
    }
    .search-icon {
      margin-right: 17px;
    }
  }
}
</style>
