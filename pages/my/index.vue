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
          :src="info.url ? info.url : avatar"
          @click="handleAvatar"
        />
        <p class="txt" @click="handleClickLogin">
          {{
            userId && info.nickName
              ? '欢迎你，' + info.nickName || ''
              : '登录/注册'
          }}
        </p>
      </div>
    </div>
    <!--E 顶部-->
    <!--S 按钮区-->
    <div class="my_btns">
      <!--      <div class="my_btns_item" @click="handleClick(0)">-->
      <!--        <div class="my_btns_item_icon">-->
      <!--          <my-icon name="per_ic_entrust" size="0.36rem" color="#4974F5" />-->
      <!--        </div>-->
      <!--        <div class="my_btns_item_con">委托出售</div>-->
      <!--      </div>-->
      <!--      <div class="my_btns_item" @click="handleClick(1)">-->
      <!--        <div class="my_btns_item_icon">-->
      <!--          <my-icon name="per_ic_cooperation" size="0.36rem" color="#FE8C29" />-->
      <!--        </div>-->
      <!--        <div class="my_btns_item_con">我要合作</div>-->
      <!--      </div>-->
      <div class="my_btns_item" @click="handleClick(2)">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_help" size="0.36rem" color="#00B365" />
        </div>
        <div class="my_btns_item_con">帮助中心</div>
      </div>
      <div class="my_btns_item" @click="handleClick(3)">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_debunk" size="0.36rem" color="#10BBB8" />
        </div>
        <div class="my_btns_item_con">我要吐槽</div>
      </div>
      <div class="my_btns_item" @click="handleClick(4)">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_about" size="0.36rem" color="#4974F5" />
        </div>
        <div class="my_btns_item_con no_line">关于我们</div>
      </div>
    </div>
    <!--S 按钮区-->
    <!--S 退出登录-->
    <div class="exit_btn">
      <sp-button v-if="userId" type="default" @click="showExit"
        >退出登录</sp-button
      >
    </div>
    <!--E 退出登录-->
    <!--S 弹框-->
    <sp-center-popup
      v-model="loginStatus"
      :field="Field7"
      button-type="confirm"
      @confirm="exitConfirm"
    />
    <!--E 弹框-->
    <Loading-center v-show="loading" />
  </div>
</template>

<script>
import { Button, Image, CenterPopup } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { userinfoApi } from '@/api'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import { GOODSLIST } from '~/config/constant'
export default {
  layout: 'nav',
  name: 'Index',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [CenterPopup.name]: CenterPopup,
    LoadingCenter,
  },
  data() {
    return {
      info: {
        fullName: '', // 用户昵称
        url: '', // 头像
      }, // 用户信息
      loginStatus: false, // 弹框显示状态
      Field7: {
        type: 'functional',
        title: '确定退出吗？',
      },
      loading: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId,
      token: (state) => state.user.userInfo.token,
    }),
    avatar() {
      return GOODSLIST
    },
  },
  mounted() {
    if (this.userId) {
      this.getUserInfo()
    }
  },
  methods: {
    handleAvatar() {
      // 点击头像
      if (!this.userId) {
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath },
        })
      } else {
        this.$router.push('/my/information')
      }
    },
    handleClickLogin() {
      if (this.userId) return
      this.$router.push({
        name: 'login',
        query: { redirect: this.$route.fullPath },
      })
    },
    async getUserInfo() {
      this.loading = true
      // 获取用户信息
      try {
        const params = {
          // id: this.userId,
          id: this.userId,
        }
        const res = await this.$axios.get(userinfoApi.info, { params })
        this.loading = false
        if (res.code === 200 && res.data && typeof res.data === 'object') {
          this.info = res.data
        } else {
          // 清除用户缓存信息
          this.$store.dispatch('user/clearUser')
        }
      } catch (err) {
        this.loading = false
      }
    },
    handleClick(val) {
      if (val === 2) {
        this.$router.push('/my/help')
      } else if (val === 3) {
        this.$router.push('/my/complain')
      } else if (val === 4) {
        this.$router.push('/my/about')
      }
    },
    showExit() {
      this.loginStatus = true
    },
    async exitConfirm() {
      // 退出
      const params = {
        userId: this.userId,
        token: this.token,
      }
      const res = await this.$axios.get(userinfoApi.loginOut, { params })
      if (res.code === 200) {
        // 清除cookie中的数据
        this.info.url = ''
        this.$store.dispatch('user/clearUser')
      }
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
        font-family: PingFang SC;
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
