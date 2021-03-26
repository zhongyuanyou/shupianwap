<template>
  <section>
    <div class="head head1">
      <my-icon
        class="back-icon"
        name="nav_ic_back"
        size="0.4rem"
        color="#1A1A1A"
        @click.native="onLeftClick"
      ></my-icon>
      <div class="btn-area">
        <span>
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          ></my-icon>
          邀请</span
        >
        <span>
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          ></my-icon>
          写回答</span
        >
      </div>
    </div>
    <div class="title-area">
      <div class="title">哪部电影让你最有所触动？</div>
      <div class="nums-area">300个回答 · 200个关注</div>
    </div>
    <div class="main">
      <div class="user-info">
        <div class="img"></div>
        <div class="infos">
          <p>周转</p>
          我是一个牛人
        </div>
        <div class="btn">
          <sp-button>关注</sp-button>
        </div>
      </div>
      <div class="content">
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）、
        鞑靼语、土库曼语（土库曼斯坦），还有维吾尔语。这些语言目前的使用者大约为7500万人。这是谷歌自2016年以来首次新增翻译语言。翻译还支持基尼亚卢旺达语、鞑靼语和维吾尔语的虚拟键盘输入。<br />
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）<br />
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）、
        鞑靼语、土库曼语（土库曼斯坦），还有维吾尔语。这些语言目前的使用者大约为7500万人。这是谷歌自2016年以来首次新增翻译语言
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）、
        鞑靼语、土库曼语（土库曼斯坦），还有维吾尔语。这些语言目前的使用者大约为7500万人。这是谷歌自2016年以来首次新增翻译语言
      </div>
    </div>
    <div class="page-bottom">
      <div class="left-area">
        <span class="icon">
          <my-icon
            class="msg_ic_emoji"
            name="msg_ic_emoji"
            size="0.3rem"
            color="#000000"
          ></my-icon
        ></span>
        <span class="text">赞同9999</span>
        <span class="icon">
          <my-icon
            class="msg_ic_emoji"
            name="msg_ic_emoji"
            size="0.3rem"
            color="#000000"
          ></my-icon
        ></span>
      </div>
      <div class="right-area">
        <div class="item">
          <div class="icon">
            <my-icon
              class="msg_ic_emoji"
              name="spiconfont-shoucang"
              size="0.3rem"
              color="#000000"
            ></my-icon>
          </div>
          收藏
        </div>
        <div class="item">
          <div class="icon">
            <my-icon
              class="msg_ic_emoji"
              name="spiconfont-pinglun"
              size="0.3rem"
              color="#000000"
            ></my-icon>
          </div>
          评论
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Field, Tab, Tabs, Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [Button.name]: Button,
  },
}
</script>

<style lang="less" scoped>
.head1 {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 88px;
  background: #ffffff;
  line-height: 88px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  padding: 0 40px;
  .btn-area {
    float: right;
    width: auto;
    height: 100%;
    span {
      padding: 0 20px;
    }
  }
}
.title-area {
  margin-top: 100px;
  padding: 20px 40px;
  border-bottom: 2px solid #ddd;
  .title {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 68px;
    font-weight: 600;
  }
  .nums-area {
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #999999;
    margin: 20px 0;
    font-weight: 500;
  }
}
.main {
  padding: 40px;
  .user-info {
    display: flex;
    justify-content: space-between;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
    }
    .infos {
      flex: 1;
      height: 26px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-bottom: 20px;
      }
    }
    .btn {
      width: 144px;
      height: 72px;
      background: #f5f5f5;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        color: rgba(73, 116, 245, 1);
        display: block;
        float: left;
      }
    }
  }
  .content {
    padding-top: 40px;
    font-size: 34px;
    color: #666;
    font-weight: 400;
    color: #555555;
    line-height: 52px;
  }
}
.page-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 96px;
  background: #ffffff;
  padding: 10px 40px;
  border-top: 1px solid #ddd;
  .left-area {
    float: left;
    width: auto;
    height: 72px;
    background: #f2f5ff;
    border-radius: 8px;
    padding: 20px;
    span {
      display: block;
      float: left;
      margin-right: 4px;
    }
    .icon {
      padding: 0;
      width: 40px;
      height: 100%;
      line-height: 0;
      position: relative;
      .spiconfont {
        position: absolute;
        left: 0px;
        top: 20px;
        padding: 0;
        margin: 0;
        line-height: 0;
      }
    }
    .text {
      border-right: 1px solid #ddd;
      margin-right: 20px;
      font-size: 24px;
      color: #4974f5;
      font-weight: 500;
      padding-right: 20px;
    }
  }
  .right-area {
    float: right;
    width: auto;
    .item {
      height: 100%;
      float: left;
      margin-left: 10px;
      text-align: center;
      width: 80px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
      font-size: 28px;
      .icon {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
