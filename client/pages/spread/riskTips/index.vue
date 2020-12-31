<template>
  <div class="center">
    <!--  头部  -->
    <sp-top-nav-bar title="" left-arrow ellipsis @on-click-left="onClickLeft" />
    <!--  头部  -->
    <!-- 主体 -->
    <div class="content">
      <div class="content-title">重要风险提示</div>
      <div class="content-body">
        ai join fioasdn fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods
        nfadsn fian ioenio rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdio rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
        fioan iofna oijfaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaods nfadsn fian ioenio
        rneioNIN oinsfdion
        isoafn你覅水泥地哦年山东你发哪兄弟是南方熊十多年穷水电费ai join fioasdn
      </div>
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
    const id = 1
    try {
      const res = await $axios.get(riskTipsApi.list, {
        params: {
          id,
        },
      })
      if (res.code === 200) {
        console.log(res.data)
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
  width: 750px;
  margin: 0 auto;
}
.content {
  padding: 80px 40px 40px;
  background: #eff1f8;
  &-title {
    margin: 0 0 50px 0;
    font-size: 60px;
    font-weight: bold;
    line-height: 60px;
  }
  &-body {
    border-radius: 15px;
    background: #ffffff;
    margin-bottom: 40px;
    box-shadow: -16px 16px 16px -16px rgba(0, 0, 0, 0.1);
    padding: 40px;
    font-size: 23px;
    font-weight: 400;
  }
}
// 头部组件多出线条的修改
/deep/ .sp-hairline--bottom::after {
  border: none;
}
</style>
