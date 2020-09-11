<template>
  <div>
    <ul>
      <li
         v-for="(item,index) in ServerData"
         :key="index"
      >{{`我叫${item.name},今年${item.age}岁啦！`}}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "Index",
    data(){
      return{
        ServerData:[]
      }
    },
    async asyncData({ $axios }){
      const res= await $axios.get('http://127.0.0.1:7001/api/user',{
        params:{
          id:new Date().getTime()
        }
      })
      if(res.status===200){
        return { ServerData:res.data.userList }
      }
    }
  }
</script>
