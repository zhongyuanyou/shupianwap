<template>
  <div class="introduce">
    <my-title title="业务介绍" />
    <ul class="introduce-box">
      <li
        v-for="(item, i) of serviceList"
        v-show="showCount > i ? true : false"
        :key="i"
        v-sensorsTrack:p_IMClick="{
          name: `工商注销业务介绍_${item.title}_在线咨询`,
          im_type: '售前',
        }"
        class="introduce-box-item"
        @click="plannerIm(item.planner)"
      >
        <!-- 标题框 -->
        <div class="introduce-box-item-title">
          <div class="introduce-box-item-title-box">
            <p class="introduce_title">{{ item.title }}</p>
            <img :src="item.titlelable" alt="" />
          </div>
          <p class="introduce-box-item-title-desc">{{ item.titleContent }}</p>
        </div>
        <!-- 标签 -->
        <div class="introduce-tags">
          <div
            v-for="(value, index) of item.tags"
            :key="index"
            class="introduce-tags-item"
          >
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/4zncfqtj0u80000.png"
              alt=""
            />
            <div class="introduce-tags-item-content">{{ value }}</div>
          </div>
        </div>
        <!-- 售卖数量 -->
        <div class="introduce-count">
          <div
            v-for="(val, a) of item.number"
            :key="a"
            class="introduce-count-item"
          >
            <div class="introduce-count-item-num">
              {{ val.num }}
            </div>
            <div class="introduce-count-item-desc">{{ val.content }}</div>
          </div>
        </div>
        <!-- 价格、联系人 -->
        <div class="introduce-contact">
          <div class="price">
            <span>{{ item.lowerPrice }}</span
            ><span>元起</span>
          </div>

          <div class="contact-btn">
            <a href="javascript:;">
              <img :src="item.planner.imgSrc" alt="" />
            </a>
            <a
              v-sensorsTrack:p_IMClick="{
                name: `工商注销业务介绍_${item.title}_在线咨询`,
                im_type: '售前',
              }"
              href="javascript:;"
              @click="plannerIm(item.planner)"
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
              v-sensorsTrack:webClick="{
                name: `工商注销业务介绍_${item.title}_拨打电话`,
              }"
              href="javascript:;"
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
      </li>
    </ul>
    <!-- 查看更多 -->
    <a href="javascript:;" class="a-clear">
      <div
        v-sensorsTrack:webClick="{
          name: `工商注销业务介绍_更多服务`,
        }"
        class="more"
        @click="showMore"
      >
        {{ isMore ? '收起' : '更多服务' }}
      </div>
    </a>
  </div>
</template>
<script>
import MyIcon from '../../common/myIcon/MyIcon.vue'
import MyTitle from '~/components/spread/businessCancellation/MyTitle'
export default {
  components: {
    MyTitle,
    MyIcon,
  },
  props: {
    // serviceList: {
    //   type: Array,
    //   requried: true,
    // },
  },
  data() {
    return {
      showCount: 2,
      isMore: false,
      serviceList: [
        {
          title: '公司注销',
          titlelable:
            'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
          titleContent: '当公司不经营时申请注销，终止公司法人资格。',
          lowerPrice: '2500',
          tags: ['快至30个工作日', '成功率高，省心省钱'],
          number: [
            { content: '在线咨询', num: 180020 },
            { content: '累计成交', num: 150000 },
            { content: '成功案例', num: 159090 },
          ],
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc: 'https://mgs.dgg.cn/_nuxt/img/gs_img_gwman.1e0eb6a.jpg',
          },
        },
        {
          title: '工商注销',
          titlelable:
            'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
          titleContent: '企业税务或税务已清税的情况下的营业执照注销。',
          lowerPrice: '1000',
          tags: ['快至30个工作日', '流程手续正规化'],
          number: [
            { content: '在线咨询', num: 120020 },
            { content: '累计成交', num: 100000 },
            { content: '成功案例', num: 100320 },
          ],
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc: 'https://mgs.dgg.cn/_nuxt/img/gs_img_gwman.1e0eb6a.jpg',
          },
        },
        {
          title: '个体注销',
          titlelable:
            'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
          titleContent: '个体工商户不再从事经营活动办理的注销登记。',
          lowerPrice: '2000',
          tags: ['快至30个工作日', '专业团队申请，快速高效'],
          number: [
            { content: '在线咨询', num: 130020 },
            { content: '累计成交', num: 120000 },
            { content: '成功案例', num: 129090 },
          ],
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc: 'https://mgs.dgg.cn/_nuxt/img/gs_img_gwman.1e0eb6a.jpg',
          },
        },
        {
          title: '简易注销',
          titlelable:
            'https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png',
          titleContent: '企业无经营活动，无债权债务的企业注销。',
          lowerPrice: '998',
          tags: ['快至30个工作日', '流程透明化，节点清晰可查'],
          number: [
            { content: '在线咨询', num: 50020 },
            { content: '累计成交', num: 44000 },
            { content: '成功案例', num: 44909 },
          ],
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc: 'https://mgs.dgg.cn/_nuxt/img/gs_img_gwman.1e0eb6a.jpg',
          },
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /** 格式化数字 */
    formatterNum(val) {
      return (val / 10000).toFixed(0) + '万+'
    },
    showMore() {
      if (this.isMore) {
        this.showCount = 2
        this.isMore = false
      } else {
        this.isMore = true
        this.showCount = this.serviceList.length
      }
    },
    call(telephone) {
      window.location.href = `tel:${telephone}`
      event.stopPropagation()
    },
    plannerIm(planner) {
      const guiHuaShi = planner
      this.$root.$emit(
        'openIMM',
        guiHuaShi.id,
        guiHuaShi.name || '',
        guiHuaShi.jobNum || '',
        planner.imgSrc || ''
      )
    },
  },
}
</script>
<style lang="less" scoped>
.introduce {
  width: 100%;
  padding: 31px 40px 32px;
}
.introduce-box {
  width: 100%;
  list-style: none;
  margin-bottom: 32px;
  &-item {
    width: 100%;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 8px;
    margin-bottom: 24px;
    overflow: hidden;
    &-title {
      width: 100%;
      height: 160px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/d4ynsvxsx9c0000.png');
      background-position-y: -10px;
      padding: 40px 33px;
      margin-bottom: 32px;
      &-box {
        display: flex;
        height: 32px;
        align-items: center;
        margin-bottom: 24px;
        .introduce_title {
          font-size: 32px;
          font-weight: bold;
          color: #222222;
          line-height: 31px;
          margin-right: 15px;
        }
        > img {
          width: 88px;
          height: 32px;
        }
      }
      &-desc {
        font-size: 24px;
        font-weight: 400;
        color: #555555;
        line-height: 23px;
      }
    }
  }
}
.introduce-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 24px;
  width: 100%;
  padding-left: 32px;
  margin-bottom: 56px;
  &-item {
    display: flex;
    height: 24px;
    align-items: center;
    margin-right: 39px;
    > img {
      width: 24px;
      height: 24px;
      margin-right: 13px;
    }
    &-content {
      font-size: 24px;
      font-weight: 400;
      color: #555555;
    }
  }
}
.introduce-count {
  display: flex;
  width: calc(100% - 64px);
  margin: 0 32px;
  border-bottom: 1px solid rgba(205, 205, 205, 0.5);
  padding-bottom: 32px;
  &-item {
    margin-right: 122px;
    &:last-child {
      margin-right: 0;
    }
    &-num {
      font-size: 32px;
      font-weight: bold;
      color: #222222;
      line-height: 31px;
      margin-bottom: 12px;
      text-align: center;
    }
    &-desc {
      font-size: 22px;
      font-weight: 400;
      color: #999999;
      line-height: 21px;
    }
  }
}
.introduce-contact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 136px;
  width: 100%;
  padding: 0 32px;
  .price {
    display: flex;
    align-items: center;
    // height: 33px;

    > span:first-child {
      font-size: 40px;
      font-weight: bold;
      color: #ec5330;
    }
    > span:last-child {
      font-size: 24px;
      color: #ec5330;
      margin-top: 8px;
    }
  }
  .contact-btn {
    width: 240px;
    height: 72px;
    background: #ecf1fe;
    border: 1px solid #4974f5;
    border-radius: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 8px;
    padding-right: 24px;
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
      border-radius: 50%;
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
.more {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 88px;
  background: #ecf1fe;
  border-radius: 8px;
  font-size: 32px;
  font-weight: bold;
  color: #4974f5;
}
.a-clear {
  text-decoration: none;
  color: inherit;
}
</style>
