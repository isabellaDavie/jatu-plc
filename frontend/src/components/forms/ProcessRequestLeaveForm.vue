<template>
    <div class="request-leave-form-container">
        <b-form @submit.prevent='submit'>
            <b-form-group label="Leave Duration">
                <b-form-input v-model='request.duration' placeholder="Number of days"></b-form-input>
            </b-form-group>

            <b-form-group label="Leave Type">
                <b-form-select v-model="payable" required :options="optionsPay"></b-form-select>
            </b-form-group>



            <b-form-group label='Approval'>
                <b-form-select v-model="status" required :options="options"></b-form-select>
            </b-form-group>


            <b-button block type="submit" variant="primary">
                <template v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                </template>
                <template v-else>Save</template>
            </b-button>

            <b-button block type="reset" variant="outline-secondary">Reset</b-button>


        </b-form>
    </div>
</template>

<script>
    import LeaveAPI from '@/api/leave.api.js'

    export default {

        name: 'process-request-leave-form',

        props: {
            request: {}
        },

        data() {
            return {
                status: null,
                payable: null,
                leave: {
                    status: null,
                    payable: null
                },
                loading: false,
                options: [{
                        text: 'Please select an option',
                        value: null,
                    },
                    'approved',
                    'denied'
                ],
                optionsPay: [{
                        text: 'Please select leave payment mode',
                        value: null,
                    },
                    'Payable',
                    'Non-payable'

                ],

            }
        },

        mounted() {
            console.log('this.request :', this.request);
            if (this.request) {
                this.leave = {
                    ...this.request
                }
            }
        },

        methods: {

            async submit() {
                this.loading = !this.loading
                const approvedBy = JSON.parse(localStorage.getItem('activeUser'))
                if (!approvedBy) {
                    this.$router.push({
                        name: 'login'
                    })
                }
                let pay

                if (this.payable == 'Payable') {
                    pay = true
                } else {
                    pay = false
                }
                let leave = {
                    payable: pay,
                    status: this.status,
                    approvedBy: approvedBy._id
                }

                let response = await LeaveAPI.update(this.request._id, leave)
                console.log('response :', response);
                if (response.leave) {
                    this.loading = !this.loading
                    this.$emit('success')
                    // return this.$router.push({
                    //     name: 'requests',
                    // })

                } else {
                    alert("Failed to process request.")
                }

            },

            reset() {}
        }


    }
</script>

<style lang="scss" scoped>

</style>