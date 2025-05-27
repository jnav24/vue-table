<script setup lang="ts">
import Table from './components/Table.vue';
import ColumnBasic from './components/ColumnBasic.vue';
</script>

<template>
    <h1 class="bg-mint-500 mb-4">Table</h1>

    <div class="p-4">
        <Table :items="[]">
            <ColumnBasic header="Column 1">Column One</ColumnBasic>
            <ColumnBasic header="Column 2">Column Two</ColumnBasic>
        </Table>
    </div>
</template>
