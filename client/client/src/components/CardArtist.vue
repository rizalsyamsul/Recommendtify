<script>
export default {
  props: ['item', 'index'],
  computed: {
    genre() {
      if (this.item.genres === 0) return ''
      return this.item.genres.join(', ')
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

            <h5 class="card-title">#{{ index + 1 }}</h5>
            <h4 class="card-title">{{ item.name }}</h4>
            <p class="card-text"> {{ genre }}</p>
            <!-- <a class="btn" style="background-color: #1db954; color: white;">Detail</a> -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>