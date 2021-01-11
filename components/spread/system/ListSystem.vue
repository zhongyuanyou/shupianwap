<template>
  <div class="list-system">
    <h3>服务介绍</h3>
    <div
      class="list-systemt_hidden"
      :class="isMore ? 'register-list_max' : 'register-list_max--active'"
    >
      <div v-for="(item, index) of 3" :key="index" class="list-box">
        <div>
          <p>ISO9001质量管理体系</p>
          <p>证明管理系统整合上已达到了国际标准</p>
        </div>
        <div>
          <span class="explain"
            ><img
              src="https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png"
              alt=""
            />
            <span>公司成立3月以上</span>
          </span>
          <span class="explain"
            ><img
              src="https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png"
              alt=""
            />
            <span>临时场所清单</span>
          </span>
        </div>
        <div></div>
        <div></div>
        <i></i>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Image, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Introduction',
  components: {
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Toast.name]: Toast,
  },
  props: {
    listCount: {
      type: Array,
      default: () => {
        return []
      },
    },
    isMore: {
      type: Boolean,
      default: () => {
        return false
      },
    },
  },
  methods: {
    // onMessage(url, index, e) {
    //   if (e.target.dataset.stop !== 'stop') {
    //     if (url !== '') {
    //       window.location.href = url
    //     } else {
    //       this.$root.$emit(
    //         'openIMM',
    //         this.listCount[index].id,
    //         this.listCount[index].name,
    //         this.listCount[index].jobNum,
    //         this.listCount[index].imgSrc
    //       )
    //     }
    //   }
    // },
    // onPhone(index) {
    //   window.location.href = `tel:${this.listCount[index].telephone}`
    // },
  },
}
</script>
<style lang="less" scoped>
.list-system {
  h3 {
    margin: 56px 0 32px 42px;
    height: 40px;
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  .list-systemt_hidden {
    padding: 0 40px;
    .list-box {
      position: relative;
      width: 670px;
      height: 475px;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 8px;
      background: url('https://cdn.shupian.cn/sp-pt/wap/4q11d4ic92c0000.png');
      background-size: 100%;
      margin-bottom: 26px;
      i {
        display: inline-block;
        width: 63px;
        height: 71px;
        position: absolute;
        // ~assets/spreadImages/registeredDemandCard/ic_cg.png
        background: url('https://cdn.shupian.cn/sp-pt/wap/ecugiwf5qgo0000.png');
        background-size: 100%;
        top: 0px;
        right: 0px;
      }
      div:first-child {
        width: 668px;
        height: 131px;
        border-radius: 8px 8px 0px 0px;
        padding: 32px 34px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p {
          font-size: 32px;
          font-weight: bold;
          color: #222222;
          line-height: 31px;
        }
        p:last-child {
          font-size: 24px;
          font-weight: 400;
          line-height: 24px;
          color: #999999;
        }
      }
      div:nth-child(2) {
        height: 90px;
        line-height: 90px;
        border-bottom: 1px solid red;
        padding-left: 32px;
        display: flex;
        align-items: center;
        .explain {
          display: flex;
          position: relative;
          img {
            width: 24px;
            height: 25px;
          }
          span {
            padding-left: 14px;
            font-size: 26px;
            font-weight: 400;
            color: #555555;
            line-height: 25px;
          }
        }
        .explain:last-child {
          position: absolute;
          left: 50%;
        }
      }
    }
  }

  // 选择更多高度
  .register-list_max {
    max-height: auto;
  }
  .register-list_max--active {
    max-height: auto;
  }
}
</style>
