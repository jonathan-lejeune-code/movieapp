<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      color="red accent-4"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-spacer />
      <v-text-field
        v-if="$route.path !== '/'"
        v-model="search"
        single-line
        color="red accent-4"
        label="Cherche ton Film !! "
        class="mt-4 mr-4"
        type="text"
        placeholder="Search"
        @keyup.enter="$fetch"
        v-model.lazy="searchInput"
      ></v-text-field>
      <v-btn
        v-if="$route.path !== '/'"
        outlined
        color="red accent-4"
        v-show="searchInput !== ''"
        @click="clearSearch"
        class="button"
      >
        Search
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app color="red accent-4">
      <span>Film-App &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      search: '',
      clipped: false,
      drawer: false,
      fixed: false,
      movies: [],
      searchedMovies: [],
      searchInput: '',
      items: [
        {
          icon: 'mdi-movie-open',
          title: 'Accueil ',
          to: '/',
        },
        {
          icon: 'mdi-movie-search',
          title: 'Recherche-Film',
          to: '/movies',
        },
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Movie-App',
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
        `https://api.themoviedb.org/3/movie/now_playing?api_key=7b88edb80dadf740ad49dc51bc2b8c24&language=fr-FR&page=1&query=${this.searchInput}`
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
