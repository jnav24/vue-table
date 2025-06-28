<script setup lang="ts">
import FormButton from './FormButton.vue';
import Check from '../icons/Check.vue';

const props = defineProps<{
    isChecked: boolean;
}>();

const emit = defineEmits<{ (e: 'handleUpdate', checked: boolean): void }>();

const updateValue = () => {
    emit('handleUpdate', !props.isChecked);
};
</script>

<template>
    <div class="flex flex-row items-center">
        <FormButton v-if="!isChecked" @click="updateValue" checkbox>
            <Check classes="size-4 text-white dark:text-gray-700" />
        </FormButton>

        <FormButton v-if="isChecked" @click="updateValue" color="primary" checkbox>
            <Check classes="size-4" />
        </FormButton>
    </div>
</template>
