export const strict = false
export const state = () => {
  return {
    movies: [],
    movie: {},
    loading: false,
    page: 1,
    searchText: 'Batman',
    error: '',
    pageCount: 1
  }
}

export const mutations = {
  SET_MOVIES(state, movies) {
    state.movies = movies || []
  },
  SET_MOVIE(state, movie) {
    state.movie = movie || {}
  },
  SET_PAGECOUNT(state, pageCount) {
    state.pageCount = pageCount || 1
  },
  LOADING(state, loading) {
    state.loading = loading || false
  },
  SET_PAGE(state, page) {
    state.page = page || 1
  },
  UPDATE_SEARCH(state, searchText) {
    state.searchText = searchText || 'Batman'
  },
  ERROR_CATCH(state, error) {
    state.error = error || ''
  }
}
