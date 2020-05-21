<template>
  <div class="report-detail-wrapper">
    <b-overlay :show="!report" rounded="sm">
      <h3 class="text-capitalize">{{ report.title }}</h3>
      <p class="p-0 m-0" v-if="user.position === 'HOD'">Report by: {{ report.reporter.fullname }}</p>
      <small>{{ report.createdAt | dateFormat }}</small>
      <hr class="w-100">
      <p class="card-text">
        {{ report.details }}
      </p>
      <b-list-group class="mt-3" v-if="comments">
        <h5 class="text-capitalize">Comments</h5>
        <b-list-item v-for="(comment, index) in comments" :key='index' class="card p-2 my-2">
          <p class="card-text">
            {{ comment.body }}
          </p>
          <small>Commented by: {{ comment.commentor.fullname }}</small>
        </b-list-item>
      </b-list-group>
      <template v-if="user.position == 'HOD'">
        <b-button v-b-toggle.collapse-1 variant="secondary" class="mt-3">Add Comment</b-button>
        <b-collapse id="collapse-1" class="mt-3">
          <report-comment-form :report='report' :user='user' v-on:success='fetchData'></report-comment-form>
        </b-collapse>
      </template>
    </b-overlay>
  </div>
</template>

<script>
  import ReportsAPI from '@/api/report.api.js'
  import ReportCommentForm from '@/components/forms/ReportCommentForm.vue'

  export default {

    name: "report",

    components: {
      ReportCommentForm
    },

    data() {
      return {
        report:{},
        user:{},
        loading: false,
        error:null
      }
    },

    created() {
       this.fetchData().then(report => this.report = report).catch(error => this.error = error)
    },

    computed: {
      comments: function () {
        if (this.report.comments.length > 0) {
          return this.report.comments
        }
      }
    },

    methods: {
      async fetchData() {
        this.loading = !this.loading
        const results = await ReportsAPI.get(this.$route.params.reportID)
        // this.report = results.report
        if(results.error){
          return await new Promise.reject(results.error)
        }
        this.user = JSON.parse(localStorage.getItem('activeUser'))
        this.loading = !this.loading
        return  results.report
      }
    }

  }
</script>

<style>

</style>