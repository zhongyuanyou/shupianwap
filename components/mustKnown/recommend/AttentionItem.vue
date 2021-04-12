<template>
  <sp-list
    v-if="infoList.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
  >
    <sp-cell v-for="(item, index) in listData" :key="index">
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
          {{ item.title }}
        </div>
        <div class="item_content">
          <p class="content">
            {{ item.content }}
          </p>
          <img src="" alt="" />
        </div>
        <div class="item_bottom">
          <span class="like">
            <my-icon
              name="zantong"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem"
            ></my-icon
            >赞同{{ item.applaudCount }}</span
          >
          <span class="comment" @click="showComment">
            <my-icon
              name="pinglun"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem; margin-left: 0.26rem"
            ></my-icon
            >评论{{ item.remarkCount }}
          </span>
        </div>
      </div>
    </sp-cell>
    <CommentList v-model="commentShow" :article-id="'1'" @release="release" />
  </sp-list>
</template>
<script>
import { Cell, List } from '@chipspc/vant-dgg'
import CommentList from '@/components/mustKnown/CommentList'

export default {
  name: 'AttentionItem',
  components: {
    [Cell.name]: Cell,
    [List.name]: List,
    CommentList,
  },

  props: {
    listData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  data() {
    return {
      commentShow: false,
      loading: true,
      finished: false,
      totalPage: 100,
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
  watch: {
    listData(newName, oldName) {
      // console.log('newName', newName)
      // console.log('oldName', oldName)
    },
  },
  methods: {
    release() {
      console.log('点击了发布')
    },
    showComment() {
      console.log('点击了评论')
      this.commentShow = true
    },
  },
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
  }
  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      height: 126px;
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 42px;
      margin: 17px 0 24px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
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
