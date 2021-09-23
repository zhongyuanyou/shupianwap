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
      lawerList: [],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$axios
        .post('/crisps-law-wap-bff-api/service/nk/law/v1/lawyerList.do', {
          fields: [
            'field',
            'image',
            'winRate',
            'favComRate',
            'caseNum',
            'area',
          ],
          keyword: '',
          limit: '20',
          start: '1',
        })
        .then((res) => {
          console.log('律师', res)
          if (res.code === 200 && res.data.length > 3) {
            const arr = res.data.sort(() => {
              return Math.random() - 0.5
            })
            this.lawerList = arr.splice(0, 3)
          } else {
            this.lawerList = res.data
          }
        })
    },
  },
}
</script>

<style></style>
