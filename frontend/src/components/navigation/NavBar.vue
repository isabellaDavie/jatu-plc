<template>
  <b-navbar toggleable="lg" type="dark" variant="success" fixed="top" class="">
        <sidebar :user='user'  ></sidebar>
         <!-- <div class="container" v-if="user.position != 'HOD'"> 
             <b-navbar-brand href="/">Jatu PLC</b-navbar-brand>  -->
            <b-navbar-nav class="ml-auto">
    
                <!-- <li class="nav-item">
                    <router-link class="nav-link" :to="`/requests`">
                      {{ user.position === 'HOD' ?'Leave Request':'View Requests' }}
                    </router-link>
                </li>


                <li class="nav-item" v-if="user.position != 'HOD'">
                    <router-link class="nav-link" :to="`/request-leave`">
                        Request Leave
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link class="nav-link" :to="`/reports`">
                        {{ user.position === 'HOD' ?'Reports':'View Reports' }}
                    </router-link>
                </li>

                <li class="nav-item" v-if="user.position == 'HOD'">
                    <router-link class="nav-link" :to="`/users`" >
                        Users
                    </router-link>
                </li>

                <li class="nav-item" v-if="user.position == 'HOD'">
                    <router-link class="nav-link" :to="`/register`">
                       Create User
                    </router-link>
                </li> -->

                <!-- <li class="nav-item" v-if="user.position == 'HOD'">
                    <router-link class="nav-link" :to="`/reset-password`">
                        Reset Password
                    </router-link>
                </li> -->
                
                 <li class="nav-item">
                    <router-link class="nav-link" :to="`login`" v-if="!user">
                        Login
                    </router-link>
                </li> 
  <b-dropdown :text='user.fullname'>
                    <b-dropdown-item :to="`/reset-password`" class="text-capitalize">Reset password</b-dropdown-item>
                    <b-dropdown-item @click='logout'>Logout</b-dropdown-item>
                </b-dropdown>
                
            </b-navbar-nav>
          <!-- </div>  -->
    </b-navbar>
</template>

<script>
import Sidebar from './Sidebar'
export default {

    name:'nav-bar',

    components:{
        Sidebar
    },

    props:{
        user:{}
    },

    mounted(){
        console.log('this.user :', this.user);
    },

    computed:{
        // hod:() => this.user.position
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

<style lang="scss" scoped>

</style>