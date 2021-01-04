<template>
  <div class="content">
    <div v-for="item in data" :key="item.title">
      <SelectTab
        v-if="item.type === 'tab'"
        :value.sync="item.value"
        :tabs="item.options"
        :title="item.title"
        :tab-width-class="item.tabWidthClass"
        :no-margin-right="item.noMarginRight"
      />
      <Dropdown v-if="item.type === 'dropdown'" />
    </div>
  </div>
</template>

<script>
import SelectTab from '@/components/spread/agentBillingDemandCard/SelectTab'
import Dropdown from '@/components/spread/agentBillingDemandCard/Dropdown'
export default {
  name: 'Question',
  components: {
    SelectTab,
    Dropdown,
  },
  data() {
    return {
      data: [
        {
          title: '您的公司注册多久了？',
          type: 'tab',
          tabWidthClass: 'tab-width-class1',
          options: ['还未注册', '1个月', '3个月', '半年以上'],
          value: '还未注册',
          noMarginRight: ['半年以上'],
        },
        {
          title: '您公司的主营业务是什么？',
          type: 'dropdown',
          options: [
            '主营业务1',
            '主营业务2',
            '主营业务3',
            '主营业务4',
            '主营业务5',
          ],
          value: '主营业务1',
        },
        {
          title: '您的公司是否支持开发票？',
          type: 'tab',
          tabWidthClass: 'tab-width-class2',
          options: ['是', '否'],
          value: '是',
        },
        {
          title: '您的公司年收入大概是多少？',
          type: 'tab',
          tabWidthClass: 'tab-width-class2',
          options: ['20-100万', '100-500万', '500-1000万', '1000-2000万'],
          value: '20-100万',
          noMarginRight: ['500-1000万'],
        },
      ],
    }
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
