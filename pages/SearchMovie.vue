<template>
  <div class="home">
    <!-- Search -->
    <div class="container search">
      <input
        type="text"
        placeholder="Recherche"
        class="white--text"
        @keyup.enter="$fetch"
        v-model.lazy="searchInput"
      />
      <v-btn v-show="searchInput !== ''" @click="clearSearch" class="button">
        Clear Search
      </v-btn>
    </div>

    <h2>Recherche un Film</h2>

    <!-- Loading Animation -->
    <Loading v-if="$fetchState.pending" />

    <!-- Movies -->
    <div v-else class="container movies">
      <!-- Search Results -->
      <div id="movie-grid" v-if="searchInput !== ''" class="movies-grid">
        <div
          class="movie"
          v-for="(movie, index) in searchedMovies"
          :key="index"
        >
          <div class="movie-img">
            <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              alt=""
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="news">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Date de Sortie:
              {{
                new Date(movie.release_date).toLocaleString('fr-FR', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{ name: 'movies-movieid', params: { id: movie.id } }"
            >
              Obtenir plus d'informations
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SearchMPage',
  head() {
    return {
      title: 'Movie App - Latest Streaming Movie Info',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get all the latest streaming movies in theaters & online',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'movies, stream, stremaing',
        },
      ],
    }
  },
  data() {
    return {
      movies: [],
      searchedMovies: [],
      searchInput: '',
    }
  },
  async fetch() {
    if (this.searchInput === '') {
      await this.getMovies()
      return
    }
    if (this.searchInput !== '') {
      await this.searchMovies()
    }
  },
  fetchDelay: 1000,
  methods: {
    async searchMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=7b88edb80dadf740ad49dc51bc2b8c24&language=fr-FR&query=${this.searchInput}`
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

<style lang="scss">
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    border-radius: 35px;
    box-shadow: -10px 10px 13px -7px red, 10px 10px 13px -7px red;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 40px;
      border: none;
      &:focus {
        outline: none;
      }
    }

    .button {
      font-size: 14px;
      background-color: transparent;
      color: white;
      padding: 0px;
    }
  }
}
</style>
