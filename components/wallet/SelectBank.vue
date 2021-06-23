<template>
  <div class="content">
    <sp-popup
      v-model="showBankPop"
      closeable
      round
      position="bottom"
      close-icon-position="top-left"
      :style="{ width: '100%', height: '60%' }"
    >
      <div class="title">选择付款方式</div>
      <div class="bank-list">
        <ul class="bank-ul">
          <li
            v-for="(item, index) in cardList"
            :key="index"
            class="bank-li"
            @click="selectCard(item)"
          >
            <div class="bank-logo">
              <img :src="item.bankIconUrl" alt="" />
            </div>
            <p>{{ item.bankName }}({{ item.desensitizationCardNumber }})</p>
            <sp-icon
              v-if="item.id === currentId"
              class-prefix="spiconfont"
              name="gou"
              size="0.30rem"
              color="#4974F5"
            ></sp-icon>
          </li>
          <!-- <li class="bank-li">
            <div class="bank-logo">
              <img src="" alt="" />
            </div>
            <p>工商银行储蓄卡(622****4490)</p>
          </li> -->
        </ul>
        <div class="bank-add" @click="$router.push('/my/wallet/bankCards/add')">
          <sp-icon
            class-prefix="spiconfont"
            name="jia"
            size="0.44rem"
            color="#999"
          ></sp-icon>

          <p>添加银行卡</p>
          <sp-icon
            class-prefix="spiconfont"
            name="you"
            size="0.30rem"
            color="#999"
          ></sp-icon>
        </div>
      </div>
    </sp-popup>
  </div>
</template>
<script>
import { Popup, Icon } from '@chipspc/vant-dgg'
import { walletApi } from '@/api'
export default {
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },
  props: {
    currentId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showBankPop: false,
      cardList: [],
    }
  },
  created() {
    this.getCardList()
  },
  methods: {
    selectCard(item) {
      this.$emit('selectCard', item)
    },
    clickClosePop() {
      this.showBankPop = false
    },
    async getCardList() {
      const res = await this.$axios.get(walletApi.cardList, {
        params: {
          accountId: '1031626164970629476',
        },
      })
      if (res.code === 200) {
        this.cardList = res.data
        console.log(this.cardList)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  ::v-deep.sp-popup__close-icon {
    top: 56px;
  }
  ::v-deep .title {
    font-family: PingFangSC-Medium;
    width: 100%;
    font-size: 40px;
    color: #1a1a1a;
    letter-spacing: 0;
    line-height: 136px;
    text-align: center;
    font-weight: bold;
  }
  ::v-deep .sp-popup {
    .bank-list {
      max-height: 80%;
      overflow-y: auto;
      padding: 0 40px;
      .bank-ul {
        .bank-li {
          display: flex;
          align-items: center;
          height: 112px;
          .spiconfont-gou {
            font-weight: bold;
          }
          .bank-logo {
            display: flex;
            width: 48px;
            height: 48px;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          p {
            width: 552px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            height: 48px;
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #222222;
            margin-left: 20px;
          }
          span {
            margin-left: auto;
          }
        }
      }
      .bank-add {
        display: flex;
        align-items: center;
        height: 112px;
        .spiconfont-you {
          margin-left: auto !important;
        }
        p {
          margin-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #222222;
        }
        .right {
          width: 30px;
          margin-left: auto;
        }
      }
    }
  }
}
</style>
