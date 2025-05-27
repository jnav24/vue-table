<script setup lang="ts">
import { inject, onMounted, useId } from 'vue';
import { TableContext, type TableContextType } from '../types/table.ts';

interface Props {
    header: string;
}

const props = defineProps<Props>();

const id = useId();

const tableContext = inject<TableContextType>(TableContext);

onMounted(() => {
    console.log(tableContext);
    if (tableContext) {
        tableContext.setHeaders({
            [id]: {
                colspan: 1,
                label: props.header,
            },
        });
    }
});
</script>

<template>
    <p><slot /></p>
</template>
