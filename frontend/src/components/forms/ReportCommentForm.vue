<template>
  <div class="report-comment-form">
      <b-alert :show='error' variant="danger" class="my-2">{{ error }}</b-alert>
      <b-form @submit.prevent='submit'>
          <b-form-group label='Comment'>
              <b-form-textarea placeholder='Add commment' v-model='comment.body' row=4>

              </b-form-textarea>
          </b-form-group>

          <b-button  type="submit" variant="primary">
                <template v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                </template>
                <template v-else>Save Comment</template>
            </b-button>
      </b-form>
  </div>
</template>

<script>
import ReportsAPI from '@/api/report.api.js'

export default {

    name:'report-comment-form',

    props:{
        report:null,
        user:null
    },

    data(){
        return{
            loading:false,
            error:null,
            comment:{
                body:null
            }
        }
    },

    mounted(){
        console.log('this.report :>> ', this.report);
    },

    methods:{

        async submit(){
            this.loading = !this.loading
            console.log('this.comment :>> ', this.comment);
            this.comment.commentor = this.user._id
            let response =  await ReportsAPI.addComment(this.report._id, this.comment)
            console.log('response :>> ', response);
            if(!response.report){
                this.error = response.error || response.message
                this.reset()
            }else{
                this.loading = !this.loading
                this.reset()
                this.$emit('success')
            }
        },
        
        reset(){
            this.comment.body= null
        }
    }
}
</script>


<style lang="scss" scoped>


</style>