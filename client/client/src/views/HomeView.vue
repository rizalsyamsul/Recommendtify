<script>
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  data() {
    return {
      url: 'google.com'
    }
  },
  components: {

  },
  computed: {
    ...mapWritableState(useMusicStore, ['isLoginSpot', 'profiles'])
  },
  methods: {
    ...mapActions(useMusicStore, ['callback', 'loginSpot', 'fetchProfile']),
    async hitLogin() {
      let { data } = await this.loginSpot()
      window.location.href = data.authorizationUrl
    }
  },
  created() {
    if (localStorage.access_token) {
      this.isLoginSpot = true
      this.fetchProfile()
    } else {
      this.callback(this.$route.query.code)
    }

  }
}
</script>

<template>
  <section class="section-padding">
    <div class="container">
      <h4 v-if="!isLoginSpot" class="text-center">Connect To Your Spotify
        <div class="col-md-4 col-6 mx-auto mt-3">
          <button @click="hitLogin" class="form-control" style="background-color: #1db954; color: white;">Connect</button>
        </div>
      </h4>

      <div v-else-if="isLoginSpot" class="col-6 mx-auto">
        <h4 class="text-center">Hello</h4>
        <div class="card ">
          <div class="row">
            <img class="col-6" :src="profiles.imageUrl" alt="">
            <div class="col-6 mt-3">
              <h5>Name: {{ profiles.name }}</h5>
              <p>Username: {{ profiles.username }}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
