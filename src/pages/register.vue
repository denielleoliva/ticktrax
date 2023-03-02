<template>
    <div class="row" style="justify-content:center">
        <q-page padding style="font-family: customfont; margin:5px; width:500px">
            <h3>
                Create Account
            </h3>
            <q-banner class="col"  v-if="(registerSuccess === true)" rounded style="align-content: center; padding:12px; font-size:large; background-color: #21ba45;">
                Account Creation Successful!
            </q-banner>
            <q-banner v-if="(registerSuccess === false)" rounded style="align-content:center; padding:12px;  font-size:large; background-color: pink">
                Account Creation Failed...
            </q-banner>
            <div class="row">
                <q-input filled label="First Name" style="max-width: 500px; margin: 10px;" autofocus
                v-model="fields.firstName" type="name"/>
                <q-space/>
                <q-input filled label="Last Name" style="max-width: 500px; margin: 10px"
                v-model="fields.lastName" type="name"/>
            </div>

            <q-input filled label="UserName" style="max-width: 500px; margin: 10px"
            v-model="fields.username" type="name" :rules="[ val => val.length > 0 || 'This field is required' ]"/>


            <q-input filled label="Email" style="max-width: 500px; margin: 10px;"
            v-model="fields.email" type="email":rules="[ (val, rules) => rules.email(val) || 'Please enter a valid email address' ]" />


            <q-input filled label="Password" style="max-width: 500px; margin: 10px;" lazy-rules
                v-model="fields.password" :type="hidePassword ? 'password' : 'text'" :rules="[ passwordRules ]">
                <!-- Password has see password text toggle -->
                <template v-slot:append>
                    <q-icon
                        :name="hidePassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="hidePassword = !hidePassword"
                    />
                </template>
            </q-input>


            <q-input filled label="Confirm Password" style="max-width: 500px; margin: 10px;" reactive-rules
                v-model="fields.confirmPassword" :type="hideConfirmPassword ? 'password' : 'text'" :rules="[ cPasswordRules ] ">
                <!-- Password has see password text toggle -->
                <template v-slot:append>
                    <q-icon
                        :name="hideConfirmPassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="hideConfirmPassword = !hideConfirmPassword"
                    />
                </template>
            </q-input>


            <q-btn color="primary" style="align:center; margin-left:12px; margin-top:10px; background-color:#21ba45;"
                @click="register()">
                Sign up
            </q-btn>
            <!-- Submit to DB -->
        </q-page>
    </div>
    
  </template>
  
<script>
import { ref } from 'vue'

export default{
    data () {
        return {
        }
    },
    setup () 
    {
        return {

            fields: ref({
                firstName: ref(''),
                lastName: ref(''),
                email: ref(''),
                password: ref(''),
                username: ref(''),
                confirmPassword: ref('')
            }),

            // password: ref(''),
            hidePassword: ref(true),
            hideConfirmPassword: ref(true),
            leftDrawer: false,
            signedIn: false,
            registerSuccess:{
                type: Boolean,
                default: null,
            }
        }
    },
    methods:{
            cPasswordRules(){
                if(this.fields.confirmPassword.length === 0)    return 'This field is required'
                if(this.fields.confirmPassword != this.fields.password) return 'Passwords do not match'
            },
           
            // post data to api

            //  email should be a valid email
            //  password should have: 1 uppercase, 1 number, 1 special character
            //  username should be unique
            passwordRules(){
                var upperCaseLetters = /[A-Z]/
                var lowerCaseLetters = /[a-z]/
                var numbers = /[0-9]/
                var specialCharacters = /[$&+,:;=?@#|'<>.^*()%!-]/

                return this.fields.password.match(upperCaseLetters) !== null && this.fields.password.match(numbers) !== null && this.fields.password.match(specialCharacters) !== null && this.fields.password.match(lowerCaseLetters) !== null || 'Password must include: 1 uppercase, 1 number, 1 special character'
            },

            async register()
            {
                //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
                //  url for our api connection (this doesn't work yet but I think this is the format we want the fetch)
                const url = 'http://localhost:5095/auth'

                await fetch(url, {
                    //  this means we add to database
                    method: 'POST',

                    //  this means we are adding of type json
                    headers: {
                        'Content-Type' : 'application/json',
                    },

                    //  this are the fields in json format (hopefully)
                    body: JSON.stringify({username: this.fields.username, email: this.fields.email, password: this.fields.password})
                })
                .then((response) => response.json)

                //  reporting successful post
                .then((data) => {
                    console.log('API POST', data)
                    this.registerSuccess = true
                })

                //  reported failed post
                .catch((error) => {
                    console.error('API POST FAIL', error)
                    this.registerSuccess = false
                })
            }
        }
    }
</script>

<style>

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

</style>