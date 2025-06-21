<script setup lang="ts">
import Table from './components/Table.vue';
import ColumnBasic from './components/ColumnBasic.vue';

const data = [
    { id: 1, year: '2025', make: 'BMW', model: 'X6', status: 'Active' },
    { id: 2, year: '2025', make: 'Cadillac', model: 'Escalade', status: 'Active' },
    { id: 3, year: '2024', make: 'Mercedes', model: 'GLE Coupe', status: 'Inactive' },
    { id: 4, year: '2026', make: 'Mercedes-Maybach', model: 'S-Class', status: 'Active' },
    { id: 5, year: '2023', make: 'Tesla', model: 'Model S', status: 'Inactive' },
    { id: 6, year: '2025', make: 'BMW', model: 'X6', status: 'Active' },
    { id: 7, year: '2025', make: 'Cadillac', model: 'Escalade', status: 'Active' },
    { id: 8, year: '2024', make: 'Mercedes', model: 'GLE Coupe', status: 'Inactive' },
    { id: 9, year: '2026', make: 'Mercedes-Maybach', model: 'S-Class', status: 'Active' },
    { id: 10, year: '2023', make: 'Tesla', model: 'Model S', status: 'Inactive' },
    { id: 11, year: '2025', make: 'BMW', model: 'X6', status: 'Active' },
    { id: 12, year: '2025', make: 'Cadillac', model: 'Escalade', status: 'Active' },
    { id: 13, year: '2024', make: 'Mercedes', model: 'GLE Coupe', status: 'Inactive' },
    { id: 14, year: '2026', make: 'Mercedes-Maybach', model: 'S-Class', status: 'Active' },
    { id: 15, year: '2023', make: 'Tesla', model: 'Model S', status: 'Inactive' },
];
</script>

<template>
    <h1 class="bg-mint-500 mb-4">Table</h1>

    <div class="p-4">
        <Table :items="data" selectable>
            <ColumnBasic header="Year" notation="year" />
            <ColumnBasic :colspan="2" header="Make" notation="make" />
            <ColumnBasic header="Model" notation="model" />
            <ColumnBasic header="Status" notation="status" />
        </Table>
    </div>
</template>
