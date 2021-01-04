<template>
  <div class="requisitionForm">
    <TopLocation />
    <div class="content">
      <!-- <h6>您还有一些额外需求要告知我们？</h6> -->
      <sp-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="300"
        placeholder="更准确地描述需求，将有助于我们为您更好服务"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { Field } from '@chipspc/vant-dgg'
import TopLocation from '@/components/spread/companyAlteration/TopLocation'
export default {
  components: {
    [Field.name]: Field,
    TopLocation,
  },
}
</script>
<style lang="less" scoped>
.requisitionForm {
  .content {
    h6 {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    /deep/.sp-field {
      width: 670px;
      height: 290px;
      background: #ffffff;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 4px;
      .sp-field__word-limit {
        display: block;
        vertical-align: bottom;
      }
    }
  }
}
</style>
