<template>
  <section class="principal">
    <vue-loader v-if="loading" direction="bottom-right" image="http://www.wellnessexpome.com/wp-content/uploads/2018/06/pre-loader.gif" :text="`Procurando o filme ${pesquisa}`" text-color="#786fa6" />

    <div class="header">
      <h1 class="font-bold min-spacer">Filmes Online</h1>
      <div class="container search">

        <div class="left">
          <input class="font-regular" type="text" name="" id="" v-model="pesquisa" placeholder="Digite o nome">
        </div>

        <div class="right bg-gradient" @click="pesquisar()">
          <i data-feather="search"></i>
        </div>

      </div>
    </div>

    <div class="container">
      <filmes :pesquisa="filmesPesquisa" />
    </div>

  </section>
</template>

<script>
import vueLoader from '~/node_modules/@nulldreams/vue-loading/src/vue-loading'
import Filmes from '~/components/filmes'

export default {
  head() {
    return {
      title: 'Filmes Online',
      meta: [
        {
          hid: "description",
          name: "description",
          content: 'Filmes Online grátis'
        }
      ]
    };
  },
  data () {
    return {
      pesquisa: '',
      loading: false,
      filmesPesquisa: []
    }
  },
  components: {
    Filmes,
    vueLoader
  },
  created() {
    if (process.browser) {
      $(function () {
        feather.replace()
      })
    }
  },
  methods: {
    pesquisar: function () {
      this.loading = true

      this.$http.get(`https://scrap-movies.herokuapp.com/?s=${this.pesquisa}`).then(
        response => {
        this.loading = false
          this.filmesPesquisa = response.body
        },
        response => {
          console.log(response);
        }
      )
    }
  }
}
</script>

<style>
.principal .header {
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.principal .header .search {
  width: 100%;
  height: 80px;

  display: flex;
  flex-direction: row;
}
.principal .header .search .left {
  width: 90%;
  border-top-left-radius: .50em;
  border-bottom-left-radius: .50em;
  border: none;
  box-shadow: 0 0 30px rgba(115,128,157, .2);
}
.principal .header .search .left input {
  width: 100%;
  height: 100%;
  border-top-left-radius: .50em;
  border-bottom-left-radius: .50em;
  border: none;
  outline: none;
  padding: 20px;
}
.principal .header .search .right {
  width: 10%;
  /* background: #777; */
  border-top-right-radius: .50em;
  border-bottom-right-radius: .50em;
  border: none;
  box-shadow: 0 0 30px rgba(115,128,157,.1);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
}
.feather {
  stroke: #fff;
  width: 30px;
  height: 30px;
}
.container-box .message p {
  font-size: 21px !important;
}
.container-box .message {
  margin-top: 21px;
}
</style>
