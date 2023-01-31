<template>
    <q-page padding style="font-family: customfont; margin:10px;">
        <h2>
            Create Account
        </h2>
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
            <q-btn style="align:center; margin-left:12px; margin-top:10px; background-color:#21ba45;"
                @click="register(fName, lName, email, password, cPassword)">
                Sign in
            </q-btn>
            <div class="col"  v-if="(registerSuccess === true)" style="align-content: center; padding:12px; font-size:large">
                Account Creation Successful!
            </div>
            <div class="col" v-if="(registerSuccess === false)" style="align-content: center; padding:12px; font-size:large"> 
                * indicates a required field 
            </div>
        </div>
        <!-- Submit to DB -->
    </q-page>
  </template>
  
<script>
import { ref } from 'vue'

export default{
    data () {
        return {
            leftDrawer: false,
            signedIn: false,
            authFail: false,
            registerSuccess: false,
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
                }
                else
                    console.log(validRegister)
            },
        }
    }
</script>