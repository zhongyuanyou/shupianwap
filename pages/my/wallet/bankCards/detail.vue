<template>
  <div class="bank">
    <Header title="银行卡详情" />
    <div class="bank-list">
      <ul>
        <li
          style="
            background-image: linear-gradient(90deg, #14bdbb 0%, #0bb3b3 100%);
          "
        >
          <div class="left-logo">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/dn89dmn1ulc0000.png"
            />
          </div>
          <div class="right-info">
            <h3>{{ cardDetailInfo.bankName }}</h3>
            <p>{{ cardDetailInfo.bankName }}</p>
            <div class="card-num">
              {{ cardDetailInfo.desensitizationCardNumber }}
              <!-- <span>****</span><span>****</span><span>****</span
              ><span>3253</span> -->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer-btn">
      <button @click="$router.push('/my/wallet/bankCards/setPwd')">解绑</button>
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
      const res = await this.$axios.post(walletApi.cardDetail, {
        code: this.$route.query.code,
        name: this.$route.query.name,
        isOnlyBank: 0, // 0表示只查银行1表示查分行不传查所有
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
        .left-logo {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: #000;
          overflow: hidden;
          display: flex;
          img {
            width: 60px;
            height: 60px;
            border: none;
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
