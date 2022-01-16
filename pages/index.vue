<template>
  <div class="home">
    <Hero />
    <Actu />
  </div>
</template>

<script>
import Hero from '../components/Hero'
import Actu from '../components/Actu.vue'

export default {
  name: 'IndexPage',
  components: {
    Hero,
    Actu,
  },
}
</script>
