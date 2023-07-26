<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <!-- ログアウト処理をするためのリンク -->
        <a @click="logout()" v-if="$store.getters.loggedIn">Logout</a>
        <!-- ログインページに遷移するためのリンク -->
        <router-link
          :to="'/login?redirect=' + $route.fullPath"
          v-else-if="$route.path !== '/login'"
        >
          Login
        </router-link>
        <!-- 強制的にログインページに飛ばされた際に表示するメッセージ -->
        <div v-if="$route.query.message">ログイン認証が必要なページです。</div>
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    methods: {
      logout () {
        this.$store.commit('setUserId', '')
        if (this.$route.meta.requiresAuth) {
          this.$router.push({
            path: '/login',
            query: { redirect: this.$route.fulPath }
          })
        }
      }
    }
  }
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
