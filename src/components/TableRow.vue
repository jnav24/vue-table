<script setup lang="ts">
import { provide } from 'vue';
import { TableRowContext, type TableRowContextType } from '../types/table.ts';

interface Props {
    data: { row: any };
}

const props = defineProps<Props>();

const parseValue = (value: string) => {
    return value.split('.').reduce((result, current) => {
        return result[current] ?? '';
    }, props.data?.row);
};

provide<TableRowContextType>(TableRowContext, { data: props.data?.row, parseValue });
</script>

<template>
    <slot></slot>
</template>
