<template>
  <div class="case">
    <h1>精选案例</h1>
    <div class="box">
      <div class="head">
        <img :src="ordercase.img" alt="" />
        <h1>{{ ordercase.name }}</h1>
        <p>{{ ordercase.time }}</p>
      </div>
      <div class="cell">
        <p>办理业务：{{ ordercase.type }}</p>
        <p>办理周期：{{ ordercase.date }}</p>
        <div class="list">
          <p>办理经过：</p>
          <div v-show="!show" class="box">
            <div
              v-for="(item, index) in ordercase.list.slice(0, 3)"
              :key="index"
              class="item"
            >
              <span>
                {{ index + 1 > 10 ? index + 1 : '0' + (index + 1) }}
              </span>
              <div class="head">
                <h1>{{ item.title }}</h1>
                <p>{{ item.date }}</p>
              </div>
            </div>
          </div>
          <div v-show="show" class="box">
            <div
              v-for="(item, index) in ordercase.list"
              :key="index"
              class="item"
            >
              <span>
                {{ index + 1 > 10 ? index + 1 : '0' + (index + 1) }}
              </span>
              <div class="head">
                <h1>{{ item.title }}</h1>
                <p>{{ item.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ordercase.list.length > 3" class="btn" @click="show = !show">
        {{ show ? '收起' : '查看' }}全部办理流程
        <sp-icon
          :name="show ? 'arrow-up' : 'arrow-down'"
          size="0.3rem"
          color="#4974F5"
          class="icon"
        />
      </div>
      <div class="rate">
        <div class="head">
          <p>案例评价：</p>
          <sp-rate
            v-model="ordercase.rate"
            size="0.35rem"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <p>{{ ordercase.ratetit }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Rate, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'OrderCase',
  components: {
    [Rate.name]: Rate,
    [Icon.name]: Icon,
  },
  data() {
    return {
      show: false,
      ordercase: {},
      caselist: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '144***59',
          time: ' 2021.4.15',
          type: '公司注册',
          date: '7个工作日',
          list: [
            {
              title: '公司核名',
              time: '2021.4.15',
            },
            {
              title: '撰写申请材料',
              time: '2021.4.16',
            },
            {
              title: '提交资料至工商管理局',
              time: '2021.4.19',
            },
            {
              title: '领取执照',
              time: '2021.4.23',
            },
          ],
          rate: 95,
          ratetit:
            '核名非常快，当天就出结果了。之前上网看注册公司好像很麻烦，但是在专业老师的指导下我并没有操什么心，除了提供一些资料签一些字，全程基本就是在家躺着的状态。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '136***42 ',
          time: '2021.4.17',
          type: '公司变更',
          date: '5个工作日',
          list: [
            {
              title: '收集材料',
              time: '2021.4.19',
            },
            {
              title: '撰写申请材料',
              time: '2021.4.20',
            },
            {
              title: '提交资料至工商管理局',
              time: '2021.4.21',
            },
            {
              title: '领取新的营业执照',
              time: '2021.4.23',
            },
          ],
          rate: 100,
          ratetit:
            '我是周末下单的，规划师休着假也很耐心的解答我的问题，告诉我要周一才能开始办理。总体来说还是很快的，周一开始流程周五就拿证了。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '133***53 ',
          time: '2021.3.6',
          type: '食品经营许可证',
          date: '20个工作日',
          list: [
            {
              title: '递交资料',
              time: '2021.3.8',
            },
            {
              title: '撰写申请材料',
              time: '2021.3.9',
            },
            {
              title: '提交资料至市场监督管理局',
              time: '2021.3.11',
            },
            {
              title: '二次递交资料，实地常看场地',
              time: '2021.3.25',
            },
          ],
          rate: 100,
          ratetit: '收费合理，办理快速，满意！',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '159***29',
          time: '2021.4.26',
          type: '银行开户',
          date: '1个工作日',
          list: [
            {
              title: '收集资料',
              time: '2021.4.27',
            },
            {
              title: '到场面核',
              time: '2021.4.27',
            },
            {
              title: '办理成功',
              time: '2021.4.27',
            },
          ],
          rate: 100,
          ratetit: '办理老师很详细的讲了需要的资料，不到一个小时就办完了。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '138***15',
          time: '2021.4.2',
          type: '印章服务',
          date: '1个工作日',
          list: [
            {
              title: '采集印章信息',
              time: '2021.4.2',
            },
            {
              title: '刻章',
              time: '2021.4.2',
            },
            {
              title: '备案',
              time: '2021.4.2',
            },
            {
              title: '取章',
              time: '2021.4.2',
            },
          ],
          rate: 100,
          ratetit: '3个章1个小时就拿到了，价格也很便宜，物美价廉。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '133***75',
          time: '2021.4.5',
          type: '工商解非',
          date: '7个工作日',
          list: [
            {
              title: '撰写材料',
              time: '2021.4.5',
            },
            {
              title: '提交至相关部门审核',
              time: '2021.4.6',
            },
            {
              title: '办理完成',
              time: '2021.4.12',
            },
          ],
          rate: 100,
          ratetit: '收费合理，办理快速，满意！',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '138***15',
          time: '2021.4.19',
          type: '代理记账',
          date: '持续进行',
          list: [
            {
              title: '收集资料，确认需求',
              time: '2021.4.19',
            },
            {
              title: '核准开票信息，严审纳税数据',
              time: '2021.4.19',
            },
            {
              title: '记账中心做账，财务核查申报纳税',
              time: '2021.4.30',
            },
            {
              title: '流程审核，服务持续进行',
              time: '2021.4.30',
            },
          ],
          rate: 100,
          ratetit:
            '开公司的都知道做账的重要性，所以选择一个大平台就尤为重要。再三对比之下我还是选择了这家，大平台质量保证，做账人员也认真细致。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '157***89',
          time: '2021.2.22',
          type: '工商注销',
          date: '70个工作日',
          list: [
            {
              title: '工商局备案，登报',
              time: '2021.3.1',
            },
            {
              title: '税务局申请注销',
              time: '2021.4.8',
            },
            {
              title: '向工商局递交注销资料、代码注销、银行注销 ',
              time: '2021.5.17',
            },
            {
              title: '注销完成',
              time: '2021.5.21',
            },
          ],
          rate: 100,
          ratetit:
            '工商注销最麻烦的是要等各种公示期结束，这几个公示期拉长了办理流程，但是实话实说这家的办理效率还是挺高的了，中间基本没有耽误时间。我是公司注销、银行注销、税务注销等业务一起办理的，全程很省心，没有让我感觉到麻烦。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '159***42',
          time: '2021.3.1',
          type: '增值电信业务许可证',
          date: '60个工作日',
          list: [
            {
              title: '准备材料',
              time: '2021.3.1',
            },
            {
              title: '上传系统进行申报',
              time: '2021.3.8',
            },
            {
              title: '获取《行政许可予以受理通知单》',
              time: '2021.3.17',
            },
            {
              title: '获取证书，办理完成',
              time: '2021.4.28',
            },
          ],
          rate: 100,
          ratetit:
            '身边有朋友自己亲力亲为办理一样的业务，期间因为各种资料不合格被驳回，所以再三劝说我找代办。事实证明果然是没错的，不仅办理快速，而且收费合理，花钱买省心，我觉得很值！',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '152***92',
          time: '2021.3.8',
          type: '文化经营类许可证',
          date: '40个工作日',
          list: [
            {
              title: '准备材料',
              time: '2021.3.12',
            },
            {
              title: '上传系统进行申报',
              time: '2021.3.16',
            },
            {
              title: '获得批准',
              time: '2021.3.17',
            },
            {
              title: '获得证书，办理完成',
              time: '2021.4.23',
            },
          ],
          rate: 100,
          ratetit:
            '我之前以为办理这种业务起码要两三个月，结果1个多月就办下来了，靠谱！',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '159***42',
          time: '2021.3.1',
          type: '增值电信业务许可证',
          date: '60个工作日',
          list: [
            {
              title: '准备材料',
              time: '2021.3.1',
            },
            {
              title: '上传系统进行申报',
              time: '2021.3.8',
            },
            {
              title: '获取《行政许可予以受理通知单》',
              time: '2021.3.17',
            },
            {
              title: '获得证书，办理完成',
              time: '2021.4.28',
            },
          ],
          rate: 100,
          ratetit:
            '不得不说互联网资质的办理要求是真的高，找代办也是真的好，反正有啥问题，找代办就对了',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '132***55',
          time: '2021.3.18',
          type: '发票服务',
          date: '5个工作日',
          list: [
            {
              title: '准备材料',
              time: '2021.3.18',
            },
            {
              title: '财务人员办理',
              time: '2021.3.22',
            },
            {
              title: '办理完成',
              time: '2021.3.25',
            },
          ],
          rate: 100,
          ratetit:
            '不是什么麻烦的业务，但是就是不想自己跑腿，找代办收费也不贵就找了代办，省心省力省时',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '138***01',
          time: '2021.4.23',
          type: '税控服务',
          date: '7个工作日',
          list: [
            {
              title: '资料准备',
              time: '2021.4.26',
            },
            {
              title: '专业人员办理',
              time: '2021.5.7',
            },
            {
              title: '办理完成',
              time: '2021.5.7',
            },
          ],
          rate: 100,
          ratetit:
            '小公司找代办办这种业务还是很省钱的，毕竟每个月少支出专人的工资还是很省的了',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
          name: '186****93',
          time: '2021.3.4',
          type: '体系认证',
          date: '3周',
          list: [
            {
              title: '递交认证申请',
              time: '2021.3.4',
            },
            {
              title: '提交认监委',
              time: '2021.3.8',
            },
            {
              title: '审核通过',
              time: '2021.3.22',
            },
            {
              title: '证书取得认监委备案',
              time: '20213.26',
            },
          ],
          rate: 100,
          ratetit:
            '下单当天就有专人联系我了，由于我们比较急所以各项流程都走得很快，不到一个月证就下了，很满意！找过很多代办，这家是最靠谱的！',
        },
      ],
    }
  },
  created() {
    this.ordercase = this.caselist[
      Math.floor(Math.random() * this.caselist.length)
    ]
  },
}
</script>

<style lang="less" scoped>
.case {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 40px 0;
  > h1 {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  > .box {
    margin-top: 48px;
    padding: 0 40px;
    > .head {
      display: flex;
      align-items: center;
      > img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        object-fit: cover;
      }
      > h1 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        margin-left: 20px;
        color: #222222;
        line-height: 32px;
      }
      > p {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
        margin-left: auto;
      }
    }
    > .cell {
      margin-bottom: 12px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 26px;
      > p {
        margin-top: 28px;
      }
      > .list {
        display: flex;
        margin-top: 28px;
        > p {
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 26px;
          width: 130px;
        }
        > .box {
          max-width: calc(100% - 140px);
          > .item {
            padding: 0 0 80px 60px;
            position: relative;
            border-left: 1px solid #4974f5;
            margin-left: 20px;
            padding-left: 39px;
            > span {
              font-size: 22px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #4974f5;
              line-height: 35px;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              text-align: center;
              position: absolute;
              left: -23px;
              top: -2px;
              background: #f2f5ff;
              border: 1px solid #4974f5;
            }
            > .head {
              display: flex;
              padding-top: 3px;
              > h1 {
                font-size: 30px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 600;
                color: #4974f5;
                line-height: 34px;
              }
              > p {
                font-size: 26px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #4974f5;
                line-height: 26px;
              }
            }
            > .tit {
              display: flex;
              margin-top: 20px;
              align-items: center;
              img {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 12px;
              }
              p {
                font-size: 26px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
              }
            }
          }
          > .item:last-child {
            border: none;
          }
        }
      }
    }
    > .btn {
      width: 350px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4974f5;
      margin: 0 auto 24px auto;
      text-align: center;
      .icon {
        margin-left: 12px;
        vertical-align: -1px;
      }
    }
    > .rate {
      margin-top: 16px;
      background: #f2f5ff;
      border-radius: 8px;
      padding: 32px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      > .head {
        display: flex;
      }
      > p {
        margin: 12px 0 0 130px;
      }
    }
  }
}
</style>
