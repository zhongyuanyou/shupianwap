<template>
  <div v-html="payHtml"></div>
  <!-- <div>
    <Iframe
      v-show="payHtml"
      id="mainIframe"
      style="width: 400px; height: 700px"
      :src="payPageUrl"
    ></Iframe>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      closeAppOpen: 44,
    }
  },
  mounted() {
    this.payHtml = localStorage.getItem('payHtml')
    document.forms[0].submit()
  },
}
</script>
