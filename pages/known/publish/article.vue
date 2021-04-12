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
        <div class="content">
          <Editor
            ref="myEditor"
            :init-content="formData.content"
            @editorChange="editorChange"
          />
        </div>
      </div>
      <ChooseTopic
        ref="chooseTopic"
        :topics-arr="topics"
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
import EditorMinxin from '@/mixins/edit'

export default {
  components: {
    PageHead,
    TitleArea,
    ChooseTopic,
    Editor,
    [Field.name]: Field,
  },
  mixins: [EditorMinxin],
  data() {
    return {
      fromPage: 'article',
      detailData: {},
      editType: '', // editType=1为编写文章 editType=2 为新发文章
      articleId: '',
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
      return this.formData.title.length > 0 && this.formData.content.length > 0
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
  margin-bottom: 260px;
}
</style>
