<script setup lang="ts">
import SVGEditorGrid from '@/components/SVGEditorGrid.vue'
import { SHOW_GRID_DEFAULT, MAGNET_DEFAULT, EVENT_NAME_FOR_NAV_BUTTON_CURSOR } from '@/const'
import { useEndPoints } from '@/composables/endpoint'
import { Line, Circle, Rect, type DrawElement, type DrawElementType } from '@/types'

const {
    getFirstEndPointX,
    getFirstEndPointY,
    getEndPointWidth,
    getEndPointHeight,
    getSecondEndPointX,
    getSecondEndPointY,
    getEndPointStroke,
    getEndPointStrokeWidth
} = useEndPoints()

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
}>()

const handleCanvasClick = (e: MouseEvent) => {
    emit('click', e)
}

const handleCanvasMouseMove = (e: MouseEvent) => {
    if (prop.drawElement === EVENT_NAME_FOR_NAV_BUTTON_CURSOR) return

    emit('move', e)
}
</script>

<template>
    <div class="svg-editor__canvas">
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            @click="handleCanvasClick"
            @mousemove="handleCanvasMouseMove"
        >
            <SVGEditorGrid v-if="prop.showGrid"></SVGEditorGrid>

            <g id="main-level">
                <g v-for="el in prop.drawElements" :key="el?.id">
                    <line
                        v-if="el instanceof Line"
                        :stroke="el.stroke"
                        :stroke-width="el.strokeWidth"
                        :x1="el.x1"
                        :y1="el.y1"
                        :x2="el.x2"
                        :y2="el.y2"
                    ></line>

                    <circle
                        v-if="el instanceof Circle"
                        :stroke="el.stroke"
                        :stroke-width="el.strokeWidth"
                        fill="none"
                        :cx="el.cx"
                        :cy="el.cy"
                        :r="el.r"
                    ></circle>

                    <rect
                        v-if="el instanceof Rect"
                        :stroke="el.stroke"
                        :stroke-width="el.strokeWidth"
                        fill="none"
                        :x="el.x"
                        :y="el.y"
                        :width="el.width"
                        :height="el.height"
                    ></rect>

                    <rect
                        v-if="el?.selected"
                        :x="getFirstEndPointX(el)"
                        :y="getFirstEndPointY(el)"
                        :width="getEndPointWidth()"
                        :height="getEndPointHeight()"
                        :stroke="getEndPointStroke()"
                        :strokeWidth="getEndPointStrokeWidth()"
                        fill="none"
                    ></rect>
                    <rect
                        v-if="el?.selected"
                        :x="getSecondEndPointX(el)"
                        :y="getSecondEndPointY(el)"
                        :width="getEndPointWidth()"
                        :height="getEndPointHeight()"
                        :stroke="getEndPointStroke()"
                        :strokeWidth="getEndPointStrokeWidth()"
                        fill="none"
                    ></rect>
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
