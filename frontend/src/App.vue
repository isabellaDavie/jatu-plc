<template>
  <div id="app" class="h-100">
      <router-view keep-alive transition transition-mode="out-in" />
  </div>
</template>


<script>
import NavBar from '@/components/navigation/NavBar.vue';

export default {
  name:'app',

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
