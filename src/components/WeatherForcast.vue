<template>
  <div class='w-100'>
    <div class="row mt-5 mb-3">
      <h2 class='h1'>Current Conditions</h2>
    </div>
    <div class="row mt-4 mb-5">
      <b-card
        bg-variant="light"
        header-bg-variant="primary"
        header-text-variant="white"
        class='w-100'
      >
        <h2 class='display-3' slot='header'>
          {{ this.currentWeather.timestamp | moment('dddd') }}
        </h2>
        <p
        class='text-white'
        slot='header'
        >
          {{ this.currentWeather.timestamp | moment('MMMM Do, YYYY') }}
        </p>
        <div class="row">
          <div class="column p-3">
            <img :src="this.currentWeather.icon" height='150' width="150">
            <p
              class='card-text text-center font-weight-light text-capitalize big-font'
            >
              {{ this.currentWeather.description }}
            </p>
          </div>
          <div class="column p-5">
            <p class='card-text big-font'>
              <strong>Temp: </strong>{{ this.currentWeather.temperature }} &#176;F
            </p>
            <p class='card-text big-font'>
              <strong>Feels Like: </strong>{{ this.currentWeather.feelsLike }} &#176;F
            </p>
            <p class="card-text big-font">
              <strong>Humidity: </strong>{{ this.currentWeather.humidity }}%
            </p>
          </div>
          <div class="column p-5">
            <p class='card-text big-font'>
                <strong>Windspeed: </strong>
                  {{ this.currentWeather.windSpeed }}
                  <span class='text-uppercase'>mph </span>
                  <span class='text-capitalize'>{{ this.currentWeather.windDirection }}</span>
            </p>
            <p class='card-text big-font'>
              <strong>Total Precipitation: </strong>
              {{ this.currentWeather.precip ? this.currentWeather.precip : 0 }} in
            </p>
            <p class='card-text big-font'>
              <strong>UV Index: </strong>{{ this.currentWeather.uv }}
            </p>
          </div>
        </div>
      </b-card>
    </div>
    <div class="row">
      <p class="h1">5 Day Forecast</p>
    </div>
    <div class="row w-100">
      <div class="column w-100">
        <b-card-group
          deck
          class='w-100 mt-5 mb-5 d-flex flex-direction-row justify-content-between'>
          <b-card
            header-bg-variant="primary"
            header-text-variant="white"
            v-for='day in forecastWeather'
            :key='day.timestamp'
            class='text-center'
          >
            <h3 slot='header' class=''>{{ day.timestamp | moment('dddd') }}</h3>
            <p class='text-white' slot='header'>{{ day.timestamp | moment('MMMM D') }}</p>
            <img :src="day.icon" height='100' width="100">
            <p>{{ day.description }}</p>
            <p><strong>High: </strong>{{ day.maxTemp }} &#176;F</p>
            <p><strong>Low: </strong>{{ day.minTemp }} &#176;F</p>
            <p><strong>Precip: </strong>{{ day.precipPercentage }}%</p>
            <p><strong>Sunrise: </strong>{{ day.sunrise | moment('hh:mm A') }}</p>
            <p><strong>Sunset: </strong>{{ day.sunset | moment('hh:mm A') }}</p>
          </b-card>
        </b-card-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherForcast',
  props: ['currentWeather', 'forecastWeather']
}
</script>

<style scoped>
.big-font {
  font-size: 18px;
}
</style>
