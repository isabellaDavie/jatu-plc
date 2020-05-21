<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <!-- <div class="requests-table-filter-wrapper">

            <div class="table-filter-item d-flex justify-content-between">
                <b-form-group label-size="sm" label-for="filterInput" class="mb-0">
                    <b-input-group size="sm">
                        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Search">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </div>
        </div>
        <hr class="w-100"> -->


        <!-- Main table element -->
        <b-table id="requests-table" show-empty small stacked="md" :items="requests" :fields="fields" :filter="filter"
            :filterIncludedFields="filterOn" @filtered="onFiltered">

            <template v-slot:cell(requestBy)="row">
                {{ row.value.name.first }} {{ row.value.name.middle }} {{ row.value.name.last  }}
            </template>

            <template v-slot:cell(department)="row">
                {{ row.value.department }}
            </template>

            <!-- <template v-slot:cell(approvedBy)="row">
                {{ row.value.name.first }} {{ row.value.name.last }} 
            </template> -->


            <template v-slot:cell(actions)="row">
                <b-button size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
            </template>

            <template v-slot:row-details="row">
                <b-card>
                    <h3 class="card-title">Leave Request by {{ row.item.requestBy.name.first }}</h3>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p class="card-text text-capitalize">Duration: {{ row.item.duration }}</p>
                                <p class="card-text text-capitalize">Reason: {{ row.item.detail }}</p>
                                 <!-- <p>{{ row.item._id }}</p>  -->
                                <template v-if="user.position == 'HOD'">
                                    <b-button-toolbar>
                                          <!-- <b-button variant='info'  @click="viewRequest(row.item._id)">View </b-button>   -->
                                    <b-button v-b-toggle.collapse-1 variant="secondary" class="mr-2 ">Add Comment
                                    </b-button>
                                    </b-button-toolbar>
                                    <b-collapse id="collapse-1" class="mt-3">
                                        <leave-comment-form :leave='row.item' :user='user' v-on:success='fetchData'>
                                        </leave-comment-form>
                                    </b-collapse>
                                </template>
                                 <template v-else>
                                     <b-button variant='secondary'  @click="viewRequest(row.item._id)">View </b-button> 
                                </template> 
                            </div>
                            <div class="col-md-6" v-if="row.item.status == 'pending'">
                                <template v-if="user.position == 'HOD'">
                                    <process-request-leave-form :request='row.item' v-on:success='fetchData'>
                                    </process-request-leave-form>
                                </template>
                            </div>
                        </div>
                    </div>
                </b-card>
            </template>
        </b-table>

        <!-- Info modal -->

    </b-container>
</template>

<script>
    import ProcessRequestLeaveForm from '../forms/ProcessRequestLeaveForm'
    import LeaveCommentForm from '@/components/forms/LeaveCommentForm.vue'

    export default {

        name: 'request-leave-table',

        components: {
            ProcessRequestLeaveForm,
            LeaveCommentForm
        },

        props: {
            requests: {}
        },

        data() {
            return {

                user: {},

                fields: [
                    {
                        key: 'requestBy',
                        label: 'Requested By',
                        sortable: true,
                        sortDirection: 'desc'
                    },
                    {
                        key:'requestBy.department',
                        label:'Department'
                    },
                    {
                        key: 'detail',
                        label: 'Details'
                    },
                    {
                        key: 'payable',
                        label: 'Payable'
                    },
                    {
                        key: 'duration',
                        label: 'Duration'
                    },
                    {
                        key: 'status',
                        label: 'Status'
                    },
                    {
                        key: 'actions',
                        label: 'Actions'
                    }
                ],
                // totalRows: 1,
                // currentPage: 1,
                // perPage: 5,
                // pageOptions: [5, 10, 15],
                // sortBy: '',
                // sortDesc: false,
                // sortDirection: 'asc',
                filter: null,
                filterOn: [],
            }
        },
        computed: {
            sortOptions() {
                // Create an options list from our fields
                return this.fields
                    .filter(f => f.sortable)
                    .map(f => {
                        return {
                            text: f.label,
                            value: f.key
                        }
                    })
            }
        },

        created() {
            this.user = JSON.parse(localStorage.getItem('activeUser'))
        },

        mounted() {
            console.log('this.requests :', this.requests);
        },
        methods: {
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },

            fetchData() {
                this.$emit('success')
            },

            viewRequest(requestID) {
                console.log('requestID :>> ', requestID);
                this.$router.push({
                    name: 'request-detail',
                    params: {
                        requestID: requestID
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>