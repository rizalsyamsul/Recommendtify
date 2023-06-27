<script>
export default {
  props: ['item', 'index'],
  methods: {
    moveDetail() {
      let id = this.item.id
      this.$router.push(`/detail/${id}`)
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
            <img :src="item.album.imageUrl" class="card-img-top" alt="albumcover">
          </div>
          <div class="col-6">
            <h5 class="card-title">#{{ index + 1 }}</h5>
            <h4 class="card-title">{{ item.name }}</h4>
            <p class="card-title">{{ item.album.name }}</p>
            <h4 class="card-title">{{ item.artist.name }}</h4>
            <a @click.prevent="moveDetail" class="btn">Detail Song</a>
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
</style>