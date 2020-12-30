<template>
  <div class="standard">
    <div class="standard-item">
      <sp-cell
        v-md-map
        v-md:webClick
        data-name="工商注册_办理标准_查看更多"
        value-class="right-value"
        title-class="left-title"
        :title="title"
        is-link
        arrow-direction="down"
        value="查看更多"
        @click="show = true"
      />
      <sp-action-sheet v-model="show" :actions="content" @select="onSelect" />
      <div class="content">
        <div v-for="(item, index) of content" :key="index">
          <div
            v-show="item.flag"
            class="content-item"
            v-html="item.content"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cell, CellGroup, ActionSheet, Toast, Image } from '@chipspc/vant-dgg'
export default {
  name: 'Standard',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: ActionSheet,
    [Image.name]: Image,
  },
  data() {
    return {
      title: '注册标准',
      show: false,
      active: 2,
      content: [
        {
          name: '注册标准',
          content: `<p>注册标准</p> <p>(1）股东符合法定人数共同出资设立</p>
            <p>(2）股东出资达到法定资本最低限度（不同公司最低限度不同）</p>
            <p>(3）股东共同制定公司章程；</p>
            <p>(4）有公司名称;</p>
            <p>(5）有固定的生产经营场所和必要的生产经营条件。</p>`,
          flag: true,
          color: '#5a79e8',
        },
        {
          name: '个体商户',
          content: `<p>注册标准</p> <p>（1）注册资金：没有最低要求</p>
            <p>（2）名称要求：可以使用名称，也可以不用名称，但使用名称的个体工商户，需要申请并核准登记后才可以使用。</p>`,
          flag: false,
        },
        {
          name: '股份有限公司注册',
          content: `<p>注册标准</p> <p>（1）发起人符合法定人数，其中须有半数以上的发起人在中国境内有住所。</p>
            <p>（2）有符合公司章程规定的全体发起人认购的股本数额或者募集的实收股本总额。</p>
            <p>（3）股份发行、筹办事项符合法律规定，在发起人认购的股份缴足前，不得向他人募集股份。</p>
            <p>（4）发起人制订公司章程，同时要载明公司法第81规定的事项。</p>
            <p>（5）有公司名称，建立符合股份有限公司要求的组织机构。</p>`,
          flag: false,
        },
      ],
    }
  },
  methods: {
    onSelect(action, index) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.title = action.name
      this.content.forEach((element) => {
        element.flag = false
        if (element.name === this.title) element.color = '#5a79e8'
        else element.color = '#232124'
      })
      this.content[index].flag = true
      this.show = false
    },
  },
}
</script>
<style lang="less" scoped>
.standard {
  .standard-item {
    width: 669px;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 8px;
    .sp-cell {
      background-color: #f4f7fe;
      .right-value {
        font-size: 26px;
        font-weight: 400;
        color: #4974f5;
      }
      .left-title {
        font-size: 32px;
        font-weight: 500;
        color: #4974f5;
      }
      i {
        color: #4974f5;
      }
    }
    .content {
      padding: 26px 35px 28px 31px;
      font-size: 28px;
      color: #555555;
      line-height: 42px;
      /deep/.content-item {
        p:first-child {
          color: #222222;
          font-weight: 600;
        }
      }
    }
  }
  /deep/ .sp-overlay,
  .sp-popup--bottom {
    margin-left: -375px;
    width: @spread-page-width;
    left: 50%;
  }
}
</style>
