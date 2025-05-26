<script setup lang="ts">
import TablePagination from './TablePagination.vue';
import TableHeaders from './TableHeaders.vue';
import TableBody from './TableBody.vue';
</script>

<template>
    <div
        class="border-lm-stroke bg-lm-secondary dark:border-dm-stroke dark:bg-dm-secondary rounded-xl border"
    >
        <TableHeaders />

        <TableBody />

        <TablePagination />
    </div>
</template>
