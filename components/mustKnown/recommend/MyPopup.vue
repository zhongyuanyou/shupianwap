<template>
  <sp-popup
    v-model="showPop"
    position="bottom"
    class="popup"
    :overlay-style="{ background: 'rgba(0, 0, 0, 0.4)' }"
  >
    <div class="popContentOne">
      <div class="popTop">
        <span class="popTop_title">全部板块</span>
        <div class="my_icon close_btn" @click="closePop()">×</div>
      </div>
      <div class="popMiddle">
        <div class="spans">
          <div class="popMiddle_span1">我的板块</div>
        </div>
        <div class="popMiddle_span3" @click="editIcon(status)">
          {{ editFinish }}
        </div>
      </div>
      <div class="list">
        <div class="list_items">
          <div
            v-for="(item, index) in myPlate"
            :key="index"
            :class="status ? '' : index < 3 ? 'active' : ''"
            class="item"
          >
            {{ item }}
            <my-icon
              v-show="showIcon"
              name="guanbi_mian"
              size="0.28rem"
              color="#dddddd"
              class="my_icon"
              :class="index < 3 ? 'iconactive' : ''"
              @click.native="deleteToMyPlate(index)"
            ></my-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="popContentTwo">
      <div class="popBottom">
        <div class="spans">
          <div class="popBottom_span1">更多板块</div>
        </div>
      </div>
      <div class="list">
        <div class="list_items">
          <div v-for="(item, index) in morePlate" :key="index" class="item">
            {{ item }}
            <my-icon
              v-show="showIcon"
              name="fabu_mian"
              size="0.28rem"
              color="#dddddd"
              class="my_icon"
              @click.native="addToMyPlate(index)"
            ></my-icon>
          </div>
        </div>
      </div>
    </div>
  </sp-popup>
</template>
<script>
import { Popup } from '@chipspc/vant-dgg'
export default {
  name: 'MyPopup',
  components: {
    [Popup.name]: Popup,
  },

  props: {
    showPop: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      loading: false,
      finished: true,
      isLoading: false,
      pages: 0,
      status: true,
      commentShow: false,
      articleId: '1',
      showIcon: false,
      editFinish: '编辑',
      myPlate: [
        '关注',
        '推荐',
        '热榜',
        '法律',
        '交易',
        '知产',
        '知识',
        '互联网',
        '工商注册',
        '办证',
        '刻章',
      ],
      morePlate: [
        '关注',
        '推荐',
        '热榜',
        '法律',
        '交易',
        '知产',
        '知识',
        '互联网',
        '工商注册',
        '办证',
        '刻章',
      ],
    }
  },
  watch: {
    normalListData(newData, oldData) {
      console.log('newData', newData)
    },
  },
  methods: {
    // 进入文章/问题/回答详情页面
    goDetailPage(type, id) {
      if (type === 1) {
        this.$router.push({
          path: '/known/detail/question',
          query: {
            id,
          },
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/known/detail/article',
          query: {
            id,
          },
        })
      } else if (type === 3) {
        this.$router.push({
          path: '/known/detail/answer',
          query: {
            id,
          },
        })
      }
    },
    // 进入用户详情
    goUserDetail(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
    // 编辑
    editIcon(status) {
      if (status) {
        this.showIcon = true
        this.editFinish = '完成'
        this.status = false
      } else {
        this.showIcon = false
        this.editFinish = '编辑'
        this.status = true
      }
    },
    // 添加到我的列表中
    addToMyPlate(index) {
      const arrayValue = this.morePlate[index]
      if (arrayValue) {
        this.myPlate.push(arrayValue)
        this.morePlate.pop(index)
      }
    },
    closePop() {
      this.showPop = false
    },
  },
}
</script>
<style lang="less" scoped>
.close_btn {
  background: #f5f5f5;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 40px;
  color: #999999;
  line-height: 48px;
  text-align: center;
}
.popup {
  height: 1012px;
  background: #ffffff;
  border-radius: 24px 24px 0px 0px;
  padding: 0 40px;
  .popContentOne {
    .popTop {
      display: flex;
      height: 120px;
      align-items: center;
      justify-content: space-between;
      .popTop_title {
        height: 40px;
        font-size: 40px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #222222;
      }
      .my_icon {
        width: 48px;
        height: 48px;
      }
    }
    .popMiddle {
      // height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .spans {
        height: 50px;
        display: flex;
        align-items: center;
        .popMiddle_span1 {
          height: 30px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 30px;
        }
        .popMiddle_span2 {
          height: 24px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
          margin-left: 15px;
        }
      }

      .popMiddle_span3 {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 28px;
      }
    }
    .list {
      .list_items {
        display: flex;
        flex-flow: row wrap;
        .item {
          width: 154px;
          height: 88px;
          background: #f5f5f5;
          border-radius: 44px;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 8px 0;
          position: relative;
          margin-right: 18px;
          > .my_icon {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        div:nth-child(4n + 4) {
          margin-right: 0;
        }
      }
    }
  }
  .popContentTwo {
    margin-top: 72px;
    .popBottom {
      // height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .spans {
        height: 50px;
        display: flex;
        align-items: center;
        .popBottom_span1 {
          height: 30px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 30px;
        }
        .popBottom_span2 {
          height: 24px;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 24px;
          margin-left: 15px;
        }
      }

      .popBottom_span3 {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #4974f5;
        line-height: 28px;
      }
    }
    .list {
      .list_items {
        display: flex;
        flex-flow: row wrap;
        .item {
          width: 154px;
          height: 88px;
          background: #f5f5f5;
          border-radius: 44px;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 8px 0;
          position: relative;
          margin-right: 18px;
          > .my_icon {
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        div:nth-child(4n + 4) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
