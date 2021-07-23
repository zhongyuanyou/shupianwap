<template>
  <div v-if="showCase" class="case">
    <h1 class="case-title">
      精选案例
      <span @click="toALL()"
        >查看全部 <my-icon name="you" size="0.2rem"></my-icon
      ></span>
    </h1>
    <div class="case-box" @click="toDetail">
      <div class="case-img">
        <sp-image :src="caseData.caseImg" alt=""></sp-image>
      </div>
      <div class="case-name">
        <h3>{{ caseData.caseName || caseData.productName }}</h3>
        <p>办理周期:{{ caseData.dealTime }}天</p>
      </div>
      <div class="case-score">
        {{ caseData.caseScore / 100 || 9.9 }}<span class="case-text">分 </span>
      </div>
    </div>
    <div
      v-if="
        caseData.caseIntro &&
        caseData.caseIntro.show &&
        caseData.caseIntro.show[0].content
      "
      class="case-des"
      @click="toDetail"
    >
      <p
        v-if="
          caseData.caseIntro &&
          caseData.caseIntro.show &&
          caseData.caseIntro.show[0].content
        "
        class="text"
      >
        {{ caseData.caseIntro && caseData.caseIntro.show[0].content }}
      </p>
      <!-- <div
        v-if="caseData.caseIntro && caseData.caseIntro.show[0].content.imgs"
        class="img_list"
      >
        <div
          v-for="(item2, index) in caseData.caseIntro.show[0].content.imgs"
          :key="index"
          class="img_item"
        >
          <sp-image :src="item2" class="sp-img"></sp-image>
        </div>
        {{ caseData.caseIntro && caseData.caseIntro.show[0].content.imgs }}
      </div> -->
    </div>
    <!-- <p>{{ caseData.detailInfo.createTime }}</p> -->
  </div>
</template>
<script>
import { Image } from '@chipspc/vant-dgg'
import { caseApi } from '@/api/index'

export default {
  components: {
    [Image.name]: Image,
  },
  data() {
    return {
      showCase: false,
      caseData: {},
    }
  },
  // created() {
  //   this.caseData =
  //     this.caselist[Math.floor(Math.random() * this.caselist.length)]
  // },
  computed: {
    // 产品详情
    classCodeLevelList() {
      if (this.$route.path.match('transactionDetails')) {
        return this.$store.state.tcProductDetail.detailData.classCodeLevelList
      } else {
        return this.$store.state.sellingGoodsDetail.sellingGoodsData.classCodeLevel.split(
          ','
        )
      }
    },
  },
  mounted() {
    this.getCase()
  },
  methods: {
    getCase() {
      const params = {
        orderItems: [
          {
            column: 'isTop',
            asc: true,
          },
          // {
          //   column: 'createTime',
          //   asc: false,
          // },
          // {
          //   column: 'caseScore',
          //   asc: false,
          // },
          // {
          //   column: 'isTop',
          //   asc: true,
          // },
        ],
        page: '1',
        limit: '10',
      }
      if (this.classCodeLevelList.length > 1) {
        params.productTwoBelongCode = this.classCodeLevelList[1]
        params.productOneBelongCode = this.classCodeLevelList[0]
      } else if (this.classCodeLevelList.length === 1) {
        params.productOneBelongCode = this.classCodeLevelList[0]
      }
      // params.productTwoBelongCode = 'FL20201224136337'
      caseApi
        .case_list(params)
        .then((res) => {
          console.log('案例列表', res)
          if (res.records && res.records.length) {
            this.showCase = true
            this.caseData = res.records[0]
            console.log('this.caseData', this.caseData)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    toDetail() {
      this.$router.push('/caseExamples/details?id=' + this.caseData.id)
    },
    toALL() {
      console.log('classCodeLevelList', this.classCodeLevelList)
      let query = {}
      if (this.classCodeLevelList && this.classCodeLevelList.length > 0) {
        query = {
          classCode1: this.classCodeLevelList[0],
          classCode2: this.classCodeLevelList[1],
        }
      }
      query.goodsType = this.$route.path.match('transactionDetails')
        ? 'PRO_CLASS_TYPE_TRANSACTION'
        : 'PRO_CLASS_TYPE_SERVICE'
      this.$router.push({
        path: '/caseExamples',
        query,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.case {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 40px;
  .case-title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
    span {
      float: right;
      font-size: 26px;
      color: #999999;
      font-weight: normal;
    }
  }
  .case-box {
    position: relative;
    overflow: hidden;
    min-height: 120px;
    margin-top: 40px;
    width: 100%;
    .case-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 174px;
      height: 120px;
      background: #d8d8d8;
      border-radius: 4px;
      float: left;
      overflow: hidden;
      .sp-image {
        width: 100%;
        height: 100%;
        text-align: center;
        align-items: middle;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .case-name {
      padding-left: 214px;
      padding-right: 100px;
      padding-top: 10px;
      font-size: 32px;
      color: #222222;
      line-height: 44px;
      h3 {
        .textOverflow(2);
      }
      p {
        font-size: 24px;
        color: #1a1a1a;
        letter-spacing: 0;
        margin-top: 10px;
      }
    }
    .case-score {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 46px;
      color: #4975f5;
      letter-spacing: 0;
      font-weight: 600;
      .case-text {
        font-size: 24px;
        color: #4974f5;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: normal;
      }
    }
  }
  .case-des {
    margin-top: 30px;
    position: relative;
    width: 100%;
    background: #f8f8f8;
    height: auto;
    border-radius: 12px;
    .text {
      font-size: 24px;
      .textOverflow(3);
      padding: 20px 30px;
      font-size: 24px;
      color: #555555;
      letter-spacing: 0;
      line-height: 38px;
      max-height: 140px;
    }
    .img_list {
      overflow: hidden;
    }
  }
  .case-des::after {
    content: '';
    position: absolute;
    left: 40px;
    top: -60px;
    width: 0;
    height: 0;
    border-top: 30px solid transparent;
    border-right: 30px solid transparent;
    border-bottom: 30px solid #f8f8f8;
    border-left: 30px solid transparent;
  }
}
</style>
