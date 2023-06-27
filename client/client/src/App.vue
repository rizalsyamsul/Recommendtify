<script>
import { RouterLink, RouterView } from 'vue-router'
import Overlay from './components/Overlay.vue'
import Navbar from './components/Navbar.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from './stores/music'
export default {
  components: {
    Overlay, Navbar
  },
  computed: {
    ...mapWritableState(useMusicStore, ['isLoginApp'])
  },
  created() {
    if (localStorage.access_token_app) {
      this.isLoginApp = true
    }
  }
}
</script>

<template>
  <Overlay />
  <Navbar v-if="isLoginApp" />

  <RouterView />
</template>

<style ></style>
