<template>
  <section>
    <div class="choose-topic" @click="openModal">
      <p v-if="!topics.length">
        <my-icon
          name="spiconfont-nav_ic_abb"
          size="0.28rem"
          color="rgba(73, 116, 245, 1)"
        ></my-icon>
        + 话题 (至少添加一个)
      </p>
      <div v-else class="select-topics-area">
        <span class="topic-item"> + 话题({{ topics.length }}/5)</span>
        <span
          v-for="(item, index) in topics"
          :key="index"
          class="topic1-item"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <sp-popup v-model="showPop" position="bottom" @close="closePop">
      <div class="page-inner">
        <div class="title">
          <sp-button type="default" class="btn1" @click="cancel"
            >取消</sp-button
          >
          <span class="title-t">选择话题</span>
          <sp-button class="btn2" @click="submit">确定</sp-button>
        </div>
        <div class="main">
          <div class="left">
            <div
              v-for="item in list1"
              :key="item.id"
              class="item"
              :class="selectIndex === item.id ? 'activeItem' : ''"
              @click="chooseList1(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="right">
            <sp-checkbox-group v-model="result" @change="changeTopic">
              <sp-cell-group>
                <sp-cell
                  v-for="item in list2"
                  :key="item.id"
                  clickable
                  :title="item.name"
                >
                  <template #right-icon>
                    <sp-checkbox ref="checkboxes" :name="item" />
                  </template>
                </sp-cell>
              </sp-cell-group>
            </sp-checkbox-group>
          </div>
        </div>
      </div>
    </sp-popup>
  </section>
</template>

<script>
// 选择按钮和话题弹窗
import {
  Popup,
  Button,
  CellGroup,
  Cell,
  CheckboxGroup,
  Checkbox,
} from '@chipspc/vant-dgg'
import knownApi from '@/api/known'

// let timer
export default {
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
  },
  props: {
    // 内容类型 文章 问题
    contentType: {
      type: Number,
      default: 1,
    },
    // 话题数组
    topicsArr: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      result: [],
      showPop: false, // 控制图层关闭展开
      list1: [], // 一级列表
      list2: [], // 二级列表
      form: {
        reason: '',
      },
      selectIndex: 0,
      maxArr: [],
      topics: [],
      submitFlag: false, // 设置是否更新result数据
      backupResult: [],
      backupId: '',
    }
  },
  /*
  computed: {
    topics: {
      set(val) {
        return val
      },
      get() {
        return this.topicsArr || []
      },
    },
  },
  */
  mounted() {
    this.topicApi()
  },
  /*
  beforeDestroy() {
    if (timer) clearTimeout(timer)
  },
  */
  methods: {
    chooseList1(item) {
      this.list2 = item.childrenList || []
      this.selectIndex = item.id
      this.result = []
      if (this.backupId === item.id) {
        this.renderResultView()
      } else {
        this.result = []
      }
    },
    openModal() {
      this.showPop = true
    },
    submit() {
      this.showPop = false
      this.topics = this.result
      // start: 备份result 数据,并且设置提交标识
      this.backupResult = this.result
      this.submitFlag = true
      this.backupId = this.result[0].pid
      // end: 备份result 数据,并且设置提交标识
      const arr = this.result.map((item) => {
        return item.name
      })
      this.$emit('setTopic', this.result)
    },
    cancel() {
      this.showPop = false
      /*
      timer = setTimeout(() => {
        this.step = 1
      }, 300)
      */
    },
    /*
    toggle(e, index) {
      console.log('toggle', index)
      if (this.result.length > 4) {
        this.$refs.checkboxes[index].toggle()
        console.log('result', this.result)
        console.log('index', index)
      }
    },
    */
    changeTopic(val) {
      if (val.length === 5) {
        this.maxArr = val
      } else if (this.result.length > 5) {
        this.$xToast.show({
          message: '最多可选择五个话题哦',
          duration: 1000,
          icon: 'toast_ic_remind',
          forbidClick: true,
        })
        this.result = this.maxArr
        this.$forceUpdate()
      } else {
        this.result = val
      }
    },
    async topicApi() {
      try {
        const params = {
          level: 2,
        }
        const { code, data } = await this.$axios.get(knownApi.content.topic, {
          params,
        })
        if (code === 200) {
          if (data.length > 0) {
            this.list1 = data
            if (this.list1[0].childrenList.length > 0) {
              this.list2 = this.list1[0].childrenList
            }
            this.selectIndex = data[0].pid
          }
        }
      } catch (e) {}
    },
    closePop() {
      if (this.submitFlag) {
        this.submitFlag = false
      } else {
        this.renderResultView()
      }
    },
    renderResultView() {
      this.result = this.backupResult
      for (let i = 0, l = this.backupResult.length; i < l; i++) {
        this.$set(this.result, i, this.backupResult[i])
      }
      console.log(`closepop: ${JSON.stringify(this.result)}`)
    },
  },
}
</script>

<style lang="less" scoped>
.choose-topic {
  position: fixed;
  left: 0;
  bottom: 120px;
  height: 80px;
  padding: 20px 0 0 40px;
  width: 100%;
  overflow-x: scroll;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  background: white;
  border-top: 1px solid #ddd;
  z-index: 2;
  .item {
    margin-right: 10px;
  }
  p {
    line-height: 44px;
  }
}
.sp-popup--bottom {
  border-radius: 24px 24px 0px 0px;
}
.page-inner {
  position: relative;
  min-height: 400px;
  max-height: 1200px;
  .title {
    height: 136px;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
    width: 100%;
    height: 136px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    font-size: 40px;
    font-weight: 500;
    color: #000000;
    line-height: 136px;
    position: relative;
    .btn1 {
      position: absolute;
      left: 40px;
      color: #555555;
      font-size: 32px;
      top: 20px;
      border: none;
    }
    .btn2 {
      position: absolute;
      right: 40px;
      color: rgba(73, 116, 245, 1);
      font-size: 32px;
      top: 20px;
      border: none;
    }
    .title-t {
      font-size: 40px;
      font-weight: bold;
    }
  }
  .main {
    display: flex;
    width: 100%;
    height: 600px;
    .left {
      width: 240px;
      overflow: scroll;
      background: #f0f0f0;
      .item {
        height: 84px;
        line-height: 84px;
        color: #222222;
        text-align: center;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
      }
    }
    .right {
      width: 100%;
      height: auto;
      overflow: scroll;
      flex: 1;
      line-height: 84px;
      margin-bottom: 10px;
    }
  }
  .toast-area {
    width: 100%;
    height: 171px;
    background: #f8f8f8;
    border-radius: 8px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #555555;
    line-height: 36px;
    padding: 40px;
    .p2 {
      width: 100%;
      height: 61px;
      font-size: 26px;
      color: #999999;
    }
  }
}
.activeItem {
  background: #ffffff;
  color: rgba(34, 34, 34, 1);
}
.activeItem2 {
  color: rgba(73, 116, 245, 1);
}
/deep/.sp-cell {
  padding: 16px 32px;
  .sp-checkbox__icon {
    .sp-icon {
      border-radius: 1px;
    }
  }
}
.select-topics-area {
  position: absolute;
  width: auto;
  overflow-x: scroll;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  line-height: 28px;
  white-space: nowrap;
  span {
    display: inline-block;
  }
  .topic-item {
    padding: 12px;
  }
  .topic1-item {
    margin-left: 10px;
    background: #f2f5ff;
    border-radius: 24px;
    padding: 12px;
  }
}
</style>
