<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="$store.state.pageCount"
      color="red"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchPage',
  data() {
    return {
      showDetails: false,
      page: 1,
      error: '',
    }
  },

  methods: {
    async getMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=7b88edb80dadf740ad49dc51bc2b8c24&language=fr-FR&page=1`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
    },
    async searchMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7b88edb80dadf740ad49dc51bc2b8c24&language=fr-FR&page=1&query=${this.searchInput}`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.searchedMovies.push(movie)
      })
    },
    clearSearch() {
      this.searchInput = ''
      this.searchedMovies = []
    },
  },
  watch: {
    searchInput() {
      console.log(this.searchInput)
    },
  },
}
</script>
