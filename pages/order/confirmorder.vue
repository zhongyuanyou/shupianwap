<template>
  <div class="PlaceOrder">
    <Head ref="head" title="确认订单"></Head>
    <div class="allbox">
      <div class="data-content">
        <div v-for="(item, index) in order" :key="index" class="list">
          <div class="left">
            <img :src="item.img" alt="" />
          </div>
          <div class="right">
            <h1 class="tit">{{ item.name }}</h1>
            <p class="tag">{{ item.tag }}</p>
            <p class="price">
              <span
                ><b>{{ item.price }}</b
                >元</span
              >
              <i>{{ `x${item.num}` }}</i>
            </p>
            <div class="list">
              <div v-for="(listitem, listindex) in item.list" :key="listindex">
                <p class="name">{{ listitem.name }}</p>
                <p class="data">{{ listitem.data }}</p>
                <p class="price">
                  {{ listitem.price }} {{ `x${listitem.num}` }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="inpbox">
          <Field
            v-model="message"
            rows="1"
            autosize
            label="备注留言"
            type="textarea"
            placeholder="建议提前先与规划师联系"
          ></Field>
        </div>
      </div>
      <div class="news-content">
        <CellGroup>
          <Cell
            title="商品及服务总数"
            :value="news.num + '件'"
            value-class="black"
          />
          <Cell
            title="商品金额"
            :value="news.price + '元'"
            value-class="black"
          />
          <Cell
            title="优惠券"
            :value="
              coupon
                ? coupon
                : couponlist.length > 0
                ? couponlist.length + '个优惠券'
                : '无可用'
            "
            is-link
            :value-class="coupon ? 'red' : couponlist.length > 0 ? 'black' : ''"
            @click="popupfn()"
          />
        </CellGroup>
        <p class="money">
          合计：
          <span>
            <b>{{ news.money }}</b> 元
          </span>
        </p>
      </div>
      <div class="contract">
        <CellGroup>
          <Cell
            title="合同信息"
            value="完善合同信息"
            value-class="black"
            is-link
            @click="gocontractedit()"
          />
        </CellGroup>
      </div>
      <div class="agreement">
        <Checkbox v-model="radio">
          <template>
            <p class="tit">
              我已阅读过并知晓<span>《薯片平台用户交易下单协议》</span>
            </p>
          </template>
        </Checkbox>
      </div>
    </div>
    <div ref="foot" class="foot">
      <p class="left">
        应付:<span>
          <b>{{ money }}</b> 元</span
        >
      </p>
      <div class="right">提交订单</div>
    </div>
    <Popup
      :show="popupshow"
      :height="75"
      title="优惠"
      help="使用说明"
      :tablist="tablist"
      calculation="已选中推荐优惠券，可抵扣"
      num="450元"
      :datalist="datalist"
      @tabactive="tabfn"
      @close="close"
    ></Popup>
  </div>
</template>

<script>
import {
  Field,
  Cell,
  CellGroup,
  Checkbox,
  // CheckboxGroup,
} from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import Popup from '@/components/PlaceOrder/Popup'
export default {
  name: 'PlaceOrder',
  components: {
    Head,
    Field,
    Cell,
    CellGroup,
    Checkbox,
    Popup,
    // CheckboxGroup,
  },
  data() {
    return {
      popupshow: false,
      allboxHeight: '100vh',
      money: '1232',
      radio: '',
      coupon: '2312',
      couponlist: [1],
      message: '',
      news: { num: '123', price: '1392.00', money: '4600.00' },
      order: [
        {
          img:
            'https://anjia2.oss-cn-beijing.aliyuncs.com/test/1291267227269508147.png',
          name:
            '四川省成都市*****科技有限公司四川省成都市*****科技有限公司四川省成都市*****科技有限公司四川省成都市*****科技有限公司',
          tag: '科技类 | 一般纳税人 | 50万 | 3年以上',
          price: '123232',
          num: '1',
          list: [
            {
              name: '平台使用费',
              data: '公司核名等6个服务公司核名等6个服务',
              price: '123',
              num: '3',
            },
          ],
        },
      ],
      tablist: [
        { name: '可用优惠券', num: '12', is: true },
        { name: '过期优惠券' },
      ],
      datalist: [
        {
          money: '3200',
          data: '满3800元可用',
          name: '财税助力特惠券',
          ms: '限“小规模纳税人代理记账”服务 使用',
          date: '2020.09.01-2020.09.31',
          check: false,
          nodata: '订单金额不符合使用条件',
        },
        {
          money: '3200',
          data: '满3800元可用',
          name: '财税助力特惠券',
          ms: '限“小规模纳税人代理记账”服务 使用',
          date: '2020.09.01-2020.09.31',
          check: false,
          nodata: '订单金额不符合使用条件',
        },
        {
          money: '3200',
          data: '满3800元可用',
          name: '财税助力特惠券',
          ms: '限“小规模纳税人代理记账”服务 使用',
          date: '2020.09.01-2020.09.31',
          check: false,
          nodata: '订单金额不符合使用条件',
        },
        {
          money: '3200',
          data: '满3800元可用',
          name: '财税助力特惠券',
          ms: '限“小规模纳税人代理记账”服务 使用',
          date: '2020.09.01-2020.09.31',
          check: false,
          nodata: '订单金额不符合使用条件',
        },
      ],
      contaract: '',
    }
  },
  mounted() {
    if (this.$cookies.get('contaract')) {
      this.contaract = this.$cookies.get('contaract')
      this.$cookies.remove('contaract')
      console.log(this.contaract)
    }
  },
  methods: {
    gocontractedit() {
      this.$router.push({
        path: '/contract/edit',
        query: {
          type: 'ws',
        },
      })
    },
    getpopupfn() {
      this.popupshow = true
    },
    close(data) {
      this.popupshow = data
    },
    tabfn(item, index) {
      console.log(item, index)
    },
  },
}
</script>

<style lang="less" scoped>
.PlaceOrder {
  background: #f8f8f8;
  height: 100vh;
  > .allbox {
    padding-bottom: 24px;
    overflow-y: auto;
    height: calc(100vh - 128px - 88px);
    > .data-content {
      padding: 0 40px;
      background: #fff;
      > .list {
        display: flex;
        border-bottom: 1px solid #cdcdcd;
        padding: 32px 0;
        > .left {
          width: 160px;
          height: 160px;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        > .right {
          margin-left: 32px;
          width: calc(100% - 192px);
          > h1 {
            width: 100%;
            font-size: 32px;
            font-weight: bold;
            color: #222222;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          > .tag {
            margin-top: 14px;
            font-size: 22px;
            font-weight: 400;
            color: #999999;
          }
          > .price {
            display: flex;
            margin-top: 31px;
            > span {
              font-size: 28px;
              font-weight: bold;
              color: #ec5330;
              width: 40%;
              > b {
                font-size: 36px;
              }
            }
            > i {
              font-size: 22px;
              font-weight: bold;
              color: #222222;
              font-style: normal;
              padding-top: 10px;
              margin-left: auto;
            }
          }
          > .list {
            margin-top: 30px;
            > div {
              margin-top: 14px;
              display: flex;
              > .name {
                width: 25%;
                font-size: 22px;
                font-weight: bold;
                color: #222222;
                margin-right: 5%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              > .data {
                width: 40%;
                font-size: 22px;
                font-weight: 400;
                color: #222222;
                margin-right: 5%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              > .price {
                margin-left: auto;
                font-size: 22px;
                font-weight: bold;
                color: #222222;
              }
            }
          }
        }
      }
      > .inpbox {
        /deep/.sp-field {
          padding: 20px 0;
        }
      }
    }
    > .news-content {
      margin-top: 24px;
      background: #fff;
      .black {
        color: #1a1a1a;
      }
      .red {
        color: #ec5330;
      }
      > .money {
        padding: 39px 30px;
        text-align: right;
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        span {
          font-size: 22px;
          color: #ec5330;
          b {
            font-size: 30px;
          }
        }
      }
    }
    > .contract {
      margin-top: 24px;
      background: #fff;
    }
    > .agreement {
      margin-top: 24px;
      background: #fff;
      padding: 40px 0 40px 40px;
      .tit {
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        > span {
          color: #4974f5;
        }
      }
    }
  }
  > .foot {
    padding: 0 40px;
    height: 128px;
    display: flex;
    align-items: center;
    background: #fff;
    > .left {
      font-size: 32px;
      font-weight: 400;
      color: #222222;
      > span {
        font-size: 28px;
        color: #ec5330;
        > b {
          font-size: 48px;
        }
      }
    }
    > .right {
      width: 186px;
      height: 80px;
      background: #ec5330;
      border-radius: 8px;
      font-size: 28px;
      font-weight: bold;
      line-height: 80px;
      text-align: center;
      color: #fff;
      margin-left: auto;
    }
  }
}
</style>
