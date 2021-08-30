<template>
  <div class="process" @click="close" @touchmove.stop.prevent>
    <div class="process_container" @click.stop>
      <div class="process_container_goods">
        <div class="goods_img">
          <sp-image :src="info.image" alt="" class="sp-image" srcset="" />
        </div>
        <div class="goods_info">
          <div class="goods_info_title">
            {{ goodsDetail.productName }}
          </div>
          <div v-if="!loading" class="goods_info_des" :style="desStyle">
            <span v-if="state == 2">已完成办理</span>
            <span v-else-if="state == 3">已超期，请联系规划师咨询</span>
            <span v-else-if="state == 1">预计{{ day }}天办理完成</span>
            <span v-else-if="state == 0">暂未开始办理</span>
          </div>
          <div v-if="!loading" class="goods_info_process">
            <div class="goods_info_process_line">
              <sp-progress
                color="#4974F5"
                stroke-width="0.08rem"
                :percentage="completePercentage"
                :show-pivot="false"
              />
            </div>
            <div class="goods_info_process_text">
              {{ completePercentage || 0 }}%
            </div>
          </div>
        </div>
      </div>
      <!-- {{ list }} -->
      <Steps v-if="state != 0" class="steps_container" :list="list">
        <template #left="row">
          <div class="time">{{ row.item.time }}</div>
          <div class="date">{{ row.item.date }}</div>
        </template>
      </Steps>
      <div v-if="state == 0 && loading == false" class="">
        <sp-empty
          class="empty-text"
          :description="list.length > 0 ? '暂未开始办理' : '暂无数据'"
          :image="imgAddress"
        />
      </div>

      <div class="process_container_close" @click="close"></div>
    </div>
  </div>
</template>
<script>
import { Progress, Image, Empty } from '@chipspc/vant-dgg'
import moment from 'moment'
import Steps from '@/components/common/Steps.vue'
import orderApi from '@/api/order'
export default {
  components: {
    [Image.name]: Image,
    [Progress.name]: Progress,
    [Empty.name]: Empty,

    Steps,
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      imgAddress: this.$ossImgSetV2('d4wtafx70s80000.png'),
      //  production_task_status_1("production_task_status_1", "待分配","未开始"),
      //  production_task_status_2("production_task_status_2", "待接收","未开始"),
      //  production_task_status_3("production_task_status_3", "办理中","办理中"),
      //  production_task_status_4("production_task_status_4", "审核中","办理中"),
      //  production_task_status_5("production_task_status_5", "暂停中","办理中"),
      //  production_task_status_6("production_task_status_6", "已完成","已完成"),
      //  production_task_status_7("production_task_status_7", "已取消","已取消"),

      production_task_status: {
        production_task_status_1: '未开始', // "待分配","未开始"
        production_task_status_2: '未开始', // "待接收","未开始"
        production_task_status_3: '处理中', // "办理中","办理中"
        production_task_status_4: '处理中', // "审核中","办理中"
        production_task_status_5: '处理中', // "暂停中","办理中"
        production_task_status_6: '已完成', // "已完成","已完成"
        production_task_status_7: '已取消', // "已取消","已取消"
      },

      loading: true,
      goodsDetail: {},
      // state: 0, // 0，未开始办理， 1 处理中 ，显示预计多少天，2已完成，3已超期
      day: 0, // 预计多少天完成
      completePercentage: 0, // 完成进度，0-100

      isStart: false, // 任务是否开始，判断未开始数量是否等于所有任务

      list: [
        // {
        //   status: 'more', // more,current,complete
        //   title: '查看更多任务节点',
        //   nodes: ['立案（未开始）', '立案（未开始）', '立案（未开始）'], // 更多节点
        // },
        // {
        //   status: 'current',
        //   title:
        //     '查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点',
        //   time: '07:23',
        //   date: '12-12',
        //   nodes: [], // 更多节点
        // },
        // {
        //   status: 'complete',
        //   title:
        //     '查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点',
        //   time: '07:23',
        //   date: '12-12',
        //   nodes: [], // 更多节点
        // },
      ],
    }
  },
  computed: {
    // 0，未开始办理， 1 办理中 ，显示预计多少天，2已完成，3已超期
    state() {
      let status = 0

      if (this.loading) {
        // 加载中
        return status
      }
      if (!this.isStart) {
        // 未开始
        return 0
      }
      if (this.goodsDetail.openTime) {
        // 有开始时间
        status = 1

        if (this.goodsDetail.deadlineTime) {
          //  = new Date(this.goodsDetail.deadlineTime) - new Date()
          // 年月日格式 ios处理不了
          const a = moment(this.goodsDetail.deadlineTime)
          const b = moment(new Date())
          const ex = a.diff(b, 'seconds')
          console.log('ex', ex)
          if (ex < 0) {
            // 是否超出预期时间
            status = 3
          }
        }
      }
      if (this.completePercentage === 100) {
        status = 2
      }

      return status
    },
    desStyle() {
      if (this.state === 0) {
        return {
          background: ' #f2f5ff',
          color: '#4974f5',
        }
      } else if (this.state === 1) {
        return {
          background: ' #f2f5ff',
          color: '#4974f5',
        }
      } else if (this.state === 2) {
        return {
          background: ' #F0F0F0',
          color: '#999999',
        }
      } else if (this.state === 3) {
        return {
          background: ' #FFF3E9',
          color: '#FE8C29',
        }
      }
      return {}
    },
  },
  mounted() {
    this.$xToast.showLoading({ message: '正在加载...' })

    this.getDetail()
    // this.getProcessList()
  },
  methods: {
    formatDate(time) {
      console.log('time', time)
      return moment(time).format('MM-DD')
    },
    formatTime(time) {
      return moment(time).format('HH:mm')
    },
    close() {
      this.$emit('close')
    },
    /**
{
  handlerCode: "U2120961052",
  handlerId: "732138509210770722",
  handlerMchId: "732138543570505097",
  handlerName: "郑有", // 办理人名称，服务人员名称
  nodeNum: 0, //完成节点数量
  orderDetailsId: "8098767941153914880", //订单明细ID
  orderProductId: "1260895651463849650", //订单产品ID
  productionId: "1260895514024880700", //生产单ID
  serviceExplain: "公司注册服务项3", //服务说明
  serviceName: "公司注册服务项3", //服务名称
  taskName: "公司注册服务项3",
  taskStatus: "production_task_status_6"
}
 */
    getProcessList() {
      orderApi
        .findTaskByOrder(
          { axios: this.axios },
          { orderDetailsId: this.info.detailId }
        )
        .then((data) => {
          console.log(data)

          // this.taskList = data

          this.list = []
          const more = {
            status: 'more', // more,current,complete
            title: '查看更多任务节点',
            nodes: [], // 更多节点
          }
          const completeNodes = [] // 已完成节点，需要排序

          data.map((item) => {
            item.taskStatusName = this.production_task_status[item.taskStatus]
            const info = {
              status: 'more', // more,current,complete
              title: item.serviceName + `（${item.taskStatusName}）`,
              // nodes: ['立案（未开始）', '立案（未开始）', '立案（未开始）'], // 更多节点
            }
            if (
              item.taskStatusName === '已完成' ||
              item.taskStatusName === '已取消'
            ) {
              info.status = 'complete'
              if (item.endTime) {
                item.endTime = parseInt(item.endTime)
                info.time = this.formatTime(item.endTime)
                info.date = this.formatDate(item.endTime)
                info.endTime = item.endTime
              }
              completeNodes.push(info)
            } else if (item.taskStatusName === '处理中') {
              info.status = 'current'
              this.list.push(info)
            } else if (item.taskStatusName === '未开始') {
              more.nodes.push(item.serviceName + `（${item.taskStatusName}）`)
            }
          })
          // 对已完成订单排序
          completeNodes.sort((a, b) => {
            return b.endTime - a.endTime
          })
          console.log('completeNodes', completeNodes)
          this.list.push(...completeNodes)
          if (more.nodes.length > 0) {
            this.list.unshift(more)
          }

          if (more.nodes.length === data.length) {
            this.isStart = false
          } else {
            this.isStart = true
          }
          if (completeNodes.length === data.length) {
            this.list.unshift({
              status: 'current',
              title: '办理完成',
            })
          }

          if (data.length > 0) {
            // 完成进度
            this.completePercentage =
              parseInt((completeNodes.length / data.length) * 100) || 0
          }
          this.loading = false
          this.$xToast.hideLoading()
          console.log(data)
        })
        .catch((err) => {
          this.loading = false
          console.error(err)
          this.$xToast.hideLoading()
          this.$xToast.show(err.message)
        })
    },
    getDetail() {
      // res.openTime 没有开始时间时 前端提示未开始
      orderApi
        .findProductionOrderByOrderDetailsId({
          orderDetailsId: this.info.detailId, // 订单详情ID
        })
        .then((res) => {
          console.log(res)
          this.goodsDetail = res
          let day = 0

          if (res.deadlineTime && res.openTime) {
            const a = moment(res.deadlineTime)
            const b = moment(res.openTime)

            day = a.diff(b, 'days')
            console.log(res.openTime, res.deadlineTime)
            console.log('day', day, parseInt(day))
          }
          this.day = parseInt(day) || 0
          this.getProcessList()
          // res.openTime 开始时间
          // res.deadlineTime 预计结束
        })
        .catch((err) => {
          this.loading = false
          console.error(err)
          this.$xToast.hideLoading()
          this.$xToast.show(err.message || '网络错误')
          // this.$router.back(-1)
        })
    },
  },
}
</script>
<style  lang="less" scoped>
.process {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  display: flex;
  align-items: center;
  justify-content: center;

  .process_container {
    position: relative;
    display: flex;
    flex-direction: column;

    width: 670px;
    height: 900px;
    max-height: 75%;
    // max-height: 50vh;

    box-sizing: border-box;
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 0 0;
    // overflow: auto;
    .steps_container {
      flex: 1;
      margin: 0px 0 40px;
    }
    .process_container_goods {
      display: flex;
      overflow: hidden;
      padding: 0px 30px 40px 40px;

      border-bottom: 1px solid #f4f4f4;
      .goods_img {
        flex-shrink: 0;
        width: 120px;
        height: 120px;
        background: #e3e3e3;
        border-radius: 4px;
        overflow: hidden;
      }
      .goods_info {
        flex: 1;
        overflow: hidden;
        margin-left: 20px;
        font-size: 0;
        .goods_info_title {
          height: 50px;
          font-family: PingFangSC-Medium;
          font-weight: bold;
          font-size: 36px;
          color: #222222;
          margin-bottom: 8px;
          .mixin-text-oneoverflow();
        }
        .goods_info_des {
          display: inline-block;
          height: 32px;
          line-height: 32px;
          padding: 0 8px;

          border-radius: 4px;

          font-family: PingFangSC-Regular;
          font-size: 22px;

          background: #f2f5ff;
          color: #4974f5;

          transform-origin: left top;
          transform: scale(0.91);

          margin-bottom: 4px;
        }
        .goods_info_process {
          display: flex;
          align-items: center;
          .goods_info_process_line {
            flex: 1;
          }
          .goods_info_process_text {
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #999999;
            letter-spacing: 0;
            text-align: right;
            margin-left: 22px;
            min-width: 50px;
            text-align: right;

            transform-origin: right center;
            transform: scale(0.83);
          }
        }
      }
    }

    .time {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      white-space: nowrap;
    }
    .date {
      white-space: nowrap;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;

      transform-origin: left top;
      transform: scale(0.83);
    }

    .process_container_close {
      position: absolute;
      bottom: -124px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 64px;
      height: 64px;
      background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/9bb2036m4oo0000.png);
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }

  .empty-text ::v-deep .sp-empty__description {
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #222222;
    font-weight: bold;
  }
}
</style>
