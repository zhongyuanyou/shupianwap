<template>
  <div class="planner">
    <div class="planner_title">
      <h2>{{ plannersCommon.title }}</h2>
    </div>
    <div class="planner-flex">
      <sp-swipe
        :autoplay="3000"
        indicator-color="white"
        :show-indicators="false"
        class="planner-content my-swipe"
      >
        <sp-swipe-item
          v-for="(item, i) of plannersData"
          :key="i"
          class="planner-content-item"
          @click="openIm(i)"
        >
          <div class="planner-content-item-shadow">
            <div class="planner-content-item-shadow-person">
              <div
                class="planner-content-item-shadow-person-img"
                :style="
                  item.avatarImg === ''
                    ? {
                        backgroundImage: `url(http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg)`,
                      }
                    : { backgroundImage: `url(${item.avatarImg})` }
                "
              ></div>
              <div class="planner-content-item-shadow-person-font">
                金牌规划师
              </div>
            </div>
            <div class="planner-content-item-shadow-content">
              <div class="planner-content-item-shadow-content-name">
                {{ item.name }}
              </div>
              <div class="planner-content-item-shadow-content-count">
                薯片分 {{ item.shuPianFen }} | 服务次数 {{ item.serverNum }}
              </div>
              <div class="planner-content-item-shadow-content-tab">
                <div v-for="(tab, j) of item.labels" :key="j">{{ tab }}</div>
              </div>
            </div>
            <div class="planner-content-item-shadow-icon">
              <a
                v-sensorsTrack:p_IMClick="{
                  name: `许可证咨询规划师_在线咨询`,
                  im_type: '售前',
                }"
                href="javascript:void(0)"
                @click.stop="openIm(i)"
              >
                <div style="margin-right: 0.2rem">
                  <my-icon
                    name="notify_ic_chat"
                    color="#4974F5"
                    size="0.32rem"
                    class="icon line"
                  ></my-icon></div
              ></a>
              <a
                v-sensorsTrack:p_IMClick="{
                  name: `许可证咨询规划师_拨打电话`,
                  im_type: '售前',
                }"
                href="javascript:void(0)"
                @click.stop="tel(i, $event)"
              >
                <div>
                  <my-icon
                    name="notify_ic_tel"
                    color="#4974F5"
                    size="0.32rem"
                    class="icon line"
                  ></my-icon></div
              ></a>
            </div>
          </div>
          <div class="planner-content-item-space"></div>
        </sp-swipe-item>
      </sp-swipe>
      <div class="planner-right"></div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from '@chipspc/vant-dgg'
export default {
  name: 'GuihuashiSwipe',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  props: {
    // 每一个模块的规划师信息
    plannersData: {
      type: Array,
      default: () => {
        return [
          {
            id: '7862495547640840192',
            type: '金牌规划师',
            avatarImg: '',
            name: '郭亮亮',
            shuPianFen: 11,
            serverNum: 250,
            telephone: 17717888696,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: '107547',
          },
          {
            id: '7862495547640840192',
            type: '金牌规划师',
            avatarImg: '',
            name: '郭美美',
            shuPianFen: 11,
            serverNum: 250,
            telephone: 17717999666,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: '107547',
          },
          {
            id: '7862495547640840192',
            type: '金牌规划师',
            avatarImg: '',
            name: '郭津津',
            shuPianFen: 11,
            serverNum: 250,
            telephone: 17717111222,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: '107547',
          },
        ]
      },
    },
    // 该模块的标题
  },
  data() {
    return {
      url: '',
      plannersCommon: {
        title: '企服专家咨询',
        imName: '税务筹划_咨询规划师_在线咨询',
        telName: '税务筹划_咨询规划师_拨打电话',
      },
    }
  },
  methods: {
    // icon点击触发，无需判断
    openIm(i) {
      this.$root.$emit(
        'openIMM',
        this.plannersData[i].id,
        this.plannersData[i].name,
        this.plannersData[i].jobNum,
        this.plannersData[i].avatarImg
      )
    },
    tel(i, e) {
      window.location.href = `tel:${this.plannersData[i].telephone}`
    },
  },
}
</script>

<style scoped lang="less">
.planner {
  width: @spread-page-width;
  // height: 349px;
  padding: 0px 0 0 40px;
  &-title {
    font-size: 40px;
    line-height: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 32px;
  }
  &-flex {
    display: flex;
    position: relative;
    height: 207px;
  }
  &-content {
    width: 688px;
    position: absolute;
    left: 0;
    z-index: 3;
    &-item {
      display: flex;
      &-shadow {
        width: 660px;
        height: 207px;
        background: url('https://cdn.shupian.cn/sp-pt/wap/5ejpgusuwn80000.png');
        background-size: 101% 101%;
        border: 1px solid rgba(205, 205, 205, 0.3);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        display: flex;
        position: relative;
        // margin-bottom: 40px;
        &-person {
          margin: 0 -15px 27px 0;
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
          &-img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background-position: center center;
            background-size: 100% 100%;
          }
          &-font {
            height: 26px;
            line-height: 24px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #9b6809;
            background: linear-gradient(135deg, #ffeab9, #edcf98);
            border: 1px solid #dfb45a;
            border-radius: 13px;
            position: absolute;
            bottom: 37px;
            padding: 0 9px;
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
              text-align: center;
              width: 104px;
              height: 32px;
              background: #f0f1f3;
              border-radius: 4px;
              font-size: 22px;
              line-height: 32px;
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
          a {
            z-index: 1;
            div {
              width: 64px;
              height: 64px;
              background: #ebf3ff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              .line {
                line-height: 32px;
              }
            }
          }
        }
      }
      &-space {
        width: 20px;
      }
    }
  }
  &-right {
    width: 8px;
    height: 207px;
    background: #c1d4fc;
    border-radius: 2px;
    position: absolute;
    right: 24px;
    z-index: 1;
  }
}
/deep/ .planner_title {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: 64px;
  margin-bottom: 27px;
  > h2 {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
    padding-bottom: 5px;
  }
}
</style>
