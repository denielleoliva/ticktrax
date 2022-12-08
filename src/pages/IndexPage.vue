<template>
  <q-page class="flex flex-center">
    <h1 style="font-family: customfont; padding: 20px">Welcome to ticktrax</h1>
    <q-img
      style="float: left; padding: 30px 30px 30px 30px"
      :src="isDark ? getImgUrl('dark-logo') : getImgUrl('light-logo')"
      width="80px"
    >
    </q-img>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar';
import { watch, ref } from 'vue';
export default {
  name: 'PageIndex',
  setup() {
    const $q = useQuasar();
    let isDark = ref($q.dark.isActive);
    watch(
      () => $q.dark.isActive,
      (val) => {
        console.log(val ? 'On dark mode' : 'On light mode');
        isDark.value = val;
      }
    );
    return {
      isDark,
    };
  },

  methods: {
    getImgUrl(icon) {
      return 'icons/' + icon + '.png';
    },
  },
};
</script>
