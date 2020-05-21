<template>
  <div>
      <div class="container d-flex justify-content-center align-items-center mt-5" >
          <div class="m-auto w-50">
              <h3>Login</h3>
          <hr class="w-100">
          <div class="d-flex justify-content-start align-items-center">
              <login-form class="w-100"></login-form>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue'

export default {

    name:'login',

    components:{
        LoginForm
    }


}
</script>

<style lang="scss" scoped>

</style>