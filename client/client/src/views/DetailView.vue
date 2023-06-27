<script>
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  computed: {
    ...mapWritableState(useMusicStore, ['detailSong'])
  },
  methods: {
    ...mapActions(useMusicStore, ['detailTrack', 'buyAlbum']),
    buy() {
      let val = {
        name: this.detailSong.album.name,
        imageUrl: this.detailSong.album.imageUrl,
        artistName: this.detailSong.artist.name,
        spotifyId: this.detailSong.album.id
      }
      this.buyAlbum(val)
    }
  },
  created() {
    this.detailTrack(this.$route.params.id)
  }
}

</script>

<template>
  <section class="section-padding">
    <div class="container">
      <h4 class="text-center">Detail</h4>
    </div>
    <div class="container">
      <div class="col justify-content-center align-items-center">
        <div class="card">
          <div class="row">
            <img class="col-4" :src="detailSong.album.imageUrl" alt="">
            <div class="col-8">
              <h4>Song: {{ detailSong.name }}</h4>
              <h5>Album: {{ detailSong.album.name }} </h5>
              <p> - </p>
              <h5>Artist: {{ detailSong.artist.name }} </h5>

              <p>Preview</p>
              <audio controls :src="detailSong.preview">
              </audio>

              <div class="mt-3">
                <a @click.prevent="buy" class="btn">Buy Album</a>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>
