<template>
  <div
    class="m-known create-center"
    :class="[emptyFlag === 'not' ? '' : 'z-bg-white']"
  >
    <Header title="创作中心" :fixed="true" />
    <sp-tabs v-model="active" @change="changeTab">
      <sp-tab v-for="(item, index) in tabList" :key="index" :title="item.tab">
        <template v-if="emptyFlag === 'not'">
          <sp-list
            v-model="loading"
            :finished="finished"
            class="list"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
            <div
              v-for="(itemItem, indexIndex) in list"
              :key="indexIndex"
              class="item-wrapper"
              @click="link(itemItem)"
            >
              <div class="placeholder"></div>
              <div class="item">
                <div class="tile">
                  <span
                    class="tile-flag"
                    :class="[
                      itemItem.status === 0
                        ? 'z-pending'
                        : itemItem.status === 1
                        ? 'z-approved'
                        : 'z-cancel',
                    ]"
                    >{{ itemItem.status | fliterStatus }}</span
                  ><span class="tile-txt">&nbsp;{{ itemItem.title }}</span>
                </div>
                <div class="content">
                  <div class="content-txt">
                    {{ itemItem.contentText }}
                  </div>
                  <sp-image
                    v-if="itemItem.contentImageUrl"
                    class="content-img"
                    fit="cover"
                    :src="itemItem.contentImageUrl.split(',')[0]"
                  />
                </div>
                <div class="desc">
                  <div class="desc-tip">
                    {{
                      itemItem.type === 1
                        ? itemItem.answerCount || 0
                        : itemItem.applaudCount || 0
                    }}
                    {{ itemItem.type === 1 ? '回答' : '点赞' }} ·
                    {{ itemItem.collectCount || 0 }} 收藏
                  </div>
                </div>
              </div>
            </div>
          </sp-list>
        </template>
        <template v-else>
          <div class="empty">
            <img :src="imgsrc" />
            <div class="empty-desc">您暂未创作任何内容～</div>
          </div>
        </template>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Tab, Tabs, Button, List, Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import knownApi from '@/api/known'
import utils from '@/utils/changeBusinessData'

export default {
  name: 'KnownCreateCenter',
  components: {
    Header,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Button.name]: Button,
    [List.name]: List,
    [Image.name]: Image,
  },
  filters: {
    fliterStatus(val) {
      const txts = ['审核中', '已通过', '未通过']
      return txts[val]
    },
  },
  data() {
    return {
      error: false,
      loading: true,
      finished: false,
      page: 1,
      limit: 15,
      list: [],
      active: 0,
      activeMapping: [[0, 1, 2], [1], [0], [2]], // status: 1 | 审核通过; 2 | 拒绝; 0 | 待审核, 如果不传status,则默认返回所有数据
      tabList: [
        {
          tab: '全部',
        },
        {
          tab: '已发布',
        },
        {
          tab: '审核中',
        },
        {
          tab: '未通过',
        },
      ],
      emptyFlag: 'not',
      imgsrc: '',
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      isInApp: (state) => state.app.isInApp,
    }),
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.imgsrc = this.$ossImgSetV2(utils.getEmptyImgConfig('calendar'))
    if (this.isInApp) {
      if (this.userInfo) {
        this.onLoad()
      } else {
        this.$appFn.dggGetUserInfo((res) => {
          if (res.code === 200 && res.data.userId && res.data.token) {
            this.$store.dispatch('user/setUser', res.data)
            this.onLoad()
          }
        })
      }
    } else {
      this.onLoad()
    }
  },
  methods: {
    changeTab() {
      this.init()
      this.onLoad()
    },
    init() {
      this.page = 1
      this.error = false
      this.finished = false
      this.loading = true
      this.list = []
      this.emptyFlag = 'not'
    },
    onLoad() {
      this.findListByStatusApi()
    },
    async findListByStatusApi() {
      try {
        const params = {
          page: this.page,
          limit: this.limit,
          status: this.activeMapping[this.active],
          userIds: [
            this.userId ||
              this.userInfo.userId ||
              this.$cookies.get('userId', { path: '/' }),
          ],
        }
        const { code, data } = await this.$axios.post(
          knownApi.createCenter.findListByStatus,
          params
        )
        this.loading = false
        if (code !== 200) {
          throw new Error('请求接口失败!')
        }
        if (data.records.length === 0 && data.totalPage === 0) {
          this.emptyFlag = 'yes'
        }
        this.list.push(...data.records)
        this.page++
        if (this.page > data.totalPage) {
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },
    link(item) {
      // 未通过 直接跳入写页面
      if (item.status === 2) {
        // 问题
        if (item.type === 1) {
          this.$router.push({
            path: '/known/publish/question',
            query: {
              editType: '2',
              id: item.id,
            },
          })
          return
        }
        // 文章
        if (item.type === 2) {
          this.$router.push({
            path: '/known/publish/article',
            query: {
              editType: '2',
              id: item.id,
            },
          })
        } else {
          // 回答 这里需要传问题id,让用户在上一次回答的问题上继续回答
          this.$router.push({
            path: '/known/publish/answer',
            query: {
              id: item.id,
              editType: '2',
            },
          })
        }
      } else {
        // 通过了 跳入查看详情页面
        // 问题
        if (item.type === 1) {
          this.$router.push({
            path: '/known/detail/question',
            query: {
              id: item.id, // 问题id
            },
          })
          return
        }
        // 文章
        if (item.type === 2) {
          this.$router.push({
            path: '/known/detail/article',
            query: {
              id: item.id, // 问题id
            },
          })
        } else {
          // 回答
          this.$router.push({
            path: '/known/detail/answer',
            query: {
              id: item.id, // 传回答id
            },
          })
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.m-known.create-center {
  min-height: 100vh;
  background: #f8f8f8;
  &.z-bg-white {
    background: #fff;
  }
  .mixin-flex {
    display: flex;
    align-items: center;
  }

  .mixin-status(@color) {
    color: @color;
    border: 1px solid @color;
  }
  ::v-deep.sp-tabs {
    .sp-tabs__wrap {
      height: 72px;
      padding-bottom: 8px;
      .sp-tab {
        font: 400 30px/30px PingFangSC-Regular, PingFang SC;
        color: #999999;
      }
      .sp-tab--active {
        color: #222222;
        font-weight: bold;
      }
      .sp-tab__text--ellipsis {
        overflow: unset;
      }
      .sp-tabs__line {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
      }
    }
  }

  .item {
    background: #fff;
    padding: 32px 40px;
    .tile {
      position: relative;
      margin-bottom: 20px;
      .textOverflow(2);
      line-height: 48px;
      font: bold 36px @fontf-pfsc-med;
      color: #1a1a1a;
      &-flag {
        position: absolute;
        top: 8px;
        height: 32px;
        width: 88px;
        box-sizing: border-box;
        font: 400 24px/32px @fontf-pfsc-reg;
        color: #ccc;
        border-radius: 4px;
        border: 1px solid #cccccc;
        text-align: center;
        &.z-approved {
          .mixin-status(#ccc);
        }
        &.z-pending {
          .mixin-status(#FE8C29);
        }
        &.z-cancel {
          .mixin-status(#FF3B30);
        }
      }
      &-txt {
        margin-left: 88px;
      }
    }
    .content {
      .mixin-flex();
      box-sizing: border-box;
      align-items: normal;
      padding-bottom: 32px;
      justify-content: space-between;
      height: 160px;
      &-txt {
        font: 400 30px/42px @fontf-pfsc-reg;
        color: #555555;
        .textOverflow(3);
        height: 128px;
        overflow: hidden;
      }
      &-img {
        margin-left: 40px;
        ::v-deep.sp-image__img {
          border-radius: 12px;
          width: 1.9rem;
          height: 1.28rem;
        }
      }
    }
    .desc {
      font: 400 28px/28px @fontf-pfsc-reg;
      color: #999999;
    }
  }

  .placeholder {
    width: 100%;
    height: 20px;
    background: #f5f5f5;
  }
  .empty {
    width: 100%;
    margin-top: 140px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    img {
      width: 340px;
      height: 340px;
    }
    &-desc {
      margin-top: 24px;
      font: bold 30px @fontf-pfsc-med;
      color: #222222;
      text-align: center;
    }
  }
}
</style>
