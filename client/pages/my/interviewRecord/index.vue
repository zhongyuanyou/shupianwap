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
                <div class="item-info_avatar" @click="scanDetail(item.id)">
                  <sp-image
                    round
                    width="0.8rem"
                    height="0.8rem"
                    fit="cover"
                    :src="item.avatar"
                  />
                </div>
                <div class="item-info_detail">
                  <h4>
                    <span class="name">{{ item.name }}</span>
                    <span class="title">
                      <span class="title-content">
                        <i class="icon gold_icon"></i>
                        <i class="icon certificates_icon"></i>
                      </span>
                    </span>
                  </h4>
                  <p>
                    面谈时间：<span>{{ item.time }}</span>
                  </p>
                  <p class="address">
                    面谈地点：<span>{{ item.address }}</span
                    ><my-icon
                      class="address_icon"
                      name="per_ic_addressr"
                      size="0.12rem"
                      color="#4974F5"
                    />
                  </p>
                  <p>
                    面谈方式：<span>{{ item.type }}</span>
                  </p>
                </div>
              </div>
              <div class="right item-info_contact">
                <sp-button round class="contact-btn"
                  ><my-icon
                    name="notify_ic_chat"
                    size="0.32rem"
                    color="#4974F5"
                /></sp-button>

                <sp-button round class="contact-btn" @click="tel(item.phone)"
                  ><my-icon name="notify_ic_tel" size="0.32rem" color="#4974F5"
                /></sp-button>
                <sp-tag
                  v-if="item.status === 1 || item.status === 2"
                  color="#F8F8F8"
                  text-color="#999999"
                  >{{
                    item.status === 1
                      ? '已完成'
                      : item.status === 2
                      ? '已取消'
                      : ''
                  }}</sp-tag
                >
              </div>
            </div>
            <div class="item-status">
              <sp-button
                v-if="item.status === 0"
                plain
                type="default"
                @click="cancelInterview(item.id)"
                >取消面谈</sp-button
              >
              <span v-else-if="item.status === 2"
                >您在{{ item.cancelTime }}已取消面谈</span
              >
              <span v-else>您在{{ item.completeTime }}已完成面谈</span>
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
import { interviewApi } from '~/api'

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
      page: 1, // 当前页
      limit: 10, // 每页显示条数
    }
  },
  mounted() {
    this.getInterviewList()
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 查看规划师详情
    scanDetail(id) {
      this.$router.push('/planner/' + id)
    },
    // 打电话
    tel(number) {
      // if (this.isdggapp) {
      //   this.$appFn.callPhone(number, (res) => {})
      // } else {
      //   window.location.href = 'tel:' + number
      // }
      window.location.href = 'tel:' + number
    },
    // 取消面谈
    cancelInterview(id) {
      console.log('取消面谈：' + id)
    },
    onLoad() {
      // setTimeout(() => {
      //   if (this.refreshing) {
      //     this.list = []
      //     this.refreshing = false
      //   }
      //
      //   for (let i = 0; i < 10; i++) {
      //     const itemObj = {
      //       id: i,
      //       name: '石爱停',
      //       avatar:
      //         'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/images/ZAsSZ8zwXb.jpg',
      //       time: '2020-09-19 14:00',
      //       address: '顶呱呱成都政企服务中心',
      //       type: '到访面谈',
      //       status: i < 1 ? 1 : i > 1 && i < 3 ? 2 : 0,
      //       cancelTime: '2020年9月20日',
      //       completeTime: '2020年9月20日',
      //       phone: '13628009206',
      //     }
      //     this.list.push(itemObj)
      //   }
      //   this.loading = false
      //
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
    },
    onRefresh() {
      // // 清空列表数据
      // this.finished = false
      //
      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
    },
    async getInterviewList() {
      // 获取面谈记录列表
      const params = {
        limit: this.limit,
        page: this.page,
      }
      const res = await this.$axios.get(interviewApi.list, { params })
      this.list = res.data.records
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
            &:not(:first-child) {
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
