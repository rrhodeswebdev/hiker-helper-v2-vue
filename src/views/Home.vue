<template>
  <div class='d-flex justify-content-center align-items-center bg-img'>
    <SearchForm />
  </div>
</template>

<script>
import SearchForm from '../components/SearchForm.vue'

export default {
  name: 'Home',
  components: {
    SearchForm
  }
}
</script>

<style scoped>
.bg-img {
  background-image: url('../assets/main-bg-photo.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
</style>
