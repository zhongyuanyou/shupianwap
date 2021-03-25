<template>
  <div class="detail">
    <Header title="">
      <template #left>
        <div>
          <sp-icon name="arrow-left" size="0.4rem" />
        </div>
      </template>
      <template #right>
        <div class="btn">
          <sp-icon name="search" size="0.4rem" color="#1A1A1A" class="ss" />
          <sp-icon
            name="ellipsis"
            size="0.4rem"
            color="#1A1A1A"
            class="ellipsis"
          />
        </div>
      </template>
    </Header>
    <div class="problem">
      <div class="tag">
        <ul class="box">
          <li v-for="(item, index) in taglist" :key="index">{{ item }}</li>
        </ul>
      </div>
      <h1 class="tit">{{ detail.title }}</h1>
      <div
        v-if="detail.imglist.length <= 2 && detail.imglist.length > 0"
        class="imglist"
      >
        <div
          v-for="(item, index) in detail.imglist"
          :key="index"
          class="imgbox"
        >
          <img :src="item" alt="" />
        </div>
      </div>
      <div v-if="detail.imglist.length > 2" class="imglist">
        <div class="imgbox">
          <img :src="detail.imglist[0]" alt="" />
        </div>
        <div class="imgbox1">
          {{ `+${detail.imglist.length}` }}
        </div>
      </div>
      <div class="content">
        <p
          class="tit"
          :style="{ display: contentshow ? 'block' : '-webkit-box' }"
        >
          {{ detail.content }}
        </p>
        <div class="btn" @click="contentshow = !contentshow">
          <span class="tit">{{ contentshow ? '收起' : '展开' }}</span>
          <sp-icon
            :name="contentshow ? 'arrow-up' : 'arrow-down'"
            size="0.4rem"
            color="#999999"
            class="ellipsis"
          />
        </div>
      </div>
      <div class="num">
        <div class="left">
          <div>{{ detail.follow }} <span>关注</span></div>
          <p></p>
          <div>{{ detail.comment }} <span>收藏</span></div>
          <p></p>
          <div>{{ detail.visit }} <span>游览</span></div>
        </div>
        <div class="right">好问题</div>
      </div>
      <div class="btns">
        <div class="box">
          <sp-icon name="friends-o" size="0.4rem" />
          <p>邀请回答</p>
        </div>
        <div class="box">
          <sp-icon name="edit" size="0.4rem" />
          <p>写回答</p>
        </div>
        <div class="box">
          <sp-icon name="like" size="0.4rem" />
          <p>已收藏</p>
        </div>
      </div>
    </div>
    <div class="success">
      <div>
        <sp-icon name="certificate" size="0.45rem" color="#00B365" /><span
          >成功提问</span
        >
      </div>
      <p>你可以邀请下面用户来更快获得回答</p>
    </div>
    <div v-if="detail.answer.length < 1" class="user">
      <div class="head">
        <div class="left">
          <h1>邀请知友为你解答</h1>
          <p>为你精选 34 位优质回答者</p>
        </div>
        <div class="right">一键邀请</div>
      </div>
      <div class="listbox">
        <div v-for="(item, index) in userlist" :key="index" class="list">
          <img :src="item.img" alt="" />
          <p>{{ item.userName }}</p>
          <div>邀请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  name: 'Detail',
  components: {
    Header,
    [Icon.name]: Icon,
  },
  data() {
    return {
      taglist: ['公司注册', '公司注册', '公司注册'],
      contentshow: false,
      detail: {
        title:
          '最近发现很多流量明星一不小心就火了，我想问问为什么粉丝可以突然就爱上一个明星？',
        imglist: [
          'https://cn.vuejs.org/images/logo.png',
          'https://cn.vuejs.org/images/logo.png',
          'https://cn.vuejs.org/images/logo.png',
        ],
        content:
          '尤其是有很多流浪都是有铁粉的，我理解铁粉不是应该一开始关注随着时间推长，他是你的尤其是有很多流浪都是有铁粉的，我理解铁粉不是应该一开始关注随着时间推长，他是你的',
        follow: '5',
        comment: '10',
        visit: '200',
        answer: [],
      },
      userlist: [
        { userName: '用户', img: 'https://cn.vuejs.org/images/logo.png' },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.detail {
  min-height: 100vh;
  background: #f5f5f5;
  /deep/.my-head {
    padding: 0 32px;
    box-sizing: border-box;
  }
  > .problem {
    margin-top: 20px;
    background: #fff;
    > .tag {
      width: 100%;
      overflow: auto;
      padding: 0 32px;
      margin-bottom: 36px;
      > .box {
        display: flex;
        width: auto;
        > li {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 16px 24px;
          font-size: 28px;
          font-weight: 400;
          color: #999999;
          margin-left: 16px;
        }
        > li:first-child {
          margin-left: 0;
        }
      }
    }
    > .tit {
      font-size: 40px;
      margin-bottom: 28px;
      font-weight: 600;
      color: #222222;
      padding: 0 32px;
      line-height: 56px;
    }
    > .imglist {
      display: flex;
      padding: 0 32px;
      justify-content: space-between;
      margin-bottom: 28px;
      > .imgbox {
        width: 339px;
        height: 226px;
        background: #f5f5f5;
        border-radius: 12px;
        overflow: hidden;
        > img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      > .imgbox1 {
        width: 339px;
        height: 226px;
        background: rgba(0, 0, 0, 0.4);
        font-size: 52px;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        line-height: 226px;
        border-radius: 12px;
      }
    }
    > .content {
      font-size: 30px;
      font-weight: 400;
      color: #555555;
      line-height: 42px;
      padding: 0 32px;
      position: relative;
      margin-bottom: 48px;
      > .tit {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      > .btn {
        margin-top: 20px;
        font-size: 28px;
        font-weight: 400;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    > .num {
      display: flex;
      padding: 0 32px;
      align-items: center;
      margin-bottom: 40px;
      > .left {
        display: flex;
        > div {
          font-size: 24px;
          font-weight: 500;
          color: #222222;
          > span {
            color: #999999;
          }
        }
        > p {
          width: 4px;
          height: 4px;
          background: #999999;
          border-radius: 50%;
          margin: 0 16px;
          align-self: center;
        }
      }
      > .right {
        width: 156px;
        height: 56px;
        background: #f5f5f5;
        border-radius: 28px;
        font-size: 24px;
        font-weight: 500;
        color: #999999;
        margin-left: auto;
        text-align: center;
        line-height: 56px;
      }
    }
    > .btns {
      display: flex;
      border-top: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      > .box {
        padding-top: 23px;
        box-sizing: border-box;
        width: 33%;
        height: 118px;
        font-size: 26px;
        font-weight: 500;
        color: #555555;
        text-align: center;
        border-left: 1px solid #ddd;
      }
      > .box:first-child {
        border-left: none;
      }
    }
  }
  > .success {
    margin-top: 21px;
    background: #fff;
    padding: 32px 0 40px 0;
    border: 1px solid #dddddd;
    > div {
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      color: #222222;
      /deep/ i {
        vertical-align: -11px;
        margin-right: 5px;
      }
    }
    > p {
      margin-top: 24px;
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      text-align: center;
    }
  }
  > .user {
    background: #fff;
    > .head {
      display: flex;
      align-items: center;
      height: 162px;
      padding: 0 32px;
      > .left {
        > h1 {
          font-size: 32px;
          font-weight: 600;
          color: #222222;
        }
        > p {
          margin-top: 16px;
          font-size: 26px;
          font-weight: 400;
          color: #999999;
        }
      }
      > .right {
        margin-left: auto;
        width: 144px;
        height: 72px;
        background: #f2f5ff;
        border-radius: 8px;
        font-size: 26px;
        font-weight: 500;
        color: #4974f5;
        text-align: center;
        line-height: 72px;
      }
    }
    > .listbox {
      margin: 0 32px;
      border-top: 1px solid #dddddd;
    }
  }
}
</style>
