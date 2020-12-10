<template>
  <div class="nickname">
    <!--S 头部-->
    <sp-top-nav-bar
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
    <div class="nickname_con">
      <div class="nickname_con_item">
        <input v-model="nickname" placeholder="请输入您的昵称" type="text" />
        <div class="nickname_con_item_close" @click="clear">
          <my-icon name="pay_ic_fail" size="0.32rem" color="#ccc" />
        </div>
      </div>
    </div>
    <!--E 内容-->
  </div>
</template>

<script>
import { TopNavBar } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { userInfo } from '@/api'
export default {
  name: 'NickName',
  components: {
    [TopNavBar.name]: TopNavBar,
  },
  data() {
    return {
      nickname: '',
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId || null,
    }),
  },
  mounted() {
    this.nickname = this.$route.params.nickname
  },
  methods: {
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    async onClickRight() {
      // 点击保存
      // this.$router.push('/my/information')
      const params = {
        id: this.userId,
      }
      const res = await userInfo.update({ axios: this.$axios }, {})
    },
    clear() {
      // 清除昵称
      this.name = ''
    },
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
