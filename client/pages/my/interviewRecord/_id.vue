<template>
  <div class="detail">
    <sp-sticky v-if="!isInApp">
      <sp-top-nav-bar title="面谈确认" ellipsis @on-click-left="back">
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
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
                name="nav_ic_back"
                size="0.26rem"
                color="#1A1A1A"
              ></my-icon>
              <p>规划师</p>
            </div>
            <div class="item__rt">
              <p>{{ info.accompanyName }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item__lf">
              <my-icon
                name="nav_ic_back"
                size="0.26rem"
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
                name="nav_ic_back"
                size="0.26rem"
                color="#1A1A1A"
              ></my-icon>
              <p>面谈地点</p>
            </div>
            <div class="item__rt">
              <p>{{ info.inviteAddress }}</p>
            </div>
          </div>
          <div class="item">
            <div class="item__lf">
              <my-icon
                name="nav_ic_back"
                size="0.26rem"
                color="#1A1A1A"
              ></my-icon>
              <p>陪谈人</p>
            </div>
            <div class="item__rt">
              <p>李规划（20199181)</p>
            </div>
          </div>
        </div>
      </div>
      <sp-button type="primary">确认，已完成面谈</sp-button>
      <sp-button type="primary">已取消面谈</sp-button>
    </div>
    <!--E content-->
    <p class="bot">薯片找人 | 日常五福，尽在薯片！</p>
  </div>
</template>

<script>
import { Sticky, TopNavBar, Button } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { interviewApi } from '~/api'
export default {
  name: 'Detail',
  components: {
    [Sticky.name]: Sticky,
    [TopNavBar.name]: TopNavBar,
    [Button.name]: Button,
  },
  data() {
    return {
      info: {
        inviteAddress: '', // 面谈地址
        accompanyName: '', // 规划师名字
        inviteTime: '', // 面谈时间
        inviteStatus: 0, // 面谈状态
      }, // 面谈详情
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
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
          this.info = res.data
        }
      } catch (err) {}
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  background-color: #fff;
  &-banner {
    width: 100%;
    height: 346px;
    background-color: #f4f4f4;
  }
  &-content {
    padding: 0 40px;
    &__form {
      width: 100%;
      height: 563px;
      background: #ffffff;
      box-shadow: 0 6px 10px 0 rgba(183, 183, 183, 0.1);
      border-radius: 12px;
      margin-top: -131px;
      padding: 64px 0 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      > p {
        font-size: 36px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #222222;
      }
      &__items {
        width: 100%;
        .item {
          width: 100%;
          height: 108px;
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
              .textOverflow(1);
            }
          }
        }
      }
    }
    /deep/ .sp-button--primary {
      width: 100%;
      margin-top: 84px;
      &:last-child {
        margin-top: 40px;
        background-color: rgba(73, 116, 245, 0.1);
        border: 1px solid rgba(73, 116, 245, 0.1);
        color: #4974f5;
      }
    }
  }
  .bot {
    width: 100%;
    text-align: center;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4974f5;
    margin-top: 144px;
  }
}
</style>
