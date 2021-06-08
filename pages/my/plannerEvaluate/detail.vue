<template>
  <div class="m-evaluate detail">
    <Header v-if="!isInApp" title="评价详情" :fixed="true" />
    <div class="header-line"></div>
    <div class="info">
      <sp-image
        round
        class="img"
        fit="cover"
        :src="avatar"
        :width="avatarSize"
        :height="avatarSize"
      />
      <div class="desc">
        <div class="name">
          <div class="name-name">{{ name }}</div>
          <div class="name-time">{{ evaluateTime }}</div>
        </div>
        <div class="score">
          <div class="score-tile">服务评分</div>
          <template v-for="(item, index) in stars">
            <my-icon
              :key="index"
              class="score-icon"
              name="dafen_mian"
              size="0.22rem"
              :color="item.flag ? '#FFB400' : '#F0F0F0'"
            ></my-icon>
          </template>
          <div class="score-desc">
            {{ starLevel | filterLevel }}
          </div>
        </div>
        <div class="score-sub">
          <span v-for="(item, index) in evaluateDimensionList" :key="index"
            >{{ item.name }}:&nbsp;{{ item.fraction | filterFraction }}</span
          >
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <div class="content">
      {{ evaluateContent }}
    </div>
    <div v-if="evaluateTagFlag" class="tips">
      <my-icon
        class="tips-icon"
        name="biaoqian"
        size="0.24rem"
        color="#999999"
      ></my-icon>
      <div class="tips-desc">
        <p>{{ evaluateTagList }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { evaluateApi } from '@/api'

export default {
  name: 'EvaluateDetail',
  components: {
    Header,
    [Image.name]: Image,
  },
  filters: {
    filterLevel(val) {
      const txts = {
        0: '非常差',
        2: '非常差',
        4: '差',
        6: '一般',
        8: '好',
        10: '非常好',
      }
      return txts[val] || '非常差'
    },
    filterFraction(val) {
      return val ? val / 2 + '星' : '无'
    },
  },
  data() {
    return {
      evaluateTime: '',
      avatar: '',
      avatarSize: '0.8rem',
      name: '规划师',
      starLevel: 1, // 星级
      stars: [
        { flag: false, num: 2 },
        { flag: false, num: 4 },
        { flag: false, num: 6 },
        { flag: false, num: 8 },
        { flag: false, num: 10 },
      ], // flag 图标是否点亮
      evaluateContent: '',
      evaluateTagList: '',
      evaluateDimensionList: [],
      serverScore: 0, // 服务分
      Field: {
        type: 'functional',
        title: '温馨提示',
        description: '差一点就评价完了，是否确认退出？',
        confirmButtonText: '继续评价',
        cancelButtonText: '操作',
      },
      evaluateTagFlag: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      userId: (state) => state.user.userInfo.userId,
    }),
  },
  mounted() {
    this.init()
    if (this.isInApp) {
      this.$appFn.dggSetTitle(
        {
          title: '评价详情',
        },
        (res) => {}
      )
      this.$appFn.dggGetUserInfo((res) => {
        if (res.code === 200 && res.data.userId && res.data.token) {
          this.$store.dispatch('user/setUser', res.data)
        }
      })
    }
    this.name = this.$route.query.plannerName
    if (this.$route.query.plannerId) {
      this.getPlannerInfo()
    } else {
      this.avatar =
        this.$route.query.plannerAvatar ||
        'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
    }
  },
  methods: {
    async init() {
      const params = {
        infoId: this.$route.query.infoId,
        userId: this.$store.state.user.userId,
        planerId: this.$route.query.planerId,
      }
      const res = await this.$axios.get(evaluateApi.detail, { params })
      if (res.code === 200) {
        console.log('res.data.serverScore', res.data.serverScore)
        this.evaluateContent = res.data.evaluateContent
        if (res.data.evaluateTagList.length > 0) {
          this.evaluateTagList = (
            res.data.evaluateTagList.map((item) => {
              return item.name
            }) || []
          ).join(', ')
          this.evaluateTagFlag = true
        }
        this.evaluateDimensionList = res.data.evaluateDimensionList
        if (res.data.serverScore) {
          this.starLevel = res.data.serverScore
          this.setStars()
        }
        this.evaluateTime = res.data.evaluateTime
      } else {
        this.$xToast.show({ message: '获取信息失败' })
      }
    },
    setStars() {
      // 构建星级
      const _this = this
      this.stars.forEach((item) => {
        if (_this.starLevel >= item.num) {
          item.flag = true
        }
      })
    },
    async getPlannerInfo() {
      const params = {
        plannerId: this.$route.query.plannerId,
      }
      const res = await this.$axios.get(evaluateApi.getAvatar, { params })
      if (res.code === 200) {
        this.avatar =
          res.data.img ||
          'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg'
      } else {
        this.$xToast.show({ message: '获取信息失败' })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.m-evaluate.detail {
  .mixin-flex {
    display: flex;
  }
  .header-line {
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
  .info {
    .mixin-flex();
    margin: 41px 0 40px 40px;
    .img {
      margin-right: 24px;
    }
    .desc {
      .name {
        justify-content: space-between;
        margin-right: 0.4rem;
        .mixin-flex();
        align-items: center;
        margin-bottom: 24px;

        &-name {
          font: bold 34px @fontf-pfsc-med;
          color: #1a1a1a;
          .overflow();
          max-width: 280px;
        }
        &-time {
          font: 400 24px @fontf-pfsc-reg;
          color: #999999;
        }
      }
      .score {
        .mixin-flex();
        align-items: center;
        margin-bottom: 24px;
        &-tile {
          font: 400 24px @fontf-pfsc-reg;
          color: #222222;
          margin-right: 16px;
        }
        &-icon {
          margin-right: 8px;
        }
        &-desc {
          margin-left: 8px;
          font: 400 22px @fontf-pfsc-reg;
          color: #555555;
        }
      }
      .score-sub {
        .mixin-flex();
        align-items: center;
        font: 400 24px @fontf-pfsc-reg;
        color: #999999;
        justify-content: space-between;
        span {
          display: inline-block;
          margin-right: 24px;
        }
      }
    }
  }
  .placeholder {
    height: 1px;
    background: #f4f4f4;
    margin: 0 40px;
  }
  .content {
    margin: 40px 40px 32px;
    font: 400 28px/44px @fontf-pfsc-reg;
    color: #222222;
  }
  .tips {
    padding: 0 40px;
    position: relative;
    &-icon {
      position: absolute;
      top: 6px;
    }
    &-desc {
      margin-left: 36px;
      font: 400 24px/40px @fontf-pfsc-reg;
      color: #999999;
    }
  }
}
</style>
