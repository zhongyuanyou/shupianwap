<template>
  <div class="interview">
    <Header title="面谈记录">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
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
            <div class="item-info" @click="handleClick(item)">
              <div class="left">
                <div class="item-info_avatar" @click.stop="scanDetail(item)">
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
                    <span class="name">{{ item.inviterName }}</span>
                    <span class="title">
                      <span class="title-content">
                        <img
                          :src="$ossImgSet(106, 20, '3fjjj54kqz20000.png')"
                          alt=""
                        />
                        <img
                          :src="$ossImgSet(32, 20, '48gdkcbncui0000.png')"
                          alt=""
                        />
                      </span>
                    </span>
                  </h4>
                  <p>
                    面谈时间：<span>{{ item.inviteTime }}</span>
                  </p>
                  <p class="address">
                    面谈地点：<span>{{ item.inviteAddress }}</span>
                  </p>
                  <p>
                    面谈方式：<span>{{
                      item.inviteType ? '外出拜访' : '客户上门'
                    }}</span>
                  </p>
                </div>
              </div>
              <div class="right item-info_contact">
                <sp-button
                  round
                  class="contact-btn"
                  @click.stop="handleIm(item)"
                  ><my-icon
                    name="notify_ic_chat"
                    size="0.32rem"
                    color="#4974F5"
                /></sp-button>

                <sp-button
                  round
                  class="contact-btn"
                  @click.stop="tel(item.inviterContact)"
                  ><my-icon name="notify_ic_tel" size="0.32rem" color="#4974F5"
                /></sp-button>
                <sp-tag
                  v-if="
                    item.inviteStatus === 1 ||
                    item.inviteStatus === 2 ||
                    item.inviteStatus === 3
                  "
                  color="#F8F8F8"
                  text-color="#999999"
                  >{{
                    item.inviteStatus === 0
                      ? '待面谈'
                      : item.inviteStatus === 1
                      ? '已面谈'
                      : item.inviteStatus === 2
                      ? '已评价'
                      : '已取消'
                  }}</sp-tag
                >
              </div>
            </div>
            <div class="item-status">
              <sp-button
                v-if="item.inviteStatus === 0"
                plain
                type="default"
                @click="cancelInterview(item.id)"
                >取消面谈</sp-button
              >
              <span v-else-if="item.inviteStatus === 2"
                >您在{{ item.cancelTime }}已取消面谈</span
              >
              <span v-else-if="item.inviteStatus === 3">您已取消面谈</span>
              <span v-else>您在{{ item.completeTime }}已完成面谈</span>
            </div>
          </sp-cell>
        </sp-list>
      </sp-pull-refresh>
    </div>
    <!--S 弹框-->
    <sp-center-popup
      v-model="cancelStatus"
      :field="Field7"
      button-type="confirm"
      @confirm="cancelConfirm"
    />
    <!--E 弹框-->
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
  CenterPopup,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { interviewApi, publicApi } from '~/api'
import imHandle from '@/mixins/imHandle'
import Header from '@/components/common/head/header'

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
    [CenterPopup.name]: CenterPopup,
    Header,
  },
  mixins: [imHandle],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 2, // 当前页
      limit: 10, // 每页显示条数
      cancelStatus: false,
      interId: '', // 面谈id
      Field7: {
        type: 'functional',
        title: '确定取消面谈吗？',
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      userId: (state) => state.user.userInfo.userId,
    }),
  },
  mounted() {
    if (this.isInApp) {
      this.$appFn.dggSetTitle(
        {
          title: '面谈记录',
        },
        (res) => {}
      )
    }
    this.getInterviewList()
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 查看规划师详情
    scanDetail(item) {
      const data = {
        mchUserId: item.inviterId,
      }
      this.$router.push({
        name: 'planner-detail',
        query: data,
      })
    },
    // 打电话encryptPhone: number,
    async tel(number) {
      // window.location.href = 'tel:' + number
      try {
        const params = {
          encryptPhone: number,
        }
        const res = await this.$axios.get(publicApi.descrptionPhone, { params })
        if (res.code === 200 && res.data) {
          window.location.href = 'tel:' + res.data
        }
      } catch (err) {}
    },
    cancelConfirm() {
      // 显示取消面谈确认框
      this.cancelView()
    },
    cancelInterview(id) {
      this.interId = id
      this.cancelStatus = true
    },
    // 取消面谈
    async cancelView() {
      try {
        const params = {
          id: this.interId,
          type: 0,
        }
        const res = await this.$axios.post(interviewApi.cancel, params)
        if (res.code === 200) {
          this.page = 1
          this.getInterviewList()
        }
      } catch (err) {}
    },
    async onLoad() {
      const page = this.page++
      const params = {
        limit: this.limit,
        userId: this.userId,
        page,
      }
      const res = await this.$axios.get(interviewApi.list, { params })
      if (res.code === 200) {
        if (res.data.records.length) {
          this.loading = false
          this.list = this.list.concat(res.data.records)
        } else {
          this.finished = true
        }
      }
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
        page: 1,
        userId: this.userId,
      }
      const res = await this.$axios.get(interviewApi.list, { params })
      if (res.code === 200) {
        this.list = res.data.records
      }
    },
    handleClick(item) {
      // 点击面谈记录
      this.$router.push(`/my/interviewRecord/${item.id}`)
    },
    handleIm(item) {
      // 调起IM
      const imUserId = this.userId // 商户用户ID
      const imUserType = 'MERCHANT_USER' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
      const imUserName = item.inviterName
      if (this.isInApp) {
        this.$appFn.dgg_openIM(
          { name: imUserName, userId: imUserId, userType: imUserType },
          (res) => {}
        )
        return
      }
      this.creatImSessionMixin({ imUserId, imUserType })
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
  .back_icon {
    margin-left: 40px;
  }
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
              margin-right: 16px;
              max-width: 100px;
              .textOverflow(1);
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
              }
            }
          }
          p {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
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
        /deep/ .sp-button {
          width: 100%;
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
