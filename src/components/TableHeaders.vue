<script setup lang="ts">
import { inject } from 'vue';
import { TableContext, type TableContextType } from '../types/table.ts';
import Typography from './Typography.vue';
import FormCheckbox from './fields/FormCheckbox.vue';

const tableContext = inject<TableContextType>(TableContext);
</script>

<template>
    <div
        class="border-lm-stroke bg-lm-stroke text-lm-text-hover dark:border-dm-stroke dark:text-dm-text-hover flex flex-row items-center justify-between space-x-4 rounded-t-xl border-b px-4 py-4"
    >
        <FormCheckbox
            v-if="tableContext?.selectable"
            :is-checked="tableContext?.allChecked.value"
            @handleUpdate="tableContext.setAllChecked($event)"
            label=""
        />
        <div class="flex grow flex-row items-center justify-between">
            <template v-for="(column, index) in tableContext?.getHeaders?.value" :key="index">
                <div :class="column.width" class="flex items-center space-x-2">
                    <Typography variant="body1">
                        {{ column.label }}
                    </Typography>
                    <button>^</button>
                </div>
            </template>
        </div>
    </div>
</template>
