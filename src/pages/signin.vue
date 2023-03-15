<template>
    <div class="row" style="justify-content:center">
        <q-page padding style="font-family: customfont; margin:5px">
            <h3 class="q-ma-sm q-my-lg">
                Sign Into Your Account
            </h3>
            
            <q-banner v-if="(authFail === true)" class="q-ma-sm" rounded style="font-size:large; background-color: pink">
                Sign in failed... Please try again!
            </q-banner>

            <q-dialog v-model="signedIn" class="" rounded style="font-size:large; background-color:pink">
                <div class="q-pa-lg bg-white" align="center">
                    <div class="q-pa-lg">You're signed in!</div>
                    <q-btn class="bg-primary q-mx-md text-white" @click="$router.push('/form')">
                        Submit a photo
                    </q-btn>
                    <q-btn class="bg-grey text-white q-mx-md" @click="$router.push('/')"> Go back home </q-btn>
                </div>
            </q-dialog>

            <!-- Enter email -->
            <q-input class="q-ma-sm" id = "emailBar" filled label="Email"  v-model="credentials.email" hide-bottom-space
                :error-message="'Email is required'" :error="emailError"/>
            <!-- Enter Password -->
            <q-input class="q-ma-sm" id = "passwordBar" filled label="Password"  v-model="credentials.password" hide-bottom-space
                :type="isPwd ? 'Password' : 'text'" :error-message="'Password is required'" :error="passwordError">
                <!-- Password has see password text toggle -->
                <template v-slot:append>
                    <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd"/>
                </template>
            </q-input>
            <div class="row">
                <q-btn class="q-ml-sm" id="signInButton" color="primary" @click="signIn()">
                    Sign in
                </q-btn>
            </div>
            <q-inner-loading
                :showing="loadingBar"
                label="Signing you in..."
                label-class="text-positive"
                label-style="font-size: 1.1em"
            /> 
        </q-page>
    </div>
  </template>
  
<script>
import { watch } from 'fs'
import { ref } from 'vue'
var token

export default{
    data () 
    {   
        return {
            emailError: false,
            passwordError: false,
            loadingBar: false,
            leftDrawer: false,
            signedIn: false,
            authFail: null,

                        credentials: ref({
                email : ref(''),
                password : ref('')
            }),

            isPwd: ref(true),
        }
    },
    setup () 
    {
        return {

        }
    },
    methods:{
        // async because the api call has promise :thumbs-up:
        async signIn() 
        {
            this.loadingBar = true
            //  url for signin
            const url = 'http://localhost:5095/auth/signin'

            //  api call
            await fetch(url, {
                //  this means we add to database
                method: 'POST',

                //  this means we are adding of type json
                headers: {
                'Content-Type' : 'application/json',
                },

                //  this are the fields in json format (hopefully)
                body: JSON.stringify({email: this.credentials.email, password: this.credentials.password})
            })
            //  unravel the response
            .then(response => response.json())

            //  if we got a proper response
            .then(data => {
                this.loadingBar = false
                console.log(data)
                sessionStorage.setItem("token", data);
                this.signedIn = true
            })

            //  if we got an error response
           .catch(error => {
                //  turn off the loading screen
                this.loadingBar = false
                if(this.credentials.email.length === 0) this.emailError = true
                if(this.credentials.password.length === 0)  this.passwordError = true

                //  set flag to try (pops banner)
                this.authFail = true

                //  indicate an error occured
                console.log("API POST FAILED", error)

                //  grab the element
                const elem = document.getElementById("signInButton");

                //  add the animtion
                elem.classList.add("giveShake")

                //  wait for animation to complete
                setTimeout(() => {
                    //  remove animation class (to allow replay)
                    elem.classList.remove("giveShake")
                }, 1000);
           })
        }
    }
}
</script>

<style>

.giveShake {
    animation-name: shake;
    animation-duration: 1s;
}

/* https://www.w3schools.com/howto/howto_css_shake_image.asp */
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