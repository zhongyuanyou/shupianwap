<template>
  <div class="result">
    <sp-sticky>
      <Search
        ref="searchRef"
        v-model="value"
        :icon-left="0.24"
        placeholder="请输入搜索内容"
        @searchKeydownHandle="keyClickHandle"
      >
        <template v-slot:left>
          <sp-icon name="arrow-left" size="0.4rem" />
        </template>
      </Search>
    </sp-sticky>
    <div class="tab">
      <p :class="tabIndex === 0 ? 'act' : ''" @click="tabIndex = 0">
        <span>问题</span><i></i>
      </p>
      <p :class="tabIndex === 1 ? 'act' : ''" @click="tabIndex = 1">
        <span>文章</span><i></i>
      </p>
      <p :class="tabIndex === 2 ? 'act' : ''" @click="tabIndex = 2">
        <span>用户</span><i></i>
      </p>
    </div>
    <div v-show="tabIndex === 0 || tabIndex === 1" class="listbox">
      <div v-for="(item, index) in searchList" :key="index" class="list">
        <h1>{{ item.title }}</h1>
        <div class="box">
          <div :style="{ width: item.img ? '464px' : '100%' }">
            <p>
              {{ item.content }}
            </p>
            <div v-if="item.img" class="num">
              <span>{{ item.likes }} 赞同</span>
              <i></i>
              <span>{{ item.comment }} 评论</span>
              <i></i>
              <span>{{ item.time }} </span>
            </div>
          </div>
          <img v-if="item.img" :src="item.img" alt="" />
        </div>
        <div v-if="!item.img" class="num">
          <span>{{ item.likes }} 赞同</span>
          <i></i>
          <span>{{ item.comment }} 评论</span>
          <i></i>
          <span>{{ item.time }} </span>
        </div>
      </div>
    </div>
    <div v-show="tabIndex === 2" class="userlist">
      <div v-for="(item, index) in userList" :key="index" class="list">
        <img :src="item.img" alt="" class="" />
        <p>{{ item.username }}</p>
        <div>
          <sp-icon
            v-if="!item.isFollow"
            name="plus"
            color="#4974F5"
            size="0.3rem"
          />
          <span :style="{ color: item.isFollow ? '#999999' : '#4974F5' }">{{
            item.isFollow ? '已关注' : '关注'
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Sticky, Icon } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'

export default {
  name: 'Searchresult',
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    Search,
  },
  data() {
    return {
      value: '',
      tabIndex: 2,
      searchList: [
        {
          title: '大家都是几岁转行的，27岁转行有什么好处',
          content:
            '笑死，韩国人干这种事真不稀奇了，简单给大家梳理一下事情的笑死，韩国人干这种事真不稀奇了，简单给大家梳理一下事情的',
          img: 'https://cn.vuejs.org/images/logo.png',
          likes: '213123',
          comment: '213',
          time: '2010-01-11',
        },
        {
          title: '大家都是几岁转行的，27岁转行有什么好处',
          content:
            '笑死，韩国人干这种事真不稀奇了，简单给大家梳理一下事情的笑死，韩国人干这种事真不稀奇了，简单给大家梳理一下事情的',
          img: '',
          likes: '213123',
          comment: '213',
          time: '2010-01-11',
        },
      ],
      userList: [
        {
          username: '用户',
          img: 'https://cn.vuejs.org/images/logo.png',
          isFollow: true,
        },
        {
          username: '用户',
          img: 'https://cn.vuejs.org/images/logo.png',
          isFollow: false,
        },
      ],
    }
  },
  methods: {
    keyClickHandle() {
      console.log(111)
    },
    clooseHandle() {
      console.log(222)
    },
  },
}
</script>

<style lang="less" scoped>
.result {
  background: #f5f5f5;
  min-height: 100vh;
  /deep/.sp-sticky {
    .input-box {
      background: #f5f5f5;
      border: none;
      box-shadow: none;
      height: 64px;
      margin-left: 16px;
      input {
        background: #f5f5f5;
      }
    }
    .cloose-btn {
      margin-left: 32px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
    }
  }
  > .tab {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    > p {
      width: 170px;
      height: 30px;
      font-size: 30px;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
      text-align: center;
      > i {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
        display: none;
        margin: 10px auto 0 auto;
      }
    }
    > .act {
      font-weight: 600;
      color: #222222;
      > i {
        display: block;
      }
    }
  }
  > .listbox {
    > .list {
      padding: 40px 32px;
      background: #fff;
      margin-top: 20px;
      > h1 {
        font-size: 36px;
        font-weight: 500;
        color: #222222;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      > .box {
        display: flex;
        margin-top: 18px;
        align-items: center;
        > div {
          > p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 30px;
            font-weight: 400;
            color: #555555;
          }
          > .num {
            width: 464px;
            display: flex;
            align-items: center;
            margin-top: 16px;
            > span {
              font-size: 24px;
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
              display: block;
            }
          }
        }
        > img {
          width: 190px;
          height: 127px;
          background: #d8d8d8;
          border-radius: 12px;
          margin-left: 32px;
          object-fit: cover;
        }
      }
      > .num {
        width: 464px;
        display: flex;
        align-items: center;
        margin-top: 16px;
        > span {
          font-size: 24px;
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
          display: block;
        }
      }
    }
  }
  > .userlist {
    background: #fff;
    margin-top: 20px;
    padding-top: 40px;
    > .list {
      display: flex;
      padding-top: 20px;
      align-items: center;
      padding: 0 32px 40px 32px;
      box-sizing: border-box;
      margin-top: 16px;
      > img {
        width: 74px;
        height: 74px;
        background: #d8d8d8;
        border-radius: 50%;
      }
      > p {
        font-size: 36px;
        font-weight: 600;
        color: #222222;
        margin-left: 24px;
      }
      > div {
        width: 144px;
        height: 64px;
        background: #f5f5f5;
        border-radius: 8px;
        font-size: 26px;
        font-weight: 500;
        color: #4974f5;
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
          margin-left: 13px;
        }
      }
    }
  }
}
</style>
