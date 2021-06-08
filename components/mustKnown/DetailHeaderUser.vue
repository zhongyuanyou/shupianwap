<template>
  <header-slot>
    <div class="head head2">
      <!-- <sp-icon name="arrow-left" color="#1a1a1a" size="0.4rem" @click="$back" /> -->
      <my-icon
        v-if="!isShare"
        name="nav_ic_back"
        size="0.40rem"
        color="#1a1a1a"
        class="my_icon"
        @click.native="$back()"
      ></my-icon>
      <div class="user-info" :class="isShare ? 'pl-none' : 'pl-has'">
        <sp-image
          class="img"
          :src="headerData.avatar"
          @click.stop="goUser(headerData.userId, headerData.userType)"
        />
        <div class="infos">
          <p>{{ headerData.userName }}</p>
          <!-- {{ headerData.contentText }} -->
        </div>
        <template v-if="isShowFollow">
          <div v-if="!isFollow" class="btn" @click="follow">
            <sp-button>
              <my-icon name="tianjia" size="0.27rem" color="#4974F5" />
              关注</sp-button
            >
          </div>
          <div v-else class="btn2" @click="follow">
            <span class="follow">已关注</span>
          </div>
        </template>
      </div>
    </div>
  </header-slot>
</template>

<script>
import { Image, Button, Icon } from '@chipspc/vant-dgg'
import HeaderSlot from '@/components/common/head/HeaderSlot'
export default {
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Button.name]: Button,
    HeaderSlot,
  },
  props: {
    headerData: {
      type: Object,
      default() {
        return {}
      },
    },
    isFollow: {
      type: Boolean,
      default: false,
    },
    isShowFollow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShare: false,
    }
  },
  mounted() {
    this.isShare = this.$route.query.isShare
  },
  methods: {
    goUser(id, usertype) {
      this.$router.push({
        path: '/known/home',
        query: { homeUserId: id, type: usertype },
      })
    },
    follow() {
      this.$emit('follow')
    },
  },
}
</script>

<style lang="less" scoped>
.head {
  background: #ffffff;
  line-height: 88px;
  height: 0.88rem;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  color: #4974f5;
  padding: 0 32px;
  box-sizing: border-box;
  .btn-icon {
    float: left;
  }
}
.head2 {
  position: relative;
  .my_icon {
    position: absolute;
    left: 32px;
    width: 42px;
    height: 100%;
  }
  // height: 104px;
  background: #ffffff;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  .pl-none {
    padding-left: 0;
  }
  .pl-has {
    padding-left: 54px;
  }
  .user-info {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: bold;
      color: #999999;
      line-height: 66px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
      }
    }
    .btn2 {
      background: none;
      font-size: 30px;
      color: #999999;
    }
    .btn {
      background: none;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        display: block;
        float: left;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #4974f5;
        border: none;
      }
    }
  }
  .btn-icon {
    // line-height: 104px;
    float: left;
  }
}
</style>
