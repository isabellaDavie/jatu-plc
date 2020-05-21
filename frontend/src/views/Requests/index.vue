<template>
  <div class="request">
    <h3>Leave Requests</h3>
    <hr class="w-100">
    <request-leave-table :requests='list' v-on:success='fetchData'></request-leave-table>
  </div>
</template>

<script>

import RequestLeaveTable from '@/components/tables/RequestLeaveTable.vue';
import LeaveAPI from '@/api/leave.api.js'

export default {
    
    name:'request',
    components:{
      RequestLeaveTable,
    },

    data(){
    return{
       loading:false,
        requests:null
    }
},

computed:{
  list:function(){
    let user = JSON.parse(localStorage.getItem('activeUser'))
    if ( user.position == 'HOD'){
      return this.requests
    }else{
      if(this.requests){
        let list = this.requests.filter(request => request.requestBy._id == user._id )
      return list
      }
      
    }
  }
},


async created(){
  await this.fetchData()
},

methods:{
      async fetchData(){
         this.loading = !this.loading
         let results = await LeaveAPI.get()
         console.log('results :>> ', results);
         this.requests = results.leaves
         this.loading = !this.loading
      }
}

}

</script>

<style lang="scss" scoped>

</style>