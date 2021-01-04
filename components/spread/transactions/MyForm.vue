<template>
  <div class="form">
    <!--  第一层  -->
    <div>
      <div class="form-title">您购买公司的预算是?</div>
      <div class="form-blue">{{ minMoney }}-{{ maxMoney }}万元</div>
      <slider type="money"></slider>
      <div class="form-value">
        <div v-for="(item, index) of moneys" :key="index">{{ item }}</div>
      </div>
    </div>
    <!--  第二层  -->
    <div>
      <div class="form-title">你想购买成立多少年的公司</div>
      <div class="form-blue">{{ minYear }}-{{ maxYear }}年</div>
      <slider type="year"></slider>
      <div class="form-value">
        <div v-for="(item, index) of years" :key="index">{{ item }}</div>
      </div>
    </div>
    <!--  第三层  -->
    <div>
      <div class="form-title">您想要的公司注册城市？</div>
      <sp-cell
        :title="selectName1"
        arrow-direction="down"
        is-link
        class="form-input"
        :title-class="selectName1 === '不限' ? { gray: true } : { black: true }"
        @click="show1 = true"
      />
      <sp-action-sheet
        v-model="show1"
        :actions="actions1"
        close-on-click-action
        @select="onSelect(1, $event)"
      />
    </div>
    <!--  第四层  -->
    <div>
      <div class="form-title">您期待的公司行业是什么？</div>
      <sp-cell
        :title="selectName2"
        arrow-direction="down"
        is-link
        class="form-input"
        :title-class="selectName2 === '不限' ? { gray: true } : { black: true }"
        @click="show2 = true"
      />
      <sp-action-sheet
        v-model="show2"
        :actions="actions2"
        close-on-click-action
        @select="onSelect(2, $event)"
      />
    </div>
    <!--  按钮  -->
    <button class="form-button">下一步(1/2)</button>
  </div>
</template>

<script>
import { Cell, ActionSheet } from '@chipspc/vant-dgg'
import slider from '~/components/spread/transactions/Slider'
export default {
  name: 'Form',
  components: {
    slider,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet,
  },
  data() {
    return {
      moneys: ['2万', '50万', '100万', '150万', '200万'],
      years: ['0年', '5年', '10年', '15年', '20年'],
      minMoney: 50,
      maxMoney: 150,
      minYear: 5,
      maxYear: 15,
      show1: false,
      show2: false,
      actions1: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      actions2: [{ name: '选项四' }, { name: '选项五' }, { name: '选项六' }],
      selectName1: '不限',
      selectName2: '不限',
    }
  },
  methods: {
    // 改变选中样式
    onSelect(i, e) {
      let items
      if (i === 1) {
        items = this.actions1
        this.selectName1 = e.name
      } else if (i === 2) {
        items = this.actions2
        this.selectName2 = e.name
      }
      for (const item of items) {
        if (item.name === e.name) {
          item.className = 'bold'
        } else {
          item.className = ''
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.form {
  padding: 0px 40px 24px;
  &-title {
    font-size: 36px;
    line-height: 36px;
    font-weight: bold;
    color: #1a1a1a;
    margin-top: 63px;
  }
  &-blue {
    margin: 50px 0 38px 0;
    font-size: 44px;
    font-weight: bold;
    color: #4974f5;
    text-align: center;
  }
  &-value {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    line-heigth: 22px;
    font-weight: bold;
    color: #999999;
    margin-top: 11px;
  }
  &-input {
    margin-top: 31px;
  }
  &-button {
    margin-top: 56px;
    background: #4974f5;
    padding: 0;
    width: 670px;
    height: 88px;
    border-radius: 8px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
  }
}
.bold {
  font-weight: bold;
  color: #5a79e8;
}
.gray {
  font-size: 24px;
  font-weight: 400;
  color: #222222;
}
.black {
  color: #1a1a1a;
  font-weight: bold;
}
// 修改input组件的title
///deep/ .sp-cell__title {
//  font-size: 24px;
//  font-weight: 400;
//  color: #222222;
//}
// 修改input组件的容器
/deep/ .sp-cell {
  padding: 0 10px;
  height: 72px;
  align-items: center;
  border: 1px solid rgba(205, 205, 205, 0.5);
  border-radius: 4px;
}
</style>
