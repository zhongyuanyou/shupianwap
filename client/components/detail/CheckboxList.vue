<template>
  <div class="check-box-list">
    <sp-checkbox-group v-model="result">
      <sp-cell-group>
        <sp-cell
          v-for="(item, index) in list"
          :key="index"
          :title="`${item.title}`"
          :label="`售价: ${item.price}`"
          clickable
          @click="toggle(index)"
        >
          <template #right-icon>
            <sp-checkbox ref="checkboxes" :name="item" />
          </template>
        </sp-cell>
      </sp-cell-group>
    </sp-checkbox-group>
    <div class="submit">
      <sp-button type="danger" block round @click="onSubmit()">
        确认选择
      </sp-button>
    </div>
  </div>
</template>
<script>
import {
  Checkbox,
  CheckboxGroup,
  Cell,
  CellGroup,
  Button,
} from '@chipspc/vant-dgg'
export default {
  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      // 存储选择的结果
      result: [],
    }
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
    },
    onSubmit() {
      // 提交选择信息
      console.log(this.result)
    },
  },
}
</script>
<style lang="less" scoped>
.check-box-list {
  // 列表内容样式
  .sp-cell {
    padding: 31px 40px 31px 40px;
    /deep/.sp-cell__label {
      color: #ec5330 !important;
      // padding: 31px 8px 31px 9px;
    }
  }
  .sp-cell:first-child {
    padding-top: 7px;
  }

  .submit {
    width: 85%;
    position: fixed;
    bottom: 15px;
    right: 7.5%;
  }
}
</style>
