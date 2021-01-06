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
        title-class="form-leftTitle"
        @click="show1 = true"
      />
      <sp-action-sheet v-model="show1">
        <sp-picker
          show-toolbar
          title="城市"
          :columns="actions1"
          :default-index="2"
          @confirm="onConfirm1"
          @cancel="onCancel"
        />
      </sp-action-sheet>
    </div>
    <!--  第四层  -->
    <div>
      <div class="form-title">您期待的公司行业是什么？</div>
      <sp-cell
        :title="selectName2"
        arrow-direction="down"
        is-link
        class="form-input"
        title-class="form-leftTitle"
        @click="show2 = true"
      />
      <sp-action-sheet v-model="show2"
        ><sp-picker
          show-toolbar
          title="行业"
          :columns="actions2"
          :default-index="2"
          @confirm="onConfirm2"
          @cancel="onCancel"
      /></sp-action-sheet>
    </div>
    <!--  按钮  -->
    <button class="form-button" @click="next">下一步(1/2)</button>
  </div>
</template>

<script>
import { Cell, ActionSheet, Picker, Toast } from '@chipspc/vant-dgg'
import slider from '~/components/spread/transactions/Slider'
export default {
  name: 'Form',
  components: {
    slider,
    [Cell.name]: Cell,
    [ActionSheet.name]: ActionSheet,
    [Picker.name]: Picker,
    [Toast.name]: Toast,
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
      actions1: [
        '全国',
        '成都',
        '北京',
        '上海',
        '广州',
        '深圳',
        '武汉',
        '长沙',
        '重庆',
        '杭州',
        '郑州',
        '石家庄',
        '佛山',
        '宜昌',
        '东莞',
        '不限',
      ],
      actions2: [
        '科技信息',
        '广告媒体',
        '金融投资',
        '电子贸易',
        '教育培训',
        '物业地产',
        '经济中介',
        '建筑装饰',
        '家居建材',
        '通讯网络',
        '实业生产',
        '珠宝服饰',
        '文化出版',
        '印刷包装',
        '餐饮美容',
        '咨询服务',
        '食品农业',
        '会务展览',
        '物流供应链',
        '商标资质',
        '其他行业',
      ],
      selectName1: '不限',
      selectName2: '不限',
    }
  },
  methods: {
    // 选中后的数据更改
    onConfirm1(value) {
      this.show1 = false
      this.selectName1 = value
    },
    onConfirm2(value) {
      this.show2 = false
      this.selectName2 = value
    },
    // 关闭
    onCancel() {
      this.show1 = false
      this.show2 = false
    },
    // 下一步
    next() {
      const data = {}
      data.content = {
        购买预算: `[${this.minMoney}, ${this.maxMoney}]`,
        期望成立年限: `[${this.minYear}, ${this.maxYear}]`,
        期望城市: this.selectName1,
        期望行业: this.selectName2,
      }
      data.type = 'gszr'
      localStorage.setItem('data', JSON.stringify(data))
      this.$router.push('/spread/second')
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
  &-leftTitle {
    font-size: 24px;
    font-weight: 400;
    color: #222;
  }
  &-blue {
    margin: 50px 0 38px 0;
    font-size: 44px;
    line-height: 44px;
    font-weight: bold;
    color: #4974f5;
    text-align: center;
  }
  &-value {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    line-height: 22px;
    font-weight: bold;
    color: #999999;
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
// 修改input组件的title
///deep/ .sp-cell__title {
//  font-size: 24px;
//  font-weight: 400;
//  color: #222222;
//}
// 修改input组件的容器
/deep/ .sp-cell {
  padding: 0 24px;
  height: 72px;
  align-items: center;
  border: 1px solid rgba(205, 205, 205, 0.5);
  border-radius: 4px;
}
//下拉弹出层的最大宽度
/deep/ .sp-popup {
  width: 750px;
  left: 50%;
  margin-left: -375px;
}
//下拉弹出遮罩层
/deep/ .sp-overlay {
  width: 750px;
  left: 50%;
  margin-left: -375px;
}
// 未选中时候
/deep/ .sp-picker-column__item {
  color: #555;
}
// 选中时候
/deep/ .sp-picker-column__item--selected {
  color: #222;
  font-weight: lighter;
}
//下拉弹窗标题样式
///deep/ .sp-action-sheet__header--title {
//  font-weight: bold;
//}
</style>
