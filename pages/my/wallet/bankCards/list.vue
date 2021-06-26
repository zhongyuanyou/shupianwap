<template>
  <div class="bank">
    <Header title="银行卡管理" custom-jump="true" @backHandle="backHandle"/>
    <div class="bank-list">
      <ul v-if="cardList.length > 0">
        <li
          v-for="(item, index) in cardList"
          :key="index"
          :style="{ background: '#3777E5' }"
          @click="$router.push(`/my/wallet/bankCards/detail?id=${item.id}`)"
        >
          <div class="left-logo">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/dn89dmn1ulc0000.png"
            />
          </div>
          <div class="right-info">
            <h3>{{ item.bankName }}</h3>
            <p>{{ item.openingBankName }}</p>
            <div class="card-num">
              {{ item.desensitizationCardNumber }}
              <!-- <span>****</span><span>****</span><span>****</span
              ><span>3253</span> -->
            </div>
          </div>
          <div class="bg-img">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/3y7sfofboeq0000.png"
            />
          </div>
        </li>
        <!-- <li
          style="
            background-image: linear-gradient(90deg, #14bdbb 0%, #0bb3b3 100%);
          "
        >
          <div class="left-logo">
            <img />
          </div>
          <div class="right-info">
            <h3>中国工商银行</h3>
            <p>四川虎居信息科技有限公司</p>
            <div class="card-num">
              <span>****</span><span>****</span><span>****</span
              ><span>3253</span>
            </div>
          </div>
        </li> -->
      </ul>
    </div>
    <div v-if="!cardList.length && showNoDataImg" class="no-data-area">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/az6c2sr0jcs0000.png"
        alt=""
        srcset=""
      />
      <p class="text">您还未添加银行卡</p>
    </div>
    <div class="footer-btn">
      <button @click="$router.push('/my/wallet/bankCards/add')">
        添加收款账户
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
      // bankCardStyle: [
      //   {
      //     bankCode: 'ICBC',
      //     icon: 'https://cdn.shupian.cn/sp-pt/wap/images/2k0jjobfx4c0000.png',
      //     bg_icon:
      //       'https://cdn.shupian.cn/sp-pt/wap/images/chze1ksovcg0000.png',
      //     bg_color: '#0BB3B3',
      //   },
      //   {
      //     bankCode: 'ICBC',
      //     icon: 'https://cdn.shupian.cn/sp-pt/wap/images/byc0c33glcw0000.png',
      //     bg_icon: 'https://cdn.shupian.cn/sp-pt/wap/images/rlbycqvjsb4000.png',
      //     bg_color: '#E63B47',
      //   },
      //   {
      //     bankCode: 'CCB',
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
      cardList: [],
      showNoDataImg: false,
    }
  },
  computed: {
    accountInfo() {
      return JSON.parse(localStorage.getItem('accountInfo'))
    },
  },
  created() {
    this.bankCardsList()
  },
  methods: {
    // 返回到提现页面
    backHandle() {
      this.$router.push('/my/wallet')
    },
    async bankCardsList() {
      const res = await this.$axios.get(walletApi.cardList, {
        params: {
          accountId: this.accountInfo.id,
        },
      })
      console.log(res)
      if (res.code === 200) {
        this.cardList = res.data
        if (this.cardList.length === 0) {
          this.showNoDataImg = true
        } else {
          this.showNoDataImg = false
        }
      } else {
        this.showNoDataImg = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.no-data-area {
  width: 100%;
  height: 100vh;
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  img {
    width: 340px;
    height: 340px;
    margin: 20vh auto 40px auto;
    display: block;
  }
  .text {
    height: 29px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
  }
}
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
          background: #fff;
          overflow: hidden;
          display: flex;
          align-items: center;
          text-align: center;
          border-radius: 60px;
          justify-content: center;
          img {
            width: 40px;
            height: 40px;
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
