<template>
  <sp-popup v-model="showPop" position="bottom">
    <div class="page-inner">
      <div class="user" @click="tonav(1)">
        <div v-if="userInfo && userInfo.url" class="head">
          <img :src="userInfo.url" alt="" srcset="" />
        </div>
        <div v-else class="no-img head"></div>
        <div class="username">
          {{
            (userInfo && userInfo.nickName) ||
            (userInfo && userInfo.fullName) ||
            '游客'
          }}
        </div>
      </div>
      <div class="main">
        <div class="item" @click="tonav(1)">
          <div class="img">
            <img src="" alt="" srcset="" />
          </div>
          提个问题
        </div>
        <div class="item" @click="tonav(2)">
          <div class="img">
            <img src="" alt="" srcset="" />
          </div>
          回答问题
        </div>
        <div class="item" @click="tonav('/known/publish/article')">
          <div class="img">
            <img src="" alt="" srcset="" />
          </div>
          写文章
        </div>
      </div>
      <div class="btn-area">取消</div>
    </div>
  </sp-popup>
</template>

<script>
import { Popup } from '@chipspc/vant-dgg'
export default {
  components: {
    [Popup.name]: Popup,
  },
  data() {
    return {
      showPop: false,
      userInfo: {},
    }
  },
  methods: {
    cancel() {
      this.showPop = false
    },
    tonav(url) {
      this.$router.push(url)
    },
  },
}
</script>

<style lang="less" scoped>
.sp-popup {
  height: 520px;
  border-radius: 24px 24px 0px 0px;
}
.page-inner {
  position: relative;
  .user {
    width: 100%;
    height: 136px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    padding: 46px 40px;
    .head {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      float: left;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .no-img {
      background: url(https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg)
        no-repeat center center;
      background-size: 100% 100%;
    }
    .username {
      line-height: 44px;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #555555;
      padding-left: 10px;
      float: left;
    }
  }
  .main {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 270px;
    padding: 40px 0;
    .item {
      width: 160px;
      height: 160px;
      text-align: center;
      .img {
        width: 100px;
        height: 100px;
        background: #f0f0ff;
        margin: 0 auto;
        margin-bottom: 30px;
      }
      font-size: 24px;
      color: #222222;
      line-height: 24px;
      font-weight: 500;
    }
  }
  .btn-area {
    width: 100%;
    background: #ffffff;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
    text-align: center;
    border-top: 1px solid #dddddd;
    line-height: 88px;
    padding-top: 14px;
  }
}
</style>
