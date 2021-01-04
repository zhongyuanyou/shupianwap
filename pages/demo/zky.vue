<template>
  <div>
    <div @click="show = true">点击</div>
    <CitySelect :show.sync="show" :city-data="cityData" @select="select" />
    <div style="width: 100%; height: 300px">
      <CoupleSelect
        :city-data="city"
        :back-data="backData"
        @select="coupleSelect"
      />
    </div>
    <div @click="clear">清空</div>
  </div>
</template>

<script>
import CitySelect from '~/components/common/areaSelected/AreaSelect'
import CoupleSelect from '~/components/common/coupleSelected/CoupleSelect'
import { city } from '~/utils/city'
export default {
  name: 'Zky',
  components: {
    CitySelect,
    CoupleSelect,
  },
  data() {
    return {
      show: false,
      cityData: [],
      backData: [],
    }
  },
  computed: {
    city() {
      return city
    },
  },
  methods: {
    showPopup() {
      this.show = true
    },
    select(data) {
      this.cityData = data
      console.log('返回的数据', data)
    },
    coupleSelect(data) {
      console.log(data)
    },
    clear() {
      this.backData = []
    },
  },
}
</script>

<style scoped></style>
