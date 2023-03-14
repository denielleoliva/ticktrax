<template>
    <div class="row" style="justify-content:center">
        <q-page padding style="font-family: customfont; margin:5px; width:500px">
            <h3 class="q-ma-sm q-my-lg">
                Create Account
            </h3>
            <q-banner v-if="(registerSuccess === false)" class="q-ma-sm" rounded style="font-size:large; background-color:pink">
                Account Creation Failed... Please try again!
            </q-banner>

            <div class="row q-ma-sm">
                <q-input filled label="First Name" style="width: 45%;" autofocus v-model="fields.firstName"/>
                <q-space/>
                <q-input filled label="Last Name" style="width:45%;" v-model="fields.lastName"/>
            </div>

            <q-input class="q-ma-sm" filled label="Username" hide-bottom-space v-model="fields.username"
                :rules="[ val => val.length > 0 || 'Username is required' ]"/>

 
            <q-input class="q-ma-sm" filled label="Email" hide-bottom-space v-model="fields.email"
                :rules="[ (val, rules) => rules.email(val) || 'Please enter a valid email address' ]" />


            <q-input class="q-ma-sm" filled label="Password" lazy-rules hide-bottom-space v-model="fields.password" 
                :type="hidePassword ? 'password' : 'text'" :rules="[ passwordRules ]">
                <!-- Password has see password text toggle -->
                <template v-slot:append>
                    <q-icon
                        :name="hidePassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="hidePassword = !hidePassword"
                    />
                </template>
            </q-input>


            <q-input class="q-ma-sm" filled label="Confirm Password" reactive-rules hide-bottom-space v-model="fields.confirmPassword" 
                :type="hideConfirmPassword ? 'password' : 'text'" :rules="[ cPasswordRules ] ">
                <!-- Password has see password text toggle -->
                <template v-slot:append>
                    <q-icon
                        :name="hideConfirmPassword ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="hideConfirmPassword = !hideConfirmPassword"
                    />
                </template>
            </q-input>


            <q-btn id="loading" color="primary" style="align:center; margin-left:12px; margin-top:10px; background-color:#21ba45;"
                @click="register()">
                Sign up
            </q-btn>
            <q-btn class="" flat style="align:left; margin-top:10px" @click="$router.push('/signin')">
                Already have an account? Log in here
            </q-btn>
            <q-inner-loading :showing="loadingBar" label="Creating your account..." label-class="text-positive" label-style="font-size: 1.1em"/> 
            <q-inner-loading :showing="routingBar" label="Routing to sign in..." label-class="text-positive" label-style="font-size: 1.1em"/> 
       </q-page>
    </div>
    
  </template>
  
<script>
import { ref } from 'vue'
import quasarConf from 'app/quasar.conf'

export default{
    data () {
        return {
            loadingBar: false,
            routingBar: false,
        }
    },
    setup () 
    {
        const $q = quasarConf()

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
                if(this.fields.confirmPassword.length === 0)    return 'Confirm Password is required'
                if(this.fields.confirmPassword != this.fields.password) return 'Passwords do not match'
            },
           
            // post data to api

            //  email should be a valid email
            //  password should have: 1 uppercase, 1 number, 1 special character
            //  username should be unique
            passwordRules(){
                //  rules
                var upperCaseLetters = /[A-Z]/
                var lowerCaseLetters = /[a-z]/
                var numbers = /[0-9]/
                var specialCharacters = /[$&+,:;=?@#|'<>.^*()%!-]/

                //  bools representing if the password entered follows the rules
                const hasUpperCase = this.fields.password.match(upperCaseLetters) !== null
                const hasNumber = this.fields.password.match(numbers) !== null
                const hasSpecialChar = this.fields.password.match(specialCharacters) !== null
                const hasLowerCase = this.fields.password.match(lowerCaseLetters) !== null

                //  return whether the password is valid or the error message
                return hasUpperCase && hasNumber && hasSpecialChar && hasLowerCase || 'Password must include: 1 uppercase, 1 number, 1 special character'
            },

            async register()
            {
                //  load!
                this.loadingBar = true

                //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
                //  url for our api connection
                const url = 'http://localhost:5095/auth'

                //  await the response
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
                //  unwrap the response
                .then((response) => response.json)

                //  reporting successful post
                .then((data) => {
                    //  turn off the loading bar
                    this.loadingBar = false
                    
                    //  report successful post
                    console.log('API POST', data)

                    //  indicate route to sign in
                    this.routingBar = true;

                    //  route to sign in
                    this.$router.push('/signin')
                })

                //  reported failed post
                .catch((error) => {
                    //  turn off loading bar
                    this.loadingBar = false

                    //  report error 
                    console.error('API POST FAIL', error)

                    //  pop fail banner
                    this.registerSuccess = false;
                })
            }
        }
    }
</script>

<style>

@keyframes loading {

}

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