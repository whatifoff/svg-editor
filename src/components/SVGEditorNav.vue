<script setup lang="ts">
</script>

<template>
    <div class="svg-editor__nav d-flex justify-space-between">
        <v-btn-toggle multiple>
            <v-btn width="16px">
                <v-icon icon="mdi-grid" />
            </v-btn>
            <v-btn>
                <v-icon icon="mdi-magnet" />
            </v-btn>
        </v-btn-toggle>

        <v-btn-toggle divide>
            <v-btn>
                <v-icon icon="mdi-cursor-default" />
            </v-btn>
            <v-btn width="16px">
                <v-icon icon="mdi-vector-line" />
            </v-btn>
            <v-btn>
                <v-icon icon="mdi-vector-circle-variant" />
            </v-btn>
            <v-btn>
                <v-icon icon="mdi-vector-rectangle" />
            </v-btn>
        </v-btn-toggle>
    </div>
</template>

<style scoped>
.svg-editor__nav{
    height: 50px;
}
</style>