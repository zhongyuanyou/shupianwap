<template>
  <div class="center">
    <banner @changeCity="changeCity"></banner>
    <my-form @changeData="changeData"></my-form>
  </div>
</template>

<script>
import Banner from '~/components/spread/transactions/Banner'
import MyForm from '~/components/spread/transactions/MyForm'
export default {
  name: 'Index',
  components: { Banner, MyForm },
  data() {
    return {
      city: '成都市',
    }
  },
  methods: {
    changeCity(val) {
      this.city = val
    },
    changeData(data) {
      const datas = {}
      datas.content = data
      datas.place = this.city
      datas.type = 'gszr'
      localStorage.setItem('data', JSON.stringify(datas))
    },
  },
  head() {
    return {
      title: '公司交易',
    }
  },
}
</script>

<style scoped>
.center {
  width: 750px;
  margin: 0 auto;
}
</style>
