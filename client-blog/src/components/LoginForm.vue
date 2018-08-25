<template>
  <div class="login-form">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to proceed.</p>
                    <div class="box">

        <form class="form-signin" @submit.prevent="login">
                        {{ message }}

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="email" v-model="email" placeholder="Your Email" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="password" v-model="password" placeholder="Your Password">
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                  <input type="checkbox">
                  Remember me
                </label>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth" type="submit">Login</button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <a href="/register">Sign Up</a>&nbsp;·&nbsp;
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
      token: localStorage.token,
      username: localStorage.username,
      message: "",
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      axios({
        method: "POST",
        url: "http://localhost:3000/login",
        data: {
          email: this.email,
          password: this.password
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then(response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("id", response.data.id);
          swal("Loggin", "Successs", "success").then(() => {
            swal(
              `Wellcome ${
                localStorage.username
              } feel free to write whatever you want!`
            );
            this.$router.push("/");
          });

          // window.location = "http://localhost:8080";
        })
        .catch(err => {
          swal("Ooops", "wrong username or password", "error");

          if (err.message == "Request failed with status code 400") {
            this.message = "wrong username or password";
          }
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
