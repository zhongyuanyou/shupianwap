<template>
  <div class="shopping-car-null">
    <div>
      <i></i>
    </div>
    <p>
      购物车空空如也~
      <span @click="handleGO">随便看看</span>
    </p>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ShoppingCarNull',
  components: {},
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  methods: {
    handleGO() {
      // console.log('点击随便看看')
      this.uPGoScan()
    },
    // 统一平台的跳转
    uPGoScan() {
      if (this.isInApp) {
        const iOSRouter = {
          path: 'CPSCustomer:CPSCustomer/CPSCAllCategoryViewController///push/animation',
          parameter: {},
        }
        const androidRouter = {
          path: '/reform/flutter/classify',
          parameter: {},
        }
        const iOSRouterStr = JSON.stringify(iOSRouter)
        const androidRouterStr = JSON.stringify(androidRouter)
        this.$appFn.dggJumpRoute(
          {
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast({
                message: '跳转失败',
                duration: 1000,
                icon: 'toast_ic_error',
                forbidClick: true,
              })
            }
          }
        )
      } else {
        this.$router.push({ path: '/search/searchgoods' })
      }
    },
  },
}
</script>
<style lang="less" scoped>
.shopping-car-null {
  //   height: 506px;
  display: block;
  padding: 108px 0 96px;
  text-align: center;
  div {
    i {
      display: inline-block;
      width: 340px;
      height: 340px;
      background: url(https://cdn.shupian.cn/sp-pt/wap/images/fkq0rmg6kko0000.png)
        no-repeat center center;
      background-size: 100%;
    }
  }
  p {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 44px;
    span {
      margin: 30px auto;
      display: block;
      padding-top: 10px;
      width: 184px;
      height: 64px;
      background: #4974f5;
      border-radius: 4px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
