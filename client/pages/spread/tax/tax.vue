<template>
  <div>
    <Head :title="title"></Head>
    <Banner></Banner>
    <Serve></Serve>
    <Conrult></Conrult>
    <Super></Super>
    <Process></Process>
    <Planner></Planner>
    <Maby></Maby>
    <Bottom></Bottom>
  </div>
</template>

<script>
import Head from '~/components/common/head/header'
import Banner from '~/components/spread/tax/banner'
import Serve from '~/components/spread/tax/serve'
import Conrult from '~/components/spread/tax/conrult'
import Super from '~/components/spread/tax/super'
import Process from '~/components/spread/tax/process'
import Planner from '~/components/spread/tax/planner'
import Maby from '~/components/spread/tax/maby'
import Bottom from '~/components/spread/tax/bottom'
export default {
  name: 'TaxVue',
  components: {
    Head,
    Banner,
    Serve,
    Conrult,
    Super,
    Process,
    Planner,
    Maby,
    Bottom,
  },
  data() {
    return {
      title: '税务筹划',
    }
  },
}
</script>

<style scoped></style>
