<script setup lang="ts" generic="T extends Object">
import { computed, provide, ref } from 'vue';
import { type TableColumn, TableContext, type TableContextType } from '../types/table.ts';
import TablePagination from './TablePagination.vue';
import TableHeaders from './TableHeaders.vue';
import TableBody from './TableBody.vue';
import type { Optional } from '../types/generics.ts';
import TableRow from './TableRow.vue';

interface Props<T> {
    items: T[];
}

const props = defineProps<Props<T>>();

const headers = ref<Record<string, TableColumn>>({});

const getHeaders = computed<TableColumn[]>(() => Object.values(headers.value));

const getColSpan = (col?: number) => {
    const widthClasses = {
        '1': 'w-1/12',
        '2': 'w-2/12',
        '3': 'w-3/12',
        '4': 'w-4/12',
        '5': 'w-5/12',
        '6': 'w-6/12',
        '7': 'w-7/12',
        '8': 'w-8/12',
        '9': 'w-9/12',
        '10': 'w-10/12',
        '11': 'w-11/12',
        '12': 'w-full',
    };
    const idx = `${col || 1}` as keyof typeof widthClasses;
    return widthClasses[idx] || 'w-full';
};

const setHeaders = (header: Record<string, Optional<TableColumn, 'width'>>) => {
    const [id, data] = Object.entries(header)[0];
    headers.value = { ...headers.value, [id]: { ...data, width: getColSpan(data.colspan) } };
};

provide<TableContextType>(TableContext, {
    data: props.items,
    getColSpan,
    getHeaders,
    setHeaders,
});
</script>

<template>
    <div
        class="border-lm-stroke bg-lm-secondary dark:border-dm-stroke dark:bg-dm-secondary rounded-xl border"
    >
        <TableHeaders />

        <TableBody>
            <template v-slot="slots">
                <TableRow :data="slots">
                    <slot />
                </TableRow>
            </template>
        </TableBody>

        <TablePagination :options="[]" :page="1" :selected="10" :total="10" />
    </div>
</template>
