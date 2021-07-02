<template>
  <div class="collection_container">
    <Header title="我的收藏">
      <template v-if="tabIndex == 4 || tabIndex == 5" #right>
        <div class="rightBtn" @click="ChangeSelectedGoodsState">
          <span v-if="!selectGoodsState">编辑</span>
          <span v-else>完成</span>
        </div>
      </template>
    </Header>
    <sp-tabs
      title-active-color="#4974F5"
      title-inactive-color="#222222"
      @click="changeTab"
    >
      <sp-tab
        v-for="item in tabs"
        :key="item.id"
        :title="item.tile"
        :name="item.id"
      ></sp-tab>
    </sp-tabs>

    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list_container"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <div v-if="tabIndex == 1 || tabIndex == 2 || tabIndex == 3">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="item"
          @click="toDetail(item)"
        >
          <div class="title clamp2">{{ item.title }}</div>
          <!-- 除了回答,都有人物头像和图片 -->
          <div v-if="tabIndex !== 1" class="user">
            <sp-image
              round
              class="user_avatar"
              fit="cover"
              :src="item.avatar"
              @click.stop="toHome(item)"
            />{{ item.userName }}
          </div>
          <div v-if="item.contentImageUrl === ''" class="content clamp2">
            {{ item.contentText }}
          </div>
          <div v-else class="content_img">
            <div class="left_content clamp3">
              {{ item.contentText }}
            </div>
            <sp-image
              radius="0.12rem"
              class="right_img"
              fit="cover"
              :src="item.contentImageUrl.split(',')[0]"
            />
          </div>
          <div class="bottom">
            {{
              tabIndex !== 1
                ? `${item.applaudCount} 赞 ${item.remarkCount} 评论`
                : `${item.answerCount} 回答 · ${item.collectCount} 收藏`
            }}
          </div>
        </div>
      </div>
      <div v-else-if="tabIndex == 4 || tabIndex == 5">
        <client-only>
          <sp-checkbox-group ref="checkboxGroup" v-model="selectDelGoods">
            <div
              v-for="(item, index) in list"
              :key="index"
              class="goods-list"
              @click="GoodsListClick(item, index)"
            >
              <sp-swipe-cell :disabled="selectGoodsState">
                <ServiceGoods
                  class="flex-1"
                  :info="item"
                  :type="tabIndex == 4 ? 'Service' : 'Trading'"
                >
                  <template v-if="selectGoodsState" #left>
                    <sp-checkbox
                      ref="checkboxItems"
                      class="goods-list-checkbox"
                      :name="item.id"
                    >
                      <template #icon="props">
                        <my-icon
                          :name="
                            props.checked
                              ? 'order_ic_success'
                              : 'pay_ic_radio_n'
                          "
                          size="0.4rem"
                          :color="props.checked ? '#4E78F5' : '#dddddd'"
                        ></my-icon>
                      </template>
                    </sp-checkbox>
                  </template>
                </ServiceGoods>

                <template #right>
                  <sp-button
                    square
                    type="danger"
                    style="height: 100%"
                    @click.stop="delGoods(item)"
                    >取消<br />收藏</sp-button
                  >
                </template>
              </sp-swipe-cell>
            </div>
          </sp-checkbox-group>
        </client-only>
      </div>
    </sp-list>
    <div
      v-if="(tabIndex == 4 || tabIndex == 5) && selectGoodsState"
      class="footer-nav-relative"
    ></div>
    <div
      v-if="(tabIndex == 4 || tabIndex == 5) && selectGoodsState"
      class="footer-nav"
    >
      <div class="footer_container">
        <sp-checkbox
          v-model="checkedAllState"
          class="checkedAllState"
          @change="checkedAllChange"
          >全选
          <template #icon="props">
            <my-icon
              :name="props.checked ? 'order_ic_success' : 'pay_ic_radio_n'"
              size="0.4rem"
              :color="props.checked ? '#4E78F5' : '#dddddd'"
            ></my-icon>
          </template>
        </sp-checkbox>

        <div class="footer-btn">
          <sp-button plain hairline type="primary" @click="delGoodsList"
            >取消收藏</sp-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  Tabs,
  Tab,
  Image,
  List,
  Button,
  SwipeCell,
  CheckboxGroup,
  Checkbox,
} from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import { shopApi } from '@/api'
import Header from '@/components/common/head/header.vue'

import ServiceGoods from '@/components/my/collection/ServiceGoods.vue'

export default {
  name: 'Collection',
  components: {
    [Button.name]: Tabs,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
    [Button.name]: Button,

    [SwipeCell.name]: SwipeCell,
    Header,
    ServiceGoods,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      content: '',
      tabs: [
        {
          tile: '问题',
          id: 1,
        },
        {
          tile: '回答',
          id: 3,
        },
        {
          tile: '文章',
          id: 2,
        },
        {
          tile: '服务商品',
          id: 4,
        },
        {
          tile: '交易商品',
          id: 5,
        },
      ],
      list: [],
      selectDelGoods: [],
      selectGoodsState: false, // 是否开启多选
      checkedAllState: false, // 全选状态
      page: 1,
      tabIndex: 4,
      limit: 15,
      error: false,
      loading: false,
      finished: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
  },
  methods: {
    checkedAllChange(state) {
      if (state) {
        this.$refs.checkboxGroup.toggleAll(true)
      } else {
        this.$refs.checkboxGroup.toggleAll(false)
      }
    },
    GoodsListClick(info, index) {
      if (this.selectGoodsState) {
        this.$refs.checkboxItems[index].toggle()
      } else {
        this.toServiceGoodsDetail(info)
      }
    },
    toServiceGoodsDetail(info) {
      if (this.selectGoodsState) {
        return
      }
      if (this.tabIndex === 4) {
        this.$router.push({
          path: '/detail',
          query: {
            productId: info.goodsId,
          },
        })
      } else {
        this.$router.push({
          path: '/detail/transactionDetails',
          query: {
            productId: info.goodsId,
          },
        })
      }
    },

    toDetail(item) {
      this.$router.push({
        path:
          item.type === 1
            ? '/known/detail/question'
            : item.type === 2
            ? '/known/detail/article'
            : '/known/detail/answer',
        query: {
          id: item.id,
        },
      })
    },
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
    changeTab(name) {
      if (this.tabIndex === name) {
        return
      }
      this.checkedAllState = false // 全选状态
      this.selectGoodsState = false // 开启多选
      this.selectDelGoods = [] // 选择的商品id

      this.tabIndex = name
      this.init()
      this.onLoad()
    },

    init() {
      this.page = 1
      this.finished = false
      this.error = false
      this.loading = true
      this.list = []
    },
    onLoad() {
      if (this.tabIndex < 4) {
        this.getList()
      } else {
        this.getGoodsList()
      }
    },
    async getList() {
      try {
        const params = {
          handleUserId: this.userId,
          dateType: this.tabIndex, //  1问题 2文章 3回答.默认问题
          limit: this.limit,
          page: this.page,
        }
        const res = await this.$axios.get(knownApi.home.collection, { params })
        if (res.code === 200) {
          this.list.push(...res.data.rows)
          this.page++
          if (this.page > res.data.totalPage) {
            this.finished = true
          }
        } else {
          this.error = true
        }
        this.loading = false
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },

    async getGoodsList() {
      try {
        const goodstype = this.tabIndex === 4 ? 1 : 2 // 服务商品1，交易商品2

        const res = await this.$axios.post(shopApi.saveList, {
          type: 'COLLECT', //	string非必须收藏 COLLECT 分享 SHARE
          goodsType: goodstype, // 服务商品1，交易商品2
        })

        if (res.code === 200) {
          this.list.push(...res.data.records)
          this.page++
          if (this.page > res.data.totalPage || !res.data.totalPage) {
            this.finished = true
          }
        } else {
          this.error = true
          // this.$xToast.error(res.message || '请求错误')
        }
        this.loading = false
      } catch (err) {
        this.error = true
        this.loading = false
        // this.$xToast.error(err.message || '操作失败')
      }
    },
    // 切换选择状态
    ChangeSelectedGoodsState() {
      this.selectGoodsState = !this.selectGoodsState
      this.selectDelGoods = []
      this.checkedAllState = false // 全选状态
    },
    delGoods(item) {
      this.selectDelGoods = [item.id]
      this.delGoodsList()
    },
    async delGoodsList() {
      console.log('delGoodsList')
      try {
        const data = this.selectDelGoods || []
        this.loading = true
        const res = await this.$axios.post(shopApi.batch_dlt_goods, data)

        this.loading = false

        if (res.code === 200) {
          this.init()
          this.onLoad()
          this.$xToast.success('取消成功')
        } else {
          this.$xToast.error(res.message || '取消失败')
        }
      } catch (err) {
        console.log(err)
        this.$xToast.error(err.message || '操作失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.rightBtn {
  padding: 0 32px;
}

.collection_container {
  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  // padding-bottom: 160px;
  background-color: #f8f8f8;

  .sp-tabs {
    width: 100%;
    height: 88px;
    background-color: #ffffff;
  }

  ::v-deep .sp-tabs__line {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    bottom: 32px;
  }

  .list_container {
    // padding-bottom: 120px;
    .item {
      background: #ffffff;
      padding: 24px 32px 28px;
      margin-bottom: 20px;
      word-break: break-all;
      .title {
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 36px;
        font-weight: 500;
        color: #1a1a1a;
        line-height: 48px;
        margin-bottom: 16px;
      }
      .user {
        display: flex;
        align-items: center;
        color: #555555;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        margin-bottom: 12px;
        .user_avatar {
          width: 40px;
          height: 40px;
          margin-right: 12px;
        }
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
          margin-right: 48px;
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

  .goods-list {
    margin: 24px 0px 0px;

    .goods-list-checkbox {
      padding-right: 20px;
      padding-left: 5px;
      margin-left: -5px;
    }
  }
}
.footer-nav-relative {
  height: 135px;
}
.footer-nav {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  background: #ffffff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  font-size: 28px;
  min-width: 0%;

  .footer_container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 40px;

    // .checkedAllState {
    //   height: 80px;
    // }
    ::v-deep .sp-checkbox__label {
      font-family: PingFangSC-Medium, PingFang SC;
      font-size: 28px;
      line-height: 40px;
      height: 40px;
      color: #222222;
      letter-spacing: 0;
    }
  }
}
::v-deep .sp-checkbox__icon {
  height: auto;
  line-height: normal;
  font-size: 0;
}
::v-deep.sp-hairline--surround::after {
  border-radius: 30px !important;
}
</style>
