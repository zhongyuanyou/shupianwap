<template>
  <div class="authentication">
    <Head title="实名认证"></Head>
    <!-- <div class="head">
      <span>输入麻烦？试试拍摄图片吧</span>
      <Icon name="arrow" />
    </div> -->
    <div class="box">
      <Form>
        <Field
          v-model="userName"
          :required="true"
          clearable
          name="userName"
          label="姓名"
          placeholder="请输入本人姓名"
          :rules="[{ required: true, message: '请输入本人姓名' }]"
        />
        <Field v-model="cardType" clearable name="cardType" label="证件类型" />
        <Field
          ref="refs"
          v-model="idCrad"
          :required="true"
          clearable
          name="idCrad"
          label="证件号"
          placeholder="请输入身份证号码"
          :rules="[
            { required: true, message: '请输入身份证号码' },
            { pattern, message: '请输入正确的身份证号码' },
          ]"
        />
        <Field>
          <template #input>
            <Checkbox
              v-model="checked"
              :required="true"
              class="check"
              label-disabled
            >
              <span @click="goagr">已阅读并同意<b>《用户认证协议》</b></span>
            </Checkbox>
          </template>
        </Field>
      </Form>
    </div>
    <div
      class="btn"
      :class="userName && idCrad && isCardNo(idCrad) && checked ? 'check' : ''"
      @click="sumfn()"
    >
      验证信息
    </div>
  </div>
</template>

<script>
import { Toast, Form, Field, Checkbox } from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import { contract, userinfoApi } from '@/api/index'
export default {
  name: 'Authentication',
  components: {
    Head,
    // Icon,
    Form,
    Field,
    Checkbox,
  },
  data() {
    return {
      userName: '',
      cardType: '身份证',
      idCrad: '',
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      checked: false,
      timeer: '',
    }
  },
  mounted() {
    // this.timeer = setInterval(() => {
    this.getUserInfo()
    // }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timeer)
  },
  methods: {
    goagr() {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode: 'protocol100121' },
      })
    },
    isCardNo(card) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (reg.test(card) === false) {
        return false
      } else {
        return true
      }
    },
    async getUserInfo() {
      this.loading = true
      // 获取用户信息
      try {
        const params = {
          // id: this.userId,
          id:
            this.$store.state.user.userId ||
            this.$cookies.get('userId', { path: '/' }),
        }
        const res = await this.$axios.get(userinfoApi.info, { params })
        this.loading = false
        if (res.code === 200 && res.data && typeof res.data === 'object') {
          this.info = res.data
          this.userName = res.data.nickName
          this.realStatus = res.data.realStatus
          console.log(res.data.realStatus)
          if (
            res.data.realStatus === 'AUTHENTICATION_SUCCESS' ||
            res.data.realStatus === 'AUTHENTICATION_ING'
          ) {
            this.$cookies.set('realStatus', res.data.realStatus, {
              path: '/',
            })
            Toast({
              message: '认证成功',
              overlay: true,
            })

            clearInterval(this.timeer)
            this.$router.back(-1)
          }
          // 认证成功更新info数据
          localStorage.setItem('info', JSON.stringify(this.info))
          this.$store.dispatch('user/setInfo', res.data)
        }
      } catch (err) {
        this.loading = false
      }
    },
    sumfn() {
      if (
        this.userName &&
        this.idCrad &&
        this.isCardNo(this.idCrad) &&
        this.checked
      ) {
        contract
          .authentication(
            { axios: this.axios },
            {
              name: this.userName,
              cardNo: this.idCrad,
              phone: this.$cookies.get('mainAccountFull', { path: '/' }),
            }
          )
          .then((res) => {
            if (res) {
              this.$router.push({
                path: '/contract/iframe',
                query: {
                  src: res,
                },
              })
            }
          })
          .catch((err) => {
            console.log('错误信息err', err)
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.authentication {
  background: #fff;
  > .head {
    display: flex;
    background: #f0f4ff;
    height: 64px;
    line-height: 64px;
    font-size: 28px;
    font-weight: 400;
    color: #4974f5;
    padding: 0 40px;
  }
  .sp-icon-arrow {
    margin-left: auto;
    align-self: center;
  }
  > .box {
    ::v-deep.sp-cell--required::before {
      display: none;
    }
    ::v-deep.sp-cell {
      span {
        font-weight: bold;
      }
    }
    .check {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      b {
        color: #4974f5;
        font-weight: normal;
      }
    }
  }
  .btn {
    width: 670px;
    height: 100px;
    background: #4974f5;
    border-radius: 8px;
    font-size: 32px;
    font-weight: bold;
    color: #ffffff;
    line-height: 100px;
    margin: 20px auto;
    text-align: center;
    opacity: 0.4;
  }
  .check {
    opacity: 1;
  }
}
</style>
