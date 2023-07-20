<script setup lang="ts">
import SVGEditor from './components/SVGEditor.vue';
</script>

<template>
  <div class="container">
    <SVGEditor></SVGEditor>
  </div>
</template>

<style scoped>
.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
