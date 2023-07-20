<template>
  <v-app>
    <div class="svg-editor__container">
      <SVGEditor></SVGEditor>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import SVGEditor from './components/SVGEditor.vue';
</script>

<style scoped>
.svg-editor__container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
