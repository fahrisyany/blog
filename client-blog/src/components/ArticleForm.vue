<template>
<div class="articleForm">
               <div class="card article" v-for="(article) in oneArticle" :key="article._id">
                    <div class="card-content">
                      <router-link to="/"><button class="button is-primary">Close</button></router-link>
                        <div class="media">
                        <div class="media-center">
                            </div>
                            <div class="media-content has-text-centered">
                                <p class="title article-title">{{article.articleTitle}}</p>
                                <p class="subtitle is-6 article-subtitle">
                                </p>
                            </div>
                        </div>
                        <div class="content article-body" v-html="article.articleBody">

                        </div>
  <article class="media" v-for="(comment,index) in articleComments" :key="comment._id">
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{comment.userName}}</strong>
        <br>
          {{comment.commentBody}}        
        <br>
        <a class="button is-danger is-small" v-if="comment.userId==id" @click="deleteComment(index)">Delete</a>
      </p>
    </div>
  </div>
</article>
<article class="media" >
  <figure class="media-left">
    <p class="image is-64x64">
      <img src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content"  >
    <form @submit.prevent="createComment">
    <div class="field">
      <p class="control">
        <textarea class="textarea" placeholder="Add a comment..." v-model="commentBody"></textarea>
      </p>
    </div>
    <div class="field" >
      <p class="control">
        <button class="button" type="submit">Post comment</button>
      </p>
    </div>

    </form>
  </div>
</article>
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
      id: localStorage.getItem("id"),
      articleId: this.$route.params.articleId,
      oneArticle: "",
      articleComments: "",
      commentBody: "",
      myComment: false
    };
  },
  methods: {
    getArticle: function() {
      // let ChoosenCommentId = this.listArticles[index]._id;
      let token = localStorage.getItem("token");
      axios
        .get(`http://35.240.198.229/users/showOneArticle/${this.articleId}`, {
          headers: {
            token
          }
        })
        .then(result => {
          this.oneArticle = result.data.article;
        })
        .catch(err => {
          if (err.message) {
            this.$router.push("/");

            console.log(err.message);
          }
        });
    },

    createComment: function() {
      axios({
        method: "POST",
        url: `http://35.240.198.229/users/createComment/${this.articleId}`,
        data: {
          userName: localStorage.username,
          commentBody: this.commentBody
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          token: localStorage.getItem("token")
        }
      })
        .then(response => {
          let data = response.data.comment;
          this.articleComments.push(data);
          this.commentBody=""
        })
        .catch(err => {
          this.message = err.message;
        });
    },

    getComments: function() {
      axios
        .get(`http://35.240.198.229/users/getComment/${this.articleId}`, {})
        .then(result => {
          this.articleComments = result.data.article;
          console.log(`===>`, this.articleComments);
        })
        .catch(err => {
          this.message = err.message;

          console.log(err.message);
        });
    },
    deleteComment: function(index) {
      let ChoosenCommentId = this.articleComments[index]._id;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your comment!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.articleComments.splice(index, 1);
          swal("Poof! Your comment has been deleted!, be mindfull next time!", {
            icon: "success"
          }).then(() => {
            axios({
              method: "DELETE",
              url: `http://35.240.198.229/users/deleteComment/${ChoosenCommentId}`,

              headers: {
                token: localStorage.getItem("token")
              }
            });
          });
        } else {
          swal("Your comment  is safe!");
        }
      });
    }
  },
  // com

  mounted() {
    this.getComments(this.articleId);
    this.getArticle(this.articleId);
  }
};
</script>

<style scoped>
.notification {
  font-size: 16px;
  margin-top: 60px;
}
</style>
