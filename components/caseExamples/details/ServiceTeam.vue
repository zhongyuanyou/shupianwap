<template>
  <div class="container">
    <p class="planners_title">服务团队</p>
    <div class="planners">
      <sp-skeleton :row="3" :loading="caseMember.length == 0">
        <!-- v-if="planner.mchUserId" -->
        <div class="planners_item" :style="{ marginTop: '0.42rem' }">
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
                  <p class="name">{{ planner.userName }}</p>
                </a>

                <i class="gold_icon"> 金牌规划师 </i>
              </div>
              <div class="info_bot">
                <span class="num">{{ planner.point }}</span
                ><span class="txt"
                  >薯片分 |
                  {{ planner.baseData && planner.baseData.peopleServed }}
                  服务次数</span
                >
              </div>
            </div>
          </div>

          <div class="planners_item_rt">
            <sp-button
              round
              class="contact-btn"
              @click="sendTemplateMsgWithImg(planner.mchBaseId, planner.type)"
              ><my-icon
                class=""
                name="notify_ic_chat"
                size="0.424rem"
                color="#4974F5"
            /></sp-button>
            <sp-button
              round
              class="contact-btn"
              @click="handleTel(planner.mchBaseId)"
              ><my-icon
                class=""
                name="notify_ic_tel"
                size="0.423rem"
                color="#4974F5"
            /></sp-button>
          </div>
        </div>
        <!-- v-if="teamMmembers.length > 0" -->
        <div class="team_list">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in teamMmembers" :key="item.userCenterId">
              <div class="team_list_item">
                <div>
                  <sp-image
                    width="0.85rem"
                    height="0.85rem"
                    round
                    fit="cover"
                    lazy-load
                    :src="
                      item.portrait
                        ? `${item.portrait}?x-oss-process=image/resize,m_fill,w_80,h_80,limit_0`
                        : defaultImg
                    "
                  />
                </div>
                <div class="team_list_name">
                  {{ item.name }}
                </div>
              </div>
            </swiper-slide>
            <div slot="pagination" class="swiper-pagination"></div>
          </swiper>
        </div>
      </sp-skeleton>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
// import 'swiper/css/swiper.css'

import { Image, Button, Toast, Skeleton } from '@chipspc/vant-dgg'
import { planner } from '~/api'
import imHandle from '~/mixins/imHandle'

export default {
  name: 'TcPlanners',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
    Swiper,
    SwiperSlide,
  },
  mixins: [imHandle],
  props: {
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
      defaultImg:
        'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg?x-oss-process=image/resize,m_fill,w_80,h_80,limit_0',
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
    // planner() {
    //   const planner = this.handelData('STAFF_MEMBER_SIGN')
    //   return planner?.value || {}
    // },
    // teamMmembers() {
    //   const mmembers = this.handelData('STAFF_MEMBER_DIGESTION')
    //   return mmembers?.value || []
    // },
  },
  methods: {
    // handelData(key) {
    //   const info = this.caseMember.find((item) => {
    //     return item.type === key
    //   })
    //   return info
    // },

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
    // 规划师拨号
    async handleTel(mchUserId) {
      // 规划师拨号需要先登录
      try {
        const isLogin = await this.judgeLoginMixin()
        if (isLogin) {
          const telData = await planner.newtel({
            areaCode: this.city.code,
            areaName: this.city.name,
            customerUserId: this.$store.state.user.userId,
            plannerId: mchUserId,
            customerPhone: this.$cookies.get('mainAccountFull', { path: '/' }),
            requireCode:
              this.sellingDetail.classCodeLevel &&
              this.sellingDetail.classCodeLevel.split(',')[0],
            requireName: '',
            // id: mchUserId,
            // sensitiveInfoType: 'MCH_USER',
          })
          // 解密电话
          if (telData.status === 1) {
            const tel = telData.phone
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
        } else {
          Toast({
            message: '请先登录账号',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
        }
      } catch (err) {
        console.log(err)
        Toast({
          message: '未获取到划师联系方式',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
    },
    // 调起IM
    // 发送模板消息(带图片)
    sendTemplateMsgWithImg(mchUserId, type) {
      // const isLogin = await this.judgeLoginMixin()
      // if (isLogin) {
      // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
      // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
      // 意向业务
      const intentionType = {}
      intentionType[this.sellingDetail.classCode] =
        this.sellingDetail.classCodeName
      // 意向城市
      const intentionCity = {}
      intentionCity[this.city.code] = this.city.name
      const sessionParams = {
        requireCode:
          this.sellingDetail.classCodeLevel &&
          this.sellingDetail.classCodeLevel.split(',')[0],
        requireName: '',
        imUserId: mchUserId, // 商户用户ID
        imUserType: type, // 用户类型
        ext: {
          intentionType, // 意向业务 非必传
          intentionCity, // 意向城市 非必传
          recommendId: '',
          recommendAttrJson: {},
          startUserType: 'cps-app', //
        },
      }
      let imageUrl = ''
      if (this.sellingDetail.salesGoodsOperatings) {
        if (
          this.sellingDetail.salesGoodsOperatings.clientDetails &&
          this.sellingDetail.salesGoodsOperatings.clientDetails.length > 0
        ) {
          if (
            this.sellingDetail.salesGoodsOperatings.clientDetails[0]
              .imgFileIdPaths &&
            this.sellingDetail.salesGoodsOperatings.clientDetails[0]
              .imgFileIdPaths.length > 0
          ) {
            imageUrl =
              this.sellingDetail.salesGoodsOperatings.clientDetails[0]
                .imgFileIdPaths[0]
          }
        }
      }
      const msgParams = {
        sendType: 0, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        msgType: 'im_tmplate', // 消息类型
        extContent: this.$route.query, // 路由参数
        productName: this.sellingDetail.name, // 产品名称
        productContent:
          this.sellingDetail.salesGoodsOperatings &&
          this.sellingDetail.salesGoodsOperatings.productDescribe, // 产品信息
        price: this.sellingDetail.salesPrice, // 价格
        forwardAbstract:
          this.sellingDetail.salesGoodsOperatings &&
          this.sellingDetail.salesGoodsOperatings.productDescribe, // 摘要信息，可与显示内容保持一致
        routerId: 'IMRouter_APP_ProductDetail_Service', // 路由ID
        imageUrl, // 产品图片
        unit:
          this.sellingDetail.salesPrice &&
          this.sellingDetail.salesPrice.split('.')[1], // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      this.sendTemplateMsgMixin({ sessionParams, msgParams })
      // } else {
      //   this.$router.push('/login')
      // }
    },
  },
}
</script>

<style lang="less" scoped>
.team_list {
  margin-top: 50px;
  // height: 184px;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 0 14px;
  font-size: 0;

  .swiper-slide {
    width: 115px;
  }

  .team_list_item {
    // display: inline-block;
    // width: 115px;
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

.container {
  background-color: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 44px 0 0px;
}
.planners {
  padding: 0 40px 64px 40px;
  /*border-bottom: 1px solid #f4f4f4;*/
  ::v-deep.sp-skeleton {
    margin-top: 48px;
  }
  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: cover;
    vertical-align: middle;
  }
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
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    padding: 0 40px;
  }
  &_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_lf {
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
</style>
