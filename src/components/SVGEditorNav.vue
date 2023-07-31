<script setup lang="ts">
import { ref, toRaw, watch } from 'vue'
import {
    SHOW_GRID_DEFAULT,
    MAGNET_DEFAULT,
    DRAW_BUTTON_ACTIVE_DEFAULT,
    EVENT_NAME_FOR_NAV_BUTTON_GRID,
    EVENT_NAME_FOR_NAV_BUTTON_MAGNET,
    EVENT_NAME_FOR_NAV_BUTTON_CURSOR,
    EVENT_NAME_FOR_NAV_BUTTON_LINE,
    EVENT_NAME_FOR_NAV_BUTTON_CIRCLE,
    EVENT_NAME_FOR_NAV_BUTTON_RECT
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
        eventName: EVENT_NAME_FOR_NAV_BUTTON_GRID
    },
    {
        icon: 'mdi-magnet',
        eventName: EVENT_NAME_FOR_NAV_BUTTON_MAGNET
    }
]
const drawButtonsOrder: Array<NavButton> = [
    {
        icon: 'mdi-cursor-default',
        eventName: EVENT_NAME_FOR_NAV_BUTTON_CURSOR
    },
    {
        icon: 'mdi-vector-line',
        eventName: EVENT_NAME_FOR_NAV_BUTTON_LINE
    },
    {
        icon: 'mdi-vector-circle-variant',
        eventName: EVENT_NAME_FOR_NAV_BUTTON_CIRCLE
    },
    {
        icon: 'mdi-vector-rectangle',
        eventName: EVENT_NAME_FOR_NAV_BUTTON_RECT
    }
]

const sButtons: Array<number> = []
const stateButtons = ref(sButtons)
const drawButtons = ref(DRAW_BUTTON_ACTIVE_DEFAULT)

const addStateButton = (stateButton: string) => {
    const idx = stateButtonsOrder.findIndex((el) => el.eventName === stateButton)
    stateButtons.value = [...stateButtons.value, idx]
}

if (SHOW_GRID_DEFAULT) addStateButton(EVENT_NAME_FOR_NAV_BUTTON_GRID)
if (MAGNET_DEFAULT) addStateButton(EVENT_NAME_FOR_NAV_BUTTON_MAGNET)

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
