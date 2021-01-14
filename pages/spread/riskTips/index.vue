<template>
  <div class="center">
    <!--  头部  -->
    <sp-top-nav-bar
      v-if="hideHeader !== 'true'"
      title=""
      left-arrow
      ellipsis
      :fixed="true"
      :placeholder="true"
      z-index="999"
      @on-click-left="onClickLeft"
    />
    <!--  头部  -->
    <!-- 主体 -->
    <div class="content">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/fto4vsxab1k0000.png"
        alt=""
        class="content-bg"
      />
      <div class="content-title">重要风险提示</div>
      <div class="content-body"></div>
    </div>
    <!-- 主体 -->
  </div>
</template>

<script>
import { TopNavBar } from '@chipspc/vant-dgg'
import { riskTipsApi } from '@/api/riskTips'
export default {
  name: 'Index',
  components: { [TopNavBar.name]: TopNavBar },
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(riskTipsApi.list, {
        params: {
          categoryCode: 'protocol100007',
          includeField: 'title,content',
        },
      })
      if (res.code === 200) {
        return { getMessage: res.data.rows[0].content }
      }
    } catch (error) {
      console.log('error', error)
    }
  },
  data() {
    return {
      text: '',
    }
  },
  computed: {
    hideHeader() {
      return this.$route.query.hideHeader
    },
  },
  mounted() {
    console.log(this.hideHeader)
    document.getElementsByClassName(
      'content-body'
    )[0].innerHTML = this.getMessage
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
  },
  head() {
    return {
      title: '重要风险提示',
    }
  },
}
</script>

<style scoped lang="less">
.center {
  width: @spread-page-width;
  margin: 0 auto;
}
.content {
  padding: 80px 40px 40px;
  background: #eff1f8;
  position: relative;
  &-bg {
    height: 393px;
    width: @spread-page-width;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-title {
    margin: 0 0 75px 0;
    font-weight: bold;
    line-height: 68px;
    font-size: 68px;
    font-weight: bold;
    color: #222222;
    position: relative;
    z-index: 998;
  }
  &-body {
    min-height: 1349px;
    border-radius: 8px;
    padding: 52px 47px 38px;
    font-size: 28px;
    font-weight: 400;
    box-shadow: 18px 0px 8px rgba(87, 130, 230, 0.08);
    position: relative;
    background: #ffffff;
    z-index: 2;
  }
}
// 头部组件多出线条的修改
/deep/ .sp-hairline--bottom::after {
  border: none;
}
// 头部组件左边的icon样式
/deep/ .sp-top-nav-bar__left {
  color: #333333;
}
/deep/ .sp-top-nav-bar__arrow {
  font-size: 32px;
  font-weight: bold;
}
/deep/ .sp-top-nav-bar--fixed {
  width: 750px;
  margin-left: 50%;
  transform: translateX(-375px);
}
</style>
