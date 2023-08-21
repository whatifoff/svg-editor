<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import {
    SHOW_GRID_DEFAULT,
    MAGNET_DEFAULT,
    DRAW_BUTTON_ACTIVE_DEFAULT,
    ENTITY_GRID_NAME,
    ENTITY_MAGNET_NAME,
    ENTITY_CURSOR_NAME,
    ENTITY_LINE_NAME,
    ENTITY_CIRCLE_NAME,
    ENTITY_RECT_NAME
} from '@/const'
import type { NavButton, DrawElementType } from '@/types'

const emit = defineEmits<{
    (e: 'nav-state-buttons', val: Array<string>): void
    (e: 'nav-draw-button', val: DrawElementType): void
    (e: 'nav-delete'): void
}>()

const stateButtonsOrder: Array<NavButton> = [
    {
        icon: 'mdi-grid',
        eventName: ENTITY_GRID_NAME
    },
    {
        icon: 'mdi-magnet',
        eventName: ENTITY_MAGNET_NAME
    }
]
const drawButtonsOrder: Array<NavButton> = [
    {
        icon: 'mdi-cursor-default',
        eventName: ENTITY_CURSOR_NAME
    },
    {
        icon: 'mdi-vector-line',
        eventName: ENTITY_LINE_NAME
    },
    {
        icon: 'mdi-vector-circle-variant',
        eventName: ENTITY_CIRCLE_NAME
    },
    {
        icon: 'mdi-vector-rectangle',
        eventName: ENTITY_RECT_NAME
    }
]

const sButtons: Array<number> = []
const stateButtons = ref(sButtons)
const drawButtons = ref(DRAW_BUTTON_ACTIVE_DEFAULT)

const addStateButton = (stateButton: string) => {
    const idx = stateButtonsOrder.findIndex((el) => el.eventName === stateButton)
    stateButtons.value = [...stateButtons.value, idx]
}

if (SHOW_GRID_DEFAULT) addStateButton(ENTITY_GRID_NAME)
if (MAGNET_DEFAULT) addStateButton(ENTITY_MAGNET_NAME)

watch(stateButtons, (newVal) => {
    const activeButtons = toRaw(newVal)
    const activeButtonsEvents = activeButtons.map((b) => stateButtonsOrder[b].eventName)
    emit('nav-state-buttons', activeButtonsEvents)
})

watch(drawButtons, (newVal) => {
    const activeButton = drawButtonsOrder[newVal].eventName as DrawElementType
    emit('nav-draw-button', activeButton)
})

const handleClickDelete = () => {
    emit('nav-delete')
}
</script>

<template>
    <div class="svg-editor__nav d-flex justify-space-between">
        <v-btn-toggle v-model="stateButtons" multiple>
            <v-btn v-for="(btn, index) in stateButtonsOrder" :key="index">
                <v-icon :icon="btn.icon" />
            </v-btn>
        </v-btn-toggle>

        <v-btn-group>
            <v-btn @click="handleClickDelete">
                <v-icon icon="mdi-delete"></v-icon>
            </v-btn>
        </v-btn-group>

        <v-btn-toggle v-model="drawButtons" divide>
            <v-btn v-for="(btn, index) in drawButtonsOrder" :key="index">
                <v-icon :icon="btn.icon" />
            </v-btn>
        </v-btn-toggle>
    </div>
</template>

<style scoped>
.svg-editor__nav {
    height: 50px;
}
</style>
@/types/types