<script setup lang="ts">
import { ref } from 'vue'
import SVGEditorNav from './SVGEditorNav.vue'
import SVGEditorCanvas from './SVGEditorCanvas.vue'
import {
    SHOW_GRID_DEFAULT,
    MAGNET_DEFAULT,
    EVENT_NAME_FOR_NAV_BUTTON_GRID,
    EVENT_NAME_FOR_NAV_BUTTON_MAGNET,
    EVENT_NAME_FOR_NAV_BUTTON_CURSOR,
    EVENT_NAME_FOR_NAV_BUTTON_LINE,
    EVENT_NAME_FOR_NAV_BUTTON_CIRCLE,
    EVENT_NAME_FOR_NAV_BUTTON_RECT
} from '@/const'
import { type DrawElement } from '@/types'
import { type DrawElementType } from '@/types/draw'
import { Line } from '@/types/line'
import { Circle } from '@/types/circle'
import { Rect } from '@/types/rect'
import { getMagnetCoord } from '../helpers'

const showGrid = ref(SHOW_GRID_DEFAULT)
const magnet = ref(MAGNET_DEFAULT)

const activeDrawButton = ref<DrawElementType>(EVENT_NAME_FOR_NAV_BUTTON_CURSOR)
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
    showGrid.value = stateButtons.includes(EVENT_NAME_FOR_NAV_BUTTON_GRID) ? true : false
    magnet.value = stateButtons.includes(EVENT_NAME_FOR_NAV_BUTTON_MAGNET) ? true : false
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
        case EVENT_NAME_FOR_NAV_BUTTON_LINE:
            return new Line(x, y)
        case EVENT_NAME_FOR_NAV_BUTTON_CIRCLE:
            return new Circle(x, y)
        case EVENT_NAME_FOR_NAV_BUTTON_RECT:
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

const handleCanvasSelect = (id: string) => {
    const element = drawElements.value.find((el) => el?.id.toString() === id)

    if (!element) return

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