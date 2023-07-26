<template>
  <div class="about">
    <h1>This is an login page</h1>
    <input v-model="userId" />
    <button @click="login()" :disabled="!userId">ログイン</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: ''
      }
    },
    methods: {
      login () {
        // 入力したユーザIDでストアを更新
        this.$store.commit('setUserId', this.userId)
        // 元にいたページにリダイレクトさせる
        this.$router.push(this.$route.query.redirect)
      }
    }
  }
</script>