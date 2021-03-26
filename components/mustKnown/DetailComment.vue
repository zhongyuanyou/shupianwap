<template>
  <div class="comment-area">
    <div class="title">评论888</div>
    <div class="list">
      <div class="comment-item">
        <sp-image class="img" src="" />
        <div class="right">
          <sp-field aria-placeholder="写下你的评论"></sp-field>
        </div>
      </div>
      <div
        v-for="(item, index) in commentList"
        :key="index"
        class="comment-item"
      >
        <sp-image class="img" src="" />
        <div class="right">
          <p class="user-name">{{ item.username }}</p>
          <p class="item-content">{{ item.content }}</p>
          <p class="time-area">
            <span class="time">{{ item.time }}</span>
            <span class="num">{{ item.Likes }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="toast" @click="openModal">
      查看全部评论
      <my-icon name="order_ic_listnext" size="0.28rem"></my-icon>
    </div>
  </div>
</template>

<script>
// 详情页非弹窗的评论列表
import { Image, Field } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Field.name]: Field,
  },
  props: {
    commentList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    openModal() {
      this.$emit('changeModal', true)
    },
  },
}
</script>

<style lang="less" scoped>
.comment-area {
  padding: 20px 40px 120px 40px;
  .title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 32px;
    margin-bottom: 40px;
  }
  .list {
    font-size: 30px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #555555;
    .comment-item {
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
      .right {
        padding-left: 20px;
        flex: 1;
        .user-name {
          font-size: 28px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #222222;
          margin-bottom: 16px;
        }
        .item-content {
          line-height: 42px;
          .textOverflow(2);
        }
        .time-area {
          margin-top: 16px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
          display: flex;
          justify-content: space-between;
          span {
            display: block;
          }
        }
      }
    }
  }
  .toast {
    height: 26px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 26px;
    text-align: center;
    margin: 40px 0;
  }
}
</style>
