<template>
  <div class="company">
    <!-- 头部内容 start -->
    <Header v-show="!isInApp" title="公司注册标准">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1a1a1a"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- 头部内容 end -->
    <!-- banner start -->
    <div class="banner">
      <sp-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(item, index) of banner" :key="index">
          <nuxt-link to="item.url">
            <img :src="item.img" />
          </nuxt-link>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!-- banner end -->
    <!-- 选择公司类型 start -->
    <Type :data="info" />
    <!-- 选择公司类型 end -->
    <!-- 电话咨询 start -->
    <ConsultTel
      :tel="400 + '-' + 962540"
      title="还有疑问？企服专家为您免费解答"
      class="consult"
      md-type="new"
      md-name="公司注册标准_疑问咨询"
    />
    <!-- 电话咨询 end -->
    <!-- 规划师 start -->
    <Planner
      :planners-common="plannersCommon"
      :planners-data="plannersData"
      md-type="new"
    />
    <!-- 规划师 end -->
    <!-- im start -->
    <DggImCompany />
    <!-- im end -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import DggImCompany from '@/components/spread/DggImCompany'
import Planner from '@/components/spread/companyRegistrationStandards/GuiHuaShiSwipe'
import Type from '@/components/spread/companyRegistrationStandards/Type'
import ConsultTel from '@/components/spread/common/ConsultTel'
import Header from '~/components/common/head/header'
import MyIcon from '@/components/common/myIcon/MyIcon'
import { spreadApi } from '@/api/spread'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    Header,
    Type,
    ConsultTel,
    Planner,
    DggImCompany,
  },
  props: {},
  async asyncData({ $axios }) {
    const type = 'extendBussineWithdraw'
    const defaultRes = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        planlerList: [
          {
            id: 30134,
            userId: '3394',
            userCentreId: '3394',
            loginName: '2022554',
            realName: '刘琴',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13350072314',
            cvr: 0.092593,
            cvrValue: 60.683218,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 12112.4,
            busPerformanceValue: 86.575363,
            abilityValue: 67.466985,
            formatType: '工商',
          },
          {
            id: 30156,
            userId: '43999',
            userCentreId: '7704199733711282176',
            loginName: '96352931',
            realName: '岳雪冬',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13908231675',
            cvr: 0.145455,
            cvrValue: 64.543449,
            orderBus: 8,
            orderBusValue: 50.950718,
            busPerformance: 15623,
            busPerformanceValue: 91.389398,
            abilityValue: 71.329062,
            formatType: '工商',
          },
          {
            id: 30310,
            userId: '7930253930943676416',
            userCentreId: '7930253930615472128',
            loginName: '109870',
            realName: '李海怡',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13696057459',
            cvr: 0.106383,
            cvrValue: 61.705406,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 17770,
            busPerformanceValue: 93.504073,
            abilityValue: 70.2655,
            formatType: '工商',
          },
          {
            id: 30297,
            userId: '7887200447593906176',
            userCentreId: '7887200447257313280',
            loginName: '108862',
            realName: '李劲',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '18884259139',
            cvr: 0.159091,
            cvrValue: 65.511436,
            orderBus: 7,
            orderBusValue: 50.378921,
            busPerformance: 8744,
            busPerformanceValue: 79.993572,
            abilityValue: 68.049033,
            formatType: '工商',
          },
          {
            id: 30163,
            userId: '66475',
            userCentreId: '66475',
            loginName: '38798340',
            realName: '钟霞',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13730634929',
            cvr: 0.1,
            cvrValue: 61.23349,
            orderBus: 6,
            orderBusValue: 49.807025,
            busPerformance: 15278,
            busPerformanceValue: 90.996225,
            abilityValue: 69.28084,
            formatType: '工商',
          },
        ],
      },
    }
    try {
      const res = await $axios.get(spreadApi.list, {
        params: { pageCode: type },
      })
      if (res.code === 200) {
        return { resultData: res.data }
      } else {
        return { resultData: defaultRes.data }
      }
    } catch (error) {
      return { resultData: defaultRes.data }
    }
  },
  data() {
    return {
      // 公司注册标准的文字内容
      info: [
        // 有限责任公司
        {
          // 注册标准
          rs: [
            '（1）股东符合法定人数共同出资设立；',
            '（2）股东出资达到法定资本最低限度（不同公司最低限度不同）',
            '（3）股东共同制定公司章程；',
            '（4）有公司名称；',
            '（5）有固定的生产经营场所和必要的生产经营条件。',
          ],
          // 所需材料
          material: [
            '3-5个公司名称：地区+名字+行业+类型',
            '经营范围：开设公司所需要的经营范围',
            '注册资金：如科技公司一般为50万元',
            '注册地址：公司经营办公的地址',
            '法人信息：姓名、身份证复印件（正反面）',
          ],
        },
        // 个体商户
        {
          // 注册标准
          rs: [
            '（1）注册资金：没有最低要求',
            '（2）名称要求：可以使用名称，也可以不用名称，但使用名称的个体工商户，需要申请并核准登记后才可以使用。',
          ],
          // 所需材料
          material: [
            '负责人身份证原件',
            '负责人一寸照片2张（无底色要求）',
            '注册地址材料（产权证复印件、租房合同、房东身份证复印件）',
          ],
        },
        // 股份有限公司
        {
          // 注册标准
          rs: [
            '（1）发起人符合法定人数，其中须有半数以上的发起人在中国境内有住所。',
            '（2）有符合公司章程规定的全体发起人认购的股本数额或者募集的实收股本总额。',
            '（3）股份发行、筹办事项符合法律规定，在发起人认购的股份缴足前，不得向他人募集股份。',
            '（4）发起人制订公司章程，同时要载明公司法第81规定的事项。',
            '（5）有公司名称，建立符合股份有限公司要求的组织机构。',
          ],
          // 所需材料
          material: [
            '3-5个公司名称：地区+名字+行业+类型',
            '经营范围：开设公司所需要的经营范围',
            '注册资金：如科技公司一般为50万元',
            '注册地址：公司经营办公的地址',
            '法人信息：姓名、身份证复印件（正反面）',
          ],
        },
        // 分公司注册
        {
          // 注册标准
          rs: [
            '（1）名称须冠以总公司名称全称',
            '（2）经营范围不得超出总公司经营范围',
            '（3）有固定的生产经营场所和必要的生产条件，不得与总公司在同一场所经营',
          ],
          // 所需材料
          material: [
            '总公司营业执照副本复印件3份(加盖总公司鲜章)；',
            '总公司在登记机关的提档档案一套（加盖工商局提档章、总公司鲜章）',
            '总公司法人身份证复印件3份（加盖总公司鲜章）',
            '分公司负责人身份证复印件3份',
            '分公司场地证明（租房合同、房东身份证复印件、产权证复印件）',
            '刻章时需要分公司负责人身份证原件',
            '分公司设立材料需加盖总公司鲜章',
          ],
        },
        // 外资公司注册
        {
          // 注册标准
          rs: [
            '（1）投资方为外国个人或公司',
            '（2）需要实际出资，可依据《新公司法》规定出资注册',
            '（3）如果设立监事会，需要三名监事成员，若不设立监事会，可设立一名监事',
          ],
          // 所需材料
          material: [
            '公司名称：3-5个',
            '经营范围：100个以内',
            '公司注册地址：公司经营办公地址',
            '法定代表人：中国人外国人皆可',
          ],
        },
        // 合伙企业注册
        {
          // 注册标准
          rs: [
            '（1）有2-50个合伙人',
            '（2）具有书面合伙协议',
            '（3）有合伙人认缴或者实缴的出资',
            '（4）有合伙企业的名称和生产经营场所',
          ],
          // 所需材料
          material: [
            '全体合伙人签署的设立登记申请书',
            '全体合伙人的身份证明、照片',
            '合伙协议及出资权属证明',
            '经营场所证明',
          ],
        },
      ],
      // 规划师
      plannersData: [],
      plannersCommon: {
        title: '咨询规划师',
        imName: '核名_咨询规划师_在线咨询',
        telName: '核名_咨询规划师_拨打电话',
      },
      // banner
      banner: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2fyx09tup3wg000.jpg',
          url: '',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {},
  created() {
    this.plannerHandle(this.resultData.planlerList)
  },
  mounted() {
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '公司注册标准',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '公司注册标准' }, () => {})
    }
  },
  methods: {
    plannerHandle(data) {
      if (data.length !== 0) {
        const guihuashiList = []
        data.forEach((item, i) => {
          const obj = {
            id: item.userCentreId,
            type: '金牌规划师',
            imgSrc: item.userHeadUrl,
            avatarImg: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 11,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.userPhoneloginName,
          }
          guihuashiList.push(obj)
        })
        this.plannersData = guihuashiList
      }
    },
    back() {
      // 返回上一页
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },
  },
  head() {
    return {
      title: '公司注册标准',
    }
  },
}
</script>
<style lang="less" scoped>
.company {
  background: #fff;
  /deep/.fixed-head {
    /deep/.my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
    }
  }
  font-family: PingFang SC;
  padding-bottom: 224px;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  /deep/.cousulttel-content {
    box-shadow: 0px 8px 12px 0px rgba(73, 116, 245, 0.15);
  }
  .back_icon {
    margin-left: 40px;
  }
}
.banner {
  width: 100%;
  // height: 340px;
  margin-bottom: 45px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .input_ic_open {
    position: absolute;
    right: 0;
  }
}
.consult {
  /deep/.cousulttel-title {
    text-align: left;
  }
}
</style>
