<template>
  <div>
    <PageHead
      :title="editType == 1 ? '编辑文章' : '攥写文章'"
      :has-val="hasVal"
    />
    <div class="main">
      <div class="input">
        <div v-show="hideInput" class="title-area">
          <p class="title" @click="handleClickTitle">{{ formData.title }}</p>
          <span v-if="overNum > 0" class="more-text">
            超出{{ overNum }}个字符
          </span>
        </div>
        <sp-field
          v-show="!hideInput"
          v-model="formData.title"
          placeholder="请输入标题"
          type="textarea"
          rows="1"
          maxlength="80"
          autosize
          @input="inputTitle"
          @blur="blur"
        />
      </div>
      <div class="content">
        <Editor />
        <sp-field
          v-model="formData.content"
          placeholder="请输入内容"
          type="textarea"
          maxlength="3000"
          rows="4"
          autosize
        />
      </div>
      <div class="choose-topic" @click="openModal">
        <p v-if="topics.length === 0">
          <my-icon
            name="spiconfont-nav_ic_abb"
            size="0.28rem"
            color="rgba(73, 116, 245, 1)"
          ></my-icon>
          + 话题 (至少添加一个)
        </p>
        <p v-else>
          {{ topicStr }}
        </p>
      </div>
    </div>
    <ChooseTopic ref="chooseTopic" :topics="topics" @setTopic="setTopic" />
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import PageHead from '@/components/mustKnown/publish/PageHead'
import ChooseTopic from '@/components/mustKnown/publish/ChooseTopic'
import Editor from '@/components/mustKnown/publish/Editor'
export default {
  components: {
    PageHead,
    ChooseTopic,
    Editor,
    [Field.name]: Field,
  },
  data() {
    return {
      hideInput: false, // 是否隐藏标题输入框
      formData: {
        title: '',
      },
      maxLength: 20,
      topics: [], // 话题
      topicStr: '',
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
      return this.formData.title.length > 0
    },
  },
  mounted() {
    // 获取参数
    this.editType = this.$route.query.editType
    this.articleId = this.$route.query.articleId
  },
  methods: {
    inputTitle(a) {
      console.log('a', a)
    },
    blur(a) {
      if (this.formData.title) this.hideInput = true
    },
    handleClickTitle() {
      this.hideInput = false
    },
    openModal() {
      this.$refs.chooseTopic.showPop = true
    },
    setTopic(val) {
      this.topics = val
      const arr = val.map((item) => {
        return item.name
      })
      this.topicStr = arr.join(',')
      console.log('话题', this.topics)
      console.log('topicStr', this.topicStr)
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 88px;
  .input {
    border-bottom: 1px solid #dddddd;
  }
  .title-area {
    width: 100%;
    font-size: 40px;
    position: relative;
    padding-bottom: 40px;
    .title {
      color: #222222;
      line-height: 52px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      padding: 20px;
    }
    .more-text {
      position: absolute;
      right: 40px;
      bottom: 20px;
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ff3b30;
      line-height: 24px;
    }
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
