<template>
  <div id="app">
    <Navbar></Navbar>

        <router-view/>

  </div>
</template>
<script>
// import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  
  components: {
    Navbar
  }
};
</script>





<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.title {
  font-size: 30px;
}
</style>
