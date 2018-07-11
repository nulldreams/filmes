<template>
    <div class="filme">
        <!-- <h1>{{ $store.state.filmeAtual.nome }}</h1> -->
        <!-- <div class="filme" v-if="filme">
            <video v-for="(player, index) in filme.players" :key="index"  width="320" height="240" controls>
                <source :src="player" type="video/mp4">
            </video>            
        </div> -->
        <div class="header"></div>

        <div class="container informacoes">
          <h1 class="nome font-bold min-spacer">{{filme.nome}}</h1>
          <p class="sinopse font-light min-spacer">{{filme.sinopse}}</p>
        </div>

        <div class="container cover">
          <div class="imagem filter">
            <img class="img-fluid rounded" :src="filme.cover" alt="">
          </div>
          <div class="info">
            <p class="font-regular">Ano: {{filme.ano}}</p>
            <p class="font-regular">Qualidade: {{filme.qualidade}}</p>
          </div>
        </div>

        <div class="container players">
          <h1 class="font-bold min-spacer">Opções</h1>
          <iframe class="player min-spacer" v-if="filme.players.length > 0" v-for="(player, index) in filme.players" :key="index" :src="player" width="100%" height="375"
          frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>

    </div>
</template>
<style>
.filme {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.filme .header {
  height: 10vh;
}
.filme .informacoes .nome {
  font-size: 28px;
}
.filme .cover {
  display: flex;
  flex-direction: column;
}
.filme .cover .info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 10px;
}
.filme .players {
  margin-top: 100px;
}
.filme .players h1 {
  font-size: 28px;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "filmes",
  head() {
    return {
      title: this.filme.nome,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.filme.sinopse
        },
        {
          hid: `keywords`,
          name: 'keywords',
          keywords: this.filme.nome
        },
        {
          hid: `og:title`,
          property: 'og:title',
          content: this.filme.nome
        },
        {
          hid: `og:url`,
          property: 'og:url',
          content: 'https://filmesonline.netlify.com' + this.$route.fullPath
        },
        {
          hid: `og:image`,
          property: 'og:image',
          content: this.filme.cover
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: this.filme.sinopse
        }
      ]
    };
  },
  data() {
    return {
      filme: { players: [] }
    };
  },
  created() {
    if (this.$store.state.filmeAtual.nome) {
      this.$http.post("https://scrap-movies.herokuapp.com/filme", this.$store.state.filmeAtual).then(
        response => {
          this.filme = response.body;
        },
        response => {
          console.log(response);
        })
    } else {
    this.$http.get(`https://scrap-movies.herokuapp.com/?s=${this.$route.fullPath.replace(/\//g, '').replace(/-/g, ' ').replace('filmes', '')}`).then(
      response => {
        this.filme = response.body[0]

        this.$http
          .post("https://scrap-movies.herokuapp.com/filme", this.filme)
          .then(
            response => {
              this.filme = response.body
            },
            response => {
              console.log(response);
            }
          );
      },
      response => {
        console.log(response);
      })
    }
  },
  methods: {
    verFilme: function(store) {
      this.$http
        .post("https://scrap-movies.herokuapp.com//filme", store.state.filmeAtual)
        .then(
          response => {
            this.filme = response.body
          },
          response => {
            console.log(response);
          }
        );
    }
  }
};
</script>

