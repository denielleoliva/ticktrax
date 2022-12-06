<template>
    <q-page padding style="font-family: customfont; margin:10px">
        <h2>
            Create Account
        </h2>
        <h7 style="margin:12px"> First Name</h7>
        <!-- First Name -->
        <q-input filled style="max-width: 500px; margin: 10px" 
        v-model="fName" type="name"/>
        <h7 style="margin:12px"> Last Name</h7>
        <!-- Last Name -->
        <q-input filled style="max-width: 500px; margin: 10px"
        v-model="lName" type="name"/>
        <h7 style="margin:12px"> Email *</h7>
        <!-- Enter email -->
        <q-input filled style="max-width: 500px; margin: 10px;"
        v-model="email" type="email"  />
        <h7 style="margin:12px"> Password *</h7>
        <!-- Enter Password -->
        <q-input filled style="max-width: 500px; margin: 10px;"
            v-model="password" :type="isPwd ? 'password' : 'text'"/>
        <!-- Confirm Password -->
        <h7 style="margin:12px"> Confirm Password *</h7>
        <q-input filled style="max-width: 500px; margin: 10px;"
            v-model="cPassword" :type="isPwd ? 'password' : 'text'"/>
        <!-- Submit to DB -->
        <q-btn style="margin-left:10px; margin-top:10px; background-color:skyblue"
            @click="signIn(email, password)">
            Sign in
        </q-btn>
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
        }
    },
    setup () 
    {
        return {
            password: ref(''),
            isPwd: ref(true),
            email: ref(''),
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
            
        }   
    }
}
</script>