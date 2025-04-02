<!--App.vue-->

<template>
  <v-app>
    <menuBar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
 import menuBar from "./components/MenuBar"
 export default {
   name: 'App',
   components: { menuBar },
 }
</script>

<style lang="scss" scoped>
.v-main{
  background-color: #E2C3C7; /* 링크의 색상 제거 */
}
</style>
