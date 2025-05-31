<script setup lang="ts">
import { computed, inject } from 'vue';
import {
    TableContext,
    type TableContextType,
    TableRowContext,
    type TableRowContextType,
} from '../types/table.ts';
import Typography from './Typography.vue';

interface Props {
    header: string;
    colspan?: number;
    key?: string;
}

const props = withDefaults(defineProps<Props>(), { colspan: 1 });

const tableContext = inject<TableContextType>(TableContext);
const tableRowContext = inject<TableRowContextType>(TableRowContext);

const columnValue = computed(() => {
    return props.key ? tableRowContext?.parseValue(props.key) : null;
});

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
