<template>
  <div class="question">
    <div class="question_tp">
      <p class="question_tp_title">常见问题</p>
      <div class="question_tp_more" @click="handlToProblemList">
        查看更多
        <span>
          <my-icon name="order_ic_listnext" size="0.21rem" color="#ccc" />
        </span>
      </div>
    </div>
    <div class="question_item">
      <div class="question_item_title">
        <my-icon name="command_img_questions" size="0.32rem" color="#4974F5" />
        <span>{{ problemData.title }}</span>
      </div>
      <div class="question_item_answer">
        <my-icon name="command_img_answers" size="0.32rem" color="#FF614E" />
        <span v-html="problemData.content"></span>
      </div>
    </div>
  </div>
</template>

<script>
import problemMockData from '~/mock/problem'
export default {
  name: 'Question',
  props: {
    classCodeDict: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      problemData: {},
    }
  },
  mounted() {
    this.getMockData(this.classCodeDict)
  },
  methods: {
    handlToProblemList() {
      this.$router.push(`/detail/commonProblem/${this.classCodeDict}`)
    },
    getMockData(classCode) {
      const problemData = problemMockData[classCode]
        ? problemMockData[classCode]
        : []
      const problem =
        problemData[Math.floor(Math.random() * problemData.length)]
      this.problemData = problem || {}
    },
  },
}
</script>

<style lang="less" scoped>
.question {
  background-color: #fff;
  padding: 47px 40px 37px 40px;
  border-bottom: 24px solid #f8f8f8;
  &_tp {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_title {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    &_more {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      span {
        margin-left: 19px;
      }
    }
  }
  &_item {
    margin-top: 39px;
    &_title {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      line-height: 40px;
      span {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        margin-left: 16px;
        line-height: 40px;
      }
    }
    &_answer {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      line-height: 38px;
      margin-top: 24px;
      span {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 38px;
        margin-left: 16px;
      }
    }
  }
}
</style>
