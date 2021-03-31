<template>
  <div>
    <CommonHead v-if="!id" title="写回答" />
    <PageHead
      v-else
      :title="editType == 1 ? '写回答' : '回答问题'"
      :has-val="hasVal"
      :fixed="true"
      @handleCancel="cancel"
    />
    <section v-if="!id">
      <div class="main">
        <sp-tabs v-model="active">
          <sp-tab title="推荐">
            <div class="list list1">
              <div v-for="(item, index) in list1" :key="index" class="item">
                <div class="user-info">
                  <div class="img"></div>
                  <div class="infos">
                    <p class="user-name">{{ item.userName || '' }}</p>
                    <p class="pub-time">
                      的提问期待你的回答 · {{ item.time || '' }}前
                    </p>
                  </div>
                </div>
                <div class="item-content">{{ item.content }}</div>
                <div class="item-bottom">
                  <div class="left">
                    {{ item.num1 }}回答 · {{ item.num2 }}关注
                  </div>
                  <div class="btn">
                    <sp-button type="primary" @click="chooseQue(item.id)"
                      >写回答</sp-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </sp-tab>
          <sp-tab title="邀请">
            <div class="list list2">
              <div v-for="(item, index) in list2" :key="index" class="item">
                <p class="view-num">最近 2.3 万人浏览</p>
                <div class="item-content">{{ item.content }}</div>
                <div class="item-bottom">
                  <div class="left">
                    {{ item.num1 }}回答 · {{ item.num2 }}关注
                  </div>
                  <div class="btn">
                    <sp-button type="primary" @click="chooseQue(item.id)"
                      >写回答</sp-button
                    >
                  </div>
                </div>
              </div>
            </div></sp-tab
          >
        </sp-tabs>
      </div>
    </section>
    <section v-else>
      <div class="main">
        <TitleArea ref="myTitle" :title="question.title" :can-edit="false" />
        <div class="content">
          <Editor
            :init-content="formData.content"
            @editorChange="editorChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Field, Tab, Tabs, Button } from '@chipspc/vant-dgg'
import CommonHead from '@/components/common/head/header'
import PageHead from '@/components/mustKnown/publish/PageHead'
import TitleArea from '@/components/mustKnown/publish/TitleArea'
import Editor from '@/components/mustKnown/publish/Editor'
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
  data() {
    return {
      question: {
        title:
          '问题标题再次，问题标题再次，问题标题再次，问题标题再次，问题标题再次，问题标题再次，问题标题？',
        id: '',
      },
      active: 0,
      formData: {
        content: '',
      },
      maxLength: 20,
      topics: [], // 话题
      topicStr: '',
      editType: '', // editType=1为写回答 editType=2 编辑回答
      id: '', // 内容id
      isFromApp: '', // 是否从APP跳转
      list1: [
        {
          userName: '赵四',
          time: '40分钟',
          content:
            '如何才能在一个月内赚到1个亿？如何才能在一个月内赚到1个亿？如何才能在一个月内赚到1个亿？如何才能在一个月内赚到1个亿？如何才能在一个月内赚到1个亿？如何才能在一个月内赚到1个亿？',
          num1: '33',
          num2: '44',
          id: '3242525252535',
        },
        {
          userName: '张三',
          time: '90分钟',
          content: '如何用100元生存1个月？',
          num1: '11',
          num2: '22',
          id: '324252525253315',
        },
        {
          userName: '刘五',
          time: '1900分钟',
          content: '彩票开奖是不是被人为控制的，怎么才能中奖？',
          num1: '110',
          num2: '2',
          id: '324252525253315',
        },
      ],
      list2: [
        {
          userName: '赵四',
          time: '40分钟',
          content: '如何才能在一个月内赚到1个亿？',
          num1: '33',
          num2: '44',
          id: '3242525252535',
        },
        {
          userName: '赵东明',
          time: '60分钟',
          content:
            '如何才能在一个月内赚到1个亿2？如何才能在一个月内赚到1个亿2如何才能在一个月内赚到1个亿2如何才能在一个月内赚到1个亿2如何才能在一个月内赚到1个亿2如何才能在一个月内赚到1个亿2',
          num1: '33',
          num2: '44',
          id: '3242525252535',
        },
        {
          userName: '张三',
          time: '90分钟',
          content: '如何用100元生存1个月？',
          num1: '11',
          num2: '22',
          id: '324252525253315',
        },
        {
          userName: '刘五',
          time: '1900分钟',
          content: '彩票开奖是不是被人为控制的，怎么才能中奖？',
          num1: '110',
          num2: '2',
          id: '324252525253315',
        },
      ],
    }
  },
  computed: {
    hasVal() {
      return this.formData.content.length > 0
    },
  },
  mounted() {
    // 获取参数
    this.editType = this.$route.query.editType
    this.id = this.$route.query.id
    this.isFromApp = this.$route.query.isFromApp
  },
  methods: {
    cancel() {
      this.id = ''
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
    chooseQue(id) {
      this.id = id
    },
    editorChange(val) {
      this.formData.content = val
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 88px;
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
.list {
  padding: 0 32px;
  .item {
    padding: 32px 0;
    font-size: 28px;
    color: #222;
    border-bottom: 1px solid #ddd;
    .view-num {
      font-size: 28px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
      margin-bottom: 20px;
    }
    .user-info {
      width: 100%;
      height: 92px;
      .img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: #f4f4f4;
        float: left;
      }
      .infos {
        width: auto;
        padding-left: 92px;
        min-width: 500px;
        .user-name {
          font-size: 30px;
        }
        .pub-time {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .item-content {
      height: auto;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 40px;
      margin-bottom: 20px;
      .textOverflow(2);
    }
    .item-bottom {
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 26px;
        color: #666;
      }
      .btn {
        width: 180px;
        height: 64px;
        background: #4974f5;
        border-radius: 8px;
        text-align: center;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        .sp-button {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
