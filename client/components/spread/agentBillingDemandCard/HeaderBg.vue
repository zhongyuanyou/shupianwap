<template>
  <div class="header">
    <Header title="" :fixed="false" head-class="head-icon" />
    <div class="city-btn" @click="choiceCity">
      <span class="city-name">成都</span>
      <my-icon name="sear_ic_open" size="0.14rem" color="#cccccc"></my-icon>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/head/header'
export default {
  name: 'HeaderBg',
  components: {
    Header,
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
  height: 418px;
  margin-bottom: 32px;
  background-image: url('~assets/spreadImages/agentBillingDemandCard/Step1-img-banner.jpg');
  background-size: 100% 418px;
  position: relative;
  /deep/ .my-head {
    background: transparent;
    box-shadow: none;
  }
  /deep/ .back-icon {
    color: #ffffff !important;
  }

  .city-btn {
    width: 113px;
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
