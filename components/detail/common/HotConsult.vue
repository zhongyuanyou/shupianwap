<template>
  <!-- 热门咨询组件 -->
  <div class="c-hot-consult">
    <div class="title">
      <div class="title__name">热门咨询</div>
      <div class="title__more">
        <span>换一换</span>
        <my-icon name="gongju_huan" size="0.26rem"></my-icon>
      </div>
    </div>
    <div class="content">
      <div class="content__item">
        公司过户需要什么公司过户需要什么公司过户需要什么
      </div>
      <div class="content__item">公司过户需要什么公司过?</div>
      <div class="content__item">
        公司过户需要什么公司过户需要什么公司过户需要什么
      </div>
      <div class="content__item">公司过户需要</div>
    </div>
    <div class="ask">
      <div class="ask__title">快速提问</div>
      <div class="ask__input">
        <input
          v-model="askVal"
          placeholder="您的疑问第一时间为您解答"
          maxlength="20"
        />
        <button>提问</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Button } from '@chipspc/vant-dgg'

export default {
  name: 'GoodDetailHotConsult',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
  },
  data() {
    return {
      askVal: '',
    }
  },
}
</script>

<style lang="less" scoped>
@import '~@css/pages/detail/var.less';
.c-hot-consult {
  .c-space-mixin();
  padding: @c-padding;
  background: @c-bg;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__name {
      .c-title-font-mixin();
    }
    &__more {
      font-size: 26px;
      line-height: 36px;
      color: #999999;
    }
  }
  .content {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &__item {
      background: #f2f5ff;
      padding: 18px 20px;
      width: 320px;
      height: 72px;
      font-size: 26px;
      line-height: 36px;
      color: #222;
      text-align: center;
      border-radius: 4px;
      margin-bottom: 20px;
      .mixin-text-oneoverflow();
    }
  }
  .ask {
    margin-top: 61px;
    &__title {
      font-size: 36px;
      line-height: 50px;
      color: #1a1a1a;
      font-weight: bold;
    }
    &__input {
      margin-top: 33px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      padding: 20px 24px;
      padding-right: 0px;
      width: 100%;
      border: 1px solid #4974f5;
      border-radius: 4px;
      input {
        font-size: 28px;
        line-height: 40px;
        color: #222;
        border: none;
        &::-webkit-search-cancel-button {
          -webkit-appearance: none; //此处去掉默认的小×
        }
        &[disabled='disabled'] {
          background-color: #fff;
        }
        &::placeholder {
          color: #999999;
        }
      }
      button {
        flex-shrink: 0;
        height: 80px;
        width: 144px;
        background: #4974f5;
        color: #fff;
        font-size: 28px;
        line-height: 28px;
      }
    }
  }
}
</style>
