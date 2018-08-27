<template>
  <div class="register-form">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Register</h3>
                    <div class="box">

        <form class="form-signin" @submit.prevent="register">
                               <div class="field">
                                <div class="control">
                                    <input class="input is-large" v-model="username" type="text" placeholder="Your Username" autofocus="">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="email" v-model="email" placeholder="Your Email" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="password"  v-model="password" placeholder="Your Password">
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                     </label>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth" type="submit">Register</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="../">Login</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                    </p>
                </div>
            </div>
        </div>
  </div>

  
</template>

<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data: function() {
    return {
      message: "",
      email: "",
      password: "",
      username: ""
    };
  },

  methods: {
    register: function() {
      axios({
        method: "POST",
        url: "http://35.240.198.229/register",
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(() => {
          swal("Registration Success", "But Wait!!", "success").then(() => {
            swal(`please loggin first just to make sure `);

            this.$router.push({ name: "login" });
          });
        })
        .catch(err => {
          swal("Ooops", "username/password is invalid please try another", "error");

          this.message = err.message;
        });
    }
  },
  created() {
    if (localStorage.token) {
      this.$router.go("/");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  padding-bottom: 20px;
}
</style>
