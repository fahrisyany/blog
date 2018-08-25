<template>
  <div class="login">
    <LoginForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "login",
  components: {
    LoginForm
  }
};
</script>

<style scoped>
.login {
  /* text-align: center; */
  /* margin-top: 10em; */
  /* display: flex; */
  /* justify-content: center; */
}


</style>
