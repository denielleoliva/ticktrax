<template>
  <q-drawer
    v-model="leftDrawerOpen"
    class="bg-transparent"
  >
    <q-list>
      <q-item to="/" active-class="q-item-no-link-highlighting">
        <q-item-section avatar>
          <q-icon name="dashboard"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/Dashboard2" active-class="q-item-no-link-highlighting">
        <q-item-section avatar>
          <q-icon name="dashboard"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>CRM Dashboard</q-item-label>
        </q-item-section>
      </q-item>
      <q-expansion-item
        icon="pages"
        label="Pages"
      >
        <q-list class="q-pl-lg">
          <q-item to="/Login-1" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="email"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Login-1</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/Lock" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="lock"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Lock Screen</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/Lock-2" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="lock"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Lock Screen - 2</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/Pricing" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="list"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Pricing</q-item-label>
            </q-item-section>
          </q-item>
          <q-item-label header class="text-weight-bolder text-white">Generic</q-item-label>
          <q-item to="/Profile" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="person"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>User Profile</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/Maintenance" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Maintenance</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-expansion-item
        icon="map"
        label="Maps"
      >
        <q-list class="q-pl-lg">
          <q-item to="/Map" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="map"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Map</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/MapMarker" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="location_on"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Map Marker</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/StreetView" active-class="q-item-no-link-highlighting">
            <q-item-section avatar>
              <q-icon name="streetview"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Street View</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: "DashboardSidebar",
  data() {
    return {
      leftDrawerOpen: true
    }
  }
}
</script>

<style scoped>

</style>
