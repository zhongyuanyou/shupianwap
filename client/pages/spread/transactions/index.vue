<template>
  <div class="center">
    <banner></banner>
    <my-form></my-form>
  </div>
</template>

<script>
import Banner from '~/components/spread/transactions/Banner'
import MyForm from '~/components/spread/transactions/MyForm'
export default {
  name: 'Index',
  components: { Banner, MyForm },
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
