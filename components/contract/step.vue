<template>
  <div class="cgstep" :style="{ background: bgcolor }" :class="stepClass">
    <h1 v-if="istitle" :class="titleClass ? titleClass : ''">
      {{ list[active].name }}
    </h1>
    <div class="box" :style="{ left: left + '%' }">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="list"
        :style="{ width: parseInt(100 / list.length) + '%' }"
      >
        <div class="iconbox">
          <Icon
            :name="index <= active ? 'passed' : 'circle'"
            class="icon"
            size="0.4rem"
            :color="index <= active ? '#ffffff' : '#cdcdcd'"
          />
          <span
            class="hr"
            :style="{ opacity: index >= active ? '' : '1' }"
          ></span>
        </div>
        <p>
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
export default {
  name: 'Step',
  components: {
    Icon,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    active: {
      type: Number,
      default() {
        return 0
      },
    },
    bgcolor: {
      type: String,
      default() {
        return '#fffff'
      },
    },
    istitle: {
      type: String,
      default() {
        return false
      },
    },
    titleClass: {
      type: String,
      default() {
        return ''
      },
    },
    stepClass: {
      type: String,
      default() {
        return ''
      },
    },
    left: {
      type: Number,
      default() {
        return 0
      },
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.cgstep {
  overflow: hidden;
  > h1 {
    font-size: 32px;
    color: #fff;
    text-align: center;
    font-weight: normal;
  }
  > .box {
    margin-top: 20px;
    display: flex;
    width: 100%;
    position: absolute;
    > .list {
      > .iconbox {
        width: 40px;
        display: flex;
        align-items: center;
        width: 100%;
        /deep/.icon {
          padding: 0 19px;
        }
        .hr {
          width: calc(100% - 40px);
          height: 1px;
          display: block;
          background: #fff;
          opacity: 0.6;
        }
      }
      > p {
        font-size: 28px;
        font-weight: 400;
        color: #ffffff;
      }
    }
    > .list:first-child {
      > .iconbox {
        /deep/.icon {
          padding-left: 20px;
        }
      }
    }
    > .list:last-child {
      .hr {
        display: none;
      }
    }
  }
}
</style>
