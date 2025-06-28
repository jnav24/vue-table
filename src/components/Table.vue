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
    paginatePerPage?: number[];
    perPage?: number;
    selectable?: boolean;
    variant?: 'full' | 'short' | 'numeric';
}

const props = withDefaults(defineProps<Props<T>>(), {
    paginatePerPage: () => [10, 25, 50],
    selectable: false,
    variant: 'short',
});

const allChecked = ref(false);
const checkedItems = ref<(string | number)[]>([]);
const currentPage = ref(1);
const headers = ref<Record<string, TableColumn>>({});
const selectedPaginatePerPage = ref(props.perPage ?? props.paginatePerPage?.[0] ?? null);

const filteredItems = computed(() => props.items);

const paginateItems = computed(() =>
    filteredItems.value.slice(
        (currentPage.value - 1) * selectedPaginatePerPage.value,
        currentPage.value * selectedPaginatePerPage.value,
    ),
);

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

const setAllChecked = (v: boolean) => (allChecked.value = v);

const setHeaders = (header: Record<string, Optional<TableColumn, 'width'>>) => {
    const [id, data] = Object.entries(header)[0];
    headers.value = { ...headers.value, [id]: { ...data, width: getColSpan(data.colspan) } };
};

const toggleCheckedItem = (checked: boolean, id: number | string) => {
    checkedItems.value = checked
        ? [...checkedItems.value, id]
        : checkedItems.value.filter((i) => i !== id);
};

const updatePage = (page: number) => (currentPage.value = page);

const updateSelectedPaginatePerPage = (selected: number) =>
    (selectedPaginatePerPage.value = selected);

provide<TableContextType>(TableContext, {
    allChecked,
    checkedItems,
    data: paginateItems,
    getColSpan,
    getHeaders,
    selectable: props.selectable,
    setAllChecked,
    setHeaders,
    toggleCheckedItem,
    updatePage,
    updateSelectedPaginatePerPage,
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

        <TablePagination
            :options="paginatePerPage"
            :page="currentPage"
            v-model:selected="selectedPaginatePerPage"
            :total="filteredItems.length"
            :variant="variant"
        />
    </div>
</template>
