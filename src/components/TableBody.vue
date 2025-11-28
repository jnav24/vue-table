<script setup lang="ts">
import { inject, onMounted, type Slots, useSlots, type VNode } from 'vue';
import { TableContext, type TableContextType } from '../types/table.ts';
import FormCheckbox from './fields/FormCheckbox.vue';

const tableContext = inject<TableContextType>(TableContext);

const slots = useSlots();

onMounted(() => {
    if (slots.default) {
        const slot = slots.default()[0] as unknown as VNode;
        const children = (slot.children as Slots)?.default?.()?.[0]?.children ?? [];

        (children as unknown as VNode[]).map((child) => {
            const label = child?.props?.header ?? '';
            const id = label.toLowerCase().replace(/\s+/g, '_');

            if (child?.props?.hasOwnProperty('searchable') && child?.props?.searchable !== false) {
                const item = child?.props?.notation ?? child?.props?.header?.toLowerCase();
                tableContext?.setSearchable(item);
            }

            tableContext?.setHeaders({
                [id]: {
                    colspan: Number(child?.props?.colspan ?? 1),
                    label,
                },
            });
        });
    }
});
</script>

<template>
    <div
        v-for="(row, idx) in tableContext?.data?.value ?? []"
        :key="row?.id ?? idx"
        :class="[
            idx === (tableContext?.data?.value?.length ?? 0) - 1 ? 'border-0' : 'border-b',
            `border-lm-stroke dark:border-dm-stroke flex flex-row items-center space-x-4 px-4 py-6 shadow-sm`,
            'bg-lm-secondary dark:bg-dm-secondary dark:hover:bg-dm-primary/25 hover:bg-gray-100',
        ]"
        class="justify-between"
    >
        <FormCheckbox
            v-if="tableContext?.selectable"
            :is-checked="
                tableContext.allChecked.value ||
                tableContext.checkedItems.value.includes(row?.id ?? idx)
            "
            @handleUpdate="tableContext.toggleCheckedItem($event, row?.id ?? idx)"
            label=""
        />
        <div class="flex grow flex-row items-center justify-between">
            <slot :row="row" />
        </div>
    </div>
</template>
