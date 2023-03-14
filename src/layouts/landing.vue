<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header v-if="$q.platform.is.desktop" elevated class="row" style="background-color:#5CAB7D; color:white;">
      <q-toolbar class="col">
        <q-toolbar-title style="font-family:customfont">
          ticktrax
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs style="background-color:#5CAB7D;">
        <q-route-tab
          to="/"
          replace
          label="home"
        />
        <q-route-tab
          to="/form"
          replace
          label="form"
        />
        <q-btn-dropdown class="q-pa-sm" flat label="Account" >
          <q-route-tab
            class="q-px-sm"
            style="justify-content:left"
            to="/signin"
            replace
            label="sign in"
          />
          <q-route-tab
            style="justify-content:left"
            to="/register"
            replace
            label="create account"
          />
          <q-route-tab
            style="justify-content:left"
            to="/profile/1"
            replace
            label="Edit Profile"
          />
          <q-route-tab
            style="justify-content:left"
            to="/overview"
            replace
            label="overview"
            />
          <q-route-tab
            style="justify-content:left"
            @click="logOut()"
            label="log out">
          </q-route-tab>
          <q-route-tab @click="() => Dark.toggle()"
            label="Dark Mode"  style="justify-content:left">
          </q-route-tab>
        </q-btn-dropdown>
      </q-tabs>
    </q-header>

    <!-- <q-toolbar-title class="q-pa-sm" style="font-family:customfont; background-color:#5CAB7D">
      ticktrax
    </q-toolbar-title> -->

    <q-footer v-if="$q.platform.is.mobile" elevated style="background-color:#5CAB7D; color:white;">
      <q-tabs class="row" style="background-color: #5CAB7D;">
        <q-route-tab
          to="/"
          replace
        >
          <q-icon name="home" size="2em"/>
        </q-route-tab>
        <q-route-tab
          to="/form"
          replace
        >
          <q-icon name="add_circle" size="3em"/>
        </q-route-tab>
        <q-route-tab
          to="/profile/1"
          replace
        >
          <q-icon name="person" size="2em"/>
        </q-route-tab>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <!-- This is where pages get injected -->


      <router-view />
    </q-page-container>

    <q-inner-loading
        :showing="logOutBar"
        label="Logging you out..."
        label-class=""
        label-style=""
        style="background-color:beige"
    /> 

  </q-layout>
</template>

<script>
import { Dark } from 'quasar';

export default {
  data () {
    return {
      logOutBar: false,
      leftDrawer: false,
      Dark,
    }
  },
  methods: {
    logOut(){
      //  clear token
      sessionStorage.clear()

      //  push to home page
      this.$router.push('/')

      //  turn on load
      this.logOutBar = true

      //  wait 2 sec and turn off load
      setTimeout(() => {
        this.logOutBar = false
      }, 2000);
    }
  }
}
</script>
