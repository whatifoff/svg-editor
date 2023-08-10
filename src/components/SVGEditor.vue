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
import { type DrawElement, type DrawElementType, Line, Circle, Rect } from '@/types'
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

const createElement = (e: MouseEvent): DrawElement => {
    let drawElement = null

    const { x, y } = getMagnetCoord(e.offsetX, e.offsetY, magnet.value)

    switch (activeDrawButton.value) {
        case EVENT_NAME_FOR_NAV_BUTTON_LINE:
            drawElement = new Line(x, y)
            break
        case EVENT_NAME_FOR_NAV_BUTTON_CIRCLE:
            drawElement = new Circle(x, y)
            break
        case EVENT_NAME_FOR_NAV_BUTTON_RECT:
            drawElement = new Rect(x, y)
            break
    }

    return drawElement
}

const resetSelectedElements = () => {
    drawElements.value = drawElements.value.map((el) => {
        if (!el) return null

        el.selected = false
        return el
    })
}

const lineMove = (e: MouseEvent) => {
    const line = drawElements.value.find((el) => el?.id === activeDrawElement?.id)
    const { x, y } = getMagnetCoord(e.offsetX, e.offsetY, magnet.value)

    if (line instanceof Line) {
        line.x2 = x
        line.y2 = y
    }
}

const circleMove = (e: MouseEvent) => {
    const circle = drawElements.value.find((el) => el?.id === activeDrawElement?.id)
    const { x, y } = getMagnetCoord(e.offsetX, e.offsetY, magnet.value)

    if (circle instanceof Circle) {
        circle.r = Math.sqrt(Math.pow(circle.cx - x, 2) + Math.pow(circle.cy - y, 2))
    }
}

const rectMove = (e: MouseEvent) => {
    const rect = drawElements.value.find((el) => el?.id === activeDrawElement?.id)
    const { x: magnetX, y: magnetY } = getMagnetCoord(e.offsetX, e.offsetY, magnet.value)

    if (rect instanceof Rect) {
        const x = Math.min(magnetX, rect.startX)
        const y = Math.min(magnetY, rect.startY)
        const width = Math.abs(magnetX - rect.startX)
        const height = Math.abs(magnetY - rect.startY)
        rect.x = x
        rect.y = y
        rect.width = width
        rect.height = height
    }
}

const mouseMove = (e: MouseEvent, activeDrawElement: DrawElement) => {
    if (activeDrawElement instanceof Line) {
        lineMove(e)
    }

    if (activeDrawElement instanceof Circle) {
        circleMove(e)
    }

    if (activeDrawElement instanceof Rect) {
        rectMove(e)
    }
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
