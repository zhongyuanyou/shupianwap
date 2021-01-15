<template>
  <div class="page-content">
    <!-- S 头部 -->
    <Header v-if="!isInApp" ref="headerRef" title="" />
    <!-- E 头部 -->
    <!-- 1、START 头部Header-->
    <!--    <Header title="" :fixed="true" head-class="head-icon">-->
    <!--      <template v-slot:right>-->
    <!--        <span class="my-customize-header" @click="choiceCity">-->
    <!--          <span class="my-customize-header-text">{{ currentCity }}</span>-->
    <!--          <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>-->
    <!--        </span>-->
    <!--      </template>-->
    <!--    </Header>-->
    <!-- 1、END 头部Header-->

    <!-- 2、START banner和导航-->
    <div class="banner-nav">
      <div class="nav">
        <sp-work-tabs v-model="activeNavTabIndex">
          <sp-work-tab v-for="index in navTabs" :key="index" :title="index">
          </sp-work-tab>
        </sp-work-tabs>
      </div>
    </div>
    <!-- 2、END banner和导航-->

    <!-- 3、START 内容-->
    <div class="content">
      <div class="content-center">
        <img
          class="content-center-img"
          src="https://cdn.shupian.cn/sp-pt/wap/images/d7k80tslhd40000.jpg"
        />
        <div class="content-center-text">
          <p>定制专属需求</p>
          <p>方便我们更好为您服务</p>
        </div>
        <sp-button plain type="primary" @click="toDemandCardPage">
          定制需求
        </sp-button>
      </div>
    </div>
    <!-- 3、END 内容-->
  </div>
</template>

<script>
import { WorkTab, WorkTabs, Button } from '@chipspc/vant-dgg'
import { mapMutations, mapState } from 'vuex'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'NeedCard',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Button.name]: Button,
    Header,
  },
  data() {
    return {
      navTabs: [
        '公司注册',
        '代理记账',
        '公司交易',
        '工商变更',
        '审计业务',
        '许可证办理',
      ],
      activeNavTabIndex: '',
    }
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    // ...mapState({
    //   currentCity: (state) => state.city.currentCity.name || '成都',
    // }),
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path === '/spread/myDemandCard') {
          this.$nextTick(() => {
            sessionStorage.removeItem('formData')
          })
        }
      },
      immediate: true,
    },
  },
  created() {
    if (process.client) {
      this.$appFn.dggSetTitle({ title: '轻松找服务' }, (res) => {})
    }
  },
  mounted() {
    this.SET_KEEP_ALIVE({ type: 'add', name: 'NeedCard' })
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
    // 根据选项跳转页面
    toDemandCardPage() {
      switch (this.navTabs[this.activeNavTabIndex]) {
        case '公司注册': {
          this.$router.push({ path: '/spread/myDemandCard/companyRegister' })
          break
        }
        case '代理记账': {
          this.$router.push({ path: '/spread/myDemandCard/agentBilling' })
          break
        }
        case '公司交易': {
          this.$router.push({ path: '/spread/myDemandCard/companyTransaction' })
          break
        }
        case '工商变更': {
          this.$router.push({ path: '/spread/myDemandCard/companyAlteration' })
          break
        }
        case '审计业务': {
          this.$router.push({ path: '/spread/myDemandCard/auditingService' })
          break
        }
        case '许可证办理': {
          this.$router.push({ path: '/spread/myDemandCard/permitHandling' })
          break
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  height: 100%;
  font-family: PingFang SC;
  background-color: #fff;
  /deep/ .my-head {
    width: @spread-page-width !important;
    left: auto !important;
    box-shadow: none;
  }

  // 自定义头部组件右侧样式
  .my-customize-header {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .my-customize-header-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }

  // banner和导航
  .banner-nav {
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/cyfejr5z9fk0000.jpg');
    background-size: 100% 100%;
    width: 750px;
    height: 358px;
    position: relative;
    font-family: PingFang SC;
    .nav {
      position: absolute;
      bottom: 0;
      width: 100%;
      // 穿透-导航组件
      /deep/ .sp-work-tabs__nav--line {
        background: transparent;
      }
      /deep/ .sp-work-tab {
        font-size: 32px;
        font-weight: bold;
        padding: 0 20px;
      }
      // 穿透-导航组件：左右间距保持40px
      /deep/ .sp-work-tab:nth-of-type(1) {
        padding-left: 40px !important;
      }
      /deep/ .sp-work-tab:last-child {
        padding-right: 40px !important;
      }
    }
  }

  // 内容
  .content-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .content-center-img {
      width: 340px;
      height: 340px;
      margin-top: 80px;
      margin-bottom: 24px;
    }
    .content-center-text {
      margin-bottom: 48px;
      p {
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 45px;
      }
    }
    // 穿透修改-按钮：定制需求按钮
    /deep/ .sp-button {
      width: 264px;
      height: 80px;
      border: 2px solid #4974f5;
      border-radius: 40px;
      font-size: 32px !important;
      font-weight: bold;
      line-height: 80px;
      user-select: none;
    }
    // 穿透-按钮：当手指点击按钮时显示蓝底白字，移开手指恢复之前样式
    /deep/ .sp-button:active {
      background: #4974f5 !important;
      color: #ffffff !important;
      transition: all 0.1s;
      -moz-transition: all 0.1s;
    }
  }
}
</style>
