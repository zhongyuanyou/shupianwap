<template>
  <div class="container" :class="{ state: state === 1 }">
    <div class="col active">
      <div class="num">24</div>
      <div class="label">全部服务</div>
    </div>
    <div class="col">
      <div class="num">12</div>
      <div class="label">秒杀进行中</div>
    </div>
    <div class="col">
      <div class="num">12</div>
      <div class="label">即将开始</div>
    </div>
    <div class="col">
      <div class="num">36</div>
      <div class="label">秒杀结束</div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Sum',
  components: {},
  props: {
    state: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {}
  },
  computed: {
    sty() {
      if (this.state === 1) {
        return {
          background: '#ffffff',
        }
      }
      return {
        background: '#ffffff',
      }
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  padding: 16px 0;
  background: #ffffff;
  border-radius: 1px;

  display: flex;
  font-size: 0;
  text-align: center;
  transition: all 0.3s;
  .col {
    flex: 1;
    font-weight: bold;
    .num {
      font-size: 36px;
      color: #222222;
      letter-spacing: 0;
      text-align: center;
      line-height: 42px;
    }
    .label {
      display: inline-block;
      margin-top: 6px;
      padding: 0px 12px;
      height: 32px;
      line-height: 32px;

      color: #222222;
      border-radius: 24px;
      font-size: 22px;
    }
  }

  .col.active {
    .num {
      color: #4974f5;
    }
    .label {
      background: #4974f5;
      color: #ffffff;
    }
  }
}
.container.state {
  background: #4974f5;

  .col {
    .num {
      opacity: 0.8;
      color: #ffffff;
    }
    .label {
      opacity: 0.8;
      color: #ffffff;
    }
  }
  .col.active {
    .num {
      opacity: 1;
      color: #ffffff;
    }
    .label {
      opacity: 1;
      background: #fff;
      color: #4974f5;
    }
  }
}
</style>
