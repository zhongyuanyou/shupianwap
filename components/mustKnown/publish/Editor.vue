<template xmlns:v-quill="富文本编辑器">
  <div class="edit-container">
    <div
      v-quill:myQuillEditor="editorOption"
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
      <p>请在此处输入内容</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            // ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
            // ["blockquote", "code-block"], // 引用代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题

            // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表

            // [{ script: "sub" }, { script: "super" }], // 上标/下标

            // [{ indent: "-1" }, { indent: "+1" }], // 缩进

            // [{'direction': 'rtl'}], // 文本方向

            [{ size: ['small', false, 'large', 'huge'] }], // 字体大小

            // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题

            // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色

            // [{ font: [] }], // 字体种类

            // [{ align: [] }], // 对齐方式

            // ["clean"], // 清除文本格式
            ['image'], // 链接、图片、视频
          ],
        },
      },
    }
  },
  computed: {
    content: {
      get() {
        return this.initContent
      },
      set(val) {
        return val
      },
    },
  },
  methods: {
    onEditorChange(a) {
      console.log('onEditorChange', a)
      this.$emit('editorChange', a)
    },
    onEditorFocus(a) {
      console.log('onEditorFocus', a)
    },
    onEditorBlur(a) {
      console.log('onEditorBlur', a)
    },
    onEditorReady(a) {
      console.log('onEditorReady', a)
    },
  },
}
</script>
<style lang="less" scoped>
.edit-container {
  margin: 40px 0;
  .ql-editor {
    min-height: 100px;
  }
  .ql-toolbar {
    position: fixed;
  }
  .ql-toolbar.ql-snow {
    position: fixed !important;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 88px;
  }
}
</style>
<style lang="css" scoped>
.ql-editor {
  min-height: 100px !important;
}
.ql-toolbar {
  position: fixed;
}
.edit-container .ql-toolbar {
  position: fixed !important;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 88px;
}
</style>
