<template>
  <div class="process" @click="close">
    <div class="process_container" @click.stop>
      <div class="process_container_goods">
        <div class="goods_img">
          <sp-image src="" alt="" class="sp-image" srcset="" />
        </div>
        <div class="goods_info">
          <div class="goods_info_title">
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </div>
          <div class="goods_info_des" :style="desStyle">预计10天办理完成</div>
          <div class="goods_info_process">
            <div class="goods_info_process_line">
              <sp-progress
                color="#4974F5"
                stroke-width="0.08rem"
                :percentage="50"
                :show-pivot="false"
              />
            </div>
            <div class="goods_info_process_text">77%</div>
          </div>
        </div>
      </div>

      <Steps :list="list">
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
  data() {
    return {
      list: [
        {
          status: 'more', // more,current,complete

          title:
            '查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点查看更多任务节点',
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

  methods: {
    close() {
      this.$emit('close')
    },
    getProcessList() {
      orderApi
        .getProcessList(
          { axios: this.$axios },
          { orderDetailsId: this.$route.query.detailId }
        )
        .then((res) => {
          this.hasList = true
          this.batchList = res
        })
    },
    getDetail() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.orderData.orderId, cusOrderId: this.orderData.cusOrderId }
        )
        .then((res) => {
          this.hasDetail = true
          const data = res.data ? res.data : res
          this.skuInfo = data.orderSkuList.filter((item) => {
            return item.skuId === this.orderData.skuId
          })[0]
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
    width: 670px;
    height: 900px;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 24px;
    padding: 40px 0;

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
