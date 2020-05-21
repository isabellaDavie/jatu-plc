<template>
    <div class="reports">
        <div class="d-flex justify-content-between align-content-center">
            <h3>Reports</h3>
            <report-form v-on:success='fetchData'>

                Create Report
            </report-form>
        </div>
        <hr class="w-100">
        <reports-list :reports='list' v-on:success='fetchData'></reports-list>
    </div>
</template>

<script>
    import ReportsList from '@/components/tables/ReportsList.vue';
    import ReportsAPI from '@/api/report.api.js'
    import ReportForm from '@/components/forms/ReportForm.vue'

    export default {

        name: 'reports',

        components: {
            ReportForm,
            ReportsList,
        },

        data() {
            return {
                loading: false,
                reports: null
            }


        },

        computed: {

            list: function () {
                let user = JSON.parse(localStorage.getItem('activeUser'))
                if (user.position == 'HOD') {
                    return this.reports
                } else {
                    if (this.reports) {
                        let list = this.reports.filter(reports => reports.reporter._id == user._id)
                        return list
                    }

                }
            }
        },


        async created() {
            await this.fetchData()

        },

        methods: {

            async fetchData() {
                this.loading = !this.loading
                let results = await ReportsAPI.get()
            console.log('results :>> ', results);
                this.reports = results.reports
                this.loading = !this.loading
                console.log('results :', results);
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>