<template>
  <div class="wrapper">
    <Header title="问题解答" />
    <div class="titleDiv divClass">
      <my-icon name="per_ic_about" class="iconClass" />
      <span>{{ title }}</span>
    </div>
    <div class="answerDiv">
      <my-icon name="per_ic_about" class="iconClass" />
      <div class="divClass">
        <span>{{ answer }}</span>
        <a :href="url" class="urlClass">{{ url }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/head/header'
export default {
  name: 'Questions',
  components: { Header },
  props: {},
  data() {
    return {
      title:
        '资质可以直接用吗？谢谢资质可以直接用吗？谢谢资质可以直接用吗？谢谢资质可以直接用吗？谢谢',
      answer:
        '整体转让是指把公司整体转让给买家，对于受让人来说，调查债权债务、证书有效期和在职人员的情况整体转让是指把公司整体转让给买家。对于受让人来说，调查债权债务、证书有效期和在职人员的情况整体转让是指把公司整体转让给买家，对于受让人来说，调查债权债务、证书有效期和在职人员的情况整体转让是指把公司整体转让给买家，对于受让人来说。',
      url: 'http://127.0.0.1:32767start.html',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.wrapper {
  span,
  a {
    font-size: 32px;
    font-family: PingFang SC;
    // display: inline-block;
    width: 606px;
    float: left;
    margin-top: 10px;
    margin-left: 17px;
  }
  .iconClass {
    color: #333333;
    margin-left: 40px;
    font-size: 32px;
    float: left;
  }
  .divClass {
    overflow: hidden;
    margin-top: 45px;
  }
  .titleDiv {
    span {
      font-weight: bold;
      color: #1a1a1a;
      line-height: 40px;
    }
  }
  .answerDiv {
    span {
      font-weight: 400;
      color: #222222;
      line-height: 46px;
    }
    .urlClass {
      color: #4974f5;
    }
  }
}
</style>
