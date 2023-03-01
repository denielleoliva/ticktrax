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
            <!-- First Name 
            <q-input filled label="First Name" style="max-width: 500px; margin: 10px;"
            v-model="fields.firstName" type="name"/> -->
            <!-- Last Name 
            <q-input filled label="Last Name" style="max-width: 500px; margin: 10px"
            v-model="fields.lastName" type="name"/> -->
            <!--UserName -->
            <q-input filled label="UserName" style="max-width: 500px; margin: 10px"
            v-model="fields.username" type="name"/>
            <!-- Enter email -->
            <q-input filled label="Email" style="max-width: 500px; margin: 10px;"
            v-model="fields.email" type="email"  />
            <!-- Enter Password -->
            <q-input filled label="Password" style="max-width: 500px; margin: 10px;"
                v-model="fields.password" :type="isPwd ? 'password' : 'text'"/>
            <!-- Confirm Password 
            <q-input filled label="Confirm Password" style="max-width: 500px; margin: 10px;" 
                v-model="fields.confirmPassword" :type="isPwd ? 'password' : 'text'"/> -->
            <div class="row">
                <q-btn color="primary" style="align:center; margin-left:12px; margin-top:10px; background-color:#21ba45;"
                    @click="register()">
                    Sign up
                </q-btn>
                <div class="col" v-if="(registerSuccess === false)" style="align-content: center; padding:12px; font-size:large"> 
                    * indicates a required field 
                </div>
            </div>
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
                //firstName: ref(''),
                //lastName: ref(''),
                email: ref(''),
                password: ref(''),
                username: ref(''),
                //confirmPassword: ref('')
            }),

            // password: ref(''),
            isPwd: ref(true),
            leftDrawer: false,
            signedIn: false,
            authFail: false,
            registerSuccess:{
                type: Boolean,
                default: null,
                required: true,
            }
            // email: ref(''),
            // fName: ref(''),
            // lName: ref(''),
            // cPassword: ref('')
        }
    },
    methods:{
           
            // post data to api
            //  password should have: 1 uppercase, 1 number, 1 special character
            //  email should be a valid email
            //  username should be unique

            register()
            {
                //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
                //  url for our api connection (this doesn't work yet but I think this is the format we want the fetch)
                const url = 'http://localhost:5095/auth'

                fetch(url, {
                    //  this means we add to database
                    method: 'POST',

                    //  this means we are adding of type json
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    mode: 'cors',

                    //  this are the fields in json format (hopefully)
                    body: JSON.stringify({username: this.fields.username, email: this.fields.email, password: this.fields.password})
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