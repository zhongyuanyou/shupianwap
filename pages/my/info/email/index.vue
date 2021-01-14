<template>
  <div class="email">
    <!--S 头部-->
    <sp-top-nav-bar
      :title="'电子邮箱'"
      ellipsis
      :fixed="true"
      :right-text="'保存'"
      @on-click-left="onClickLeft"
      @on-click-right="onClickRight"
    >
      <template #left>
        <div>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A" />
        </div>
      </template>
    </sp-top-nav-bar>
    <!--E 头部-->
    <!--S 内容-->
    <div class="email_con">
      <div class="email_con_item">
        <input
          v-model="email"
          placeholder="请输入您的电子邮箱地址"
          type="text"
          @change="checkEmai"
        />
        <div class="email_con_item_close" @click="clear">
          <my-icon name="pay_ic_fail" size="0.32rem" color="#ccc" />
        </div>
      </div>
    </div>
    <!--E 内容-->
  </div>
</template>

<script>
import { TopNavBar, Toast } from '@chipspc/vant-dgg'
import { checkEmail } from '~/utils/check'
import { userinfoApi } from '~/api'
export default {
  name: 'Email',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
  },
  data() {
    return {
      email: '',
      emailRight: false, // 邮箱格式是否正确
    }
  },
  mounted() {
    this.email = this.$route.query.email
    const status = checkEmail(this.email)
    this.emailRight = status
  },
  methods: {
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    async onClickRight() {
      // 点击保存
      if (!this.emailRight) {
        Toast({
          message: '请输入有效邮箱号码',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
        return
      }
      const params = {
        type: 4,
        value: this.email,
      }
      await this.$axios.post(userinfoApi.update, params)
      this.$router.back()
    },
    clear() {
      // 清除昵称
      this.email = ''
    },
    checkEmai() {
      // 校验邮箱格式
      const status = checkEmail(this.email)
      if (!status) {
        Toast({
          message: '请输入有效邮箱号码',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
        this.emailRight = false
        return
      }
      this.emailRight = true
    },
  },
}
</script>

<style lang="less" scoped>
.email {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /deep/ .sp-top-nav-bar {
    height: 88px;
  }
  &_con {
    padding-top: 88px;
    display: flex;
    flex-direction: column;
    &_item {
      width: 100%;
      height: 120px;
      margin-top: 24px;
      background-color: #fff;
      border-bottom: 1px solid #f4f4f4;
      border-top: 1px solid #f4f4f4;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      padding: 0 40px;
      &_close {
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input {
        width: 598px;
        border: none;
        height: 116px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 44px;
        &:focus {
          outline: none;
        }
        //去除点击时候的背景色
        -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
      }
      //修改input-placeholder样式
      ::-webkit-input-placeholder {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #cccccc;
        line-height: 44px;
      }
    }
  }
}
</style>
