<template>
  <div class="home">
    <h2>Actualités</h2>

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
              alt="Affiche du film"
            />
            <p class="review">{{ movie.vote_average }}</p>
            <p class="overview">{{ movie.overview }}</p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25)
              }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Released:
              {{
                new Date(movie.release_date).toLocaleString('en-us', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{ name: 'movies-id', params: { id: movie.id } }"
            >
              obtenir plus d'informations
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Now Streaming  -->
      <div id="movie-grid" v-else class="movies-grid">
        <div class="movie" v-for="(movie, index) in movies" :key="index">
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
              obtenir plus d'informations
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
  name: 'ActuIndex',
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
    async getMovies() {
      const data = axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=7b88edb80dadf740ad49dc51bc2b8c24&language=fr-FR&page=1`
      )
      const result = await data
      result.data.results.forEach((movie) => {
        this.movies.push(movie)
      })
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
h2 {
  text-align: center;
  margin: 10px;
  font-size: 60px;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px red,
    0 0 30px red, 2px 2px 2px rgba(238, 0, 0, 0);
}

.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: -12px -10px 13px -1px red, 12px -10px 13px -7px red;

        .movie-img {
          position: relative;
          overflow: hidden;
          height: 600px;

          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 2;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 2, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .news {
          margin-top: auto;
          box-shadow: -10px 10px 13px -7px red, 10px 10px 13px -7px red;

          background-color: rgba(0, 0, 0, 0.06);
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #fff;
          }
          .button {
            margin-top: 8px;
            text-decoration: none;
            color: red;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
© 2022 GitHub, Inc. Terms Privacy Security Status Docs Contact GitHub Pricing
API Training Blog About Loading complete
