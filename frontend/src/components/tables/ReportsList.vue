<template>
    <div class="report-table-wrapper container-fluid">
        <b-list-group>
            <b-list-group v-for="(report, index) in reports" :key='index' class="my-1" @click='viewReport(report)'>
                <div class="card d-flex">
                    <div class="document-item">
                        <b-icon-file-earmark class="display-4"></b-icon-file-earmark>

                        <div class="item-detail">
                            <p class="doc-name p-0 m-0">Report Title: {{ report.title }}</p>
                            <small class="text-capitalize">Reporter:{{ report.reporter.name.first }} {{ report.reporter.name.last }}</small>
                               <small class="ml-3 text-capitalize">Dated Added: {{ report.createdAt | dateFormat }}</small>  
                             <b-button variant='secondary'  class="mt-3 btn btn-primary btn-sm ml-2" :to="`/reports/${report._id}`" >View</b-button>
                        </div>
                    </div>
                </div>
            </b-list-group>
        </b-list-group>
    </div>
</template>

<script>
    export default {

        name:'reports-list',

        props:{
            reports:{}
        },

        data(){
            return{
                
            }
        },

        methods:{

            viewReport(report){
                this.$router.push({
                    name:'report-details',
                    params:{ reportID: report._id }
                })
            }
          
        }

        

    }
</script>

<style lang="scss" scoped>
    .document-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .item-detail {
        margin-left: 1rem;
    }
</style>