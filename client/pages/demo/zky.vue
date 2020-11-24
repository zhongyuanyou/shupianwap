<template>
  <div>
    <button @click="showPopup">显示</button>
    {{ JSON.stringify(cityData) }}
    <CitySelect :show.sync="show" :city-data="cityData" @select="select" />
    <div style="width: 100%; height: 300px">
      <CoupleSelect :city-data="city" @select="coupleSelect" />
    </div>
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
    },
    coupleSelect(data) {
      console.log(data)
    },
  },
}
</script>

<style scoped></style>
