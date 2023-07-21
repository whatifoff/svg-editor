<script setup lang="ts">
import {ref} from 'vue'
import SVGEditorNav from './SVGEditorNav.vue';
import SVGEditorCanvas from './SVGEditorCanvas.vue';
import {
    SHOW_GRID_DEFAULT,
    MAGNET_DEFAULT,
    EVENT_NAME_FOR_NAV_BUTTON_GRID,
    EVENT_NAME_FOR_NAV_BUTTON_MAGNET,
    EVENT_NAME_FOR_NAV_BUTTON_CURSOR
} from '@/const'
import type {
    DrawElementType
} from '@/types'

const showGrid = ref(SHOW_GRID_DEFAULT)
const magnet = ref(MAGNET_DEFAULT)
const activeDrawButton = ref<DrawElementType>(EVENT_NAME_FOR_NAV_BUTTON_CURSOR)

const handleNavStateButtons = (stateButtons: Array<string>) => {
    showGrid.value = stateButtons.includes(EVENT_NAME_FOR_NAV_BUTTON_GRID) ? true : false
    magnet.value = stateButtons.includes(EVENT_NAME_FOR_NAV_BUTTON_MAGNET) ? true : false
}

const handleNavDrawButton = (drawButton: DrawElementType) => {
    activeDrawButton.value = drawButton
}
</script>

<template>
    <div class="svg-editor">
        <SVGEditorNav 
            @nav-state-buttons="handleNavStateButtons"
            @nav-draw-button="handleNavDrawButton"
        ></SVGEditorNav>

        <SVGEditorCanvas
            :draw-element="activeDrawButton"
            :magnet="magnet"
            :showGrid="showGrid"
        ></SVGEditorCanvas>
    </div>
</template>

<style scoped>
.svg-editor{
    width: 800px;
}
</style>
