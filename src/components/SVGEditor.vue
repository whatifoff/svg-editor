<script setup lang="ts">
import SVGEditorNav from './SVGEditorNav.vue';
import SVGEditorCanvas from './SVGEditorCanvas.vue';
</script>

<template>
    <div class="svg-editor">
        <SVGEditorNav></SVGEditorNav>
        <SVGEditorCanvas></SVGEditorCanvas>
    </div>
</template>

<style scoped>
.svg-editor{
    width: 800px;
    border: 1px solid gray;
}
</style>
