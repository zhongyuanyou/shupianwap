<template>
  <div v-if="lawerList.length" class="container">
    <h2>律师推荐</h2>
    <div class="s_area">
      <sp-swipe :autoplay="300000">
        <sp-swipe-item
          v-for="(item, index) in lawerList"
          :key="index"
          class="l_s_item"
          @click="toLawyerDetail(item.id,item.merchantUserId)"
        >
          <div class="l_header">
            <sp-image :src="$resizeImg(220, 220, item.image)" />
          </div>
          <div class="inner_area">
            <div class="l_infos">
              <p class="l_name">
                <span class="name">
                  {{ item.name }}
                </span>
                <span class="icon"></span>
                <!-- <sp-button
                  class="l_btn_im"
                  @click="
                    sendTemplateMsgWithImg(
                      item.merchantUserId,
                      'MERCHANT_S',
                      goodsInfo
                    )
                  "
                  >立即咨询</sp-button
                > -->
              </p>
              <p>
                <span
                  v-for="(labelItem, labelIndex) in item.labels"
                  :key="labelIndex"
                >
                  {{ labelItem.field }}
                  <span v-if="labelIndex !== item.labels.length - 1">,</span>
                </span>
              </p>
            </div>
            <div class="toast_box">
              已为{{ item.caseNum || 0 }}名当事人争取合法权益
            </div>
          </div>
        </sp-swipe-item>
        <!-- <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ images.length }}
          </div>
        </template> -->
      </sp-swipe>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, Button } from '@chipspc/vant-dgg'
import imHandle from '~/mixins/imHandle'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Button.name]: Button,
  },
  mixins: [imHandle],
  data() {
    return {
      headerBg: 'https://cdn.shupian.cn/sp-pt/wap/images/90c9a3bz7nk0000.png',
      lawerList: [],
    }
  },
  computed: {
    goodsInfo() {
      if (this.$route.path.match('detail/transactionDetails')) {
        // 交易商品详情
        return this.$store.state.tcProductDetail.detailData
      }
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    toLawyerDetail(id, merchantUserId) {
      let url
      if (location.href.match('tm.shupian.cn')) {
        url = 'https://tlaw.shupian.cn/lawyer/businessCard'
      } else {
        url = 'https://law.shupian.cn/lawyer/businessCard'
      }
      window.location.href =
        url + '?id=' + id + '&merchantUserId=' + merchantUserId
    },
    getList() {
      this.$axios
        .post('/crisps-law-wap-bff-api/service/nk/law/v1/lawyerList.do', {
          fields: [
            'field',
            'image',
            'winRate',
            'favComRate',
            'caseNum',
            'area',
          ],
          limit: 50,
          start: 1,
        })
        .then((res) => {
          if (res.code && res.data && res.code === 200) {
            if (res.data.length > 5) {
              const arr = res.data.sort(() => {
                return Math.random() - 0.5
              })
              this.lawerList = arr.splice(0, 5)
            } else {
              this.lawerList = res.data
            }
          }
        })
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep.container {
  padding: 40px;
  background: white;
  border-radius: 24px;
  margin-bottom: 20px;
  h2 {
    font-size: 40px;
    color: #1a1a1a;
    letter-spacing: 0;
    margin-bottom: 40px;
  }
  .sp-swipe {
    height: 418px;
    .sp-swipe__track {
      height: 370px;
    }
  }
  .sp-swipe__indicators {
    bottom: 0;
  }
  .sp-swipe__indicator {
    width: 8px;
    height: 8px;
    background: #ceced4;
    border-radius: 4px;
  }
  .sp-swipe__indicator--active {
    width: 22px;
    height: 8px;
    background: #4974f5;
    border-radius: 4px;
  }
}
.l_s_item {
  font-size: 24px;
  color: #555555;
  line-height: 34px;
  border-radius: 12px;
  position: relative;
  background-size: 100% 100%;
  overflow: hidden;
  .l_header {
    position: absolute;
    left: 40px;
    top: 0;
    width: 220px;
    height: 220px;
    border-radius: 12px;
    z-index: 2;
    overflow: hidden;
    &::before {
      opacity: 1;
      width: 200px;
      height: 52px;
      position: absolute;
      content: '金牌律师';
      bottom: 0;
      right: 0;
      background: url(https://cdn.shupian.cn/sp-pt/wap/images/90c9a3bz7nk0000.png)
        no-repeat center center;
      background-size: 100% 100%;
      font-size: 28px;
      color: #3e2909;
      letter-spacing: 0;
      text-align: justify;
      line-height: 52px;
      z-index: 1;
      text-align: center;
    }
  }
  .inner_area {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 336px;
    padding: 32px 40px 40px 40px;
    border-radius: 12px;
    overflow: hidden;
    background: url(https://cdn.shupian.cn/sp-pt/wap/images/13vve2a9uwww000.png)
      no-repeat center center;
    background-size: 100% 100%;
    .l_infos {
      padding-left: 260px;
      height: 140px;
      font-size: 24px;
      color: #555555;
      overflow: hidden;
      .l_name {
        overflow: hidden;
        font-size: 36px;
        color: #222222;
        line-height: 32px;
        margin-bottom: 20px;
        width: 336px;
        .name {
          padding-top: 2px;
          width: auto;
          float: left;
          font-weight: 600;
          max-width: 284px;
          height: 36px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-top: 6px;
          display: block;
        }
        .icon {
          float: left;
          width: 32px;
          height: 32px;
          background: url(https://cdn.shupian.cn/sp-pt/wap/images/8awjo7hsjyo0000.png)
            no-repeat center center;
          background-size: 100% 100%;
          margin-top: 6px;
          margin-left: 12px;
          display: block;
        }
        .l_btn_im {
          float: right;
          height: 48px;
          background-image: linear-gradient(90deg, #f9ddb4 0%, #f4d4aa 100%);
          border-radius: 4px;
          font-size: 22px;
          color: #3e2909;
          padding: 0 12px;
          color: #3e2909;
        }
      }
    }
    .toast_box {
      height: 80px;
      background: #fffcf5;
      border-radius: 8px;
      margin-top: 34px;
      position: relative;
      width: 100%;
      font-size: 28px;
      color: #555555;
      text-align: center;
      line-height: 80px;
    }
    .toast_box::before {
      position: absolute;
      content: '';
      left: 88px;
      top: -16px;
      border-right: 20px solid transparent;
      border-left: 20px solid transparent;
      border-bottom: 30px solid white;
    }
  }
}
</style>
