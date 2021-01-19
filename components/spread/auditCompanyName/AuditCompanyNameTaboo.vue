<template>
  <div class="audit-company-name-taboo">
    <h6>{{ audittaboo.title }}</h6>
    <div class="audit-company-name-taboo__list">
      <ul>
        <li v-for="(item, index) of audittaboo.taboo" :key="index">
          <img :src="item.img" alt="" />
          <span>{{ item.details }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuditCompanyNameTaboo',
  components: {},
  props: {
    audittaboo: {
      type: Object,
      default: () => {},
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
.audit-company-name-taboo {
  font-weight: bold;
  font-size: 28px;
  position: relative;
  h6 {
    font-size: 40px;
    margin-left: 39px;
    color: #1a1a1a;
  }
  &__list {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 32px;
      li {
        margin-top: 32px;
        width: 187px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 72px;
          height: 72px;
        }
        span {
          width: 125px;
          margin-top: 20px;
          font-size: 28px;
          font-weight: 400;
          text-align: center;
          color: #222;
          margin-bottom: 32px;
          line-height: 38px;
        }
      }
      &::after {
        content: ''; /*CSS伪类用法*/
        position: absolute; /*定位背景横线的位置*/
        background: #edf1fe; /*宽和高做出来的背景横线*/
        width: 1px;
        left: 50%;
        top: 108px;
        height: 417px;
      }
      &::before {
        content: ''; /*CSS伪类用法*/
        position: absolute; /*定位背景横线的位置*/
        background: #edf1fe; /*宽和高做出来的背景横线*/
        width: 1px;
        left: 187px;
        top: 108px;
        height: 417px;
      }
    }
  }
  &::after {
    content: ''; /*CSS伪类用法*/
    position: absolute; /*定位背景横线的位置*/
    background: #edf1fe; /*宽和高做出来的背景横线*/
    width: 1px;
    left: 561px;
    top: 108px;
    height: 417px;
  }
  &::before {
    content: ''; /*CSS伪类用法*/
    position: absolute; /*定位背景横线的位置*/
    top: 58%;
    background: #edf1fe; /*宽和高做出来的背景横线*/
    width: 670px;
    left: 40px;
    height: 1px;
  }
}
</style>
