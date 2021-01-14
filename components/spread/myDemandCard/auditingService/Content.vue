<template>
  <div class="content">
    <div v-for="(item, index) in data" :key="index">
      <RevenueRadio
        v-if="item.type === 'tab'"
        :value.sync="item.value"
        :tabs="item.options"
        :title="item.title"
        :tab-width-class="item.tabWidthClass"
        :no-margin-right="item.noMarginRight"
        @update:value="radioValue"
      />
      <Dropdown
        v-if="item.type === 'dropdown'"
        ref="revenueRef"
        :index="index"
        :title="item.title"
        :tabs="item.options"
        :select-title="item.selectTitle"
        @dropdownValue="handleValue"
      />
    </div>
    <FixedButtom :content="content" />
  </div>
</template>

<script>
import RevenueRadio from '~/components/spread/myDemandCard/auditingService/RevenueRadio'
import Dropdown from '~/components/spread/myDemandCard/auditingService/Dropdown'
import FixedButtom from '~/components/spread/myDemandCard/auditingService/FixedButtom'
export default {
  name: 'Content',
  components: {
    RevenueRadio,
    Dropdown,
    FixedButtom,
  },
  data() {
    return {
      data: [
        {
          title: '您需要办理什么业务？',
          selectTitle: '请选择您的业务',
          type: 'dropdown',
          options: [
            { id: 1, name: '改制审计', color: '#5a79e8' },
            { id: 2, name: '财产转移专项审计', color: '#222222' },
            { id: 3, name: '财务报表审计', color: '#222222' },
            { id: 4, name: '验资报告', color: '#222222' },
            { id: 5, name: '固定资产评估', color: '#222222' },
            { id: 6, name: '土地评估', color: '#222222' },
            { id: 7, name: '服务于财务报告的评估', color: '#222222' },
            { id: 8, name: '企业整体资产 (净资产) 评估', color: '#222222' },
            { id: 9, name: '房屋评估', color: '#222222' },
            { id: 10, name: '无形资产评估', color: '#222222' },
            { id: 11, name: '企业所得税汇算清缴鉴证', color: '#222222' },
            { id: 12, name: '固定资产加速折旧鉴证', color: '#222222' },
            { id: 13, name: '研发费用加技扣除鉴证', color: '#222222' },
            { id: 14, name: '企业所得税税前弥补亏损的鉴证', color: '#222222' },
            {
              id: 15,
              name: '企业财产损失所得税税前扣除的鉴证',
              color: '#222222',
            },
            { id: 16, name: '土地增值税清算税款的鉴证', color: '#222222' },
            { id: 16, name: '固定资产投资抵免鉴证', color: '#222222' },
            { id: 17, name: '房地产企业涉税调整鉴证', color: '#222222' },
            { id: 18, name: '其他业务', color: '#222222' },
          ],
          value: '改制审计',
        },
        {
          title: '您公司的年营收是多少？',
          type: 'tab',
          tabWidthClass: 'tab-width-class2',
          options: ['0-50万', '50-200万', '200-500万', '500-1000万'],
          value: '0-50万',
          noMarginRight: ['200-500万'],
        },
        {
          title: '您公司的行业？',
          selectTitle: '请选择您的行业',
          type: 'dropdown',
          options: [
            { id: 1, name: '科技信息', color: '#5a79e8' },
            { id: 2, name: '广告传媒', color: '#222222' },
            { id: 3, name: '金融投资', color: '#222222' },
            { id: 4, name: '电子贸易', color: '#222222' },
            { id: 5, name: '教育培训', color: '#222222' },
            { id: 6, name: '物业地产', color: '#222222' },
            { id: 7, name: '经纪中介', color: '#222222' },
            { id: 8, name: '建筑装饰', color: '#222222' },
            { id: 9, name: '家居建材', color: '#222222' },
            { id: 10, name: '通讯网络', color: '#222222' },
            { id: 11, name: '实业生产', color: '#222222' },
            { id: 12, name: '珠宝服饰', color: '#222222' },
            { id: 13, name: '文化出版', color: '#222222' },
            { id: 14, name: '印刷包装', color: '#222222' },
            { id: 15, name: '餐饮美容', color: '#222222' },
            { id: 16, name: '咨询服务', color: '#222222' },
            { id: 17, name: '食品农业', color: '#222222' },
            { id: 18, name: '会务展览', color: '#222222' },
            { id: 19, name: '物流供应链', color: '#222222' },
            { id: 20, name: '商标资质', color: '#222222' },
            { id: 21, name: '其他行业', color: '#222222' },
          ],
          value: '主营业务1',
        },
      ],
      content: {
        revenue: '0-50万', // 营收金额
        business: '不限', // 是什么业务
        industry: '不限', // 是什么行业
      },
    }
  },
  mounted() {
    // 数据回显
    const sessionStorageFormData = JSON.parse(
      sessionStorage.getItem('formData')
    )
    if (sessionStorageFormData) {
      this.$nextTick(() => {
        this.$refs.revenueRef[0].dropdownValue =
          sessionStorageFormData.content['办理业务']
        this.content.business = sessionStorageFormData.content['办理业务']
        this.data[1].value = sessionStorageFormData.content['公司年营收']
        this.content.revenue = sessionStorageFormData.content['公司年营收']
        this.$refs.revenueRef[1].dropdownValue =
          sessionStorageFormData.content['公司行业']
        this.content.industry = sessionStorageFormData.content['公司行业']
      })
    }
  },
  methods: {
    // 处理由子组件RevenueRadio传来的营收金额
    radioValue(value) {
      this.content.revenue = value
    },
    // 处理由子组件Dropdown传来的值 index为0时是办理业务 index为2时是公司行业
    handleValue(value, index) {
      if (index === 0) {
        this.content.business = value
      } else if (index === 2) {
        this.content.industry = value
      }
    },
  },
}
</script>

<style scoped>
.content {
  width: calc(100% - 80px);
  margin: 0 auto;
  padding-bottom: calc(136px - 32px);
}
</style>
