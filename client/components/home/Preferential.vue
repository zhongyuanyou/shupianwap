<template>
  <div v-if="initData.length" class="preferential-centent">
    <TabCurve
      v-model="curentItem"
      :tab-list="tabBtn"
      :need-fixed="false"
      name-field="locationName"
      @selectTabHandle="selectTabHandle"
    ></TabCurve>
    <div ref="rollRef" class="scroll-centent">
      <ul v-if="tabBtn[curentItem]">
        <li
          v-for="(item, index) in tabBtn[curentItem].sortMaterialList"
          :key="index"
        >
          <a
            href="javascript:void(0)"
            @click="adJumpHandleMixin(item.materialList[0])"
          >
            <!-- <div class="label-num">
              <span class="label">抢购中</span>
              <span class="num">缺字段人购买</span>
            </div> -->
            <!-- <div class="text-content">
              <strong>{{ item.materialList[0].materialName }}</strong>
              <p>{{ item.materialList[0].materialDescription }}</p>
            </div> -->
            <img
              v-lazy="item.materialList[0].materialUrl + $ossImgSet(327, 228)"
              alt=""
            />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TabCurve from '@/components/common/tab/TabCurve'
import { publicApi } from '@/api'
import adJumpHandle from '~/mixins/adJumpHandle'
export default {
  components: {
    TabCurve,
  },
  mixins: [adJumpHandle],
  props: {
    initData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      curentItem: 0,
    }
  },
  computed: {
    tabBtn() {
      return this.initData
    },
  },
  methods: {
    selectTabHandle() {
      this.$refs.rollRef.scrollLeft = 0
    },
  },
}
</script>

<style scoped lang="less">
.preferential-centent {
  width: 100%;
  padding-bottom: 32px;
  .scroll-centent {
    display: flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-left: 40px;
    -webkit-overflow-scrolling: touch;
    margin-top: 16px;
    ul {
      display: flex;
      li {
        width: 327px;
        height: 228px;
        overflow: hidden;
        border-radius: 8px;
        margin-right: 16px;
        &:last-child {
          margin-right: 40px;
        }
        > a {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          //   &::after {
          //     content: '';
          //     width: 100%;
          //     height: 100%;
          //     position: absolute;
          //     left: 0;
          //     top: 0;
          //     background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), #000000);
          //     z-index: 1;
          //   }
          .label-num {
            display: block;
            margin: 12px 0 0 12px;
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            height: 31px;
            border-radius: 4px;
            overflow: hidden;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.6);
            padding-right: 9px;
            > .label {
              height: 31px;
              display: flex;
              align-items: center;
              font-size: inherit;
              padding: 0 9px;
              background: linear-gradient(-90deg, #ef8572, #e6624b);
              border-radius: 4px 0px 0px 4px;
              margin-right: 9px;
            }
            > .num {
              flex: 1;
              .textOverflow(1);
            }
          }
          .text-content {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 2;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0 23px 25px 23px;
            > strong {
              font-size: 28px;
              line-height: 38px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #ffffff;
              .textOverflow(1);
            }
            > p {
              font-size: 22px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              opacity: 0.6;
              line-height: 32px;
              margin-top: 5px;
              .textOverflow(1);
            }
          }
          > img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
