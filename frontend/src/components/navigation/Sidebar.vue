<template>
<div class="side-bar">
      <b-button v-b-toggle.sidebar-1 variant='danger'>Menu</b-button>
    <b-sidebar id="sidebar-1" title="JATU PLC" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2">
          
          <div class="">
           
            <b-nav vertical >
                
                <b-nav-item :to="`/requests`"  exact exact-active-class="active">
                    {{ user.position === 'HOD' ?'Leave Request':'View Requests' }}
                </b-nav-item>
                <b-nav-item v-if="user.position != 'HOD'" :to="`/request-leave`"  exact exact-active-class="active">
                    Request Leave
                </b-nav-item>
                <b-nav-item :to="`/reports`" exact exact-active-class="active">
                      {{ user.position === 'HOD' ?'Reports':'View Reports' }}   
                </b-nav-item>  
                <b-nav-item :to="`/users`"  v-if="user.position == 'HOD'">
                    Users
                </b-nav-item>
                <b-nav-item v-if="user.position == 'HOD'"  :to="`/register`">
                    Create User
                </b-nav-item>
                <b-nav-item :to="`login`" v-if="!user">
                    Login
                </b-nav-item>

                <!-- <b-nav-item v-if="user.position =='HOD'" :to="`/reset-password`">
                    Reset Password
                </b-nav-item> -->
                
                <!-- <li class="nav-item btn btn-danger ml-3" @click='logout'>
                    <div  class="">Logout</div>
                </li> -->
            </b-nav>

        </div>

      </div>
    </b-sidebar>
</div>
</template>

<script>
export default {
    name:'sidebar',

    props:{
        user:{}
    },

     methods:{
        logout(){
            localStorage.removeItem('activeUser')
            this.$router.push({
                name:'login'
            })
        }
    }



}
</script>

<style>

</style>