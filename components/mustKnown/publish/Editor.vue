<template xmlns:v-quill="富文本编辑器">
  <div class="edit-container">
    <div
      v-quill:myQuillEditor="editorOption"
      class="quill-editor"
      :content="content"
      :placeholder="custPlaceholder"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    ></div>
  </div>
</template>
<script>
const uploadConfig = {
  action: 'https://spapi.shupian.cn/api/oss/v1/upload', // 必填参数 图片上传地址
  methods: 'POST', // 必填参数 图片上传方式
  token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'img', // 必填参数 文件的参数名
  size: 500, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon', // 可选 可上传的图片格式
}
const dataURLtoBlob = function (dataurl) {
  const arr = dataurl.split(',')
  // 注意base64的最后面中括号和引号是不转译的
  const _arr = arr[1].substring(0, arr[1].length - 2)
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(_arr)
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}
let itemId
const sendThis = (_this) => {
  itemId = _this
}
const handlers = {
  image: function image() {
    const self = this
    let fileInput = this.container.querySelector('input.ql-image[type=file]')
    if (fileInput === null) {
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      // 设置图片参数名
      if (uploadConfig.name) {
        fileInput.setAttribute('name', uploadConfig.name)
      }
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', uploadConfig.accept)
      fileInput.classList.add('ql-image')
      // 监听选择文件
      fileInput.addEventListener('change', function () {
        console.log('change', 111)
        // 创建formData
        const formData = new FormData()
        formData.append(uploadConfig.name, fileInput.files[0])
        formData.append('fileId', itemId)
        formData.append('isDeleteOriginalFile', false)
        formData.append('type', `FLSC_HELP_${itemId}`)
        // 如果需要token且存在token
        if (uploadConfig.token) {
          formData.append('token', uploadConfig.token)
        }
        // 图片上传
        const xhr = new XMLHttpRequest()
        xhr.open(uploadConfig.methods, uploadConfig.action, true)
        // 上传数据成功，会触发
        xhr.onload = function () {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText)
            console.log('res', res)
            const length = self.quill.getSelection(true).index
            // 这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
            self.quill.insertEmbed(length, 'image', res.data.url)
            self.quill.setSelection(length + 1)
          }
          fileInput.value = ''
        }
        // 开始上传数据
        xhr.upload.onloadstart = function () {
          fileInput.value = ''
        }
        // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
        xhr.upload.onerror = function () {}
        // 上传数据完成（成功或者失败）时会触发
        xhr.upload.onloadend = function () {
          // console.log('上传结束')
        }
        xhr.send(formData)
      })
      this.container.appendChild(fileInput)
    }
    fileInput.click()
  },
}
export default {
  props: {
    initContent: {
      type: String,
      default: '',
    },
    custPlaceholder: {
      type: String,
      default: '请在此处输入内容',
    },
  },
  data() {
    return {
      editorOption: {
        // some quill options
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'], // 加粗 斜体 下划线 删除线 ['bold', 'italic', 'underline', 'strike']
              // ["blockquote", "code-block"], // 引用代码块
              [{ header: 1 }, { header: 2 }], // 1、2 级标题  [{ header: 1 }, { header: 2 }]

              // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表

              // [{ script: "sub" }, { script: "super" }], // 上标/下标

              // [{ indent: "-1" }, { indent: "+1" }], // 缩进

              // [{'direction': 'rtl'}], // 文本方向

              // [{ size: ['small', false, 'large'] }], // 字体大小 [{ size: ['small', false, 'large', 'huge'] }]

              // [{ header: [1, 2] }], // 标题   [{ header: [1, 2, 3, 4, 5, 6, false] }]

              // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色

              // [{ font: [] }], // 字体种类

              // [{ align: [] }], // 对齐方式

              // ["clean"], // 清除文本格式
              ['image'], // 链接、图片、视频
            ],
            handlers,
          },
        },
      },
      setHeaders: {},
      imgUploadUrl: 'https://dspapi.shupian.cn/api/oss/v1/upload',
      token: '',
      formData: {
        file: '',
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
<style lang="less">
.edit-container {
  min-height: 400px;
}
</style>
<style lang="css">
/* .ql-editor {
  min-height: 100px !important;
} */
/* .ql-toolbar {
  position: fixed;
} */
/* .edit-container .ql-toolbar {
  position: fixed !important;
  left: 0;
  bottom: 40px;
  width: 100%;
  height: auto;
} */
</style>
<style lang="css">
.editor {
  line-height: normal !important;
  height: 500px;
}
/* .ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
} */

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '中';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '小';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '大';
}
/* .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
} */

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}

.ql-editor.ql-blank::before {
  color: rgba(0, 0, 0, 0.6);
  content: '请在此处输入内容';
  font-style: italic;
  left: 15px;
  pointer-events: none;
  position: absolute;
  right: 15px;
}
/* .ql-toolbar.ql-snow {
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  padding: 0 8px;
  text-align: right;
}
.ql-formats {
  margin-right: 10px;
} */
/* .ql-snow .ql-picker.ql-size {
  width: 120px;
} */
.ql-snow .ql-picker.ql-size {
  width: 1.2rem;
}
.ql-snow .ql-picker.ql-header {
  width: 1.5rem;
}
.ql-toolbar.ql-snow .ql-formats {
  margin-right: 0;
}
/* 字体选择样式处理汉化 */
.ql-toolbar.ql-snow .ql-formats button {
  position: relative;
  width: 1rem;
}
.ql-toolbar.ql-snow .ql-formats .ql-header {
  width: 60px !important;
  margin-left: 4px;
}
.ql-toolbar.ql-snow .ql-formats:nth-child(1) button svg {
  display: none;
}
.ql-toolbar.ql-snow .ql-formats button::before {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0.24rem;
  line-height: 0.52rem;
  width: 100%;
  height: 100%;
  color: #222;
}

.ql-toolbar.ql-snow .ql-formats .ql-bold::before {
  content: '加粗';
  font-weight: bold;
}

.ql-toolbar.ql-snow .ql-formats .ql-italic::before {
  content: '斜体';
  font-style: italic;
}
.ql-toolbar.ql-snow .ql-formats .ql-underline::before {
  content: '下划线';
  text-decoration: underline;
}
.ql-toolbar.ql-snow .ql-formats .ql-strike::before {
  content: '中横线';
  text-decoration: line-through;
}
/* 选择图片样式修改 */
.ql-toolbar.ql-snow .ql-formats:nth-child(4) {
  width: 0.7rem;
}

.ql-toolbar.ql-snow {
  border: none;
  background: white;
}
.ql-container.ql-snow {
  border: none;
}
.ql-container {
  font-size: 34px;
  font-family: PingFangSC-Regular, PingFang SC;
}
.ql-container .ql-editor {
  padding: 0 32px;
  padding-top: 40px;
}
.ql-container .ql-editor.ql-blank::before {
  font-style: unset;
  font-weight: 400;
  color: #9e9e9e;
  left: 32px;
}
.ql-toolbar.ql-snow {
  border: none;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
}
</style>
