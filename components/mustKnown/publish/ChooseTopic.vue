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
        <span> + 话题({{ topics.length }}/5)</span>
        <span
          v-for="(item, index) in topics"
          :key="index"
          class="topic1-item"
          >{{ item.name }}</span
        >
      </div>
    </div>
    <sp-popup v-model="showPop" position="bottom">
      <div class="page-inner">
        <div class="title">
          <sp-button type="default" class="btn1" @click="cancel"
            >取消</sp-button
          >
          选择话题
          <sp-button class="btn2" @click="submit">确定</sp-button>
        </div>
        <div class="main">
          <div class="left">
            <div
              v-for="(item, index) in list1"
              :key="index"
              class="item"
              :class="selectIndex === index ? 'activeItem' : ''"
              @click="chooseList1(index)"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="right">
            <sp-checkbox-group v-model="result">
              <sp-cell-group>
                <sp-cell
                  v-for="(item, index) in list2"
                  :key="index"
                  clickable
                  :title="item.name"
                  @click="toggle(index)"
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
import { dict } from '@/api/index'
let timer
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
      showPop: false,
      list1: [
        {
          code: 'DONT_NEED',
          name: '热门',
          children: [
            {
              code: '1313',
              name: '分类11',
            },
            {
              code: '111',
              name: '分类12',
            },
            {
              code: '112',
              name: '分类13',
            },
            {
              code: '113',
              name: '分类11',
            },
            {
              code: '114',
              name: '分类12',
            },
            {
              code: '115',
              name: '分类13',
            },
            {
              code: '116',
              name: '分类11',
            },
            {
              code: '117',
              name: '分类12',
            },
            {
              code: '118',
              name: '分类13',
            },
          ],
        },
        {
          code: 'DONT_NEED',
          name: '精选',
          children: [
            {
              code: '119',
              name: '分类16',
            },
            {
              code: '120',
              name: '分类27',
            },
            {
              code: '13113',
              name: '分类33',
            },
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
          ],
        },
        {
          code: 'DONT_NEED',
          name: '精选',
          children: [
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
          ],
        },
        {
          code: 'DONT_NEED',
          name: '精选',
          children: [
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
            {
              code: 'ORDER_REPEAT',
              name: '分类12',
            },
            {
              code: 'ORTHER_REASON',
              name: '分类13',
            },
          ],
        },
        {
          code: 'DONT_NEED',
          name: '精选',
          children: [
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
          ],
        },
        {
          code: 'DONT_NEED',
          name: '精选',
          children: [
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
          ],
        },
        {
          code: 'DONT_NEED',
          name: '精选',
          children: [
            {
              code: 'WRONG_PRO_CHOOSE',
              name: '分类11',
            },
          ],
        },
      ],
      list2: [],
      form: {
        reason: '',
      },
      selectIndex: 0,
    }
  },
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
  mounted() {
    this.list2 = this.list1[0].children
  },
  beforeDestroy() {
    if (timer) clearTimeout(timer)
  },
  methods: {
    chooseList1(index) {
      this.list2 = this.list1[index].children
      this.selectIndex = index
      this.result = []
    },
    openModal() {
      this.showPop = true
    },
    submit() {
      console.log('this.result', this.result)
      this.showPop = false
      this.topics = this.result
      const arr = this.result.map((item) => {
        return item.name
      })
      this.$emit('setTopic', this.result)
    },
    cancel() {
      this.showPop = false
      timer = setTimeout(() => {
        this.step = 1
      }, 300)
    },
    toggle(index) {
      // if (this.result.length > 4) {
      //   this.$xToast.show({
      //     message: '最多可选择五个话题哦',
      //     duration: 1000,
      //     icon: 'toast_ic_remind',
      //     forbidClick: true,
      //   })
      //   return
      // }
      this.$refs.checkboxes[index].toggle()
      console.log('result', this.result)
      console.log('index', index)
    },
  },
}
</script>

<style lang="less" scoped>
.choose-topic {
  height: 28px;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  line-height: 88px;
  padding-left: 40px;
  .item {
    margin-right: 10px;
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
.sp-cell {
  padding: 16px 32px;
}
.select-topics-area {
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  line-height: 28px;
  span {
    display: inline-block;
  }
  .topic1-item {
    margin-left: 10px;
    background: #f2f5ff;
    border-radius: 24px;
    padding: 12px;
  }
}
</style>
