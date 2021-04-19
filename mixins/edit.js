import { mapState } from 'vuex'
import knownApi from '@/api/known'
import util from '@/utils/changeBusinessData'

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
        userId: '',
        userName: '', //
        userType: 2, // 作者类型 2 普通用户 3 规划师
        contentImageUrl: '', // 内容图片地址（多张 “,”号拼接）
        id: '',
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
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      userType: (state) => state.user.userType,
      userName: (state) => state.user.userName,
    }),
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
      return imgList.join(',')
    },
    setTitle(val) {
      if (!val) {
        return
      }
      if (this.fromPage === 'question') {
        const tempVal = val
        const lastLetter = tempVal.slice(tempVal.length - 1, tempVal.length)
        const reg = /\?|？/
        if (!reg.test(lastLetter)) {
          this.$xToast.error('标题需以问号结尾')
          return
        }
      }
      this.formData.title = val
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
      // 接口新返回字段,进行处理
      const arrLevelIds = val.map((item) => {
        return item.levelIds
      })
      this.formData.categoryId = arr3.join(',')
      this.formData.categoryLevelIds = arrLevelIds.join(',')
      console.log('话题', this.topics)
      console.log('topicStr', this.topicStr)
    },
    submit() {
      const checkFlag = this.checkParams()
      if (!checkFlag) return
      if (!this.editType || this.editType === 1) {
        if (this.fromPage === 'answer') {
          this.buildAnswerParams()
        }
        this.addContent()
      } else {
        this.modifyContent()
      }
    },
    editorChange(val) {
      this.formData.content = val.html
      this.formData.contentText = val.text
      this.formData.contentImageUrl = this.getImgSrc(val.html)
    },
    // 新增内容
    addContent() {
      this.formData.userId = this.userId
      this.formData.userType =
        this.$store.state.user.userType === 'MERCHANT_USER' ? 3 : 2
      this.formData.userName = this.userName
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
          this.$xToast.error('发布失败')
          console.log('发布内容失败', err)
        })
    },
    // 修改内容
    modifyContent() {
      this.$axios.post(knownApi.content.edit, this.formData).then((res) => {
        const that = this
        if (res.code && res.code === 200) {
          this.$xToast.success('修改成功')
          this.switchUrl(res.data.id)
        } else {
          this.$xToast.error('发布失败')
        }
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
        }, 1000)
      } else if (this.fromPage === 'question') {
        timeoute = setTimeout(function () {
          _this.$router.replace({
            path: '/known/detail/question',
            query: {
              id,
              status: 'release',
            },
          })
        }, 1000)
      } else {
        timeoute = setTimeout(function () {
          _this.$router.replace({
            path: '/known/detail/answer',
            query: {
              id,
            },
          })
        }, 1000)
      }
    },
    checkParams() {
      // check title
      if (this.fromPage !== 'answer') {
        const tempTitle = this.formData.title
        if (tempTitle.length < 4) {
          this.$xToast.error('标题不能少于4个字哦')
          return false
        }
        const lastLetter = tempTitle.slice(
          tempTitle.length - 1,
          tempTitle.length
        )
        const reg = /\?|？/
        if (this.fromPage === 'question' && !reg.test(lastLetter)) {
          this.$xToast.error('标题需以问号结尾')
          return false
        }
        // check categorycode
        if (!this.formData.categoryCode) {
          this.$xToast.error('请选择话题')
          return false
        }
      }
      // check content
      if (this.formData.content.length === 0) {
        this.$xToast.error('内容区域不能为空哦')
        return false
      }
      return true
    },
    buildAnswerParams() {
      this.formData.sourceId = this.questionId
      this.formData.title = this.questionInfo.title
      this.formData.categoryCode = this.questionInfo.categoryCode
      this.formData.categoryId = this.questionInfo.categoryId
      this.formData.categoryLevelIds = this.questionInfo.categoryLevelIds
      this.formData.categoryName = this.questionInfo.categoryName
    },
    async getDetailByIdApi() {
      try {
        const params = {
          id: this.questionId,
          userHandleFlag: 0,
          userId: this.userId,
        }
        const { code, data } = await this.$axios.get(knownApi.question.detail, {
          params,
        })
        return { code, data }
      } catch (e) {
        return e
      }
    },
  },
}
