<template>
    <div class="request-leave-form-container">
                <b-alert show variant="danger" class="my-2" v-if="error">{{ error }}</b-alert>
        <b-alert show variant="success" class="my-2" v-if="success">{{ success }}</b-alert>
        <b-form @submit.prevent='submit'>
            <b-form-group label="Leave Duration">
                <b-form-input v-model='leave.duration' placeholder="Number of days"></b-form-input>
            </b-form-group>

            <b-form-group label='Reason for leave'>
                <b-form-textarea v-model='leave.detail' size='lg' placeholder="Reason for leave"></b-form-textarea>
            </b-form-group>

            <b-button block type="submit" variant="primary">
                <template v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                </template>
                <template v-else>Send Request</template>
            </b-button>

            <b-button block type="reset" variant="outline-secondary">Reset</b-button>

        </b-form>
    </div>
</template>

<script>
    import LeaveAPI from '@/api/leave.api.js'


    export default {

        name: 'request-leave-form',

        data() {
            return {
                leave: {
                    duration: null,
                    detail: null,
                    requestBy: null
                },
                loading: false,
                error:null,
                success:null
            }
        },

        methods: {

            async submit() {
                this.loading = !this.loading
                const requestBy = JSON.parse(localStorage.getItem('activeUser'))
                if (!requestBy) {
                    this.error = "You have to be logged in"
                    this.$router.push({
                        name: 'login'
                    })
                }
                let leave = {
                    ...this.leave,
                    requestBy: requestBy._id
                }
                console.log('leave :', leave);
                const results = await LeaveAPI.create(leave)
                console.log('results :', results);
                if (!results.leave) {
                    this.error = 'Failed to send leave request'
                } else {
                    this.success = results.message
                    this.reset()
                    this.loading = !this.loading
                    this.$router.push({
                        name:'requests'
                    })
                }
            },

            reset() {
                this.leave = {
                    duration: null,
                    detail: null,
                    requestBy: null
                }
            }
        }


    }
</script>

<style lang="scss" scoped>

</style>
