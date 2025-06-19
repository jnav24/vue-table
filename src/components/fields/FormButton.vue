<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
import type { ConcreteComponent } from 'vue';

type ButtonColor = 'default' | 'primary' | 'secondary' | 'danger';

defineEmits<{ (e: 'onclick'): void }>();
const props = withDefaults(
    defineProps<{
        block?: boolean;
        checkbox?: boolean;
        color?: ButtonColor;
        disabled?: boolean;
        fab?: boolean;
        filled?: boolean;
        icon?: ConcreteComponent | string;
        iconPosition?: 'left' | 'right';
        submit?: boolean;
        size?: 'xs' | 'sm' | 'md' | 'lg';
    }>(),
    { color: 'default', iconPosition: 'left' },
);

const isDisabled = computed(() => props.disabled || false);

const setIcon = () => {
    if (typeof props.icon === 'string') {
        return resolveComponent(props.icon);
    }

    return props.icon;
};
</script>

<template>
    <button
        class="focus:shadow-outline rounded transition duration-150 focus:outline-none"
        :class="{
            'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200':
                color === 'default' && !isDisabled,
            'active:bg-dark-primary bg-dm-primary hover:bg-opacity-85 text-white':
                color === 'primary' && !isDisabled,
            'bg-dm-secondary hover:bg-opacity-85 active:bg-secondary text-white':
                color === 'secondary' && !isDisabled,
            'bg-danger hover:bg-opacity-85 active:bg-dm-danger text-white':
                color === 'danger' && !isDisabled,
            'rounded-full p-2': fab,
            'rounded-md p-1': checkbox,
            'rounded-md px-6 py-3 text-sm': !fab && !checkbox,
            'cursor-text bg-gray-300 text-gray-700': isDisabled,
            'cursor-pointer': !isDisabled,
            'w-full': block,
        }"
        :disabled="isDisabled"
        @click="$emit('onclick')"
        :type="submit ? 'submit' : 'button'"
    >
        <span class="flex flex-row items-center justify-center space-x-2">
            <component v-if="icon && iconPosition === 'left'" :is="setIcon()" class="size-4" />
            <span v-if="$slots.default"><slot /></span>
            <component v-if="icon && iconPosition === 'right'" :is="setIcon()" class="size-4" />
        </span>
    </button>
</template>
