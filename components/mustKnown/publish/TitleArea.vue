<template>
  <div class="title-wapper">
    <template v-if="canEdit">
      <div v-show="showInput" class="title-area" @click="edit">
        <div class="content-title" v-html="inputVal"></div>
      </div>
      <section v-show="!showInput">
        <sp-field
          ref="tileArea"
          v-model.trim="inputVal"
          :placeholder="custPlaceholder"
          type="textarea"
          maxlength="50"
          autosize
          show-word-limit
          @blur="blur"
        />
      </section>
    </template>
    <template v-else>
      <div class="title-area">
        <div class="content-title" v-html="title"></div>
      </div>
    </template>
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
    // 设置placeholder
    custPlaceholder: {
      type: String,
      default: '请输入标题',
    },
  },
  data() {
    return {
      showInput: false,
      inputVal: '',
    }
  },
  watch: {
    title() {
      this.inputVal = this.title
      this.showInput = true
    },
  },
  methods: {
    blur() {
      if (this.inputVal === '') {
        return
      }
      // 给父组件传标题
      this.$emit('setTitle', this.inputVal)
      // 改变样式 标题设置显示
      this.showInput = true
    },
    edit() {
      this.showInput = false
      setTimeout(() => {
        this.$refs.tileArea.$refs.input.focus()
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.sp-cell {
  padding: 18px 40px 36px 32px;
  font-size: 40px;
  .sp-field__word-limit {
    font-size: 24px;
  }
}
.title-wapper {
  width: 100%;
  // border-bottom: 1px solid #ddd;
  position: relative;
  &::after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #dddddd;
    -webkit-transform: scaleY(0.6);
    transform: scaleY(0.6);
  }
  .title-area {
    font-size: 40px;
    position: relative;
    padding: 18px 40px 32px;
    .content-title {
      color: #222222;
      line-height: 52px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      word-wrap: break-word;
      word-break: normal;
    }
  }
}
</style>
