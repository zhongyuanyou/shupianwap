<template>
  <div class="licence-content">
    <!-- S 头部导航 -->
    <Header v-show="!isInApp" :title="title">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- E 头部导航 -->
    <!-- E 轮播图 -->
    <Banner :img-list="imgList" />
    <!-- E 轮播图 -->
    <!-- S 表单 -->
    <Form />
    <!-- E 表单 -->
    <!-- S 选择办理类型 -->
    <HandleType />
    <!-- E 选择办理类型 -->
    <!-- S 许可证常见的办理问题 -->
    <Question />
    <!-- E 许可证常见的办理问题 -->
    <!-- S 为什么选择薯片平台 -->
    <Select />
    <!-- E 为什么选择薯片平台 -->
    <!-- S 咨询规划师 -->
    <Planner />
    <!-- E 咨询规划师 -->
    <!-- S 您可能还需要办理 -->
    <Need />
    <!-- E 您可能还需要办理 -->
    <ConsultTel :title="titles" :tel="tel" />
    <!-- S 薯片找人 -->
    <ShuPianZhaoRen />
    <!-- E 薯片找人 -->
    <!-- S 底部 -->
    <FixedBottom :planner="planner" />
    <!-- E 底部 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
import Banner from '@/components/spread/licence/Banner'
import Form from '@/components/spread/licence/Form'
import HandleType from '@/components/spread/licence/HandleType'
import Question from '@/components/spread/licence/Question'
import Select from '@/components/spread/licence/Select'
import Planner from '@/components/spread/licence/Planner'
import Need from '@/components/spread/licence/Need'
import ConsultTel from '~/components/spread/common/ConsultTel'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '~/components/spread/common/FixedBottom'
import DggImCompany from '~/components/spread/DggImCompany'
export default {
  components: {
    Header, // 头部
    Banner, // 轮播
    Form, // 表单
    HandleType, // 办理类型
    Question, // 常见问题
    Select, // 选择原因
    Planner, // 咨询规划师
    Need, // 可能还需要办理
    ConsultTel, //  立即咨询
    ShuPianZhaoRen, //  薯片找人
    FixedBottom, //  底部推荐按钮
    DggImCompany, // IM弹框
  },
  props: {},
  data() {
    return {
      title: '许可证',
      titles: '还有疑问？企服专家为您免费解答',
      tel: '4000-962540', // 电话号码

      // 推荐规划师
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
      // 轮播列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/h806qfpu5yg000.png',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 头部返回
    back() {
      // 返回上一页
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },
  },
  head() {
    return {
      title: '许可证办理',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.licence-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  /deep/.fixed-head {
    /deep/.my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
    }
  }
}
/deep/ .sp-bottombar-info__sign {
  display: flex;
  align-items: center;
}
/deep/.cousulttel-title[data-v-024b2072] {
  margin: 29px 0 31px 0;
  text-align: left;
}
/deep/ .back_icon {
  margin-left: 40px;
}
</style>
