<template>
  <div>
    <PageHead
      :has-val="hasVal"
      :confirm-text="editType === '2' ? '修改问题' : '发布问题'"
      :title="title"
      @submit="submit"
    />
    <div class="main">
      <TitleArea
        ref="myTitle"
        :max-length="50"
        :title="formData.title"
        :cust-placeholder="myPlaceholder"
        @setTitle="setTitle"
      />
      <div class="content">
        <div v-if="showToast" class="toast-area">
          <div class="btn" @click="handleClickCloseToast">
            <my-icon
              name="nav_ic_close"
              size="0.28rem"
              color="#999999"
            ></my-icon>
          </div>
          <p class="p1">
            <my-icon
              name="per_ic_help"
              size="0.32rem"
              color="#999999"
            ></my-icon>
            让你的提问获得更多解答
          </p>
          <p>· 保持文字简练，表述清晰问题的关键点</p>
          <p>· 添加合适的话题，让问题更好地流通</p>
          <p>· 确保问题没有被提问过</p>
        </div>
        <Editor :init-content="formData.content" @editorChange="editorChange" />
      </div>
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
      fromPage: 'question',
      showToast: true,
      title: '',
      myPlaceholder: '输入问题并以问号结尾',
      questionId: '', // 问题id
      questionInfo: {}, // 问题详情
      mytopics: [],
    }
  },
  computed: {
    hasVal: {
      get() {
        return (
          this.formData.content.length > 0 && this.formData.title.length > 0
        )
      },
    },
  },
  mounted() {
    if (this.$route.query.editType === '2') {
      this.editType = this.$route.query.editType
      this.questionId = this.$route.query.id
      this.formData.id = this.questionId
      const _this = this
      _this.getDetailByIdApi().then(({ code, data }) => {
        if (code === 200) {
          _this.questionInfo = data
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
    handleClickCloseToast() {
      this.showToast = false
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
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    padding: 20px 32px 300px 32px;
    .toast-area {
      width: 100%;
      height: 236px;
      background: #f2f5ff;
      border-radius: 24px;
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 44px;
      position: relative;
      padding: 24px 32px;
      .btn {
        position: absolute;
        right: 22px;
        top: 10px;
        padding: 10px;
      }
      p {
        margin-bottom: 6px;
      }
      .p1 {
        font-size: 32px;
        color: #999999;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
