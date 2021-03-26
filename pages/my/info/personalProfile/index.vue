<template>
  <div class="personal_profile">
    <sp-top-nav-bar
      :title="'个人简介'"
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
    <div class="textarea">
      <sp-field
        v-model="content"
        rows="3"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="用一段话介绍自己"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { TopNavBar, Toast, Field } from '@chipspc/vant-dgg'
import { userinfoApi } from '~/api'
export default {
  name: 'PersonalProfile',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [Field.name]: Field,
  },
  data() {
    return {
      content: '',
    }
  },
  mounted() {
    // this.email = this.$route.query.email
  },
  methods: {
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    async onClickRight() {
      // 点击保存
      // const params = {
      //   type: 4,
      //   value: this.email,
      // }
      // await this.$axios.post(userinfoApi.update, params)
      // this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.personal_profile {
  height: 100%;
  background-color: #f8f8f8;
  /deep/ .sp-top-nav-bar {
    height: 88px;
  }
  .textarea {
    padding-top: 112px;
    /deep/ .sp-cell {
      padding: 40px 40px 24px;
    }
    /deep/ .sp-field__control {
      color: #222222;
      font-size: 32px;
    }
    /deep/ .sp-field__word-limit {
      color: #cccccc;
      font-size: 24px;
    }
  }
}
</style>
