<template>
  <div class="container">
    <div class="container_header">
      <span class="my_icon" @click="java">
        <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
      </span>
      <span>关注更多</span>
    </div>
    <div class="items">
      <ul>
        <li>
          <img src="" alt="" />
          <div class="userInfo">
            <div class="user_name">用户名</div>
            <div class="user_sign">简介或签名文字简介或签名文字…</div>
          </div>
          <div class="attention_btn">+关注</div>
        </li>
        <li>
          <img src="" alt="" />
          <div class="userInfo">
            <div class="user_name">用户名</div>
            <div class="user_sign">简介或签名文字简介或签名文字…</div>
          </div>
          <div class="attention_btn">+关注</div>
        </li>
        <li>
          <img src="" alt="" />
          <div class="userInfo">
            <div class="user_name">用户名</div>
            <div class="user_sign">简介或签名文字简介或签名文字…</div>
          </div>
          <div
            :style="attention_btn"
            class="attention_btn"
            @click="attention()"
          >
            {{ btnValue }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { WorkTab } from '@chipspc/vant-dgg'
// import ItemCard from '@/components/mustKnown/recommend/ItemCard'
export default {
  name: 'Attention',
  components: {},
  data() {
    return {
      btnValue: '+关注',
      attention_btn: {},
    }
  },
  methods: {
    attention() {
      this.btnValue = '已关注'
      this.attention_btn = { background: ' #F5F5F5', color: '#999999' }
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  .container_header {
    height: 88px;
    background: #ffffff;
    line-height: 50px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 40px;
    .my_icon {
      width: 40px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: 24px;
      left: 24px;
    }
  }
  .items {
    padding: 0 32px;
    > ul {
      > li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 56px;
        > img {
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          border-radius: 50%;
        }
        .userInfo {
          .user_name {
            height: 30px;
            font-size: 30px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 30px;
            margin-bottom: 0.12rem;
          }
          .user_sign {
            height: 26px;
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 26px;
          }
        }
        .attention_btn {
          width: 144px;
          height: 64px;
          background: #4974f5;
          border-radius: 8px;
          font-size: 26px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 26px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
