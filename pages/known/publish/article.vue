<template>
  <div>
    <PageHead
      :title="editType == 1 ? '编辑文章' : '攥写文章'"
      :has-val="hasVal"
      @submit="submit"
    />
    <div class="main">
      <TitleArea
        ref="myTitle"
        :max-length="50"
        :input-length="60"
        :title="formData.title"
        @setTitle="setTitle"
      />
      <div class="content-area">
        <Editor :init-content="formData.content" @editorChange="editorChange" />
      </div>
      <ChooseTopic
        ref="chooseTopic"
        :topics-arr="formData.topics"
        @setTopic="setTopic"
      />
    </div>
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import PageHead from '@/components/mustKnown/publish/PageHead'
import TitleArea from '@/components/mustKnown/publish/TitleArea'
import ChooseTopic from '@/components/mustKnown/publish/ChooseTopic'
import Editor from '@/components/mustKnown/publish/Editor'
export default {
  components: {
    PageHead,
    TitleArea,
    ChooseTopic,
    Editor,
    [Field.name]: Field,
  },
  data() {
    return {
      hideInput: false, // 是否隐藏标题输入框
      detailData: {},
      editType: '', // editType=1为编写文章 editType=2 为新发文章
      articleId: '',
      formData: {
        // 编辑之前的信息
        title: '',
        content: '',
        text: '',
        topics: [], // 话题
      },
      editData: {
        // 编辑之后的富文本数据
        text: '',
        content: '',
      },
    }
  },
  computed: {
    overNum() {
      return this.formData.title.length - this.maxLength
    },
    textareaRow() {
      return Math.ceil(this.formData.title.length / 30)
    },
    hasVal() {
      // 文章发布按钮显示必须有标题和内容
      return (
        this.formData.title.length > 0 &&
        (this.formData.text.length > 0 || this.editData.text.length > 0)
      )
    },
  },
  mounted() {
    // 获取参数
    this.editType = this.$route.query.editType
    this.articleId = this.$route.query.articleId
  },
  methods: {
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
    setTopic(val) {
      this.formData.topics = val
      const arr = val.map((item) => {
        return item.name
      })
      console.log('formData', this.formData)
    },
    setTitle(val) {
      this.formData.title = val
      console.log('this.formData', this.formData)
    },
    editorChange(data) {
      this.editData.text = data.text
      this.editData.content = data.html
    },
    submit() {
      const data = Object.assign(this.formData, this.editData)
      console.log('data', data)
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 88px;
  .choose-topic {
    height: 28px;
    font-size: 28px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #4974f5;
    line-height: 88px;
    padding-left: 40px;
    .item {
      margin-right: 10px;
    }
  }
}
.content-area {
  margin-bottom: 100px;
}
</style>
