<template>
  <div class="spScoreDetail">
    <div
      v-if="!this.$route.query.isApplets"
      :class="floatview ? 'head' : 'headWhite'"
    >
      <Header title="薯片分">
        <template #left>
          <sp-icon
            class-prefix="spiconfont"
            name="nav_ic_back"
            size="0.4rem"
            :color="floatview ? '#fff' : '#000'"
            style="margin-left: 0.32rem"
            @click.native="onClickLeft"
          />
          <!-- <sp-icon
                        class-prefix="spiconfont"
                        name="guanbi"
                        size="0.4rem"
                        :color="floatview?'#fff':'#000'"
                        style="margin-left: 0.36rem"
                        @click.native="onClickLeft"
                    /> -->
        </template>
        <!-- <template #right>
                    <sp-icon
                        class-prefix="spiconfont"
                        class="head__icon-share"
                        name="fenxiang"
                        size="0.4rem"
                        :color="floatview?'#fff':'#000'"
                        style="margin-right: 0.4rem"
                        @click.native="onClickRight"
                    />
                </template> -->
      </Header>
    </div>
    <div class="bgImg"></div>
    <div class="body">
      <div class="title">
        <p>{{ urlData.score || '--' }}</p>
        <span>超过<i>90%</i>规划师</span>
      </div>
      <div class="echart">
        <div id="main"></div>
        <p class="score-toast">
          <i class="spiconfont spiconfont-tixing"></i>
          <span>各项指标对比同行</span>
        </p>
      </div>
      <div class="instructions">
        <p>薯片分说明</p>
        <p>薯片分是对规划师的综合衡量，薯片分越高综合表现越好。</p>
      </div>
      <div class="indicators">
        <p>指标说明</p>
        <ul>
          <li>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/7cplhsqg1q00000.png"
              alt=""
            />
            <div>
              <p>平台合作</p>
              <p>这是合作描述,文字20个字以内，简洁说明</p>
            </div>
          </li>
          <li>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/222y62jq9lk0000.png"
              alt=""
            />
            <div>
              <p>平台合作</p>
              <p>这是合作描述,文字20个字以内，简洁说明</p>
            </div>
          </li>
          <li>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/9aminwo3dw40000.png"
              alt=""
            />
            <div>
              <p>平台合作</p>
              <p>这是合作描述,文字20个字以内，简洁说明</p>
            </div>
          </li>
          <li>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/ftslpczzdxc0000.png"
              alt=""
            />
            <div>
              <p>平台合作</p>
              <p>这是合作描述,文字20个字以内，简洁说明</p>
            </div>
          </li>
          <li>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/8g8haqpyceg0000.png"
              alt=""
            />
            <div>
              <p>平台合作</p>
              <p>这是合作描述,文字20个字以内，简洁说明</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { mapState, mapMutations, mapActions } from 'vuex'
import { Bottombar, BottombarButton, Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
export default {
  components: {
    [Icon.name]: Icon,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    Header,
  },
  data() {
    return {
      floatview: true,
      EchartOptions: {
        textStyle: {
          fontSize: '15px',
          color: '#222222',
          fontWeight: 'bold',
        },
        radar: {
          indicator: [
            { name: '基础素质', max: 100 },
            { name: '行业影响', max: 100 },
            { name: '平台参与度', max: 100 },
            { name: '质量评价', max: 100 },
            { name: '平台合作', max: 100 },
          ],
          center: ['50%', '50%'],
          splitNumber: 1,
          radius: 60,
          // splitArea: {
          //     areaStyle: {
          //         color: ['rgba(114, 172, 209, 0.1)',
          //             'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)',
          //             'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)'
          //         ],
          //         shadowColor: 'aqua', // 圆颜色
          //         shadowBlur: 10
          //     }
          // },

          axisLine: {
            lineStyle: {
              color: 'rgba(73, 116, 245, 0.2)',
              type: 'dashed',
            },
          },
          // splitLine: {
          //     lineStyle: {
          //         // color: 'rgba(148, 173, 247, 0)',
          //     }
          // }
        },
        series: [
          {
            name: '薯片分',
            type: 'radar',
            symbol: 'circle',
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: '#fff',
                borderColor: 'rgba(73, 116, 245, 1)',
                borderWidth: 0.3,
                lineStyle: {
                  width: 1,
                  color: 'rgba(73, 116, 245, 1)',
                },
              },
            },
            data: [
              {
                value: [50, 60, 70, 80, 90, 100],
                name: '薯片分',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.9, 0.7, 0.6, [
                    {
                      color: 'rgba(73, 116, 245, 1)',
                      offset: 0,
                    },
                    {
                      color: 'rgba(117, 151, 255, 1)',
                      offset: 1,
                    },
                  ]),
                  // color: ['rgba(73, 116, 245, 1)', 'rgba(117, 151, 255, 1)'],
                },
                lineStyle: {
                  width: 1,
                  type: 'solid',
                },
                label: {
                  position: 'top',
                },
              },
            ],
          },
        ],
      },
      urlData: this.$route.query,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      userInfo: (state) => state.user.userInfo,
      isApplets: (state) => state.app.isApplets,
    }),
  },
  created() {
    if (process && process.client) {
      // notice:
      // store中的用户信息默认来自cookie，会从cookie中获取；因为在wap中， userInfo中的token与userId等 保存在cookie中，
      // 但是在app中登录等，登录信息cookie中的没有更新，导致直接从store中获取到的信息无效
      // 所以在app中进入此页面，先清除userInfo,获取最新的userInfo
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)

    if (this.isInApp) {
      this.$appFn.dggChangeTopColor(
        {
          flags: 'light',
        },
        (res) => {
          console.log('DGGSetColorRes', res)
        }
      )
    }
    setTimeout(() => {
      this.EchartInit()
    }, 1000)
    // this.$nextTick(() => {
    //   this.EchartInit()
    // })
  },

  methods: {
    EchartInit() {
      // 接下来的使用就跟之前一样，初始化图表，设置配置项
      const main = document.getElementById('main')
      const myChart = this.$echarts.init(main)
      myChart.setOption(this.EchartOptions)
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop // 滚动条偏移量
      if (scrollTop > 180) {
        this.floatview = false
      } else {
        this.floatview = true
      }
    },
    onClickLeft() {
      this.$router.back(-1)
    },
  },
  head() {
    return {
      title: '薯片分',
      meta: [
        {
          name: 'spptmd-track_code',
          content: this.isInApp ? 'SPP000019' : 'SPW000019',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.spScoreDetail {
  background: #f8f8f8;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  .head {
    ::v-deep .my-head {
      background: url('https://cdn.shupian.cn/sp-pt/wap/images/5wdaynyoovs0000.png')
        no-repeat;
      color: #fff;
      .title {
        color: #fff;
      }
    }
  }
  .headWhite {
    ::v-deep .my-head {
      background: #fff;
      color: #000;
      .title {
        color: #000;
      }
    }
  }
  .bgImg {
    position: relative;
    width: 100%;
    height: 621px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/images/5wdaynyoovs0000.png')
      no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }
  .body {
    position: relative;
    margin: -560px 0 0 0;
    padding: 0 20px 20px;
    z-index: 2;
    > div {
      margin: 0 0 20px 0;
    }
    .title {
      margin: 0 0 66px 0;
      text-align: center;
      i {
        font-style: normal;
        font-family: Bebas;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 1px;
        line-height: 34px;
      }
      p {
        font-family: Bebas;
        font-size: 74px;
        color: #ffffff;
        letter-spacing: 2px;
        line-height: 80px;
        text-shadow: 0 2px 12px rgba(35, 76, 202, 0.4);
      }
      span {
        position: relative;
        display: inline-block;
        width: 320px;
        height: 65px;
        line-height: 65px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 1px;
        &::before {
          content: '';
          width: 0;
          height: 0;
          border: 10px solid;
          position: absolute;
          top: -20px;
          left: 140px;
          border-color: transparent transparent rgba(255, 255, 255, 0.2)
            transparent;
        }
      }
    }
    .echart {
      position: relative;
      width: 100%;
      height: 500px;
      background: #ffffff;
      border-radius: 24px;
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
      line-height: 22px;
      #main {
        position: absolute;
        top: 30px;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 410px;
      }
      p {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 50px;
        margin: 0 auto;
        i {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
    }
    .instructions {
      width: 100%;
      padding: 32px;
      background: #ffffff;
      border-radius: 24px;
      font-family: PingFangSC-Regular;
      font-size: 22px;
      p {
        &:first-of-type {
          margin: 0 0 18px 0;
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #222222;
          line-height: 32px;
          font-weight: bold;
        }
        &:last-of-type {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #555555;
          letter-spacing: 0;
          line-height: 40px;
        }
      }
    }
    .indicators {
      width: 100%;
      padding: 32px;
      background: #ffffff;
      border-radius: 24px;
      font-family: PingFangSC-Regular;
      font-size: 22px;
      > p {
        margin: 0 0 12px 0;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #222222;
        line-height: 32px;
        font-weight: bold;
      }
      ul {
        li {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 24px 0;
          border-bottom: 1px solid #f4f4f4;
          img {
            width: 80px;
            height: 80px;
            margin: 0 32px 0 0;
            background: #f2f5ff;
            border-radius: 8px;
          }
          p {
            &:first-of-type {
              margin: 0 0 6px 0;
              font-family: PingFangSC-Medium;
              font-weight: bold;
              font-size: 30px;
              color: #222222;
              line-height: 38px;
            }
            &:last-of-type {
              font-family: PingFangSC-Regular;
              font-size: 24px;
              color: #999999;
              letter-spacing: 0;
              line-height: 36px;
            }
          }
        }
      }
    }
  }
}
</style>
