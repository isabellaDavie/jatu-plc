<template>
    <div class="registration-form-container">
        <b-form @submit.prevent="submit" @reset="reset">
            <b-form-group label='Names'>
                <b-form-row>
                    <b-col>
                        <b-form-input v-model="user.name.first" placeholder='First name' required>
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-input v-model="user.name.middle" placeholder='Middle name' required>
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-input v-model="user.name.last" placeholder='Surname' required>
                        </b-form-input>
                    </b-col>
                </b-form-row>
            </b-form-group>

            <b-form-group label='Address'>
                <b-form-row>
                    <b-col>
                        <b-form-input v-model="user.address.region" placeholder='Region' required>
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-input v-model="user.address.district" placeholder='District' required>
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-input v-model="user.address.ward" placeholder='Ward' required>
                        </b-form-input>
                    </b-col>
                </b-form-row>
            </b-form-group>

            <b-form-row>
                <b-col>
                    <b-form-group label='Email'>
                        <b-form-input v-model="user.email" type='email' placeholder='Email' required>
                        </b-form-input>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label='Phone Numbers'>
                        <b-form-tags input-id="tags-basic" v-model="user.mobile" tag-variant="secondary" size="md"
                            separator=" " placeholder="Add phone number" class="mb-2 form-control">
                        </b-form-tags>
                    </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-group label='Details'>
                <b-form-row>
                    <b-col>
                        <b-form-datepicker v-model="user.dob" placeholder='DOB eg 1990-12-25 YYYY-MM-DD' required>
                        </b-form-datepicker>
                    </b-col>
                    <b-col>
                        <b-form-select v-model="user.gender" :options='genderOptions' required></b-form-select>
                    </b-col>
                    <b-col>
                        <b-form-select v-model="user.maritalStatus" :options='maritalStatusOptions' required>
                        </b-form-select>
                    </b-col>
                </b-form-row>
            </b-form-group>

            <b-form-row>
                <b-col>
                    <b-form-group label='Position'>
                <b-form-input v-model="user.position" placeholder='User Position' required>
                </b-form-input>
            </b-form-group>
                </b-col>

                <b-col>
                    <b-form-group label='Department'>
                <b-form-input v-model="user.department" placeholder='User Department' required>
                </b-form-input>
            </b-form-group>
                </b-col>
            </b-form-row>

            <b-form-group>
                <b-form-row>
                    <b-col>
                        <b-form-group label='Password' description='user will be able to change password later.'>
                            <b-form-input v-model='user.password' placeholder='Set password for user' required
                                type='password'></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group label='Confirm Password'>
                            <b-form-input v-model='user.password2' placeholder='Confirm password for user' required
                                type='password'></b-form-input>
                        </b-form-group>
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
            <b-button block type="reset" variant="outline-secondary">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import AuthAPI from '@/api/authentication.api.js'

    export default {

        name: 'registration-form',

        data() {
            return {
                loading: false,
                user: {
                    name: {
                        first: null,
                        middle: null,
                        last: null
                    },
                    address: {
                        region: null,
                        district: null,
                        ward: null
                    },
                    mobile: [null],
                    password: null,
                    password2: null,
                    dob: null,
                    maritalStatus: null,
                    gender: null,
                    position: null,
                    department:null
                },

                maritalStatusOptions: [{
                    text: 'Marital Status',
                    value: null
                }, 'married', 'single', 'divorced'],

                genderOptions: [{
                    text: 'Select Gender',
                    value: null
                }, 'male', 'female']

            }
        },

        methods: {

            async submit() {
                this.loading = !this.loading
                const results = await AuthAPI.register(this.user)
                console.log('results :', results);
                if (!results.user) {
                    console.log('Failed to register user.')
                } else {
                    this.$router.push({
                        name: 'users'
                    })
                    this.loading = !this.loading

                }

            },

            reset() {}

        }

    }
</script>

<style>

</style>