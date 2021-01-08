<template>
  <div class="header">
    <div class="city-btn" @click="choiceCity">
      <span class="city-name">{{ currentCity }}</span>
      <my-icon name="sear_ic_open" size="0.14rem" color="#cccccc"></my-icon>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '~/components/common/head/header'
export default {
  name: 'HeaderBg',
  components: {},
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity.name || '成都',
    }),
  },
  methods: {
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 320px;
  margin-bottom: 24px;
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/13zjhce6649s000.jpg');
  background-size: 100% 320px;
  position: relative;
  ///deep/ .my-head {
  //  background: transparent;
  //  box-shadow: none;
  //}
  ///deep/ .back-icon {
  //  color: #ffffff !important;
  //}

  .city-btn {
    padding: 0 20px;
    height: 44px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 22px;
    position: absolute;
    left: 48px;
    bottom: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    .city-name {
      font-size: 24px;
      font-weight: bold;
      color: #ffffff;
      padding-right: 12px;
    }
  }
}
</style>
