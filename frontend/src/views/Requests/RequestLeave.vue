<template>
  <div class="request-leave-wrapper">
      <h3>Request Leave</h3>
      <hr class="w-100">
    <request-leave-form></request-leave-form>
  </div>
</template>

<script>
import RequestLeaveForm from '@/components/forms/RequestLeaveForm.vue';

export default {

    name:'request-leave',

    components:{
        RequestLeaveForm
    }

}
</script>

<style lang="scss" scoped>

</style>