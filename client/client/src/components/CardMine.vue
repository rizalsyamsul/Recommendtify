<script>
import { mapActions, mapWritableState } from 'pinia'
import { useMusicStore } from '../stores/music'
export default {
  props: ['item', 'index'],
  computed: {
    formattedPrice() {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(this.item.price)
    }
  },
  methods: {
    ...mapActions(useMusicStore, ['payAlbum', 'embed']),
    pay() {
      let id = this.item.id
      this.payAlbum(id)
    },
    getEmbed() {
      let id = this.item.spotifyId
      this.embed(id)
    }
  }
}
</script>

<template>
  <div class="col-sm-6 mt-3">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <img :src="item.imageUrl" class="card-img-top" alt="albumcover">
          </div>
          <div class="col-6">
            <h4 class="card-title">{{ item.name }}</h4>
            <h5 class="card-title">{{ item.artistName }}</h5>
            <h5 class="card-title">{{ formattedPrice }}</h5>
            <a v-if="!item.status" class="btn btn-secondary" @click.prevent="pay">Pay</a>
            <div v-else-if="item.status">
              <p class="card-text">This album already Paid</p>
              <button @click.prevent="getEmbed" class="btn btn-primary">Open</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
.btn {
  background-color: #1db954;
  color: white;
}

.btn-secondary {
  background-color: #184ee0;
  color: white;
}
</style>