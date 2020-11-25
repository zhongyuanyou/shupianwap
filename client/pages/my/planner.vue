<!--
 * @Author: xiao pu
 * @Date: 2020-11-24 14:29:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-24 17:10:05
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/my/planner.vue
-->

<template>
  <div class="planner">
    <sp-sticky>
      <sp-top-nav-bar title="我的规划师" ellipsis @on-click-left="back">
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <div class="body">
      <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <sp-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <sp-cell v-for="item in list" :key="item">
            <div class="item">
              <div class="left">
                <div class="item_avatar">
                  <sp-image
                    round
                    width="0.8rem"
                    height="0.8rem"
                    fit="cover"
                    src="https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/images/EeisYyx7HZ.jpg"
                  />
                </div>
                <div class="item_detail">
                  <h4>
                    <span class="name">周文韬</span>
                    <span class="title">
                      <span class="title-content">
                        <i class="icon exclusive_icon"></i>
                        <i class="icon gold_icon"></i>
                        <i class="icon certificates_icon"></i>
                      </span>
                    </span>
                  </h4>
                  <p>成交案例：38</p>
                  <div class="tag-list">
                    <sp-tag color="#F0F2F5" text-color="#5C7499"
                      >服务标杆</sp-tag
                    >
                  </div>
                </div>
              </div>
              <div class="right item_contact">
                <sp-button round class="contact-btn"
                  ><my-icon
                    class=""
                    name="notify_ic_chat"
                    size="0.32rem"
                    color="#4974F5"
                /></sp-button>

                <sp-button round class="contact-btn"
                  ><my-icon
                    class=""
                    name="notify_ic_tel"
                    size="0.32rem"
                    color="#4974F5"
                /></sp-button>
              </div>
            </div>
          </sp-cell>
        </sp-list>
      </sp-pull-refresh>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Toast,
  PullRefresh,
  List,
  Cell,
  Image,
  Tag,
  Sticky,
  TopNavBar,
} from '@chipspc/vant-dgg'

export default {
  name: 'Planner',
  components: {
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Sticky.name]: Sticky,
    [TopNavBar.name]: TopNavBar,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
  },
}
</script>

<style lang="less" scoped>
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.planner {
  height: 100%;
  overflow-y: scroll;
  .body {
    padding: 0;
    /deep/.sp-cell {
      padding: 40px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-items: flex-end;
      .left {
        display: flex;
      }
      &_detail {
        padding-left: 24px;
        h4 {
          display: flex;
          .name {
            font-size: 32px;
            font-weight: bold;
            color: @title-text-color;
            line-height: 36px;
            margin-right: 16px;
          }
          .title {
            position: relative;
            .title-content {
              position: absolute;
              left: 0;
              top: 0;
              white-space: nowrap;
              z-index: 1;
              line-height: 1;
              .icon {
                margin-right: 8px;
                &:last-child {
                  margin-right: 0;
                }
              }
              .exclusive_icon {
                width: 134px;
                height: 28px;
                background-image: url('~assets/images/planner/per_img_exclusive.png');
              }
              .gold_icon {
                width: 114px;
                height: 28px;
                background-image: url('~assets/images/planner/per_img_gold.png');
              }
              .certificates_icon {
                width: 40px;
                height: 28px;
                background-image: url('~assets/images/planner/per_img_certificates.png');
              }
            }
          }
        }
        p {
          font-size: 24px;
          font-weight: 400;
          color: @title-text-color;
          line-height: 28px;
          margin-top: 12px;
        }
        .tag-list {
          margin-top: 12px;
          line-height: 1;
        }
      }
      &_contact {
        width: 160px;
        .contact-btn {
          width: 64px;
          height: 64px;
          background: #ebf3ff;
          &:last-child {
            float: right;
          }
        }
      }
    }
  }
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
}
</style>
