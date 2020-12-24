<template>
  <div class="case">
    <p class="case_title">成功案例</p>
    <div class="case_con">
      <p class="case_con_title">{{ caseData.name }}</p>
      <div class="case_con_info">
        <div class="case_con_info_lf">
          {{ caseData.area }}
          <!--          <span>时间：{{ caseData.time }}</span>-->
        </div>
        <div class="case_con_info_rt">{{ caseData.time }} 成交</div>
      </div>
      <div class="case_evaluate">
        <p>{{ caseData.finalPrice }}</p>
        <div class="score">
          <sp-rate
            v-model="caseData.star"
            size="0.24rem"
            :readonly="true"
            color="#FF624F"
            void-color="#bbb"
          />
          <span>{{ caseData.star }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Rate } from '@chipspc/vant-dgg'
export default {
  name: 'Case',
  components: {
    [Rate.name]: Rate,
  },
  props: {
    detailType: {
      type: String,
      default: () => {
        return this.$route.query.type ? this.$route.query.type : null
      },
    },
  },
  data() {
    return {
      caseData: {
        name: '--',
        time: '---/---/---',
        area: '--：---',
        star: 0,
        finalPrice: '-',
        originalPrice: '-',
      },
    }
  },
  mounted() {
    this.getCase()
  },
  methods: {
    // mock数据
    getMockData(classCode) {
      switch (classCode) {
        case 'FL20201207080003': // 公司
          return [
            {
              name: '北京****商贸有限公司',
              time: '2020/09/18',
              area: '地区：北京市,朝阳区',
              star: 4.9,
              finalPrice: '7000元',
              originalPrice: '9800元',
            },
            {
              name: '成都**信息科技有限公司',
              time: '2020/8/30',
              area: '地区：四川省成都市',
              star: 4.8,
              finalPrice: '5200元',
              originalPrice: '7650元',
            },
            {
              name: '重庆市***教育培训有限公司',
              time: '2020/05/13',
              area: '地区：重庆市江北区',
              star: 4.7,
              finalPrice: '3.5万',
              originalPrice: '4.5万',
            },
            {
              name: '湖南**广告传媒公司',
              time: '2020/10/11',
              area: '地区：湖南省长沙市',
              star: 4.7,
              finalPrice: '3.5万',
              originalPrice: '4.5万',
            },
            {
              name: '广州***酒店管理有限公司',
              time: '2020/04/23',
              area: '地区：广东省广州市',
              star: 4.9,
              finalPrice: '8800元',
              originalPrice: '1.25万',
            },
            {
              name: '四川**运输有限公司',
              time: '2020/05/08',
              area: '地区：四川省绵阳市',
              star: 4.8,
              finalPrice: '5.3万',
              originalPrice: '5.5万',
            },
            {
              name: '上海**餐饮有限公司',
              time: '2020/8/16',
              area: '地区：上海市浦东新区',
              star: 5.0,
              finalPrice: '4.6万',
              originalPrice: '5.0万',
            },
            {
              name: '**（深圳）有限公司',
              time: '2020/11/09',
              area: '地区：广东省深圳市',
              star: 4.9,
              finalPrice: '2.5万',
              originalPrice: '3.2万',
            },
            {
              name: '武汉市**家居建材有限公司',
              time: '2020/12/10',
              area: '地区：湖北省武汉市',
              star: 5.0,
              finalPrice: '6.6万',
              originalPrice: '7.20万',
            },
            {
              name: '江苏**文化传播有限公司',
              time: '2020/9/26',
              area: '地区：江苏省南通市',
              star: 4.8,
              finalPrice: '6800元',
              originalPrice: '8200元',
            },
          ]
        case 'FL20201202065056': // 商标
          return [
            {
              name: '圣美利',
              time: '2020/09/10',
              area: '商标类别：19类建筑材料',
              star: 4.8,
              finalPrice: '16560元',
              originalPrice: '18000元',
            },
            {
              name: '拓菲',
              time: '2020/08/12',
              area: '商标类别：16类办公文具',
              star: 4.7,
              finalPrice: '6300元',
              originalPrice: '9870元',
            },
            {
              name: '耀朗',
              time: '2020/07/10',
              area: '商标类别：19类建筑材料',
              star: 4.7,
              finalPrice: '19500元',
              originalPrice: '22000元',
            },
            {
              name: 'JUNE SEA',
              time: '2020/09/12',
              area: '商标类别：3类化妆日用',
              star: 4.8,
              finalPrice: '29444元',
              originalPrice: '32100元',
            },
            {
              name: 'IUTU',
              time: '2020/10/11',
              area: '商标类别：3类化妆日用',
              star: 4.9,
              finalPrice: '7602元',
              originalPrice: '10000元',
            },
            {
              name: '渊博 PROFOUND',
              time: '2020/10/22',
              area: '商标类别：25类服装鞋帽',
              star: 4.8,
              finalPrice: '30100元',
              originalPrice: '32100元',
            },
            {
              name: '全福祥',
              time: '2020/11/10',
              area: '商标类别：30类小食配料',
              star: 4.8,
              finalPrice: '11500元',
              originalPrice: '13200元',
            },
            {
              name: '御京源',
              time: '2020/09/18',
              area: '商标类别：29类食品鱼肉',
              star: 4.7,
              finalPrice: '12000元',
              originalPrice: '13200元',
            },
            {
              name: 'VOBE',
              time: '2020/10/16',
              area: '商标类别：25类服装鞋帽',
              star: 4.7,
              finalPrice: '11302元',
              originalPrice: '12500元',
            },
            {
              name: 'MILK DOLL',
              time: '2020/08/26',
              area: '商标类别：43类餐饮酒店',
              star: 4.8,
              finalPrice: '16560元',
              originalPrice: '18000元',
            },
          ]
        case 'FL20201202065055': // 专利
          return [
            {
              name: '一种虚拟现实帽子',
              time: '2020.9.25',
              area: '分类：发明专利',
              star: 4.9,
              finalPrice: '2.99万',
              originalPrice: '3.5万',
            },
            {
              name: '一种方便操作的手动式中药饮片切片装置',
              time: '2020.9.23',
              area: '分类：发明专利',
              star: 4.7,
              finalPrice: '4.5万',
              originalPrice: '4.8万',
            },
            {
              name: '一种电动车蓄电池用降温器',
              time: '2020.10.13',
              area: '分类：实用新型',
              star: 4.9,
              finalPrice: '4200元',
              originalPrice: '5000元',
            },
            {
              name: '存车装置',
              time: '2020.9.28',
              area: '分类：外观设计',
              star: 4.8,
              finalPrice: '40.5万',
              originalPrice: '44.5万',
            },
            {
              name: '套筒灌浆饱满度检测器',
              time: '2020.10.18',
              area: '分类：外观设计',
              star: 4.9,
              finalPrice: '2.5万',
              originalPrice: '2.8万',
            },
            {
              name: '一种废纸回收利用粉碎装置',
              time: '2020.10.18',
              area: '分类：实用新型',
              star: 4.8,
              finalPrice: '5200元',
              originalPrice: '5600元',
            },
            {
              name: '一种废纸回收利用粉碎装置',
              time: '2020.10.26',
              area: '分类：实用新型',
              star: 4.8,
              finalPrice: '4600元',
              originalPrice: '4900元',
            },
            {
              name: '一种建筑节能墙体',
              time: '2020.10.18',
              area: '分类：实用新型',
              star: 4.6,
              finalPrice: '5500元',
              originalPrice: '5800元',
            },
            {
              name: '一种能在排出废水同时加水的洗衣机内筒',
              time: '2020.10.30',
              area: '分类：实用新型',
              star: 4.9,
              finalPrice: '5.5万',
              originalPrice: '6.2万',
            },
          ]
        case 'FL20201202065054': // 资质
          return [
            {
              name: '建筑工程施工总承包三级',
              time: '2020/11/27',
              area: '地区：四川省成都市',
              star: 5.0,
              finalPrice: '36万',
              originalPrice: '38万',
            },
            {
              name: '公路工程施工总承包三级',
              time: '2020/11/30',
              area: '地区：重庆市',
              star: 4.8,
              finalPrice: '10.8万',
              originalPrice: '12万',
            },
            {
              name: '古建筑',
              time: '2020/12/1',
              area: '地区：四川省成都市',
              star: 5.0,
              finalPrice: '12万',
              originalPrice: '14万',
            },
            {
              name: '环保三级',
              time: '2020/12/2',
              area: '地区：四川省成都市',
              star: 5.0,
              finalPrice: '7.8万',
              originalPrice: '8万',
            },
            {
              name: '水利水电工程施工总承包二级',
              time: '2020/12/2',
              area: '地区：北京市',
              star: 5.0,
              finalPrice: '342万',
              originalPrice: '360万',
            },
            {
              name: '电力工程施工总承包三级',
              time: '2020/12/3',
              area: '地区：广东省深圳市',
              star: 4.9,
              finalPrice: '15万',
              originalPrice: '17.2万',
            },
            {
              name: '建筑行业（建筑工程专业）乙级',
              time: '2020/12/4',
              area: '地区：上海市',
              star: 4.9,
              finalPrice: '196万',
              originalPrice: '200万',
            },
            {
              name: '房建市政城照环保劳务',
              time: '2020/12/5',
              area: '地区：四川省成都市',
              star: 4.8,
              finalPrice: '25.2万',
              originalPrice: '26万',
            },
            {
              name: '劳务资质',
              time: '2020/12/7',
              area: '地区：上海市',
              star: 4.8,
              finalPrice: '13万',
              originalPrice: '13.98万',
            },
            {
              name: '矿山二级资质',
              time: '2020/12/7',
              area: '地区：云南',
              star: 5.0,
              finalPrice: '192万',
              originalPrice: '195万',
            },
            {
              name: '劳务资质',
              time: '2020/12/11',
              area: '地区：四川省成都市',
              star: 4.8,
              finalPrice: '7.2万',
              originalPrice: '7.5万',
            },
            {
              name: '建筑工程，市政公用工程总承包一级',
              time: '2020/12/12',
              area: '地区：重庆市',
              star: 5.0,
              finalPrice: '162万',
              originalPrice: '165万',
            },
            {
              name: '施工劳务',
              time: '2020/12/18',
              area: '地区：广东省广州市',
              star: 4.8,
              finalPrice: '15.45万',
              originalPrice: '16万',
            },
            {
              name: '成华区模板脚手架',
              time: '2020/12/23',
              area: '地区：四川省成都市',
              star: 4.9,
              finalPrice: '7.3万',
              originalPrice: '8万',
            },
            {
              name: '房公市水监理乙级',
              time: '2020/12/30',
              area: '地区：四川省成都市',
              star: 5.0,
              finalPrice: '70.9万',
              originalPrice: '72万',
            },
          ]
        default:
          return [
            {
              name: '--',
              time: '---/---/---',
              area: '--：---',
              star: 0,
              finalPrice: '-',
              originalPrice: '-',
            },
          ]
      }
    },
    //  随机抽取
    getCase() {
      const caseData = this.getMockData(this.detailType)
      if (caseData.length < 2) {
        this.caseData = caseData[0]
      } else {
        this.caseData = caseData[Math.floor(Math.random() * caseData.length)]
      }
    },
  },
}
</script>

<style lang="less" scoped>
.case {
  background-color: #fff;
  padding: 47px 40px 37px 40px;
  border-bottom: 24px solid #f8f8f8;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &_con {
    margin-top: 39px;
    &_title {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 40px;
    }
    &_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      margin-top: 24px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 36px;
      &_lf {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        span {
          margin-left: 34px;
        }
      }
    }
  }
  &_evaluate {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 22px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ec5330;
    .score {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      span {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ff624f;
        margin-left: 16px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
