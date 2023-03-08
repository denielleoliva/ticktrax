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
        <q-btn-dropdown flat label="Account" >
          <q-route-tab
            to="/signin"
            replace
            label="sign in"
          />
          <q-route-tab
            to="/register"
            replace
            label="create account"
          />
          <q-route-tab
            to="/profile/1"
            replace
            label="Edit Profile"
          />
          <q-route-tab
            to="/overview"
            replace
            label="overview"
            />
          <q-btn class="row" align="center" flat @click=logOut() style="padding-inline:28px; padding-"> Sign Out </q-btn>

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
