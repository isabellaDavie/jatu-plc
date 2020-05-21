<template>
  <div id="app" class="h-100">
    <nav-bar :user='user'></nav-bar>
    <h3 class="text-left">{{ user.fullname }}</h3>
    <b-container class="main">
      <h3 class="p-0 m-0 text-right">{{ user.position }}</h3>
      <router-view keep-alive transition transition-mode="out-in" />
    </b-container>
  </div>
</template>


<script>
import NavBar from '@/components/navigation/NavBar.vue';

export default {
  name:'base-view',

  components:{
    NavBar,
  },

  data(){
    return {
      user:null
    }
  },

  async created(){
    this.checkUser()
    console.log('this.user :>> ', this.user.fullname);
  },

  methods:{

    checkUser(){
      this.user = JSON.parse(localStorage.getItem('activeUser')) 
      if(!this.user){
        this.$router.push({ name:'login' })
      }
    }
  }
}
</script>

<style lang="scss">
.main{
  padding-top: 4rem;
}

</style>
