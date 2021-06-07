<template>
  <div>
    <!-- <sp-center-popup v-model="showPop" :field="Filed4" button-type="confirm" /> -->
  </div>
</template>

<script>
export default {
  name: 'Null',
  data() {
    return {
      fileUrl:'',
      title:'',
      documentId:''
    }
  },
  computed: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.fileUrl = this.$route.query.fileUrl
      this.title = this.$route.query.title
      this.documentId = this.$route.query.documentId
      console.log(this.fileUrl,this.title,this.documentId)
      this.$router.push({
        path: '/docPage/page',
        query:{
        fileUrl: this.fileUrl,
        title: this.title,
        documentId:this.documentId
        }
      })
    },
  },
}
</script>
