<template>
  <div class="title-wapper">
    <div v-show="showInput" class="title-area" @click="edit">
      <p class="content-title">{{ inputVal }}</p>
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
  mounted() {},
  methods: {
    blur() {
      if (this.inputVal === '') {
        /*
        this.$xToast.show({
          message: '标题不能为空',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
        */
        this.$refs.tileArea.$refs.input.focus()
        return
      }
      // 给父组件传标题
      this.$emit('setTitle', this.inputVal)
      // 改变样式 标题设置显示
      this.showInput = true
    },
    edit() {
      this.showInput = false
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
    color: #ff3b30;
  }
}
.title-area {
  width: 100%;
  font-size: 40px;
  position: relative;
  padding: 18px 40px 32px;
  border-bottom: 1px solid #ddd;
  .content-title {
    color: #222222;
    line-height: 52px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
  }
}
</style>
