<template>
  <div class="invoice" :style="{ paddingBottom: FooterNavHeight + 'px' }">
    <HeaderSlot>
      <Header class="my-header" title="购买确认"></Header>
    </HeaderSlot>
    <div v-show="cardInfo.id" class="details">
      <div class="coupon_list">
        <ActCard
          :item="cardInfo"
          :show-buybutton="false"
          :show-progress="false"
          :coupon-type="0"
        ></ActCard>
      </div>
      <div class="details_content">
        <div class="price">{{ cardInfo.price }}元</div>

        <div class="list">
          <div class="list_name">活动卡</div>
          <div class="list_des">{{ cardInfo.cardName }}</div>
        </div>
        <div class="list">
          <div class="list_name">可使用次数</div>
          <div class="list_des">{{ cardInfo.availableTimes }}次</div>
        </div>
        <div class="list">
          <div class="list_name">有效期限</div>
          <div class="list_des">
            <span v-if="cardInfo.validateType == 1">
              {{ cardInfo.validateDate }}天
            </span>
            <span v-if="cardInfo.validateType == 2">
              {{ formatTime(cardInfo.validateDateStart) }}-{{
                formatTime(cardInfo.validateDateEnd)
              }}
            </span>
          </div>
        </div>

        <div class="list">
          <div class="list_name">使用限制</div>
          <div class="list_des">{{ getuseTypeName(cardInfo.useLimit) }}</div>
        </div>
        <div class="list">
          <div class="list_name">其他说明</div>
          <div class="list_des">
            {{ cardInfo.remark }}
          </div>
        </div>
      </div>
    </div>

    <sp-bottombar
      v-show="cardInfo.id"
      ref="FooterNav"
      safe-area-inset-bottom
      class="submit_btns"
    >
      <sp-bottombar-button type="primary" text="" @click="submit">
        <span class="text">立即购买：</span>
        <span class="price">{{ cardInfo.price }}</span>
        <span class="unit">元</span>
      </sp-bottombar-button>
    </sp-bottombar>

    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import {
  Button,
  Toast,
  TopNavBar,
  Bottombar,
  BottombarButton,
  Empty,
  List,
  Dialog,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import HeaderSlot from '@/components/common/head/HeaderSlot.vue'
import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import ActCard from '@/components/my/coupon/ActCard.vue'

import { actCard } from '@/api/index'

export default {
  layout: 'keepAlive',
  name: 'ActCardDetails',
  components: {
    LoadingCenter,
    Header,
    HeaderSlot,

    [Empty.name]: Empty,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Dialog.Component.name]: Dialog.Component,
    [List.name]: List,
    [Button.name]: Button,

    ActCard,
  },
  data() {
    return {
      imgAddress: 'https://cdn.shupian.cn/sp-pt/wap/1d02v37qg6gw000.png',

      loading: true, // 加载效果状态

      page: 1,
      limit: 15,

      TipsShow: false,

      cardInfo: {},

      FooterNavHeight: 150,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      userInfo: (state) => state.user, // 登录的用户信息
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    this.init()
    this.onLoad()

    this.FooterNavHeight = this.$refs.FooterNav.$el.offsetHeight
  },
  methods: {
    formatTime(time) {
      if (time) {
        return time.split(' ')[0]
      }
      return ''
    },
    getuseTypeName(useType) {
      let useTypeName = ''
      switch (useType) {
        // case 1:
        //   useTypeName = '全品类通用'
        //   break
        case 2:
          useTypeName = '仅限指定品类使用'
          break
        case 3:
          useTypeName = '仅限指定商品使用'
      }
      return useTypeName
    },
    toPay(OrderId) {
      this.$router.push({
        path: '/pay/payType',
        query: {
          cusOrderId: OrderId,
          fromPage: 'act_card',
        },
      })
    },

    init() {
      this.page = 1

      this.loading = true
      this.list = []
    },

    onLoad() {
      this.getInitData()
    },
    getInitData() {
      this.finished = false
      const params = {
        id: this.$route.query.id,
      }
      // this.cardInfo = {
      //   id: '8095504656283664384',
      //   cardName: '满减/通用【1】',
      //   price: '12.00',
      //   stock: 5000,
      //   imgUrl: '',
      //   type: 1,
      //   rebateNeedPrice: 100,
      //   rebatePrice: 50,
      //   availableTimes: 12,
      //   validateType: 1,
      //   validateDate: 12,
      //   useLimit: 1,
      //   remark: '满减/通用',
      //   cardCode: 'HDK-MJ-000004',
      //   merchant: {
      //     id: '607997736314102922',
      //     name: '薯片科技',
      //     mchNo: 'MBU2025022',
      //     mchClass: 'MERCHANT_M',
      //   },
      //   createId: '767998085009799913',
      // }
      // this.loading = false
      actCard
        .act_card_detail_one({ axios: this.$axios }, params)
        .then((res) => {
          this.loading = false
          this.cardInfo = res
        })
        .catch((e) => {
          this.loading = false
          console.log(e)
          this.$xToast.error('获取详情失败')
        })
    },
    submit() {
      this.add_order()
    },
    add_order() {
      const params = {
        needSplitProDataParams: [
          {
            skuType: 'PRO_CLASS_TYPE_VIRTUAL', //
            spuId: '8095504656283664384', // 产品id
            spuCode: 'CRISPS-C-MARKETING-CARD', // 产品编号
            spuName: this.cardInfo.cardName, // 产品名称
            skuId: this.cardInfo.id, // 商品id
            skuCode: 'HDK-MJ-000004',
            skuCount: 1,
            skuSettlePrice: parseFloat(this.cardInfo.price) * 100,
            skuVirtualPrice: 0,
            skuDetailInfo: JSON.stringify({
              sku: {
                goodsName: this.cardInfo.cardName,
                remark: this.cardInfo.remark,
              },
              tradeMark: {},
            }),
            classifyOneNo: 'ACTIVITY_CARD',
            classifyOneName: '活动卡',

            orderSplitSubjectId: this.cardInfo.merchant.id, // 拆单主体id
            orderSplitSubjectNo: this.cardInfo.merchant.mchNo,
            orderSplitSubjectName: this.cardInfo.merchant.name,
            orderSplitSubjectSource: this.cardInfo.merchant.mchClass,

            // orderSplitSubjectId: '607997736314102922', // 拆单主体id
            // orderSplitSubjectNo: 'MBU2025022',
            // orderSplitSubjectName: '薯片科技',
            // orderSplitSubjectSource: 'MERCHANT_M',
          },
        ],

        cusOrderModeNo: 'ORDER_CUS_MODE_ADMIN',
        userSubjectUserId: this.userId, // 用户商户用户id(当用户是规划师必传)
        cusOrderTerminalNo: 'COMDIC_TERMINAL_WAP', // 下单终端编号(
        cusOrderPayType: 'PRO_PRE_PAY_POST_SERVICE', // 付款类型：先付款后服务
        payType: 'ORDER_PAY_MODE_ONLINE', // 支付类型：线上支付：
        // cusReceivingInformation: JSON.stringify({
        //   personName: this.userInfo.nickName,
        //   personPhone: '收货人联系方式',
        //   personAddr: '-',
        // }),
      }
      actCard
        .add_order({ axios: this.$axios }, params)
        .then((res) => {
          this.loading = false

          console.log(res)
          this.toPay(res.cusOrderId)

          // cusOrderId: "8100943425602125824"
          // cusOrderNo: "C21070765168"
        })
        .catch((err) => {
          this.$xToast.error(err.message || '操作失败')
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice {
  min-height: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  background-color: #f5f5f5;

  .details {
    margin: 40px auto;
    width: 670px;

    .details_content {
      background: white;
      padding: 32px;
      border-top: 1px solid #f4f4f4;
      .price {
        font-family: PingFangSC-Medium;
        font-size: 48px;
        color: #ec5330;
        line-height: 48px;
      }

      .list {
        margin-top: 32px;
        display: flex;

        font-family: PingFangSC-Regular;
        font-size: 26px;

        letter-spacing: 0;
        line-height: 26px;

        .list_name {
          width: 140px;
          margin-right: 12px;
          color: #999999;
        }
        .list_des {
          flex: 1;
          color: #222222;
          line-height: 37px;
        }
      }
    }
  }
  .submit_btns {
    font-family: PingFangSC;
    color: #ffffff;

    .text {
      font-size: 28px;
    }
    .price {
      font-size: 40px;
      font-weight: bold;
    }
    .unit {
      font-size: 24px;
    }
  }
}
</style>
