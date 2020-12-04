<!--
 * @Author: ma liang
 * @Date: 2020-11-22 10:13:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 10:13:23
 * @Description: Search
 * @FilePath: /chips-wap/client/components/common/search/Search.vue
-->
<template>
  <div
    class="search-content"
    :style="{ backgroundColor: 'rgba(255,255,255,' + opacity + ')' }"
  >
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
        v-if="!disabled"
        ref="inputRef"
        v-model="visible"
        :type="type"
        :placeholder="placeholder"
        @input="searchInputHandle"
        @blur="searchBlurHandle"
        @focus="searchFocusHandle"
        @keydown="searchKeydownHandle"
      />
      <!-- s 禁用输入框时，隐藏真实输入款，模拟一个输入框 -->
      <span v-else class="imitate-input" @click="clickInputHandle">{{
        placeholder
      }}</span>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: 'Search',
  model: {
    props: 'value',
    event: 'valChangeHandle',
  },
  props: {
    // 输入框绑定的值
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '请输入城市名称',
    },
    // 搜索图标距离左边的位置
    iconLeft: {
      type: Number,
      default: 0.35,
    },
    // 背景透明度
    opacity: {
      type: Number,
      default: 1,
    },
    // 输入框类型
    type: {
      type: String,
      default: 'search',
    },
    // 是否禁用输入
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visible: {
      get() {
        return this.value
      },
      set(val) {
        // 值变化
        this.$emit('valChangeHandle', val)
      },
    },
  },
  methods: {
    // input 事件
    searchInputHandle(e) {
      this.$emit('searchInputHandle', e)
    },
    // 失焦 事件
    searchBlurHandle(e) {
      this.$emit('searchBlurHandle', e)
    },
    // 触焦 事件
    searchFocusHandle(e) {
      this.$emit('searchFocusHandle', e)
    },
    // 点击 事件
    clickInputHandle() {
      this.$emit('clickInputHandle')
    },
    // 回车 事件
    searchKeydownHandle(e) {
      if (e.keyCode === 13) {
        this.$refs.inputRef.blur()
        this.$emit('searchKeydownHandle', e)
      }
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
  padding: 16px 40px;
  box-sizing: border-box;
  font-size: 24px;
  position: relative;
  z-index: 1;
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
      color: #1a1a1a;
      &::-webkit-search-cancel-button {
        -webkit-appearance: none; //此处去掉默认的小×
      }
      &[disabled='disabled'] {
        background-color: #fff;
      }
      &::placeholder {
        color: #999999;
      }
    }
    .imitate-input {
      flex: 1;
      font-size: 30px;
      font-weight: bold;
      font-family: PingFang SC;
      border: none;
      font-size: 30px;
      color: #1a1a1a;
      color: #999999;
    }
    .search-icon {
      margin-right: 17px;
    }
  }
}
</style>
