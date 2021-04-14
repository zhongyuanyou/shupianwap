<template>
  <div class="UserList">
    <div class="items">
      <ul class="tabs-box-items">
        <li v-for="(item, index) in userData" :key="index" class="user">
          <div class="Image" @click="clickImg(item.inviteeId)">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="name">{{ item.inviteeName }}</div>
        </li>
      </ul>
      <div class="attentionMore" @click="attentionMore">
        <div class="more_icon">
          <my-icon
            name="tianjia"
            size="0.32rem"
            color="#555555"
            class="my_icon"
          ></my-icon>
        </div>
        <div class="more">查看更多</div>
      </div>
    </div>
  </div>
</template>
<script>
import { WorkTab, WorkTabs } from '@chipspc/vant-dgg'

export default {
  name: 'VisitUser',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
  },
  props: {
    userData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识'],
    }
  },
  methods: {
    toggleTabs(index) {
      this.nowIndex = index
    },
    attentionMore() {
      this.$router.push({ path: 'known/more' })
    },
    clickImg(inviteeId) {
      // 跳转到个人主页 目前不知道个人主页在哪里
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: inviteeId,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.UserList {
  background: #f5f5f5;
  padding: 0 32px;
  .type {
    height: 80px;
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
    display: flex;
    align-items: center;
  }
  .items {
    display: flex;
    align-items: center;
    ul {
      height: 216px;
      width: 540px;
      align-items: center;
      display: flex;
      overflow: auto;
      .type {
        font-size: 22px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
        height: 80px;
      }
      .user {
        flex-shrink: 0;
        margin-right: 46px;
        text-align: center;
        img {
          display: block;
          width: 100px;
          height: 100px;
          background: #d8d8d8;
          border-radius: 50%;
        }
        .name {
          height: 22px;
          font-size: 22px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #555555;
          line-height: 22px;
          margin-top: 14px;
        }
      }
    }
    .attentionMore {
      text-align: center;
      margin-left: 46px;
      .more_icon {
        display: block;
        width: 100px;
        height: 100px;
        border: 2px solid #dddddd;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .more {
        height: 22px;
        font-size: 22px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #555555;
        line-height: 22px;
        margin-top: 14px;
      }
    }
  }
}
</style>
