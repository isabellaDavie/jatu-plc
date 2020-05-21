<template>
    <div class="login-form-container">
        <b-alert show variant="danger" class="my-2" v-if="error">{{ error }}</b-alert>
        <b-alert show variant="success" class="my-2" v-if="success">{{ success }}</b-alert>
        <b-form @submit.prevent="submit" @reset="reset">
            <b-form-group label='Email'>
                <b-form-input type="email" placeholder="Enter your email" required v-model='form.email'>
                </b-form-input>
            </b-form-group>

            <b-form-group label="Password">
                <b-form-input type="password" placeholder="Enter your password" required v-model='form.password'>
                </b-form-input>
            </b-form-group>

            <b-button block type="submit" variant="primary">
                <template v-if="loading">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                </template>
                <template v-else>Login</template>
            </b-button>
            <b-button block type="reset" variant="outline-secondary">Reset</b-button>
        </b-form>
    </div>
</template>

<script>

import AuthAPI from '@/api/authentication.api.js' 

    export default {

        name: 'login-form',

        data(){
            return{
                form:{
                    email:null,
                    password:null
                },
                loading:false,
                error:null,
                success:null
            }
        },

        methods:{

            async submit(){
                this.loading = !this.loading
                const {user, token, message, error } = await AuthAPI.authenticate(this.form)
                console.log(message, error)
                if(!user) {
                    //  alert('Failed to login. Please try again.')
                    this.error = message
                     this.loading = !this.loading
                     return this.reset()
                     }
                this.success = message
                localStorage.setItem('activeUser', JSON.stringify(user))
                localStorage.setItem('token', token)
                this.$router.push({ name:'requests' })
                this.loading = !this.loading
            },

            reset(){
                this.form = {}
            }

        }

    }
</script>

<style lang="scss" scoped>


</style>