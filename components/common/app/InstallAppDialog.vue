<!--
 * @Author: xiao pu
 * @Date: 2020-11-21 11:21:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 08:46:12
 * @Description: file content
 * @FilePath: /chips-wap/client/components/app/InstallAppDialog.vue
-->
<template>
  <div class="install-app-dialog">
    <RecommendDialog v-model="visible" v-bind="$attrs" v-on="$listeners">
      <div class="install-app">
        <img
          :src="$ossImgSet(160, 160, 'g6trabnxtg80000.png')"
          alt=""
          class="install-app_logo"
        />
        <h4 class="install-app_title">薯片找人APP</h4>
        <p class="install-app_descript">找人服务，尽在薯片找人</p>
        <sp-button
          type="primary"
          class="install-app_btn"
          @click="openApp($event)"
          >立即下载</sp-button
        >
      </div>
    </RecommendDialog>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import RecommendDialog from '~/components/RecommendDialog'

import openapp from '~/mixins/openapp'

export default {
  name: 'InstallAppDialog',
  components: {
    [Button.name]: Button,
    RecommendDialog,
  },
  mixins: [openapp],
  model: {
    prop: 'show',
    event: 'update',
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      thisType: 'installapp',
    }
  },
  computed: {
    visible: {
      get() {
        return this.show
      },
      set(newVal) {
        this.$emit('update', newVal)
      },
    },
  },
  mounted() {},
}
</script>

<style lang="less" scoped>
.install-app-dialog {
  overflow: hidden;
  /deep/.recommend-dialog-content_body {
    border-radius: 24px;
    width: 580px;
    height: 736px;
  }
  .install-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    &_logo {
      width: 140px;
      height: 140px;
      background: #4974f5;
      border-radius: 24px;
      margin-top: 108px;
    }
    &_title {
      font-size: 40px;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 44px;
      margin-top: 70px;
    }
    &_descript {
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-top: 28px;
    }
    &_btn {
      width: 320px;
      height: 88px;
      border-radius: 8px;
      margin-top: 148px;
      /deep/.sp-button__text {
        font-size: 32px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
}
</style>
