<template>
  <div class="users-view">
      <h3>Users</h3>
      <hr class="w-100">
      <users-table :users='users' ></users-table>
  </div>
</template>

<script>
import UsersAPI from '@/api/users.api.js'
import UsersTable from '@/components/tables/UsersTable.vue'

export default {

    name:'users',

    components:{
        UsersTable
    },

    data(){
        return{
            users:null,
            loading:false
        }
    },



    created(){
        this.fetchData().then(users => this.users = users)
        console.log('this.users :', this.users);
    }, 

    methods:{

        async fetchData(){
            this.loading = !this.loading
            const results = await UsersAPI.get()
            
            this.loading = !this.loading
            return results.users
        }
    }

}
</script>

<style lang="scss" scoped>

</style>