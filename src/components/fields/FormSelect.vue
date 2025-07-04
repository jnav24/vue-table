<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import FormLabel from './FormLabel.vue';
import ChevronDown from '../icons/ChevronDown.vue';

type Emits = {
    (e: 'handle-selection', v: string): void;
    (e: 'update:value', v: string): void;
};

type Props = {
    isDisabled?: boolean;
    itemLabel?: string;
    items: SelectItems[];
    itemValue?: string;
    label: string;
    placeholder?: string;
    hideLabel?: boolean;
    tabIndex?: number;
    validateOnInit?: boolean;
    value: string;
};

type SelectItems = Record<string, string>;

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {
    itemLabel: 'label',
    itemValue: 'value',
    placeholder: 'Select',
    tabIndex: 0,
    validateOnInit: false,
});

const dropDownItems = ref<HTMLDivElement | null>(null);
const selected = ref(false);

const labelId = computed(() => props.label.toLowerCase().replace(/\s+/g, '_'));

const isValueSelected = computed(
    () => props.value && (Number(props.value) > 0 || props.value.length),
);

const getPlaceholder = computed(() => {
    const v = labelId ? props.value : '';
    const obj: SelectItems =
        (props.items ?? []).find((obj: SelectItems) => v === obj[props.itemValue]) ?? {};

    if (isValueSelected && obj && obj[props.itemLabel]) {
        return obj[props.itemLabel];
    }

    return props.placeholder;
});

const disableField = computed(() => props.isDisabled || !props.items?.length);

watchEffect(() => {
    if (!selected.value) {
        setTimeout(() => dropDownItems.value?.classList.add('h-0', 'py-0'), 300);
    } else {
        dropDownItems.value?.classList.remove('h-0', 'py-0');
    }
});

const handleBlur = () => {
    if (!disableField.value) {
        selected.value = false;
    }
};

const handleClick = () => {
    if (!disableField.value) {
        selected.value = !selected.value;
    }
};

const handleSelection = (value: string) => {
    if (selected.value) {
        console.log('value', value);
        emit('update:value', value);
        emit('handle-selection', value);
    }
};
</script>

<template>
    <div>
        <FormLabel v-if="!hideLabel" :labelId="labelId" :label="label" />

        <div
            class="relative mt-2 flex transform items-center justify-between rounded-md border border-solid px-2 py-2 outline-none"
            :class="{
                'dark:bg-dark-main focus:border-primary cursor-pointer border-gray-300 bg-white text-gray-600 transition duration-300 hover:border-gray-600 hover:text-gray-700 dark:border-gray-700':
                    !disableField,
                'cursor-text border-gray-300 bg-gray-200 text-gray-500 dark:border-gray-600 dark:bg-gray-800':
                    disableField,
                'z-50': selected,
                'z-0': !selected,
            }"
            :tabindex="tabIndex"
            @blur="handleBlur()"
            @click="handleClick()"
        >
            <span class="flex-1 text-sm text-gray-500">{{ getPlaceholder }}</span>

            <ChevronDown
                classes="transform transition duration-300 size-4 ml-2"
                :class="{ 'rotate-180': selected, 'rotate-0': !selected }"
            />

            <div
                class="dark:bg-dark-main absolute top-0 left-0 max-h-48 w-full transform overflow-y-auto rounded border border-gray-300 bg-white shadow-sm transition duration-300 ease-out"
                :class="{
                    'translate-y-12 opacity-100': selected,
                    'translate-y-0 opacity-0': !selected,
                }"
                ref="dropDownItems"
            >
                <div
                    class="p-2 text-sm hover:bg-gray-200"
                    v-for="(item, index) in items"
                    :key="index"
                    @click="handleSelection(item[itemValue])"
                >
                    {{ item[itemLabel] }}
                </div>
            </div>
        </div>
    </div>
</template>
