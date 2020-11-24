<template>
  <div class="detail">
    <!--S 导航-->
    <sp-top-nav-bar ellipsis :fixed="true">
      <template #left>
        <sp-icon name="arrow-left" size="20" @click="back" />
      </template>

      <template #right>
        <my-icon name="nav_ic_share" size="0.3rem" />
      </template>
    </sp-top-nav-bar>
    <!--E 导航-->
    <div class="detail_con">
      <div class="detail_con_title">
        理性过剩、信息同质，创业者如何 培养创造力？
      </div>
      <!--S 账号信息-->
      <div class="detail_con_info">
        <div class="detail_con_info_logo_con">
          <img
            class="detail_con_info_logo_con_logo"
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
          />
        </div>
        <div class="detail_con_info_content">
          <p class="title">成都顶呱呱</p>
          <p class="time">25分钟前</p>
        </div>
      </div>
      <!--E 账号信息-->
      <!--S 模拟显示富文本内容 后期需用V-HTML显示富文本内容-->
      <div class="fwb">
        一个在创投圈广为流传的故事是，2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊曼告诉孙正义，“疯子。”
        一个在创投圈广为流传的故事是，2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊曼告诉孙正义，“疯子。”
        一个在创投圈广为流传的故事是，2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊曼告诉孙正义，“疯子。”
        一个在创投圈广为流传的故事是，2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊曼告诉孙正义，“疯子。”
        一个在创投圈广为流传的故事是，2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊曼告诉孙正义，“疯子。”
        一个在创投圈广为流传的故事是，2017年孙正义问WeWork创始人诺伊曼，“你觉得在一场战斗中，聪明人和疯子，究竟谁会赢？”诺伊曼告诉孙正义，“疯子。”
      </div>
      <!--S 版本信息-->
      <div class="copyright">
        <div class="copyright_con">
          本文版权归属原作者，本网站转载已获得作者授权，未经薯
          片找人网书面声明，不得引用、复制、转载、摘编、修改、
          抄袭、剽窃或以其他任何方式使用上诉内容。本文仅代表作
          者观点，文章内容仅供参考，不代表薯片找人的观点和立场
          。文章中图片源自原作者配图，如涉及侵权，请联系jubao @dgg.net删除
        </div>
        <div class="copyright_tags">
          <div class="tags">
            <div v-for="(item, index) in tags" :key="index" class="tags_item">
              {{ item }}
            </div>
          </div>
          <div class="hot">热度<span>5890</span></div>
        </div>
      </div>
      <!--E 版本信息-->
    </div>
  </div>
</template>

<script>
import { TopNavBar, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'Detail',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
  },
  data() {
    return {
      tags: ['公司发展', '公司发展'], // 模拟tags数据
    }
  },
  methods: {
    back() {
      // 返回上一页
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  &_con {
    padding: 152px 40px 128px 40px;
    &_title {
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 56px;
    }
    &_info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      margin-top: 45px;
      height: 88px;
      &_logo_con {
        width: 88px;
        height: 88px;
        display: flex;
        justify-content: center;
        align-items: center;
        &_logo {
          width: 88px;
          height: 88px;
          border-radius: 50%;
        }
      }
      &_content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        height: 88px;
        margin-left: 24px;
        padding: 9px 0;
        .title {
          font-size: 34px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 28px;
        }
        .time {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
        }
      }
    }
    .fwb {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 56px;
      margin-top: 59px;
    }
    .copyright {
      margin-top: 63px;
      &_con {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 28px;
      }
      &_tags {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        margin-top: 71px;
        .tags {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          &_item {
            height: 40px;
            background: #f4f4f4;
            border-radius: 4px;
            padding: 0 10px;
            margin-right: 16px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 40px;
          }
        }
        .hot {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
          span {
            margin-left: 16px;
          }
        }
      }
    }
  }
}
</style>
