<template>
  <div>
    <Head :title="title"></Head>
    <Banner></Banner>
    <Serve></Serve>
  </div>
</template>

<script>
import Head from '~/components/common/head/header'
import Banner from '~/components/spread/tax/banner'
import Serve from '~/components/spread/tax/serve'
export default {
  name: 'TaxVue',
  components: {
    Head,
    Banner,
    Serve,
  },
  data() {
    return {
      title: '税务筹划',
    }
  },
}
</script>

<style scoped></style>
