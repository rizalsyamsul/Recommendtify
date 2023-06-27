<script>
import CardTrack from '../components/CardTrack.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  components: {
    CardTrack
  },
  computed: {
    ...mapWritableState(useMusicStore, ['rec'])
  },
  methods: {
    ...mapActions(useMusicStore, ['fetchRecommend'])
  },
  created() {
    this.fetchRecommend()
  }
}
</script>

<template>
  <section class="section-padding">
    <div class="container">
      <h4 class="text-center">Your Track Recommendation</h4>
    </div>
    <div class="container">
      <div class="row">
        <CardTrack v-for="item, index in rec" :key="index" :item="item" :index="index" />

      </div>
    </div>
  </section>
</template>

<style></style>