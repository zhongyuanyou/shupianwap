<template>
  <div class="container">
    <h2>律师推荐</h2>
    <div class="s_area">
      <sp-swipe :autoplay="3000">
        <sp-swipe-item v-for="(item, index) in lawerList" :key="index">
          <sp-image
            fit="cover"
            :src="`${item}?x-oss-process=image/resize,m_fill,w_750,h_520,limit_0`"
          />
        </sp-swipe-item>
        <!-- <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ images.length }}
          </div>
        </template> -->
      </sp-swipe>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, Button } from '@chipspc/vant-dgg'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Button.name]: Button,
  },
  data() {
    return {
      lawerList: [
        {
          name: '基本信息模块',
          code: 'baseInfo',
          sort: 1,
          fields: [
            {
              name: '律师简介',
              code: 'lawyerIntro',
              alias: '律师简介',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXTAREA',
              typeName: '多行文本',
              required: 1,
              sort: 1,
              config: {
                placeholder: '请输入律师的简介，200字以内',
                options: '',
              },
            },
            {
              name: '擅长领域',
              code: 'field',
              alias: '擅长领域',
              type: 'BUSINESS_CARD_FIELD_TYPE_MULTI_SELECT',
              typeName: '多选下拉框',
              required: 1,
              sort: 2,
              config: {
                options: '民事诉讼;刑事诉讼;法律援助;专利版权',
                multiUpper: 3,
              },
            },
            {
              name: '地区',
              code: 'area',
              alias: '地区',
              type: 'BUSINESS_CARD_FIELD_TYPE_PROVINCES',
              typeName: '省市区',
              required: 1,
              sort: 3,
              config: {
                options: '',
              },
            },
            {
              name: '执业证号',
              code: 'licenseNum',
              alias: '执业证号',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 1,
              sort: 4,
              config: {
                placeholder: '请输入职业证号',
                options: '',
              },
            },
            {
              name: '学历',
              code: 'education',
              alias: '学历',
              type: 'BUSINESS_CARD_FIELD_TYPE_SELECT',
              typeName: '单选下拉框',
              required: 0,
              sort: 5,
              config: {
                options: '大专;本科;研究生;博士;博士后',
              },
            },
            {
              name: '执业经验',
              code: 'experience',
              alias: '执业经验',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 1,
              sort: 6,
              config: {
                placeholder: '请输入律师的职业经验',
                options: '',
              },
            },
            {
              name: '等级',
              code: 'level',
              alias: '等级',
              type: 'BUSINESS_CARD_FIELD_TYPE_RADIO',
              typeName: '单选',
              required: 0,
              sort: 7,
              config: {
                options: '四级律师;三级律师;二级律师;一级律师',
              },
            },
          ],
        },
        {
          name: '照片模块',
          code: 'photo',
          sort: 2,
          fields: [
            {
              name: '形象照片',
              code: 'image',
              alias: '形象照片',
              type: 'BUSINESS_CARD_FIELD_TYPE_FILE_PIC',
              typeName: '图片附件',
              required: 1,
              sort: 1,
              config: {
                suffix: 'jpg,png,bmp',
                size: 5,
                num: 8,
                options: '',
              },
            },
            {
              name: '荣誉照片',
              code: 'honorpho',
              alias: '荣誉照片',
              type: 'BUSINESS_CARD_FIELD_TYPE_FILE_PIC',
              typeName: '图片附件',
              required: 0,
              sort: 2,
              config: {
                suffix: 'jpg,png,bmp',
                size: 5,
                num: 8,
                options: '',
              },
            },
          ],
        },
        {
          name: '视频模块',
          code: 'video',
          sort: 3,
          fields: [
            {
              name: '视频',
              code: 'video',
              alias: '视频',
              type: 'BUSINESS_CARD_FIELD_TYPE_FILE_VIDEO',
              typeName: '视频附件',
              required: 0,
              sort: 1,
              config: {
                suffix: 'mp4,avi',
                size: 20,
                num: 2,
                coverFlg: 1,
                coverSuffix: 'jpg,jpeg,png',
                coverSize: 5,
                options: '',
              },
            },
          ],
        },
        {
          name: '数据模块',
          code: 'baseData',
          sort: 4,
          fields: [
            {
              name: '案件数量',
              code: 'caseNum',
              alias: '案件数量',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 1,
              config: {
                placeholder: '请输入律师的案件数量，数字',
              },
            },
            {
              name: '评价次数',
              code: 'evaluationNum',
              alias: '评价次数',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 2,
              config: {
                placeholder: '请输入律师的评价次数，数字',
              },
            },
            {
              name: '好评率',
              code: 'favComRate',
              alias: '好评率',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 3,
              config: {
                placeholder: '请输入律师的好评率，数字',
              },
            },
            {
              name: '用户评分',
              code: 'userMark',
              alias: '用户评分',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 4,
              config: {
                placeholder: '请输入律师的用户评分，数字',
              },
            },
            {
              name: '案件胜率',
              code: 'winRate',
              alias: '案件胜率',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 5,
              config: {
                placeholder: '请输入律师的案件胜率，数字',
              },
            },
            {
              name: '平均时长',
              code: 'aveRespTime',
              alias: '平均时长',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 6,
              config: {
                placeholder: '请输入律师的平均时长，数字',
              },
            },
            {
              name: '好评数量',
              code: 'favComNum',
              alias: '好评数量',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 7,
              config: {
                placeholder: '请输入律师的好评数量，数字',
              },
            },
            {
              name: '荣誉次数',
              code: 'honorNum',
              alias: '荣誉次数',
              type: 'BUSINESS_CARD_FIELD_TYPE_TEXT',
              typeName: '单行文本',
              required: 0,
              sort: 8,
              config: {
                placeholder: '请输入律师的荣誉次数，数字',
              },
            },
          ],
        },
        {
          name: '应用模块',
          code: 'application',
          sort: 5,
          fields: [
            {
              name: '图文咨询',
              code: 'imageConsult',
              alias: '图文咨询',
              type: 'BUSINESS_CARD_FIELD_TYPE_SERVICE',
              typeName: '应用服务',
              required: 0,
              sort: 1,
              config: {
                options: '',
                welfareFlg: 1,
              },
            },
            {
              name: '电话咨询',
              code: 'phoneConsult',
              alias: '电话咨询',
              type: 'BUSINESS_CARD_FIELD_TYPE_SERVICE',
              typeName: '应用服务',
              required: 0,
              sort: 2,
              config: {
                options: '',
                welfareFlg: 1,
              },
            },
            {
              name: '私人律师',
              code: 'privateLawyer',
              alias: '私人律师',
              type: 'BUSINESS_CARD_FIELD_TYPE_SERVICE',
              typeName: '应用服务',
              required: 0,
              sort: 4,
              config: {
                options: '',
                welfareFlg: 0,
              },
            },
            {
              name: '到所咨询',
              code: 'interviewConsult',
              alias: '到所咨询',
              type: 'BUSINESS_CARD_FIELD_TYPE_SERVICE',
              typeName: '应用服务',
              required: 0,
              sort: 5,
              config: {
                options: '',
                welfareFlg: 1,
              },
            },
            {
              name: '视频咨询',
              code: 'videoConsult',
              alias: '视频咨询',
              type: 'BUSINESS_CARD_FIELD_TYPE_SERVICE',
              typeName: '应用服务',
              required: 0,
              config: {
                options: '',
                welfareFlg: 1,
              },
            },
          ],
        },
      ],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios
        .post(
          '/merchant-center-manager/yk/merchant/business_card/module/v1/search.do',
          {
            moduleCode: 'lawyerCard',
          }
        )
        .then((res) => {
          console.log('律师', res)
        })
    },
  },
}
</script>

<style></style>
