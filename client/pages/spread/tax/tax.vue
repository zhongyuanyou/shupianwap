<template>
  <div>
    <Head :title="title"></Head>
    <Banner></Banner>
  </div>
</template>

<script>
import Head from '@/components/common/head/header'
import Banner from '@/components/spread/tax/banner'
export default {
  name: 'TaxVue',
  components: {
    Head,
    Banner,
  },
  data() {
    return {
      title: '税务筹划',
    }
  },
}
</script>

<style scoped></style>
