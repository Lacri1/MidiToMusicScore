<!--HomePage.vue-->

<template>
  <div class="background">
  <DragDropBox />
  </div>
</template>

<script setup>
  // import MusicScoreViewer from '@/components/MusicScoreViewer.vue'
  import DragDropBox from "@/components/DragDropBox";

</script>

<style>
.background {
  height: auto;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0;
  background: linear-gradient(135deg, #E8F6EF, #D4ECDD);
}
</style>
