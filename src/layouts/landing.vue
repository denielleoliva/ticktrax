<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header v-if="$q.platform.is.desktop" elevated class="row" style="background-color:#5CAB7D; color:white;">
      <q-toolbar class="col-auto">
        <q-toolbar-title style="font-family:customfont">
          ticktrax
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs  style="background-color: #5CAB7D">
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
          <q-route-tab v-if="!signedIn"
            class="q-px-sm"
            style="justify-content:left"
            to="/signin"
            replace
            label="sign in"
          />
          <q-route-tab
            to="/register"
            replace
            label="create account"
          />
          <q-route-tab v-if="signedIn"
            style="justify-content:left"
            to="/profile/1"
            replace
            label="Edit Profile"
          />
          <q-route-tab v-if="signedIn"
            style="justify-content:left"
            to="/overview"
            replace
            label="overview"
            />
          <q-route-tab v-if="signedIn"
            style="justify-content:left"
            @click="logOut()"
            label="log out">
          </q-route-tab>
          <q-route-tab class="row" @click="() => Dark.toggle()" style="justify-content:left">
            <div class="row">
                <div style="font-family:roboto; font-weight:500">
                  DARK MODE
                  <q-icon name="dark_mode" right style="font-size:x-large; align-self:center"/>
                </div>
            </div>
          </q-route-tab>
        </q-btn-dropdown>
      </q-tabs>
      <q-btn
        class="absolute-right gt-xs"
        flat
        :icon="Dark.isActive ? 'light_mode' : 'dark_mode'"
        @click="() => Dark.toggle()"
      />
      <q-btn
        class="relative-position lt-sm"
        flat
        :icon="Dark.isActive ? 'light_mode' : 'dark_mode'"
        @click="() => Dark.toggle()"
      />
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
  },
  mounted() {
    const signedIn = sessionStorage.getItem("token")
    console.log(signedIn)
  },
  methods: {
    logOut(){
      const token = sessionStorage.getItem("token")
      console.log(token)
      sessionStorage.clear()
      const token1 = sessionStorage.getItem("token")
      console.log(token)
    }
  }
}
</script>
