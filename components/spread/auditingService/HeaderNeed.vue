<template>
  <div class="header">
    <div class="city-btn" @click="choiceCity">
      <span class="city-name">{{ currentCity || '成都市' }}</span>
      <my-icon name="sear_ic_open" size="0.14rem" color="#cccccc"></my-icon>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderBg',
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity.name,
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
  margin-bottom: 64px;
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/13zjhce6649s000.jpg');
  background-size: 100% 320px;
  position: relative;
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
