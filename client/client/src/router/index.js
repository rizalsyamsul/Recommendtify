import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TopArtistsView from '../views/TopArtistsView.vue'
import TopTracksView from '../views/TopTracksView.vue'
import RecommendView from '../views/RecommendView.vue'
import MyMusicView from '../views/MyMusicView.vue'
import DetailView from '../views/DetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/artists',
      name: 'artists',
      component: TopArtistsView
    },
    {
      path: '/tracks',
      name: 'tracks',
      component: TopTracksView
    },
    {
      path: '/rec',
      name: 'rec',
      component: RecommendView
    },
    {
      path: '/myMusic',
      name: 'myMusic',
      component: MyMusicView
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAuth = localStorage.access_token_app
  let isSpot = localStorage.access_token
  if (
    !isAuth &&
    (to.name == 'home' ||
      to.name == 'artists' ||
      to.name == 'tracks' ||
      to.name == 'rec' ||
      to.name == 'myMusic')
  )
    next('/login')
  if (isAuth && (to.name == 'login' || to.name == 'register')) next('/')

  if (!isSpot && (to.name == 'artists' || to.name == 'tracks' || to.name == 'rec')) next('/')

  next()
})
export default router
