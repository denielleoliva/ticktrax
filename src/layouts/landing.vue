<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated class="row">
      <q-toolbar class="col-auto">
        <q-toolbar-title style="font-family:customfont"> 
          ticktrax
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs>
        <q-route-tab 
          to="/"
          replace
          label="home"
        />
        <q-route-tab
          :to="{name: 'profile', params: {id: 1}}"
          replace
          label="account"
        />
        <q-route-tab
          to="login"
          replace
          label="login"
        />
      </q-tabs>
    </q-header>

    


    

    <q-page-container>
      <!-- This is where pages get injected -->
      

      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data () {
    return {
      leftDrawer: false
    }
  }
}
</script>
