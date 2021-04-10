import knownApi from '@/api/known'
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
      console.log('this.formData.content', this.formData)
      if (!this.editType || this.editType === 1) {
        this.addContent()
      }
    },
    editorChange(val) {
      this.formData.content = val.html
      this.formData.contentText = val.text
    },
    // 新增内容
    addContent() {
      this.$axios
        .post(knownApi.content.add, this.formData)
        .then((res) => {
          console.log('res', res)
          this.$xToast.show('发表成功')
          if (this.fromPage === 'article') {
            this.$router.replace({
              path: '/known/detail/article',
              query: {
                id: res.id,
              },
            })
          }
        })
        .catch((err) => {
          console.log('add', err)
        })
    },
  },
}
