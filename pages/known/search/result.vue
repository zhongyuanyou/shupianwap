<template>
  <div class="result">
    <sp-sticky>
      <Search
        ref="searchRef"
        :disabled="true"
        v-model="value"
        :icon-left="0.24"
        placeholder="请输入搜索内容"
        @clickInputHandle="keyClickHandle"
      >
        <template v-slot:left>
          <sp-icon name="arrow-left" size="0.4rem" @click="$router.back()" />
        </template>
      </Search>
    </sp-sticky>
    <div class="tab">
      <p :class="tabIndex === '1' ? 'act' : ''" @click="changeTab('1')">
        <span>问题</span><i></i>
      </p>
      <p :class="tabIndex === '2' ? 'act' : ''" @click="changeTab('2')">
        <span>文章</span><i></i>
      </p>
      <p :class="tabIndex === '3' ? 'act' : ''" @click="changeTab('3')">
        <span>用户</span><i></i>
      </p>
    </div>
    <div v-show="tabIndex === '1' || tabIndex === '2'" class="listbox">
      <div
        v-for="(item, index) in searchList"
        :key="index"
        class="list"
        @click="toDetail"
      >
        <h1>{{ item.title }}</h1>
        <div class="box">
          <div :style="{ width: item.contentImageUrl ? '464px' : '100%' }">
            <p>
              {{ item.contentText }}
            </p>
            <div v-if="item.contentImageUrl" class="num">
              <span>{{ item.applaudCount }} 赞同</span>
              <i></i>
              <span>{{ item.remarkCount }} 评论</span>
              <i></i>
              <span>{{ item.createTime | fromatDate }} </span>
            </div>
          </div>
          <img v-if="item.contentImageUrl" :src="item.contentImageUrl" alt="" />
        </div>
        <div v-if="!item.contentImageUrl" class="num">
          <span>{{ item.applaudCount }} 赞同</span>
          <i></i>
          <span>{{ item.remarkCount }} 评论</span>
          <i></i>
          <span>{{ item.createTime | fromatDate }} </span>
        </div>
      </div>
    </div>
    <div v-show="tabIndex === '3'" class="userlist">
      <div v-for="(item, index) in userList" :key="index" class="list">
        <img :src="item.avatar" alt="" class="" />
        <div class="user-desc">
          <span class="name">{{ item.userName }}</span>
          <span class="desc"
            >324532432425325253wkl;jrewklrjkweljrklewjrlk25324</span
          >
        </div>
        <div class="applaudFlag">
          <sp-icon
            v-if="!item.isApplaudFlag"
            name="plus"
            color="#4974F5"
            size="0.3rem"
          />
          <span
            :style="{ color: item.isApplaudFlag ? '#999999' : '#4974F5' }"
            >{{ item.isApplaudFlag ? '已关注' : '关注' }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Sticky, Icon } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import knownApi from '@/api/known'
import utils from '@/utils/spread/util'

export default {
  name: 'Searchresult',
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    Search,
  },
  filters: {
    fromatDate(value) {
      if (!value) {
        return
      }
      return utils.formatDate(value)
    },
  },
  async asyncData({ $axios, query }) {
    const params = {
      keyword: query.keyword,
      type: query.type,
    }
    let userList = []
    let searchList = []
    try {
      const res = await $axios.get(knownApi.search.list, params)
      if (res.code === 200 && res.data.records.length) {
        // 用户数据
        if (query.type === '3') {
          userList = res.data.records
        } else {
          searchList = res.data.records
        }
      }
    } catch (e) {}
    return {
      searchList,
      userList,
      tabIndex: query.type || '1',
      value: query.keyword,
    }
  },
  data() {
    return {}
  },
  methods: {
    keyClickHandle() {
      this.$router.push({
        path: '/known/search',
        query: { type: this.tabIndex, keyword: this.value },
      })
    },
    clooseHandle() {
      console.log(222)
    },
    toDetail() {
      if (this.tabIndex) {
        this.$router.push({
          path: '/known/detail/article',
          query: {
            // 传文章id
          },
        })
      } else {
        this.$router.push({
          path: '/known/detail/question',
          query: {
            // 传问题id
          },
        })
      }
    },
    async changeTab(type) {
      if (this.tabIndex === type) {
        return
      }
      this.tabIndex = type
      // 请求后台接口
      try {
        const res = await this.$axios.get(knownApi.search.list, {
          keyword: this.value,
          type: this.tabIndex,
        })
        // 用户数据
        if (this.tabIndex === '3') {
          this.userList = res.data.records
        } else {
          this.searchList = res.data.records
        }
      } catch (e) {}
    },
  },
}
</script>

<style lang="less" scoped>
.result {
  background: #f5f5f5;
  min-height: 100vh;
  /deep/.sp-sticky {
    .search-content {
      padding-left: 24px;
      padding-right: 32px;
    }
    .input-box {
      background: #f5f5f5;
      border: none;
      box-shadow: none;
      height: 64px;
      margin-left: 16px;
      input {
        background: #f5f5f5;
      }
      .imitate-input {
        color: #000;
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
      .user-desc {
        margin-left: 24px;
        > span {
          display: block;
        }
        .name {
          font-size: 36px;
          margin-bottom: 12px;
        }
        .desc {
          font-size: 26px;
          line-height: 26px;
          color: #999999;
          width: 412px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .applaudFlag {
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
