<!--
 * @Author: xiao pu
 * @Date: 2020-11-20 10:17:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-26 15:49:14
 * @Description: file content
 * @FilePath: /chips-wap/client/components/common/imgAuth/ImgAuthDialog.vue
-->
<template>
  <div class="img-auth-dialog">
    <sp-dialog
      v-model="visible"
      show-cancel-button
      :title="title"
      :before-close="beforeClose"
    >
      <ImgAuthInput v-model="authCode" />
    </sp-dialog>
  </div>
</template>

<script>
import { Dialog } from '@chipspc/vant-dgg'
import ImgAuthInput from './ImgAuthInput'

function getElement(selector) {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  }

  return selector()
}

export default {
  name: 'ImgAuthDialog',
  components: {
    [Dialog.Component.name]: Dialog.Component,
    ImgAuthInput,
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
    title: {
      type: String,
      default: '请输入图片验证码',
    },
    callback: {
      type: Function,
      default(authCode) {
        console.log(authCode)
      },
    },
    getContainer: {
      type: String,
      default: 'body',
    },
  },
  data() {
    return {
      visible: false,
      authCode: '',
    }
  },
  watch: {
    show(newValue, oldValue) {
      if (newValue === oldValue) return
      this.visible = newValue
    },
    visible(newValue, oldValue) {
      if (newValue === oldValue) return
      this.$emit('update', newValue)
    },
  },
  mounted() {
    console.log('shiyong ')
    this.portal()
  },
  beforeDestroy() {
    if (this.getContainer) {
      const parent = this.$el.parentNode
      if (parent) {
        parent.removeChild(this.$el)
      }
    }
  },

  methods: {
    beforeClose(action, done) {
      console.log(action)
      if (this.callback) {
        this.callback(action, this.authCode)
      }
      done()
    },
    // 添加的元素
    portal() {
      const { getContainer } = this
      // const el = ref ? this.$refs[ref] : this.$el
      const el = this.$el

      let container
      if (getContainer) {
        container = getElement(getContainer)
      } else if (this.$parent) {
        container = this.$parent.$el
      }

      if (container && container !== el.parentNode) {
        container.appendChild(el)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.img-auth-dialog {
  /deep/.sp-dialog {
    width: 540px;
    height: 340px;
    .sp-dialog__header {
      padding-top: 48px;
      font-size: 36px;
      color: #1a1a1a;
      font-weight: bold;
    }
    .sp-dialog__content {
      padding: 24px 40px 48px;
    }
    .sp-dialog__footer {
      .sp-button__text {
        font-size: 32px;
      }
      .sp-dialog__cancel {
        color: #999999;
      }
    }
  }
  img {
    width: 200px;
    height: 100px;
  }
}
</style>
