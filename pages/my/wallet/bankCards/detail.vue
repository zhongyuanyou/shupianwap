<template>
  <div class="bank">
    <Header title="银行卡详情" />
    <div class="bank-list">
      <ul>
        <li v-if="cardDetailInfo.id" style="background: #3777e5">
          <div class="left-logo">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/dn89dmn1ulc0000.png"
            />
          </div>
          <div class="right-info">
            <h3>{{ cardDetailInfo.bankName }}</h3>
            <p>{{ cardDetailInfo.openingBankName }}</p>
            <div class="card-num">
              {{ cardDetailInfo.desensitizationCardNumber }}
              <!-- <span>****</span><span>****</span><span>****</span
              >--><span>****</span>
            </div>
          </div>
          <div class="bg-img">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/3y7sfofboeq0000.png"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="footer-btn">
      <button
        @click="
          $router.push(`/my/wallet/bankCards/setPwd?id=${cardDetailInfo.id}`)
        "
      >
        解绑
      </button>
    </div>
  </div>
</template>

<script>
import { walletApi } from '@/api'
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
  },
  data() {
    return {
      cardDetailInfo: '',
      // bankCardStyle: [
      //   {
      //     icon: 'https://cdn.shupian.cn/sp-pt/wap/images/2k0jjobfx4c0000.png',
      //     bg_icon:
      //       'https://cdn.shupian.cn/sp-pt/wap/images/chze1ksovcg0000.png',
      //     bg_color: '#0BB3B3',
      //   },
      //   {
      //     icon: 'https://cdn.shupian.cn/sp-pt/wap/images/byc0c33glcw0000.png',
      //     bg_icon: 'https://cdn.shupian.cn/sp-pt/wap/images/rlbycqvjsb4000.png',
      //     bg_color: '#E63B47',
      //   },
      //   {
      //     icon: 'https://cdn.shupian.cn/sp-pt/wap/images/3p91fh7h6t60000.png',
      //     bg_icon:
      //       'https://cdn.shupian.cn/sp-pt/wap/images/bnivu4nkbm80000.png',
      //     bg_color: '#3777E5',
      //   },
      //   {
      //     icon: 'https://cdn.shupian.cn/sp-pt/wap/images/aexk52ox6sw0000.png',
      //     bg_icon:
      //       'https://cdn.shupian.cn/sp-pt/wap/images/e5m4yxb0se00000.png',
      //     bg_color: '#28A264',
      //   },
      //   {
      //     icon: 'https://cdn.shupian.cn/sp-pt/wap/images/dn89dmn1ulc0000.png',
      //     bg_icon:
      //       'https://cdn.shupian.cn/sp-pt/wap/images/3y7sfofboeq0000.png',
      //     bg_color: '#3777E5',
      //   },
      // ],
    }
  },
  created() {
    this.bankCardsDetail()
  },
  methods: {
    async bankCardsDetail() {
      const res = await this.$axios.get(walletApi.cardDetails, {
        params: {
          id: this.$route.query.id,
        },
      })
      console.log(res)
      if (res.code === 200) {
        this.cardDetailInfo = res.data
      }
    },
  },
}
</script>

<style lang="less" scoped>
.bank {
  min-height: 100vh;
  background: #fff;
  width: 100%;
  .bank-list {
    padding: 0 40px;
    border-top: 1px solid #f8f8f8;
    padding-bottom: 200px;

    ul {
      margin-top: 8px;
      li {
        display: flex;
        padding: 44px 32px;
        align-items: center;
        margin-top: 32px;
        border-radius: 8px;
        position: relative;
        .bg-img {
          position: absolute;
          width: 190px;
          height: 150px;
          right: 16px;
          bottom: 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .left-logo {
          display: inline-block;
          width: 60px;
          height: 60px;
          overflow: hidden;
          display: flex;
          align-items: center;
          text-align: center;
          border-radius: 60px;
          justify-content: center;
          background: #fff;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .right-info {
          margin-left: 24px;
          color: #fff;
          h3 {
            color: #fff;
            line-height: 44px;
            font-size: 32px;
          }
          p {
            line-height: 30px;
            font-size: 22px;
            margin-top: 6px;
            color: rgba(255, 255, 255, 0.8);
          }
          .card-num {
            font-size: 30px;
            line-height: 30px;
            margin-top: 25px;
            display: flex;
            align-items: center;
            font-weight: bold;
            span {
              margin-right: 24px;
              position: relative;
              top: 3px;
              color: rgba(255, 255, 255, 0.8);
              &:last-child {
                top: -3px;
                color: rgba(255, 255, 255) !important;
              }
            }
          }
        }
      }
    }
  }
  .footer-btn {
    height: 160px;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    background: #fff;
    padding: 0 32px;
    left: 0;
    button {
      display: block;
      height: 96px;
      width: 100%;
      background: #4974f5;
      color: #fff;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      border-radius: 8px;
    }
  }
}
</style>
