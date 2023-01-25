<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated class="row" style="background-color:#5CAB7D; color:white;">
      <q-toolbar class="col-auto">
        <q-toolbar-title style="font-family:customfont">
          ticktrax
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs style="background-color: #5CAB7D">
        <q-route-tab
          to="/"
          replace
          label="home"
        />
        <q-route-tab
          to="/signin"
          replace
          label="sign in"
        />
        <q-route-tab
          to="/register"
          replace
          label="sign up"
        />
        <q-route-tab
          to="/form"
          replace
          label="form"
        />
        <q-btn-dropdown auto-close flat label="Account">
          <q-list>
            <q-item to="/profile/1" style="color:black; justify-content:left; align-content:center; padding:12px">
              Edit Profile
            </q-item>

            <q-item to="/signin" style="color:black; justify-content:left; align-content:center; padding:12px">
              Log Out
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>
      <q-btn
        class="absolute-right"
        flat
        :icon="Dark.isActive ? 'light_mode' : 'dark_mode'"
        @click="() => Dark.toggle()"
      />
    </q-header>






    <q-page-container>
      <!-- This is where pages get injected -->


      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { Dark } from 'quasar';

export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: false,
      Dark,
    }
  }
}
</script>
