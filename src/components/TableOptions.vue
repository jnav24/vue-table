<script setup lang="ts">
import VerticalEllipsis from './icons/VerticalEllipsis.vue';
import Dropdown from './shared/Dropdown.vue';
import { computed, inject } from 'vue';
import { TableContext, type TableContextType } from '../types/table.ts';

const tableContext = inject<TableContextType>(TableContext);

const showOptions = computed(() => {
    return tableContext?.hasSearchableItems?.value || tableContext?.selectable;
});
</script>

<template>
    <div v-if="showOptions" class="flex flex-row items-center justify-between p-4">
        <div>
            <template v-if="tableContext?.hasSearchableItems?.value">
                <span>Search why do you see me?</span>
            </template>
        </div>

        <div>
            <template v-if="tableContext?.selectable">
                <Dropdown>
                    <template #trigger>
                        <VerticalEllipsis classes="size-4" />
                    </template>

                    <template #menu>
                        <p>Sentry</p>
                    </template>
                    <!-- Dropdown; props - disabled, items -->
                    <!-- item; label, icon, action -->
                </Dropdown>
            </template>
        </div>
    </div>
</template>
