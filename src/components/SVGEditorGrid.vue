<template>
    <defs>
        <pattern id="smallGrid" :width="prop.smallGrid.width" :height="prop.smallGrid.height" patternUnits="userSpaceOnUse">
            <path :d="smallGridPathString" :fill="prop.smallGrid.fill" :stroke="prop.smallGrid.stroke"
                :stroke-width="prop.smallGrid.strokeWidth" />
        </pattern>
        <pattern id="grid" :width="prop.bigGrid.width" :height="prop.bigGrid.height" patternUnits="userSpaceOnUse">
            <rect :width="prop.bigGrid.width" :height="prop.bigGrid.height" fill="url(#smallGrid)" />
            <path :d="bigGridPathString" :fill="prop.bigGrid.fill" :stroke="prop.bigGrid.stroke"
                :stroke-width="prop.bigGrid.strokeWidth" />
        </pattern>
    </defs>

    <rect width="100%" height="100%" fill="url(#grid)" />
</template>

<script setup lang="ts">
import type { Grid } from '@/types'
import {
    SMALL_GRID_WIDTH_DEFAULT,
    SMALL_GRID_HEIGHT_DEFAULT,
    SMALL_GRID_FILL_DEFAULT,
    SMALL_GRID_STROKE_DEFAULT,
    SMALL_GRID_STROKE_WIDTH_DEFAULT,
    BIG_GRID_WIDTH_DEFAULT,
    BIG_GRID_HEIGHT_DEFAULT,
    BIG_GRID_FILL_DEFAULT,
    BIG_GRID_STROKE_DEFAULT,
    BIG_GRID_STROKE_WIDTH_DEFAULT,
} from '@/const'
import { computed } from 'vue';

interface Prop {
    smallGrid: Grid
    bigGrid: Grid
}

const prop = withDefaults(defineProps<Prop>(), {
    smallGrid: () => ({
        width: SMALL_GRID_WIDTH_DEFAULT,
        height: SMALL_GRID_HEIGHT_DEFAULT,
        fill: SMALL_GRID_FILL_DEFAULT,
        stroke: SMALL_GRID_STROKE_DEFAULT,
        strokeWidth: SMALL_GRID_STROKE_WIDTH_DEFAULT,
    }),
    bigGrid: () => ({
        width: BIG_GRID_WIDTH_DEFAULT,
        height: BIG_GRID_HEIGHT_DEFAULT,
        fill: BIG_GRID_FILL_DEFAULT,
        stroke: BIG_GRID_STROKE_DEFAULT,
        strokeWidth: BIG_GRID_STROKE_WIDTH_DEFAULT,
    })
})

const smallGridPathString = computed(() => `M ${prop.smallGrid.width} 0 L 0 0 0 ${prop.smallGrid.height}`)
const bigGridPathString = computed(() => `M ${prop.bigGrid.width} 0 L 0 0 0 ${prop.bigGrid.height}`)
</script>

<style scoped></style>@/types/types