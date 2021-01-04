<template>
  <div>
    <h5>网管调用</h5>
    <sp-button type="primary" @click="handleGetEureka()">网管调用</sp-button>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import Http from '~/api/eureka'
export default {
  name: 'Eureka',
  components: {
    [Button.name]: Button,
  },
  methods: {
    handleGetEureka() {
      Http.queryEurekaUrl({
        id: '12',
        age: '12',
      }).then((res) => {
        console.log(res)
      })
    },
  },
}
</script>

<style scoped></style>
