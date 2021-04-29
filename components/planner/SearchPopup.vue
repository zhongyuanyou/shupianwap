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

import { focus } from '@/directive/focus'

export default {
  components: {
    [Popup.name]: Popup,
    Search,
    Header,
  },
  directives: {
    focus,
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
  ::v-deep.sp-top-nav-bar {
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
  ::v-deep.sp-field__control {
    font-size: 30px;
    font-weight: bold;
  }
}
</style>
