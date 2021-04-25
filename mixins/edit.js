import { Dialog } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import knownApi from '@/api/known'
import util from '@/utils/changeBusinessData'
import { userinfoApi } from '@/api'

let timeoute
export default {
  components: {
    [Dialog.name]: Dialog,
  },
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
        userCode: '',
        userId: '',
        userName: '', //
        userType: 1, // // 作者类型 1 普通用户 2 规划师
        contentImageUrl: '', // 内容图片地址（多张 “,”号拼接）
        id: '',
      },
      topics: [], // 话题
      topicStr: '',
      id: '', // 内容id
      isFromApp: '', // 是否从APP跳转
      apiLock: false, // 防止接口重复调用
    }
  },
  beforeDestroy() {
    if (timeoute) clearTimeout(timeoute)
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
  },
  mounted() {
    this.getUserInfo()
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
    async getUserInfo() {
      // 获取用户信息
      try {
        const params = {
          // id: this.userId,
          id: this.userId || this.$cookies.get('userId'),
        }
        const res = await this.$axios.get(userinfoApi.info, { params })
        this.loading = false
        if (res.code === 200 && res.data && typeof res.data === 'object') {
          // start: set userInfo
          this.formData.userId = res.data.id
          this.formData.userType = util.getUserType(res.data.type)
          this.formData.userName = res.data.nickName
          this.formData.userCode = res.data.no
          // end: set userInfo
        }
      } catch (err) {
        console.log(err)
      }
    },
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
      this.formData.title = val
      if (this.fromPage === 'question') {
        const tempVal = val
        const lastLetter = tempVal.slice(tempVal.length - 1, tempVal.length)
        const reg = /\?|？/
        if (!reg.test(lastLetter)) {
          this.$xToast.error('标题需以问号结尾')
        }
      }
    },
    setTopic(val) {
      if (val.length > 0) {
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
      } else {
        // init 话题赋值
        this.topicStr = ''
        this.formData.categoryName = ''
        this.formData.categoryCode = ''
        this.formData.categoryId = ''
        this.formData.categoryLevelIds = ''
      }
      console.log('话题: ', this.topics)
      console.log('topicStr: ', this.topicStr)
    },
    submit() {
      const checkFlag = this.checkParams()
      if (!checkFlag) return
      if (this.apiLock) {
        this.$xToast.error('正在处理中,请稍后')
        return
      }
      if (!this.editType || this.editType === 1) {
        if (this.fromPage === 'answer') {
          this.buildAnswerParams()
        }
        this.addContent()
      } else {
        this.modifyContent()
      }
    },
    handleCancel() {
      let cancelFlag = false
      if (this.fromPage !== 'answer') {
        if (
          this.formData.title.length > 0 ||
          this.formData.contentText.length > 0 ||
          this.formData.categoryCode.length > 0
        ) {
          cancelFlag = true
        }
      } else if (this.formData.contentText.length > 0) {
        cancelFlag = true
      }
      if (cancelFlag) {
        const _this = this
        Dialog.confirm({
          title: '温馨提示',
          message: '是否退出? 退出将清空已编辑内容',
        }).then(() => {
          // on confirm
          _this.$back()
        })
      } else {
        this.$back()
      }
    },
    editorChange(val) {
      this.formData.content = val.html
      this.formData.contentText = val.text
      this.formData.contentImageUrl = this.getImgSrc(val.html)
    },
    // 新增内容
    addContent() {
      this.apiLock = true
      this.$axios
        .post(knownApi.content.add, this.formData)
        .then((res) => {
          this.apiLock = false
          const that = this
          if (res.code && res.code === 200) {
            this.$xToast.success('发布成功')
            this.switchUrl(res.data.id)
          } else {
            this.$xToast.error(res.data.error)
          }
        })
        .catch((err) => {
          this.apiLock = false
          this.$xToast.error('发布失败')
          console.log('发布内容失败', err)
        })
    },
    // 修改内容
    modifyContent() {
      this.apiLock = true
      this.$axios
        .post(knownApi.content.edit, this.formData)
        .then((res) => {
          this.apiLock = false
          const that = this
          if (res.code && res.code === 200) {
            this.$xToast.success('修改成功')
            this.switchUrl(res.data.id)
          } else {
            this.$xToast.error(res.data.error)
          }
        })
        .catch((e) => {
          this.apiLock = false
          this.$xToast.error('修改失败')
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
        const titleLength = this.fromPage === 'question' ? 4 : 2
        if (tempTitle.length < titleLength) {
          this.$xToast.error(`标题不能少于${titleLength}个字哦`)
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
      if (this.formData.content.length === 0 && this.fromPage !== 'question') {
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
