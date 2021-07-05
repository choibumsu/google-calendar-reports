<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
    </div>

    <div>
      <button id="authorize_button" @click="handleAuthClick">Authorize</button>
      <button id="signout_button" @click="handleSignoutClick">Sign Out</button>
      <pre id="content" style="white-space: pre-wrap"></pre>
    </div>

    <router-view> </router-view>
  </div>
</template>

<script>
import {
  handleClientLoad,
  handleAuthClick,
  handleSignoutClick,
} from '@/utils/google-calendar'

export default {
  mounted() {
    console.log(window.gapi)
    handleClientLoad()
  },
  methods: {
    handleAuthClick() {
      handleAuthClick()
    },
    handleSignoutClick() {
      handleSignoutClick()
    },
  },
}
</script>

<style lang="scss">
#app {
}
</style>
