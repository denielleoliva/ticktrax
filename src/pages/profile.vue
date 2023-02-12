<template>
  <q-page class="q-pa-lg q-mx-auto q-my-xl" style="max-width: 1000px">
    <div class="gt-sm">
    <q-splitter
      v-model="splitterModel"
    >

      <template v-slot:before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-grey"
          active-color="positive"
          indicator-color="positive"
        >
          <q-tab name="general"  label="General" />
          <q-tab name="profile"  label="Edit Profile" />
          <q-tab name="password"  label="Password" />
        </q-tabs>

      </template>

      <template v-slot:after>
        <profile-panel :tab="tab"  />
      </template>

    </q-splitter>
    </div>
    <div class="lt-md">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey q-pa-none"
      active-color="positive"
      indicator-color="positive"
      align="center"
      narrow-indicator
    >
      <q-tab name="general"  label="General" />
      <q-tab name="profile"  label="Edit Profile" />
      <q-tab name="password"  label="Password" />
    </q-tabs>
    <q-separator />
    <profile-panel :tab="tab"  />
    </div>
  </q-page>
</template>

<script>
const image = ref(null);
import { defineComponent, ref } from 'vue';
import ProfilePanel from "components/ProfilePanel.vue";
export default defineComponent({
  name: 'UserProfile',
  components: {ProfilePanel},
  setup() {
    const image = ref(null);
    const imageUrl = ref('');
    return {
      user_details: {},
      password_dict: {},
      image,
      ProfilePanel,
      imageUrl,
      tab: ref('general'),
      splitterModel: ref(20),
      updateFile() {
        imageUrl.value = URL.createObjectURL(image.value);
      },
    };
  },
});
</script>

<style scoped lang="sass">
.navLinks:hover
  background-color: rgb(33, 186, 69, 0.4)
</style>
