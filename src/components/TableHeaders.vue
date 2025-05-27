<script setup lang="ts">
import { inject } from 'vue';
import { TableContext, type TableContextType } from '../types/table.ts';

const tableContext = inject<TableContextType>(TableContext);
</script>

<template>
    <div
        class="border-lm-stroke text-lm-text-hover dark:border-dm-stroke dark:text-dm-text-hover flex flex-row items-center justify-between space-x-4 border-b px-4 py-4"
    >
        <template v-for="(column, index) in tableContext?.getHeaders?.value" :key="index">
            <div :class="column.width">{{ column.label }}</div>
        </template>
    </div>
</template>
