<template>
  <div class="planner">
    <div class="planner-title">咨询规划师</div>
    <div class="planner-content">
      <div class="planner-content-left">
        <div class="planner-content-left-person">
          <div class="planner-content-left-person-font">金牌规划师</div>
        </div>
        <div class="planner-content-left-content">
          <div class="planner-content-left-content-name">郭亮亮</div>
          <div class="planner-content-left-content-count">
            薯片分 138 | 服务次数 258
          </div>
          <div class="planner-content-left-content-tab">
            <div v-for="(tab, i) of tabs" :key="i">{{ tab }}</div>
          </div>
        </div>
        <div class="planner-content-left-icon">
          <div style="margin-right: 0.2rem">
            <my-icon
              name="notify_ic_chat"
              color="#4974F5"
              size="0.16rem"
              class="icon"
            ></my-icon>
          </div>
          <div>
            <my-icon
              name="notify_ic_tel"
              color="#4974F5"
              size="0.16rem"
              class="icon"
            ></my-icon>
          </div>
        </div>
      </div>
      <div class="planner-content-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Planner',
  data() {
    return {
      img: require('~/assets/spreadImages/tax/busi_img_swchbg01.png'),
      tabs: ['工商注册', '财税咨询', '税务筹划'],
    }
  },
}
</script>

<style scoped lang="less">
.planner {
  width: 750px;
  height: 349px;
  padding: 30px 0 40px 40px;
  &-title {
    font-size: 40px;
    line-height: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 32px;
  }
  &-content {
    display: flex;
    &-left {
      width: 660px;
      height: 207px;
      background: url('~assets/spreadImages/tax/busi_img_swchbg01.png');
      background-size: 100% 100%;
      border: 1px solid rgba(205, 205, 205, 0.4);
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      display: flex;
      position: relative;
      &-person {
        margin: 40px 25px 67px 40px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: gray;
        &-font {
          padding: 5px 9px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #9b6809;
          background: linear-gradient(135deg, #ffeab9, #edcf98);
          border: 1px solid #dfb45a;
          border-radius: 13px;
          position: absolute;
          bottom: 42px;
          left: 19px;
        }
      }
      &-content {
        margin-top: 40px;
        &-name {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          margin-bottom: 23px;
          height: 32px;
          line-height: 32px;
        }
        &-count {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          margin-bottom: 16px;
          height: 24px;
          line-height: 24px;
        }
        &-tab {
          display: flex;
          div {
            width: 104px;
            height: 32px;
            background: #f0f1f3;
            border-radius: 4px;
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #68728d;
            margin-right: 12px;
          }
        }
      }
      &-icon {
        display: flex;
        height: 64px;
        position: absolute;
        top: 32px;
        right: 32px;
        div {
          width: 64px;
          height: 64px;
          background: #ebf3ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    &-right {
      width: 8px;
      height: 207px;
      background: #c1d4fc;
      border-radius: 2px;
      margin-left: 20px;
    }
  }
}
</style>
