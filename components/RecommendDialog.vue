<!--
 * @Author: xiao pu
 * @Date: 2020-11-21 09:58:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 09:52:21
 * @Description: file content
 * @FilePath: /chips-wap/client/components/RecommendDialog.vue
-->

<template>
  <div class="recommend-dialog">
    <sp-popup
      v-model="visible"
      position="center"
      class="recommend-dialog_wrap"
      :closeable="false"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div class="recommend-dialog-content">
        <div class="recommend-dialog-content_body">
          <slot name="default"> 当前内容为空</slot>
        </div>
        <div class="recommend-dialog-content_foot">
          <sp-button round class="close-btn" @click="hanleClose"
            ><my-icon
              name="popup_ic_closeb"
              size="0.76rem"
              color="rgba(255, 255, 255, 1)"
            ></my-icon
          ></sp-button>
        </div>
      </div>
    </sp-popup>
  </div>
</template>

<script>
import { Popup, Button } from '@chipspc/vant-dgg'

export default {
  name: 'RecommendDialog',
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
  },
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
    return {}
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
  mounted() {
    console.log('shiyong ')
  },
  methods: {
    hanleClose() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.recommend-dialog {
  .recommend-dialog-content {
    overflow: hidden;
  }
  &_wrap {
    background-color: transparent;
  }
  &-content {
    &_body {
      background-color: #ffffff;
    }
    &_foot {
      display: flex;
      justify-content: center;
      padding-top: 48px;
      .close-btn {
        width: 76px;
        height: 76px;
        color: #ffffff;
        border: none;
        background-color: transparent;
      }
    }
  }
}
</style>
