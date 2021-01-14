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
      <Dropdown
        v-if="item.type === 'dropdown'"
        :title="item.title"
        :options="item.options"
        :value.sync="item.value"
      />
    </div>
  </div>
</template>

<script>
import SelectTab from '~/components/spread/myDemandCard/agentBilling/SelectTab'
import Dropdown from '~/components/spread/myDemandCard/agentBilling/Dropdown'
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
