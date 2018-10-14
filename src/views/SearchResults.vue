<template>
  <div class='container'>
    <div v-if='this.searchLocation.err' class="row d-flex justify-content-between mt-4">
      <div class="column">
        <h1>No Search Results Found</h1>
      </div>
      <div class="column">
        <b-button @click='newSearch' variant="danger">Search Again</b-button>
      </div>
    </div>
    <div v-else>
      <div class="row d-flex justify-content-between mt-4">
        <div class="column">
          <h1>Search Results for {{ this.searchLocation.name }}</h1>
        </div>
        <div class="column">
          <b-button @click='newSearch' variant="danger">Search Again</b-button>
        </div>
      </div>
      <div class="row">
        <GoogleMap :locationData='searchLocation' :markers='trails'/>
      </div>
      <div class="row mt-5 w-100">
        <WeatherForcast :forecastWeather='weather' :currentWeather='current'/>
      </div>
      <div class="row mt-5 w-100">
        <TrailsList :trailsList='trails' />
      </div>
    </div>
  </div>
</template>

<script>
import GoogleMap from '@/components/GoogleMap.vue'
import WeatherForcast from '@/components/WeatherForcast.vue'
import TrailsList from '@/components/TrailsList.vue'
import { mapState } from 'vuex'

export default {
  name: 'SearchResults',
  components: {
    GoogleMap,
    WeatherForcast,
    TrailsList
  },
  props: ['query'],
  computed: {
    ...mapState(['searchLocation', 'weather', 'current', 'trails'])
  },
  methods: {
    newSearch() {
      this.$router.push({
        name: 'Home'
      })
    }
  },
  mounted() {
    this.$store.dispatch('getGeoLocation', this.query)
  }
}
</script>

<style scoped>
</style>
