import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_KEY = 'AIzaSyCnyL8uMZZ2--PxXexaApNEb0oMTN2vbyM'
const WEATHER_KEY = '561f14cf5f16425a98fb0f2ce6cfe344'
const TRAIL_KEY = '200202949-be5202662091a9dc38356c0c802cd058'

export default new Vuex.Store({
  state: {
    searchLocation: {
      name: '',
      lat: null,
      lng: null,
      err: null
    },
    weather: null,
    current: {
      timestamp: '',
      temperature: '',
      feelsLike: '',
      windSpeed: '',
      windDirection: '',
      uv: '',
      description: '',
      icon: '',
      precip: '',
      humidity: ''
    },
    trails: null
  },
  mutations: {
    SET_LOCATION(state, payload) {
      state.searchLocation.err = null
      state.searchLocation.name = payload.locationName
      state.searchLocation.lat = payload.lat
      state.searchLocation.lng = payload.lng
    },
    FORCAST_WEATHER(state, payload) {
      state.weather = payload
    },
    CURRENT_WEATHER(state, payload) {
      state.current.timestamp = payload.currentTime
      state.current.temperature = payload.currentTemp
      state.current.humidity = payload.currentHumidity
      state.current.precip = payload.currentPrecip
      state.current.description = payload.currentDesc
      state.current.icon = payload.currentIcon
      state.current.feelsLike = payload.currentFeels
      state.current.windSpeed = payload.currentWindSpeed
      state.current.windDirection = payload.currentWindDirection
      state.current.uv = payload.currentUV
    },
    SET_ERROR(state, payload) {
      state.searchLocation.err = payload
    },
    TRAILS_LIST(state, payload) {
      state.trails = payload
    }
  },
  actions: {
    getGeoLocation({ commit, dispatch }, payload) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${payload}&key=${API_KEY}`

      axios
        .get(url)
        .then(res => {
          const data = {
            locationName: res.data.results[0].address_components[0].long_name,
            lat: res.data.results[0].geometry.location.lat,
            lng: res.data.results[0].geometry.location.lng
          }
          commit('SET_LOCATION', data)
          return data
        })
        .then(data => {
          dispatch('currentWeather', data)
          dispatch('forecastWeather', data)
          dispatch('trailsList', data)
        })
        .catch(err => {
          commit('SET_ERROR', err)
        })
    },
    forecastWeather({ commit }, payload) {
      axios
        .get('https://api.weatherbit.io/v2.0/forecast/daily', {
          params: {
            key: WEATHER_KEY,
            units: 'I',
            days: 5,
            lat: payload.lat,
            lon: payload.lng
          }
        })
        .then(res => {
          const weatherData = []
          res.data.data.map(weatherday => {
            weatherData.push({
              timestamp: weatherday.ts,
              maxTemp: weatherday.max_temp,
              minTemp: weatherday.min_temp,
              description: weatherday.weather.description,
              precipPercentage: weatherday.pop,
              icon: `https://weatherbit.io/static/img/icons/${
                weatherday.weather.icon
              }.png`,
              sunrise: weatherday.sunrise_ts,
              sunset: weatherday.sunset_ts
            })
            return weatherData
          })
          commit('FORCAST_WEATHER', weatherData)
        })
    },
    currentWeather({ commit }, payload) {
      axios
        .get('https://api.weatherbit.io/v2.0/current', {
          params: {
            key: WEATHER_KEY,
            units: 'I',
            days: 5,
            lat: payload.lat,
            lon: payload.lng
          }
        })
        .then(res => {
          const currentData = {
            currentTime: res.data.data[0].ts,
            currentTemp: res.data.data[0].temp,
            currentFeels: res.data.data[0].app_temp,
            currentPrecip: res.data.data[0].precip,
            currentHumidity: res.data.data[0].rh,
            currentWindSpeed: res.data.data[0].wind_spd,
            currentWindDirection: res.data.data[0].wind_cdir_full,
            currentUV: res.data.data[0].uv,
            currentDesc: res.data.data[0].weather.description,
            currentIcon: `https://weatherbit.io/static/img/icons/${
              res.data.data[0].weather.icon
            }.png`
          }
          commit('CURRENT_WEATHER', currentData)
        })
    },
    trailsList({ commit }, payload) {
      axios
        .get('https://www.hikingproject.com/data/get-trails', {
          params: {
            key: TRAIL_KEY,
            lat: payload.lat,
            lon: payload.lng,
            maxDistance: 10,
            maxResults: 50
          }
        })
        .then(res => {
          const trails = []
          res.data.trails.map(item => {
            trails.push({
              trailName: item.name,
              trailSummary: item.summary,
              trailLocation: item.location,
              trailLength: item.length,
              trailAscent: item.ascent,
              trailDescent: item.descent,
              trailHigh: item.high,
              trailLow: item.low,
              trailImg: item.imgMedium,
              trailInfo: item.url,
              trailId: item.id,
              location: {
                trailLongitude: item.longitude,
                trailLatitude: item.latitude
              }
            })
            return trails
          })
          commit('TRAILS_LIST', trails)
        })
    }
  }
})
