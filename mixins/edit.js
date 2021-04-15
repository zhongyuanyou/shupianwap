import knownApi from '@/api/known'
let timeoute
export default {
  data() {
    return {
      editType: '', // 内容类型 1 新增 2编辑
      // 新增内容的表单数据
      formData: {
        categoryCode: '', // 分类code
        categoryId: '', // 分类id
        categoryLevelIds: '', // 分类层级id
        categoryName: '', // 分类名称
        sourceId: '', // 问题id 添加回答时必传
        content: '', // 文章/问题/回答内容 （type为问题时不必传）
        contentText: '', // 文章/问题/回答纯文本内容（type为问题时不必传）
        title: '', // 标题
        type: '', // 类型：1问题  2文章 3回答
        userCode: 'U2100607057',
        userId: '767579755195165966',
        userName: 'dsdadsada', //
        userType: '1', // 作者类型 1 普通用户 2 规划师
      },
      topics: [], // 话题
      topicStr: '',
      id: '', // 内容id
      isFromApp: '', // 是否从APP跳转
    }
  },
  beforeDestroy() {
    if (timeoute) clearTimeout(timeoute)
  },
  mounted() {
    // 获取参数
    this.editType = this.$route.query.editType
    this.id = this.$route.query.id
    this.isFromApp = this.$route.query.isFromApp
    this.fromPage === 'question'
      ? (this.formData.type = 1)
      : this.fromPage === 'article'
      ? (this.formData.type = 2)
      : (this.formData.type = 3)
  },
  methods: {
    getImgSrc(richtext) {
      const imgList = []
      richtext.replace(
        /<img [^>]*src=['"]([^'"]+)[^>]*>/g,
        (match, capture) => {
          imgList.push(capture)
        }
      )
      return imgList
    },
    setTitle(val) {
      this.formData.title = val
      console.log('this.formData', this.formData)
    },
    setTopic(val) {
      this.topics = val
      const arr = val.map((item) => {
        return item.name
      })
      this.topicStr = arr.join(',')
      this.formData.categoryName = this.topicStr
      const arr2 = val.map((item) => {
        return item.code
      })
      this.formData.categoryCode = arr2.join(',')
      const arr3 = val.map((item) => {
        return item.id
      })
      this.formData.categoryId = arr3.join(',')
      this.formData.categoryLevelIds = arr3.join(',')
      console.log('话题', this.topics)
      console.log('topicStr', this.topicStr)
    },
    submit() {
      if (!this.editType || this.editType === 1) {
        if (this.fromPage === 'article' || this.fromPage === 'question') {
          if (!this.formData.categoryCode) {
            this.$xToast.error('请选择话题')
          } else this.addContent()
        }
      }
    },
    editorChange(val) {
      this.formData.content = val.html
      this.formData.contentText = val.text
      this.formData.imgList = this.getImgSrc(val.html)
    },
    // 新增内容
    addContent() {
      this.$axios
        .post(knownApi.content.add, this.formData)
        .then((res) => {
          const that = this
          if (res.code && res.code === 200) {
            this.$xToast.success('发布成功')
            this.switchUrl(res.data.id)
          } else {
            this.$xToast.error('发布失败')
          }
        })
        .catch((err) => {
          console.log('发布内容失败', err)
        })
    },
    // 页面跳转
    switchUrl(id) {
      const _this = this
      // 新增内容时
      if (this.fromPage === 'article') {
        timeoute = setTimeout(function () {
          _this.$router.replace({
            path: '/known/detail/article',
            query: {
              id,
            },
          })
        }, 2000)
      } else if (this.fromPage === 'question') {
        timeoute = setTimeout(function () {
          _this.$router.replace({
            path: '/known/detail/question',
            query: {
              id,
            },
          })
        }, 2000)
      } else {
        timeoute = setTimeout(function () {
          _this.$router.replace({
            path: '/known/detail/answer',
            query: {
              id,
            },
          })
        }, 2000)
      }
    },
  },
}
