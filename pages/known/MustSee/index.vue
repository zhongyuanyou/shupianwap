<template>
  <div class="MustSee">
    <div class="head">
      <sp-icon name="arrow-left" class="left" color="#fff" size="0.4rem" />
      <sp-icon name="search" class="right" color="#fff" size="0.4rem" />
    </div>
    <div class="top">
      <h1>进站必看</h1>
      <p>必懂上那些「压箱底」的宝藏内容</p>
    </div>
    <div class="listbox">
      <div v-for="(item, index) in list" :key="index" class="list">
        <h1>{{ item.title }}</h1>
        <div class="box">
          <div class="left" :style="{ width: item.img ? '300px' : '100%' }">
            <div class="top">
              <img :src="item.userimg" alt="" />
              <p>张译</p>
            </div>
            <p class="tit">
              {{ item.content }}
            </p>
          </div>
          <img v-if="item.img" :src="item.img" alt="" class="right" />
        </div>
        <div class="num">
          <p>{{ item.agree }} 赞同</p>
          <i></i>
          <p>{{ item.comment }} 评论</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
export default {
  name: 'MustSee',
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      list: [
        {
          title:
            '理性过剩、信息同质，创业者如何培养创造力？理性过剩、信息同质，创业者如何培养创造力？',
          img: 'https://cn.vuejs.org/images/logo.png',
          userimg: 'https://cn.vuejs.org/images/logo.png',
          username: '用户',
          content:
            '没人邀请回答本体，但是再不回答就老了。过去当兵十年，从集团军到文工团，没有过这个经没人邀请回答本体，但是再不回答就老了。过去当兵十年，从集团军到文工团，没有过这个经',
          agree: '123',
          comment: '321',
        },
        {
          title: '理性过剩、信息同质，创业者如',
          img: '',
          userimg: 'https://cn.vuejs.org/images/logo.png',
          username: '用户',
          content:
            '没人邀请回答本体，但是再不回答就老了。过去当兵十年，从集团军到文工团，没有过这个经没人邀请回答本体，但是再不回答就老了。过去当兵十年，从集团军到文工团，没有过这个经',
          agree: '123',
          comment: '321',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.MustSee {
  background: #4974f5;
  > .head {
    height: 88px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 32px;
    box-sizing: border-box;
    > .right {
      margin-left: auto;
    }
  }
  > .top {
    height: 292px;
    padding: 98px 40px 0 40px;
    box-sizing: border-box;
    > h1 {
      font-size: 52px;
      color: #ffffff;
      line-height: 52px;
    }
    > p {
      font-size: 26px;
      margin-top: 26px;
      font-weight: 400;
      color: #ffffff;
    }
  }
  > .listbox {
    border-radius: 24px 24px 0px 0px;
    background: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    > .list {
      margin-top: 32px;
      background: #ffffff;
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      padding: 44px 32px;
      box-sizing: border-box;
      > h1 {
        font-size: 36px;
        font-weight: 600;
        color: #1a1a1a;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      > .box {
        display: flex;
        align-items: center;
        margin-top: 19px;
        > .left {
          > .top {
            display: flex;
            align-items: center;
            > img {
              width: 40px;
              height: 40px;
              background: #6d7177;
              object-fit: cover;
              margin-right: 12px;
              border-radius: 50%;
            }
            > p {
              font-size: 26px;
              font-weight: 400;
              color: #222222;
            }
          }
          > .tit {
            margin-top: 10px;
            font-size: 30px;
            font-weight: 400;
            color: #555555;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        > .right {
          width: 190px;
          height: 127px;
          background: #cccccc;
          border-radius: 12px;
          object-fit: cover;
          margin-left: 40px;
        }
      }
      > .num {
        display: flex;
        margin-top: 24px;
        > p {
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        > i {
          width: 4px;
          height: 4px;
          background: #999999;
          border-radius: 50%;
          margin: 0 16px;
          align-self: center;
        }
      }
    }
    > .list:first-child {
      margin-top: 0;
    }
  }
}
</style>
