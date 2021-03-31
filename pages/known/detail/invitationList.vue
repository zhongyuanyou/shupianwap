<template>
  <div class="invitationList">
    <div class="head">
      <sp-icon name="arrow-left" size="0.4rem" @click.native="$router.back()" />
      <sp-field
        v-model="keywords"
        clearable
        placeholder="请输入用户名"
        left-icon="search"
        @focus="searchShow = true"
        @blur="searchBlur()"
      />
    </div>
    <div v-if="searchShow" class="recommend search">
      <div class="listbox">
        <div v-for="(item, index) in searchList" :key="index" class="list">
          <img :src="item.img" alt="" />
          <p>{{ item.username }}</p>
          <div>邀请</div>
        </div>
      </div>
    </div>
    <div v-else class="recommend">
      <div class="titbox">
        <span>为你精选 {{ recommendList.length }} 位优质回答者</span>
        <p @click="activefn()">一键邀请</p>
      </div>
      <div class="listbox">
        <div v-for="(item, index) in recommendList" :key="index" class="list">
          <img :src="item.img" alt="" />
          <p>{{ item.username }}</p>
          <div>邀请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon, Field } from '@chipspc/vant-dgg'
export default {
  name: 'InvitationList',
  components: {
    [Icon.name]: Icon,
    [Field.name]: Field,
  },
  data() {
    return {
      keywords: '',
      actList: [],
      recommendList: [
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          isinvitation: false,
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          isinvitation: false,
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          isinvitation: false,
        },
      ],
      searchList: [
        {
          username: '搜索用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          isinvitation: false,
        },
        {
          username: '搜索用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          isinvitation: false,
        },
        {
          username: '搜索用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          isinvitation: false,
        },
      ],
      searchShow: false,
    }
  },
  methods: {
    activefn() {
      console.log(this.actList)
    },
    searchBlur() {
      if (!this.keywords) {
        this.searchShow = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.invitationList {
  min-height: 100vh;
  .head {
    height: 88px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 32px 0 24px;
    box-sizing: border-box;
    /deep/.sp-cell {
      padding: 13px 16px;
      margin-left: 16px;
      width: 638px;
      background: #f3f3f3;
      border-radius: 12px;
      height: 68px;
      .sp-field__left-icon {
        color: #cccccc;
      }
    }
  }
  .recommend {
    height: calc(100vh - 88px);
    > .titbox {
      height: 102px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      padding: 0 32px;
      > span {
        font-size: 28px;
        font-weight: 400;
        color: #999999;
      }
      > p {
        margin-left: auto;
        font-size: 28px;
        font-weight: 500;
        color: #4974f5;
      }
    }
    > .listbox {
      height: calc(100% - 102px);
      padding-bottom: 20px;
      box-sizing: border-box;
      overflow: auto;
      > .list {
        display: flex;
        margin-top: 56px;
        padding: 0 32px;
        align-items: center;
        > img {
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          object-fit: cover;
          border-radius: 50%;
        }
        > p {
          font-size: 30px;
          font-weight: 600;
          color: #222222;
          margin-left: 24px;
        }
        > div {
          width: 144px;
          height: 72px;
          background: #4974f5;
          border-radius: 8px;
          text-align: center;
          line-height: 72px;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
          margin-left: auto;
        }
      }
    }
  }
  .search {
    .listbox {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
