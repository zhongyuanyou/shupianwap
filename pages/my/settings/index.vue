<template>
  <div class="settings">
    <Header title="个人设置" />
    <div class="person">
      <div class="tx">
        <img :src="$ossImgSetV2(imgList.tx)" alt="" />
      </div>
      <span>{{ userInfo.fullName }}</span>
    </div>
    <div class="person-info">
      <div class="item">
        <h3>手机号</h3>
        <p>{{ userInfo.decodePhone }}</p>
      </div>
      <div class="item" @click="$router.push('/my/settings/setPassword')">
        <h3>支付密码设置</h3>
        <sp-icon
          class-prefix="spiconfont"
          name="you"
          size="0.25rem"
          color="#ccc"
        ></sp-icon>
      </div>
    </div>
    <div class="auth-item">
      <h3>身份认证</h3>
      <p>
        {{
          userInfo.realStatus === 'AUTHENTICATION_SUCCESS' ? '已认证' : '未认证'
        }}
      </p>
    </div>
    <!-- <button>提交</button> -->
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
    [Icon.name]: Icon,
  },
  data() {
    return {
      value: '',
      showKeyboard: true,
      valid: false,
      imgList: {
        tx: '2exrifx8gxes000.png',
      },
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem('info'))
    },
  },
}
</script>

<style lang="less" scoped>
.settings {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: PingFangSC-Regular;
  > button {
    position: fixed;
    bottom: 32px;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    width: 100%;
    display: block;
    height: 95px;
    background: #4974f5;
    border-radius: 8px;
    margin-top: 64px;
    font-weight: bold;
  }
  .person {
    height: 120px;
    background: #ffffff;
    padding: 16px 40px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    .tx {
      width: 88px;
      height: 88px;
      border-radius: 88px;
      overflow: hidden;
      display: flex;
      align-items: center;
      img {
        width: 88px;
        height: 88px;
        object-fit: cover;
      }
    }

    span {
      margin-left: 24px;
      font-size: 32px;
      color: #222222;
    }
  }
  .person-info {
    margin-top: 20px;
    .item {
      padding: 0 40px;
      height: 112px;
      line-height: 112px;
      color: #222222;
      font-size: 32px;
      display: flex;
      background: #fff;
      justify-content: space-between;
      &:first-child {
        border-bottom: 1px solid #f4f4f4;
      }
      h3 {
        font-weight: normal;
        font-size: 32px;
      }
      p {
        text-align: right;
        font-size: 32px;
        font-weight: bold;
      }
      ::v-deep .spiconfont-you {
      }
    }
  }
  .auth-item {
    padding: 0 40px;
    height: 112px;
    line-height: 112px;
    color: #222222;
    font-size: 32px;
    display: flex;
    background: #fff;
    justify-content: space-between;
    margin-top: 20px;

    h3 {
      font-weight: normal;
      font-size: 32px;
    }
    p {
      text-align: right;
      font-size: 32px;
      font-weight: bold;
    }
  }
}
</style>
