<template>
  <div class="center">
    <banner></banner>
    <div class="form">
      <div class="form-title">您还有一些额外需求要告知我们？</div>
      <sp-field
        v-model="message"
        rows="4"
        autosize
        type="textarea"
        maxlength="300"
        placeholder="更准确的描述需求，将有助于我们为您更好的服务"
        :show-word-limit="true"
        class="form-text"
      />
      <div class="form-read">
        <div class="form-read-first">
          <my-icon
            name="pay_ic_success"
            size="0.32rem"
            color="#2E73F5"
            class="icon"
          ></my-icon>
          <span>订阅专属服务</span>
        </div>
        <div class="form-read-second">
          为您匹配到合适服务时，将在第一时间联系您
        </div>
      </div>
      <button class="form-button">生成需求卡</button>
    </div>
  </div>
</template>

<script>
import { Field } from '@chipspc/vant-dgg'
import Banner from '~/components/spread/transactions/Banner'
export default {
  name: 'Index',
  components: { Banner, [Field.name]: Field },
  data() {
    return {
      message: '',
    }
  },
  head() {
    return {
      title: '第二步',
    }
  },
}
</script>

<style scoped lang="less">
.center {
  width: 750px;
  margin: 0 auto;
}
.form {
  padding: 64px 40px 24px;
  font-size: 0;
  &-title {
    font-size: 36px;
    font-weight: bold;
    color: #1a1a1a;
  }
  &-text::placeholder {
    font-size: 28px;
    font-weight: 400;
    color: #cccccc;
  }
  &-read {
    width: 670px;
    height: 140px;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 32px 0 0 24px;
    margin-bottom: 212px;
    &-first {
      font-size: 0;
      margin: 0 0 16px 0;
      text-align: left;
      & > span {
        margin-left: 17px;
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        line-height: 32px;
      }
    }
    &-second {
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      line-height: 28px;
      margin: 0 0 31px 49px;
    }
  }
  &-button {
    background: #4974f5;
    border-radius: 8px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    padding: 0;
    width: 100%;
    height: 88px;
  }
}
// 纯文本输入框容器
/deep/ .sp-field {
  padding: 24px;
  margin: 32px 0;
  height: 290px;
  border: 1px solid rgba(205, 205, 205, 0.5);
  border-radius: 4px;
}
//文本框字体
/deep/ .sp-cell {
  font-size: 28px;
  font-weight: 400;
  color: #cccccc;
}
// 纯文本输入框布局
/deep/ .sp-cell__value {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/deep/ .sp-field__body {
  flex: 1;
  display: block;
  overflow: scroll;
}
/deep/ .sp-field__body::-webkit-scrollbar {
  display: none;
}
//统计字数
/deep/ .sp-field__word-limit {
  font-size: 28px;
  font-weight: 400;
  color: #cccccc;
  line-height: 28px;
}
</style>
