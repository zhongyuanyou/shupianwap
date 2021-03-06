<template>
  <div class="sp-bottom">
    <div class="sp-bottom__lf">
      <img
        class="img"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
      />
      <div class="info">
        <div class="info-name">
          <span>{{ info.name }}</span>
        </div>
        <div class="info-identity">
          <span>金牌规划师</span>
        </div>
      </div>
    </div>
    <div class="sp-bottom__rt">
      <div class="btn">
        <span>在线资讯</span>
      </div>
      <div class="btn">
        <span>电话联系</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpBottom',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          name: '规划师', // 规划师姓名
          tel: '', // 规划师电话
          id: '', // 规划师id
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.sp-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  height: 143.9px;
  background-color: #ffffff;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  flex-direction: row;

  // padding-bottom: env(safe-area-inset-bottom);
  &__lf {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;

    > .img {
      width: 80px;
      height: 80px;
      border-radius: 40px;
    }

    .info {
      height: 80px;
      margin-left: 24px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;

      &-name {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }

      &-identity {
        width: 125px;
        height: 32px;
        background: #ffefc5;
        border: 2px solid #dac79a;
        border-radius: 4px;
        text-align: center;
        line-height: 32px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #7b6225;
      }
    }
  }

  &__rt {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;

    .btn {
      border-radius: 8px;
      line-height: 96px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      width: 168px;
      height: 96px;

      &:first-child {
        background: #24ae68;
      }

      &:last-child {
        background: #4974f5;
        margin-left: 16px;
      }
    }
  }
}
</style>
