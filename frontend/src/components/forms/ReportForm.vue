<template>
  <div class="report-form-wrapper">
      <b-button id="toggle-btn" @click="toggleModal">
          <slot></slot>
      </b-button>

    <b-modal ref="my-modal" hide-footer title="Send Report">

            <b-form @submit.prevent='submit'>

                <b-form-group label='Title'>
                    <b-form-input type='text' required v-model='data.title' placeholder='Report Title'></b-form-input>
                </b-form-group>

                <b-form-group label='Subtitle'>
                    <b-form-input type='text' required v-model='data.subtitle' placeholder='Report Title'></b-form-input>
                </b-form-group>

                <b-form-group label='Details'>
                    <b-form-textarea v-model='data.details' rows=10 required placeholder='Report Details'></b-form-textarea>
                </b-form-group>

                <b-button block type="submit" variant="primary">
                <template v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                </template>
                <template v-else>Send Report</template>
            </b-button>
            <b-button block variant="outline-secondary">Cancel</b-button>
            </b-form>
    </b-modal>


  </div>
</template>

<script>

import ReportsAPI from '@/api/report.api.js'

export default {

    name:'report-form',

    props:{
    },

    data(){
        return{
            data:{
                title:null,
                details:null,
                subtitle:null,
            },
            loading:false
        }

    },

    created(){
        console.log('this.report :', this.report);
    },

    methods:{

            async submit(){
                this.loading = !this.loading
                let reporter = JSON.parse(localStorage.getItem('activeUser'))
                if(!reporter){
                   return this.$router.push({ name:'login' })
                }
                console.log('this.data :', this.data);
                let data = {...this.data, reporter:reporter._id}
                console.log('data :', data);
                let results = await ReportsAPI.create(data)
                console.log('results :', results);
                if(results.report){
                    this.$emit('success')
                    this.toggleModal()
                }
        },

        reset(){
            this.report = null
        
        },

        toggleModal() {
        this.reset()
        this.$refs['my-modal'].toggle('#toggle-btn')
      }
    },

}
</script>

<style lang="scss" scoped>

</style>