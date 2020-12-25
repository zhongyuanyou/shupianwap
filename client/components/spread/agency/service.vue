<template>
  <div class="service">
    <span class="service-title">服务介绍</span>
    <div class="prolist">
      <ul>
        <li
          v-for="(item, index) in servicelist"
          :key="index"
          v-md-map
          v-md:webClick
          :style="{ backgroundImage: 'url(' + item.bgimage + ')' }"
          data-name="变更服务介绍_item.plannerName_在线咨询"
          @click="plannerIm(item.planner)"
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
              <span>成功注册</span>
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
                data-name="变更服务介绍_item.plannerName_在线咨询"
                @click="
                  () => {
                    $parent.openIM(item.url)
                  }
                "
              >
                <img :src="item.planner.avatarImg" alt="" />
              </a>
              <a
                v-md-map
                v-md:p_IMClick
                href="javascript:;"
                data-im_type="售前"
                data-name="变更服务介绍_item.plannerName_在线咨询"
                @click="
                  () => {
                    $parent.openIM(item.url)
                  }
                "
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
                data-name="变更服务介绍_item.plannerName_拨打电话"
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
    </div>
  </div>
</template>

<script>
import { planner } from '../../../api'
import MyIcon from '../../common/myIcon/MyIcon.vue'
export default {
  components: { MyIcon },
  props: {
    servicelist: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    plannerIm(planner) {
      const guiHuaShi = planner
      this.$root.$emit(
        'openIMM',
        guiHuaShi.id,
        guiHuaShi.name || '',
        guiHuaShi.jobNum || '',
        planner.imgSrc
      )
    },
    call(tel) {
      window.location.href = `tel:${tel}`
      event.stopPropagation()
    },
  },
}
</script>

<style lang="less" scoped>
.service {
  width: 100%;
  margin-top: 63px;
  padding: 0 40px;
  .service-title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 39px;
  }
  .prolist {
    margin-top: 31px;
    > ul {
      > li {
        position: relative;
        width: 670px;
        height: 456px;
        border: 1px solid rgba(205, 205, 205, 0.3);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        background-repeat: no-repeat;
        background-position: 0px -3px;
        background-size: 100% 100%;

        &:not(:first-child) {
          margin-top: 24px;
        }
        > img {
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .total {
          width: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          bottom: 33.55%;
          padding-left: 32px;
          > div {
            display: flex;
            flex-direction: column;
            flex: 1;

            > span {
              display: block;
              font-size: 32px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #222222;
              line-height: 31px;
              &:last-child {
                font-size: 22px;
                font-weight: normal;
                color: #999999;
                line-height: 21px;
                margin-top: 10px;
              }
            }
          }
        }
        .line {
          width: 100%;
          border: 1px dashed #f4f4f4;
          position: absolute;
          bottom: 26.32%;
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
              display: block;
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
  }
}
</style>
