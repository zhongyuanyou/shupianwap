<template>
  <div class="UserList">
    <div class="type">最常访问</div>
    <div class="items">
      <ul class="tabs-box-items">
        <li class="user">
          <div class="Image"><img src="" alt="" /></div>
          <div class="name">郑远</div>
        </li>
        <li class="user">
          <div class="Image"><img src="" alt="" /></div>
          <div class="name">郑远</div>
        </li>
        <li class="user">
          <div class="Image"><img src="" alt="" /></div>
          <div class="name">郑远</div>
        </li>
        <li class="user">
          <div class="Image"><img src="" alt="" /></div>
          <div class="name">郑远</div>
        </li>
        <li class="user">
          <div class="Image"><img src="" alt="" /></div>
          <div class="name">郑远</div>
        </li>
        <li class="user">
          <div class="Image"><img src="" alt="" /></div>
          <div class="name">郑远</div>
        </li>
        <li class="attentionMore">
          <div class="more_icon">
            <my-icon
              name="shop_ic_add"
              size="0.32rem"
              color="#1A1A1A"
              class="my_icon"
            ></my-icon>
          </div>
          <div class="more">查看更多</div>
        </li>
      </ul>
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
    // banner: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   },
    // },
  },
  data() {
    return {
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识'],
    }
  },
  methods: {
    toggleTabs(index) {
      console.log('index', index)
      this.nowIndex = index
    },
  },
}
</script>
<style lang="less" scoped>
.UserList {
  height: 248px;
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
    ul {
      display: flex;
      justify-content: space-between;
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
      .attentionMore {
        text-align: center;
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
}
</style>
