<script>
import CardArtist from '../components/CardArtist.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  components: {
    CardArtist
  },
  computed: {
    ...mapWritableState(useMusicStore, ['artists'])
  },
  methods: {
    ...mapActions(useMusicStore, ['fetchArtists'])
  },
  created() {
    this.fetchArtists()
  }
}

</script>

<template>
  <section class="section-padding">
    <div class="container">
      <h4 class="text-center">Your Top Artists</h4>
    </div>

    <div class="container">
      <div class="row">
        <CardArtist v-for="item, index in artists" :key="index" :item="item" :index="index" />
      </div>
    </div>


  </section>
</template>

<style></style>