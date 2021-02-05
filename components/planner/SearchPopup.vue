<template>
  <div class="popup">
    <sp-popup
      ref="popupShut"
      v-model="popupShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <Header title="在线直选规划师">
        <template #left>
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          ></my-icon>
        </template>
      </Header>
      <div class="search">
        <Search
          v-model="search.keywords"
          v-focus="focusCommand"
          placeholder="请输入规划师姓名"
          @searchKeydownHandle="handleSearch"
        />
      </div>
    </sp-popup>
  </div>
</template>
<script>
import { Popup } from '@chipspc/vant-dgg'

import Header from '@/components/common/head/header'
import Search from '@/components/common/search/Search'

export default {
  components: {
    [Popup.name]: Popup,
    Search,
    Header,
  },
  directives: {
    focus: {
      bind(el, binding, vnode) {
        el.focusHandler = (event) => {
          console.log('focusHandler!')
          const { context } = vnode
          const { expression } = binding
          if (!context[expression]) {
            context[expression] = true
          }
        }
        el.blurHandler = (event) => {
          console.log('blurHandler!')
          const { context } = vnode
          const { expression } = binding
          if (context[expression]) {
            context[expression] = false
          }
        }

        el.addFocus = (element) => {
          if (!element) return
          el.removeFocus(element)
          element.addEventListener('focus', el.focusHandler)
        }
        el.addBlur = (element) => {
          if (!element) return
          el.removeBlur(element)
          element.addEventListener('blur', el.blurHandler)
        }

        el.removeFocus = (element) => {
          if (!element) return
          element.removeEventListener('focus', el.focusHandler)
        }
        el.removeBlur = (element) => {
          if (!element) return
          element.removeEventListener('blur', el.blurHandler)
        }

        el.getInput = (element) => {
          let inputDom = element
          if (inputDom.tagName !== 'INPUT') {
            inputDom = element.querySelector('input')
          }
          if (inputDom.tagName === 'INPUT') return inputDom
          return null
        }
      },
      inserted(el, binding) {
        console.log('focus dirctive inserted')
        const inputDom = el.getInput(el)
        if (!inputDom) return
        el.inputDom = inputDom
        const { value, expression } = binding
        value || !expression ? inputDom.focus() : inputDom.blur()
        el.addFocus(inputDom)
        el.addBlur(inputDom)
      },

      update(el, binding, vnode) {
        console.log('focus dirctive update')
        const inputDom = el.getInput(el)
        if (!inputDom) return
        el.inputDom = inputDom
        const { value, expression } = binding
        console.log('value:', value)
        el.removeFocus(inputDom)
        el.removeBlur(inputDom)
        value || !expression ? inputDom.focus() : inputDom.blur()
        el.addFocus(inputDom)
        el.addBlur(inputDom)
      },

      unbind(el) {
        el.removeFocus(el.inputDom)
        el.removeBlur(el.inputDom)
      },
    },
  },
  data() {
    return {
      popupShow: false,
      search: { keywords: '' },
      focusCommand: true,
    }
  },
  methods: {
    onLeftClick() {
      this.popupShow = false
      this.focusCommand = false
    },
    // 外部调用控制
    openSearchPopup() {
      // 弹窗打开关闭
      this.popupShow = true
      this.focusCommand = true
    },

    handleSearch() {
      // 确认发送异步请求
      // if (!this.search.keywords) return

      this.$emit('onSearch', { keywords: this.search.keywords })
      this.search.keywords = ''
      this.popupShow = false
      this.focusCommand = false
    },
  },
}
</script>
<style lang="less" scoped>
.popup {
  /deep/.sp-top-nav-bar {
    font-weight: 400;
    .sp-top-nav-bar__title {
      font-size: 36px;
      font-weight: bold;
      color: #1a1a1a;
    }
    .sp-top-nav-bar__left {
      font-weight: 300;
      margin-left: 8px;
    }
  }
  /deep/.sp-field__control {
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
