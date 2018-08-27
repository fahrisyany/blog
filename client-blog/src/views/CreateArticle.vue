<template>
<div class="create-article">
    <!-- <Navbar></Navbar> -->

        <form class="form-signin" @submit.prevent="createArticle">

  <div class="control">
  <label class="label">Title</label>
<input class="input is-rounded" type="text" v-model="articleTitle" placeholder="Title">
  </div>
<br>
<br>

  <div class="control">
<label class="label">Tag</label>
<input class="input is-rounded" type="text" v-model="articleTag"  placeholder="Tag">
  </div>
<br>
<br>

<div class="field">
  <label class="label">Body</label>
<wysiwyg class="text-area" v-model="myHTML"/>
</div>
 <button class="button is-block is-info is-large is-fullwidth" type="submit">Submit</button>

 </form>


</div>

</template>

<script>
import axios from "axios";
// import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    // Navbar
  },
  data: function() {
    return {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      message: "",
      articleTitle: "",
      articleTag: "",
      myHTML: ""
    };
  },

  methods: {
    createArticle: function() {
      axios({
        method: "POST",
        url: "http://35.240.198.229/users/createArticle",
        data: {
          authorName: localStorage.username,
          articleTitle: this.articleTitle,
          articleTag: this.articleTag,
          articleBody: this.myHTML
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          token: localStorage.getItem("token")
        }
      })
        .then(() => {
          swal({
            title: "Good job!",
            text: "Article Created!",
            icon: "success",
            button: "back to Home!"
          }).then(() => {
            this.$router.push("/");
          });
          this.message = "success";
        })
        .catch(err => {
          swal("Ooops", "All input must be filled buddy!", "error");

          this.message = err.message;
        });
    }
  },

  created() {
    this.token = localStorage.getItem("token");
    this.username = null;
  }
};
</script>


<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.create-article {
  /* text-align: center; */
}
.control {
  /* max-width: 15em; */
  /* min-width: 15em; */
}

.text-area {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  width: 100%;
}
</style>

