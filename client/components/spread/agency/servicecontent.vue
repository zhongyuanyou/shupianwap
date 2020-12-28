<template>
  <div class="servicecontent">
    <span class="title">服务内容</span>
    <div class="content">
      <div class="content-title">
        <span
          v-for="item in ContentTitle"
          :key="item.code"
          v-md-map
          v-md:webClick
          :class="[actived == item.code ? 'isactive' : '']"
          data-name="代理记账服务内容_选项卡_item.title"
          @click="select(item.code)"
          >{{ item.title }}</span
        >
      </div>
      <div class="content-msg">
        <ul v-show="actived == 1" class="basisbox">
          <li v-for="(item, index) in basis" :key="index">
            <span>{{ item.servicetitle }}</span>
            <span>{{ item.msg }}</span>
          </li>
        </ul>
        <ul v-show="actived == 2" class="givingbox">
          <li v-for="(item, index) in giving" :key="index">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="consultingbtn">
      <a
        v-md-map
        v-md:WebClick
        v-md:p_IMClick
        href="javascript:;"
        data-im_type="售前"
        data-form_type="售前"
        @click="call"
      >
        <img
          src="~/assets/spreadImages/agency/busi_img_dljznrtel@1,5x.png"
          alt=""
        />
        <span>一键代办咨询</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      telephone: '',
      ContentTitle: [
        {
          code: 1,
          title: '基础服务',
        },
        {
          code: 2,
          title: '赠送服务',
        },
      ],

      basis: [
        {
          servicetitle: '记账服务：',
          msg: '总账、明细账、往来账、工资表审核等',
        },
        {
          servicetitle: '发票服务：',
          msg: '协助首次批票、代开专票等',
        },
        {
          servicetitle: '财税咨询服务：',
          msg: '财务顾问上门诊断等',
        },
        {
          servicetitle: '报表服务：',
          msg: '纳税申请表，财务报表上传等',
        },
        {
          servicetitle: '税务服务：',
          msg: '协助办理各种税务等',
        },
        {
          servicetitle: '报税服务：',
          msg: '增值税、附加税、企业所得税汇算等',
        },
      ],
      giving: [
        '税务年报、工商年报',
        '指导客户抄税清卡',
        '手机实时查账',
        '代为保管凭证',
        '提供工资表格模板',
        '免费财税咨询建议',
        '*具体赠送服务以实际业务为准',
      ],
      actived: 1,
    }
  },
  created() {
    this.telephone = this.$parent.planner.telephone
  },
  methods: {
    select(code) {
      this.actived = code
    },
    call() {
      window.location.href = `tel:${this.telephone}`
    },
  },
}
</script>

<style lang="less" scoped>
.servicecontent {
  width: 100%;
  margin-top: 64px;
  padding: 0 40px;
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 38px;
  }
  .content {
    margin-top: 31px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.3);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    height: 470px;
    .content-title {
      display: flex;
      align-items: center;
      > span {
        display: block;
        flex: 1;
        text-align: center;
        height: 80px;
        line-height: 80px;
        width: 335px;
        background: #f4f4f4;
        border-radius: 0px 8px 0px 0px;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #555555;
        &:first-child {
          border-radius: 8px 0px 0px 0px;
        }
      }
      .isactive {
        color: #ffffff;
        background: #4974f5;
      }
    }
    .content-msg {
      padding: 40px 0 45px 32px;
      .basisbox {
        > li {
          display: flex;
          align-items: center;
          &:not(:first-child) {
            margin-top: 31px;
          }
          > span {
            display: block;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 25px;
            &:last-child {
              color: #555555;
              font-weight: normal;
            }
          }
        }
      }
      .givingbox {
        padding: 40 0;
        > li {
          display: flex;
          justify-content: center;
          align-items: center;
          &:not(:first-child) {
            margin-top: 22.5px;
          }
          &:last-child {
            > span {
              color: #4974f5;
            }
          }
          > span {
            display: block;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 25px;
          }
        }
      }
    }
  }
  .consultingbtn {
    padding: 0 32px;
    margin-top: 32px;
    > a {
      display: block;
      width: 100%;
      height: 80px;
      background: #4974f5;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        display: block;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        margin-left: 22px;
      }
      > img {
        height: 32px;
        width: 29px;
      }
    }
  }
}
</style>
