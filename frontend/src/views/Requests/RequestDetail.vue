<template>
  <div class="request-detail-wrapper">
    <h3>Request Detail</h3>
    <hr class="w-100">
    <div class="request-container card">
      <div class="card-body">

        <p class="card-text text-capitalize">Duration: {{ leave.duration }}</p>
        <p class="card-text text-capitalize">Reason: {{ leave.detail }}</p>
        <p class="card-text text-capitalize">Status: {{ leave.status }}</p>
        <p class="card-text text-capitalize">Payble: {{ leave.payable }}</p>

        <div class="card-title font-weight-bold mt-3">Comments:</div>
        <b-list-item v-for="(comment, index) in comments" :key='index' class="card p-2 my-2">
          <p class="card-text">
            {{ comment.body }}
          </p>
          <small>Commented by: {{ comment.commentor.fullname }}</small>
        </b-list-item>
        <template v-if="user.position == 'HOD'">
          <b-button v-b-toggle.collapse-1 variant="secondary" class="mt-3">Add Comment</b-button>
          <b-collapse id="collapse-1" class="mt-3">
            <leave-comment-form :leave='leave' :user='user' v-on:success='loadData'></leave-comment-form>
          </b-collapse>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import LeaveAPI from '@/api/leave.api.js'
  import LeaveCommentForm from '@/components/forms/LeaveCommentForm.vue'
  export default {

    name: 'request-detail',

    components: {
      LeaveCommentForm
    },

    data() {
      return {
        leave: null,
        error: '',
        user: {},
        loading: false
      }
    },

    created() {
      this.fetchData().then(leave => this.leave = leave).catch(error => this.error = error)
      console.log('this.leave :>> ', this.leave);
    },

    computed: {
      comments: function () {
        if (this.leave.comments.length > 0) {
          return this.leave.comments
        }
      }
    },

    methods: {
      async fetchData() {
        this.loading = !this.loading
        const results = await LeaveAPI.get(this.$route.params.requestID)
        this.user = JSON.parse(localStorage.getItem('activeUser'))
        this.loading = !this.loading
        return results.leave
      },

      loadData(){
        LeaveAPI.get(this.$route.params.requestID)
          .then( results => this.leave = results.leave)
          .catch(error => this.error = error)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>