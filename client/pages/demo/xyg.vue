<template>
  <div>
    <OpenApp />
    <br />
    <InstallApp />
  </div>
</template>

<script>
import OpenApp from '@/components/app/OpenApp'
import InstallApp from '@/components/app/InstallApp'
export default {
  name: 'xyg',
  components: {
    OpenApp,
    InstallApp,
  },
}
</script>

<style scoped></style>
