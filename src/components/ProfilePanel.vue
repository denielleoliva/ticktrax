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
                    v-model="user_details.user_name"
                    label="Username"
                  />
                </q-item-section>


              </q-item>
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    color="green"
                    v-model="user_details.email"
                    label="Email"
                  />
                </q-item-section>
              </q-item>


            </q-list>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn class="text-capitalize bg-positive text-white"
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
                        v-model="user_details.first_name"
                        label="First Name"
                      />

                </q-item-section>
              </q-item>
              <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-input
                    dense
                    color="green"
                    v-model="user_details.last_name"
                    label="Last Name"
                  />

                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn class="text-capitalize bg-positive text-white"
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
                  v-model="password_dict.current_password"
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
                  v-model="password_dict.new_password"
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
                  v-model="password_dict.confirm_new_password"
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
  </q-tab-panels>
</template>

<script>
import {ref, watch} from "vue";
export default {
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
    }
  }
}
</script>

<style scoped>

</style>
