<template>
  <div class="item">
    <h1 v-html="item.titleHtml"></h1>
    <div class="box">
      <div :class="[item.contentImageUrl ? 'z-img' : '']">
        <p v-html="item.contentTextHtml"></p>
        <div v-if="item.contentImageUrl" class="num">
          <span>{{ item.applaudCount }} 赞同</span>
          <i></i>
          <span>{{ item.remarkCount }} 评论</span>
          <i></i>
          <span>{{ item.createTime | fromatDate }} </span>
        </div>
      </div>
      <img
        v-if="item.contentImageUrl"
        :src="item.contentImageUrl.split(',')[0]"
        alt=""
      />
    </div>
    <div v-if="!item.contentImageUrl" class="num">
      <span>{{ item.applaudCount }} 赞同</span>
      <i></i>
      <span>{{ item.remarkCount }} 评论</span>
      <i></i>
      <span>{{ item.createTime | fromatDate }} </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KnownSearchTxtItem',
  filters: {
    fromatDate(value) {
      if (!value) {
        return
      }
      return value.split(' ')[0]
    },
  },
  props: {
    txtItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    item() {
      return this.txtItem
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.item {
  h1 {
    font-size: 36px;
    line-height: 48px;
    font-weight: bold;
    color: #222222;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .box {
    margin-top: 18px;
    position: relative;
    div {
      &.z-img {
        padding-right: 222px;
        p {
          height: 84px;
        }
      }
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 30px;
        font-weight: 400;
        color: #555555;
        line-height: 42px;
      }
      .num {
        width: 464px;
        display: flex;
        align-items: center;
        margin-top: 16px;
        span {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        i {
          width: 4px;
          height: 4px;
          background: #999999;
          border-radius: 50%;
          margin: 0 16px;
          display: block;
        }
      }
    }
    img {
      position: absolute;
      right: 0;
      top: 0;
      width: 190px;
      height: 127px;
      background: #d8d8d8;
      border-radius: 12px;
      object-fit: cover;
    }
  }
  .num {
    width: 464px;
    display: flex;
    align-items: center;
    margin-top: 16px;
    span {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    i {
      width: 4px;
      height: 4px;
      background: #999999;
      border-radius: 50%;
      margin: 0 16px;
      display: block;
    }
  }
}
</style>
