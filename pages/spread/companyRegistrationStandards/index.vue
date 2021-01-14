<template>
  <div class="company">
    <!-- 头部 start -->
    <Header title="公司注册标准" :fixed="false" head-class="head-icon" />
    <!-- 头部 end -->
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
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
import DggImCompany from '@/components/spread/DggImCompany'
import Planner from '@/components/spread/companyRegistrationStandards/GuiHuaShiSwipe'
import Type from '@/components/spread/companyRegistrationStandards/Type'
import ConsultTel from '@/components/spread/common/ConsultTel'
import Header from '~/components/common/head/header'
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
      plannersData: [
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭美美',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭晶晶',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ],
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
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '公司注册标准',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {},
  head() {
    return {
      title: '公司注册标准',
    }
  },
}
</script>
<style lang="less" scoped>
.company {
  font-family: PingFang SC;
  padding-bottom: 224px;
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
  /deep/.cousulttel-content {
    box-shadow: 0px 8px 12px 0px rgba(73, 116, 245, 0.15);
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
