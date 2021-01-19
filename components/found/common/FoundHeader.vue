<template>
  <!--S 搜索框-->
  <div class="search_header">
    <div class="search_input_con">
      <div class="search_input_con_lf">
        <div v-if="left" class="icon" @click="handleLeft">
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
        </div>
        <div
          class="con"
          :style="{
            width: left ? '5.04rem' : '5.68rem',
            marginLeft: left ? '0.32rem' : '0',
          }"
        >
          <my-icon name="sear_ic_sear" size="0.28rem" color="#999" />
          <form action="javascript:return true">
            <input
              v-model="keyword"
              type="text"
              placeholder="请输入搜索内容"
              :maxlength="100"
              @input="inputChange"
              @keydown="handelKeydown"
            />
          </form>
        </div>
      </div>
      <p class="cancel" @click="handleLeft">取消</p>
    </div>
  </div>
  <!--E 搜索框-->
</template>

<script>
export default {
  name: 'Header',
  props: {
    left: {
      type: Boolean,
      default: () => {
        return false
      },
    },
    keywords: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      keyword: this.keywords,
    }
  },
  methods: {
    inputChange() {
      // input改变事件
      this.$emit('inputChange', this.keyword)
    },
    handleLeft() {
      // 点击返回按钮
      this.$router.back()
    },
    handelKeydown(e) {
      if (e.keyCode === 13) {
        this.$emit('handelKeydown', this.keyword)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.search_header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 3;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  background-color: #fff;
  .search_input_con {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 40px;
    height: 128px;
    background-color: #fff;
    &_lf {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      .icon {
        height: 96px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
      }
      .con {
        height: 96px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
        border-radius: 8px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        padding: 0 27px;
        > form {
          width: 100%;
          height: 92px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          padding: 0;
          input {
            width: 100%;
            height: 92px;
            text-indent: 15px;
            border: none;
            font-size: 30px;
            color: #1a1a1a;
            font-weight: bold;
            &:focus {
              outline: none;
            }
            //去除点击时候的背景色
            -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
          }
          //修改input-placeholder样式
          ::-webkit-input-placeholder {
            font-size: 30px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #999999;
          }
        }
      }
    }
    .cancel {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 44px;
    }
  }
}
</style>
