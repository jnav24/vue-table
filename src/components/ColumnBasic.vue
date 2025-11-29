<script setup lang="ts">
import { computed, inject } from 'vue';
import {
    type ColumnProps,
    TableContext,
    type TableContextType,
    TableRowContext,
    type TableRowContextType,
} from '../types/table.ts';
import Typography from './Typography.vue';

const props = withDefaults(defineProps<ColumnProps>(), { colspan: 1 });

const tableContext = inject<TableContextType>(TableContext);
const tableRowContext = inject<TableRowContextType>(TableRowContext);

const columnValue = computed(() => tableRowContext?.getContent(props.header, props.notation));

const columnWidth = computed(() => tableContext?.getColSpan(props.colspan));
</script>

<template>
    <div :class="columnWidth">
        <Typography variant="body2">
            <span v-if="columnValue">{{ columnValue }}</span>
            <slot v-else :data="tableRowContext?.data ?? {}" />
        </Typography>
    </div>
</template>
