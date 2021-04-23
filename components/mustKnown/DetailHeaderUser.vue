<template>
  <header-slot>
    <div class="head head2">
      <sp-icon name="arrow-left" color="#1a1a1a" size="0.4rem" @click="$back" />
      <div class="user-info">
        <sp-image
          class="img"
          :src="headerData.avatar"
          @click.stop="goUser(headerData.userId, headerData.userType)"
        />
        <div class="infos">
          <p>{{ headerData.createrName }}</p>
          <!-- {{ headerData.contentText }} -->
        </div>
        <template v-if="isShowFollow">
          <div v-if="!isFollow" class="btn" @click="follow">
            <sp-button><my-icon name="jia" size="0.28rem" /> 关注</sp-button>
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
  font-weight: 500;
  color: #4974f5;
  padding: 0 32px;
  box-sizing: border-box;
  .btn-icon {
    float: left;
  }
}
.head2 {
  // height: 104px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .user-info {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
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
      font-weight: 400;
      color: #999999;
      line-height: 66px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
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
        color: rgba(73, 116, 245, 1);
        display: block;
        float: left;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
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
