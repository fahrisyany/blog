<template>
  <div class="Tiles" v-if="listArticles" >
    
                <div class="column is-one-third" v-for="(article) in listArticles"  :key="article._id">
                    <div class="card large">
                        <!-- <div class="card-image">
                            <figure class="image">
                                <img src="https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?dpr=1&auto=compress,format&fit=crop&w=1920&h=&q=80&cs=tinysrgb&crop=" alt="Image">
                            </figure>
                        </div> -->


                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-96x96" >
                                        <img src="https://i.imgsafe.org/a4/a4bb9acc5e.jpeg" alt="Image" style="border-radius:50%;">
                                    </figure>
                                </div>
                                <div class="media-content">
                                     <h2 class="subtitle">
                                    Author: {{article.authorName}}
                                    </h2>
                                  <h3 class="subtitle is-6">Title: {{article.articleTitle}}</h3>
                                </div>
                            </div>
                            <div class="content" v-html="article.articleBody">
                            </div>
                            <a class="button is-small"> {{article.articleTag}}</a>
                            <a class="button is-small">Nature</a>
                            <br>
                            <br>
                           <router-link :to='`/${article.articleId}`'>ReadMore</router-link>
                        </div>

                    </div>
                </div>
                              <router-view></router-view>
            </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      listArticles: [],
      cursorType: "zoom-in"
    };
  },
  methods: {
    getAllItem: function() {
      axios.get("http://35.240.198.229/users/showArticle").then(result => {
        //   console.log(result);

        result.data.article.forEach(newArticle => {
          this.listArticles.push({
            articleId: newArticle._id,
            authorName: newArticle.authorName,
            articleTitle: newArticle.articleTitle,
            articleBody: newArticle.articleBody,
            articleTag: newArticle.articleTag
          });
        });
      });
    }
  },
  created() {
    this.getAllItem();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.column {
  max-width: 400px;
  min-width: 300px;
}

.content {
  height: 200px;
  overflow: hidden;
}
.Tiles {
  /* border: red solid 2px; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.media-content {
  margin-left: 2em;
}
h1 {
  padding-bottom: 60px;
}
</style>
