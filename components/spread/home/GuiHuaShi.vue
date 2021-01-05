<template>
  <div class="guihuashi">
    <div class="title">企服规划师</div>
    <div class="all-guihuashi">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="guihuashi-item"
        :style="{
          marginRight: index + 1 != list.length ? `${20 / 100}rem` : '0',
        }"
      >
        <div class="guihuashi-img">
          <img src="" />
          <label class="guihuashi-img-desc" style=""></label>
        </div>
        <div class="guihuashi-desc">
          <p class="guihuashi-desc-name">
            <span>{{ item.name }}</span>
          </p>
          <p class="guihuashi-desc-text">
            <span>薯片分</span>
            <span>{{ item.shuPianFen }}</span>
            <span>|</span>
            <span>服务次数</span>
            <span>{{ item.serverNum }}</span>
          </p>
          <div class="guihuashi-desc-labels">
            <label v-for="label in item.labels" :key="label">{{ label }}</label>
          </div>
        </div>
        <div class="guihuashi-icons">
          <a>
            <div class="icon">
              <my-icon
                name="notify_ic_chat"
                size="0.32rem"
                color="#4974f5"
              ></my-icon>
            </div>
          </a>
          <a>
            <div class="icon">
              <my-icon
                name="notify_ic_tel"
                size="0.32rem"
                color="#4974f5"
              ></my-icon>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuiHuaShi',
  data() {
    return {
      list: [
        {
          id: 1,
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
        },
        {
          id: 2,
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
        },
        {
          id: 3,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.guihuashi {
  width: 100%;
  padding: 30px 0px 30px 40px;
  font-family: PingFang SC;

  .title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 30px;
  }

  .all-guihuashi {
    width: 100%;
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
    .guihuashi-item {
      flex: none;
      width: 660px;
      height: 207px;
      border: 1px solid rgba(205, 205, 205, 0.5);
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 40px;
      border-left: 8px solid #c1d4fc;
      display: flex;
      position: relative;

      .guihuashi-icons {
        position: absolute;
        right: 40px;
        top: 40px;
        display: flex;
        .icon {
          width: 64px;
          height: 64px;
          background: #ebf3ff;
          border-radius: 64px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 20px;
        }
      }
      .guihuashi-img {
        flex: none;
        width: 100px;
        height: 100px;
        background-color: #24ae68;
        border-radius: 100px;
        margin-right: 20px;
        position: relative;
        .guihuashi-img-desc {
          width: 100%;
          height: 26px;
          display: block;
          margin: 0 auto;
          font-size: 16px;
          line-height: 16px;
          font-weight: bold;
          color: #9b6809;
          padding: 5px 9px;
          position: absolute;
          background: linear-gradient(135deg, #ffeab9, #edcf98);
          border: 1px solid #dfb45a;
          border-radius: 13px;
          bottom: 0px;
        }
      }
      .guihuashi-desc {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .guihuashi-desc-name {
          font-size: 32px;
          line-height: 32px;
          font-weight: bold;
          color: #222222;
          margin-bottom: 20px;
        }
        .guihuashi-desc-text {
          font-size: 24px;
          line-height: 24px;
          font-weight: 400;
          color: #222222;
          margin-bottom: 16px;
        }
        .guihuashi-desc-labels {
          display: flex;
          justify-content: flex-start;
          label {
            display: block;
            padding: 5px 9px;
            color: #68728d;
            font-size: 22px;
            line-height: 22px;
            font-weight: 400;
            background: #f0f1f3;
            margin-right: 12px;
          }
        }
      }
    }
  }
  .all-guihuashi::-webkit-scrollbar {
    width: 0;
  }
  .all-guihuashi::after {
    width: 40px;
    border: 20px solid transparent;
    content: '1';
    opacity: 0;
    background-color: transparent;
    font-size: 1px;
  }
}
</style>
