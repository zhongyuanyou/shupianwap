<template>
  <div class="handleType">
    <!-- S 标题办理类型 -->
    <div class="handleType_title">
      <h2>选择办理类型</h2>
    </div>
    <!-- E 标题办理类型 -->
    <!-- S 类型导航 -->
    <div class="handleType_content">
      <div class="handleType_content_nav">
        <ul>
          <li v-for="(items, index) in titleList" :key="index">
            <a
              v-sensorsTrack:webClick="{
                name: `许可证办理类型_${items}`,
              }"
              href="javascript:void(0)"
              :class="active === index ? 'liactive' : ''"
              @click="handleNav(index)"
            >
              <span> {{ items }}</span></a
            >
          </li>
        </ul>
      </div>
      <div class="handleType_content_detail">
        <div
          v-for="(item, index) in typeList"
          v-show="active === index"
          :key="index"
          class="handleType_content_detail_box"
        >
          <div
            v-for="(title, ind) in item.congtenlist"
            :key="ind"
            class="handleType_content_detail_box_head"
          >
            <!-- 许可证title -->
            <div class="handleType_content_detail_box_head_title">
              <h3>
                {{ title.operating.showName }}
                <span
                  ><img
                    src="https://cdn.shupian.cn/sp-pt/wap/images/cr4yfd0fvhk0000.png"
                    alt=""
                /></span>
              </h3>
              <p>{{ title.operating.slogan }}</p>
            </div>
            <!-- 场所设备 -->
            <div class="handleType_content_detail_box_head_standard">
              <div class="imgbox">
                <img
                  src="https://cdn.shupian.cn/sp-pt/wap/images/q1hyl5ug50g000.png"
                  alt=""
                />
                <span>{{ title.operating.standard }}</span>
              </div>
              <div class="imgbox">
                <img
                  src="https://cdn.shupian.cn/sp-pt/wap/images/q1hyl5ug50g000.png"
                  alt=""
                />
                <span>{{ title.operating.flow }}</span>
              </div>
            </div>
            <!-- 在线咨询 -->
            <div class="handleType_content_detail_box_head_total">
              <div>
                <span>{{ title.operating.actualViews }}</span>
                <span>在线咨询</span>
              </div>
              <div>
                <span>{{ title.operating.defaultSales }}</span>
                <span>累计成交</span>
              </div>
              <div>
                <span>{{ title.operating.actualSales }}</span>
                <span>成功案例</span>
              </div>
            </div>
            <!-- 下划线 -->
            <div class="handleType_content_detail_box_head_line"></div>
            <!-- 价格联系 -->
            <div class="handleType_content_detail_box_head_relation">
              <span>{{ title.referencePrice }}<i>元起</i></span>
              <div>
                <a
                  v-sensorsTrack:p_IMClick="{
                    name: `许可证办理类型_${title.operating.showName}_在线咨询`,
                    im_type: '售前',
                  }"
                  href="javascript:void(0)"
                  @click="plannerIm(title)"
                >
                  <img :src="title.portraitImg" alt="" />
                </a>
                <a
                  v-sensorsTrack:p_IMClick="{
                    name: `许可证办理类型_${title.operating.showName}_在线咨询`,
                    im_type: '售前',
                  }"
                  href="javascript:void(0)"
                  @click="plannerIm(title)"
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
                  v-sensorsTrack:p_IMClick="{
                    name: `许可证办理类型_${title.operating.showName}_拨打电话`,
                    im_type: '售前',
                  }"
                  href="javascript:void(0)"
                  @click="call(title.telephone)"
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
          </div>
        </div>
      </div>
    </div>
    <!-- E 类型导航 -->
  </div>
</template>

<script>
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: { MyIcon },
  props: {},
  data() {
    return {
      typeList: [
        {
          congtenlist: [
            {
              id: 'extendBussineChange1',
              name: '刘德华',
              telephone: '17717888696',
              referencePrice: 1800,
              portraitImg:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
              plannerName: '',
              operating: {
                showName: '食品经营许可证',
                slogan: '从事食品销售和餐饮服务活动的都需要依法取得',
                productDescribe:
                  '因公司经营变化、业务拓展等原因需要变更公司名称',
                actualViews: '10万+',
                defaultSales: '9.6万+',
                actualSales: '9.6万+',
                standard: '有相应场所',
                flow: '有相应设备等',
              },
            },
            {
              id: 'extendBussineChange1',
              telephone: '17717888696',
              name: '张学友',
              referencePrice: 1800,
              portraitImg:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
              operating: {
                showName: '食品生产许可证',
                slogan: '从事食品加工业务需要办理',
                productDescribe:
                  '因公司经营变化、业务拓展等原因需要变更公司名称',
                actualViews: '8万+',
                defaultSales: '7万+',
                actualSales: '7万+',
                standard: '符合食品安全标准',
                flow: '有标准工艺流程',
              },
            },
          ],
        },
        {
          congtenlist: [
            {
              id: 'extendBussineChange1',
              name: '郭富城',
              telephone: '17717888696',
              referencePrice: 25000,
              portraitImg:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
              operating: {
                showName: '人力资源服务许可证',
                slogan: '经营性人力资源机构的需要办理',
                productDescribe:
                  '因公司经营变化、业务拓展等原因需要变更公司名称',
                actualViews: '9万+',
                defaultSales: '8.4万+',
                actualSales: '8.4万+',
                standard: '有规范名称',
                flow: '有5名专职人员',
              },
            },
            {
              id: 'extendBussineChange1',
              name: '黎明',
              telephone: '17717888696',
              referencePrice: 25000,
              portraitImg:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
              operating: {
                showName: '劳务派遣许可证',
                slogan: '经营劳务派遣的公司需要办理',
                productDescribe:
                  '因公司经营变化、业务拓展等原因需要变更公司名称',
                actualViews: '6万+',
                defaultSales: '5.7万+',
                actualSales: '5.7万+',
                standard: '注册资金200万',
                flow: '有经营场所',
              },
            },
          ],
        },
        {
          congtenlist: [
            {
              id: 'extendBussineChange1',
              name: '范冰冰',
              telephone: '17717888696',
              referencePrice: 28000,
              portraitImg:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
              operating: {
                showName: '医疗器械经营许可证',
                slogan: '售卖医用电子设备等需要办理',
                productDescribe:
                  '因公司经营变化、业务拓展等原因需要变更公司名称',
                actualViews: '9千+',
                defaultSales: '8千+',
                actualSales: '8千+',
                standard: '有贮存场所',
                flow: '有相应管理制度',
              },
            },
            {
              id: 'extendBussineChange1',
              name: '章子怡',
              telephone: '17717888696',
              referencePrice: 12000,
              portraitImg:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
              operating: {
                showName: '互联网药品信息服务许可证',
                slogan: '通过互联网提供药品信息等服务需要办理',
                productDescribe:
                  '因公司经营变化、业务拓展等原因需要变更公司名称',
                actualViews: '2千+',
                defaultSales: '1千+',
                actualSales: '1千+',
                standard: '依法设立的组织',
                flow: '有2名相关技术人员',
              },
            },
          ],
        },
      ],
      titleList: ['食品经营', '人力资源', '医疗药品'],
      active: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 切换导航
    handleNav(index) {
      this.active = index
    },
    //  唤起IM
    plannerIm(planner) {
      console.log(planner)
      const guiHuaShi = planner
      this.$root.$emit(
        'openIMM',
        guiHuaShi.id,
        guiHuaShi.name || '',
        guiHuaShi.jobNum || '',
        planner.imgSrc || ''
      )
    },
    // 拨打电话
    call(tel) {
      window.location.href = `tel:${tel}`
      // event.stopPropagation()
    },
  },
}
</script>
<style lang="less" scoped>
.handleType {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  &_title {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-top: 64px;
    > h2 {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
      padding-bottom: 5px;
    }
  }
  &_content {
    width: 100%;
    ul {
      margin-top: 35px;
      display: flex;
      justify-content: left;
      align-items: center;
      li {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        border-radius: 8px;
        > a {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          padding: 12px 25px;
          border-radius: 8px;
        }
        .liactive {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4974f5;
          padding: 12px 25px;
          font-weight: bold;
          background: #ecf1fe;
        }
      }
    }
    &_detail {
      width: 100%;
      &_box {
        width: 100%;
        margin-top: 32px;
        &_head {
          width: 100%;
          border: 1px solid rgba(205, 205, 205, 0.5);
          border-radius: 8px;
          margin-bottom: 24px;
          &_title {
            width: 100%;
            background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/cyygefrhjpk0000.png');
            background-size: 100% 100%;
            border-radius: 6.5px 6.5px 0px 0px;
            // height: 160px;
            > h3 {
              font-size: 32px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #ffffff;
              padding: 40px 0 0 33px;
              > span {
                > img {
                  display: inline-block;
                  width: 88px;
                  height: 32px;
                  border-radius: 10px 3px 10px 3px;
                  margin: -5px 0 0 20px;
                }
              }
            }
            > p {
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              opacity: 0.6;
              padding: 25px 0 41px 33px;
            }
          }
          &_standard {
            display: flex;
            justify-content: left;
            .imgbox {
              display: flex;
              justify-content: space-evenly;
              align-items: center;
              padding: 32px 0 0px 32px;
              img {
                display: block;
                width: 24px;
                height: 24px;
                margin-right: 12px;
              }
              span {
                display: block;
                font-size: 24px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #555555;
              }
            }
          }
          &_total {
            width: 100%;
            padding-left: 32px;
            padding-top: 10px;
            > div {
              display: inline-block;
              padding-right: 70px;
              > span {
                display: block;
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 36px;
                margin-bottom: 15px;
              }
              span:first-child {
                height: 28px;
                font-size: 32px;
                font-family: PingFang SC;
                font-weight: bold;
                color: #222222;
                line-height: 36px;
              }
            }
          }
          &_line {
            margin: 0 32px 0 32px;
            height: 1px;
            background: #cdcdcd;
            opacity: 0.5;
          }
          &_relation {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 32px 32px 32px 35px;
            > span {
              display: block;
              font-size: 40px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #ec5330;
              > i {
                font-style: normal;
                font-weight: normal;
                font-size: 24px;
              }
            }
            > div {
              width: 240px;
              height: 72px;
              background: #ecf1fe;
              border: 1px solid #4974f5;
              border-radius: 36px;
              font-size: 40px;
              padding-left: 8px;
              padding-right: 28px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              > a {
                display: inline-block;
                > img {
                  width: 56px;
                  height: 56px;
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
