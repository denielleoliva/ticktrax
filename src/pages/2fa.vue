<template>
    <div class="col" style="justify-content: center; align-content:center">
        <q-banner style="padding:20px; margin:20px; background-color:rgb(92, 171, 125); color:white; font-weight:bold;">
            Enter the 6-digit code sent to your email
        </q-banner>
        <q-banner v-if="authed !== null && authed === false">
            authentication failed
        </q-banner>
        <div class="col" style="justify-content: center">
            <q-input v-model="password" outlined style="margin:20px"
                @keyup.enter="authenticate(password)"/>

            <q-btn style="margin:20px; background-color:rgb(92, 171, 125); color:white" 
                @click="authenticate(password)">
                submit
            </q-btn>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default{
    setup () 
    {
        return {
            password: ref(''),
        }
    },
    props:{
        authed: {
            type: Boolean,
            default: null,
            required: false
        }
    },
    methods:{
        authenticate(twoFactorAuth) {
            //  grab user input
            const payload = twoFactorAuth

            //  making sure there are 6 digits
            if(payload > 999999 || payload < 111111)
            {
                console.log("code must be 6 digits")
                return false
            }

            //  send it to api
            console.log(payload)

            //  return api response
            const response = true

            if(response)
            {
                this.$router.push('/profile/1')
            }
            else
            {
                this.authed = false
            }
        }
            
    },
}

</script>