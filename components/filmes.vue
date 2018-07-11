<template>
    <section class="filmes">
      <vue-loader v-if="loading" direction="bottom-right" image="http://www.wellnessexpome.com/wp-content/uploads/2018/06/pre-loader.gif" text="Carregando filmes" text-color="#786fa6" />
      <div class="cards">

        <div v-if="pesquisa.length === 0" v-for="(filme, index) in filmes" :key="index" class="card">
            <a @click="verFilme(filme)"><img :src="filme.imagem" alt="" class="img-fluid rounded"></a>
        </div>

        <div v-if="pesquisa.length > 0"  v-for="(filme, index) in pesquisa" :key="index" class="card">
            <a @click="verFilme(filme)"><img :src="filme.imagem" alt="" class="img-fluid rounded"></a>
        </div>

        <div v-if="pesquisa.length === 0" class="min-spacer">
          <a @click="maisFilmes()" class="btn bg-gradient text-white padding-20">Mais Filmes</a>
        </div>
      </div>
    </section>
</template>

<style>
.filmes {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;
    /* height: 100vh; */
}
.filmes .cards {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    max-width: 100%;
}
.filmes .cards > .card {
    /* background: tomato; */
    width: 120px;
    height: 180px;

    border: none;
    border-radius: .50em;
    margin: 10px;

    cursor: pointer;
}
</style>


<script>
import vueLoader from '~/node_modules/@nulldreams/vue-loading/src/vue-loading'

export default {
  props: {
    pesquisa: Array
  },
  components: {
    vueLoader
  },
  data() {
    return {
      filmes: [],
      pagina: 1,
      loading: false
    };
  },
  created() {
    this.$http.get(`https://scrap-movies.herokuapp.com/filmes/${this.pagina}/0`).then(
      response => {
        this.filmes = response.body;
        this.pagina++
      },
      response => {
        console.log(response);
      }
    )
  },
  methods: {
    verFilme: function (filme) {
        this.$store.commit('atualizarFilme', (filme))
        $nuxt.$router.push('/filmes/' + filme.url.replace('http://megafilmesahd.com/', ''))
    },
    maisFilmes: function (pagina) {
      this.loading = true

      this.$http.get(`https://scrap-movies.herokuapp.com/filmes/${this.pagina}/0`).then(
        response => {
          this.loading = false
          this.filmes = this.filmes.concat(response.body)
          this.pagina++
        },
        response => {
          console.log(response);
        }
      )
    }
  }
};
</script>