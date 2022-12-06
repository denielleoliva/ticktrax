<template>
    <q-page padding style="font-family: customfont; margin:10px">
        <h2>
            Create Account
        </h2>
        <h6 style="margin:6px; font-size:medium"> First Name</h6>
        <!-- First Name -->
        <q-input filled style="max-width: 500px; margin: 10px" 
        v-model="fName" type="name"/>
        <h6 style="margin:6px; font-size:medium""> Last Name</h6>
        <!-- Last Name -->
        <q-input filled style="max-width: 500px; margin: 10px"
        v-model="lName" type="name"/>
        <h6 style="margin:6px; font-size:medium""> Email *</h6>
        <!-- Enter email -->
        <q-input filled style="max-width: 500px; margin: 10px;"
        v-model="email" type="email"  />
        <h6 style="margin:6px; font-size:medium""> Password *</h6>
        <!-- Enter Password -->
        <q-input filled style="max-width: 500px; margin: 10px;"
            v-model="password" :type="isPwd ? 'password' : 'text'"/>
        <!-- Confirm Password -->
        <h6 style="margin:6px; font-size:medium""> Confirm Password *</h6>
        <q-input filled style="max-width: 500px; margin: 10px;"
            v-model="cPassword" :type="isPwd ? 'password' : 'text'"/>
        <h6 style="margin:6px; font-size:xx-small"> * indicates a required field </h6>
        <!-- Submit to DB -->
        <q-btn style="margin-left:6px; margin-top:10px; background-color:skyblue"
            @click="register(fName, lName, email, password, cPassword)">
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
            const confirmCorrect = password === cPassword
            if(confirmCorrect)
            {
                //send fName, lName, email, password to db
            }
        }
    }
}
</script>