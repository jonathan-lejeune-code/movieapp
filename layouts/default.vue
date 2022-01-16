<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
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
        @keyup.enter="searchMovie"
        single-line
        color="teal"
        label="Cherche ton Film !! "
        class="mt-4 mr-4"
      ></v-text-field>
      <v-btn
        v-if="$route.path !== '/'"
        @click="searchMovie"
        outlined
        color="teal"
      >
        Search
      </v-btn>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>Film-App &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Accueil ',
          to: '/'
        },
        {
          icon: 'mdi-library-movie',
          title: 'Recherche-Film',
          to: '/movies'
        }
      ],
      miniVariant: false,
      right: false,
      rightDrawer: false,
      title: 'Film-App'
    }
  },

  methods: {
    searchMovie() {
      this.$store.commit('UPDATE_SEARCH', this.search)
    }
  }
}
</script>
