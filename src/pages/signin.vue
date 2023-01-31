<template>
    <q-page padding style="font-family: customfont; margin:10px">
        <h2>
            Sign Into Your Account
        </h2>
        <h3 v-if="(this.authFail === true)">
            Sign in failed... please try again
        </h3>
        <!-- Enter email -->
        <q-input filled label="Email" style="max-width: 500px; margin: 5px;"
        v-model="email" type="email"  />
        <!-- Enter Password -->
        <q-input filled label="Password" style="max-width: 500px; margin: 5px;"
            v-model="password" :type="isPwd ? 'password' : 'text'">
            <!-- Password has see password text toggle -->
            <template v-slot:append>
                <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                />
            </template>
        </q-input>
        <q-btn style="background-color:#21ba45; margin-left:5px; margin-top:10px;"
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