<template>
  <div class="leave-comment-form">
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
import LeaveAPI from '@/api/leave.api.js'

export default {

    name:'leave-comment-form',

    props:{
        leave:null,
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
        console.log('this.leave :>> ', this.leave);
    },

    methods:{

        async submit(){
            this.loading = !this.loading
            console.log('this.comment :>> ', this.comment);
            this.comment.commentor = this.user._id
            let response =  await LeaveAPI.addComment(this.leave._id, this.comment)
            console.log('response :>> ', response);
            if(!response.leave){
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