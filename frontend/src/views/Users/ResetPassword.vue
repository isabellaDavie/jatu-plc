<template>
  <div class="container">
      <div class="d-flex justify-content-between align-items-center">
          <h3 class="text-capitalize">Reset Password</h3>

          <b-button @click='$router.go(-1)'>Cancel</b-button>
      </div>
      <hr class="w-100">
      <reset-password-form></reset-password-form>

  </div>
</template>

<script>
import ResetPasswordForm from '@/components/forms/ResetPasswordForm.vue'

export default {

    name:'reset-password',

    components:{
        ResetPasswordForm
    }
}
</script>

<style>

</style>