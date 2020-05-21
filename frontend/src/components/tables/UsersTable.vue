<template>
    <b-container fluid>
        <!-- User Interface controls -->
        <div class="users-table-filter-wrapper">

            <div class="table-filter-item d-flex justify-content-center">
                <b-form-group label-size="sm" label-for="filterInput" class="mb-0 w-100">
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
        <hr class="w-100">


        <!-- Main table element -->
        <b-table id="users-table" show-empty small stacked="md" :items="users" :fields="fields"
            :current-page="currentPage" :per-page="perPage" :filter="filter" :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" @filtered="onFiltered">

            <template v-slot:cell(name)="row">
                {{ row.value.first }} {{ row.value.middle }} {{ row.value.last }}
            </template>

            <template v-slot:cell(actions)="row">
                <b-button size="sm" @click="row.toggleDetails">
                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                </b-button>
            </template>

            <template v-slot:row-details="row">
                <b-card>
                    <div class="card-body">
                        <div class="card-title font-weight-bold">Details</div>
                        <hr class="w-100">
                        <div class="">
                            <p class="card-text">Name: {{ row.item.fullname }}</p>
                            <p class="card-text">Postion:{{ row.item.position }} </p>
                            <p class="card-text">Department:{{ row.item.department }} </p>
                            <p class="card-text">Email: {{ row.item.email }}</p>
                              <!-- <p class="card-text">Mobile:
                                <span v-for="(mobile, index) in row.item.mobile" :key='index'>
                                    {{ mobile }}, 
                                </span>  
                            </p> -->
                            <p class="card-text">Address: {{ row.item.address.region }}, {{ row.item.address.district }}, {{ row.item.address.ward }}</p>
                            <p class="card-text">Marital Status: {{ row.item.maritalStatus }}</p>
                        </div>
                    </div>
                </b-card>
            </template>
        </b-table>

        <!-- Info modal -->

    </b-container>
</template>

<script>
    export default {

        name:'users-table',

        props:{
            users:{}
        },

        data() {
            return {

                fields: [{
                        key: 'name',
                        label: 'Full name',
                        sortable: true,
                        sortDirection: 'desc'
                    },
                    {
                        key: 'position',
                        label: 'Position'
                    },
                    {
                        key: 'email',
                        label: 'Email'
                    },
                    {
                        key: 'actions',
                        label: 'Actions'
                    }
                ],
                totalRows: 1,
                currentPage: 1,
                perPage: 5,
                pageOptions: [],
                sortBy: '',
                sortDesc: false,
                sortDirection: 'asc',
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
        mounted() {
            // Set the initial number of items
            if(this.users){
                this.totalRows = this.users.length
            }
            
        },
        methods: {
            onFiltered(filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.totalRows = filteredItems.length
                this.currentPage = 1
            }
        }
    }
</script>