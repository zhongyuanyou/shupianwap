<template>
  <div class="question">
    <!-- S 常见问题 -->
    <div class="question_title">
      <h2>许可证办理的常见问题</h2>
    </div>
    <div
      v-for="(item, index) in questionArr"
      :key="index"
      class="question_content"
    >
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/f5ixq0bszq80000.png"
        alt=""
      />
      <h4>{{ item.question }}</h4>
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/a4dd30gdtc40000.png"
        alt=""
      />
      <p>{{ item.explain }}</p>
      <p @click="plannerIm"><a href="javascript:void(0)">咨询更多 >></a></p>
    </div>
    <div class="question_more" @click="showAll = !showAll">
      <span
        ><a href="javascript:void(0)">{{ advisory }}</a>
        <my-icon
          v-show="!showAll"
          name="tab_ic_all_n"
          size="0.2rem"
          class="icon"
          color="#cccccc"
        ></my-icon>
        <my-icon
          v-show="showAll"
          name="tab_ic_all_s"
          size="0.2rem"
          class="input-ic-open"
          color="#cccccc"
        ></my-icon>
      </span>
    </div>
    <!-- E 常见问题 -->
  </div>
</template>

<script>
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: {
    MyIcon,
  },
  props: {},
  data() {
    return {
      showAll: false, // 不完全展示的时候(只展示一个问题的时候)
      // 常见问题和回答
      questionList: [
        {
          question: '营业执照经营范围已注明的服务，需要办理相关许可证吗？',
          explain:
            '经营活动分两类，一类是放开经营的，一类是要经过国家许可的。比如劳务承包，国内的一般是建筑行业的，那就需要建筑资质，这是建设行政主管部门负责，一般是建设局或城建局负责。',
        },
        {
          question: '总公司已经拥有某类许可证，外地分公司还需要办理吗？',
          explain:
            '如果总公司所办理的许可证上有限定许可区域，而该分公司不在许可区域内，则需要总公司去增加相应的许可区域',
        },
      ],
    }
  },
  computed: {
    // 最开始展示几条数据
    questionArr() {
      if (!this.showAll) {
        let questionArr = []
        if (this.questionList.length >= 1) {
          for (let i = 0; i < 1; i++) {
            questionArr.push(this.questionList[i])
          }
        } else {
          questionArr = this.questionList
        }
        return questionArr
      } else {
        return this.questionList
      }
    },
    // 改变this.showAll的值判断是展开还是收起
    advisory() {
      if (this.showAll === false) {
        return '展开更多'
      } else {
        return '点击收起'
      }
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  唤起IM
    plannerIm(planner) {
      console.log(1)
      const guiHuaShi = planner
      this.$root.$emit(
        'openIMM',
        guiHuaShi.id,
        guiHuaShi.name || '',
        guiHuaShi.jobNum || '',
        planner.imgSrc || ''
      )
    },
  },
}
</script>
<style lang="less" scoped>
.question {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  &_title {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 64px;
    > h2 {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      padding-bottom: 5px;
    }
  }
  &_content {
    width: 100%;
    background: #f8f8f8;
    border-radius: 8px;
    margin-top: 30px;
    box-sizing: border-box;
    position: relative;
    > img {
      width: 36px;
      height: 36px;
      position: absolute;
      margin-top: 2px;
      margin-left: 32px;
    }
    img:first-child {
      margin-top: 37px;
    }
    > h4 {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 40px;
      padding: 37px 33px 22px 84px;
    }
    > p {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 36px;
      padding: 0px 33px 31px 84px;
      > a {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        text-decoration: underline;
        color: #4974f5;
        padding-bottom: 31px;
      }
    }
  }
  &_more {
    width: 278px;
    height: 64px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 32px;
    margin: 0 auto;
    margin-top: 32px;
    > span {
      height: 64px;
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        padding-right: 13px;
      }
    }
  }
}
</style>
