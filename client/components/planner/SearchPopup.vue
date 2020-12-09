<template>
  <div class="popup">
    <sp-popup
      ref="popupShut"
      v-model="popupShow"
      position="right"
      :style="{ height: '100%', width: '100%' }"
    >
      <sp-top-nav-bar :title="'在线直选规划师'" left-arrow ellipsis>
        <template #left>
          <sp-icon
            class="back-icon"
            name="specialreturn"
            size="0.39rem"
            color="#1A1A1A"
            class-prefix="sp-iconfont"
            @click="onClickPopupLeft"
          />
        </template>
      </sp-top-nav-bar>
      <div class="search">
        <sp-nav-search
          ref="searchVal"
          v-model="search.keywords"
          v-myFocus
          border
          special-label
          placeholder="请输入业务或规划师姓名"
          @search="enterSearch"
        >
          <template #left-icon>
            <my-icon name="sear_ic_sear" size="0.4rem" color="#999999" />
          </template>
        </sp-nav-search>
      </div>
    </sp-popup>
  </div>
</template>
<script>
import {
  Tag,
  Popup,
  TopNavBar,
  Icon,
  NavSearch,
  Toast,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [Tag.name]: Tag,
    [NavSearch.name]: NavSearch,
    [Popup.name]: Popup,
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
  },
  directives: {
    myFocus: {
      inserted(el) {
        let inputDom = el
        if (el.tagName !== 'INPUT') {
          inputDom = el.querySelector('input')
        }
        inputDom.tagName === 'INPUT' && inputDom.focus()
      },
      update(el) {
        let inputDom = el
        if (el.tagName !== 'INPUT') {
          inputDom = el.querySelector('input')
        }
        inputDom.tagName === 'INPUT' && inputDom.focus()
      },
    },
  },
  data() {
    return {
      popupShow: false,
      search: { keywords: '', scoreSort: 0 },
    }
  },
  methods: {
    focSearch() {
      // 弹窗打开关闭
      this.popupShow = true
    },
    onClickPopupLeft() {
      this.popupShow = false
    },
    enterSearch() {
      // 确认发送异步请求
      if (this.search.keywords) {
        this.popupShow = false
        Toast(`√  共找到43471个规划师`)
      }
      const data = '异步请求结果数据'
      this.$emit('enterData', data)
      this.search.keywords = ''
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
      font-family: PingFang SC;
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

  .search {
    padding: 0.16rem 0.4rem;
  }
}
</style>
