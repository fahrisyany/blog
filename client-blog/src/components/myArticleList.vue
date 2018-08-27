<template>
    

    <div class="myArticleList">
        <section class="articles" >
                <section class="hero is-info is-medium is-bold">
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br>sed eiusmod tempor incididunt ut labore et dolore magna aliqua</h1>
            </div>
        </div>
             </section>

          <div class="card article" v-for="(article,index) in listArticles"  :key="article._id">
                    <div class="card-content">
                           <button  @click="launch(),getArticle(index)" class="button is-primary">Edit Article</button>
                <a class="delete is-large" @click="deleteArticle(index)"></a>

                        <div class="media">
                          <img src="http://www.radfaces.com/images/avatars/angela-chase.jpg" class="author-image" alt="Placeholder image">
                        <div class="media-center">
                            </div>
                            <div class="media-content has-text-centered">
                                <p class="title article-title">{{article.articleTitle}}</p>
                                <p class="subtitle is-6 article-subtitle">
                                    <a href="#">@{{article.authorName}}</a>
                                </p>
                            </div>
                        </div>
                        <div class="content article-body" v-html="article.articleBody">
                       
                        </div>
                    </div>
                </div> 


                
  <div class="modal" v-bind:class="{'is-active':isActive}">
      <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <div class="content has-text-centered">
              <p class="control">
                     <form class="form-signin" @submit.prevent="updateArticle">

             <div class="card article">
                    <div class="card-content">
                        <div class="media">
                        <div class="media-center">
                            </div>
                            <div class="media-content has-text-centered">
                               <label class="label">Title</label>
                                <input class="input is-rounded" type="text" v-model="updateArticleTitle">

                                <p class="subtitle is-6 article-subtitle">
                                </p>
                            </div>
                        </div>
                        <wysiwyg class="text-area" v-model="updateArticleBody"/>

                 
                    </div>
                </div>       
                 <button class="button is-block is-info is-large is-fullwidth" type="submit">Submit</button>

                     </form>            
 
              <span>&nbsp;</span>
            </div>
          </div>
        </div>
        <button @click="close" class="modal-close"></button>
    </div>
        </section>
    </div>
</template>


<script>
import axios from "axios";
import swal from "sweetalert";

export default {
  data: function() {
    return {
      ownArticlet: null,
      listArticles: [],
      oneArticle: "",
      cursorType: "zoom-in",
      isActive: false,
      username: localStorage.username,

      updateArticleId: "",
      updateArticleTitle: "",
      updateArticleBody: ""
      // updateArticleTag: ""
    };
  },
  methods: {
    updateArticle: function() {
      axios({
        method: "PUT",
        url: `http://35.240.198.229/users/editArticle/${this.updateArticleId}`,
        data: {
          articleTitle: this.updateArticleTitle,
          articleBody: this.updateArticleBody
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.oneArticle = result;
          swal("Article Updated", " ", "success").then(() => {
            this.$router.push(`/account/${localStorage.username}`);
            this.isActive = false;
          });

          this.message = "success";
        })
        .catch(err => {
          console.log("gagal");

          this.message = err.message;
        });
    },
    getOwnArticle: function() {
      let token = localStorage.getItem("token");
      axios
        .get("http://35.240.198.229/users/showOwnArticle", {
          headers: {
            token
          }
        })
        .then(result => {
          this.listArticles = result.data.article;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getArticle: function(index) {
      let ChoosenArticleId = this.listArticles[index]._id;

      let token = localStorage.getItem("token");
      axios
        .get(`http://35.240.198.229/users/showOneArticle/${ChoosenArticleId}`, {
          headers: {
            token
          }
        })
        .then(result => {
          this.oneArticle = result.data.article;

          this.updateArticleId = this.oneArticle[0]._id;
          this.updateArticleTitle = this.oneArticle[0].articleTitle;
          this.updateArticleBody = this.oneArticle[0].articleBody;

          // console.log(this.oneArticle[index].articleTitle);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteArticle: function(index) {
      let ChoosenArticleId = this.listArticles[index]._id;
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Article!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.listArticles.splice(index, 1);
          swal("Poof! Your article file has been deleted!", {
            icon: "success"
          }).then(() => {
            axios({
              method: "DELETE",
              url: `http://35.240.198.229/users/deleteArticle/${ChoosenArticleId}`,

              headers: {
                token: localStorage.getItem("token")
              }
            });
          });
        } else {
          swal("Your article file is safe!");
        }
      });
    },
    launch: function() {
      this.isActive = true;
    },
    close: function() {
      this.isActive = false;
    }
  },

  watch: {
    listArticles: "getOwnArticle"
  },

  created() {
    this.getOwnArticle();
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
