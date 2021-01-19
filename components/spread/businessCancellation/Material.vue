<template>
  <div class="material">
    <my-title title="公司注销所需资料" />
    <div class="content-box">
      <ul class="material-box">
        <li v-for="(item, i) of materialData" :key="i" class="material-item">
          <span>{{ i + 1 }}</span>
          {{ item }}
        </li>
      </ul>
      <div class="tips">
        注：注销类型不同，所需资料也有不同，详情请咨询规划师
      </div>
    </div>
    <!-- 咨询电话 -->
    <div class="tel">
      <consult-tel
        title=""
        desc="咨询热线:"
        md-type="new"
        md-name="工商注销所需资料_立即咨询"
      />
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
      materialData: [
        '营业执照正副本原件',
        '相关租赁凭证、租赁合同及承租发票',
        '税控器和剩余空白发票',
        '近三年财务报表及记账凭证',
        '公章及刻章备案登记卡',
        '缴税单据（即银行缴税的流水单）',
        '成立时的相关章程',
        '社保相关资料',
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
.material {
  width: 100%;
  padding: 33px 40px 0px;
}
.content-box {
  width: 100%;
  margin-bottom: 32px;
  .material-box {
    list-style: none;
    margin-bottom: 31px;
    .material-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 30px;
      font-size: 24px;
      font-weight: 400;
      color: #555555;
      &:not(:last-child) {
        margin-bottom: 24px;
      }
      > span {
        display: flex;
        justify-content: center;
        line-height: 29px;
        width: 30px;
        height: 30px;
        background: #222222;
        border-radius: 50%;
        font-size: 24px;
        font-weight: 400;
        color: #ffffff;
        margin-right: 17px;
      }
    }
  }
  .tips {
    font-size: 24px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 23px;
  }
}
.tel {
  width: 100%;
  margin-left: -40px;
}
</style>
