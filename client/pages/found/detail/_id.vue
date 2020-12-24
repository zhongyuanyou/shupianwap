<template>
  <div class="detail">
    <!--S 导航-->
    <sp-top-nav-bar
      v-if="!isInApp"
      ellipsis
      :fixed="true"
      @on-click-right="onClickRight"
    >
      <template #left>
        <div @click="back">
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
        </div>
      </template>

      <template #right>
        <div>
          <my-icon name="nav_ic_share" size="0.35rem" />
        </div>
      </template>
    </sp-top-nav-bar>
    <!--E 导航-->
    <div
      class="detail_con"
      :style="{ paddingTop: isInApp ? '0.64rem' : '1.52rem' }"
    >
      <div class="detail_con_title">
        {{ info.title }}
      </div>
      <!--S 账号信息-->
      <div class="detail_con_info">
        <div class="detail_con_info_logo_con">
          <sp-image
            round
            width="0.88rem"
            height="0.88rem"
            fit="cover"
            class="detail_con_info_logo_con_logo"
            src="https://img.yzcdn.cn/vant/apple-1.jpg"
          />
        </div>
        <div class="detail_con_info_content">
          <p class="title">{{ info.updaterName }}</p>
          <p class="time">{{ info.updateTime }}</p>
        </div>
      </div>
      <!--E 账号信息-->
      <!--S 模拟显示富文本内容 后期需用V-HTML显示富文本内容-->
      <div class="fwb" v-html="info.content"></div>
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
          <div class="hot">
            热度<span>{{ info.newsReadAll || 0 }}</span>
          </div>
        </div>
      </div>
      <!--E 版本信息-->
      <sp-share-sheet
        v-model="showShare"
        :options="options"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script>
import { TopNavBar, Icon, Image, ShareSheet } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { foundApi } from '~/api'
export default {
  name: 'Detail',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [ShareSheet.name]: ShareSheet,
  },
  data() {
    return {
      info: {
        title: '',
        updaterName: '',
        updateTime: '',
        content: '',
      }, // 资讯详情
      showShare: false, // 显示分享面板
      options: [
        {
          name: '链接',
          icon: 'link',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    this.getInfoDetail()
  },
  methods: {
    back() {
      // 返回上一页
      this.$router.back()
    },
    async getInfoDetail() {
      // 获取资讯详情
      try {
        const params = {
          id: this.$route.params.id,
        }
        const res = await this.$axios.get(foundApi.infoDetail, { params })
        if (res.code === 200) {
          this.info = res.data
        }
      } catch (err) {}
    },
    onClickRight() {
      this.showShare = true
    },
    handleSelect(option, index) {
      // 点击分享
      if (option.name === '链接') {
        console.log('index', option)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  &_con {
    padding: 0 40px 128px 40px;
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
        }
        .time {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
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
        justify-content: flex-end;
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
