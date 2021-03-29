<template>
  <sp-list
    v-if="infoList.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
  >
    <sp-cell v-for="(item, index) in infoList" :key="index">
      <div class="item">
        <div class="item_Info">
          <div class="userPhoto">
            <img src="" alt="" />
          </div>
          <div class="item_status">
            <div class="userName">摇铃铛</div>
            <div class="item_time">27分钟前·回答了问题</div>
          </div>
        </div>
        <div class="item_title">
          如何看待韩国人在巴基斯坦冒充中国人骗吃骗喝骗感情？
        </div>
        <div class="item_content">
          <p class="content">
            笑死，韩国人干这种事真不稀奇 了，简单给大家梳理一下事情的经
            过。绝了，韩国人跑到巴基斯坦…
          </p>
          <img src="" alt="" />
        </div>
        <div class="item_bottom">
          <span class="like">
            <my-icon
              name="msg_ic_emoji"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem"
            ></my-icon
            >赞同</span
          >
          <span class="comment">
            <my-icon
              name="tabbar_ic_msg"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem; margin-left: 0.26rem"
            ></my-icon
            >评论
          </span>
        </div>
      </div>
    </sp-cell>
  </sp-list>
</template>
<script>
import {} from '@chipspc/vant-dgg'

export default {
  name: 'AttentionItem',
  components: {},

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
      loading: true,
      finished: false,
      infoList: [
        {
          item: 1,
        },
        {
          item: 1,
        },
        {
          item: 1,
        },
        {
          item: 1,
        },
        {
          item: 1,
        },
      ],
    }
  },
  methods: {},
}
</script>
<style lang="less" scoped>
/deep/ .sp-cell {
  padding: 0 0 20px 0;
  position: relative;
}

.item {
  height: 453px;
  background: #ffffff;
  padding: 0 32px;
  margin-bottom: 20px;
  .item_title {
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 48px;
  }
  .item_Info {
    display: flex;
    padding: 28px 0 32px 0;
    align-items: center;

    .userPhoto {
      width: 66px;
      height: 66px;
      background: #6d7177;
      margin-right: 16px;
      border-radius: 50%;
      img {
      }
    }
    .item_status {
      flex: 1;
      .userName {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        margin-bottom: 12px;
      }
      .item_time {
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
    }
    // .userName {
    //   height: 26px;
    //   font-size: 26px;
    //   font-family: PingFangSC-Regular, PingFang SC;
    //   font-weight: 400;
    //   color: #222222;
    //   line-height: 26px;
    // }
  }
  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      // font-size: 30px;
      // font-family: PingFangSC-Regular, PingFang SC;
      // font-weight: 400;
      // color: #555555;
      // line-height: 54px;
      // padding: 20px 0;
      // margin-right: 0.32rem;
      height: 126px;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 42px;
      margin: 17px 0 24px 0;
    }
    img {
      display: block;
      width: 190px;
      height: 127px;
      background: #d8d8d8;
      border-radius: 12px;
      margin-left: 24px;
    }
  }
  .item_bottom {
    // width: 294px;
    // height: 28px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 28px;
    .like {
    }
    .comment {
    }
  }
}
</style>
