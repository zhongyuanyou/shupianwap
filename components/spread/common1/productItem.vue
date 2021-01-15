<template>
  <div>
    <a
      ref="goodItem"
      v-sensorsTrack:p_commodityClick="{
        name: `推荐公司点击`,
        track_code: 'SPTG000005',
        commodity_type: good.compantType, // 商品类型
        commodity_number: good.companyId, // 商品编号
        commodity_name: good.companyName, // 商品名称
        n_now_price: good.transferPrice, // 商品售价
      }"
      class="my-component"
      :style="
        textData.info
          ? { padding: '0.40rem 0 0.24rem' }
          : { padding: '0.32rem 0 0' }
      "
    >
      <div class="item-img"><img :src="data.industryImg" /></div>
      <div class="item-content">
        <p class="item-title">{{ data.name }}</p>
        <div class="item-tabs">
          <span
            v-for="(item, index) in data.tabs"
            :key="index"
            class="item-tab"
          >
            {{ item }}
          </span>
        </div>
        <div class="item-notes">
          <span
            v-for="(item, index) in data.notes"
            :key="index"
            class="item-note"
          >
            {{ item }}
            <label v-if="index != data.notes.length - 1">|</label>
          </span>
        </div>
        <p class="item-price">
          <span class="item-price-num">{{ data.price }}</span>
          <span class="item-price-unit">元</span>
        </p>
        <div
          v-if="textData.borderBottom"
          class="item-divide"
          :style="
            textData.info
              ? { margin: '0.15rem 0 0.19rem' }
              : { margin: '0.32rem 0 0' }
          "
        ></div>
        <div v-if="textData.info" class="item-recommend">
          <img
            class="item-recommend-img"
            src="https://cdn.shupian.cn/sp-pt/wap/images/e8pqebimcbs0000.png"
          />
          <span class="item-recommend-text">{{ data.recommendText }}</span>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'GoodItem',
  props: {
    good: {
      type: Object,
      default: () => {
        return {}
      },
    },
    textData: {
      type: Object,
      default: () => {
        return {
          info: '',
          borderBottom: true,
        }
      },
    },
  },
  data() {
    return {
      slogans: [
        '优质公司',
        '公司干净',
        '无债权债务',
        '无不良记录',
        '附带商标',
        '卖家急售',
        '一般纳税人',
        '正常报税',
        '干净无异常',
        '热门公司',
        '有户有网',
        '热门行业',
        '新公司',
        '资料齐全',
        '可随时交易',
        '热销商品',
        '签署出售协议',
        '自带商标',
        '急售商品 ',
        '特价商品   ',
        '陪同交易',
        '超高性价',
        '明码标价',
      ],
      scrollAction: { x: 'undefined', y: 'undefined' },
      scrollDirection: '',
      isMd: false,
    }
  },
  computed: {
    data() {
      const obj = this.good
      const item = {
        industryImg: '',
        industryName: obj.companyIndustryName,
        recommendText: this.getArrayItems(this.slogans, 3).join(','),
        price: obj.transferPrice,
        name: obj.companyName,
        tabs: this.getArrayItems(this.slogans, 3),
        notes: [
          obj.companyIndustryName,
          obj.payTaxesTypeName,
          obj.establishDate,
          obj.registeredCapital,
        ],
      }
      switch (obj.companyIndustryName) {
        case '电子贸易': {
          item.industryImg = 'https://img10.dgg.cn/pt06/wap/8501dnyiae40000.png'
          break
        }
        case '科技信息': {
          item.industryImg = 'https://img10.dgg.cn/pt06/wap/eb0b1yellgg0000.png'
          break
        }
        case '教育培训': {
          item.industryImg = 'https://img10.dgg.cn/pt06/wap/bas2zdj518w0000.png'
          break
        }
        case '广告传媒': {
          item.industryImg = 'https://img10.dgg.cn/pt06/wap/39l64c4kujc0000.png'
          break
        }
        case '餐饮美容': {
          item.industryImg = 'https://img10.dgg.cn/pt06/wap/734jysfyke00000.png'
          break
        }
        case '公司交易': {
          item.industryImg = 'https://img10.dgg.cn/pt06/wap/7sj0p2oe7000000.png'
          break
        }
        case '公司转让': {
          item.industryImg = 'https://img10.dgg.cn/pt06/wap/fcyegzq87o00000.png'
          break
        }
        default: {
          // 当没有行业对应图片时，随机从三张默认图里抽一张作为行业图片
          const images = [
            'https://img10.dgg.cn/pt06/wap/7iswdcpn8jc0000.png',
            'https://img10.dgg.cn/pt06/wap/7mgxtxioehw0000.png',
            'https://img10.dgg.cn/pt06/wap/3ejz3vwjiks0000.png',
          ]
          const num = Math.floor(Math.random() * 3)
          item.industryImg = images[num]
        }
      }
      return item
    },
  },
  mounted() {
    try {
      window.addEventListener('scroll', this.scrollMd) // 监听滚动
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 随机生成三条数据
    getArrayItems(recent, num) {
      const temparray = []
      for (const index in recent) {
        temparray.push(recent[index])
      }
      const returnarray = []
      for (let i = 0; i < num; i++) {
        if (temparray.length > 0) {
          const arrIndex = Math.floor(Math.random() * temparray.length)
          returnarray[i] = temparray[arrIndex]
          temparray.splice(arrIndex, 1)
        } else {
          break
        }
      }
      return returnarray
    },
    // 滚动浏览埋点
    scrollMd(event) {
      this.scrollFunc()
      if (this.scrollDirection === 'down') {
        // 页面向下滚动要做的事情
        const clientHeight = document.documentElement.clientHeight
        const eleTop = this.$refs.goodItem.getBoundingClientRect().top
        const goodHeight = this.$refs.goodItem.getBoundingClientRect().height
        if (
          !this.isMd &&
          eleTop > 0 &&
          clientHeight - eleTop > goodHeight + 50
        ) {
          console.log(clientHeight - eleTop)
          // 当元素最顶部 距离小于 页面最顶部时
          // 进行一次埋点
          window.sensors.track('p_commodityVisit', {
            name: `推荐商品浏览`,
            track_code: 'SPTG000004',
            commodity_type: this.good.compantType, // 商品类型
            commodity_number: this.good.companyId, // 商品编号
            commodity_name: this.good.companyName, // 商品名称
            n_now_price: this.good.transferPrice, // 商品售价
          })
          this.isMd = true
          this.$emit('update:isMd', true)
        }
      } else if (this.scrollDirection === 'up') {
        // 页面向上滚动要做的事情
        // console.log('up')
        this.isMd = false
      }
    },
    scrollFunc() {
      if (typeof this.scrollAction.x === 'undefined') {
        this.scrollAction.x = window.pageXOffset
        this.scrollAction.y = window.pageYOffset
      }
      const diffX = this.scrollAction.x - window.pageXOffset
      const diffY = this.scrollAction.y - window.pageYOffset
      if (diffX < 0) {
        // Scroll right
        this.scrollDirection = 'right'
      } else if (diffX > 0) {
        // Scroll left
        this.scrollDirection = 'left'
      } else if (diffY < 0) {
        // Scroll down
        this.scrollDirection = 'down'
      } else if (diffY > 0) {
        // Scroll up
        this.scrollDirection = 'up'
      } else {
        // First scroll event
      }
      this.scrollAction.x = window.pageXOffset
      this.scrollAction.y = window.pageYOffset
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: 100%;
  display: flex;
  align-items: flex-start;
  .item-img {
    flex: none;
    width: 190px;
    height: 190px;
    margin-right: 28px;
    img {
      width: 190px;
      height: 190px;
    }
  }
  .item-content {
    flex: none;
    width: calc(100% - 200px);
    .item-title {
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 32px;
    }
    .item-tabs {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16px;
      .item-tab {
        font-size: 22px;
        font-weight: 400;
        color: #5c7499;
        line-height: 22px;
        height: 32px;
        background: #f0f2f5;
        border-radius: 4px;
        display: flex;
        padding: 6px 8px;
        margin-right: 12px;
        margin-bottom: 6px;
      }
    }
    .item-notes {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 22px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .item-note {
        font-size: 22px;
        font-weight: 400;
        color: #222222;
        line-height: 22px;
      }
    }
    .item-price {
      font-size: 22px;
      font-weight: 400;
      color: #ec5330;
      line-height: 36px;
      .item-price-num {
        font-size: 36px;
        line-height: 36px;
      }
    }
    .item-divide {
      height: 1px;
      background: #f4f4f4;
    }
    .item-recommend {
      display: flex;
      align-items: center;
      .item-recommend-img {
        width: 28px;
        height: 28px;
        margin-right: 12px;
        img {
          width: 28px;
          height: 28px;
        }
      }

      .item-recommend-text {
        font-size: 22px;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 22px;
        display: flex;
      }
    }
  }
}
</style>
