<template>
  <div class="home">
   
          <Hero></Hero>
         <router-view/>
          <!-- <Tile></Tile> -->

  </div>
</template>

<script>
// import Tile from "@/components/Tile.vue";

// import Navbar from "@/components/Navbar.vue";

// @ is an alias to /src
import Hero from "@/components/Hero.vue";
// import Tile from "@/components/Tile.vue";

export default {
  data: function() {
    return {
      token: localStorage.token,
      username: localStorage.username
    };
  },

  components: {
    Hero
  },

  watch: {
    // token
  },

  created() {
    this.token = localStorage.getItem("token");
    this.username = localStorage.getItem("username");
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
