<template>
  <v-layout>
    <v-container v-if="$store.state.loading" class="main text-center">
      <div class="text-xs-center">
        <v-progress-circular
          :size="150"
          :width="8"
          indeterminate
          color="teal"
          class="mt-10"
        >
        </v-progress-circular>
      </div>
    </v-container>
    <v-container v-else-if="error !== ''">
      <v-alert border="bottom" colored-border type="error" elevation="2">
        {{ error }}
      </v-alert>
    </v-container>
    <v-container v-else>
      <v-alert v-if="$store.state.searchText !== ''" type="info">
        Résultats de la dernière recherche par mot-clé:
        {{ $store.state.searchText }}
      </v-alert>
      <v-alert
        v-if="$store.state.searchText === 'Batman'"
        border="bottom"
        colored-border
        type="warning"
        elevation="2"
      >
        Par défaut, l'application recherche "Batman"... Commencez à taper le
        film mot-clé et appuyez sur Entrée dans le champ de recherche ci-dessus
      </v-alert>
      <v-dialog
        v-model="showDetails"
        overlay-color="black"
        overlay-opacity="0.7"
        scrollable
      >
        <v-container>
          <v-card
            v-if="Object.keys($store.state.movie).length !== 0"
            dark
            raised
          >
            <v-row justify="space-between">
              <v-col xl="4" lg="4" md="4" sm="12" xs="12">
                <v-img :src="$store.state.movie.Poster" contain height="400">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                      height="150"
                      weight="150"
                    >
                      <v-icon size="120">mdi-image-filter</v-icon>
                    </v-row>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" xl="8" lg="8" md="8" sm="12" xs="12">
                <div class="justify-space-between">
                  <v-card-title
                    v-text="$store.state.movie.Title"
                    style="word-break: break-word"
                  ></v-card-title>
                  <span
                    v-for="(key, i) in Object.keys($store.state.movie)"
                    :key="i"
                  >
                    <div
                      v-if="
                        key !== 'Poster' &&
                        key !== 'Title' &&
                        key !== 'Response' &&
                        key !== 'Ratings'
                      "
                      class="ma-2"
                    >
                      <span class="font-italic font-weight-bold"
                        >{{ key }}:
                      </span>
                      {{ $store.state.movie[key] }}
                    </div>
                    <div
                      v-else-if="
                        key === 'Ratings' &&
                        $store.state.movie['Ratings'].length > 0
                      "
                      class="ma-2"
                    >
                      <span class="font-italic font-weight-bold"
                        >Ratings:
                      </span>
                      <span
                        v-for="(rate, j) in $store.state.movie['Ratings']"
                        :key="j"
                      >
                        <span class="font-italic">{{ rate.Source }}: </span>
                        {{ rate.Value }} |
                      </span>
                    </div>
                  </span>
                  <v-card-actions>
                    <v-btn @click="showDetails = false" color="teal">
                      Close
                    </v-btn>
                  </v-card-actions>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-dialog>
      <v-row>
        <v-col
          v-for="(movie, i) in $store.state.movies"
          :key="i"
          cols="12"
          xl="4"
          lg="4"
          md="6"
          sm="12"
          xs="12"
        >
          <v-card class="pa-6" dark raised>
            <div>
              <v-img
                :src="movie.Poster"
                aspect-ratio="1"
                contain
                max-height="300"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-icon size="120">mdi-image-filter</v-icon>
                  </v-row>
                </template>
              </v-img>
              <v-card-title
                v-text="movie.Title"
                style="word-break: break-word"
              ></v-card-title>
              <v-card-subtitle class="pb-0"
                >Type: {{ movie.Type }}<br />Year:
                {{ movie.Year }}</v-card-subtitle
              >
              <v-card-text class="text--primary mt-2">
                IMDB ID: {{ movie.imdbID }}
              </v-card-text>
              <v-card-actions>
                <v-btn @click.stop="searchingMovies(movie.imdbID)" color="teal">
                  Details
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination
          v-model="page"
          :length="$store.state.pageCount"
          color="teal"
          :total-visible="7"
        ></v-pagination>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'MoviePage',
  data() {
    return {
      showDetails: false,
      page: 1,
      error: '',
    }
  },

  watch: {
    page(newPage) {
      this.searchingMovies()
    },
  },

  created() {
    this.searchingMovies()
    this.$store.watch(
      (state) => state.searchText,
      (newValue, oldValue) => {
        this.searchingMovies()
        this.page = 1
      }
    )
  },

  methods: {
    searchingMovies(id) {
      if (this.$store.state.searchText !== '') {
        this.error = ''
        const imId = id || false
        try {
          this.$store.commit('LOADING', true)
          const route =
            'https://www.omdbapi.com/?' +
            (!imId
              ? 's=' + this.$store.state.searchText
              : 'i=' + imId + '&plot=full') +
            '&apikey=4f6a6d5f&page=' +
            this.page
          this.$axios
            .get(route)
            .then((res) => {
              if (res.data.Response === 'True') {
                if (!imId) {
                  this.$store.commit('SET_MOVIES', res.data.Search)
                  this.$store.commit(
                    'SET_PAGECOUNT',
                    Math.ceil(parseInt(res.data.totalResults, 10) / 10)
                  )
                } else {
                  this.$store.commit('SET_MOVIE', res.data)
                  this.showDetails = true
                }
              } else {
                this.error = res.data.Error
                this.$store.commit('SET_MOVIES', [])
                this.$store.commit('SET_MOVIE', {})
              }
            })
            .then(() => this.$store.commit('LOADING', false))
        } catch (err) {
          console.log(err)
          this.error = 'Error fetching page information'
        }
      }
    },
  },
}
</script>
