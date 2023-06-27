<script>
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  computed: {
    ...mapWritableState(useMusicStore, ['isLoginApp', 'isLoginSpot'])
  },
  methods: {
    async logout() {
      localStorage.clear()
      this.isLoginApp = false
      this.isLoginSpot = false
      await Swal.fire({
        text: 'Logout Success',
        icon: 'success',
        confirmButtonText: 'Okay'
      })
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light shadow-lg">
    <div class="container">
      <a class="navbar-brand">
        <strong>
          <RouterLink to="/" style="color: #1db954;">Recommendtify</RouterLink>
        </strong>
      </a>


      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link">
              <RouterLink to="/artists">Top Artists</RouterLink>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link">
              <RouterLink to="/tracks">Top Tracks</RouterLink>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link">
              <RouterLink to="/rec">Recommendation</RouterLink>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link">
              <RouterLink to="/myMusic">My Music</RouterLink>
            </a>
          </li>

          <li class="nav-item">
            <a @click.prevent="logout" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
a:hover {
  cursor: pointer;
}
</style>