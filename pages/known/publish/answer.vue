<template>
  <div>
    <CommonHead v-if="!id" title="写回答" />
    <PageHead
      v-else
      :title="editType == 1 ? '写回答' : '回答问题'"
      :has-val="hasVal"
      :fixed="true"
      @submit="submit"
      @handleCancel="cancel"
    />
    <div class="main">
      <TitleArea ref="myTitle" :title="questionInfo.title" :can-edit="false" />
      <div class="content">
        <Editor
          ref="myEditor"
          :init-content="formData.content"
          @editorChange="editorChange"
        />
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
      questionId: '', // 问题id
      questionInfo: {}, // 问题详情
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
    this.getDetailByIdApi().then(({ code, data }) => {
      if (code === 200) {
        this.questionInfo = data
      }
    })
  },
  methods: {
    cancel() {
      this.$back()
    },
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  .title {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 52px;
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
