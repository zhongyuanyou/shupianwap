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
            (token && info.nickName) || userName
              ? '欢迎你，' + userName || info.nickName || ''
              : '登录/注册'
          }}
        </p>
      </div>
    </div>
    <!--E 顶部-->
    <!--S 我的订单-->
    <div class="my_order">
      <div class="my_order_title">我的订单</div>
      <div class="my_order_type">
        <div
          v-for="(item, index) in orderTabs"
          :key="index"
          class="my_order_type_list"
        >
          <div class="icon">
            <my-icon
              :name="item.iconName"
              color="#4E78F5"
              size="0.44rem"
            ></my-icon>
          </div>
          <div class="order_text" @click="clickTab(index)">{{ item.name }}</div>
        </div>
        <!-- <div class="my_order_type_list">
          <div class="icon">
            <my-icon
              name="per_ic_handle"
              color="#4E78F5"
              size="0.44rem"
            ></my-icon>
          </div>
          <div class="order_text">办理中</div>
        </div>
        <div class="my_order_type_list">
          <div class="icon">
            <my-icon
              name="per_ic_complete"
              color="#4E78F5"
              size="0.44rem"
            ></my-icon>
          </div>
          <div class="order_text">已完成</div>
        </div>
        <div class="my_order_type_list">
          <div class="icon">
            <my-icon
              name="per_ic_cancel"
              color="#4E78F5"
              size="0.44rem"
            ></my-icon>
          </div>
          <div class="order_text">已取消</div>
        </div>
        <div class="my_order_type_list">
          <div class="icon">
            <my-icon
              name="per_ic_whole"
              color="#4E78F5"
              size="0.44rem"
            ></my-icon>
          </div>
          <div class="order_text">全部订单</div>
        </div> -->
      </div>
    </div>
    <!--E 我的订单-->
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
      <div class="my_btns_item" @click="handleClick(1)">
        <div class="my_btns_item_icon">
          <my-icon
            name="personal_ic_authenticate"
            size="0.36rem"
            color="#00B365"
          />
        </div>
        <div class="my_btns_item_con">
          实名认证
          <div class="item_lf">
            <span>{{
              realStatus === 'NO_AUTHENTICATION' ? '未认证' : '已认证'
            }}</span>
            <my-icon
              name="order_ic_listnext"
              size="0.24rem"
              color="#CCCCCC"
              class="myIcon"
            />
          </div>
        </div>
      </div>
      <div class="my_btns_item" @click="handleClick(2)">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_help" size="0.36rem" color="#00B365" />
        </div>
        <div class="my_btns_item_con">
          帮助中心
          <div class="item_lf">
            <my-icon
              name="order_ic_listnext"
              size="0.24rem"
              color="#CCCCCC"
              class="myIcon"
            />
          </div>
        </div>
      </div>
      <div class="my_btns_item" @click="handleClick(3)">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_debunk" size="0.36rem" color="#10BBB8" />
        </div>
        <div class="my_btns_item_con">
          我要吐槽
          <div class="item_lf">
            <my-icon
              name="order_ic_listnext"
              size="0.24rem"
              color="#CCCCCC"
              class="myIcon"
            />
          </div>
        </div>
      </div>
      <div class="my_btns_item" @click="handleClick(4)">
        <div class="my_btns_item_icon">
          <my-icon name="per_ic_about" size="0.36rem" color="#4974F5" />
        </div>
        <div class="my_btns_item_con no_line">
          关于我们
          <div class="item_lf">
            <my-icon
              name="order_ic_listnext"
              size="0.24rem"
              color="#CCCCCC"
              class="myIcon"
            />
          </div>
        </div>
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
      orderTabs: [
        {
          iconName: 'per_ic_payment',
          name: '待付款',
        },
        {
          iconName: 'per_ic_handle',
          name: '办理中',
        },
        {
          iconName: 'per_ic_complete',
          name: '已完成',
        },
        {
          iconName: 'per_ic_cancel',
          name: '已取消',
        },
        {
          iconName: 'per_ic_whole',
          name: '全部订单',
        },
      ],
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
      userName: '',
      realStatus: 'NO_AUTHENTICATION',
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId,
      token: (state) => state.user.userInfo.token,
      userPhone: (state) => state.user.userInfo.userPhone,
    }),
    avatar() {
      return GOODSLIST
    },
  },
  mounted() {
    if (this.userId || this.$cookies.get('token')) {
      this.userName = this.$cookies.get('userName')
      this.getUserInfo()
    }
  },

  methods: {
    clickTab(index) {
      // console.log('index', index)
      this.$router.push({
        path: '/order',
        query: {
          type: index,
        },
      })
    },
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
          id: this.userId || this.$cookies.get('userId'),
        }
        const res = await this.$axios.get(userinfoApi.info, { params })
        this.loading = false
        if (res.code === 200 && res.data && typeof res.data === 'object') {
          this.info = res.data
          this.userName = res.data.nickName
          this.realStatus = res.data.realStatus
          // console.log(res.data.realStatus)
          this.$store.dispatch('user/setInfo', res.data)
        } else {
          // 清除用户缓存信息
          this.$store.dispatch('user/clearUser')
        }
      } catch (err) {
        this.loading = false
      }
    },
    handleClick(val) {
      if (val === 1) {
        this.realStatus === 'NO_AUTHENTICATION'
          ? this.$router.push('/contract/authentication')
          : this.$router.go(0)
      } else if (val === 2) {
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
        this.userName = ''
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
  &_order {
    height: 240px;
    padding: 0 40px;
    margin-top: 25px;
    background: #ffffff;
    &_title {
      font-size: 40px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #1a1a1a;
      padding: 32px 0;
    }
    &_type {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &_list {
        text-align: center;
        .icon {
          height: 44px;
          line-height: 44px;
          display: flex;
          justify-content: center;
        }
        .order_text {
          font-size: 24px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #222222;
          line-height: 24px;
          padding-top: 20px;
        }
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
        display: flex;
        justify-content: space-between;
        .item_lf {
          display: flex;
          padding-right: 40px;
          span {
            padding-right: 8px;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
          }
          .myIcon {
            color: #cccccc;
          }
        }
      }
    }
  }
  .exit_btn {
    margin: 65px 24px 0 24px;
    height: 280px;
    /deep/ .sp-button {
      width: 100%;
    }
  }
  .spiconfont {
    display: block;
  }
}
</style>
