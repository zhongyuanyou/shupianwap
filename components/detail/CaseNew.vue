<template>
  <div v-if="showCase" class="case">
    <h1 class="case-title">
      精选案例
      <span @click="toALL()"
        >查看全部 <my-icon name="you" size="0.2rem"></my-icon
      ></span>
    </h1>
    <CaseExamplesList
      class="case_examples"
      :item="caseData"
      @click.native="toDetail('/caseExamples/details', item)"
    ></CaseExamplesList>
  </div>
</template>
<script>
import { Image } from '@chipspc/vant-dgg'
import { caseApi } from '@/api/index'
import CaseExamplesList from '@/components/caseExamples/index/List.vue'

export default {
  components: {
    [Image.name]: Image,
    CaseExamplesList,
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
            asc: false,
          },
          {
            column: 'caseScore',
            asc: false,
          },
          {
            column: 'createTime',
            asc: false,
          },
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

  .case-title {
    padding: 48px 40px 0;
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
  .case_examples {
    margin-top: 0;
  }
}
</style>
