<template>
  <q-tab-panels
    v-model="$props.tab"
    animated
    swipeable
    vertical
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="general">
      <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12 q-pb-sm">
        <q-card class="card-bg">
          <q-card-section class="text-h6">
            <div class="text-h6">General</div>
            <div class="text-subtitle2 text-weight-light">
              Change your username and manage your account
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    color="green"
                    v-model="username"
                    label="Username"
                  />
                </q-item-section>


              </q-item>
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    color="green"
                    v-model="email"
                    label="Email"
                  />
                </q-item-section>
              </q-item>


            </q-list>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn v-if="$q.platform.is.mobile" align="left" class="bg-positive text-white" @click="logOut()"> log out </q-btn>
            <q-btn class="text-capitalize bg-positive text-white" @click="saveGeneralChanges()"
            >Save Changes</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </q-tab-panel>

    <q-tab-panel name="profile">
      <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12 q-pb-sm">
        <q-card class="card-bg">
          <q-card-section class="text-h6">
            <div class="text-h6">Edit Profile</div>
            <div class="text-subtitle2 text-weight-light">
              Set up your TickTrax account
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <q-list class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section side>
                  <q-avatar v-if="imageUrl" size="100px">
                    <q-img
                      v-if="imageUrl"
                      :src="imageUrl"
                      spinner-color="white"
                    />
                  </q-avatar>
                  <q-avatar v-else size="100px">
                    <q-icon name="account_box" class="shadow-box shadow-1" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-file
                    outline
                    max-file-size="819200"
                    color="green"
                    v-model="image"
                    label="Choose File"
                  />
                  <p class="text-subtitle2 text-weight-thin">
                    JPG, GIF or PNG. Max size of 800K
                  </p>
                </q-item-section>
              </q-item>



              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                      <q-input
                        dense
                        color="green"
                        v-model="firstName"
                        label="First Name"
                      />

                </q-item-section>
              </q-item>
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    color="green"
                    v-model="lastName"
                    label="Last Name"
                  />

                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn class="text-capitalize bg-positive text-white" @click="saveGeneralChanges()"
            >Save Profile</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </q-tab-panel>

    <q-tab-panel name="password">
      <div class="col-lg-7 col-md-7 col-xs-12 col-sm-12">
        <q-card class="card-bg">
          <q-card-section class="text-h6">
            <div class="text-h6">Password</div>
            <div class="text-subtitle2 text-weight-light">
              Manage your password
            </div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  color="green"
                  round
                  v-model="oldPassword"
                  label="Old Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  color="green"
                  round
                  v-model="newPassword"
                  label="New Password"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  type="password"
                  dense
                  color="green"
                  round
                  v-model="confirmNewPassword"
                  label="Confirm New Password"
                />
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn class="text-capitalize bg-positive text-white"
            >Change</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
    </q-tab-panel>
    <q-tab-panel name="leave feedback">
      <q-item-section>
        <feedback/>
      </q-item-section>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import {ref, watch} from "vue";
import Feedback from 'src/components/feedback.vue';
export default {
  components: { Feedback },
  name: "ProfilePanel",
  props: {
    tab: String
  },
    setup() {
    const image = ref(null);
    const imageUrl = ref('');
    watch(image, ()=>{
      imageUrl.value = URL.createObjectURL(image.value);
    })
    return {
      user_details: {},
      password_dict: {},
      image,
      imageUrl,
      tab: ref('general'),
      form: ref({
          email: ref(''),
          subject: ref(''),
          message: ref(''),
      }),
      username: ref(sessionStorage.getItem("username") || 'no value'),
      email: ref(sessionStorage.getItem("email")  || 'no value'),
      firstName: ref(sessionStorage.getItem("firstname")  || 'no value'),
      lastName: ref(sessionStorage.getItem("lastname") || 'no value'),
      oldPassword: ref(''),
      newPassword: ref(''),
      confirmNewPassword: ref(''),
      id: ref(''),

      body: ref({
        userSubmissions: ref(''),
        firstName: ref(''),
        lastName: ref(''),
        profilePhoto: ref(''),
        isDeleted: ref(''),
        id: ref(''),
        userName: ref(''),
        normalizedUserName: ref(''),
        email: ref(''),
        normalizedEmail: ref(''),
        emailconfirmed: ref(''),
        passwordHash: ref(''),
        securityStamp: ref(''),
        concurrencyStamp: ref(''),
        phoneNumber: ref(''),
      }),
    }
  },
  methods:{
    logOut(){
      //  clear token
      sessionStorage.clear()

      //  push to home page
      this.$router.push('/')
    },
    async updatePassword(){
      // if they didn't give the correct old password
      if(verifyOldPassword()) return

      // if they didn't give matching new and confirm new password
      if(this.newPassword !== this.confirmNewPassword) return

      // if the new password doesn't meet the requirements

      // otherwise we change the password in the backend
      else{
        // setup url
        // const url = "http://localhost:5095/"

        // send the new password with fetch
      }
    },
    verifyOldPassword(){
      // checks if the sent password is the same as the password in the backend
    },
    async initializeChanges() {
      //const response = await fetch("http://localhost:5095/email/" + this.email)
      const response = await fetch("https://ticktrax.nevada.dev/api/email/" + this.email)
      
      const data = await response.json()

        body.userSubmissions = data.userSubmissions
        body.firstName = this.firstName || data.firstName
        body.lastName = this.lastName || data.lastName
        body.profilePhoto = data.profilePhoto
        body.isDeleted = data.isDeleted
        body.id = data.id,
        body.userName = this.username || data.userName,
        body.normalizedUserName = data.normalizedUserName,
        body.email = this.email || data.email
        body.normalizedEmail = data.normalizedEmail
        body.emailconfirmed = data.emailconfirmed
        body.passwordHash = data.passwordHash
        body.securityStamp = data.securityStamp
        body.concurrencyStamp = data.concurrencyStamp
        body.phoneNumber = data.phoneNumber
    },
    async saveGeneralChanges() {
      // initialize the other profile values
      initializeGeneralChanges()

      //  if we sense no changes leave
      if(this.username === sessionStorage.getItem("username") && this.email === sessionStorage.getItem("email")) return
      
      // setup url for api call
      //const url = "http://localhost:5095/update/" + body.id
      const url = "https://ticktrax.nevada.dev/api/update/" + sessionStorage.getItem("id")

      // api call for save
      const response = await fetch(url,{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            userSubmissions: body.userSubmissions,
            firstName: body.firstName,
            lastName: body.lastName,
            profilePhoto: body.profilePhoto,
            isDeleted: body.isDeleted,
            id: body.id,
            userName: body.username,
            normalizedUserName: body.normalizedUserName,
            email: body.email,
            normalizedEmail: body.normalizedEmail,
            emailconfirmed: body.emailconfirmed,
            passwordHash: body.passwordHash,
            securityStamp: body.securityStamp,
            concurrencyStamp: body.concurrencyStamp,
            phoneNumber: body.phoneNumber,
          })
      })

      const data = await response.json()

      console.log(data)
    },


  },
}
</script>

<style scoped>

</style>
