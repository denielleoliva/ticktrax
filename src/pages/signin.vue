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
            v-model="credentials.email"  />
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
                <q-btn id="invalid" color="primary" style="margin-left:5px; margin-top:10px;"
                    @click="signIn()">
                    Sign in
                </q-btn>
            </div>
        </q-page>
    </div>
  </template>
  
<script>
import { ref } from 'vue'

export default{
    data () 
    {
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

            isPwd: ref(true),
        }
    },
    methods:{
        // async because the api call has promise :thumbs-up:
        signIn() 
        {
            const url = 'localhost:5095/auth'

            fetch(url, {
                //  this means we add to database
                method: 'POST',

                //  this means we are adding of type json
                headers: {
                'Content-Type' : 'application/json',
                },

                //  this are the fields in json format (hopefully)
                body: JSON.stringify({email: this.credentials.email, password: this.credentials.password})
            })
            .then((response) => response.json)

            //  reporting successful post
            .then((data) => {
                console.log('API POST', data)
            })

            //  reported failed post
            .catch((error) => {
                console.error('API POST FAIL', error)

                const elem = document.getElementById("invalid");

                elem.classList.add("giveShake")

                setTimeout(() => {
                    elem.classList.remove("giveShake")
                }, 1000);

                this.authFail = true
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