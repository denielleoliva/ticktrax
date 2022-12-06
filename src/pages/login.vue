<template>
    <q-page padding style="font-family: customfont; margin:10px">
        <h2>
            Sign Into Your Account
        </h2>
        <!-- Enter email -->
        <q-input filled label="Email" style="max-width: 500px; margin: 5px;"
        v-model="email" type="email" />
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
        <q-btn style="margin-left:5px; margin-top:10px"
            @click="signIn()">
            Sign in
        </q-btn>
    </q-page>
  </template>
  
  <script>
    import { ref } from 'vue'
    import { router } from 'http'

    export default 
    {
        setup () 
        {
            return {
                password: ref(''),
                isPwd: ref(true),
                email: ref(''),
            }
        },
        methods:{
            signIn() 
            {
                this.$router.push('profile/1')
            }   
        }
    }
</script>