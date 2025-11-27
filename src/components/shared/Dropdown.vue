<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import FormButton from '../fields/FormButton.vue';

const showMenu = ref(false);
const menuContainer = ref<HTMLDivElement | null>(null);
const timeoutId = ref<number | null>(null);

watch(showMenu, (menu) => {
    if (!menu) {
        timeoutId.value = setTimeout(() => {
            menuContainer.value?.classList.add('h-0', 'py-0');
        }, 400);
    } else {
        menuContainer.value?.classList.add('h-auto', 'py-1');
    }
});

onUnmounted(() => {
    if (timeoutId.value) {
        clearTimeout(timeoutId.value);
    }
});
</script>

<template>
    <div class="relative">
        <FormButton @blur="showMenu = false" @click="showMenu = !showMenu" checkbox>
            <slot name="trigger" />
        </FormButton>

        <div
            class="absolute right-0 w-auto overflow-hidden rounded-lg bg-white shadow-lg transition delay-100 duration-300 ease-out"
            :class="{
                'translate-y-2 opacity-100': showMenu,
                'translate-y-16 opacity-0': !showMenu,
            }"
            ref="menuContainer"
        >
            <slot name="menu" />
        </div>
    </div>
</template>
