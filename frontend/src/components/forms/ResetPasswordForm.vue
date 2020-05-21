<template>
    <div class="user-reset-password">

        <b-form @submit.prevent='onSubmit'>
            <b-form-group label='New Password'>
                <b-form-row>
                    <b-col>
                        <b-form-input type='password' v-model="password" placeholder='Password' required>
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-input type='password' v-model="password2" placeholder='Confirm Password' required>
                        </b-form-input>
                    </b-col>

                </b-form-row>
            </b-form-group>

            <b-button block type="submit" variant="primary">
                <template v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                </template>
                <template v-else>Save</template>
            </b-button>
        </b-form>
    </div>
</template>

<script>
    import userAPI from '@/api/users.api.js';

    export default {
        name: 'reset-password-form',
        // prop: ['user'],
        data() {
            return {
                loading: false,
                password: '',
                password2: '',
                user: {},
                error: ''
            }
        },

        created() {
            this.user = JSON.parse(localStorage.getItem('activeUser'))

        },

        computed: {

        },

        methods: {

            async onSubmit() {
                this.loading = !this.loading
                if (this.password != this.password2) {
                    this.error = 'Passwords do not match.'
                    this.loading = !this.loading
                    return this.reset()
                } else {
                    let data = {
                        password: this.password
                    }
                    let results = await userAPI.resetPassword(this.user._id, data)
                    if (!results.user) {
                        this.error = results.message
                        this.loading = !this.loading
                        return this.reset()
                    }else{
                        this.loading = !this.loading
                        this.$router.go(-1)
                    }
                }
            },

            reset() {
                this.password = ''
                this.password2 = ''
            }

        }

    }
</script>


<style lang="scss" scoped>

</style>