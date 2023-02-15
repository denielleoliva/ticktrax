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
import { axios } from 'boot/axios'

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
        // pretty sure we need a forgot password feature (dunno how to do php type things :C)
        forgotPassword()
        {

        },  
        // async because the api call has promise :thumbs-up:
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
            
            //  place the api call here (using fetch)

            //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
            //  url for our api connection (this doesn't work yet but I think this is the format we want the fetch)
            // const url = '192.168.1.10:5095/auth'

            // fetch(url, {
            //     //  this means we add to database
            //     method: 'POST',

            //     //  this means we are adding of type json
            //     headers: {
            //         'Content-Type' : 'application/json',
            //     },

            //     //  this are the fields in json format (hopefully)
            //     body: JSON.stringify(this.fields)
            // })
            // .then((response) => response.json)

            // //  reporting successful post
            // .then((data) => {
            //     console.log('API POST', data)
            // })

            // //  reported failed post
            // .catch((error) => {
            //     console.error('API POST FAIL', error)
            // })
            //  api call here using axios

            // https://masteringjs.io/tutorials/axios/json
            // https://stackoverflow.com/questions/49529201/node-js-axios-wont-connect-to-localhost

            //  api call starts here :)
            //  i left the fetch just in case we want to go back to that

            //  set our url (hopefully this works for the vm)
            //  note: console was unhappy about localhost:5095
            //  removing port (idk why) will prompt a 404 error 
            //  we expect this beceause localhost isn't pointed to anything
            //  I believe we need a non-localhost url here :c
            const url = 'localhost:5095/auth'

            //  specify the connection further
            const api = axios.create({
                //  url specified above
                baseURL: url,

                //  of type post
                method: 'POST',

                // tells axios theres no proxy
                // otherwise will try to set default proxy (why axios?)
                proxy: false
            })

            //  axios will return (async) a response from the post
            const response = await api(
                //  "fields" is an object that is being json'ified through JSON.stringify()
                JSON.stringify(this.fields), 
                {
                    //  specifies the body is json type
                    headers: 
                    {
                        'content-type': 'text/json'
                    }
                }
            );

            // we have the response of type json now
            console.log(response.data.JSON)

            //  from here we need to make sure that res indicates a good sign in and continue from there
            //  I haven't implemented this because I'm not sure what res is going to return

            // if we find good authentication
            // if (res.data.includes("authenticated"))
            // {
            //     //  route to the edit profile page with the token for that specific user
            // }
            //  otherwise we set authFail to true and pop the q-banner :thumbs-up:
            // else{
            //     this.authFail = true
            // }
        }   
    }
}
</script>