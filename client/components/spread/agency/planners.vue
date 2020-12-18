<template>
  <div class="planners">
    <span class="title">咨询规划师</span>
    <div class="plannerslist">
      <ul>
        <li v-for="(item, index) in plannerslist" :key="index">
          <router-link to="">
            <img src="" alt="" />
            <img src="" alt="" />
          </router-link>
          <div class="content">
            <span class="name">{{ item.name }}</span>
            <div class="points">
              <span>薯片分</span>
              <span>{{ item.points }}</span>
              |
              <span>服务次数</span>
              <span>{{ item.count }}</span>
            </div>
            <div class="labels">
              <ul>
                <li v-for="(v, i) in item.lable" :key="i">
                  <div>{{ v }}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="contact">
            <router-link to="" class="information">
              <my-icon
                name="notify_ic_chat"
                size="0.32rem"
                color="#4974F5"
              ></my-icon>
            </router-link>

            <router-link to="">
              <my-icon
                name="notify_ic_tel"
                size="0.32rem"
                color="#4974F5"
              ></my-icon>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: { MyIcon },
  props: {
    plannerslist: {
      type: Array,
      default: () => {},
    },
  },
}
</script>
<style lang="less" scoped>
.planners {
  width: 100%;
  padding-left: 40px;
  margin-top: 63px;
  .title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    display: block;
  }

  .plannerslist {
    margin-top: 31px;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    > ul {
      display: flex;
      &::after {
        content: '';
        border: 20px solid transparent;
      }
      > li {
        width: 660px;
        height: 207px;
        background: #ffffff;
        border: 1px solid rgba(205, 205, 205, 0.3);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        border-left: 8px solid#C1D4FC;
        display: flex;
        align-items: flex-start;
        padding: 40px 0 40px 40px;
        position: relative;
        &:not(:first-child) {
          margin-left: 20px;
        }
        > a {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #4974f5;
          position: relative;
          > img:last-child {
            width: 98px;
            height: 26px;
            background: linear-gradient(135deg, #ffeab9, #edcf98);
            border: 1px solid #dfb45a;
            border-radius: 13px;
            position: absolute;
            bottom: -3px;
          }
        }
        .content {
          flex: 1;
          margin-left: 25px;
          width: 495px;
          .name {
            display: block;
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 31px;
          }
          .points {
            display: block;
            margin-top: 23px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 23px;
            > span {
              line-height: 25px;
            }
          }
          .labels {
            margin-top: 16px;
            > ul {
              display: flex;
              > li {
                background: #f0f1f3;
                border-radius: 4px;
                // display: flex;
                // justify-content: center;
                // align-items: center;
                > div {
                  width: 104px;
                  height: 32px;
                  font-size: 22px;
                  font-family: PingFang SC;
                  font-weight: 400;
                  color: #68728d;
                  text-align: center;
                  vertical-align: middle;
                }
                &:not(:first-child) {
                  margin-left: 12px;
                }
              }
            }
          }
        }
      }
    }
    .contact {
      width: 148px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      top: 32px;
      right: 32px;
      > a {
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
}
</style>
