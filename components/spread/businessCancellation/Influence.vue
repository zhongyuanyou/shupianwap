<template>
  <div class="influence">
    <div class="influence-content">
      <my-title title="公司不经营也不注销的影响" />
      <ul class="content-box">
        <li v-for="(item, i) of influenceData" :key="i" class="box-item">
          <img
            class="icon"
            src="https://cdn.shupian.cn/sp-pt/wap/a50jnoxjag00000.png"
            alt=""
          />
          <div class="desc">
            <span
              v-for="(value, index) of item"
              :key="index"
              :class="{ emphasize: value.emphasize }"
              >{{ value.content }}</span
            >
          </div>
        </li>
      </ul>
      <div class="tel">
        <consult-tel
          desc="杜绝风险:"
          title=""
          md-type="new"
          md-name="工商注销影响_立即咨询"
        ></consult-tel>
      </div>
    </div>
  </div>
</template>

<script>
import MyTitle from '@/components/spread/businessCancellation/MyTitle'
import ConsultTel from '@/components/spread/businessCancellation/ConsultTel'

export default {
  components: {
    MyTitle,
    ConsultTel,
  },
  props: {},
  data() {
    return {
      influenceData: [
        [
          { content: '税务局上门', emphasize: false },
          { content: '检查', emphasize: true },
        ],
        [
          { content: '发票被', emphasize: false },
          { content: '锁机', emphasize: true },
        ],
        [
          { content: '限制', emphasize: false },
          { content: '出境', emphasize: true },
          { content: '及', emphasize: false },
          { content: '高消', emphasize: true },
        ],
        [
          { content: '进入经营', emphasize: false },
          { content: '异常目录', emphasize: true },
        ],
        [
          { content: '法人代表', emphasize: false },
          { content: '不能领取', emphasize: true },
          { content: '养老保险', emphasize: false },
        ],
        [
          { content: '影响', emphasize: false },
          { content: '征信', emphasize: true },
        ],
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.influence {
  width: 100%;
}
.influence-content {
  width: 100%;
  padding: 31px 41px 0px 40px;
}
.content-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  list-style: none;
  .box-item {
    width: 215px;
    height: 190px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    margin-bottom: 12px;
    padding: 0px 21px;

    .icon {
      display: block;
      width: 48px;
      height: 48px;
      margin-left: 65px;
      margin-top: 32px;
      margin-bottom: 18px;
    }
    .desc {
      font-size: 24px;
      font-weight: 400;
      line-height: 1;
      text-align: center;
      color: #555555;
      line-height: 32px;
      > .emphasize {
        color: #f1524e;
        font-weight: bold;
      }
    }
  }
}
.tel {
  width: 100%;
  margin-left: -40px;
  margin-top: 20px;
}
</style>
