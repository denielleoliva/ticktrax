<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header
      elevated
      class="row justify-between"
      style="background-color: #5cab7d; color: white"
    >
      <q-toolbar class="col-auto">
        <q-toolbar-title style="font-family: customfont">
          ticktrax
        </q-toolbar-title>
        <q-tabs style="background-color: #5cab7d">
          <q-route-tab to="/" replace label="home" />
          <q-route-tab
            :to="{ name: 'profile', params: { id: 1 } }"
            replace
            label="account"
          />
          <q-route-tab to="/signin" replace label="sign in" />
          <q-route-tab to="/register" replace label="sign up" />
          <q-route-tab to="/form" replace label="form" />
        </q-tabs>
      </q-toolbar>

      <q-btn
        flat
        :icon="Dark.isActive ? 'light_mode' : 'dark_mode'"
        @click="() => Dark.set(!Dark.isActive)"
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

  data() {
    return {
      leftDrawer: false,
      Dark,
    };
  },
};
</script>
