<template>
  <div class="m-evaluate detail">
    <Header title="评价详情" :fixed="true" />
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
          <div class="name-time">2020/09/19 14:00</div>
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
            {{
              starLevel === 1
                ? '非常差'
                : starLevel === 2
                ? '差'
                : starLevel === 3
                ? '一般'
                : starLevel === 4
                ? '满意'
                : starLevel === 5
                ? '超赞'
                : ''
            }}
          </div>
        </div>
        <div class="score-sub">
          <span v-for="(item, index) in evaluateDimensionList" :key="index"
            >{{ item.name }}:{{
              item.fraction === '2'
                ? '1星'
                : item.fraction === '4'
                ? '2星'
                : item.fraction === '6'
                ? '3星'
                : item.fraction === '8'
                ? '4星'
                : item.fraction === '10'
                ? '5星'
                : ''
            }}</span
          >
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <div class="content">
      {{ evaluateContent }}
    </div>
    <div class="tips">
      <my-icon
        class="tips-icon"
        name="biaoqian"
        size="0.24rem"
        color="#999999"
      ></my-icon>
      <div class="tips-desc">
        <span v-for="(item, index) in evaluateTagList" :key="index">{{
          item.name
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { evaluateApi } from '@/api'
// mock data
const avatar = 'https://dchipscommon.dgg188.cn/img/bg.1e53fbc6.png'
const name = '吴月茹'

export default {
  name: 'EvaluateDetail',
  components: {
    Header,
    [Image.name]: Image,
  },
  data() {
    return {
      avatar,
      avatarSize: '0.8rem',
      name,
      starLevel: 1, // 星级
      stars: [
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
        { flag: false },
      ], // flag 图标是否点亮
      evaluateContent: '',
      evaluateTagList: [],
      evaluateDimensionList: [],
      serverScore: 0, // 服务分
      Field: {
        type: 'functional',
        title: '温馨提示',
        description: '差一点就评价完了，是否确认退出？',
        confirmButtonText: '继续评价',
        cancelButtonText: '操作',
      },
    }
  },
  mounted() {
    this.init()
    this.setStars()
  },
  methods: {
    async init() {
      const params = {
        infoId: this.$route.query.infoId,
        // userId: this.$route.query.userId,
        // planerId: this.$route.query.planerId,
      }
      const res = await this.$axios.get(evaluateApi.detail, { params })
      if (res.code === 200) {
        console.log(res)
        this.evaluateContent = res.data.evaluateContent
        this.evaluateTagList = res.data.evaluateTagList
        this.evaluateDimensionList = res.data.evaluateDimensionList
        // const serverScore = res.data.serverScore
      }
    },
    setStars() {
      // 构建星级
      const _this = this
      this.stars.forEach((item, index) => {
        if (_this.starLevel > index) {
          item.flag = true
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
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
        .mixin-flex();
        align-items: center;
        margin-bottom: 24px;
        &-name {
          font: bold 34px @fontf-pfsc-med;
          color: #1a1a1a;
          margin-right: 262px;
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
    .mixin-flex();
    align-items: center;
    margin-left: 40px;
    &-icon {
      margin-right: 12px;
    }
    &-desc {
      font: 400 24px/24px @fontf-pfsc-reg;
      color: #999999;
    }
  }
}
</style>
