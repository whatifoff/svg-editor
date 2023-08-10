<script setup lang="ts">
import SVGEditorGrid from '@/components/SVGEditorGrid.vue'
import {
    SHOW_GRID_DEFAULT,
    MAGNET_DEFAULT,
    EVENT_NAME_FOR_NAV_BUTTON_CURSOR,
    DRAW_ELEMENT_OPACITY_OVER,
    DRAW_ELEMENT_OPACITY_DEFAULT
} from '@/const'
import { Line, Circle, Rect, type DrawElement, type DrawElementType } from '@/types'

interface Prop {
    showGrid: boolean
    magnet: boolean
    drawElement: DrawElementType
    drawElements: Array<DrawElement>
}

const prop = withDefaults(defineProps<Prop>(), {
    showGrid: SHOW_GRID_DEFAULT,
    magnet: MAGNET_DEFAULT,
    drawElement: EVENT_NAME_FOR_NAV_BUTTON_CURSOR
})

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
    (e: 'move', event: MouseEvent): void
    (e: 'select', id: string): void
}>()

const handleCanvasClick = (e: MouseEvent) => {
    emit('click', e)
}

const handleCanvasMouseMove = (e: MouseEvent) => {
    if (prop.drawElement === EVENT_NAME_FOR_NAV_BUTTON_CURSOR) return

    emit('move', e)
}

const handleMouseOver = (e: MouseEvent) => {
    const _t = <SVGAElement>e.target

    if (!_t) return

    _t.style.strokeOpacity = DRAW_ELEMENT_OPACITY_OVER
}

const handleMouseOut = (e: MouseEvent) => {
    const _t = <SVGAElement>e.target

    if (!_t) return

    _t.style.strokeOpacity = DRAW_ELEMENT_OPACITY_DEFAULT
}

const handleClickElement = (e: MouseEvent) => {
    if (prop.drawElement !== EVENT_NAME_FOR_NAV_BUTTON_CURSOR) return

    const _t = <SVGAElement>e.target

    emit('select', _t.id)
}
</script>

<template>
    <div class="svg-editor__canvas">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" @click="handleCanvasClick"
            @mousemove="handleCanvasMouseMove">
            <SVGEditorGrid v-if="prop.showGrid"></SVGEditorGrid>

            <g id="main-level">
                <g v-for="el in prop.drawElements" :key="el?.id" :data-selected="el?.selected" @mouseover="handleMouseOver"
                    @mouseout="handleMouseOut" @click="handleClickElement">
                    <line v-if="el instanceof Line" :id="el.id.toString()" :stroke="el.stroke"
                        :stroke-width="el.strokeWidth" :x1="el.x1" :y1="el.y1" :x2="el.x2" :y2="el.y2"></line>

                    <circle v-if="el instanceof Circle" :id="el.id.toString()" :stroke="el.stroke"
                        :stroke-width="el.strokeWidth" fill="none" :cx="el.cx" :cy="el.cy" :r="el.r"></circle>

                    <rect v-if="el instanceof Rect" :id="el.id.toString()" :stroke="el.stroke"
                        :stroke-width="el.strokeWidth" fill="none" :x="el.x" :y="el.y" :width="el.width"
                        :height="el.height"></rect>

                    <rect v-if="el?.selected" :x="el.endPoints[0].x" :y="el.endPoints[0].y" :width="el.endPoints[0].width"
                        :height="el.endPoints[0].height" :stroke="el.endPoints[0].stroke"
                        :strokeWidth="el.endPoints[0].strokeWidth" fill="none"></rect>
                    <rect v-if="el?.selected" :x="el.endPoints[1].x" :y="el.endPoints[1].y" :width="el.endPoints[1].width"
                        :height="el.endPoints[1].height" :stroke="el.endPoints[1].stroke"
                        :strokeWidth="el.endPoints[1].strokeWidth" fill="none"></rect>
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
