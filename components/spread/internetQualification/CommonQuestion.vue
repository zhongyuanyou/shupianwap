<template>
  <div class="component">
    <div class="title">常见问题</div>
    <div class="content">
      <div v-for="(item, index) in questions" :key="index" class="item">
        <div class="item-row">
          <div class="item-img">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/es4fhh9woko0000.png"
            />
          </div>
          <div class="item-question-desc">{{ item.question }}</div>
        </div>
        <div class="item-row">
          <div class="item-img">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/4n0lt7hu7b40000.png"
            />
          </div>
          <div class="item-answer-desc">{{ item.answer }}</div>
        </div>
        <div class="item-btn">咨询更多>></div>
      </div>
    </div>
    <sp-button plain type="primary">展开更多</sp-button>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
export default {
  name: 'CommonQuestion',
  components: {
    [Button.name]: Button,
  },
  data() {
    return {
      questions: [
        {
          question:
            '不符合当地文化管理部门的最低技术人才要求 怎么办怎么办怎么办怎么办',
          answer: '薯片APP人才库可为您解决',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.component {
  width: calc(100% - 80px);
  margin: 0 auto;
  .title {
    font-size: 40px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 40px;
  }

  .content {
    width: 100%;
    .item {
      width: 100%;
      background: #f8f8f8;
      border-radius: 8px;
      padding: 30px 30px 24px 30px;
      .item-row {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20px;
        .item-img {
          width: 40px;
          height: 40px;
          margin-right: 14px;
          img {
            display: flex;
            width: 40px;
            height: 40px;
          }
        }
        .item-question-desc {
          width: calc(100% - 54px);
          flex: none;
          font-size: 28px;
          font-weight: 600;
          color: #222222;
          line-height: 42px;
        }
        .item-answer-desc {
          flex: none;
          font-size: 24px;
          font-weight: 400;
          color: #555555;
          line-height: 36px;
        }
      }
      .item-btn {
        font-size: 24px;
        font-weight: 400;
        text-decoration: underline;
        color: #4974f5;
        line-height: 36px;
        margin-left: 54px;
      }
    }
  }
  // 穿透修改-按钮：定制需求按钮
  /deep/ .sp-button {
    width: 278px;
    height: 64px;
    line-height: 64px;
    user-select: none;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    border-radius: 32px;
    font-size: 28px !important;
    font-weight: 400;
    color: #999999;
  }
  // 穿透-按钮：当手指点击按钮时显示蓝底白字，移开手指恢复之前样式
  /deep/ .sp-button:active {
    background: #4974f5 !important;
    color: #ffffff !important;
    transition: all 0.1s;
    -moz-transition: all 0.1s;
  }
}
</style>
