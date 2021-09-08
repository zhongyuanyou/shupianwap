<template>
  <div class="container">
    <p v-if="info.caseType === 'CASE_TYPE_1'" class="planners_title">
      服务团队
    </p>
    <div class="planners">
      <div
        v-if="planner.mchUserId || planner.merchantUserId"
        class="planners_item"
      >
        <div class="planners_item_lf">
          <a
            href="javascript:void(0);"
            @click="plannerInfoUrlJump(planner.mchUserId)"
          >
            <sp-image
              width="0.8rem"
              height="0.8rem"
              round
              fit="cover"
              lazy-load
              :src="
                planner.headUrl
                  ? `${planner.headUrl}?x-oss-process=image/resize,m_fill,w_80,h_80,limit_0`
                  : defaultImg
              "
            />
          </a>
          <div class="info">
            <div class="info_tp">
              <a
                href="javascript:void(0);"
                @click="plannerInfoUrlJump(planner.mchUserId)"
              >
                <p class="name">{{ planner.userName || planner.name }}</p>
              </a>
              <i class="gold_icon">金牌规划师</i>
            </div>
            <div class="info_bot">
              <span class="num">{{ planner.point || 100 }}</span
              ><span class="txt"
                >薯片分 |
                {{ planner.serveNum || 0 }}
                服务次数</span
              >
            </div>
          </div>
        </div>

        <div class="planners_item_rt">
          <!--        @click="sendTemplateMsgWithImg(planner.mchBaseId, planner.type)" -->
          <sp-button
            round
            class="contact-btn"
            @click="sendTextMessage(planner.mchUserId)"
            ><my-icon
              class=""
              name="notify_ic_chat"
              size="0.424rem"
              color="#4974F5"
          /></sp-button>
          <sp-button
            round
            class="contact-btn"
            @click="handleTel(planner.mchUserId, planner.phone)"
            ><my-icon
              class=""
              name="notify_ic_tel"
              size="0.423rem"
              color="#4974F5"
          /></sp-button>
        </div>
      </div>
      <!--  -->
      <div
        v-if="teamMmembers.length > 0 && info.caseType === 'CASE_TYPE_1'"
        class="team_list"
      >
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="item in teamMmembers" :key="item.id">
            <!--  @click="plannerInfoUrlJump(item.id)" -->
            <div class="team_list_item">
              <div>
                <sp-image
                  width="0.85rem"
                  height="0.85rem"
                  round
                  fit="cover"
                  lazy-load
                  :src="
                    item.headUrl
                      ? `${item.headUrl}?x-oss-process=image/resize,m_fill,w_80,h_80,limit_0`
                      : defaultImg
                  "
                />
              </div>
              <div class="team_list_name">
                {{ item.userName || item.name }}
              </div>
            </div>
          </swiper-slide>
          <div slot="pagination" class="swiper-pagination"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// import 'swiper/css/swiper.css'

import { Image, Button, Toast } from '@chipspc/vant-dgg'
import { planner } from '~/api'
import imHandle from '~/mixins/imHandle'
import contractApi from '@/api/contract'

export default {
  name: 'ServiceTeam',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    Swiper,
    SwiperSlide,
  },
  mixins: [imHandle],
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
    caseMember: {
      type: Array,
      default: () => [],
    },
    planner: {
      type: Object,
      default: () => {
        return {}
      },
    },
    teamMmembers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultImg: 'https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png',
      swiperOption: {
        slidesPerView: 'auto',
        // centeredSlides: true,
        spaceBetween: 10,

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
  },
  methods: {
    // 规划师详情跳转
    plannerInfoUrlJump(mchUserId) {
      if (!mchUserId) {
        return
      }
      this.$router.push({
        path: '/planner/detail',
        query: {
          mchUserId,
        },
      })
    },
    // 解密电话
    decryptionPhone(phone) {
      return new Promise((resolve, reject) => {
        if (!phone) {
          console.log('没有电话')
          return resolve('')
        }
        contractApi
          .decryptionPhone({ axios: this.axios }, { phoneList: [phone] })
          .then((res) => {
            console.log(res)
            if (res) {
              return resolve(res)
            }
            resolve('')
          })
          .catch(() => {
            resolve('')
          })
      })
    },

    // 拨打电话
    async handleTel(mchUserId, phone) {
      try {
        const telData = await planner.newtel({
          areaCode: this.city.code,
          areaName: this.city.name,
          customerUserId: this.$store.state.user.userId,
          plannerId: mchUserId,
          customerPhone:
            this.$store.state.user.mainAccountFull ||
            this.$cookies.get('mainAccountFull', { path: '/' }),
          requireCode: '',
          requireName: '',
          // id: mchUserId,
          // sensitiveInfoType: 'MCH_USER',
        })
        // 解密电话
        if (telData.status === 1) {
          const tel = telData.outbound
          window.location.href = `tel://${tel}`
        } else if (telData.status === 0) {
          Toast({
            message: '当前人员已禁用，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
        } else if (telData.status === 3) {
          Toast({
            message: '当前人员已离职，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
        }
      } catch (err) {
        // Toast({
        //   message: '未获取到划师联系方式',
        //   iconPrefix: 'sp-iconfont',
        //   icon: 'popup_ic_fail',
        // })
      }
    },

    // // 规划师拨号
    // async handleTel(phoneFull) {
    //   // 规划师拨号需要先登录
    //   try {
    //     if (!phoneFull) {
    //       return this.$xToast.error('未获取到电话')
    //     }

    //     const isLogin = await this.judgeLoginMixin()
    //     if (isLogin) {
    //       const phone = await this.decryptionPhone(phoneFull)
    //       console.log(phone)
    //       if (phone) {
    //         window.location.href = `tel://${phone}`
    //       }
    //     } else {
    //       Toast({
    //         message: '请先登录账号',
    //         iconPrefix: 'sp-iconfont',
    //         icon: 'popup_ic_fail',
    //       })
    //     }
    //   } catch (err) {
    //     console.log(err)
    //     Toast({
    //       message: '未获取到划师联系方式',
    //       iconPrefix: 'sp-iconfont',
    //       icon: 'popup_ic_fail',
    //     })
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 44px 0 48px;
  .planners_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    padding: 0 40px 42px;
  }
  .planners {
    padding: 0 40px 0;
    overflow: hidden;

    ::v-deep.sp-skeleton {
      margin-top: 48px;
    }
    // .icon {
    //   display: inline-block;
    //   background-repeat: no-repeat;
    //   background-size: cover;
    //   vertical-align: middle;
    // }
    .gold_icon {
      min-width: 146px;
      max-width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height: 34px;
      line-height: 32px;
      border: 1px solid #e0a963;
      margin-left: 12px;
      border-radius: 16px;
      font-size: 20px;
      font-weight: 400;
      color: #e0a963;
      padding-left: 38px;
      padding-right: 7px;
      text-align: center;
      position: relative;
      font-style: normal;
      &::before {
        content: '';
        display: block;
        width: 34px;
        height: 34px;
        background: url(https://cdn.shupian.cn/sp-pt/wap/images/7cwzjbxvkhs0000.png)
          no-repeat;
        background-size: 34px 34px;
        position: absolute;
        left: -1px;
        top: -1px;
      }
    }

    .planners_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      .planners_item_lf {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        a {
          display: flex;
        }
        .info {
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-direction: column;
          margin-left: 24px;
          &_tp {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;
            height: 32px;
            .name {
              max-width: 150px;
              font-size: 32px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              font-weight: bold;
              color: #1a1a1a;
              line-height: 32px;
            }
          }
          &_bot {
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #1a1a1a;
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            flex-direction: row;
            height: 30px;
            line-height: 30px;
            .num {
              font-size: 30px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #ec5330;
            }
            .txt {
              margin-left: 17px;
            }
          }
        }
      }
      &_rt {
        height: 80px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
        ::v-deep .sp-button {
          border: none;
        }
        .contact-btn {
          width: 80px;
          height: 80px;
          background: rgba(235, 243, 255, 0.8);
          margin-right: 40px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .team_list {
    margin-top: 50px;
    // height: 184px;
    background: #f8f8f8;
    border-radius: 12px;
    padding: 0 14px;
    font-size: 0;

    .swiper-slide {
      width: 145px;
    }

    .team_list_item {
      padding: 32px 0px;
      text-align: center;

      .team_list_name {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #222222;
        letter-spacing: 0;
        text-align: center;
        line-height: 25.93px;
        padding-top: 16px;
      }
    }
  }
}
</style>
