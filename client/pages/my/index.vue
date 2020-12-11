<template>
  <div class="my">
    <!--S 顶部-->
    <div class="my_tp">
      <div class="my_tp_info">
        <sp-image
          round
          width="1.06rem"
          height="1.06rem"
          fit="cover"
          class="my_tp_info_img"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          @click="handleAvatar"
        />
        <p class="txt" @click="handleClickLogin">
          {{ info ? '欢迎你，' + info.fullName || '' : '登录/注册' }}
        </p>
      </div>
    </div>
    <!--E 顶部-->
    <!--S 按钮区-->
    <div class="my_btns">
      <div class="my_btns_item">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_entrust" size="0.36rem" color="#4974F5" />
        </div>
        <div class="my_btns_item_con">委托出售</div>
      </div>
      <div class="my_btns_item">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_cooperation" size="0.36rem" color="#FE8C29" />
        </div>
        <div class="my_btns_item_con">我要合作</div>
      </div>
      <div class="my_btns_item" @click="$router.push('/my/help')">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_help" size="0.36rem" color="#00B365" />
        </div>
        <div class="my_btns_item_con">帮助中心</div>
      </div>
      <div class="my_btns_item">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_debunk" size="0.36rem" color="#10BBB8" />
        </div>
        <div class="my_btns_item_con">我要吐槽</div>
      </div>
      <div class="my_btns_item">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_about" size="0.36rem" color="#4974F5" />
        </div>
        <div class="my_btns_item_con no_line">关于我们</div>
      </div>
    </div>
    <!--S 按钮区-->
    <!--S 退出登录-->
    <div class="exit_btn">
      <sp-button v-if="info" type="default">退出登录</sp-button>
    </div>
    <!--E 退出登录-->
  </div>
</template>

<script>
import { Button, Image } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { userInfo } from '@/api'
export default {
  layout: 'nav',
  name: 'Index',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
  },
  data() {
    return {
      info: null, // 用户信息
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId || null,
    }),
  },
  created() {
    if (this.userId) {
      this.getUserInfo()
    }
  },
  methods: {
    handleAvatar() {
      // 点击头像
      if (!this.info) {
        this.$router.push('/login')
      } else {
        this.$router.push('/my/information')
      }
    },
    handleClickLogin() {
      if (this.info) return
      this.$router.push({
        name: 'login',
        query: { redirect: this.$route.fullPath },
      })
    },
    async getUserInfo() {
      // 获取用户信息
      const params = {
        id: this.userId,
      }
      const data = await userInfo.info({ axios: this.$axios }, params)
      this.info = data
    },
  },
}
</script>

<style lang="less" scoped>
.my {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  &_tp {
    width: 100%;
    height: 394px;
    background-color: #4974f5;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    &_info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &_img {
        width: 106px;
        height: 106px;
        border-radius: 53px;
        margin-top: 80px;
      }
      .txt {
        font-size: 32px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 32px;
        margin-top: 48px;
      }
    }
  }
  &_btns {
    width: 100%;
    border-bottom: 1px solid rgba(205, 205, 205, 0.5);
    border-top: 1px solid rgba(205, 205, 205, 0.5);
    margin-top: 24px;
    &_item {
      height: 107px;
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      padding-left: 40px;
      &_icon {
        width: 0.36rem;
        height: 107px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .no_line {
        border-bottom: none;
      }
      &_con {
        height: 107px;
        margin-left: 24px;
        width: 100%;
        border-bottom: 1px solid rgba(205, 205, 205, 0.5);
        text-align: left;
        line-height: 107px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
      }
    }
  }
  .exit_btn {
    margin: 65px 24px 0 24px;
    height: 80px;
    /deep/ .sp-button {
      width: 100%;
    }
  }
}
</style>
