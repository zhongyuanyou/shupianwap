<template>
  <div class="process" @click="close">
    <div class="process_container" @click.stop>
      <div class="process_container_goods">
        <div class="goods_img">
          <sp-image src="" alt="" class="sp-image" srcset="" />
        </div>
        <div class="goods_info">
          <div class="goods_info_title">
            {{ goodsDetail.orderGoodsName }}
          </div>
          <div class="goods_info_des" :style="desStyle">
            预计{{ day }}天办理完成
          </div>
          <div class="goods_info_process">
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
      <Steps class="steps_container" :list="list">
        <template #left="row">
          <div class="time">{{ row.item.time }}</div>
          <div class="date">{{ row.item.date }}</div>
        </template>
      </Steps>

      <div class="process_container_close" @click="close"></div>
    </div>
  </div>
</template>
<script>
import { Progress, Image } from '@chipspc/vant-dgg'
import Steps from '@/components/common/Steps.vue'
import orderApi from '@/api/order'

export default {
  components: {
    [Image.name]: Image,
    [Progress.name]: Progress,
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
      //  production_task_status_1("production_task_status_1", "待分配","未开始"),
      //  production_task_status_2("production_task_status_2", "待接收","未开始"),
      //  production_task_status_3("production_task_status_3", "办理中","办理中"),
      //  production_task_status_4("production_task_status_4", "审核中","办理中"),
      //  production_task_status_5("production_task_status_5", "暂停中","办理中"),
      //  production_task_status_6("production_task_status_6", "已完成","已完成"),
      //  production_task_status_7("production_task_status_7", "已取消","已取消"),

      status: {
        production_task_status_1: '未开始', // "待分配","未开始"
        production_task_status_2: '未开始', // "待接收","未开始"
        production_task_status_3: '办理中', // "办理中","办理中"
        production_task_status_4: '办理中', // "审核中","办理中"
        production_task_status_5: '办理中', // "暂停中","办理中"
        production_task_status_6: '已完成', // "已完成","已完成"
        production_task_status_7: '已取消', // "已取消","已取消"
      },

      goodsDetail: {},
      day: 0, // 预计多少天完成
      completePercentage: 0,
      list: [
        {
          status: 'more', // more,current,complete
          title: '查看更多任务节点',
          nodes: ['立案（未开始）', '立案（未开始）', '立案（未开始）'], // 更多节点
        },
        {
          status: 'current', // more,current,complete
          title:
            '查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点',
          time: '07:23',
          date: '12-12',
          nodes: [], // 更多节点
        },
        {
          status: 'complete', // more,current,complete
          title:
            '查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点',
          time: '07:23',
          date: '12-12',
          nodes: [], // 更多节点
        },
      ],
    }
  },
  computed: {
    desStyle() {
      const state = 3
      if (state === 1) {
        return {
          background: ' #f2f5ff',
          color: '#4974f5',
        }
      } else if (state === 2) {
        return {
          background: ' #F0F0F0',
          color: '#999999',
        }
      } else if (state === 3) {
        return {
          background: ' #FFF3E9',
          color: '#FE8C29',
        }
      }
      return {}
    },
  },
  mounted() {
    this.getProcessList()
    this.getDetail()
  },
  methods: {
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
  taskName: "公司注册服务项3", //taskName
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
          let completeNum = 0 // 完成节点数量

          data.map((item) => {
            item.taskStatusName = this.status[item.taskStatus]
            const info = {
              status: 'more', // more,current,complete
              title: item.taskName + `（${item.taskStatusName}）`,
              // nodes: ['立案（未开始）', '立案（未开始）', '立案（未开始）'], // 更多节点
            }
            if (item.taskStatusName === '已完成') {
              completeNum++
              info.status = 'complete'
              this.list.push(info)
            } else if (item.taskStatusName === '办理中') {
              info.status = 'current'
              this.list.push(info)
            } else if (item.taskStatusName === '未开始') {
              more.nodes.push(item.taskName + `（${item.taskStatusName}）`)
            }
          })

          if (more.nodes.length > 0) {
            this.list.unshift(more)
          } else {
            this.list.unshift({
              status: 'current',
              title: '办理完成',
            })
          }
          if (data.length > 0) {
            // 完成进度
            this.completePercentage = parseInt(
              (completeNum / data.length) * 100
            )
          }
          console.log(data)
        })
        .catch((err) => {
          console.error(err)
          this.$xToast.show(err.message)
        })
    },
    getDetail() {
      orderApi
        .findProductionOrderByOrderDetailsId(
          {
            orderDetailsId: this.info.detailId,
            // orderDetailsId: this.info.cusOrderId,
          }
          // orderProductId 生产单ID
          // orderDetailsId 订单详情ID
        )
        .then((res) => {
          console.log(res)
          this.goodsDetail = res
          let day = 0
          if (res.deadlineTime) {
            day =
              (new Date(res.deadlineTime) - new Date(res.openTime)) /
              1000 /
              60 /
              60 /
              24
            console.log(res.openTime, res.deadlineTime)
            console.log('day', day, parseInt(day))
          }
          this.day = parseInt(day)
          // res.openTime 开始时间
          // res.deadlineTime 预计结束
        })
        .catch((err) => {
          console.error(err)
          this.$xToast.show(err.message)
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
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 0 0;
    // overflow: auto;
    .steps_container {
      flex: 1;
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
    }
    .date {
      font-family: PingFangSC-Regular;
      font-size: 20px;
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
}
</style>
