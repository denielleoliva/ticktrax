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
        <q-route-tab v-if="isSignedIn()"
          to="/form"
          replace
          label="add a tick"
        />
        <q-route-tab
          to="/maps"
          replace
          label="maps"
          />
        <q-route-tab
          to="/ticksavvy"
          replace
          label="identify"
        />
          <q-route-tab
          to="/tickgame"
          replace
          label="game"/>
        <!-- if signed in -->
        <q-btn-dropdown v-if="isSignedIn()" class="q-pa-sm" flat :label=greeting()>
          <q-route-tab
            v-if="isSignedIn()"
            style="justify-content:center"
            to="/profile/1"
            replace
            label="Edit Profile"
          />
          <q-route-tab
            v-if="isSignedIn()"
            style="justify-content:center"
            to="/admin"
            replace
            label="admin"
            />
          <q-route-tab
            v-if="isSignedIn()"
            style="justify-content:center"
            @click="logOut()"
            label="log out">
          </q-route-tab>
          <q-route-tab class="row" @click="() => Dark.toggle()" style="justify-content:center">
            <div class="row">
                <div style="font-family:roboto; font-weight:500">
                  DARK MODE
                  <q-icon name="dark_mode" style="font-size:x-large; align-self:center"/>
                </div>
            </div>
          </q-route-tab>
        </q-btn-dropdown>
        <!-- if not signed in -->
        <q-btn-dropdown v-if="!isSignedIn()" class="q-pa-sm" flat label="Account" >
          <q-route-tab
            class="q-px-md"
            style="justify-content:center"
            to="/signin"
            replace
            label="sign in"
          />
          <q-route-tab
            style="justify-content:center"
            to="/register"
            replace
            label="Create Account"
          />
          <q-route-tab class="row" @click="() => Dark.toggle()" style="justify-content:center">
            <div class="row">
                <div style="font-family:roboto; font-weight:500">
                  DARK MODE
                  <q-icon name="dark_mode" style="font-size:x-large; align-self:center"/>
                </div>
            </div>
          </q-route-tab>
        </q-btn-dropdown>
      </q-tabs>
    </q-header>

    <!-- <q-toolbar-title class="q-pa-sm" style="font-family:customfont; background-color:#5CAB7D">
      ticktrax
    </q-toolbar-title> -->

    <q-footer v-if="$q.platform.is.mobile && isSignedIn()" elevated style="background-color:#5CAB7D; color:white;">
      <q-tabs class="row" style="background-color: #5CAB7D;">
        <q-route-tab
          to="/"
          replace
        >
          <q-icon name="home" size="2em"/>
        </q-route-tab>
        <q-route-tab to="/maps" replace >
          <q-icon name="map" size="3em"/>
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

    <q-page-sticky v-if="$q.platform.is.mobile && isSignedIn()" :offset="[18, 18]">
      <q-btn fab icon="add_circle" color="primary" @click="$router.push('/form')"/>
    </q-page-sticky>
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
    isSignedIn(){
      if(sessionStorage.getItem("token") !== null) return true
      else if(sessionStorage.getItem("token") === null)  return false
    },
    greeting(){
      //  grab the username from session storage
      const username = sessionStorage.getItem("username")

      //  if the username is not null, set greeting to welcome back username
      if(username) return 'welcome ' + username + '!'

      //  otherwise just return account
      else  return 'account'
    },
    logOut(){
      //  clear token
      sessionStorage.clear()

      //  push to home page for desktop / welcome for mobile
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
