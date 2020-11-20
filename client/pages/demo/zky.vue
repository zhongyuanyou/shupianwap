<template>
  <div>
    <button @click="showPopup">显示</button>
    {{ JSON.stringify(cityData) }}
    <CitySelect :show.sync="show" @select="select" />
  </div>
</template>

<script>
import CitySelect from '~/components/coupletSelected/CitySelect'
export default {
  name: 'Zky',
  components: {
    CitySelect,
  },
  data() {
    return {
      show: false,
      cityData: [],
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    select(data) {
      this.cityData = data
    },
  },
}
</script>

<style scoped></style>
