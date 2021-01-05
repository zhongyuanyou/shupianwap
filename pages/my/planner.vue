<template>
  <div class="planner">
    <div class="head">
      <Header title="我的规划师">
        <template #left>
          <my-icon
            name="nav_ic_back"
            class="back-icon"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onLeftClick"
          />
        </template>
      </Header>
    </div>

    <div class="body">
      <sp-pull-refresh
        v-model="refreshing"
        pulling-text="下拉就可刷新..."
        loosing-text="释放即可刷新..."
        class="planner-refresh"
        @refresh="onRefresh"
      >
        <sp-list
          v-model="loading"
          error-text="请求失败，点击重新加载"
          :error.sync="error"
          :finished="finished"
          :finished-text="list.length > 0 ? '没有更多了' : ''"
          @load="onLoad"
        >
          <template v-if="list && list.length">
            <sp-cell v-for="(item, index) in list" :key="index">
              <div class="item">
                <div class="left">
                  <div
                    class="item_avatar"
                    @click="handleScanDetail(item.mchUserId)"
                  >
                    <sp-image
                      round
                      width="0.8rem"
                      height="0.8rem"
                      fit="cover"
                      :src="item.img"
                    />
                  </div>
                  <div class="item_detail">
                    <h4>
                      <span class="name">{{ item.userName }}</span>
                      <span class="title">
                        <span class="title-content">
                          <span
                            v-if="!!item.title"
                            class="title-content__item"
                            >{{ item.title }}</span
                          >
                          <!--  <i class="icon exclusive_icon"></i> -->
                          <!-- <i class="icon certificates_icon"></i> -->
                        </span>
                      </span>
                    </h4>
                    <p>{{ item.recentCompany }}</p>
                    <div class="tag-list">
                      <sp-tag
                        v-for="tag of item.tagList.slice(0, 2)"
                        :key="tag"
                        class="tag"
                        color="#F0F2F5"
                        text-color="#5C7499"
                        >{{ tag }}</sp-tag
                      >
                    </div>
                  </div>
                </div>
                <div class="right item_contact">
                  <sp-button
                    round
                    class="contact-btn"
                    @click.stop="handleIm(item)"
                    ><my-icon
                      class=""
                      name="notify_ic_chat"
                      size="0.32rem"
                      color="#4974F5"
                  /></sp-button>

                  <sp-button
                    round
                    class="contact-btn"
                    @click.stop="handleTel(item)"
                    ><my-icon
                      class=""
                      name="notify_ic_tel"
                      size="0.32rem"
                      color="#4974F5"
                  /></sp-button>
                </div>
              </div>
            </sp-cell>
          </template>
          <template v-else-if="!loading">
            <div class="no-data">
              <sp-image
                class="no-data__icon"
                fit="cover"
                :src="require('../../assets/images/search-null.png')"
              />
              <template v-if="!error">
                <div class="no-data__descript">您暂未有联系过的规划师</div>
              </template>
            </div>
          </template>
          <!-- S 自定义加载控件 -->
          <template #loading>
            <div>
              <LoadingDown v-show="!refreshing && loading" :loading="true" />
            </div>
          </template>
          <!-- E 自定义加载控件 -->
        </sp-list>
      </sp-pull-refresh>
    </div>
    <sp-toast ref="spToast" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

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

import SpToast from '@/components/common/spToast/SpToast'
import Header from '@/components/common/head/header'
import LoadingDown from '@/components/common/loading/LoadingDown'

import imHandle from '@/mixins/imHandle'

import { planner } from '@/api'
import { callPhone, parseTel } from '@/utils/common'

const DEFAULT_PAGE = {
  limit: 10,
  page: 1,
  totalCount: 0,
}

export default {
  name: 'MyPlanner',
  components: {
    [Button.name]: Button,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Sticky.name]: Sticky,
    [TopNavBar.name]: TopNavBar,
    Header,
    SpToast,
    LoadingDown,
  },
  mixins: [imHandle],
  data() {
    return {
      list: [],
      loading: true, // 为了初始页面加载loading
      error: false,
      finished: false,
      refreshing: false,
      pageOption: DEFAULT_PAGE,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  created() {
    if (process && process.client) {
      // 因为设置loading默认为true,list控件不会主动触发onload,需要手动触发加载
      this.onLoad()
    }
  },
  methods: {
    onLeftClick() {
      console.log('nav onClickLeft')
      this.uPGpBack()
    },

    // 查看规划师详情
    handleScanDetail(mchUserId) {
      this.$router.push({
        name: 'planner-detail',
        query: { mchUserId },
      })
    },
    // 打电话
    handleTel(item) {
      const { mchUserId } = item || {}
      this.getTel(mchUserId).then((data) => {
        this.uPCall(data)
      })
    },
    // 唤起IM
    handleIm(item) {
      const { mchUserId, userName } = item || {}
      this.uPIM({ mchUserId, userName })
    },
    onLoad() {
      let currentPage = this.pageOption.page
      if (!this.refreshing && this.list.length && currentPage >= 1) {
        currentPage += 1
      } else if (this.refreshing) {
        this.pageOption = DEFAULT_PAGE
        currentPage = 1
      }
      this.getList(currentPage)
        .then((data) => {
          console.log(data)
          this.loading = false
          if (this.list.length >= this.pageOption.totalCount) {
            this.finished = true
          }
        })
        .catch(() => {
          this.error = true
          this.loading = false
        })
    },
    onRefresh() {
      this.finished = false
      this.loading = true
      this.onLoad()
    },

    // 返回上一页
    uPGpBack() {
      if (this.isInApp) {
        this.$appFn.dggCloseWebView()
        return
      }
      this.$router.go(-1)
    },

    // 拨打电话号码
    uPCall(data) {
      const { ciphertext } = data || {}
      const telNumber = parseTel(ciphertext)
      console.log('telNumber:', telNumber)
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggCallPhone({ phone: telNumber }, (res) => {
          const { code } = res || {}
          if (code !== 200) {
            this.$refs.spToast.show({
              message: '拨号失败！',
              duration: 1000,
              forbidClick: true,
              icon: 'toast_ic_remind',
            })
          }
        })
        return
      }
      // 浏览器中调用的
      callPhone(telNumber)
    },

    // 发起聊天
    uPIM(data = {}) {
      const { mchUserId, userName } = data
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggOpenIM(
          {
            name: userName,
            userId: mchUserId,
            userType: 'MERCHANT_USER',
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200)
              this.$refs.spToast.show({
                message: `联系失败`,
                duration: 1000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
          }
        )
        return
      }
      const imUserType = 'MERCHANT_USER' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
      this.creatImSessionMixin({ imUserId: mchUserId, imUserType })
    },

    async getList(currentPage) {
      const { limit } = this.pageOption
      const { userId } = this.userInfo || {} // { userId: '607997598875151734' }
      if (!userId) {
        this.$refs.spToast.show({
          message: `请先登录`,
          duration: 1000,
          forbidClick: true,
          icon: 'toast_ic_remind',
        })
        return
      }
      const params = { userId, limit, page: currentPage }
      try {
        const data = await planner.list(params)
        console.log(data)
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        if (data) {
          const { limit, currentPage = 1, totalCount = 0, records = [] } = data
          this.pageOption = { limit, totalCount, page: currentPage }
          this.list.push(...records)
          this.$refs.spToast.show({
            message: `共找到${totalCount}个规划师`,
            duration: 1000,
            forbidClick: true,
            icon: 'toast_ic_comp',
          })
        }
        return data
      } catch (error) {
        if (this.refreshing) {
          this.refreshing = false
        }
        this.$refs.spToast.show({
          message: `获取电话号码失败`,
          duration: 1000,
          forbidClick: true,
          icon: 'toast_ic_remind',
        })
        console.error('getList:', error)
        return Promise.reject(error)
      }
    },
    async getTel(mchUserId) {
      const params = { id: mchUserId }
      try {
        const data = await planner.tel(params)
        console.log(data)
        return data
      } catch (error) {
        console.error('getTel:', error)
        return Promise.reject(error)
      }
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
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

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
              // position: absolute;
              // left: 0;
              // top: 0;
              white-space: nowrap;
              z-index: 1;
              line-height: 1;
              display: flex;
              align-items: center;
              &__item {
                display: inline-block;
                max-width: 150px;
                height: 28px;
                padding: 0 12px;
                background: linear-gradient(135deg, #ffeab9, #edcf98);
                border: 1px solid #dfb45a;
                border-radius: 14px;
                font-size: 18px;
                font-weight: bold;
                color: #9b6809;
                line-height: 30px;
                .textOverflow(1);
                vertical-align: middle;
              }
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
          font-size: 22px;
          display: flex;
          .tag {
            max-width: 148px;
            height: 32px;
            margin-left: 12px;
            .textOverflow(1);
            &:first-child {
              margin-left: 0;
            }
          }
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
  &-refresh {
    min-height: 100%;
  }
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &__icon {
      width: 340px;
      height: 202px;
      margin-top: 64px;
    }
    &__descript {
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-top: 38px;
    }
    &__tip {
      font-size: 24px;
      font-weight: 400;
      color: #cdcdcd;
      line-height: 28px;
      margin-top: 16px;
    }
  }
}
</style>