<template>
  <div class="interview">
    <sp-sticky>
      <sp-top-nav-bar title="面谈记录" ellipsis @on-click-left="back">
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
          <sp-cell
            v-for="(item, index) in list"
            :key="index"
            class="item"
            :border="false"
          >
            <div class="item-info">
              <div class="left">
                <div class="item-info_avatar">
                  <sp-image
                    round
                    width="0.8rem"
                    height="0.8rem"
                    fit="cover"
                    src="https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/images/ZAsSZ8zwXb.jpg"
                  />
                </div>
                <div class="item-info_detail">
                  <h4>
                    <span class="name">石爱停</span>
                    <span class="title">
                      <span class="title-content">
                        <i class="icon gold_icon"></i>
                        <i class="icon certificates_icon"></i>
                      </span>
                    </span>
                  </h4>
                  <p>面谈时间：<span>2020-09-19 14:00</span></p>
                  <p class="address">
                    面谈地点：<span>顶呱呱成都政企服务中心</span
                    ><my-icon
                      class="address_icon"
                      name="per_ic_addressr"
                      size="0.12rem"
                      color="#4974F5"
                    />
                  </p>
                  <p>面谈方式：<span>到访面谈</span></p>
                </div>
              </div>
              <div class="right item-info_contact">
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
                <sp-tag color="#F8F8F8" text-color="#999999">已完成</sp-tag>
              </div>
            </div>
            <div class="item-status">
              <sp-button v-if="index < 2" plain type="default"
                >取消面谈</sp-button
              >
              <span v-else>您在2020年9月20日已取消面谈</span>
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
  name: 'Interview',
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

.interview {
  height: 100%;
  overflow-y: scroll;
  .body {
    padding: 0;
    /deep/.sp-cell {
      padding: 32px 40px 0px;
      border-bottom: 24px solid #f8f8f8;
    }
    .item {
      &-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-items: flex-start;
        .left {
          display: flex;
          flex: 1;
        }
        &_detail {
          padding-left: 24px;
          h4 {
            display: flex;
            margin-bottom: 18px;
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
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
            margin-bottom: 16px;
            .textOverflow(1);
            span {
              color: #555555;
            }
            &.address {
              width: 100%;
              display: flex;
              span {
                flex: 0.91;
                .textOverflow(1);
              }
            }
            .address_icon {
              position: relative;
              top: 1px;
            }
          }
        }
        &_contact {
          width: 160px;
          height: 160px;
          position: relative;
          /deep/.sp-tag--default {
            height: 48px;
            background: #f8f8f8;
            border-radius: 8px;
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 48px;
            padding: 0px 36px;
            color: #999999;
            position: absolute;
            bottom: 0px;
            right: 0px;
          }
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
      &-status {
        height: 90px;
        margin-top: 14px;
        border-top: 1px solid #f4f4f4;
        text-align: center;
        /deep/.sp-button--default {
          border: 0;
          .sp-button__text {
            color: #555555;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 400;
          }
        }
        span {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 90px;
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
