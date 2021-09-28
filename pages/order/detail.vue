<template>
  <div ref="scrollView" class="pay-page" @scroll="scollChange">
    <Header v-show="showHead" title="订单详情"> </Header>
    <section v-if="hasData">
      <Banner
        v-if="orderData.statusName"
        :order-status-code="orderData.orderSplitAndCusVo.cusOrderStatusNo"
        :cus-order-status-type="cusOrderStatusType"
        :cus-order-id="orderData.cusOrderId"
        :cus-order-cancel-reason="canCelReasonName"
        :status-name="orderData.statusName"
        :show-pay-btn="showPayBtn"
        :order-data="orderData"
        @getDetail="getDetail"
      />
      <div class="order-area">
        <!-- 服务 -->
        <ServeList
          v-if="orderData.orderProTypeNo.match('PRO_CLASS_TYPE_SERVICE')"
          :order-data="orderData"
          :cus-order-status-type="cusOrderStatusType"
          :cus-order-pay-status-no="orderData.cusOrderPayStatusNo"
          :cus-order-pay-type="orderPayType"
          @confirmOrder="confirmOrder"
        />
        <!-- 交易/销售/资源 -->
        <TradeList v-else class="goods-info" :order-data="orderData" />
        <div class="price-area">
          <!-- 定金尾款付费 -->
          <!-- 服务完结收费 -->
          <div>
            <p>
              <span> 商品总额 </span>
              <span>
                <span
                  v-if="
                    goodsSkuDetail &&
                    goodsSkuDetail.sku &&
                    goodsSkuDetail.sku.targetRate &&
                    orderData.orderType === 0 &&
                    cusOrderStatusType !== 4
                  "
                  >(服务费{{ goodsSkuDetail.sku.targetRate }}%)</span
                >
                <span
                  v-if="orderData.orderType === 0 && cusOrderStatusType !== 4"
                >
                  预计</span
                >
                <span class="money">{{ orderData.orderTotalMoney }}</span>
                元
              </span>
            </p>
            <p>
              <span> 优惠金额 </span>
              <span>
                <span class="money">
                  - {{ orderData.orderDiscountMoney }}
                </span>
                元
              </span>
            </p>
          </div>
          <!-- <p>
          <span> 活动优惠 </span>
          <span class="money">
            {{ orderData.discount2 || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 优惠券 </span>
          <span class="money">
            {{ orderData.discount3 || 0 }}
            元
          </span>
        </p>
        <p>
          <span> 其他优惠 </span>
          <span class="money">
            {{ orderData.orther || 0 }}
            元
          </span>
        </p> -->
        </div>
        <!-- 按节点付费办理完成后展示实付金额 -->
        <p
          v-if="
            cusOrderStatusType === 3 &&
            orderData.orderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE' &&
            orderData.cusOrderPayStatusNo !== 'ORDER_CUS_PAY_STATUS_UN_PAID'
          "
          class="last-money"
        >
          实付金额
          <span class="pay-money">
            {{ orderData.orderPaidMoney }}
            <span style="font-weight: 400; font-size: 12px">元</span>
          </span>
        </p>
        <!-- 当订单已取消时不显示总金额 先付款后服务和服务完结收费-->
        <p
          v-else-if="
            (cusOrderStatusType !== 4 &&
              orderData.orderPayType === 'PRO_PRE_PAY_POST_SERVICE') ||
            orderData.cusOrderPayStatusNo ===
              'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          "
          class="last-money"
        >
          {{ shouldPayText }}
          <span
            v-if="
              (checkPayType() === 2 || checkPayType() === 4) &&
              orderData.orderType === 0
            "
            class="pay-money"
          >
            {{ orderData.orderPayableMoney }}
            <span style="font-weight: 400; font-size: 12px">元</span>
          </span>
          <span v-else class="pay-money">
            {{ orderData.orderPaidMoney }
            <span style="font-weight: 400; font-size: 12px">元</span>
          </span>
        </p>
        <!-- <p class="last-money">
          已付金额:
          <span class="pay-money">
            {{ orderData.orderPaidMoney || 0 }}
            元
          </span>
        </p> -->
      </div>
      <!-- 定金尾款付费 -->
      <div
        v-if="
          cusOrderStatusType !== 4 &&
          orderData.orderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS' &&
          orderData.cusOrderPayStatusNo !==
            'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
        "
        class="order_text order-area"
      >
        <p class="oder_toast">
          温馨提示：该订单先支付定金在业务办理完成后支付尾款
        </p>
        <p>
          定金尾款：定金
          <span
            :class="
              orderData.cusOrderPayStatusNo !== 'ORDER_CUS_PAY_STATUS_PART_PAID'
                ? 'red_money'
                : 'money_num'
            "
          >
            {{ orderData.depositAmount }}元</span
          >
          <span
            v-if="
              orderData.cusOrderPayStatusNo === 'ORDER_CUS_PAY_STATUS_PART_PAID'
            "
            >(已支付)</span
          >
          ，<span
            v-if="
              orderData.cusOrderPayStatusNo === 'ORDER_CUS_PAY_STATUS_PART_PAID'
            "
            >待支付</span
          >尾款
          <span
            :class="
              orderData.cusOrderPayStatusNo === 'ORDER_CUS_PAY_STATUS_PART_PAID'
                ? 'red_money'
                : 'money_num'
            "
          >
            {{ orderData.lastAount }}元</span
          >
        </p>
        <p v-if="isShowPayBtn() === 1" class="last-money">
          应付金额
          <span class="pay-money">{{ orderData.depositAmount }}</span>
        </p>
        <p v-if="isShowPayBtn() === 2" class="last-money">
          应付金额
          <span class="pay-money">{{ orderData.lastAount }}</span>
        </p>
      </div>
      <!-- 先服务后付款 -->
      <div
        v-if="
          cusOrderStatusType !== 4 &&
          orderData.orderPayType === 'PRO_PRE_SERVICE_FINISHED_PAY' &&
          orderData.cusOrderPayStatusNo !==
            'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
        "
        class="order_text order-area"
      >
        <p class="oder_toast">温馨提示：该订单可享受业务办理完成后付费</p>
        <p class="color:#222222">先服务后付款</p>
        <p v-if="isShowPayBtn() === 1" class="last-money">
          应付金额
          <span class="pay-money">{{ orderData.orderPayableMoney }}</span>
        </p>
      </div>
      <!-- 先服务按节点付费 -->
      <div
        v-if="
          cusOrderStatusType !== 4 &&
          orderData.orderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE' &&
          orderData.cusOrderPayStatusNo !==
            'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
        "
        class="order_text order-area"
      >
        <p class="oder_toast">温馨提示：该订单需要在给您办理业务期间付费</p>
        <p class="color:#222222">按业务办理节点付费</p>
        <p v-if="isShowPayBtn()" class="last-money">
          应付金额
          <span class="pay-money">{{ orderData.orderPayableMoney }}</span>
        </p>
      </div>
      <div
        v-if="
          orderData.evaluateStatus &&
          orderData.orderSplitAndCusVo.signerId &&
          (orderData.evaluateStatus !== 3 || orderData.evaluateStatus !== '3')
        "
        class="order-info order-info1"
      >
        <p class="order-item">
          <span class="label">签单人</span>
          <span class="text user-name">{{
            orderData.orderSplitAndCusVo.signerName
          }}</span>
          <span
            v-if="orderData.evaluateStatus == 1 && cusOrderStatusType != 4"
            class="right"
            @click="navToUrl(1)"
            >写评价
            <my-icon
              name="order_ic_listnext"
              size="0.28rem"
              color="#222222"
            ></my-icon>
          </span>
          <span
            v-if="orderData.evaluateStatus == 3 && cusOrderStatusType != 4"
            class="right"
            @click="navToUrl(2)"
            >查看评价
            <my-icon
              name="order_ic_listnext"
              size="0.28rem"
              color="#222222"
            ></my-icon>
          </span>
        </p>
      </div>
      <div class="order-info order-info2">
        <p class="order-item">
          <span class="label">订单编号</span>
          <span class="text">{{ orderData.orderNo }}</span>
          <span class="btn" @click="copy">复制</span>
        </p>
        <p class="order-item">
          <span class="label">下单时间</span>
          <span class="text">{{ orderData.createTime }}</span>
        </p>
        <p class="order-item">
          <span class="label">支付状态</span>
          <span class="text">{{
            PAYSTATUSCODENAME[orderData.orderSplitAndCusVo.cusOrderPayStatusNo]
          }}</span>
        </p>
        <!-- 支付状态为部分付款时才显示这部分         v-if="
          orderData.orderSplitAndCusVo.cusOrderPayStatusNo ===
          'ORDER_CUS_PAY_STATUS_PART_PAID'
        " -->
        <!-- <div v-if="cusOrderStatusType !== 4" class="pay-detail-area">
        <p
          v-for="(item, index) in orderPayList"
          :key="index"
          :class="
            item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_2'
              ? 'has-pay'
              : 'no-pay'
          "
        >
          <span v-if="paylistLength === 1" class="span1">全款:</span>
          <span
            v-else-if="
              paylistLength === 2 &&
              item.orderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS' &&
              index === 0
            "
            class="span1"
            >定金:</span
          >
          <span
            v-else-if="
              paylistLength === 2 &&
              item.orderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS' &&
              index === 1
            "
            class="span1"
            >尾款:</span
          >
          <span
            v-else-if="
              item.orderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE' &&
              index === 0
            "
            class="span1"
            >首款:</span
          >
          <span
            v-else-if="
              item.orderPayType === 'PRO_PRE_SERVICE_POST_PAY_BY_NODE' &&
              index === paylistLength
            "
            class="span1"
            >尾款:</span
          >
          <span v-else class="span1">第{{ item.batchNumber }}批:</span>
          <span class="span2">{{ item.money }}</span>
          <span class="span4">元</span>
          <span
            v-if="item.alreadyPayment === 'ORDER_BATCH_PAYMENT_PAY_2'"
            class="span3"
            >已于{{ item.realPaymentDate }}支付</span
          >
          <span v-else-if="item.expireDate" class="span3"
            >请于{{ item.expireDate }}前支付</span
          >
          <span v-else class="span3">待支付</span>
        </p>
      </div> -->
        <!-- <p class="order-item">
        <span class="label">合同</span>
        <span class="text">{{ orderData.contractName || '暂无' }}</span>
      </p> -->
        <!-- <p class="order-item">
          <span class="label">发票类型</span>
          <span class="text">电子普通发票</span>
          <span class="tx-icon" @click="openInvoiceModal()">
            <my-icon name="tixing_mian1" size="0.32rem"></my-icon>
          </span>
          <span
            v-if="checkBillStatus() === 1 && cusOrderStatusType === 3"
            class="btn-invoice btn"
            @click="toInvoice()"
            >申请开票</span
          >
          <span
            v-if="checkBillStatus() === 3 && cusOrderStatusType === 3"
            class="btn-invoice btn"
            @click="toInvoice()"
            >查看发票</span
          >
        </p> -->
        <p class="order-item last-p">
          <span class="label">备注</span>
          <span class="text">{{
            orderData.mark || orderData.orderSplitAndCusVo.mark || '-'
          }}</span>
        </p>
      </div>
      <!-- <div class="serve-time">
        <p>服务时间：9:00-24:00 周一至周日</p>
        <p class="btn">
          <a href="tel://028-954310">
            <my-icon
              name="per_ic_customer"
              size="0.28rem"
              color="#222222"
            ></my-icon>
            在线客服
          </a>
        </p>
      </div> -->
      <!-- 当订单状态为已取消时隐藏顶部按钮区域 -->
      <div v-if="cusOrderStatusType !== 4" class="btn-area">
        <div class="inner">
          <!-- <sp-button
            v-if="checkBillStatus() === 1"
            class="btn-look"
            @click="handleClickItem(8)"
            >申请发票</sp-button
          >
          <sp-button
            v-if="checkBillStatus() === 3"
            class="btn-look"
            @click="handleClickItem(8)"
            >查看发票</sp-button
          > -->
          <sp-button
            v-if="
              checkAfterSaleStatus() === 1 &&
              orderData.cusOrderStatusNo !== 'ORDER_CUS_STATUS_UNPAID' &&
              orderData.cusOrderStatusNo !== 'ORDER_CUS_STATUS_CANCELLED'
            "
            class="btn-look"
            @click="handleClickItem(7)"
            >退款/售后</sp-button
          >
          <sp-button
            v-if="checkAfterSaleStatus() === 2 || checkAfterSaleStatus() === 5"
            class="btn-look"
            @click="handleClickItem(7)"
            >售后中</sp-button
          >
          <sp-button
            v-if="checkAfterSaleStatus() === 3"
            class="btn-look"
            @click="handleClickItem(7)"
            >已售后</sp-button
          >
          <!-- <sp-button
            v-if="checkAfterSaleStatus() === 4"
            class="btn-look"
            @click="handleClickItem(7)"
            >部分售后</sp-button
          > -->
          <!--   v-if="
            orderData.orderSplitAndCusVo[0].cusOrderPayStatusNo ===
            orderStatusCode[1]
          " -->
          <sp-button v-if="isShowCanCelBtn()" @click="handleClickItem(1)">
            取消订单
          </sp-button>
          <sp-button
            v-if="checkContractStatus() == 1"
            class="btn-look"
            @click="handleClickItem(2)"
          >
            签署合同
          </sp-button>
          <sp-button
            v-if="checkContractStatus() == 2"
            class="btn-look"
            @click="handleClickItem(3)"
          >
            查看合同
          </sp-button>
          <sp-button
            v-if="isShowPayBtn() === 1"
            class="btn-pay"
            @click="handleClickPay()"
          >
            立即付款
          </sp-button>
          <sp-button
            v-if="isShowPayBtn() === 2"
            class="btn-pay"
            @click="handleClickPay()"
          >
            支付尾款
          </sp-button>
          <!-- 销售商品交易商品的确认按钮是在下边 -->
          <sp-button
            v-if="cusOrderStatusType === 2 && isShowConfirmBtn()"
            class="btn-pay"
            @click="handleClickItem(6)"
          >
            确认完成
          </sp-button>
        </div>
      </div>
    </section>
    <div v-if="!hasData" class="loading-area">
      <sp-skeleton title avatar :row="10" :loading="loading"> </sp-skeleton>
      <LoadingCenter v-show="loading" />
    </div>
    <sp-dialog
      v-model="showMydialog"
      :show-cancel-button="true"
      :show-confirm-button="true"
      confirm-button-text="同意并继续"
      concel-button-text="不同意"
      title="温馨提示"
      @confirm="confirmAggret"
      @cancle="cancelAggret"
    >
      <p class="xy-p">
        请仔细阅读并同意,
        <span @click="enterAgreement('protocol100008')"
          >《{{ addOrderXy.title }}》</span
        >，<span @click="enterAgreement('protocol100033')"
          >《{{ tranXy.title }}》</span
        >
      </p>
    </sp-dialog>
    <PayModal
      v-if="showPayBtn"
      ref="payModal"
      :order-data="orderData"
      :pay-list="payList"
      :batch-pay-status="batchPayStatus"
      :this-time-pay-total="thisTimePayTotal"
      :batch-ids="batchIds"
      :all-time-pay-total="allTimePayTotal"
      :remain-total-pay-ids="remainTotalPayIds"
    />
    <CancelOrder
      ref="cancleOrderModel"
      :order-id="orderData.orderId"
      :cus-order-id="orderData.cusOrderId"
      :cus-order-cancel-reason="
        orderData.orderSplitAndCusVo.cusOrderCancelReason
      "
      @setCancelOrderName="setCancelOrderName"
      @cancleOrder="cancleOrder"
      @getBatchList="getBatchList"
    />
    <InvoiceToast ref="InvoiceToast" />
  </div>
</template>

<script>
import { Button, Skeleton, Dialog } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header.vue'
import Banner from '@/components/order/detail/Banner.vue'
// 服务订单
import ServeList from '@/components/order/detail/ServeList.vue'
// 交易订单
import TradeList from '@/components/order/detail/TradeList.vue'
import CancelOrder from '@/components/order/CancelOrder.vue' // 取消订单弹窗
import PayModal from '@/components/order/PayModal.vue' // 支付弹窗
import orderApi from '@/api/order'
import OrderMixins from '@/mixins/order'
import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'
import InvoiceToast from '@/components/order/detail/InvoiceModal.vue'
export default {
  components: {
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
    [Dialog.Component.name]: Dialog.Component,
    Header,
    Banner,
    ServeList,
    TradeList,
    CancelOrder,
    PayModal,
    LoadingCenter,
    InvoiceToast,
  },
  mixins: [OrderMixins],
  data() {
    return {
      goodsSkuDetail: '',
      showHead: false,
      canCelReasonName: '',
      loading: true,
      hasData: false,
      orderId: '',
      cusOrderId: '',
      cusOrderStatusType: null, // 1为未付款 2进行中 3已完成 4已取消
      orderData: {
        orderStatus: '',
        orderList: [],
        orderSplitAndCusVo: {},
      },
      showPayBtn: false,
      payList: [], // 支付列表
      fromPage: 'orderDetail',
      orderPayList: [],
      paylistLength: 0,
      opType: '',
      shouldPayText: '',
      orderPayType: '', // 付费类型 1先付款后服务 2先定金后尾款 3服务节点收费 4服务完成收费
    }
  },
  computed: {
    orderStatusCode() {
      return this.$store.state.order.orderStatusCode
    },
  },
  created() {
    if (process && process.client) {
      if (this.$route.query.id) {
        this.orderId = this.$route.query.id
        this.cusOrderId = this.$route.query.cusOrderId
        this.getDetail()
      } else {
        this.$xToast.error('缺少参数')
        this.$router.back(-1)
      }
    }
  },
  async mounted() {
    // 获取下单协议
    this.addOrderXy = await this.getProtocol('protocol100008')
    // 获取交易委托协议
    this.tranXy = await this.getProtocol('protocol100033')
  },
  methods: {
    openInvoiceModal() {
      this.$refs.InvoiceToast.showPop = true
    },
    scollChange() {
      const scrollTop = this.$refs.scrollView.scrollTop
      if (scrollTop >= 80) {
        this.showHead = true
      } else {
        this.showHead = false
      }
    },
    onLeftClick() {
      this.$router.back(-1)
    },
    getDetail() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.orderId, cusOrderId: this.cusOrderId }
        )
        .then((res) => {
          // 订单价格处理 分转元
          this.changeMoney(res.data || res)
          const cusDetail = res.data
            ? res.data.orderSplitAndCusVo
            : res.orderSplitAndCusVo
          this.orderData = Object.assign(cusDetail, res.data || res)
          if (
            this.orderData.orderPayType === 'PRO_PRE_DEPOSIT_POST_OTHERS' &&
            this.orderData.payStatusNo === 'ORDER_CUS_PAY_STATUS_PART_PAID'
          ) {
            // 部分支付的订单状态为办理中
            this.orderData.statusName = '办理中'
          } else if (
            this.orderData.cusOrderStatusNo === 'ORDER_CUS_STATUS_COMPLETED'
          ) {
            this.orderData.statusName = '已完成'
          } else {
            this.orderData.statusName = this.getStatusName(
              this.orderData.orderStatusNo
            )
            if (this.orderData.statusName === '待确认') {
              if (this.isShowConfirmBtn(this.orderData) === 1) {
                this.orderData.statusName = '待确认'
              } else {
                this.orderData.statusName = '办理中'
              }
            }
          }
          this.showPayBtn = this.isShowPayBtn()
          this.cusOrderStatusType = this.checkCusOrderStatus(
            this.orderData.cusOrderStatusNo
          )
          // if (
          //   this.orderData.orderSplitAndCusVo.cusOrderStatusNo !==
          //     'ORDER_CUS_STATUS_CANCELLED' &&
          //   this.orderData.orderSplitAndCusVo.cusOrderPayStatusNo !==
          //     'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          // ) {
          //   // 当订单状态不为已取消且支付状态不为已完成时展示付款入口
          //   this.showPayBtn = true
          // }
          this.orderPayType = this.checkPayType()
          if (
            this.orderData.orderSplitAndCusVo.cusOrderPayStatusNo ===
            'ORDER_CUS_PAY_STATUS_COMPLETED_PAID'
          )
            this.shouldPayText = '实付金额'
          else {
            this.shouldPayText = '应付金额'
          }
          const orders = this.orderData.orderSkuList
          let arr1 = []
          for (let i = 0; i < orders.length; i++) {
            orders[i].skuDetails.forEach((item) => {
              item.skuDetailInfo = orders[i].skuDetailInfo
            })
            arr1 = arr1.concat(orders[i].skuDetails)
          }
          this.goodsSkuDetail = JSON.parse(arr1[0].skuDetailInfo)
          if (this.goodsSkuDetail.sku.targetRate) {
            this.goodsSkuDetail.sku.targetRate = parseFloat(
              this.goodsSkuDetail.sku.targetRate
            )
          }
          this.orderData.orderSkuList = arr1
          this.getChildOrders(this.orderData)
          this.hasData = true
          this.loading = false
          this.$refs.cancleOrderModel.setCancelName(
            this.orderData.orderSplitAndCusVo.cusOrderCancelReason
          )
          this.$forceUpdate()
        })
        .catch((err) => {
          this.loading = false
          this.$xToast.error(err.message || '查询失败，请稍后重试')
          const that = this
          setTimeout(function () {
            that.$router.back(-1)
          }, 2000)
        })
    },
    // 按钮操作
    handleClickItem(type) {
      switch (type) {
        case 1:
          // 取消订单 首先判断是否有关联订单
          this.opType = 'cancelOrder'
          this.getChildOrders()
          break
        case 2:
          // 签署合同
          this.toContract()
          break
        case 3:
          // 查看合同
          this.toContract()
          break
        case 4:
          // 立即付款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders()
          break
        case 5:
          // 支付余款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders()
          break
        case 6:
          // 确认完成
          this.opType = 'confirmComplete'
          this.confirmOrder()
          break
        case 7:
          // 退款 售后
          this.opType = 'afterSale'
          this.toAfterSale()
          break
        case 8:
          // 发票
          this.opType = 'invoice'
          this.toInvoice()
          break
      }
    },
    navToUrl(type) {
      const query = {
        infoId:
          this.orderData.evaluateCenterId ||
          this.orderData.orderSplitAndCusVo.evaluateCenterId, // 评价id
        plannerId: this.orderData.orderSplitAndCusVo.signerSubjectUserId, // 签单人员id
        signerNo: this.orderData.orderSplitAndCusVo.signerNo, // 签单人员编号
        plannerName: this.orderData.orderSplitAndCusVo.signerName,
        signerSubjectUserId:
          this.orderData.orderSplitAndCusVo.signerSubjectUserId, // 签单人商户用户id
        orderId: this.orderData.id,
        cusOrderId: this.orderData.cusOrderId,
      }
      if (type === 1) {
        this.$router.push({
          path: '/my/plannerEvaluate',
          query,
        })
      } else {
        this.$router.push({
          path: '/my/plannerEvaluate/detail',
          query,
        })
      }
    },
    // 设置取消订单原因name 中文
    setCancelOrderName(val) {
      this.canCelReasonName = val
    },
    // 复制功能
    copy() {
      const oInput = document.createElement('input')
      oInput.value = this.orderData.orderNo
      document.body.appendChild(oInput)
      oInput.select() // 选择对象;
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.remove()
      this.$xToast.success('复制成功')
    },
    handleClickPay() {
      this.opType = 'payMoney'
      this.getChildOrders(this.orderData.orderSkuList[0])
    },
  },
}
</script>

<style lang="less" scoped>
.pay-page {
  background: #f5f5f5;
  min-height: 100vh;
  height: calc(100vh - 40px);
  overflow-y: scroll;
}
.loading-area {
  background: white;
  min-height: 100vh;
  background: white;
}
.order-area {
  background: white;
  margin-bottom: 20px;
  padding: 0 40px 0 40px;
}
.price-area {
  margin-top: 60px;
  padding-bottom: 20px;
  p {
    margin-bottom: 20px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .money {
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
.last-money {
  border-top: 1px solid #f4f4f4;
  font-size: 28px;
  text-align: right;
  padding: 40px 0;
  .pay-money {
    font-weight: bold;
    color: #ec5330;
    font-size: 36px;
  }
}
.red_money {
  color: #ec5330;
  font-weight: 600;
}
.money_num {
  font-weight: 600;
}
.order_text {
  font-size: 28px;
  line-height: 44px;
  padding: 20px 40px 20px 40px;
  background: white;
  font-size: 26px;
  color: #222222;
  letter-spacing: 0;
  line-height: 36px;
  .oder_toast {
    font-size: 24px;
    color: #999999;
    line-height: 34px;
  }
  p {
    border: none;
    margin: 10px 0;
  }
  .last-money {
    padding: 20px 0 20px 0;
  }
}
.order-info {
  background: white;
  padding: 40px;
  font-size: 26px;
  .order-item {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
    overflow: hidden;
    margin-bottom: 20px;
    span {
      display: block;
      float: left;
    }
    .label {
      width: 140px;
    }
    .text {
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      width: auto;
    }
    .user-name {
      max-width: calc(100% - 320px);
      .textOverflow(1);
    }
    .btn {
      margin-left: 12px;
      background: #f4f4f4;
      border-radius: 16px;
      padding: 2px 6px;
      color: #222222;
      font-size: 22px;
    }
    .btn-invoice {
      float: right;
    }
  }
  .last-p {
    margin-bottom: 0;
    display: flex;
    .text {
      flex: 1;
      line-height: 36px;
    }
  }
  .pay-detail-area {
    width: 100%;
    height: auto;
    background: #f8f8f8;
    border-radius: 8px;
    padding: 10px 20px;
    margin-bottom: 20px;
    p {
      font-size: 24px;
      margin: 10px 0;
      span {
        display: block;
        float: left;
      }
      height: 32px;
      .span4 {
        transform: scale(0.8);
        transform-origin: 20% 100%;
        line-height: 32px;
        width: 24px;
        height: 100%;
      }
    }
    .has-pay {
      color: rgba(153, 153, 153, 1);
      font-size: 24px;
      .span1 {
        width: 120px;
      }
      .span2 {
        font-size: 28px;
      }
      .span3 {
        display: block;
        float: right;
      }
      .span4 {
        transform: scale(0.8);
        transform-origin: 20% 100%;
      }
    }
    .no-pay {
      font-size: 24px;
      font-family: PingFang SC;
      color: #ec5330;
      .span1 {
        color: rgba(34, 34, 34, 1);
        width: 120px;
      }
      .span2 {
        font-size: 28px;
        font-weight: bold;
      }
      .span3 {
        display: block;
        float: right;
        color: #222222;
      }
    }
  }
}

.order-info2 {
  margin-bottom: 150px;
}
.order-info1 {
  margin-bottom: 20px;
  .order-item {
    margin-bottom: 0;
    .right {
      float: right;
    }
  }
}

.serve-time {
  margin-top: 20px;
  width: 100%;
  height: auto;
  background: #ffffff;
  font-size: 28px;
  color: #999999;
  text-align: center;
  line-height: 90px;
  padding: 0 40px;
  .btn {
    border-top: 1px solid #f4f4f4;
    font-weight: bold;
    a {
      color: #222222;
    }
  }
}
.btn-area {
  position: fixed;
  left: 0;
  bottom: 0;
  margin-top: 20px;
  width: 100%;
  height: 128px;
  background: #ffffff;
  line-height: 0;
  padding-top: 24px;
  .inner {
    float: right;
    width: auto;
    margin-right: 40px;
    float: right;
    margin-bottom: 30px;
    height: auto;
    margin-top: 10px;
    overflow: hidden;
    .sp-button {
      font-size: 26px;
      height: 64px;
      padding: 0 20px;
      color: #999999;
      line-height: 1;
      margin: 0;
      float: left;
      margin-left: 14px;
      float: left;
      display: block;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-left: 10px;
    }
    .sp-button:first-child {
      margin-left: 0;
    }
    .btn-look {
      color: #222222;
    }
    .btn-pay {
      background: rgba(236, 83, 48, 1);
      color: white;
      border: none;
    }
  }
}
.xy-p {
  font-size: 28px;
  font-weight: 400;
  color: #222222;
  line-height: 38px;
  padding: 20px 40px;
  span {
    color: #4f90f6;
  }
}
.tx-icon {
  margin-left: 10px;
}
</style>
