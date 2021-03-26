<template>
  <div>
    <PageHead :has-val="hasVal" confirm-text="发布问题" />
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
        <sp-field
          v-model="formData.content"
          placeholder="请输入内容"
          type="textarea"
          maxlength="3000"
          rows="4"
          autosize
        />
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
export default {
  components: {
    PageHead,
    TitleArea,
    ChooseTopic,
    [Field.name]: Field,
  },
  data() {
    return {
      hideInput: false, // 是否隐藏标题输入框
      formData: {
        title: '',
        content: '',
        topics: [], // 话题
      },
      editType: '', // editType=1为编写文章 editType=2 为新发文章
      id: '',
      showToast: true,
    }
  },
  computed: {
    hasVal() {
      return this.formData.title.length > 0
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
