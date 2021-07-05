<template>
  <footer class="footer-nav">
    <slot></slot>
    <ul class="footer-nav-ul">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="footer-nav-ul-li"
        @click="ClickItem(item, index)"
      >
        <span class="item">
          <my-icon
            class="my-icon"
            :name="item.iconName"
            size="0.32rem"
            color="#222222"
          ></my-icon>
          <span class="name" :style="{ color: '#222222' }">
            {{ item.name }}
          </span>
        </span>
      </li>
    </ul>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterNav',
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      unreadNum: 0,
      active: 'home',
      DefaultColor: '#222222',
      ActiveColor: '#4974F5',
    }
  },

  mounted() {},
  methods: {
    ClickItem(item, index) {
      if (item.path) {
        return this.$router.push({
          path: item.path,
        })
      }
      this.$emit('handelClick', item, index)
    },
  },
}
</script>
<style lang="less" scoped>
.footer-nav {
  position: fixed;
  left: 0;

  bottom: 0;
  z-index: 999;
  width: 100%;
  background: #ffffff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  > .footer-nav-ul {
    width: 100%;
    // height: 100%;
    display: flex;
    align-items: center;
    > .footer-nav-ul-li {
      flex: 1;
      display: flex;
      // height: 98px;
      padding: 19px 0 24px 0;

      .item {
        position: relative;
        width: 100%;

        display: flex;
        // justify-content: space-between;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        > .name {
          margin-top: 10px;
          font-size: 26px;
          line-height: 26px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #999999;
        }
      }
    }
    > .footer-nav-ul-li .item::after {
      position: absolute;
      left: 0;

      content: '';
      height: 100%;
      width: 1px;
      background-color: #f4f4f4;
    }
    > .footer-nav-ul-li:nth-child(1) .item::after {
      width: 0;
    }
  }
}
</style>
