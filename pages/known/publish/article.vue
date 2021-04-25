<template>
  <div class="article">
    <PageHead
      title="撰写文章"
      :has-val="hasVal"
      @submit="submit"
      @handleCancel="handleCancel"
    />
    <div class="main">
      <TitleArea ref="myTitle" :title="formData.title" @setTitle="setTitle" />
      <!-- <div class="content-area"> -->
      <div class="content">
        <Editor
          ref="myEditor"
          :init-content="formData.content"
          :text-length="30000"
          @editorChange="editorChange"
        />
        <div style="height: 3rem"></div>
      </div>
      <!-- </div> -->
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
    hasVal: {
      get() {
        // 文章发布按钮显示必须有标题和内容
        return (
          this.formData.content.length > 0 && this.formData.title.length > 0
        )
      },
    },
  },
  mounted() {
    // 获取参数
    this.editType = this.$route.query.editType
    this.articleId = this.$route.query.articleId
    this.$refs.myTitle.$refs.tileArea.$refs.input.focus()
  },
  methods: {
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
  },
}
</script>

<style lang="less" scoped>
.article {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
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
</style>
