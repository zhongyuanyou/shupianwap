<template>
  <div>
    <div class="my-component">
      <ServiceIntroduced
        :service-list="currentIndustryList"
        service-title="热门行业推荐"
      >
        <template v-slot:dropDown>
          <Dropdown
            v-model="industry"
            v-sensorsTrack:webClick="{
              name: `互联网资质业务介绍_下拉表单`,
              type: '售前',
            }"
            class="drop-margin"
            :options="industryList"
            @select="onSelect"
          />
        </template>
      </ServiceIntroduced>
    </div>
  </div>
</template>

<script>
import ServiceIntroduced from '~/components/spread/common/ServiceIntroduced'
import Dropdown from '@/components/spread/internetQualification/Dropdown'

export default {
  name: 'HotIndustryRecommend',
  components: {
    ServiceIntroduced,
    Dropdown,
  },
  data() {
    return {
      hotYeWuList: [
        {
          title: '增值电信业务经营许可证（ICP）',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '线上交易、收费性网站需要办理',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 10000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/coj92paiae00000.png',
            text: ['注册资金100万', '有安全保障措施'],
          },
        },
      ],
      industryList: [
        { index: 0, name: 'ICP许可证', color: '#5a79e8' },
        { index: 1, name: 'EDI许可证', color: '#222222' },
        { index: 2, name: 'IDC许可证', color: '#222222' },
        { index: 3, name: 'SP许可证', color: '#222222' },
        { index: 4, name: 'ISP许可证', color: '#222222' },
        { index: 5, name: '网络文化经营许可证', color: '#222222' },
      ],
      industry: null,
      currentIndustryList: [],
    }
  },
  created() {
    this.industry = this.industryList[0]
    this.currentIndustryList = [this.$parent.hotIndustryRecommendList[0]]
  },
  methods: {
    onSelect({ index }) {
      this.currentIndustryList = [this.$parent.hotIndustryRecommendList[index]]
    },
  },
}
</script>

<style lang="less" scoped>
.my-component {
  /deep/ .serviceList-content-head-title > span {
    color: #ffffff !important;
  }
  /deep/ .serviceList-content-head > span {
    color: #cccccc !important;
  }
  /deep/ .serviceList {
    margin-top: 0;
  }
  .drop-margin {
    margin: 30px 0 16px 0;
  }
}
</style>
