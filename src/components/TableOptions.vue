<script setup lang="ts">
import VerticalEllipsis from './icons/VerticalEllipsis.vue';
import Dropdown from './shared/Dropdown.vue';
</script>

<template>
    <div class="flex flex-row items-center justify-between p-4">
        <div>search field here</div>

        <div>
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
        </div>
    </div>
</template>
