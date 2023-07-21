<script setup lang="ts">
import SVGEditorGrid from '@/components/SVGEditorGrid.vue';
import {SHOW_GRID_DEFAULT} from '@/const'

interface Prop {
    showGrid: boolean
}

const prop = withDefaults( defineProps<Prop>(), {
    showGrid: SHOW_GRID_DEFAULT
})
</script>

<template>
    <div class="svg-editor__canvas">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <SVGEditorGrid v-if="prop.showGrid"></SVGEditorGrid>
        </svg>
    </div>
</template>

<style scoped>
.svg-editor__canvas{
    width: 800px;
    height: 600px;
    background-color: aliceblue;
}
</style>