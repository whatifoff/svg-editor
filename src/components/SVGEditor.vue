<script setup lang="ts">
import { ref } from 'vue'
import SVGEditorNav from './SVGEditorNav.vue'
import SVGEditorCanvas from './SVGEditorCanvas.vue'
import {
    SHOW_GRID_DEFAULT,
    MAGNET_DEFAULT,
    ENTITY_GRID_NAME,
    ENTITY_MAGNET_NAME,
    ENTITY_CURSOR_NAME,
    ENTITY_LINE_NAME,
    ENTITY_CIRCLE_NAME,
    ENTITY_RECT_NAME
} from '@/const'
import { type DrawElement, type SelectedObject } from '@/types'
import { type DrawElementType } from '@/types/draw'
import { Line } from '@/types/line'
import { Circle } from '@/types/circle'
import { Rect } from '@/types/rect'
import { getMagnetCoord } from '../helpers'

const showGrid = ref(SHOW_GRID_DEFAULT)
const magnet = ref(MAGNET_DEFAULT)

const activeDrawButton = ref<DrawElementType>(ENTITY_CURSOR_NAME)
// сам текущий рисуемый элемент
let activeDrawElement: DrawElement = null
const drawElements = ref<Array<DrawElement>>([])

/**
 * Поскольку при выделении элемента отрабатывает
 * так же и клик, вводится данная переменная, чтобы
 * различать события
 */
let selectElementEvent = false

const handleNavStateButtons = (stateButtons: Array<string>) => {
    showGrid.value = stateButtons.includes(ENTITY_GRID_NAME) ? true : false
    magnet.value = stateButtons.includes(ENTITY_MAGNET_NAME) ? true : false
}

const handleNavDrawButton = (drawButton: DrawElementType) => {
    activeDrawButton.value = drawButton

    if (activeDrawElement) {
        drawElements.value = drawElements.value.filter((el) => el?.id !== activeDrawElement?.id)
    }

    activeDrawElement = null
}

const getDrawElementByActiveDrawButton = (activeDrawButton: DrawElementType, x: number, y: number): DrawElement => {
    switch (activeDrawButton) {
        case ENTITY_LINE_NAME:
            return new Line(x, y)
        case ENTITY_CIRCLE_NAME:
            return new Circle(x, y)
        case ENTITY_RECT_NAME:
            return new Rect(x, y)
    }

    return null
}


const createElement = (e: MouseEvent): DrawElement => {
    let drawElement = null

    const { x, y } = getMagnetCoord(e.offsetX, e.offsetY, magnet.value)

    drawElement = getDrawElementByActiveDrawButton(activeDrawButton.value, x, y)

    return drawElement
}

const resetSelectedElements = () => {
    drawElements.value = drawElements.value.map((el) => {
        if (!el) return null

        el.selected = false
        return el
    })
}


const mouseMove = (e: MouseEvent, activeDrawElement: DrawElement) => {
    const currentElement = drawElements.value.find((el) => el?.id === activeDrawElement?.id)

    if (!currentElement) return

    currentElement.move(e.offsetX, e.offsetY, magnet.value)
}

const handleCanvasClick = (e: MouseEvent) => {
    if (selectElementEvent) {
        selectElementEvent = false
        return
    }

    if (!activeDrawElement) {
        resetSelectedElements()
        activeDrawElement = createElement(e)

        if (!activeDrawElement) return

        drawElements.value.push(activeDrawElement)
    } else {
        mouseMove(e, activeDrawElement)
        activeDrawElement = null
    }
}

const handleCanvasMove = (e: MouseEvent) => {
    if (!activeDrawElement) return

    mouseMove(e, activeDrawElement)
}

const handleNavDelete = () => {
    drawElements.value = drawElements.value.filter((el) => !el?.selected)
}

const handleCanvasSelect = (selectedObject: SelectedObject) => {
    const element = drawElements.value.find((el) => el?.id.toString() === selectedObject.id)

    if (!element) return

    if (!selectedObject.shiftKey) resetSelectedElements()

    element.selected = true
    selectElementEvent = true
}
</script>

<template>
    <div class="svg-editor">
        <SVGEditorNav @nav-state-buttons="handleNavStateButtons" @nav-draw-button="handleNavDrawButton"
            @nav-delete="handleNavDelete"></SVGEditorNav>

        <SVGEditorCanvas :draw-element="activeDrawButton" :draw-elements="drawElements" :magnet="magnet"
            :showGrid="showGrid" @click="handleCanvasClick" @move="handleCanvasMove" @select="handleCanvasSelect">
        </SVGEditorCanvas>
    </div>
</template>

<style scoped>
.svg-editor {
    width: 800px;
}
</style>
@/types/types