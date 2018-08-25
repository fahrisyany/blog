<template>
    <nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://github.com/fahrisyany">
     <h1 class="title">
Trafalgar      
</h1>
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item"  >
      <router-link to="/">Home</router-link> 
      </a>
      <a class="navbar-item" v-if="token" >
      <router-link :to='`/account/${username}`' >{{username}}'s Account</router-link>
      </a>
    </div>
   <div class="navbar-end">
						<div class="navbar-item" v-if="!token">
							<div class="field is-grouped">
								<p class="control">
									<a class="button is-small">
      <router-link :to="{name:'register'}">register</router-link>
									</a>
								</p>
								<p class="control" >
									<a class="button is-small is-info is-outlined">
						
      <router-link :to="{name:'login'}">Login</router-link>
									</a>
								</p>
							</div>
						</div>
            <div class="navbar-item" v-if="token">
							<div class="field is-grouped">
								<p class="control">
									<a class="button is-small">
      <router-link :to="{name:'createArticle'}" > Hey {{username}}!, Let's Get Started</router-link>
									</a>
								</p>
								<p class="control" >
									<a class="button is-small is-info is-outlined">
      <p @click="logout" >logout</p>
									</a>
								</p>
							</div>
						</div>
					</div>
  </div>

</nav>

</template>


<script>
import swal from "sweetalert";

export default {
  data() {
    return {
      token: localStorage.token,
      username: localStorage.username
    };
  },

  methods: {
    logout: function() {
      swal(`Bye2 see you soon ${localStorage.username} !`);

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");

      this.$router.push("/");
      this.token = undefined;
      this.username = undefined;
    }
  },
  created() {
    if (localStorage.token) {
      this.token = localStorage.getItem("token");
      this.username = localStorage.getItem("username");
    }
  }
};
</script>
