<script setup lang="ts">
import { inject, onMounted, useSlots } from 'vue';
import { TableContext, type TableContextType } from '../types/table.ts';

const tableContext = inject<TableContextType>(TableContext);

const slots = useSlots();

onMounted(() => {
    if (slots.default) {
        const slot = slots.default()[0];
        const children = slot.children?.default()?.[0]?.children ?? [];

        children.map((child: { props: { header: string; colspan?: number } }) => {
            const label = child.props.header ?? '';
            const id = label.toLowerCase().replace(/\s+/g, '_');
            tableContext?.setHeaders({
                [id]: {
                    colspan: Number(child.props.colspan ?? 1),
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
        <slot :row="row" />
    </div>
</template>
