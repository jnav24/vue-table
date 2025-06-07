<script setup lang="ts">
import { computed, toRefs } from 'vue';
import Typography from './Typography.vue';

type Emits = { (e: 'page-change', v: number): void; (e: 'selection', v: number): void };

type Props = {
    options: number[];
    page: number;
    selected: number;
    total: number;
    variant?: 'full' | 'short' | 'numeric';
};

defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), { variant: 'short' });
const { options, page, selected, total } = toRefs(props);

const endNumber = computed(() => {
    const value = selected.value * page.value;
    return total.value < value ? total.value : value;
});
const startNumber = computed(() => 1 + selected.value * (page.value - 1));
</script>

<template>
    <div class="flex flex-row items-center justify-between px-4 py-4">
        <div>
            <Typography variant="caption">
                Showing {{ startNumber }}-{{ endNumber }} of {{ total }} results
            </Typography>
        </div>

        <div class="flex flex-row items-center space-x-2">
            <Typography variant="caption">per page</Typography>
        </div>

        <div class="flex flex-row items-center space-x-2">Navigation</div>
    </div>
</template>
