<script setup lang="ts">
import SVGEditorGrid from '@/components/SVGEditorGrid.vue';
import {
    SHOW_GRID_DEFAULT,
    MAGNET_DEFAULT,

    SMALL_GRID_WIDTH_DEFAULT,
    SMALL_GRID_HEIGHT_DEFAULT,

    EVENT_NAME_FOR_NAV_BUTTON_CURSOR,
    EVENT_NAME_FOR_NAV_BUTTON_LINE,
    EVENT_NAME_FOR_NAV_BUTTON_CIRCLE,
    EVENT_NAME_FOR_NAV_BUTTON_RECT,
} from '@/const'
import {
    Line,
    Circle,
    Rect,
    type DrawElementType,
    type DrawElement
} from '@/types'
import { ref, watch } from 'vue';

interface Prop {
    showGrid: boolean
    magnet: boolean
    drawElement: DrawElementType
}

const prop = withDefaults(defineProps<Prop>(), {
    showGrid: SHOW_GRID_DEFAULT,
    magnet: MAGNET_DEFAULT,
    drawElement: EVENT_NAME_FOR_NAV_BUTTON_CURSOR
})

// нажатая кнопка в nav
const activeDrawElementType = ref<DrawElementType>(EVENT_NAME_FOR_NAV_BUTTON_CURSOR)

// сам текущий рисуемый элемент
let activeDrawElement: DrawElement = null

const drawElements = ref<Array<DrawElement>>([])

watch(() => prop.drawElement, newVal => activeDrawElementType.value = newVal)

// TODO: брать величины сторон сетки из настроек
const getMagnetCoord = (x: number, y: number): { x: number, y: number } => {
    if (!prop.magnet) return { x, y }

    const deltaX = x % SMALL_GRID_WIDTH_DEFAULT
    const deltaY = y % SMALL_GRID_HEIGHT_DEFAULT

    return {
        x: deltaX < SMALL_GRID_WIDTH_DEFAULT / 2 ? x - deltaX : x + (SMALL_GRID_WIDTH_DEFAULT - deltaX),
        y: deltaY < SMALL_GRID_HEIGHT_DEFAULT / 2 ? y - deltaY : y + (SMALL_GRID_HEIGHT_DEFAULT - deltaY)
    }
}

const createElement = (e: MouseEvent): DrawElement => {
    let drawElement = null

    const { x, y } = getMagnetCoord(e.offsetX, e.offsetY)

    switch (activeDrawElementType.value) {
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

const lineMove = (e: MouseEvent) => {
    const line = drawElements.value.find(el => el?.id === activeDrawElement?.id)
    const { x, y } = getMagnetCoord(e.offsetX, e.offsetY)

    if (line instanceof Line) {
        line.x2 = x
        line.y2 = y
    }
}

const circleMove = (e: MouseEvent) => {
    const circle = drawElements.value.find(el => el?.id === activeDrawElement?.id)
    const { x, y } = getMagnetCoord(e.offsetX, e.offsetY)

    if (circle instanceof Circle) {
        circle.r = Math.sqrt(Math.pow(circle.cx - x, 2) + Math.pow(circle.cy - y, 2))
    }
}

const rectMove = (e: MouseEvent) => {
    const rect = drawElements.value.find(el => el?.id === activeDrawElement?.id)
    const { x: magnetX, y: magnetY } = getMagnetCoord(e.offsetX, e.offsetY)

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

const handleCanvasClick = (e: MouseEvent) => {
    if (!activeDrawElement) {
        activeDrawElement = createElement(e)

        if (!activeDrawElement) return

        drawElements.value.push(activeDrawElement)
    } else {
        if (activeDrawElement instanceof Line) {
            lineMove(e)
        }

        if (activeDrawElement instanceof Circle) {
            circleMove(e)
        }

        if (activeDrawElement instanceof Rect) {
            rectMove(e)
        }

        activeDrawElement = null
    }
}

const handleCanvasMouseMove = (e: MouseEvent) => {
    if (!activeDrawElement) return

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
</script>

<template>
    <div class="svg-editor__canvas">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" @click="handleCanvasClick"
            @mousemove="handleCanvasMouseMove">
            <SVGEditorGrid v-if="prop.showGrid"></SVGEditorGrid>

            <g id="main-level">
                <g v-for="el in drawElements" :key="el?.id">
                    <line v-if="(el instanceof Line)" :stroke="el.stroke" :stroke-width="el.strokeWidth" :x1="el.x1"
                        :y1="el.y1" :x2="el.x2" :y2="el.y2"></line>

                    <circle v-if="(el instanceof Circle)" :stroke="el.stroke" :stroke-width="el.strokeWidth" fill="none"
                        :cx="el.cx" :cy="el.cy" :r="el.r"></circle>

                    <rect v-if="(el instanceof Rect)" :stroke="el.stroke" :stroke-width="el.strokeWidth" fill="none"
                        :x="el.x" :y="el.y" :width="el.width" :height="el.height"></rect>
                </g>
            </g>
        </svg>
    </div>
</template>

<style scoped>
.svg-editor__canvas {
    width: 800px;
    height: 600px;
    background-color: aliceblue;
}
</style>