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
        <q-route-tab
          to="/ticks"
          replace
          label="ticks"
        />
        <q-route-tab
          to="/profile/1"
          replace
          label="Edit Profile"
        />
        <q-route-tab
          to="/feedback"
          replace
          label="leave feedback"
        />
        <q-route-tab
          to="/signin"
          replace
          label="log out"
        />
        <q-route-tab
          to="/list"
          replace
          label="list"
          />
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
