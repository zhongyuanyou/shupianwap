<template>
  <div>
    <PageHead :has-val="hasVal" confirm-text="发布问题" @submit="submit" />
    <div class="main">
      <TitleArea
        ref="myTitle"
        :max-length="50"
        :input-length="60"
        :title="formData.title"
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
            让你的第一个提问获得更多解答
          </p>
          <p>· 保持文字简练，表述清晰问题的关键点</p>
          <p>· 添加合适的话题，让问题更好地流通</p>
          <p>· 确保问题没有被提问过</p>
        </div>
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
    }
  },
  computed: {
    // 问题发布按钮显示条件必须有问题标题
    hasVal() {
      return this.formData.content.length > 0
    },
  },
  methods: {
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
    handleClickCloseToast() {
      this.showToast = false
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 88px;
  .content {
    padding: 20px 32px 40px 32px;
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
