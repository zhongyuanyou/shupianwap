// import { Quill } from 'vue-quill-editor'
import { oss } from '@/utils/ossUploadimg'
import config from '@/config'
const ossBaseUrl = config.ossBaseUrl
// import { publicApi } from "@/api/index.js";
// 文件上传url
// const uploadUrl =
//   'https://tmicrouag.dgg188.cn/xdy-platform-api/xdy/platform/cms/callbackServer/doGet?bucket=dgg-xiaodingyun&packet=images'
const uploadUrl = ossBaseUrl + '/api/oss/v1/upload'
const fonts = [
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'sans-serif',
]
// const Font = Quill.import('formats/font')
// Font.whitelist = fonts // 将字体加入到白名单
// Quill.register(Font, true)
let itemId
const sendThis = (_this) => {
  itemId = _this
}
const uploadConfig = {
  action: uploadUrl, // 必填参数 图片上传地址
  methods: 'POST', // 必填参数 图片上传方式
  token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
  name: 'file', // 必填参数 文件的参数名
  size: 50000, // 可选参数   图片大小，单位为Kb, 1M = 1024Kb
  accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon', // 可选 可上传的图片格式
}
// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: fonts }],
  [{ align: [] }],
  ['clean'],
  ['link', 'image', 'video'],
]

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
            const length = self.quill.getSelection(true).index
            // 这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。
            self.quill.insertEmbed(length, 'image', res.data.filepath)
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
  placeholder: '请输入内容',
  theme: 'snow', // 主题
  modules: {
    toolbar: {
      container: toolOptions, // 工具栏选项
      handlers, // 事件重写
    },
  },
  handlers,
  sendThis,
}
