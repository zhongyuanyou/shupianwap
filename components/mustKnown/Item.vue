<template>
  <sp-skeleton
    title
    avatar
    :row="3"
    :loading="item && item !== {} ? false : true"
  >
    <div class="item" @click="toDetail(item)">
      <div class="item_title">
        {{ item.title }}
      </div>

      <div class="item_content">
        <div class="item_content_lf">
          <div class="item_Info">
            <img
              :src="item.avatar"
              alt=""
              class="userPhoto"
              @click.stop="goUserDetail(item)"
            />
            <div class="userName">{{ item.userName }}</div>
          </div>
          <p class="content">
            {{ item.contentText }}
          </p>
        </div>

        <img
          v-if="item.contentImageUrl"
          :src="item.contentImageUrl.split(',')[0]"
          class="content_img"
          alt=""
        />
      </div>
      <div class="item_bottom">
        <span class="like"> {{ item.applaudCount }} 赞同</span>
        <span class="comment"> · {{ item.remarkCount }} 评论</span>
      </div>
    </div>
  </sp-skeleton>
</template>
<script>
import { Image, skeleton } from '@chipspc/vant-dgg'
export default {
  name: 'Item',
  components: {
    [Image.name]: Image,
    [skeleton.name]: skeleton,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      skeletonLoading: true,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  methods: {
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
    toDetail(item) {
      this.$router.push({
        path:
          item.type === 1
            ? '/known/detail/question'
            : item.type === 2
            ? '/known/detail/article'
            : '/known/detail/answer',
        query: {
          id: item.id,
        },
      })
    },
    // 进入用户详情
    goUserDetail(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.item {
  background: #fff;
  border-radius: 12px;
  padding: 26px 32px 28px 28px;
  border-bottom: 20px solid #f5f5f5;

  .item_title {
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 50px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 超出n行这里写n */
    -webkit-box-orient: vertical;
  }

  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .item_content_lf {
      flex: 1;
      margin-right: 48px;
      .item_Info {
        display: flex;
        margin-top: 20px;
        margin-bottom: 16px;
        align-items: center;
        .userPhoto {
          width: 40px;
          height: 40px;
          margin-right: 20px;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
            vertical-align: unset;
          }
        }
        .userName {
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
        }
      }
      .content {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 42px;
        // margin-right: 0.32rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-break: break-all;
      }
    }

    .content_img {
      display: block;
      object-fit: cover;
      width: 190px;
      height: 127px;
      background: #cccccc;
      border-radius: 12px;
      margin-top: 21px;
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
  }
}

.clamp2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.clamp3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
