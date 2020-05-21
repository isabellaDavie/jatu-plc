<template>
  <div class="register">
    <h3>Register User
    </h3>
    <hr class="w-100">
    <registration-form></registration-form>
  </div>
</template>

<script>
import RegistrationForm from '@/components/forms/RegistrationForm.vue';

export default {

    name:'register',

    components:{
      RegistrationForm
    },

    

}
</script>

<style lang="scss" scoped>

</style>