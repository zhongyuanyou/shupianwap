<template>
  <div class="title">
    {{ title }}
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.title {
  display: flex;
  height: 40px;
  font-size: 40px;
  font-weight: bold;
  color: #1a1a1a;
  line-height: 39px;
  margin-bottom: 34px;
}
</style>
