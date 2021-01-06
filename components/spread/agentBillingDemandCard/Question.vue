<template>
  <div class="content">
    <div v-for="item in $parent.questionData" :key="item.title">
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
}
</script>

<style scoped>
.content {
  width: calc(100% - 80px);
  margin: 0 auto;
  height: auto;
}
</style>
