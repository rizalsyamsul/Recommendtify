import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useMusicStore = defineStore('music', {
  state: () => ({
    baseurl: 'https://recommendtify-server.rizalsyamsul.site',
    isLoginApp: false,
    isLoginSpot: false,
    profiles: {},
    artists: [],
    tracks: [],
    rec: [],
    detailSong: {},
    myMusic: [],
    embedHtml: ''
  }),
  actions: {
    async loginUser(val) {
      try {
        let { data } = await axios({
          url: this.baseurl + '/login',
          method: 'post',
          data: {
            email: val.email,
            password: val.password
          }
        })

        localStorage.access_token_app = data.access_token_app
        await Swal.fire({
          title: 'Success',
          text: 'Logged In',
          icon: 'success',
          confirmButtonText: 'Next'
        })
        this.isLoginApp = true
        this.router.push('/')
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    async register(val) {
      try {
        let { data } = await axios({
          url: this.baseurl + '/register',
          method: 'post',
          data: {
            email: val.email,
            password: val.password
          }
        })
        await Swal.fire({
          title: 'Success',
          text: 'Register',
          icon: 'success',
          confirmButtonText: 'Next'
        })
        this.loginUser(val)
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    async callback(code) {
      try {
        let { data } = await axios({
          url: this.baseurl + '/spotify/callback',
          headers: {
            code: code
          }
        })
        localStorage.access_token = data.access_token
        this.isLoginSpot = true
        this.fetchProfile()
      } catch (error) {
        console.log(error)
      }
    },

    async loginSpot() {
      try {
        return axios({
          url: this.baseurl + '/spotify/login'
        })
      } catch (error) {
        console.log(error)
      }
    },

    async fetchProfile() {
      try {
        let { data } = await axios({
          url: this.baseurl + '/spotify/profile',
          headers: {
            access_token_app: localStorage.access_token_app,
            access_token: localStorage.access_token
          }
        })
        this.profiles = data
      } catch (error) {
        console.log(error)
      }
    },

    async fetchArtists() {
      try {
        let { data } = await axios({
          url: this.baseurl + '/spotify/topArtists',
          headers: {
            access_token_app: localStorage.access_token_app,
            access_token: localStorage.access_token
          }
        })
        this.artists = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    async fetchTracks() {
      try {
        let { data } = await axios({
          url: this.baseurl + '/spotify/topTracks',
          headers: {
            access_token_app: localStorage.access_token_app,
            access_token: localStorage.access_token
          }
        })
        this.tracks = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },
    async fetchRecommend() {
      try {
        let { data } = await axios({
          url: this.baseurl + '/spotify/recommend',
          headers: {
            access_token_app: localStorage.access_token_app,
            access_token: localStorage.access_token
          }
        })
        this.rec = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },
    async detailTrack(SongId) {
      try {
        let { data } = await axios({
          url: this.baseurl + `/spotify/detailTrack/${SongId}`,
          headers: {
            access_token_app: localStorage.access_token_app,
            access_token: localStorage.access_token
          }
        })
        this.detailSong = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    async fetchMyMusic() {
      try {
        let { data } = await axios({
          url: this.baseurl + '/myMusic',
          headers: {
            access_token_app: localStorage.access_token_app
          }
        })
        this.myMusic = data
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    async buyAlbum(val) {
      try {
        let { data } = await axios({
          url: this.baseurl + '/myMusic',
          method: 'post',
          headers: {
            access_token_app: localStorage.access_token_app
          },
          data: {
            name: val.name,
            imageUrl: val.imageUrl,
            artistName: val.artistName,
            spotifyId: val.spotifyId
          }
        })
        await Swal.fire({
          text: 'Success add to My Album',
          icon: 'success',
          confirmButtonText: 'Okay'
        })
        this.router.push('/myMusic')
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    async updateStatus(id) {
      try {
        let { data } = await axios({
          url: this.baseurl + `/myMusic/${id}`,
          method: 'patch',
          headers: {
            access_token_app: localStorage.access_token_app
          }
        })

        this.fetchMyMusic()
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    async payAlbum(id) {
      try {
        let { data } = await axios({
          url: this.baseurl + `/generate-midtrans/${id}`,
          method: 'post',
          headers: {
            access_token_app: localStorage.access_token_app
          }
        })

        let cb = await this.updateStatus(id)
        window.snap.pay(data.token, {
          onSuccess: async function (result) {
            /* You may add your own implementation here */
            await Swal.fire({
              text: 'Success To Pay, Enjoy!!!',
              icon: 'success',
              confirmButtonText: 'Okay'
            })
            cb()
          }
        })
      } catch (error) {
        console.log(error)
        Swal.fire({
          title: 'Error!',
          text: error.response.data.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    },

    embed(id) {
      this.embedHtml = `
      <iframe style="border-radius:12px"
          src="https://open.spotify.com/embed/album/${id}?utm_source=generator" width="100%" height="352"
          frameBorder="0" allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      `
    }
  }
})
