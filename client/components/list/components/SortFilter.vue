<template>
  <sp-dropdown-item
    v-model="selectValue"
    :title="dropdownTitle"
    title-class="dropdownItem"
    :options="option"
    @open="open"
    @close="close"
  />
</template>

<script>
import { DropdownItem } from '@chipspc/vant-dgg'
export default {
  name: 'SortFilter',
  components: {
    [DropdownItem.name]: DropdownItem,
  },
  props: {
    filterData: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      moreTextCss: '',
      dropdownTitle: '',
      selectValue: '',
      option: [],
    }
  },
  watch: {
    filterData(val) {
      if (val && JSON.stringify(val) !== '{}') {
        this.initOption(val)
      }
    },
  },
  mounted() {
    if (this.filterData && JSON.stringify(this.filterData) !== '{}') {
      this.initOption(this.filterData)
    }
  },
  methods: {
    open() {},
    close() {},
    initOption(data) {
      this.dropdownTitle = data.title
      data.filters.forEach((item) => {
        this.option.push({
          text: item.name,
          value: item.id,
        })
      })
    },
  },
}
</script>

<style scoped></style>
