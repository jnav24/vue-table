<script setup lang="ts">
import Typography from './Typography.vue';
import {
    ColumnBadgeColor,
    type ColumnProps,
    TableContext,
    type TableContextType,
    TableRowContext,
    type TableRowContextType,
} from '../types/table.ts';
import { computed, inject } from 'vue';

interface Props extends ColumnProps {
    color: ColumnBadgeColor | Record<string, ColumnBadgeColor>;
}

const colors = {
    [ColumnBadgeColor.DANGER]: {
        inner: 'text-danger',
        outer: 'border-danger bg-danger/20',
    },
    [ColumnBadgeColor.GRAY]: {
        inner: 'text-gray-500',
        outer: 'border-gray-400 bg-gray-100',
    },
    [ColumnBadgeColor.INFO]: {
        inner: 'text-info',
        outer: 'border-info bg-info/20',
    },
    [ColumnBadgeColor.PRIMARY]: {
        inner: 'text-primary',
        outer: 'border-primary bg-gray-100',
    },
    [ColumnBadgeColor.SUCCESS]: {
        inner: 'text-success',
        outer: 'border-success bg-success/20',
    },
    [ColumnBadgeColor.WARNING]: {
        inner: 'text-warning',
        outer: 'border-warning bg-warning/20',
    },
};

const props = withDefaults(defineProps<Props>(), { colspan: 1 });

const tableContext = inject<TableContextType>(TableContext);
const tableRowContext = inject<TableRowContextType>(TableRowContext);

const badgeColor = computed(() => {
    if (typeof props.color === 'string') {
        return colors[props.color];
    }

    const index = props.color[columnValue.value ?? ''] ?? ColumnBadgeColor.GRAY;
    return colors[index];
});

const columnValue = computed(() => {
    return props.notation ? tableRowContext?.parseValue(props.notation) : '';
});

const columnWidth = computed(() => tableContext?.getColSpan(props.colspan));
</script>

<template>
    <div class="inline-block rounded-lg border p-2" :class="[columnWidth, badgeColor.outer]">
        <Typography variant="caption">
            <span class="block text-center" :class="badgeColor.inner">
                {{ columnValue }}
            </span>
        </Typography>
    </div>
</template>
