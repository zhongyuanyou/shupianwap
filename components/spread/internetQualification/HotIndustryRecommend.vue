<template>
  <div class="component">
    <ServiceIntroduced :service-list="hotYeWuList" service-title="热门行业推荐">
      <template v-slot:dropDown>
        <Dropdown
          v-model="industry"
          class="drop-margin"
          :options="industryList"
        />
      </template>
    </ServiceIntroduced>
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
          titleLable:
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
        { name: 'ICP许可证', color: '#5a79e8' },
        { name: 'ICP许可证1', color: '#222222' },
        { name: 'ICP许可证2', color: '#222222' },
        { name: 'ICP许可证3', color: '#222222' },
        { name: 'ICP许可证4', color: '#222222' },
      ],
      industry: null,
    }
  },
  created() {
    this.industry = this.industryList[0]
  },
}
</script>

<style lang="less" scoped>
.component {
  /deep/ .serviceList-content-head-title > span {
    color: #ffffff !important;
  }
  /deep/ .serviceList-content-head > span {
    color: #cccccc !important;
  }
  .drop-margin {
    margin: 30px 0 16px 0;
  }
}
</style>
