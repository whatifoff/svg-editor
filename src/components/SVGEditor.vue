<script setup lang="ts">
import {ref} from 'vue'
import SVGEditorNav from './SVGEditorNav.vue';
import SVGEditorCanvas from './SVGEditorCanvas.vue';
import {
    SHOW_GRID_DEFAULT,
    EVENT_NAME_FOR_NAV_BUTTON_GRID
} from '@/const'

const showGrid = ref(SHOW_GRID_DEFAULT)

const handleNavStateButtons = (stateButtons: Array<string>) => {
    console.log('===>', stateButtons)
    showGrid.value = stateButtons.includes(EVENT_NAME_FOR_NAV_BUTTON_GRID) ? true : false
}
</script>

<template>
    <div class="svg-editor">
        <SVGEditorNav 
            @nav-state-buttons="handleNavStateButtons"
        ></SVGEditorNav>

        <SVGEditorCanvas
            :showGrid="showGrid"
        ></SVGEditorCanvas>
    </div>
</template>

<style scoped>
.svg-editor{
    width: 800px;
}
</style>
