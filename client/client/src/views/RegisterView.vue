<script>
import { mapActions, mapState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useMusicStore, ['register']),
    regist() {
      let val = {
        email: this.email,
        password: this.password
      }

      this.register(val)
    },
  }
}
</script>

<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-12 mx-auto">
          <h2 class="mb-4 text-center">Register</h2>

          <form @submit.prevent="regist" class="contact-form" role="form">
            <div class="col-lg-12 col-12 mt-3">
              <label for="email" class="form-label">Email <sup class="text-danger">*</sup></label>

              <input v-model="email" type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control"
                placeholder="Email address" required>
            </div>

            <div class="col-lg-12 col-12 mt-3">
              <label class="form-label">Password <sup class="text-danger">*</sup></label>

              <input v-model="password" type="password" class="form-control" placeholder="Password" required>
            </div>
            <div class="col-lg-5 col-12 mx-auto mt-5">
              <button type="submit" class="form-control">Register</button>
            </div>
          </form>
        </div>
        <p class="text-center mt-3">Already Have Account?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  </section>
</template>