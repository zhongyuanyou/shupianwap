<template>
  <div v-if="showCase" class="case">
    <h1 class="case-title">
      精选案例
      <span>查看全部 <my-icon name="you" size="0.2rem"></my-icon></span>
    </h1>
    <div class="case-box">
      <div class="case-img">
        <sp-image :src="caseData.img" alt=""></sp-image>
      </div>
      <div class="case-name">
        <h1>{{ caseData.caseName || caseData.productName }}</h1>
        <p v-if="caseData.detailInfo && caseData.detailInfo.dealTime">
          办理周期:{{ caseData.detailInfo.dealTime }}天
        </p>
      </div>
      <div v-if="caseData.caseScore" class="case-score">
        {{ caseData.caseScore }}<span class="case-text">分 </span>
      </div>
    </div>
    <div class="case-des">
      {{ caseData.detailInfo && caseData.detailInfo.caseSynopsis }}
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
      // 获取客户端展示信息
      return this.$store.state.tcProductDetail.detailData.classCodeLevelList
    },
  },
  mounted() {
    this.getCase()
  },
  methods: {
    getCase() {
      console.log('classCodeLevelList', this.classCodeLevelList)
      const params = {
        page: 1,
        limit: 10,
        orderItems: [
          {
            column: 'createTime',
            asc: true,
          },
        ],
      }
      // if (this.classCodeLevelList.length > 2) {
      //   params.productThreeBelongCode = this.classCodeLevelList[2]
      //   params.productTwoBelongCode = this.classCodeLevelList[1]
      //   params.productOneBelongCode = this.classCodeLevelList[0]
      // } else if (this.classCodeLevelList.length > 1) {
      //   params.productTwoBelongCode = this.classCodeLevelList[1]
      //   params.productOneBelongCode = 'FL20201224136319'
      // } else if (this.classCodeLevelList.length === 1) {
      //   params.productOneBelongCode = this.classCodeLevelList[0]
      // }
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
      .textOverflow(2);
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
    .case-des {
      position: relative;
      width: 100%;
      height: 167.4px;
      background: #f8f8f8;
      width: 630px;
      height: 114px;
      font-size: 24px;
      color: #555555;
      letter-spacing: 0;
      line-height: 38px;
      ::after {
        content: '';
        position: absolute;
        border-right: 0 solid transparent;
        border-left: 0 solid transparent;
        border-bottom: 10px solid #555555;
        left: 80px;
        top: -10px;
      }
    }
  }
}
</style>
