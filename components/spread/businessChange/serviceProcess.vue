<template>
  <div class="serviceProcess">
    <span class="title">服务流程</span>
    <div class="process-box">
      <ul>
        <li v-for="(item, index) in processList" :key="index">
          <div class="process-icon">
            <img :src="item.img" alt="" />
            <div class="line"></div>
          </div>
          <div class="process-content">
            <span>{{ item.title }}</span>
            <span>{{ item.content }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      processList: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/e40octgfhfk0000.png',
          title: '线上下单',
          content: '2小时内专业商务咨询确认工商变更信息',
        },
        {
          code: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ctki21e076g0000.png',
          title: '收集资料',
          content: '服务顾问根据变更内容向您收集相应手续资料',
        },
        {
          code: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/9arkao051iw0000.png',
          title: '材料递交',
          content: '专业人员撰写申请材料',
        },
        {
          code: 4,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/arqcokbao200000.png',
          title: '提交资料',
          content: '专人提交至工商管理局',
        },
        {
          code: 5,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2eza6e5hqmm8000.png',
          title: '变更成功',
          content: '领取变更后的营业执照',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.serviceProcess {
  width: 100%;
  padding: 31px 40px 38px;
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .process-box {
    margin-top: 43px;
    > ul {
      > li {
        display: flex;
        align-items: flex-start;
        &:not(:first-child) {
          margin-top: 10px;
        }
        &:last-child {
          .process-icon {
            .line {
              display: none;
            }
          }
        }
        .process-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          > img {
            width: 80px;
            height: 80px;
          }
          .line {
            width: 2px;
            height: 28px;
            background: #eaeaea;
            border: 2px dashed #4974f5;
            opacity: 0.4;
            margin-top: 10px;
          }
        }
        .process-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 40px;
          margin-top: 8px;
          > span {
            display: block;
            &:first-child {
              font-size: 28px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #222222;
              line-height: 27px;
            }
            &:last-child {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #555555;
              line-height: 24px;
              margin-top: 19px;
            }
          }
        }
      }
    }
  }
}
</style>
