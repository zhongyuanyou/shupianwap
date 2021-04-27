<template>
  <div class="answer">
    <CommonHead v-if="!id" title="写回答" />
    <PageHead
      v-else
      :title="editType === '2' ? '回答问题' : '写回答'"
      :has-val="hasVal"
      :fixed="true"
      @submit="submit"
      @handleCancel="handleCancel"
    />
    <div class="main">
      <TitleArea ref="myTitle" :title="questionInfo.title" :can-edit="false" />
      <div class="content">
        <Editor
          ref="myEditor"
          :init-content="formData.content"
          @editorChange="editorChange"
        />
        <div style="height: 2rem"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Tab, Tabs, Button } from '@chipspc/vant-dgg'
import CommonHead from '@/components/common/head/header'
import PageHead from '@/components/mustKnown/publish/PageHead'
import TitleArea from '@/components/mustKnown/publish/TitleArea'
import Editor from '@/components/mustKnown/publish/Editor'
import EditorMinxin from '@/mixins/edit'

export default {
  layout: 'appSafeView',
  components: {
    PageHead,
    CommonHead,
    TitleArea,
    Editor,
    [Field.name]: Field,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
  },
  mixins: [EditorMinxin],
  data() {
    return {
      active: 0,
      maxLength: 20,
      fromPage: 'answer',
      questionId: '', // editType = 1,问题id || editType = 2,回答id
      questionInfo: {}, // 问题详情
      sourceId: '', // 问题id
    }
  },
  computed: {
    hasVal: {
      get() {
        return this.formData.content.length > 0
      },
    },
  },
  mounted() {
    this.questionId = this.$route.query.id
    // this.formData.id = this.questionId
    if (this.$route.query.editType) {
      this.editType = this.$route.query.editType
    }
    const _this = this
    this.getDetailByIdApi().then(({ code, data }) => {
      if (code === 200) {
        _this.questionInfo = data
        // 当修改回答时,需要重显内容
        if (_this.editType === '2') {
          _this.formData.content = data.content
          // 当修改回答时,sourceId为问题id.
          _this.sourceId = data.sourceId
          // data.id 为回答id
          _this.formData.id = data.id
        }
      }
    })
  },
  methods: {
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
  },
}
</script>

<style lang="less" scoped>
.answer {
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
  .title {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 52px;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
}
.sp-tabs {
  border-bottom: 1px solid #ddd;
  .sp-tabs__nav--line {
    border-bottom: 1px solid #ddd;
  }
}
/deep/.sp-tabs__wrap {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
