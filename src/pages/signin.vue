<template>
    <div class="row" style="justify-content:center">
        <q-page padding style="font-family: customfont; margin:5px">
            <h3>
                Sign Into Your Account
            </h3>
            <q-banner v-if="(authFail === true)" rounded style="align-content:center; padding:12px;  font-size:large; background-color: pink">
                Sign in Failed...
            </q-banner>
            <!-- Enter email -->
            <q-input filled label="Email" style="max-width: 500px; margin: 5px;"
            v-model="credentials.email" type="email"  />
            <!-- Enter Password -->
            <q-input filled label="Password" style="max-width: 500px; margin: 5px;"
                v-model="credentials.password" :type="isPwd ? 'password' : 'text'">
                <!-- Password has see password text toggle -->
                <template v-slot:append>
                    <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                    />
                </template>
            </q-input>
            <div class="row">
                <q-btn color="primary" style="margin-left:5px; margin-top:10px;"
                    @click="signIn()">
                    Sign in
                </q-btn>
            </div>
        </q-page>
    </div>
  </template>
  
<script>
// import { response } from 'express'
import { ref } from 'vue'

export default{
    data () {
        return {
            leftDrawer: false,
            signedIn: false,
            authFail: null,
        }
    },
    setup () 
    {
        return {
            credentials: ref({
                email : ref(''),
                password : ref('')
            }),

            // password: ref(''),
            isPwd: ref(true),
            // email: ref(''),
        }
    },
    methods:{
        forgotPassword()
        {

        },  
        async signIn() 
        {
            // //  for demo purposes
            // const authenticated = email === "jdoe@fakemail.com" && password == "fakePassword123!"
            // if(authenticated)
            // {
            //     this.signedIn = true,
            //     this.authFail = false,
            //     this.$router.push('/profile/1/')
            //     console.log("signedIn =" + this.signedIn + " authFail =" + this.authFail)
            // }
            // else
            // {
            //     this.authFail = true,
            //     console.log("authentication failed")
            // }
            
            //  place the api call here

            //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
            //  url for our api connection (this doesn't work yet but I think this is the format we want the fetch)
            const url = '192.168.1.10:5095/auth'

            fetch(url, {
                //  this means we add to database
                method: 'POST',

                //  this means we are adding of type json
                headers: {
                    'Content-Type' : 'application/json',
                },

                //  this are the fields in json format (hopefully)
                body: JSON.stringify(this.fields)
            })
            .then((response) => response.json)

            //  reporting successful post
            .then((data) => {
                console.log('API POST', data)
            })

            //  reported failed post
            .catch((error) => {
                console.error('API POST FAIL', error)
            })
        }   
    }
}
</script>