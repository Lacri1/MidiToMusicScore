// MenuBar    - 최종 수정 : 23/04/02 18:47 김지용 -

<template>
  <v-app-bar color="#5F7EAF" elevation="4" rounded app>
    <v-app-bar-title>
      <router-link to="/">
        <v-icon icon="mdi-book-music"/> Midi To MusicScore
      </router-link>
    </v-app-bar-title>
    <v-spacer/>
    <span class="mr-2">
			Menu
		</span>
  </v-app-bar>
</template>

<script>
export default {
  name: "MenuBar"
}
</script>

<style lang="scss" scoped>
form{
  display: flex;
  flex-direction: row;
  align-items: center;
}
a{
  text-decoration: none; /* 링크의 밑줄 제거 */
  color: white; /* 링크의 색상 제거 */
}
</style>
