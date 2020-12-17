<template>
  <div class="wrapper">
    <Header :title="titles[type]" @leftClickFuc="onClickLeft" />
    <div class="textDiv">
      <span class="spanClass"> {{ text }}</span>
    </div>
  </div>
</template>

<script>
import { TopNavBar, Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  name: 'Agreement',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    Header,
  },
  props: {},
  data() {
    return {
      titles: ['薯片用户服务协议', '薯片隐私协议'],
      type: 0,
      text:
        '尊敬的薯片用户：我们对《薯片隐私政策》进行了更新。本次更新主要涉及以下内容：1、增加明确薯片APP运营者的注册地址，个人信息保护相关负责人联系方式； 2、根据相关法律法规及标准细化了我们收集和处理您个人信息或个人敏感信息的条款。薯片提示您仔细阅读新修订的《薯片隐私政策》，新修订的隐私政策将更有利于您了解我们对于您个人信息的保护。 【特别提示】请您仔细阅读我们的《薯片隐私政策》（尤其是加粗划线的内容）并确定了解我们对您个人信息的处理规则。阅读过程中，如您有任何疑问，可及时与我们联系（联系方式以隐私政策里约定的为准）。如您不同意协议中的任何条款，您应立即停止访问薯片。 薯片隐私政策 版本更新日期：2020年 09月22日 版本生效日期：2020年 09月22日 引言 《薯片隐私政策》将帮助您了解以下内容： 1、我们如何收集和使用您的个人信息； 2、我们如何使用Cookie和同类技术； 3、我们如何共享、转让、公开披露您的个人信息； 4、我们如何保护您的个人信息； 5、您的权利； 6、我们如何处理未成年的个人信息； 7、本隐私政策如何更新； 8、如何联系我们； 薯片（以下亦称“我们”）深知个人信息对您的重要性，我们尊重并保护所有使用薯片平台服务的用户的个人隐私权，并会尽全力保护您的个人信息安全可靠。同时我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。请在使用我们的产品（或服务）前，仔细阅读并了解本《薯片隐私政策》（下称“本隐私政策”）。 如您对本隐私政策有任何疑问或您在使用我们提供的服务时个人信息受到了侵扰，您可以通过发送邮件至 yinsibaohu@58.com 咨询或拨打 400-620-9008 咨询，我们设立了个人信息保护专职部门，将尽快给予您答复；您亦可以通过薯片网站（www.shupian.com）首页下方的违法信息举报方式与我们及时取得联系，以便我们能够及时解决您的困惑。 目录 一、我们处理个人信息的总原则 二、本隐私政策的适用范围 三、我们如何收集和使用您的个人信息 四、我们如何使用 Cookie 和同类技术 五、我们如何共享、转让、公开披露您的个人信息 六、我们如何存储及保护您的个人信息 七、您管理个人信息的权利 八、我们如何处理未成年人的个人信息 九、本隐私政策的更新和通知 十、如何联系我们 十一、争议解决',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.type = this.$route.query.type || 0
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
  },
}
</script>
<style lang="less" scoped>
.wrapper {
  .navBarClass {
    height: 88px;
  }
  .textDiv {
    display: block;
    width: 100%;
    height: 1206px;
    .spanClass {
      display: block;
      color: #1a1a1a;
      margin: 36px 41px 59px;
      font-size: 32px;
      line-height: 60px;
      overflow: scroll;
      height: 1206px-41px;
    }
  }
}
</style>
