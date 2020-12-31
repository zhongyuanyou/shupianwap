<template>
  <div class="serviceIntroduced">
    <a
      v-for="(item, index) in servicelist"
      :key="index"
      href="javascript:;"
      :style="{
        backgroundImage: 'url(' + item.bgimage + ')',
      }"
    >
      <div class="total">
        <div>
          <span>{{ item.actualViews }}</span>
          <span>在线咨询</span>
        </div>
        <div>
          <span>{{ item.defaultSales }}</span>
          <span>累计成交</span>
        </div>
        <div>
          <span>{{ item.actualSales }}</span>
          <span>成功案例</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="contact">
        <div class="price">
          <span>{{ item.price }}</span>
          <span>元起</span>
        </div>
        <div class="contact-btn">
          <a
            v-md-map
            v-md:p_IMClick
            href="javascript:;"
            data-im_type="售前"
            :data-name="`变更服务介绍_${item.plannerName}_在线咨询`"
            @click="openIM(item.url, item.planner)"
          >
            <img :src="item.planner.avatarImg" alt="" />
          </a>
          <a
            v-md-map
            v-md:p_IMClick
            data-im_type="售前"
            data-name="`变更服务介绍_${item.plannerName}_在线咨询`"
          >
            <my-icon
              name="notify_ic_chat"
              color="#4974F5"
              size="0.4rem"
              class="icon"
            >
            </my-icon>
          </a>
          <a
            v-md-map
            v-md:webClick
            href="javascript:;"
            data-name="`变更服务介绍_${item.plannerName}_拨打电话"
            @click="call(item.planner.telephone)"
          >
            <my-icon
              name="notify_ic_tel"
              color="#4974F5"
              size="0.4rem"
              class="icon"
            >
            </my-icon>
          </a>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    servicelist: {
      type: Object,
      required: true,
      default: () => {
        return {
          id: '',
          actualViews: '7295',
          defaultSales: '5173',
          actualSales: '5173',
          price: '2288',
          bgimage:
            'https://cdn.shupian.cn/sp-pt/wap/images/5uwyafh2j1g0000.png',
          planner: {
            id: '',
            name: '',
            jobNum: '',
            telephone: '',
            imgSrc:
              'http://fastdfs.dggvip.net:8080/group1/M00/02/C0/wKiyYlubWPyEbXyQAAAAAH6D3Zw879.jpg',
          },
        }
      },
    },
    md: {
      type: Object,
      default: () => {
        return {
          imMd: {
            name: '代理记账服务介绍_小规模纳税人代理记账_在线咨询',
            type: '售前',
          },
          telMd: {
            name: '代理记账服务介绍_小规模纳税人代理记账_拨打电话',
            type: '售前',
          },
          clickMd: {
            name: '代理记账服务介绍_小规模纳税人代理记账',
            type: '售前',
          },
        }
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    call(tel) {
      window.location.href = `tel:${tel}`
      event.stopPropagation()
    },
    openIM(url, planner) {
      if (url) {
        window.open(url, '_blank')
      } else {
        const guiHuaShi = planner
        this.$root.$emit(
          'openIMM',
          guiHuaShi.id,
          guiHuaShi.name || '',
          guiHuaShi.jobNum || '',
          guiHuaShi.imgSrc || ''
        )
      }
    },
  },
}
</script>

<style lang="less" scoped>
.serviceIntroduced {
  width: 100%;
  > a {
    display: block;
    height: 458px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    background-repeat: no-repeat;
    background-position: 0px -3px;
    background-size: 101% 100%;
    position: relative;
    .total {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 32px;
      margin-top: 244px;
      > div {
        position: relative;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        &:not(:first-child)::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 40px;
          background: #f4f4f4;
          left: -25px;
        }
        > span {
          display: block;
          &:first-child {
            font-size: 32px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 32px;
          }
          &:last-child {
            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 22px;
            margin-top: 11px;
          }
        }
      }
    }
    .line {
      margin-top: 32px;
      height: 1px;
      border-top: 1px solid #f4f4f4;
    }
    .contact {
      padding: 0 32px 0 34px;
      position: absolute;
      bottom: 5.26%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .price {
        font-size: 40px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
        line-height: 40px;
        display: flex;
        align-items: flex-end;

        > span {
          display: block;
        }
        > span:last-child {
          font-size: 22px;
          line-height: 30px;
          font-weight: normal;
        }
      }
      .contact-btn {
        width: 240px;
        height: 72px;
        background: #ebf3ff;
        border-radius: 36px;
        display: flex;
        align-items: center;
        position: relative;
        > a {
          width: 56px;
          height: 56px;
          position: relative;
          .icon {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-top: -20px;
            margin-left: -20px;
          }
        }
        > a:first-child {
          background: #4974f5;
          border-radius: 50%;
          margin-left: 8px;
          display: flex;
          > img {
            width: 100%;
            border-radius: 50%;
          }
        }
        > a:not(:first-child) {
          width: 40px;
          height: 40px;
          position: absolute;
          top: 50%;
          margin-top: -22px;
        }
        > a:nth-child(2) {
          left: 104px;
        }
        > a:last-child {
          right: 24px;
        }
      }
    }
  }
}
</style>
