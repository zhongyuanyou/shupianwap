<template>
  <div>
    <button @click="openIM">打开对话框</button>
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import dggImCompany from '@/components/spread/dggImCompany'
export default {
  name: 'IMExample',
  components: {
    dggImCompany,
  },
  methods: {
    openIM() {
      // 7862495547640840192：规划师id
      // 张毅：规划师名字
      // 107547：规划师工号，可不传
      this.$root.$emit('openIMM', '7862495547640840192', '张毅', '107547')
    },
  },
}
</script>

<style scoped></style>
