<template>
    <div class="row" style="justify-content:center">
        <q-page padding style="font-family: customfont; margin:5px; width:500px">
            <h3>
                Create Account
            </h3>
            <q-banner class="col"  v-if="(registerSuccess === true)" rounded style="align-content: center; padding:12px; font-size:large; background-color: #21ba45;">
                Account Creation Successful!
            </q-banner>
            <q-banner v-if="(registerSuccess === false)" rounded style="align-content:center; padding:12px;  font-size:large; background-color: red">
                Account Creation Failed...
            </q-banner>
            <!-- First Name -->
            <q-input filled label="First Name" style="max-width: 500px; margin: 10px;"
            v-model="fName" type="name"/>
            <!-- Last Name -->
            <q-input filled label="Last Name" style="max-width: 500px; margin: 10px"
            v-model="lName" type="name"/>
            <!-- Enter email -->
            <q-input filled label="Email" style="max-width: 500px; margin: 10px;"
            v-model="email" type="email"  />
            <!-- Enter Password -->
            <q-input filled label="Password" style="max-width: 500px; margin: 10px;"
                v-model="password" :type="isPwd ? 'password' : 'text'"/>
            <!-- Confirm Password -->
            <q-input filled label="Confirm Password" style="max-width: 500px; margin: 10px;" 
                v-model="cPassword" :type="isPwd ? 'password' : 'text'"/>
            <div class="row">
                <q-btn color="info" style="align:center; margin-left:12px; margin-top:10px; background-color:#21ba45;"
                    @click="register(fName, lName, email, password, cPassword)">
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
            leftDrawer: false,
            signedIn: false,
            authFail: false,
            registerSuccess:{
                type: Boolean,
                default: null,
                required: true,
            }
        }
    },
    setup () 
    {
        return {
            password: ref(''),
            isPwd: ref(true),
            email: ref(''),
            fName: ref(''),
            lName: ref(''),
            cPassword: ref('')
        }
    },
    methods:{
            signIn(email, password) 
            {
                const authenticated = email === "jdoe@fakemail.com" && password == "fakePassword123!"
                if(authenticated)
                {
                    this.signedIn = true,
                    this.authFail = false,
                    this.$router.push('/profile/1/')
                    console.log("signedIn =" + this.signedIn + " authFail =" + this.authFail)
                }
                else
                {
                    this.authFail = true,
                    console.log("authentication failed")
                }
            }, 
            register(fName, lName, email, password, cPassword)
            {
                const validRegister = password === cPassword && password !== "" && cPassword !== "" && email !== ""
                if(validRegister)
                {
                    console.log(fName + " " + lName + " " + email + " " + password + " ")
                    //send fName, lName, email, password to db
                    this.registerSuccess = true
                    this.$router.push('/2fa')
                }
                else
                {
                    console.log(validRegister)
                    this.registerSuccess = false
                }
            },
        }
    }
</script>