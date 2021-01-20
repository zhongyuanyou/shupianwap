<template>
  <div class="detail">
    <div style="width: 100%">
      <Header v-if="!isInApp" title="面谈确认">
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
      <!--S banner-->
      <div class="detail-banner"></div>
      <!--E banner-->
      <!--S content-->
      <div class="detail-content">
        <div class="detail-content__form">
          <p>请确认以下面谈信息</p>
          <div class="detail-content__form__items">
            <div class="item">
              <div class="item__lf">
                <my-icon
                  name="commodity_ic_tplanner"
                  size="0.26rem"
                  color="#1A1A1A"
                ></my-icon>
                <p>规划师</p>
              </div>
              <div class="item__rt">
                <p>{{ info.inviterName }}</p>
              </div>
            </div>
            <div class="item">
              <div class="item__lf">
                <my-icon
                  name="commodity_ic_ttime"
                  size="0.3rem"
                  color="#1A1A1A"
                ></my-icon>
                <p>面谈时间</p>
              </div>
              <div class="item__rt">
                <p>{{ info.inviteTime }}</p>
              </div>
            </div>
            <div class="item">
              <div class="item__lf">
                <my-icon
                  name="commodity_ic_tmap"
                  size="0.26rem"
                  color="#1A1A1A"
                ></my-icon>
                <p>面谈地点</p>
              </div>
              <div class="item__rt">
                <p>{{ info.inviteAddress }}12312312312312312</p>
              </div>
            </div>
            <div v-if="info.accompanyName" class="item">
              <div class="item__lf">
                <my-icon
                  name="commodity_ic_tman"
                  size="0.3rem"
                  color="#1A1A1A"
                ></my-icon>
                <p>陪谈人</p>
              </div>
              <div class="item__rt">
                <p>{{ info.accompanyName }}</p>
              </div>
            </div>
          </div>
        </div>
        <sp-button
          v-if="info.inviteStatus === 0"
          type="primary"
          @click="handleInterStatus(0)"
          >取消面谈</sp-button
        >
        <div v-if="info.inviteStatus !== 0" class="status">
          {{
            info.inviteStatus === 1
              ? '已面谈'
              : info.inviteStatus === 2
              ? '已评价'
              : '已取消'
          }}
        </div>
      </div>
    </div>
    <!--E content-->
    <div>
      <p class="bot">薯片找人 | 日常五福，尽在薯片！</p>
      <sp-toast ref="spToast"></sp-toast>
      <Loading-center v-show="loading" />
    </div>
  </div>
</template>

<script>
import { Sticky, TopNavBar, Button } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { interviewApi } from '~/api'
import Header from '@/components/common/head/header'
import SpToast from '@/components/common/spToast/SpToast'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  name: 'Detail',
  components: {
    [Sticky.name]: Sticky,
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
    Header,
    SpToast,
    LoadingCenter,
  },
  data() {
    return {
      info: {
        inviteAddress: '', // 面谈地址
        accompanyName: '', // 陪谈人
        inviteTime: '', // 面谈时间
        inviteStatus: 0, // 面谈状态
        inviterName: '', // 规划师
      }, // 面谈详情
      loading: false,
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
      this.$appFn.dggGetUserInfo((res) => {
        if (res.code === 200 && res.data.userId && res.data.token) {
          this.$store.dispatch('user/setUser', res.data)
        }
      })
    }
    this.getInterviewDetail()
  },
  methods: {
    back() {
      // 返回上一页
      this.$router.back()
    },
    async getInterviewDetail() {
      // 获取面谈详情
      try {
        const params = {
          id: this.$route.params.id,
        }
        const res = await this.$axios.get(interviewApi.detail, { params })
        if (res.code === 200) {
          this.info = res.data || this.info
        }
      } catch (err) {}
    },
    async handleInterStatus(val) {
      this.loading = true
      if (this.userId) {
        // 若用户已登录
        try {
          const params = {
            id: this.info.id,
            type: val,
            userId: this.userId,
          }
          const res = await this.$axios.post(interviewApi.cancel, params)
          this.loading = false
          if (res.code === 200) {
            this.getInterviewDetail()
          } else {
            this.$refs.spToast.show({
              message: res.data.error,
              duration: 1000,
              forbidClick: true,
            })
          }
        } catch (err) {}
      } else if (this.isInApp) {
        this.loading = false
        // 如果是在app中
        this.$appFn.dggLogin((res) => {
          try {
            if (res.code === 200) {
              const userInfo = res.data || {}
              if (userInfo && userInfo.userId && userInfo.token) {
                this.$store.dispatch('user/setUser', userInfo)
              }
            }
          } catch (err) {}
        })
      } else {
        this.loading = false
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  .back_icon {
    margin-left: 40px;
  }
  &-banner {
    width: 100%;
    height: 346px;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/bq4tcjzziw80000.jpg');
    background-size: cover;
  }
  &-content {
    width: 100%;
    padding: 0 40px;
    &__form {
      width: 100%;
      background-color: #ffffff;
      box-shadow: 0 6px 10px 0 rgba(183, 183, 183, 0.1);
      border-radius: 12px;
      margin-top: -131px;
      padding: 64px 0 0 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      > p {
        font-size: 36px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #222222;
        width: 100%;
        text-align: center;
      }
      &__items {
        width: 100%;
        padding-left: 40px;
        .item {
          width: 100%;
          padding: 38px 0;
          border-bottom: 1px solid #f4f4f4;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          padding-right: 40px;
          &:last-child {
            border-bottom: none;
          }
          &__lf {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;
            > p {
              font-size: 28px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #1a1a1a;
              margin-left: 19px;
            }
          }
          &__rt {
            max-width: 350px;
            > p {
              font-size: 28px;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: #1a1a1a;
              word-wrap: break-word;
              word-break: normal;
            }
          }
        }
      }
    }
    /deep/ .sp-button--primary {
      width: 100%;
      margin-top: 84px;
      background-color: rgba(73, 116, 245, 0.1);
      border: 1px solid rgba(73, 116, 245, 0.1);
      color: #4974f5;
    }
    .status {
      width: 100%;
      text-align: center;
      margin-top: 84px;
      font-size: 30px;
      color: #666;
    }
  }
  .bot {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4974f5;
    margin-bottom: 48px;
  }
}
</style>
