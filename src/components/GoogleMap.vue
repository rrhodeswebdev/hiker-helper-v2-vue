<template>
  <div class='d-flex justify-content-start mt-4 w-100'>
    <GmapMap
      :center='{lat: +this.$props.locationData.lat, lng: +this.$props.locationData.lng}'
      :zoom='10'
      class='map-size'
    >
      <GmapMarker
        v-for="(mark, index) in markers"
        :key='index'
        :position='{lat: mark.location.trailLatitude, lng: mark.location.trailLongitude}'
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
  props: ['locationData', 'markers']
}
</script>

<style scoped>
.map-size {
  width: 95vw;
  height: 50vh;
}
</style>
