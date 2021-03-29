<template>
  <div class="home_container">
    <div class="top_box">
      <div class="card">
        <sp-image round class="user_avatar" fit="cover" src="" />
        <div class="bt_box">
          <div v-if="!userId" class="bt_edit">编辑资料</div>
          <template v-else>
            <div v-if="!isAttention" class="bt_attention">+ 关注</div>
            <div v-else class="bt_has_attention">已关注</div>
            <div v-if="source" class="bt_contact">
              <my-icon
                name="fabiaoqing"
                size="0.36rem"
                color="#ffffff"
              ></my-icon>
            </div>
          </template>
        </div>
        <div class="user_name">罗振宇</div>
        <div class="user_desc clamp3">这个人很懒，什么也没留下</div>
        <div class="user_data">
          <div class="user_data_item" @click="$router.push('/known/home/fans')">
            <div class="user_data_item_num">9999万</div>
            <div class="user_data_item_name">粉丝</div>
          </div>
          <div
            class="user_data_item"
            @click="$router.push('/known/home/attention')"
          >
            <div class="user_data_item_num">9999万</div>
            <div class="user_data_item_name">关注</div>
          </div>
          <div class="user_data_item">
            <div class="user_data_item_num">9999万</div>
            <div class="user_data_item_name">获赞</div>
          </div>
        </div>
        <sp-image round class="user_banner" fit="cover" src="" />
      </div>
    </div>
    <div class="bottom_box">
      <sp-tabs
        v-model="active"
        title-active-color="#222222"
        title-inactive-color="#999999"
        @change="tabChange"
      >
        <sp-tab
          v-for="(item, index) in menuList"
          :key="index"
          :title="item"
        ></sp-tab>
      </sp-tabs>
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="list_container"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index" class="item">
          <div class="user">
            <sp-image round class="user_avatar" fit="cover" src="" />
            <div class="user_info">
              <div class="user_info_name">罗振宇</div>
              <div class="user_info_time">27分钟前·回答了问题</div>
            </div>
          </div>
          <div class="title clamp2">
            如何看待韩国人在巴基斯坦冒充中国人骗吃骗喝骗感情？
          </div>
          <div v-if="index % 2" class="content clamp3">
            笑死，韩国人干这种事真不稀奇了，简单给大家梳理一下事情的经过。绝了，韩国人跑到巴基斯坦绝了，韩国人跑到巴基斯坦绝了，韩国人跑到巴基…
          </div>
          <div v-else class="content_img">
            <div class="left_content clamp3">
              笑死，韩国人干这种事真不稀奇了，简单给大家梳理一下事情的经过。绝了，韩国人跑到巴基斯坦…
            </div>
            <sp-image class="right_img" fit="cover" src="" />
          </div>
          <div class="bottom">
            <div class="bottom_item" @click="agree">
              <my-icon
                name="fabiaoqing"
                size="0.36rem"
                color="#999999"
              ></my-icon>
              {{ 0 || '赞同' }}
            </div>
            <div class="bottom_item" @click="comments">
              <my-icon name="pinglun" size="0.36rem" color="#999999"></my-icon>
              {{ 3 || '评论' }}
            </div>
          </div>
        </div>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { Tabs, Tab, Image, List } from '@chipspc/vant-dgg'
import { userinfoApi } from '~/api'
export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
  },
  data() {
    return {
      active: 0,
      menuList: ['全部', '问题', '回答', '文章', '评论', '点赞'],
      list: [],
      loading: false,
      finished: false,
      isAttention: false,
    }
  },
  computed: {
    source() {
      return this.$route.query.source
    },
    userId() {
      return this.$route.query.userId
    },
  },
  mounted() {},
  methods: {
    tabChange() {
      this.list = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    onLoad() {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    agree() {
      console.log('赞同')
    },
    comments() {
      console.log('评论')
    },
  },
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;

  .top_box {
    padding-top: 320px;
    .card {
      position: relative;
      background-color: #ffffff;
      border-radius: 24px 24px 0px 0px;
      padding: 33px 32px 40px;
      font-size: 0;
      .user_avatar {
        width: 194px;
        height: 194px;
        background: #d9d9d9;
        border: 3px solid #ffffff;
        position: absolute;
        left: 32px;
        top: -97px;
      }
      .bt_box {
        display: flex;
        justify-content: flex-end;
        text-align: center;
        font-size: 26px;
        font-weight: 500;
        .bt_edit {
          width: 180px;
          height: 64px;
          background: #4974f5;
          border-radius: 8px;
          line-height: 64px;
          color: #ffffff;
        }
        .bt_attention {
          width: 144px;
          height: 64px;
          line-height: 64px;
          background: #4974f5;
          border-radius: 8px;
          color: #ffffff;
        }
        .bt_has_attention {
          width: 144px;
          height: 64px;
          line-height: 64px;
          background: #f5f5f5;
          border-radius: 8px;
          color: #999999;
        }
        .bt_contact {
          width: 63px;
          height: 64px;
          background: #999999;
          border-radius: 8px;
          margin-left: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .user_name {
        margin-top: 48px;
        font-size: 44px;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 44px;
      }
      .user_desc {
        margin-top: 24px;
        font-size: 26px;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
      }
      .user_data {
        margin-top: 48px;
        display: flex;
        &_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 64px;
          &_num {
            color: #4974f5;
            font-size: 36px;
            line-height: 36px;
            font-weight: 500;
          }
          &_name {
            font-size: 26px;
            font-weight: 400;
            color: #999999;
            line-height: 26px;
            margin-top: 16px;
          }
        }
      }
      .user_banner {
        margin-top: 48px;
        width: 686px;
        height: 180px;
        border-radius: 12px;
      }
    }
  }

  .bottom_box {
    background-color: #f8f8f8;
    /deep/ .sp-tabs {
      border-bottom: 1px solid #dddddd;
    }
    /deep/ .sp-tab {
      font-size: 30px;
    }
    .sp-tab--active {
      font-size: 32px;
      font-weight: 500;
    }

    .list_container {
      .item {
        background: #ffffff;
        padding: 28px 32px 28px;
        margin-bottom: 20px;
        .user {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
          .user_avatar {
            width: 66px;
            height: 66px;
            margin-right: 16px;
          }
          .user_info {
            &_name {
              font-size: 28px;
              font-weight: 400;
              color: #222222;
              line-height: 28px;
            }
            &_time {
              margin-top: 12px;
              font-size: 24px;
              font-weight: 400;
              color: #999999;
              line-height: 24px;
            }
          }
        }
        .title {
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 36px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 48px;
          margin-bottom: 17px;
        }

        .content {
          font-family: PingFangSC-Regular, PingFang SC;
          font-size: 30px;
          font-weight: 400;
          color: #555555;
          line-height: 42px;
        }
        .content_img {
          display: flex;
          .left_content {
            font-family: PingFangSC-Regular, PingFang SC;
            font-size: 30px;
            font-weight: 400;
            color: #555555;
            line-height: 42px;
            flex: 1;
            margin-right: 32px;
          }
          .right_img {
            width: 190px;
            height: 127px;
            background: #cccccc;
            border-radius: 12px;
          }
        }
        .bottom {
          font-family: PingFangSC-Regular, PingFang SC;
          margin-top: 24px;
          font-size: 28px;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
          display: flex;
          &_item {
            display: flex;
            align-items: center;
            margin-right: 24px;
            min-width: 148px;
            i {
              margin-right: 16px;
            }
          }
        }
      }
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
}
</style>
