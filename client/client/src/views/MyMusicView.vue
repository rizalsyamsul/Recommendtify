<script>
import CardMine from '../components/CardMine.vue'
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  components: {
    CardMine
  },
  computed: {
    ...mapWritableState(useMusicStore, ['myMusic', 'embedHtml'])
  },
  methods: {
    ...mapActions(useMusicStore, ['fetchMyMusic'])
  },
  created() {
    this.embedHtml = ''
    this.fetchMyMusic()
  }
}
</script>

<template>
  <section class="section-padding">
    <div class="container">
      <h4 class="text-center">My Music</h4>
    </div>

    <div class="container">
      <div class="row">
        <CardMine v-for="(item, index) in myMusic" :key="index" :item="item" :index="index" />
      </div>

      <div class="container mt-3">
        <div v-html="embedHtml"></div>
      </div>
    </div>
  </section>
</template>

<style></style>