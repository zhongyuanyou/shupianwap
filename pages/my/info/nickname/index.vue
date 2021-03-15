<template>
  <div class="nickname">
    <!--S 头部-->
    <sp-top-nav-bar
      v-if="!isApplets"
      :title="'昵称'"
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
    <div
      class="nickname_con"
      :style="{ paddingTop: isApplets ? '0' : '0.88rem' }"
    >
      <div class="nickname_con_item">
        <input
          v-model="nickname"
          maxlength="14"
          placeholder="请输入您的昵称"
          type="text"
        />
        <div class="nickname_con_item_close" @click="clear">
          <my-icon name="pay_ic_fail" size="0.32rem" color="#ccc" />
        </div>
      </div>
    </div>
    <!--E 内容-->
    <!--小程序的时候显示-->
    <button v-if="isApplets" class="nickname_btn" @click="onClickRight">
      保存
    </button>
    <!--小程序的时候显示-->
    <sp-toast ref="spToast"></sp-toast>
  </div>
</template>

<script>
import { TopNavBar } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { userinfoApi } from '~/api'
import SpToast from '@/components/common/spToast/SpToast'
export default {
  name: 'NickName',
  components: {
    [TopNavBar.name]: TopNavBar,
    SpToast,
  },
  data() {
    return {
      nickname: '',
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId || null,
      isApplets: (state) => state.app.isApplets,
    }),
  },
  mounted() {
    this.nickname = this.$route.query.nickName
  },
  methods: {
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    async onClickRight() {
      // 点击保存
      const regCn = new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
      )
      if (!this.nickname) {
        // 未填写用户昵称
        this.$refs.spToast.show({
          message: '没有输入昵称呢，请重新输入',
          duration: 1500,
          forbidClick: true,
        })
      } else if (this.nickname.length < 2 || this.nickname.length > 14) {
        this.$refs.spToast.show({
          message: '昵称字数限制为2-14位',
          duration: 1500,
          forbidClick: true,
        })
      } else if (regCn.test(this.nickname)) {
        this.$refs.spToast.show({
          message: '昵称不能输入特殊字符',
          duration: 1500,
          forbidClick: true,
        })
      } else {
        const params = {
          type: 1,
          value: this.nickname,
        }
        await this.$axios
          .post(userinfoApi.update, params)
          .then((res) => {
            console.log('res', res)
            if (res.code === 200) {
              this.$xToast.success('修改成功')
              this.$router.back()
            }
          })
          .catch((err) => {
            this.$xToast.error(err.message)
          })
      }
    },
    clear() {
      // 清除昵称
      this.nickname = ''
    },
  },
  head() {
    return {
      title: '编辑昵称',
    }
  },
}
</script>

<style lang="less" scoped>
.nickname {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /deep/ .sp-top-nav-bar {
    height: 88px;
  }
  &_con {
    //padding-top: 88px;
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
  &_btn {
    width: 670px;
    height: 96px;
    background: #4974f5;
    border-radius: 8px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    margin: 72px 40px 0;
  }
}
</style>
