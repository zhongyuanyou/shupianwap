<template>
  <div class="article">
    <PageHead
      title="撰写文章"
      :has-val="hasVal"
      @submit="submit"
      @handleCancel="handleCancel"
    />
    <div class="main" :style="{ paddingTop: paddingTop + 'px' }">
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
        :topics-arr="mytopics"
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
  layout: 'keepAlive',
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
      editType: '', // editType=1为编写文章 editType=2 为新发文章
      questionId: '',
      mytopics: [],
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
    // this.editType = this.$route.query.editType。
    // this.questionId = this.$route.query.id
    this.$refs.myTitle.$refs.tileArea.$refs.input.focus()

    if (this.$route.query.editType === '2') {
      this.editType = this.$route.query.editType
      // 这里的 this.questionId 其实是赋值给 this.getDetailByIdApi 这个接口 这个 id 是文章id
      this.questionId = this.$route.query.id
      this.formData.id = this.questionId
      // this.formData.sourceId = this.questionId
      const _this = this
      _this.getDetailByIdApi().then(({ code, data }) => {
        if (code === 200) {
          _this.formData.title = data.title
          _this.formData.content = data.content
          // start: init 话题部分参数,当用户没有点击更改话题时,则使用查询问题中的值
          _this.formData.categoryId = data.categoryId
          _this.formData.categoryCode = data.categoryCode
          _this.formData.categoryLevelIds = data.categoryLevelIds
          _this.formData.categoryName = data.categoryName
          // end: init 话题部分参数,当用户没有点击更改话题时,则使用查询问题中的值
          _this.buildTopicArr(data)
        } else {
          _this.$xToast.error(data.error || '异常错误')
          setTimeout(() => {
            _this.$back()
          }, 2000)
        }
      })
    }
  },
  methods: {
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
    buildTopicArr(data) {
      // get level 1 id
      const tempIds = data.categoryLevelIds.split('_')
      const levelOneId = tempIds[tempIds.length - 2]
      // get topic name
      const topicNameList = []
      const topicNames = data.categoryName.split(',')
      for (let i = 0, l = topicNames.length; i < l; i++) {
        const item = { name: '' }
        item.name = topicNames[i]
        topicNameList.push(item)
      }
      console.log(`first ids: ${tempIds}, secound level1: ${levelOneId}`)
      this.mytopics = [data.categoryId.split(','), levelOneId, topicNameList]
    },
  },
}
</script>

<style lang="less" scoped>
.article {
  background: #fff;
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
    font-weight: bold;
    color: #4974f5;
    line-height: 88px;
    padding-left: 40px;
    .item {
      margin-right: 10px;
    }
  }
}
</style>
