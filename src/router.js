import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SearchResults from './views/SearchResults.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search-results/:query',
      name: 'SearchResults',
      component: SearchResults,
      props: true
    }
  ]
})
